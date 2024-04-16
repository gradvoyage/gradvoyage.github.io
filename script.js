
// Adjusting Button Click to Scroll Down


document.addEventListener('DOMContentLoaded', function() {
    if (performance.navigation.type === 2) {
        window.location.reload(); // Force reload of the page
    }
    const submitButton = document.querySelector('.contact-form button');
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    const form = document.querySelector('.contact-form');

    

    function validateField(input) {
        let message = '';
        const messageSpan = document.getElementById(input.id + '-message');

        
        
        
        if (input.value === '') {
            message = 'This field is required.';
        } else if (input.type === 'email' && !input.value.includes('@')) {
            message = 'Please enter a valid email address.';
        } else if (input.id === 'country-code') {
            if (!input.value.match(/^\+\d+$/)) {
                message = 'Please enter a valid country code.(ex "+1")';
            }
        } else if (input.type === 'tel') {
            if (!input.value.match(/^\d{10}$/)) { // Assuming 10-digit phone numbers, adjust regex as needed
                message = 'Please enter a valid phone number (10 digits).';
            }
        }
         else if (input.type === 'date') {
            const today = new Date().toISOString().split('T')[0];
            if (input.value < today) {
                message = 'Please enter a future date.';
            }
        } else if (input.id === 'appointment-time') {
            if (input.value === '') {
                message = 'Please specify a time with AM/PM.';
            }
        }
    
        if (messageSpan) {
            messageSpan.textContent = message;
            messageSpan.style.display = message ? 'block' : 'none';
        } else {
            console.error('Failed to find message span for', input.id);
        }
        
        return message === '';
    }
    

    function updateSubmitButton() {
        const allValid = Array.from(inputs).every(validateField);
        submitButton.disabled = !allValid;
    }

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
            updateSubmitButton();
        });
        input.addEventListener('change', () => {
            validateField(input);
            updateSubmitButton();
        });
    });
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        if (!submitButton.disabled) {
            const formData = new FormData(form);

            // Using Fetch to POST data
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    form.reset(); // Reset the form after successful submission
                    alert('Thank you for your submission!');
                } else if (data.error) {
                    alert('An error occurred: ' + data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while submitting the form.');
            });
        }
    });
    

    // Initial validation check
    updateSubmitButton();
});



document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor click behavior
        const targetId = this.getAttribute('href'); // Get the href attribute of the clicked element

        if (targetId === '#' || targetId === '#home') { // Check if it's the Home link
            window.scrollTo({ // Scroll to the top of the document
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetSection = document.querySelector(targetId); // Find the section that corresponds to the href
            if (!targetSection) {
                return; // If no section found, do nothing (safety check)
            }
            const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get the height of the navbar
            let additionalOffset = 0;

            if (targetId === "#roadmap") {
                additionalOffset = 180; // Specific adjustment for Roadmap
            }

            const scrollTarget = targetSection.offsetTop - navbarHeight - additionalOffset; // Calculate position to scroll to
            window.scrollTo({
                top: scrollTarget,
                behavior: 'smooth'
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle hover content
    function toggleHoverContent() {
        // Check if the screen width is less than or equal to 1024px
        if (window.innerWidth <= 1024) {
            this.classList.toggle('active-hover');
        }
    }

    // Select all roadmap steps
    const roadmapSteps = document.querySelectorAll('.roadmap-step');

    roadmapSteps.forEach(step => {
        // Add click event listener to each step
        step.addEventListener('click', toggleHoverContent);
    });
});



