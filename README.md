# Express PDF Generator
Custom PDF generation service built with Express, EJS, and Puppeteer, designed for client-specific PDF templates.

## Features
- Maps JSON input to an HTML template.
- Renders HTML as a PDF using Puppeteer.
- Returns PDF via HTTP response with proper Content-Type.
- Docker-ready for easy deployment.

## Quick Start
Run locally:
```bash
npm install
npm run dev
```
Or with Docker:
```bash
docker build -t express-pdf-generator .
docker run -p 5000:5000 express-pdf-generator
```
Access the service at http://localhost:5000.

## How It Works
- Send JSON data to the API.
- Data is mapped to an HTML template.
- HTML is rendered as PDF and returned.

## Requirements
- Node.js 18+
- Docker (optional, for containerized deployment)
