document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('id').value;
    const pw = document.getElementById('pw').value;
    const hashedPw = (await sha256(pw)).toUpperCase();

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password: hashedPw })
    });

    const result = await response.json();
    if (result.message === '로그인 성공') {
        localStorage.setItem('jwt', result.token);
        alert('로그인 성공');
        location.href = '/index/index.html'; // 로그인 후 메인페이지로
    } else {
        alert('로그인 실패');
    }
});

async function sha256(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
