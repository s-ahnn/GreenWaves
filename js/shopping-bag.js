// 장바구니에 담긴 모든 상품의 총 가격을 업데이트하는 함수
function updateTotalPrice () {
    const totalItems = document.querySelectorAll('.totPrice');
    let total = 0;
    //상품들을 돌며 각각의 상품의 가격(가격 * 갯수)을 구해서 누적
    totalItems.forEach(input => {
        let p = parseInt(input.value.replace('₩', ''));
        total += p;
    });
    //누적된 값을 출력
    const totalItem = document.getElementById('totalItem');
    totalItem.value = total + '₩';
    //누적된 값 + 배송비 (5000) 해서 출력
    const totalFee = document.getElementById('totalFee');
    totalFee.value = total + 5000 + '₩';
}

// 로컬 저장소에 넣은 값을 가져옴
let selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
let selectedAmount = JSON.parse(localStorage.getItem('selectedAmount'));

let totalPrice = 0;

selectedItems.forEach(selected => {
    // 상품의 정보에 관한 변수 지정 (상품 이미지 링크, 상품명, 상품 설명, 상품 가격)
    let imgSrc, goodsName, goodsEx1, goodsEx2, goodsPrice;
    // 상품에 따라 변수 값 할당
    if (selected == 'shampooBar'){
        imgSrc = "https://onlyeco.co.kr/web/product/big/202504/2f3a8b6411e073b1e0001f8eea97dc58.jpg";
        goodsName = '오렌지 샴푸바';
        goodsEx1 = '오렌지 향이 나는 샴푸바';
        goodsEx2 = '플라스틱 샴푸통 사용을 줄여요!';
        goodsPrice = 8900;
    }
    else if (selected == 'susemi'){
        imgSrc = "https://onlyeco.co.kr/web/product/big/202505/3bdc6d3e198dd583bca108d49a5c7437.png";
        goodsName = '삼베 수세미';
        goodsEx1 = '친환경 삼베 수세미';
        goodsEx2 = '미세 플라스틱 사용을 줄여요!';
        goodsPrice = 4300;
    }
    else if (selected == 'magnet'){
        imgSrc = "https://onlyeco.co.kr/web/product/big/202502/0fa994e4f4e3ab183cb8885380615188.jpg";
        goodsName = '바다유리 마그넷'
        goodsEx1 = '바다에서 주운 유리로 만든 마그넷'
        goodsEx2 = '바다를 청소하고 우리 몸도 지켜요!'
        goodsPrice = 2000;
    }
    else if (selected == 'towel'){
        imgSrc = "https://onlyeco.co.kr/web/product/big/202502/dcacbb214b451b4737195495f820d90b.jpg";
        goodsName = '코튼 핸드타올 (2개 set)'
        goodsEx1 = '플라스틱을 재활용해 만든 핸드타올'
        goodsEx2 = '버려지는 플라스틱 양을 줄여요!'
        goodsPrice = 6000;
    }
    else if (selected == 'pad'){
        imgSrc = "https://onlyeco.co.kr/web/product/big/202502/033d9c972c366e2e122f3cc26d18cb54.jpg";
        goodsName = '면 생리대(3개 set)';
        goodsEx1 = '순면 100% 안전한 생리대';
        goodsEx2 = '쓰레기를 줄이고 내 몸도 지켜요!';
        goodsPrice = 20000;
    }
    else if (selected == 'pouch'){
        imgSrc = "https://onlyeco.co.kr/web/product/big/202502/033d9c972c366e2e122f3cc26d18cb54.jpg";
        goodsName = '면 생리대(3개 set)';
        goodsEx1 = '순면 100% 안전한 생리대';
        goodsEx2 = '쓰레기를 줄이고 내 몸도 지켜요!';
        goodsPrice = 20000;
    }
    else if (selected == 'toiletPaper'){
        imgSrc = "https://onlyeco.co.kr/web/product/big/202412/d50cf41d423bfeccaa85409fef9ff635.jpg";
        goodsName = '미니 파우치';
        goodsEx1 = '폐플라스틱으로 만든 미니 파우치';
        goodsEx2 = '폐플라스틱을 줄이고 손도 가벼워져요!';
        goodsPrice = 7000;
    }
    else if (selected == 'trashCan'){
        imgSrc = "https://onlyeco.co.kr/web/product/big/202412/2da3d08c89319ba1502c72ffde800bb7.jpg";
        goodsName = '대나무 화장지 30M (30롤)';
        goodsEx1 = '100% 대나무 펄프 화장지';
        goodsEx2 = '쓰레기를 줄이고 내 몸도 지켜요!';
        goodsPrice = 19000;
    }
    else if (selected == 'coffee'){
        imgSrc = "https://onlyeco.co.kr/web/product/big/202408/cb0c49f29ac9a213a71dc42910b62780.jpg";
        goodsName = '미니 휴지통';
        goodsEx1 = 'CXP 목재 휴지통';
        goodsEx2 = '플라스틱 사용을 줄여요!';
        goodsPrice = 8000;
    }
    else if (selected == 'dogPad'){
        imgSrc = "https://onlyeco.co.kr/web/product/big/202407/26ff76d66c83353bfe5724d80993c40b.jpg";
        goodsName = '옥수수콘 커피 필터 (50매)';
        goodsEx1 = '옥수수콘으로 만든 펄프 냄새 없는 커피 필터';
        goodsEx2 = '일회용 펄프 종이 사용을 줄여요!';
        goodsPrice = 6000;
    }
    else if (selected == 'godPad'){
        imgSrc = "https://onlyeco.co.kr/web/product/big/202407/01a304e2da50ee28a669976642b772f5.jpg";
        goodsName = '옥수수콘 배변 패드 (10매)';
        goodsEx1 = '옥수수콘으로 만든 배변 패드';
        goodsEx2 = '일회용 재료 사용을 줄여요!';
        goodsPrice = 12000;
    }
    else if (selected == 'apron'){
        imgSrc = "https://onlyeco.co.kr/web/product/big/202407/a516303e86cffd7e1c7789f58fef4f38.jpg";
        goodsName = '방수 앞치마';
        goodsEx1 = '12개의 페트병으로 만들어진 방수 앞치마';
        goodsEx2 = '플라스틱 쓰레기를 줄여요!';
        goodsPrice = 28000;
    }
    else if (selected == 'soup'){
        imgSrc = "https://onlyeco.co.kr/web/product/big/202503/ff7aac2e82b93b6d3058a4fb1bb5afd7.jpg";
        goodsName = '몽돌 비누';
        goodsEx1 = '비지, 커피박으로 만든 만든 몽돌 비누';
        goodsEx2 = '음식물과 일반 쓰레기를 줄여요!';
        goodsPrice = 12000;
    }
    // 구매 버튼이 눌린 상품을 나열하는 공간의 가져옴
    const itemsContainer = document.getElementById('itemsContainer');
    // 상품 내용을 담을 div 생성
    const group = document.createElement('div');
    group.classList.add('items')
    //상품 이미지 삽입
    const img = document.createElement('img');
    img.src = imgSrc;
    //상품명
    const itemName = document.createElement('h3');
    const name = document.createTextNode(goodsName);
    itemName.appendChild(name);
    //상품 설명
    const itemExplain = document.createElement('h4');
    const explain = document.createTextNode(goodsEx1);
        // 클래스 지정
    itemExplain.classList.add('explain1');
    itemExplain.appendChild(explain);
    const itemExplain2 = document.createElement('h4');
    const explain2 = document.createTextNode(goodsEx2);
    itemExplain2.classList.add('explain2');
    itemExplain2.appendChild(explain2);
    //상품 가격
    const itemPrice = document.createElement('h4');
    const price = document.createTextNode(goodsPrice+'₩');
        //클래스 지정
    itemPrice.classList.add('price');
    itemPrice.appendChild(price);
    //상품 갯수 문구와 입력창을 담을 div 생성
    const countDiv = document.createElement('div');
    countDiv.classList.add('countDiv');
    //상품 갯수 문구
    const itemCount = document.createElement('h4');
    const count = document.createTextNode('갯수 : ');
        //클래스 지정
    itemCount.classList.add('count');
    itemCount.appendChild(count);
    //갯수 입력창
    let countInput = document.createElement('input');
    countInput.type = 'number';
        //최솟값 지정
    countInput.min = 1;
        //기본값 지정
    countInput.value = selectedAmount[selected];
        //클래스 지정
    countInput.classList.add('cntInput');
    //div에 담기
    countDiv.appendChild(itemCount);
    countDiv.appendChild(countInput);
    //상품 갯수 바뀔 때마다 총 가격도 변화
    countInput.onchange = function(){
        total.value = goodsPrice * countInput.value + '₩';
        updateTotalPrice();
    }
    //버튼들 (구매, 삭제)
    const butts = document.createElement('div');
    butts.classList.add('butts');
    //삭제 버튼
    const del = document.createElement('button');
    const delText = document.createTextNode('삭제');
        //클래스 지정
    del.classList.add('delete');
    del.appendChild(delText);

    //삭제 버튼이 눌렸을 때 상품 삭제 : 이벤트 사용
    del.addEventListener('click', () => {
        // 화면에 출력된 상품 삭제
        group.remove();
        //삭제 버튼이 눌린 상품의 인덱스를 가져옴
        const index = selectedItems.indexOf(selected);
        //구매 버튼이 눌린 상품 목록에서 해당 인덱스에 있는 상품을 삭제
        selectedItems.splice(index, 1);
        // 해당 상품을 배열에서 삭제한 채로 로컬 저장소를 업데이트함
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        //삭제된 상품 값 빼고 출력
        updateTotalPrice();
    })

    //구매 버튼
    const pay = document.createElement('button');
    const payText = document.createTextNode('구매');
        // 클래스 지정
    pay.classList.add('pay')
    pay.appendChild(payText);
    //버튼들을 div에 삽입
    butts.appendChild(del);
    butts.appendChild(pay)
    //총 가격 출력
    let total = document.createElement('input');
    total.type = 'text';
    total.value = goodsPrice * countInput.value + '₩';
    total.disabled = true;
        //클래스 지정
    total.classList.add('totPrice');
    //div에 삽입
    group.appendChild(img);
    group.appendChild(itemName);
    group.appendChild(itemExplain);
    group.appendChild(itemExplain2);
    group.appendChild(itemPrice);
    group.appendChild(countDiv);
    group.appendChild(butts);
    group.appendChild(total);
    //화면에 출력
    itemsContainer.appendChild(group);
});
//계산이 끝난 후 한번에 출력
updateTotalPrice();