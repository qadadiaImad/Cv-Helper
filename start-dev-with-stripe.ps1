# Start dev server and Stripe webhook listener concurrently

Write-Host "Starting Next.js dev server and Stripe webhook listener..." -ForegroundColor Green

# Add Stripe CLI to PATH
$stripePath = "$env:LOCALAPPDATA\stripe"

# Start Next.js dev server in background
$devJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    npm run dev
}

# Wait a moment for dev server to start
Start-Sleep -Seconds 3

# Start Stripe webhook listener in background
$stripeJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    $env:Path += ";$using:stripePath"
    stripe listen --forward-to localhost:3000/api/stripe/webhook
}

Write-Host "`nBoth processes started!" -ForegroundColor Green
Write-Host "Dev Server Job ID: $($devJob.Id)" -ForegroundColor Cyan
Write-Host "Stripe Listener Job ID: $($stripeJob.Id)" -ForegroundColor Cyan
Write-Host "`nPress Ctrl+C to stop both processes`n" -ForegroundColor Yellow

# Monitor both jobs and display output
try {
    while ($true) {
        # Get output from dev server
        $devOutput = Receive-Job -Job $devJob
        if ($devOutput) {
            Write-Host $devOutput
        }
        
        # Get output from Stripe listener
        $stripeOutput = Receive-Job -Job $stripeJob
        if ($stripeOutput) {
            Write-Host $stripeOutput -ForegroundColor Magenta
        }
        
        # Check if jobs are still running
        if ($devJob.State -ne 'Running' -and $stripeJob.State -ne 'Running') {
            break
        }
        
        Start-Sleep -Milliseconds 500
    }
}
finally {
    # Cleanup: Stop both jobs when script is interrupted
    Write-Host "`nStopping processes..." -ForegroundColor Yellow
    Stop-Job -Job $devJob -ErrorAction SilentlyContinue
    Stop-Job -Job $stripeJob -ErrorAction SilentlyContinue
    Remove-Job -Job $devJob -ErrorAction SilentlyContinue
    Remove-Job -Job $stripeJob -ErrorAction SilentlyContinue
    Write-Host "Processes stopped." -ForegroundColor Green
}
