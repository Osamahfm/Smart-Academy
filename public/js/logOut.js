document.getElementById('logoutBtn').addEventListener('click', async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('/logout', {
      method: 'POST',
      credentials: 'include'
    });
    if (res.ok) {
      localStorage.removeItem('token');
      window.location.href = '/home';
    } else {
      alert('Failed to logout');
    }
  } catch (err) {
    alert('Error logging out');
    console.error(err);
  }
});
