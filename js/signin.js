// 오류 메시지 표시 함수
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// 오류 메시지 숨김 함수
function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

// 모든 오류 메시지 숨김 함수
function clearAllErrors() {
    hideError('idError');
    hideError('passwordError');
}

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
            clearAllErrors();
            window.location.href = 'main.html';
        } else {
            // 로그인 실패 - 메시지 내용에 따라 분기
            const message = result.message || '로그인에 실패했습니다.';
            
            if (message.includes('존재하지 않는 아이디') || message.includes('아이디')) {
                showError('idError', message);
            } else if (message.includes('비밀번호')) {
                showError('passwordError', message);
            } else {
                // 일반적인 로그인 실패
                showError('passwordError', message);
            }
        }
    } catch (error) {
        console.error('로그인 오류:', error);
        showError('passwordError', '로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
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
        
        // 기존 오류 메시지 초기화
        clearAllErrors();

        const userId = userIdInput.value.trim();
        const password = passwordInput.value.trim();

        // 입력값 검증
        let hasError = false;

        if (!userId) {
            showError('idError', '아이디를 입력해주세요.');
            userIdInput.focus();
            hasError = true;
        }

        if (!password) {
            showError('passwordError', '비밀번호를 입력해주세요.');
            if (!hasError) {
                passwordInput.focus();
            }
            hasError = true;
        }

        // 오류가 없으면 로그인 시도
        if (!hasError) {
            loginUser(userId, password);
        }
    });

    // 입력 필드에 포커스가 갈 때 해당 오류 메시지 숨김
    userIdInput.addEventListener('focus', function() {
        this.style.borderColor = '#36cd70';
        hideError('idError');
    });

    userIdInput.addEventListener('blur', function() {
        this.style.borderColor = '';
    });

    passwordInput.addEventListener('focus', function() {
        this.style.borderColor = '#36cd70';
        hideError('passwordError');
    });

    passwordInput.addEventListener('blur', function() {
        this.style.borderColor = '';
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

    // 입력할 때 실시간으로 오류 메시지 숨김
    userIdInput.addEventListener('input', function() {
        if (this.value.trim()) {
            hideError('idError');
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.value.trim()) {
            hideError('passwordError');
        }
    });
});