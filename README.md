# IA4IT - Intelligent Automation by Design

A modern contact form website for IA4IT with email functionality.

## Setup Instructions

### Option 1: Using Make.com Webhook (Recommended for quick setup)

1. Go to [Make.com](https://www.make.com) and create a free account
2. Create a new scenario with a Webhook trigger
3. Copy the webhook URL
4. Add an Email module to send emails to `intelligentautomation4it@gmail.com`
5. Replace `YOUR_WEBHOOK_ID` in `src/services/contactService.ts` with your webhook ID

### Option 2: Using EmailJS (Alternative)

1. Go to [EmailJS](https://www.emailjs.com) and create a free account
2. Set up an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Public Key, Service ID, and Template ID
5. Replace the placeholder values in `src/services/contactService.ts`

### Option 3: Using Supabase Edge Functions (Advanced)

The project includes a Supabase edge function that can be configured with Resend for email delivery.

## Development

```bash
npm install
npm run dev
```

## Deployment

The site can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.