// Theme toggle functionality
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('vms-theme') || 'light';
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('vms-theme', currentTheme);
        });
        
        // Simulate live data updates for VMS
        function updateVMSData() {
            // Update people count randomly
            const peopleCount = document.querySelector('.analytics-card:nth-child(2) .analytics-value');
            const currentCount = parseInt(peopleCount.textContent.replace(/,/g, ''));
            const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
            const newCount = Math.max(1000, Math.min(1500, currentCount + change));
            peopleCount.textContent = newCount.toLocaleString();
            
            // Update alerts count
            const alertsCount = document.querySelector('.analytics-card:nth-child(3) .analytics-value');
            const currentAlerts = parseInt(alertsCount.textContent);
            const alertChange = Math.random() > 0.7 ? 1 : 0; // 30% chance to increase
            const newAlerts = Math.min(20, currentAlerts + alertChange);
            alertsCount.textContent = newAlerts;
            
            // Update navbar badge
            const navBadge = document.querySelector('.nav-item:nth-child(5) .nav-badge');
            navBadge.textContent = newAlerts;
            
            // Randomly toggle camera status
            const cameraStatuses = document.querySelectorAll('.camera-status');
            cameraStatuses.forEach(status => {
                if (Math.random() > 0.95) { // 5% chance to change status
                    if (status.classList.contains('online')) {
                        status.classList.remove('online');
                        status.classList.add('offline');
                    } else if (status.classList.contains('offline')) {
                        status.classList.remove('offline');
                        status.classList.add('online');
                    }
                }
            });
        }
        
        // Update VMS data every 5 seconds
        setInterval(updateVMSData, 5000);
        
      
        // Add expand functionality to camera feeds
        const expandButtons = document.querySelectorAll('.fa-expand');
        expandButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const cameraCard = this.closest('.camera-card');
                cameraCard.style.transform = cameraCard.style.transform ? '' : 'scale(1.05)';
                this.classList.toggle('fa-expand');
                this.classList.toggle('fa-compress');
            });
        });