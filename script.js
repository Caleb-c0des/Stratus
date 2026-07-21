tsParticles.load("tsparticles", {
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "attract" /* Pulls nodes towards the mouse cursor */
        },
        resize: true
      },
      modes: {
        attract: {
          distance: 200,
          duration: 0.4,
          factor: 0.3 /* Strength of the magnetic pull */
        }
      }
    },
    particles: {
      /* Color rotation matching the screenshot (Purples, Cyans, Emeralds) */
      color: {
        value: ["#a855f7", "#06b6d4", "#10b981", "#6366f1"]
      },
      links: {
        color: "#ffffff",
        distance: 120,
        enable: true,
        opacity: 0.02,
        width: 1
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out"
        },
        random: true,
        speed: 3.9,
        straight: false
      },
      number: {
        density: {
          enable: true,
          area: 1000
        },
        value: 120
      },
      opacity: {
        value: { min: 0.2, max: 0.9 }
      },
      shape: {
        type: "circle"
      },
      size: {
        value: { min: 1.3, max: 3.1 }
      }
    },
    detectRetina: true
  });
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