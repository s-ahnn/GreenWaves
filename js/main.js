// 사이트 첫화면에 상품 나열 + 팝업 띄우기
function loads(page) {
    loadPage(page);
    openPopup();
}
// 메뉴 눌렀을 때 해당 페이지 로딩
function loadPage(page) {
    document.querySelector('#contentFrame').src = page;
}
// 팝업 띄우기
function openPopup() {
    // 탭 내 위치 조정
    const windowX = window.screenX;
    const windowY = window.screenY;
    //탭 와곽 기준 200픽셀 안에서 띄우기
    const popX = windowX + 200;
    const popY = windowY + 200;
    
    // 팝업이 차단되어 있을 때 안내 문구 출력
    isLoaded = window.open('sale.html','', `width=470, height=700, left=${popX}, top=${popY}`);
    if(isLoaded == null) {
        alert("팝업이 차단되어 있습니다.")
    }
}