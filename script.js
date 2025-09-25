document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger-menu');
    const nav = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list li');
    const contactForm = document.getElementById('contact-form'); // Added back

    // 1. Mobile Menu Toggle
    const navSlide = () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (nav.classList.contains('nav-active')) {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            } else {
                link.style.animation = '';
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    };

    burger.addEventListener('click', navSlide);

    // Close menu when a link is clicked (for mobile)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                navSlide();
            }
        });
    });

    // 2. Form Submission Intercept and WhatsApp Redirect
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // STOP the default form submission (prevents page refresh)

            // 1. Capture user input from the fields
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // 2. Construct the pre-filled WhatsApp message
            let waMessage = `Hello Patience,\n`;
            waMessage += `I'm ${name} (${email}) and I saw your portfolio. I'm interested in discussing:\n\n`;
            waMessage += `${message}`;
            
            // 3. Encode the message for the URL
            const encodedMessage = encodeURIComponent(waMessage);

            // 4. Set your WhatsApp number (Country code first, no spaces or dashes)
            const waNumber = '263786149821'; 

            // 5. Build the final URL
            const whatsappURL = `https://wa.me/${waNumber}?text=${encodedMessage}`;

            // 6. Redirect the user to WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Optional: Clear the form fields after redirection
            contactForm.reset(); 
        });
    }
    // 3. Modal Functionality for Creative Designs
    window.openModal = function(imgSrc, event) {
        // Prevent the default link action
        event.preventDefault(); 
        
        const modal = document.getElementById("designModal");
        const modalImg = document.getElementById("modalImage");
        
        // Set the image source and display the modal
        modalImg.src = imgSrc;
        modal.style.display = "block";
    }

    window.closeModal = function() {
        const modal = document.getElementById("designModal");
        modal.style.display = "none";
    }

    // Optional: Close modal if user clicks outside the image box
    const modal = document.getElementById("designModal");
    modal.onclick = function(e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    }
}); // End of DOMContentLoaded
