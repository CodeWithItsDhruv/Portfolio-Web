export default async function handler(req, res) {
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