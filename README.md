# Uppy Companion Server

A server implementation for Uppy using @uppy/companion to handle file uploads and cloud provider integrations.

## Setup

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following variables:

## Environment Variables

```env
PORT=3020                      # Server port
PUBLIC_DOMAIN=localhost:3020   # Public domain for the server

# AWS S3 Configuration
COMPANION_AWS_KEY=your_aws_key
COMPANION_AWS_SECRET=your_aws_secret
COMPANION_AWS_BUCKET=your_bucket_name
COMPANION_AWS_REGION=your_aws_region
```

## Running the Server

```bash
npm start
```

## Features

- S3 upload support
- CORS enabled
- Session handling
- Temporary file storage

## Security Notes

- Make sure to set proper CORS settings for production
- Change the session secret in production
- Secure your AWS credentials

## License

MIT
