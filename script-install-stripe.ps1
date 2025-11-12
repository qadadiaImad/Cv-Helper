# Create directory
New-Item -ItemType Directory -Force -Path "$env:LOCALAPPDATA\stripe"

# Download latest Stripe CLI
$latestRelease = Invoke-RestMethod -Uri "https://api.github.com/repos/stripe/stripe-cli/releases/latest"
$downloadUrl = $latestRelease.assets | Where-Object { $_.name -like "*windows_x86_64.zip" } | Select-Object -ExpandProperty browser_download_url

Invoke-WebRequest -Uri $downloadUrl -OutFile "$env:TEMP\stripe.zip"

# Extract
Expand-Archive -Path "$env:TEMP\stripe.zip" -DestinationPath "$env:LOCALAPPDATA\stripe" -Force

# Add to PATH for current session
$env:Path += ";$env:LOCALAPPDATA\stripe"

# Verify installation
stripe --version