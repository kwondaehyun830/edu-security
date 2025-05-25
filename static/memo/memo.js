async function loadMemos() {
    const res = await fetch('/api/memo');
    if (!res.ok) {
        alert('메모 불러오기 실패');
        return;
    }
    const memos = await res.json();
    const memoList = document.getElementById('memo-list');
    memoList.innerHTML = '';
    memos.forEach(content => {
        const div = document.createElement('div');
        div.className = 'memo-item';
        div.innerText = content; // XSS 방어!
        memoList.appendChild(div);
    });
}

document.getElementById('add-btn').onclick = async () => {
    const input = document.getElementById('memo-input');
    const content = input.value;
    if (!content.trim()) return;
    const res = await fetch('/api/memo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ content })
    });
    if (!res.ok) {
        alert('메모 저장 실패');
        return;
    }
    input.value = '';
    await loadMemos();
};

document.getElementById('delete-btn').onclick = async () => {
    const res = await fetch('/api/memo/delete', { method: 'POST' });
    if (!res.ok) {
        alert('메모 삭제 실패');
        return;
    }
    await loadMemos();
};

window.onload = loadMemos;
