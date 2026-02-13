const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const HTTP_PORT = 3000;
const HTTPS_PORT = 3443;
const RESPONSE_TEXT = 'trial,2126.02.16';

// Request handler function
function handleRequest(req, res) {
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(RESPONSE_TEXT);
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
}

// Create HTTP server
const httpServer = http.createServer(handleRequest);

httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP Server running at http://localhost:${HTTP_PORT}/`);
});

// Create HTTPS server (self-signed certificate)
// Check if certificate files exist
const certPath = path.join(__dirname, 'cert.pem');
const keyPath = path.join(__dirname, 'key.pem');

if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
  const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  };

  const httpsServer = https.createServer(httpsOptions, handleRequest);

  httpsServer.listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server running at https://localhost:${HTTPS_PORT}/`);
  });
} else {
  console.log('HTTPS certificate files not found. Run the following command to generate:');
  console.log('openssl req -nodes -new -x509 -keyout key.pem -out cert.pem -days 365');
}
