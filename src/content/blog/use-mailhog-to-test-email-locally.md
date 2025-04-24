---
title: Use MailHog to test email locally
description: A guide to using MailHog for local email testing
pubDate: 'April 24, 2025'
heroImage: '/mailhog-for-local-email-testing.webp'
---

# Use Mailhog to test email locally

> Just to note few things before we get started, the given examples are for a Node.js application and I hve used docker to run mailhog.

## What is MailHog?

Mailhog is a local email testing tool built using golang. Think of it as a replacement tool for services like mailtrap, but it's free, open source and runs on your computer. It allows you to capture and view emails sent from your application without actually sending them to the real email addresses. This is particularly useful for testing email functionality during development.

## Why use MailHog?

- **Local Testing**: MailHog allows you to test email functionality locally without sending real emails. This is especially useful for development and testing environments.
- **Easy Setup**: MailHog is easy to set up and can be run as a standalone application or in a Docker container.
- **Web Interface**: MailHog provides a web interface to view and manage captured emails, making it easy to inspect the content and headers of the emails.
- **SMTP Server**: MailHog acts as a local SMTP server, allowing you to configure your application to send emails to it instead of a real email server.

## Setting up MailHog

If you are on `MacOS` setting up mailhog is quite simple, considering you already using homebrew.
You can install mailhog using the following command:

```bash
brew update && brew install mailhog
```

And to start mailhog you can run the following command:

```bash
mailhog
```

This will start mailhog on port 8025, you can access the web interface by going to `http://localhost:8025` in your browser.

The official repo has guide for installing it on other platforms: <https://github.com/mailhog/MailHog>

### Setting up MailHog with Docker

On the official Github Repo for [MailHog](https://github.com/mailhog/MailHog) they have provided a Dockerfile, which you can use to build a docker image and run it locally. I have created a simple repository which combines the dockerfile and docker-compose file to run mailhog locally. You can find the repository [mailhog-docker](https://github.com/azs06/mailhog-docker) on my Github.
You can run the following command to start mailhog locally:

```bash
git clone git@github.com:azs06/mailhog-docker.git
cd mailhog-docker
docker-compose up -d
```

This will start mailhog on port 8025, you can access the web interface by going to `http://localhost:8025` in your browser.
You can also run the following command to stop mailhog:

```bash
docker-compose down
```

By default MailHog uses port 1025 for SMTP and 8025 for the web interface. You can change these ports in the configuration if needed. If you are using Docker, you can also map these ports to different ports on your host computer by modifying the `docker-compose.yml` file.

## Configuring your application to use MailHog

I will be showing an example of how to configure and use MailHog with node.js and nodemailer. You can use any other library to send emails, the configuration will be similar.

### Using Nodemailer with MailHog

To use Mailhog with Nodemailer, you need to configure the SMTP settings in your application. Here's an example of how to do this:

```typescript
import nodemailer from "nodemailer";

const isDev = process.env.NODE_ENV === "development";

export const mailer = nodemailer.createTransport({
  host: isDev ? "localhost" : process.env.SMTP_HOST,
  port: isDev ? 1025 : Number(process.env.SMTP_PORT),
  secure: isDev ? false : true, // false for development
  auth: isDev
    ? undefined // no auth on MailHog
    : { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  tls: { rejectUnauthorized: false },
});
```

```.env
SMTP_HOST="localhost"
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=""
SMTP_PASSWORD=""
FRONTEND_URL=http://localhost:3000
MAIL_FROM="admin@express-auth-api.com"
```

### Sending an email

```typescript
import { mailer } from "../../config/mailer.ts";
await mailer.sendMail({
    from: process.env.MAIL_FROM,
    to: user.email,
    subject: "Your password reset link",
    text: `Reset your password: ${resetUrl}`,
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. Link expires in 1 hour.</p>`,
});
```

### Viewing the email

Once you have sent an email using MailHog, you can view it in the MailHog web interface. Open your browser and go to `http://localhost:8025`. You should see the email you just sent in the list of captured emails.
You can click on the email to view its content, headers, and other details. This allows you to verify that the email was sent correctly and contains the expected information.

## Conclusion

MailHog is a powerful tool for testing email functionality for your applications. Services like mailtrap are great, but they are not free and have limitations on the number of emails you can send. MailHog is a great alternative for local testing and development. It is easy to set up and provides a web interface to view and manage captured emails.
