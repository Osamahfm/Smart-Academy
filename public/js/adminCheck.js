async function checkAdminStatus() {
    try {
        const response = await fetch('/api/auth/check-admin', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to check admin status');
        }
        
        const data = await response.json();
        
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(element => {
            element.style.display = data.isAdmin ? 'block' : 'none';
        });
        
        
        if (data.isAdmin) {
            const adminLink = document.createElement('a');
            adminLink.href = '/api/admin/dashboard';
            adminLink.className = 'nav-link';
            adminLink.textContent = 'Admin Dashboard';
            
            const navList = document.querySelector('.navbar-nav');
            if (navList) {
                navList.appendChild(adminLink);
            }
        }
    } catch (error) {
        console.error('Error checking admin status:', error);
    }
}

document.addEventListener('DOMContentLoaded', checkAdminStatus); 