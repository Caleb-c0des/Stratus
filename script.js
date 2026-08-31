
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
    function updateColorGrade() {
            const lift = parseFloat(document.getElementById('slider-lift').value);
            const gamma = parseFloat(document.getElementById('slider-gamma').value);
            const gain = parseFloat(document.getElementById('slider-gain').value);
            const hue = parseInt(document.getElementById('slider-hue').value);

            document.getElementById('val-lift').innerText = lift.toFixed(1) + 'x';
            document.getElementById('val-gamma').innerText = gamma.toFixed(1) + 'x';
            document.getElementById('val-gain').innerText = gain.toFixed(1) + 'x';
            document.getElementById('val-hue').innerText = hue + ' deg';

            const viewport = document.getElementById('grade-viewport');
            const lutIndicator = document.getElementById('lut-indicator');
            const targetRing = document.getElementById('target-ring');
            
            const brightness = lift * 0.9;
            const contrast = gamma * 1.1;
            const saturate = gain * 1.25;
            
            viewport.style.filter = `brightness(${brightness}) contrast(${contrast}) saturate(${saturate}) hue-rotate(${hue}deg)`;
            
            // Subtle dynamic reaction on target ring
            const scale = 0.9 + (gain * 0.1);
            targetRing.style.transform = `scale(${scale})`;

            // Dynamic LUT Labeling
            if (lift === 1 && gamma === 1 && gain === 1 && hue === 0) {
                lutIndicator.innerText = "REC.709 BASE";
            } else {
                lutIndicator.innerText = "CUSTOM GRADE ACTIVE";
            }
        }

        function resetColorGrade() {
            document.getElementById('slider-lift').value = 1.0;
            document.getElementById('slider-gamma').value = 1.0;
            document.getElementById('slider-gain').value = 1.0;
            document.getElementById('slider-hue').value = 0;
            updateColorGrade();
            openModal('Color Grade', 'Restored video preview viewport to standard REC.709 baseline.');
        }

        function applyPreset(type) {
            if(type === 'cyber') {
                document.getElementById('slider-lift').value = 0.8;
                document.getElementById('slider-gamma').value = 1.4;
                document.getElementById('slider-gain').value = 1.8;
                document.getElementById('slider-hue').value = 280;
            } else if(type === 'teal') {
                document.getElementById('slider-lift').value = 0.9;
                document.getElementById('slider-gamma').value = 1.2;
                document.getElementById('slider-gain').value = 1.3;
                document.getElementById('slider-hue').value = 190;
            } else if(type === 'vintage') {
                document.getElementById('slider-lift').value = 1.2;
                document.getElementById('slider-gamma').value = 0.9;
                document.getElementById('slider-gain').value = 0.8;
                document.getElementById('slider-hue').value = 35;
            } else if(type === 'flat') {
                document.getElementById('slider-lift').value = 1.1;
                document.getElementById('slider-gamma').value = 0.8;
                document.getElementById('slider-gain').value = 0.9;
                document.getElementById('slider-hue').value = 0;
            }
            updateColorGrade();
        }
         const heroCanvas = document.getElementById('heroCanvas');
        const heroCtx = heroCanvas.getContext('2d');
        let particles = [];
        let mouseX = -1000;
        let mouseY = -1000;

        function resizeHeroCanvas() {
            heroCanvas.width = heroCanvas.parentElement.clientWidth;
            heroCanvas.height = heroCanvas.parentElement.clientHeight;
            initParticles();
        }

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.radius = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? '#8b5cf6' : '#06b6d4';
            }

            update() {
                // Return to base position slightly
                this.vx += (this.baseX - this.x) * 0.001;
                this.vy += (this.baseY - this.y) * 0.001;

                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction physics
                let dx = mouseX - this.x;
                let dy = mouseY - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    let force = (150 - dist) / 150;
                    this.x -= dx * force * 0.05;
                    this.y -= dy * force * 0.05;
                }
            }

            draw() {
                heroCtx.beginPath();
                heroCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                heroCtx.fillStyle = this.color;
                heroCtx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.min(100, Math.floor(heroCanvas.width / 12));
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(
                    Math.random() * heroCanvas.width,
                    Math.random() * heroCanvas.height
                ));
            }
        }

        function drawHeroConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 110) {
                        heroCtx.beginPath();
                        heroCtx.moveTo(particles[i].x, particles[i].y);
                        heroCtx.lineTo(particles[j].x, particles[j].y);
                        heroCtx.strokeStyle = `rgba(139, 92, 246, ${0.12 * (1 - dist / 110)})`;
                        heroCtx.lineWidth = 0.8;
                        heroCtx.stroke();
                    }
                }
            }
        }

        function heroAnimationLoop() {
            heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawHeroConnections();
            requestAnimationFrame(heroAnimationLoop);
        }

        window.addEventListener('resize', resizeHeroCanvas);
        heroCanvas.addEventListener('mousemove', (e) => {
            const rect = heroCanvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });
        heroCanvas.addEventListener('mouseleave', () => {
            mouseX = -1000;
            mouseY = -1000;
        });

        // Initialize Hero canvas
        resizeHeroCanvas();
        heroAnimationLoop();
        function handleFormSubmit(event) {
            event.preventDefault();

            const form = event.target;
            const feedback = document.getElementById('formFeedback');

            // Retrieve form input values
            const clientName = document.getElementById('clientName').value;
            const clientEmail = document.getElementById('clientEmail').value;
            const projectScope = document.getElementById('projectScope').value;
            const projectBudget = document.getElementById('projectBudget').value;
            const projectMessage = document.getElementById('projectMessage').value;

            const payload = {
                name: clientName,
                email: clientEmail,
                scope: projectScope,
                budget: projectBudget,
                message: projectMessage,
                timestamp: new Date().toISOString()
            };

            // Show the success feedback indicator
            if (feedback) {
                feedback.classList.remove('hidden');
            }

            // Reset form inputs after submission
            form.reset();
        }