function enrollUser() {
    // Check if user is signed in
    const isSignedIn = localStorage.getItem('isSignedIn');

    if (isSignedIn === 'true') {
        alert('You have been enrolled!');
    } else {
        // Redirect to login page
        window.location.href = 'SignLog.html';
    }
}