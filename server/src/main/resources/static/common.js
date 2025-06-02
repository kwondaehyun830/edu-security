window.onload = async function() {
    const token = localStorage.getItem('jwt');
    if (!token) return;

    // /api/me로 id 요청
    const res = await fetch('/api/me', {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    if (!res.ok) return;

    const { id } = await res.json();
    const welcomeDiv = document.getElementById('welcome');
    if (welcomeDiv) {
        welcomeDiv.innerText = `${id}님 안녕하세요.`;
        welcomeDiv.style.position = 'fixed';
        welcomeDiv.style.top = '10px';
        welcomeDiv.style.right = '20px';
        welcomeDiv.style.zIndex = 1000;
    }
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.style.display = 'inline-block';
        logoutBtn.onclick = () => {
            localStorage.removeItem('jwt');
            location.reload();
        };
    }
};
