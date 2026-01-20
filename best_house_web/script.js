document.addEventListener('DOMContentLoaded', () => {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebarBtn = document.getElementById('closeSidebar');
    const body = document.body;
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    // Toggle Sidebar
    sidebarToggle.addEventListener('click', () => {
        if (window.innerWidth > 768) {
            // Desktop toggle
            body.classList.toggle('sidebar-closed');
        } else {
            // Mobile toggle
            sidebar.classList.add('open');
            body.classList.add('mobile-menu-open');
            // Create overlay if not exists
            createOverlay();
        }
    });

    // Close Sidebar (Mobile)
    closeSidebarBtn.addEventListener('click', () => {
        closeMobileMenu();
    });

    // Close on Link Click (Mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });

    // Helper: Close Mobile Menu
    function closeMobileMenu() {
        sidebar.classList.remove('open');
        body.classList.remove('mobile-menu-open');
        removeOverlay();
    }

    // Helper: Overlay
    function createOverlay() {
        if (!document.getElementById('mobile-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'mobile-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
            overlay.style.zIndex = '950'; // Below sidebar, above content
            overlay.addEventListener('click', closeMobileMenu);
            body.appendChild(overlay);
        }
    }

    function removeOverlay() {
        const overlay = document.getElementById('mobile-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    // Handle Resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // Reset mobile states if going to desktop
            sidebar.classList.remove('open');
            removeOverlay();
            body.classList.remove('mobile-menu-open');
        } else {
            // Reset desktop states if going to mobile
            body.classList.remove('sidebar-closed');
        }
    });
});
