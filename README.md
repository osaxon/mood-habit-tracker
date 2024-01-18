# Mood Habit Tracker

A habit tracking application built with Next.JS, Auth.JS and Prisma.

[Live Demo](https://mood-habit-tracker.vercel.app/)

## Features

- 🔐 **Auth**: Role based auth provided by AuthJS and the Prisma Adapter
- ⚛️ **Server Components**: React Server Components used to fetch data server side
- 🪣 **Image upload**: Users can change their profile picture which is securely stored in AWS S3 bucket via UploadThing
- 📊 **Dashboards**: Responsive dashboard for users administrators
- 📧 **Emails**: Email link with login for new users

## Pre-requisites

- Node.JS v18 or higher.
- MySQL database URL. This can be hosted or a local development server.
- SendGrid developer account. For sending the automated emails from Auth.JS
- GitHub OAuth credentials. Or other preferred OAuth provider (See AuthJS docs for supported providers)
- Uploadthing API access for image upload.

## Installation

```bash
npm run install
npm run db-push
```

To run launch the Prisma Studio:

```bash
npm run db-start
```

