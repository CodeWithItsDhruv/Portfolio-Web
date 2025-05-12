// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    // Get form element
    const form = document.getElementById('contactForm');
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
            if (name.length < 2 || !isValidEmail(email) || message.length < 10) {
                resetButton();
                return;
            }
            
            try {
                // Create a plain object with form data
                const formData = {
                    access_key: '97f37cb7-3f83-4ce0-83b7-16fa58ee9e80',
                    name: name,
                    email: email,
                    message: message,
                    subject: 'New Contact Form Submission',
                    from_name: 'Portfolio Contact Form',
                    botcheck: '',
                    redirect: false
                };

                // Send form data to Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    // Reset form on success
                    form.reset();
                }
            } catch (error) {
                console.error('Form submission error:', error);
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
    
    // Helper function to reset button state
    function resetButton() {
        const spinner = submitBtn.querySelector('.spinner');
        const btnText = submitBtn.querySelector('span');
        
        btnText.style.display = 'inline-block';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
    }
});