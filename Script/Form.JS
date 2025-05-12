// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!form || !formMessage) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get the submit button and show loading state
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('span');
        const btnSpinner = submitBtn.querySelector('.spinner');
        
        // Disable button and show spinner
        submitBtn.disabled = true;
        btnText.style.opacity = '0';
        btnText.style.visibility = 'hidden';
        btnSpinner.style.display = 'block';

        // Show sending message
        formMessage.style.display = 'block';
        formMessage.innerHTML = `
            <div class="info-message">
                <div class="message-icon">📤</div>
                <div class="message-text">
                    <h4>Sending message...</h4>
                    <p>Please wait while we process your request.</p>
                </div>
            </div>
        `;

        try {
            // Create form data object
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                access_key: '97f37cb7-3f83-4ce0-83b7-16fa58ee9e80',
                subject: 'New Contact Form Submission - Portfolio',
                from_name: document.getElementById('name').value
            };

            // Attempt to send form data
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Form submission response:', data);
            
            if (data.success) {
                showSuccessMessage();
                form.reset();
            } else {
                throw new Error(data.message || 'Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            // Use a more user-friendly error message
            const errorMessage = error.message.includes('Failed to fetch') 
                ? 'Network error. Please check your internet connection and try again.'
                : error.message;
            showErrorMessage(errorMessage);
        } finally {
            // Re-enable button and restore original state after a delay
            setTimeout(() => {
                submitBtn.disabled = false;
                btnText.style.opacity = '1';
                btnText.style.visibility = 'visible';
                btnSpinner.style.display = 'none';
            }, 1000);
        }
    });

    function showSuccessMessage() {
        formMessage.innerHTML = `
            <div class="success-message" style="display: block; background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <div class="message-icon" style="font-size: 24px;">✅</div>
                <div class="message-text">
                    <h4 style="margin: 0 0 10px 0;">Message Sent Successfully!</h4>
                    <p style="margin: 0;">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
            </div>
        `;
        formMessage.style.display = 'block';
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function showErrorMessage(errorMessage) {
        formMessage.innerHTML = `
            <div class="error-message" style="display: block; background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <div class="message-icon" style="font-size: 24px;">❌</div>
                <div class="message-text">
                    <h4 style="margin: 0 0 10px 0;">Failed to send your message</h4>
                    <p style="margin: 0;">Please try again later or reach us at dhurvrath@gmail.com</p>
                    <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #721c24;">Error: ${errorMessage}</p>
                </div>
            </div>
        `;
        formMessage.style.display = 'block';
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});