document.addEventListener('DOMContentLoaded', () => {

    const appContainer = document.getElementById('app-container');
    const loginPage = document.getElementById('login-page');
    const dashboard = document.getElementById('dashboard');
    const loginButton = document.getElementById('login-button');
    const desktopLogoutButton = document.getElementById('desktop-logout-button');
    
    // State variables
    let activeSection = 'overview';
    let selectedClass = 10;
    
    // An array of your menu items with their corresponding page IDs and icons
    const menuItems = [
        { id: 'overview', name: 'Overview', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3 3 3 0 0 0 3-3V5a3 3 0 0 0-3-3z"/><path d="M19 15v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2"/></svg>` },
        { id: 'lessons', name: 'Lessons', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>` },
        { id: 'courses', name: 'Courses', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><polyline points="10 2 10 10 16 7 16 16"/></svg>` },
        { id: 'leaderboard', name: 'Leaderboard', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M10 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3"/><path d="M14 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/><line x1="10" x2="14" y1="21" y2="21"/></svg>` },
        { id: 'progress', name: 'Progress', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M18 8h-1.25a2 2 0 0 1-1.75-1l-2.5-3a2 2 0 0 0-1.5-1H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z"/><path d="M7 15h10"/><path d="M7 11h10"/></svg>` },
        { id: 'achievements', name: 'Achievements', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M22 17V3H7v14a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3z"/><path d="M4 17h16"/></svg>` },
        { id: 'community', name: 'Community', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
        { id: 'settings', name: 'Settings', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 4.6 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1 2.83 0l.06-.06a1.65 1.65 0 0 0 1.82-.33 1.65 1.65 0 0 0 1.51-1V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0-.33 1.82l-.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1.51-1V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0-.33 1.82l-.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2z"/></svg>` },
    ];
    
    // =========================================================================
    // NEW: Component Loading Logic
    // =========================================================================

    /**
     * Loads an HTML component from a file and injects its content and scripts
     * into a target element.
     * @param {string} targetSelector - CSS selector for the element to inject into.
     * @param {string} url - URL/path to the HTML component file.
     */
    async function loadComponent(targetSelector, url) {
        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) {
            console.warn(`Target element not found: ${targetSelector}`);
            return;
        }
        
        // Clear the loading message first
        targetElement.innerHTML = ''; 

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Could not load ${url} (${response.status})`);
            
            let htmlContent = await response.text();
            
            // Use a DOMParser to safely parse the incoming HTML and extract the body's content
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            
            // Assuming the component HTML wraps its content in a single top-level tag
            const contentElement = doc.body.firstChild; 

            // Inject the HTML content into the placeholder
            // We use contentElement.innerHTML to keep the wrapper div (e.g., .rounded-lg) from the parent App.html
            targetElement.innerHTML = contentElement ? contentElement.innerHTML : ''; 

            // Find and execute any <script> blocks within the loaded content
            const scripts = doc.body.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                    document.body.appendChild(newScript); 
                } else {
                    newScript.textContent = script.textContent;
                    // Appending and removing executes the script immediately
                    document.body.appendChild(newScript).parentNode.removeChild(newScript);
                }
            });

        } catch (error) {
            targetElement.innerHTML = `<p class="p-4 text-red-500">Error loading content from ${url}.</p>`;
            console.error(`Failed to load component from ${url}:`, error);
        }
    }


    // Function to render the correct section of the dashboard
    function renderSection() {
        // Hide all content sections first
        const sections = ['overview', 'lessons', 'courses', 'leaderboard', 'progress', 'achievements', 'community', 'settings'];
        sections.forEach(id => {
            const element = document.getElementById(`${id}-content`);
            if (element) {
                element.classList.add('hidden');
            }
        });

        // Show the active section
        const activeElement = document.getElementById(`${activeSection}-content`);
        if (activeElement) {
            activeElement.classList.remove('hidden');
        }

        // SPECIAL CASE: Load external HTML components only for the OVERVIEW section
        if (activeSection === 'overview') {
            // Load the widgets dynamically into their placeholders
            loadComponent('#continue-learning-widget', 'ContinueLearning.html');
            loadComponent('#challenges-widget', 'ChallengesBoard.html');
            loadComponent('#leaderboard-preview-widget', 'LeaderBoardPreview.html');
            loadComponent('#impact-meter-widget', 'ImpactMeter.html');
        }

        // Update class numbers in relevant sections
        if (document.getElementById('lessons-class-number')) {
            document.getElementById('lessons-class-number').textContent = selectedClass;
        }
        if (document.getElementById('leaderboard-class-number')) {
            document.getElementById('leaderboard-class-number').textContent = selectedClass;
        }
    }

    // Function to update active state in both desktop and mobile navigation
    function updateActiveState(pageId) {
        document.querySelectorAll('.sidebar-item, .mobile-nav-item').forEach(item => {
            if (item.dataset.page === pageId) {
                item.classList.add('active');
                item.classList.remove('inactive');
            } else {
                item.classList.remove('active');
                item.classList.add('inactive');
            }
        });
    }

    // Function to handle page change
    function showPage(pageId) {
        activeSection = pageId;
        renderSection();
        updateActiveState(pageId);
    }
    
    // Function to render the sidebar and mobile nav items dynamically
    function renderMenuItems() {
        const desktopMenu = document.getElementById('desktop-menu-items-container');
        const mobileMenu = document.getElementById('mobile-menu-items-container');
        if (!desktopMenu || !mobileMenu) return;

        desktopMenu.innerHTML = '';
        mobileMenu.innerHTML = '';

        menuItems.forEach(item => {
            const isActive = item.id === activeSection ? 'active' : 'inactive';

            // Desktop item
            const desktopItem = document.createElement('button');
            desktopItem.className = `sidebar-item ${isActive}`;
            desktopItem.setAttribute('data-page', item.id);
            desktopItem.innerHTML = `${item.icon}<span>${item.name}</span>`;
            desktopMenu.appendChild(desktopItem);

            // Mobile item
            const mobileItem = document.createElement('button');
            mobileItem.className = `mobile-nav-item ${isActive}`;
            mobileItem.setAttribute('data-page', item.id);
            mobileItem.innerHTML = `${item.icon}<span class="mt-1">${item.name}</span>`;
            mobileMenu.appendChild(mobileItem);
        });

        // Add event listeners to nav items
        const allNavItems = document.querySelectorAll('.sidebar-item, .mobile-nav-item');
        allNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = e.currentTarget.dataset.page;
                showPage(pageId);
            });
        });
    }
    
    // Login logic
    function handleLogin(event) {
        event.preventDefault(); 
        
        // In a real application, you would validate the email and password here
        // For this example, we'll just simulate a successful login
        
        loginPage.classList.add('hidden');
        dashboard.classList.remove('hidden');
        
        // Render the dashboard content after login
        renderMenuItems();
        renderSection(); // This triggers the component loading
    }
    
    // Logout logic
    function handleLogout(event) {
        event.preventDefault();
        dashboard.classList.add('hidden');
        loginPage.classList.remove('hidden');
    }

    // Class selection logic
    function handleClassSelect(classNumber) {
        selectedClass = classNumber;
        console.log(`Class selected: ${selectedClass}`);
        renderSection(); // Update content based on new class
    }

    // Attach event listeners
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    }
    if (desktopLogoutButton) {
        desktopLogoutButton.addEventListener('click', handleLogout);
    }
    
    // Listeners for class selector buttons in the dashboard (for courses and settings)
    document.querySelectorAll('#courses-content button, #settings-content button').forEach(button => {
        button.addEventListener('click', (e) => {
            const classNumber = parseInt(e.target.dataset.class);
            if (!isNaN(classNumber)) {
                handleClassSelect(classNumber);
            }
        });
    });

    // Initial check to render
    if (loginPage && dashboard) {
        // Assume logged out initially for this client-side demo
        loginPage.classList.remove('hidden');
        dashboard.classList.add('hidden');
    }

    // The dashboard is rendered inside handleLogin() now.
});