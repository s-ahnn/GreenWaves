// signup.js - 첫 번째 페이지
document.getElementById('signForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    console.log('폼 전송 시작'); // 디버깅용
    
    // 폼 데이터 가져오기
    const formData = {
        username: document.getElementById('userID').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirm').value,
        email: document.getElementById('email').value
    };
    
    console.log('폼 데이터:', formData); // 디버깅용
    
    // 유효성 검증
    if (!validateForm(formData)) {
        return;
    }
    
    try {
        // 서버에 1단계 데이터 전송
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: formData.username,
                password: formData.password,
                confirm: formData.confirmPassword, // 여기 이름 통일
                email: formData.email
            })
        });
        
        console.log('응답 상태:', response.status); // 디버깅용
        
        const result = await response.json();
        console.log('서버 응답:', result); // 디버깅용
        
        if (result.success) {
            // 성공시 다음 페이지로 이동
            window.location.href = '/signup2';
        } else {
            // 에러 표시
            const errorField = result.field === 'confirm-password' ? 'confirm' : result.field;
            showError(errorField + 'Error', result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        showError('usernameError', '네트워크 오류가 발생했습니다.');
    }
});

function validateForm(data) {
    let isValid = true;
    
    // 에러 메시지 초기화
    clearErrors();
    
    // 아이디 검증
    if (data.username.length < 4) {
        showError('usernameError', '아이디는 4자 이상이어야 합니다.');
        isValid = false;
    }
    
    // 비밀번호 검증
    if (data.password.length < 6) {
        showError('passwordError', '비밀번호는 6자 이상이어야 합니다.');
        isValid = false;
    }
    
    // 비밀번호 확인 검증
    if (data.password !== data.confirmPassword) {
        showError('confirmError', '비밀번호가 일치하지 않습니다.');
        isValid = false;
    }
    
    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showError('emailError', '올바른 이메일 형식을 입력하세요.');
        isValid = false;
    }
    
    return isValid;
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
    }
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.textContent = '');
}