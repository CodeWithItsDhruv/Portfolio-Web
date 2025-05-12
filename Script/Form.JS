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
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Create form data object with all required fields
            const formData = {
                access_key: '97f37cb7-3f83-4ce0-83b7-16fa58ee9e80',
                from_name: name,
                name: name,
                email: email,
                message: message,
                subject: `Portfolio Contact: ${name}`,
                botcheck: '',
            };

            console.log('Sending form data:', formData); // Debug log

            // Send the form data
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log('Response:', data); // Debug log
            
            if (data.success) {
                showSuccessMessage();
            } else {
                throw new Error(data.message || 'Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorMessage(error.message);
        } finally {
            // Re-enable button and restore original state
            submitBtn.disabled = false;
            btnText.style.opacity = '1';
            btnText.style.visibility = 'visible';
            btnSpinner.style.display = 'none';
            
            // Make sure message is visible and scroll to it
            formMessage.style.display = 'block';
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });

    function showSuccessMessage() {
        formMessage.innerHTML = `
            <div class="success-message">
                <div class="message-icon">✅</div>
                <div class="message-text">
                    <h4>Message Sent Successfully!</h4>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                </div>
            </div>
        `;
        form.reset();
    }

    function showErrorMessage(errorMsg = '') {
        formMessage.innerHTML = `
            <div class="error-message">
                <div class="message-icon">❌</div>
                <div class="message-text">
                    <h4>Failed to send your message</h4>
                    <p>${errorMsg || 'Please try again later or reach us at dhurvrath@gmail.com'}</p>
                </div>
            </div>
        `;
    }
});