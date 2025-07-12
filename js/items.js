// 찜 버튼 가져오기
jjim = document.querySelectorAll('.like');
// 찜 버튼을 돌며 눌린 버튼 찾기
jjim.forEach(item => {
    // 버튼이 눌리면
    item.addEventListener('click', () => {
        // 만약 찜을 눌렀다면 붉은 하트로 변화
        if (item.textContent == '🩶') {
            item.textContent = '❤️';
        }
        // 이미 찜이 된 상태에서 눌렀다면 회색 하트로 변화
        else{
            item.textContent = '🩶';
        }
    })
});

// 구매 버튼과 갯수 지정한 걸 가져옴
let buying = document.querySelectorAll('.buy');
let counting = document.querySelectorAll('.amount');

// 구매 버튼을 돌며 눌린 구매 버튼을 찾기
buying.forEach((button, index) => {
    button.addEventListener('click', () => {
        // 값 가져오기
        const productValue = button.value;
        const productAmount = counting[index].value;

        // 상품 목록 저장
        //로컬 저장소에 있는 값을 불러와서 (문자열 상태) 객체로 변환 (리스트)
        let selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
        // 새로 받아온 값을 리스트에 추가
        selectedItems.push(productValue);
        // 리스트를 문자열로 변환해서 로컬저장소에 삽입
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

        // 수량 저장 (객체로)
        let selectedAmount = JSON.parse(localStorage.getItem('selectedAmount'));
        selectedAmount[productValue] = parseInt(productAmount);
        localStorage.setItem('selectedAmount', JSON.stringify(selectedAmount));
    });
});