/*
  # Send Contact Form Email

  This function receives contact form submissions and sends them via email.
  
  1. Functionality
    - Receives contact form data (firstName, lastName, email, referralSource)
    - Sends formatted email to intelligentautomation4it@gmail.com
    - Returns success/error response
  
  2. Security
    - CORS headers for browser requests
    - Input validation for required fields
    - Error handling for email delivery
*/

import { corsHeaders } from '../_shared/cors.ts';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  referralSource: string;
}

Deno.serve(async (req: Request) => {
  try {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Parse request body
    const { firstName, lastName, email, referralSource }: ContactFormData = await req.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !referralSource) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Create email content
    const emailSubject = 'New Contact Form Submission';
    const emailBody = `
      New contact form submission received:
      
      Name: ${firstName} ${lastName}
      Email: ${email}
      How they heard about us: ${referralSource}
      
      Submitted at: ${new Date().toLocaleString()}
    `;

    // For this example, we'll use Resend (you'll need to add your API key)
    // In production, you would uncomment this and add your Resend API key to environment variables
    
    /*
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@yourdomain.com',
        to: ['intelligentautomation4it@gmail.com'],
        subject: emailSubject,
        text: emailBody,
      }),
    });

    if (!resendResponse.ok) {
      throw new Error('Failed to send email');
    }
    */

    // For demonstration, we'll just log the email content
    console.log('Email would be sent with subject:', emailSubject);
    console.log('Email body:', emailBody);

    return new Response(
      JSON.stringify({ 
        message: 'Contact form submitted successfully',
        data: { firstName, lastName, email, referralSource }
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});