# ZAB License Server

Node.js HTTP and HTTPS server that returns license information.

## Features

- HTTP server on port 3000
- HTTPS server on port 3443
- GET method returns: `trial,2026.02.16`

## Setup

### 1. Generate SSL Certificate (for HTTPS)

**Option A: Using PowerShell script**
```powershell
.\generate-cert.ps1
```

**Option B: Using OpenSSL directly**
```bash
openssl req -nodes -new -x509 -keyout key.pem -out cert.pem -days 365
```

### 2. Start the Server

```bash
node server.js
```

## Usage

### HTTP Request
```bash
curl http://localhost:3000
```

### HTTPS Request
```bash
curl -k https://localhost:3443
```

## Response

Both servers return:
```
trial,2026.02.16
```

## Notes

- The HTTP server will start even if certificate files are not found
- The HTTPS server requires `cert.pem` and `key.pem` files
- Self-signed certificates will show security warnings in browsers
