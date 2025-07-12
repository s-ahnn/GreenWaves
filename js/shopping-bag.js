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
    else if (selected == 'sambeTowel') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202505/951e8f0bb2cf8d15d3227377475b4c6d.jpg";
        goodsName = '친환경 삼베 샤워타올';
        goodsEx1 = '생분해성 삼베 샤워타올';
        goodsEx2 = '플라스틱 섬유 사용을 줄여요!';
        goodsPrice = 11900;
    } else if (selected == 'bodywashbar') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202309/2b2c7e2235cfb68f71f9b03988281a8a.jpg";
        goodsName = '약산성 바디워시바';
        goodsEx1 = '약산성 바디워시바';
        goodsEx2 = '우리 몸도 지키고 플라스틱 통 사용도 줄여요!';
        goodsPrice = 4300;
    } else if (selected == 'toothbrush') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202505/6aa87139f46cc71f57ec2e131bfebf98.png";
        goodsName = '목재 칫솔';
        goodsEx1 = '버려지는 나무로 만든 CXP 목재 칫솔';
        goodsEx2 = '베어지지 않은 나무들을 지켜요!';
        goodsPrice = 2000;
    } else if (selected == 'soupShelf') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202408/c138e25e1258be5bf4228ced172d5710.jpg";
        goodsName = '심플 사각 비누받침';
        goodsEx1 = '친환경 CXP 목재 비누받침';
        goodsEx2 = '버려지는 플라스틱 양을 줄여요!';
        goodsPrice = 4000;
    } else if (selected == 'toothbrushCap') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202306/9071a03ef16c2b85c2f7fd82259b2a00.jpg";
        goodsName = '실리톤 칫솔캡';
        goodsEx1 = '오래 사용 가능한 실리콘 칫솔캡';
        goodsEx2 = '플라스틱 사용을 줄여요!';
        goodsPrice = 20000;
    } else if (selected == 'makeup') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202307/dac47cc81b779d6009cf31784b791453.jpg";
        goodsName = '순면 화장솜';
        goodsEx1 = '유기농 순면 화장솜';
        goodsEx2 = '플라스틱 섬유 사용을 줄여요!';
        goodsPrice = 3000;
    } else if (selected == 'tougue') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202402/ba2e6193b228ee1a35e63a234d67df39.jpg";
        goodsName = '목재 혀클리너';
        goodsEx1 = 'CXP 목재 혀클리너';
        goodsEx2 = '플라스틱 사용을 줄여요!';
        goodsPrice = 2000;
    } else if (selected == 'squeeze') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202203/9ae9eb45b4675c9b21cf6f3bdd80f371.jpg";
        goodsName = '스테인리스 치약 짜개';
        goodsEx1 = '스테인리스로 오래 사용 가능한 치약 짜개';
        goodsEx2 = '플라스틱 사용을 줄여요!';
        goodsPrice = 2000;
    } else if (selected == 'sugarCane') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202011/5024dcdeb85c03cfa7467e0897d9781d.jpg";
        goodsName = '사탕수수 칫솔';
        goodsEx1 = '사탕수수로 만든 친환경 칫솔';
        goodsEx2 = '플라스틱 사용을 줄여요!';
        goodsPrice = 12000;
    } else if (selected == 'slipper') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202411/5e32f4830348501bf91b7b16d0212346.jpg";
        goodsName = '재생펠트 슬리퍼';
        goodsEx1 = '버려지는 호텔 침구 업사이클링 슬리퍼';
        goodsEx2 = '재활용에 동참해요!';
        goodsPrice = 16000;
    } else if (selected == 'soup') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202503/ff7aac2e82b93b6d3058a4fb1bb5afd7.jpg";
        goodsName = '몽돌 비누';
        goodsEx1 = '비지, 커피박으로 만든 만든 몽돌 비누';
        goodsEx2 = '음식물과 일반 쓰레기를 줄여요!';
        goodsPrice = 12000;
    }else if (selected == 'glassCup') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202505/079bd5243981c67a88e16a200f690da8.jpg";
        goodsName = '천연 글라스컵';
        goodsEx1 = '천연 유리 특유의 질감이 매력인 글라스컵';
        goodsEx2 = '플라스틱 사용을 줄여요!';
        goodsPrice = 12900;
    } else if (selected == 'kitchenTowel') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202409/00e1cdb19cb5ed49212a9697ee9b1b5e.jpg";
        goodsName = '대나무 키친타올';
        goodsEx1 = '무표백 대나무 펄프로 만든 키친타올';
        goodsEx2 = '베어지지 않은 나무를 지켜요!';
        goodsPrice = 20000;
    } else if (selected == 'tumblerBag') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202407/2b1239dce2937f49ad6f4bb49dbcbe10.jpg";
        goodsName = '텀블러 보온보냉백';
        goodsEx1 = '폐플라스틱을 재활용해 만든 텀블러 가방';
        goodsEx2 = '버려지는 플라스틱 양을 줄여요!';
        goodsPrice = 26000;
    } else if (selected == 'tumbler') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202310/ca22fca894b2267f1abe28d412cf9e2d.jpg";
        goodsName = '사탕수수 텀블러';
        goodsEx1 = '사탕수수로 만든 친환경 텀블러';
        goodsEx2 = '버려져도 금방 썩어 지구를 지켜요!';
        goodsPrice = 25000;
    } else if (selected == 'zipperBag') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202411/7a2e9a4d16c8b86d5fb05f8d2a2e7dad.jpg";
        goodsName = '실리콘 지퍼백';
        goodsEx1 = '실리콘으로 만든 다회용 지퍼백';
        goodsEx2 = '일회용품 사용을 줄여요!';
        goodsPrice = 1000;
    } else if (selected == 'cuttingBoard') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202309/60b1b79d2e5febb90cc47bfaeb0b1a6e.png";
        goodsName = '목재 도마';
        goodsEx1 = '친환경 CXP 목재로 만든 도마';
        goodsEx2 = '베어지지 않은 나무를 지켜요!';
        goodsPrice = 20000;
    } else if (selected == 'spoonSet') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202209/d763ec57a54ba2c9f60501676cdcd5d3.jpg";
        goodsName = '다회용 스푼, 포크 세트';
        goodsEx1 = 'CXP 목재로 만든 다회용 스푼,포크 세트';
        goodsEx2 = '베어지지 않은 나무를 지켜요!';
        goodsPrice = 5000;
    } else if (selected == 'bottleBrush') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202209/62eeb0f91f901a905dfacd87e4c2b0ad.jpg";
        goodsName = '코코넛 야자 병 세척솔';
        goodsEx1 = '코코넛 껍질과 느티나무로 만든 친환경 병 세척솔';
        goodsEx2 = '플라스틱 사용을 줄여요!';
        goodsPrice = 12000;
    } else if (selected == 'soup') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202309/510b681e75a05347fdfad5c0339363c9.png";
        goodsName = '스탠드 주걱';
        goodsEx1 = 'CXP 목재로 만든 친환경 주걱';
        goodsEx2 = '편리한데 나무를 지켜요!';
        goodsPrice = 5500;
    }else if (selected == 'backpack') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202407/6ba28fa31d9fdfa3ac016b5d362b7be0.jpg";
        goodsName = '키즈 백팩';
        goodsEx1 = '폐플라스틱 업사이클링 키즈 백팩';
        goodsEx2 = '버려지는 플라스틱을 줄여요!';
        goodsPrice = 59000;
    } else if (selected == 'cap') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202203/c5c12f9c21493f132a632392a3815a60.jpg";
        goodsName = '캡모자';
        goodsEx1 = '폐플라스틱 업사이클링 캡모자';
        goodsEx2 = '버려지는 플라스틱을 줄여요!';
        goodsPrice = 43000;
    } else if (selected == 'hoodie') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202412/00ac0ccde36bc355e0bd29a4c6f96960.jpg";
        goodsName = '후드티';
        goodsEx1 = '폐플라스틱 업사이클링 후드티';
        goodsEx2 = '버려지는 플라스틱을 줄여요!';
        goodsPrice = 59000;
    } else if (selected == 'veganCard') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202304/4c6159d45dcb1e256141c8e83650c5df.jpg";
        goodsName = '비건 카드 지갑';
        goodsEx1 = '옥수수가죽 카드 지갑';
        goodsEx2 = '버려져도 금방 썩어요!';
        goodsPrice = 66000;
    } else if (selected == 'passport') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202503/4b2bbb19000943e65c5eca9c699b5bbc.jpg";
        goodsName = '가죽 여권 케이스';
        goodsEx1 = '가죽 스트랩을 모아 만든 여권 케이스';
        goodsEx2 = '버려지는 가죽을 줄여요!';
        goodsPrice = 15000;
    } else if (selected == 'walkingBag') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202407/210fc9a4e277bf9adbae3da7b317249a.jpg";
        goodsName = '워킹백';
        goodsEx1 = '폐플라스틱 업사이크링 워킹백';
        goodsEx2 = '버려지는 플라스틱을 줄여요!';
        goodsPrice = 50000;
    } else if (selected == 'cushion') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202412/da93694f9de654f67165b40227d95965.jpg";
        goodsName = '쿠션';
        goodsEx1 = '폐플라스틱 업사이클링 쿠션';
        goodsEx2 = '버려지는 플라스틱을 줄여요!';
        goodsPrice = 8000;
    } else if (selected == 'hairBand') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202501/05a773ec0934146dd43d322cf9fd4cfb.png";
        goodsName = '헤어밴드';
        goodsEx1 = '폐플라스틱 업사이클링 헤어밴드';
        goodsEx2 = '버려지는 플라스틱을 줄여요!';
        goodsPrice = 12000;
    } else if (selected == 'homeWear') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202412/25398d9c6fd903f53d429f60a94f800f.jpg";
        goodsName = '잠옷 세트';
        goodsEx1 = '폐플라스틱 업사이클링 잠옷 세트';
        goodsEx2 = '버려지는 플라스틱을 줄여요!';
        goodsPrice = 52000;
    } else if (selected == 'tablet') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202412/8ac6a6c2cc603f1ede45bfffd6dfd3ff.jpg";
        goodsName = '태블릿 파우치';
        goodsEx1 = '폐플라스틱 업사이클링 태블릿 파우치';
        goodsEx2 = '버려지는 플라스틱을 줄여요!';
        goodsPrice = 38000;
    } else if (selected == 'umbrella') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202309/495c57244175415a595ec6e403ae4759.jpg";
        goodsName = '장우산';
        goodsEx1 = '폐플라스틱 업사이클링 장우산';
        goodsEx2 = '버려지는 플라스틱을 줄여요!';
        goodsPrice = 22000;
    }
    else if (selected == 'note') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202310/b8f3de03a2c7790db0cb566ab72bb2b0.jpg";
        goodsName = '코끼리똥 노트';
        goodsEx1 = '코끼리똥으로 만든 종이를 모은 노트';
        goodsEx2 = '나무를 지켜요!';
        goodsPrice = 4500;
    } else if (selected == 'pencilCut') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202309/0f2b49bbee75e89c60ac39514a028175.jpg";
        goodsName = '폐나무 연필깎이';
        goodsEx1 = '버려지는 대나무로 만든 연필깎이';
        goodsEx2 = '나무를 지켜요!';
        goodsPrice = 3300;
    } else if (selected == 'pencil') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202403/2c99731eca5a6384f09a85e3d7250837.jpg";
        goodsName = '신문지 연필 세트';
        goodsEx1 = '버려진 신문지로 만든 연필';
        goodsEx2 = '나무를 지켜요!';
        goodsPrice = 3000;
    } else if (selected == 'pencilCap') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202406/ff6d9972d0acb55636dbca9382ba1e59.jpg";
        goodsName = '재생 가죽 연필캡';
        goodsEx1 = '버려지는 가죽으로 만든 연필캡';
        goodsEx2 = '버려지는 가죽 양을 줄여요!';
        goodsPrice = 3000;
    } else if (selected == 'pencilCase') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202409/a2d01df4a83139aaeb2e116e4e280333.jpg";
        goodsName = '재생 가죽 필통';
        goodsEx1 = '가죽 조각을 모아 만든 필통';
        goodsEx2 = '버려지는 가죽 양을 줄여요!';
        goodsPrice = 7000;
    } else if (selected == 'eraser') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202306/3448222ffff4df94c25a440d21783d31.jpg";
        goodsName = '고무 지우개';
        goodsEx1 = '천연 고무 지우개';
        goodsEx2 = '플라스틱 사용을 줄여요!';
        goodsPrice = 3000;
    } else if (selected == 'coffeePencil') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202402/cfd25d1c9259692829c68a402c19bf29.jpg";
        goodsName = '커피 연필';
        goodsEx1 = '커피박으로 만든 연필';
        goodsEx2 = '일반 쓰레기를 줄여요!';
        goodsPrice = 3000;
    } else if (selected == 'ballPen') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202505/84a2d64356d568a6e53e4e568d44c65c.jpg";
        goodsName = '목재 볼펜';
        goodsEx1 = 'CXP 목재 볼펜';
        goodsEx2 = '플라스틱 사용을 줄이고 나무를 지켜요!';
        goodsPrice = 1500;
    } else if (selected == 'memo') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202011/58cb90c00b4cd0b33fcab4f4d8bbfb38.jpg";
        goodsName = '재생 메모지 (100매)';
        goodsEx1 = '재생펄프로 만든 친환경 포스트잇';
        goodsEx2 = '나무를 지켜요!';
        goodsPrice = 2000;
    } else if (selected == 'set') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202408/5b3042a808bb54ad534a586aac7e1ca4.jpg";
        goodsName = '친환경 문구 세트';
        goodsEx1 = '친환경 문구 세트를 선물해요!';
        goodsEx2 = '지구도 지키고 친구도 기쁘게!';
        goodsPrice = 10000;
    } else if (selected == 'book') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202406/66ec823dfc73b4d8dfac628ded4644a4.jpg";
        goodsName = '가죽 코너 북 커버';
        goodsEx1 = '버려진 가죽으로 만든 코너 북 커버';
        goodsEx2 = '버려지는 가죽 양을 줄여요!';
        goodsPrice = 3000;
    } else if (selected == 'clip') {
        imgSrc = "https://onlyeco.co.kr/web/product/big/202112/e857f17271c5b41d1fbbd794048e6158.jpg";
        goodsName = '클립';
        goodsEx1 = '폐플라스틱 업사이클링 클립';
        goodsEx2 = '버려지는 플라스틱을 줄여요!';
        goodsPrice = 8000;
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