const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  referralSource: string;
}

export const submitContactForm = async (formData: ContactFormData) => {
  try {
    const apiUrl = `${SUPABASE_URL}/functions/v1/send-contact-email`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit form');
    }

    return await response.json();
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw error;
  }
};