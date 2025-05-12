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
                    // Add success message styles directly
                    formMessage.style.cssText = `
                        display: block;
                        margin-top: 20px;
                        padding: 15px;
                        background-color: #d4edda;
                        border: 1px solid #c3e6cb;
                        border-radius: 8px;
                        color: #155724;
                    `;
                    
                    formMessage.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="font-size: 24px;">✅</div>
                            <div>
                                <h4 style="margin: 0 0 5px 0; font-weight: 600;">Success!</h4>
                                <p style="margin: 0;">Thank you! Your message has been sent successfully.</p>
                            </div>
                        </div>
                    `;
                    
                    form.reset();
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
        // Add error message styles directly
        formMessage.style.cssText = `
            display: block;
            margin-top: 20px;
            padding: 15px;
            background-color: ${type === 'error' ? '#f8d7da' : '#d4edda'};
            border: 1px solid ${type === 'error' ? '#f5c6cb' : '#c3e6cb'};
            border-radius: 8px;
            color: ${type === 'error' ? '#721c24' : '#155724'};
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
        
        // Only auto-hide error messages
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