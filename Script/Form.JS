// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!form || !formMessage) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent form from submitting normally

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
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Send to our API endpoint
            const response = await fetch('/api/contact', {
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
            
            if (data.success) {
                showSuccessMessage();
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorMessage();
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
    }

    function showErrorMessage() {
        formMessage.innerHTML = `
            <div class="error-message">
                <div class="message-icon">❌</div>
                <div class="message-text">
                    <h4>Failed to send your message</h4>
                    <p>Please try again later or reach us at dhurvrath@gmail.com</p>
                </div>
            </div>
        `;
    }
});