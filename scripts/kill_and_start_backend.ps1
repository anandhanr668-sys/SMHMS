# Kill any process listening on port 4000, then start backend dev server
$port = 4000
try {
  $existingConn = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
  if ($existingConn) {
    $existingPid = $existingConn | Select-Object -First 1 -ExpandProperty OwningProcess
    if ($existingPid) {
      Write-Host "Killing process $existingPid that is listening on port $port..."
      Stop-Process -Id $existingPid -Force -ErrorAction SilentlyContinue
      Start-Sleep -Seconds 1
    }
  }
} catch {
  Write-Host "Failed to query existing connections: $_"
}

# Start the backend dev server in its folder
$backendPath = Join-Path $PSScriptRoot "..\hms-backend"
Write-Host "Starting backend (npm run dev) in $backendPath"
Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory $backendPath
Write-Host "Backend start command issued."
