import FormData from 'form-data';
import fetch from 'node-fetch';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST method
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, message } = req.body;

        // Create form data for web3forms
        const formData = new FormData();
        formData.append('access_key', process.env.WEB3FORMS_KEY);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        formData.append('subject', 'New Contact Form Submission - Portfolio');
        formData.append('from_name', name);

        // Send to web3forms
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            return res.status(200).json({ success: true });
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Failed to send message' });
    }
} 