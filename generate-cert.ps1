# Generate self-signed SSL certificate for HTTPS server
# This script creates key.pem and cert.pem files

$certPath = Join-Path $PSScriptRoot "cert.pem"
$keyPath = Join-Path $PSScriptRoot "key.pem"

Write-Host "Generating self-signed SSL certificate..." -ForegroundColor Green

# Generate private key and certificate
openssl req -nodes -new -x509 -keyout $keyPath -out $certPath -days 365 -subj "/CN=localhost"

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nCertificate files generated successfully!" -ForegroundColor Green
    Write-Host "Files created:" -ForegroundColor Cyan
    Write-Host "  - key.pem" -ForegroundColor Yellow
    Write-Host "  - cert.pem" -ForegroundColor Yellow
    Write-Host "`nYou can now run: node server.js" -ForegroundColor Cyan
} else {
    Write-Host "`nError: OpenSSL not found or failed to generate certificate" -ForegroundColor Red
    Write-Host "Please install OpenSSL or use the following command manually:" -ForegroundColor Yellow
    Write-Host "openssl req -nodes -new -x509 -keyout key.pem -out cert.pem -days 365" -ForegroundColor White
}
