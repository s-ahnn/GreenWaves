
// signin.js

// 로그인 함수
async function loginUser(userId, password) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                password: password
            })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // 로그인 성공
            alert(`환영합니다. ${userId}님!`);
            // main.html로 리다이렉트
            window.location.href = 'main.html';
        } else {
            // 로그인 실패
            alert(result.message || '아이디 또는 비밀번호가 잘못되었습니다.');
        }
    } catch (error) {
        console.error('로그인 오류:', error);
        alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
}

// 페이지 로드 후 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const userIdInput = document.getElementById('userId');
    const passwordInput = document.getElementById('password');

    // 폼 제출 이벤트 처리
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // 기본 폼 제출 동작 방지

        const userId = userIdInput.value.trim();
        const password = passwordInput.value.trim();

        // 입력값 검증
        if (!userId) {
            alert('아이디를 입력해주세요.');
            userIdInput.focus();
            return;
        }

        if (!password) {
            alert('비밀번호를 입력해주세요.');
            passwordInput.focus();
            return;
        }

        // 로그인 함수 호출
        loginUser(userId, password);
    });

    // Enter 키 이벤트 처리
    userIdInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            passwordInput.focus();
        }
    });

    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            loginForm.dispatchEvent(new Event('submit'));
        }
    });

    // 입력 필드 포커스 효과 (선택사항)
    userIdInput.addEventListener('focus', function() {
        this.style.borderColor = '#36cd70';
    });

    userIdInput.addEventListener('blur', function() {
        this.style.borderColor = '';
    });

    passwordInput.addEventListener('focus', function() {
        this.style.borderColor = '#36cd70';
    });

    passwordInput.addEventListener('blur', function() {
        this.style.borderColor = '';
    });
});