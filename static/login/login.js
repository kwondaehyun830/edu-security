document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('id').value;
    const pw = document.getElementById('pw').value;
    const hashedPw = (await sha256(pw)).toUpperCase();  // 대문자로 변환

    const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: hashedPw
        })
    });

    const result = await response.json();
    console.log('서버 응답:', result);  // 서버 응답 디버깅

    if (result.message === '로그인 성공') {  // message 기준으로
        alert('로그인 성공');
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
