// signup2.js - 두 번째 페이지
document.getElementById('finalForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // 현재 페이지 데이터 가져오기
    const currentData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        postcode: document.getElementById('postcode').value,
        address: document.getElementById('address').value
    };
    
    // 유효성 검증
    if (!validateCurrentForm(currentData)) {
        return;
    }
    
    try {
        // 서버에 최종 데이터 전송
        const response = await fetch('/register/final', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(currentData)
        });
        
        if (response.ok) {
            const responseText = await response.text();
            alert(responseText);
            window.location.href = '/'; // 첫 페이지로 리다이렉트 (또는 로그인 페이지)
        } else {
            const errorText = await response.text();
            showError(errorText);
        }
    } catch (error) {
        console.error('Error:', error);
        showError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
});

function validateCurrentForm(data) {
    // 전화번호 검증
    const phoneRegex = /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/;
    if (!phoneRegex.test(data.phone.replace(/-/g, ''))) {
        showError('올바른 전화번호 형식을 입력하세요.');
        return false;
    }
    
    // 우편번호 검증
    const postcodeRegex = /^\d{5}$/;
    if (!postcodeRegex.test(data.postcode)) {
        showError('우편번호는 5자리 숫자여야 합니다.');
        return false;
    }
    
    // 이름 검증
    if (data.name.trim().length < 2) {
        showError('이름은 2자 이상이어야 합니다.');
        return false;
    }
    
    // 주소 검증
    if (data.address.trim().length < 5) {
        showError('상세주소를 정확히 입력하세요.');
        return false;
    }
    
    return true;
}

function showError(message) {
    document.getElementById('submitError').textContent = message;
    // 5초 후 에러 메시지 제거
    setTimeout(() => {
        document.getElementById('submitError').textContent = '';
    }, 5000);
}