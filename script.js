
  let currentEasing = 'linear';

        // Select All Easing Options
        const easingCards = document.querySelectorAll('.control-number');
        const executeButton = document.getElementById('btnExecute');
        const trackNodes = document.querySelectorAll('.track-node');

        // Card Selection Event
        easingCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove active class from all cards
                easingCards.forEach(c => c.classList.remove('selected'));
                
                // Highlight clicked card
                card.classList.add('selected');
                
                // Update selected curve type
                currentEasing = card.getAttribute('data-type');
            });
        });

        // Execute Keyframes Event
        executeButton.addEventListener('click', () => {
            trackNodes.forEach(node => {
                // Clear any running animation classes
                node.className = 'track-node ' + (node.classList.contains('node-a') ? 'node-a' : 'node-b');

                // Force DOM Reflow to re-trigger animation cleanly
                void node.offsetWidth;

                // Add active execution class & selected easing type
                node.classList.add('is-playing', 'anim-' + currentEasing);
            });
        });
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // Check if the element is currently visible in the viewport
                if (entry.isIntersecting) {
                    entry.target.classList.add('active'); // Add class to trigger CSS transition
                    observer.unobserve(entry.target);     // Stop observing once animated
                }
            });
        }, {
            threshold: 0.15 // Triggers when 15% of the element is visible
        });

        // Find all elements with the .reveal class and observe them
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach((el) => observer.observe(el));
        
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-link');

    hamburgerBtn.addEventListener('click', () => {
      // Toggle the 'active' class on both the button and the links menu
      hamburgerBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });