document.getElementById('signForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('userID').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm').value.trim();
    const email = document.getElementById('email').value.trim();

    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    if (password != confirmPassword) {
        document.getElementById('confirmError').textContent = '비밀번호가 일치하지 않습니다.';
        return;
    }

    const res = await fetch('/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({username, password, 'confirm': confirmPassword, email })
    });

    const result = await res.json();

    if (result.success) {
        window.location.href = '../html/signup2.html';
    } else {
        const field = result.field;
        const message = result.message;
        document.getElementById(`${field}Error`).textContent = message;
    }
});