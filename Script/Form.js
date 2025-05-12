// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    // Get form element
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Disable the button immediately
            submitBtn.disabled = true;
            
            // Show loading spinner
            const spinner = submitBtn.querySelector('.spinner');
            const btnText = submitBtn.querySelector('span');
            
            btnText.style.display = 'none';
            spinner.style.display = 'inline-block';
            
            // Form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (name.length < 2) {
                showFormMessage('Please enter a valid name', 'error');
                resetButton();
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                resetButton();
                return;
            }
            
            if (message.length < 10) {
                showFormMessage('Message must be at least 10 characters long', 'error');
                resetButton();
                return;
            }
            
            try {
                // Prepare form data
                const formData = new FormData(form);
                formData.append('redirect', 'false');

                // Send form data to Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                console.log('Form submission response:', data); // Debug log

                // Show success message and reset form
                showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                form.reset();
                
                // Ensure message is visible
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) {
                console.error('Form submission error:', error);
                showFormMessage('Oops! There was a problem submitting your form. Please try again.', 'error');
            } finally {
                // Always reset button state after submission attempt
                resetButton();
            }
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    // Helper function to show form message
    function showFormMessage(text, type) {
        // Clear any existing messages first
        formMessage.innerHTML = '';
        
        formMessage.style.cssText = `
            display: block !important;
            margin-top: 20px;
            padding: 15px;
            background-color: ${type === 'error' ? '#f8d7da' : '#d4edda'};
            border: 1px solid ${type === 'error' ? '#f5c6cb' : '#c3e6cb'};
            border-radius: 8px;
            color: ${type === 'error' ? '#721c24' : '#155724'};
            position: relative;
            z-index: 1000;
            opacity: 1;
            visibility: visible;
        `;
        
        formMessage.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="font-size: 24px;">${type === 'error' ? '❌' : '✅'}</div>
                <div>
                    <h4 style="margin: 0 0 5px 0; font-weight: 600;">${type === 'error' ? 'Error!' : 'Success!'}</h4>
                    <p style="margin: 0;">${text}</p>
                </div>
            </div>
        `;
        
        // Auto-hide messages after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.innerHTML = '';
        }, 5000);
    }
    
    // Helper function to reset button state
    function resetButton() {
        const spinner = submitBtn.querySelector('.spinner');
        const btnText = submitBtn.querySelector('span');
        
        btnText.style.display = 'inline-block';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
    }
});