// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    // Get form element
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading spinner
            const spinner = submitBtn.querySelector('.spinner');
            const btnText = submitBtn.querySelector('span');
            
            btnText.style.display = 'none';
            spinner.style.display = 'inline-block';
            submitBtn.disabled = true;
            
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
            
            // Prepare form data
            const formData = new FormData(form);
            formData.append('redirect', 'false'); // Prevent redirection
            
            // Send form data to Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                    form.reset();
                    // Scroll the success message into view
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    throw new Error(data.message || 'Form submission failed');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                showFormMessage('Oops! There was a problem submitting your form. Please try again.', 'error');
            })
            .finally(() => {
                resetButton();
            });
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    // Helper function to show form message
    function showFormMessage(text, type) {
        formMessage.innerHTML = `
            <div class="${type}-message">
                <div class="message-icon">${type === 'success' ? '✅' : '❌'}</div>
                <div class="message-text">
                    <h4>${type === 'success' ? 'Success!' : 'Error!'}</h4>
                    <p>${text}</p>
                </div>
            </div>
        `;
        formMessage.style.display = 'block';
        
        // Only auto-hide error messages, keep success messages visible
        if (type === 'error') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
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