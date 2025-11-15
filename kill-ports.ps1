# Kill All Open Ports Script
# This script finds and terminates all processes listening on TCP ports

Write-Host "=== Kill All Open Ports ===" -ForegroundColor Cyan
Write-Host ""

# Get all TCP connections in LISTEN state
$listeners = Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue

if (-not $listeners) {
    Write-Host "No listening ports found." -ForegroundColor Yellow
    exit 0
}

# Group by process ID to avoid killing the same process multiple times
$processIds = $listeners | Select-Object -ExpandProperty OwningProcess -Unique

Write-Host "Found $($processIds.Count) unique process(es) listening on ports:" -ForegroundColor Green
Write-Host ""

# Display information about each process
foreach ($pid in $processIds) {
    try {
        $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
        if ($process) {
            $ports = ($listeners | Where-Object { $_.OwningProcess -eq $pid } | Select-Object -ExpandProperty LocalPort) -join ", "
            Write-Host "  PID: $pid | Process: $($process.ProcessName) | Ports: $ports" -ForegroundColor White
        }
    } catch {
        Write-Host "  PID: $pid | Process: Unknown | Error getting process info" -ForegroundColor Gray
    }
}

Write-Host ""
$confirmation = Read-Host "Do you want to kill all these processes? (y/n)"

if ($confirmation -eq 'y' -or $confirmation -eq 'Y') {
    Write-Host ""
    Write-Host "Killing processes..." -ForegroundColor Yellow
    
    $killedCount = 0
    $failedCount = 0
    
    foreach ($pid in $processIds) {
        try {
            $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
            if ($process) {
                $processName = $process.ProcessName
                Stop-Process -Id $pid -Force -ErrorAction Stop
                Write-Host "  [OK] Killed PID $pid ($processName)" -ForegroundColor Green
                $killedCount++
            }
        } catch {
            Write-Host "  [FAIL] Failed to kill PID $pid - $($_.Exception.Message)" -ForegroundColor Red
            $failedCount++
        }
    }
    
    Write-Host ""
    Write-Host "Summary: $killedCount killed, $failedCount failed" -ForegroundColor Cyan
} else {
    Write-Host "Operation cancelled." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Cyan
