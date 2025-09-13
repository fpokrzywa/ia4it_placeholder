import emailjs from '@emailjs/browser';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  referralSource: string;
}

// Initialize EmailJS with your public key
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'; // You'll need to replace this
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // You'll need to replace this
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // You'll need to replace this

export const submitContactForm = async (formData: ContactFormData) => {
  try {
    // For now, let's use a simple webhook service for testing
    // This will send the form data to a webhook that can forward it as an email
    
    const webhookUrl = 'https://hook.eu2.make.com/YOUR_WEBHOOK_ID'; // Replace with actual webhook
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
        subject: 'New Contact Form Submission from IA4IT Website'
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    return { success: true, message: 'Form submitted successfully' };
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Fallback: try to send via EmailJS if webhook fails
    try {
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        referral_source: formData.referralSource,
        message: `New contact form submission from ${formData.firstName} ${formData.lastName} (${formData.email}). They heard about us through: ${formData.referralSource}`,
        to_email: 'intelligentautomation4it@gmail.com'
      };

      // This will only work if you set up EmailJS
      if (EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );
        return { success: true, message: 'Form submitted successfully via EmailJS' };
      }
    } catch (emailjsError) {
      console.error('EmailJS fallback failed:', emailjsError);
    }
    
    throw error;
  }
};