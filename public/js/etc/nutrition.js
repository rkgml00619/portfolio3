const body = document.querySelector("body");
const selBtn = document.querySelectorAll(".nutrition .cont2 .selectWrap .selectBtns .selectList .selBtn");
const selOption = document.querySelectorAll(".nutrition .cont2 .selectWrap .selectBtns .selectList .option");
const selOptionList = document.querySelectorAll(".nutrition .cont2 .selectWrap .selectBtns .selectList .option li");
const resultBox = document.querySelector(".nutrition .cont2 .bottom .resultWrap .resultBox");
const resultItemHtml = document.querySelector(".nutrition .cont2 .bottom .resultWrap .resultBox .resultItem")

let resultClose = resultBox.querySelectorAll(".closeIcon");

const totalKcal = document.querySelector("#container.nutrition .cont2 .center .bottom .resultWrap .resultValue h3 span")

// 기존의 선택값 요소 삭제
resultItemHtml.remove();

let nutrition = [
    {kind: "Base", defaultText: "베이스를 선택해주세요.", list: ["현미밥", "메밀면", "채소만", "비건(현미밥)", "비건(메밀면)", "비건(채소만)"], value: [499, 479, 320, 261, 299, 398, 229]},
    {kind: "Main Topping", defaultText: "메인토핑을 선택해주세요.", list: ["연어", "훈제오리", "육회", "참치", "불고기", "쭈꾸미", "닭가슴살", "새우", "오징어", "두부버섯", "숯불미트(비건)"], value: [74, 284, 149, 96, 193, 165, 96, 97, 106, 165]},
    {kind: "Souce", defaultText: "소스를 선택해주세요.", list: ["스리라차마요", "참깨간장", "고추냉이간장", "유자간장", "네오쌈장", "비건스리라차", "비건크리미어니언"], value: [168, 50, 42, 80, 112, 80, 35]},
    {kind: "Side", defaultText: "사이드를 선택해주세요.", list: ["쭈꾸미메밀면샐러드", "육회메밀면샐러드", "두부롤(랍스터)", "두부롤(불고기)", "두부롤(크랩미트)", "어니언크리미 치킨랩 샌드위치", "랍스터 크런치랩 샌드위치", "단호박 크림스프", "양송이 크림스프", "코울슬로"], value: [576, 658, 663, 176.16, 231, 191, 194, 307.13, 313.38, 210, 330, 69]},
    {kind: "Drink", defaultText: "음료를 선택해주세요.", list: ["아메리카노", "카페라떼", "바닐라라떼", "돌체라떼", "레몬에이드", "자몽에이드", "하와이안 모히또", "체리 히비스커스", "피치 패션후르츠티"], value: [10, 106, 231, 286, 150, 157, 213, 0, 0]},
];

// 셀렉트 태그 선택 시 옵션 제어
for(let i = 0; i < selBtn.length; i++){
    selBtn[i].onclick = function(e){
        e.preventDefault();

        selOption.forEach(function(selOption){
            selOption.classList.remove("on");
            selOption.style.height = "0px";
        })

        if(selOption[i].classList.contains("on")){
            selOption[i].classList.remove("on");
            selOption[i].style.height = "0px";
        }
        else {
            selOption[i].style.height = selOption[i].querySelectorAll("li").length * 50 + "px";
            selOption[i].classList.add("on");
        }
    }
}

// selBtn이 아닌 다른 곳을 클릭했을 경우 
body.onclick = function(e){
    
    if(!e.target.classList.contains("selBtn")){
        for(let i = 0; i < selOption.length; i++){
            selOption[i].classList.remove("on");
            selOption[i].style.height = "0px";
        }
    }
}

// 셀렉트 옵션 선택 시 결과 박스에 선택값 추가
for(let i = 0; i < selOptionList.length; i++){
    selOptionList[i].onclick = function(){
        let resultItemWrap = document.createElement("p");
        resultItemWrap.setAttribute("class", "resultItem")

        resultBox.append(resultItemWrap);

        resultItemWrap.innerHTML = resultItemHtml.innerHTML;

        resultItemWrap.querySelector(".text").innerText = selOptionList[i].innerText;

        resultBox.style.padding = "20px";

        for(let i = 0; i < nutrition.length; i++){

            if(nutrition[i].list.includes(selOptionList[i].innerText)){
                let fideIndex = nutrition[i].list.indexOf(selOptionList[i].innerText);

                let valueIndex = nutrition[i].value[fideIndex];

                console.log(valueIndex)
                totalKcal.innerText = valueIndex;
            }
        }

        // console.log(selIndex);
        // console.log(selOptionList[i].innerText);
        // totalKcal.innerText;
    }
}

console.log(nutrition[0].list.indexOf("비건(현미밥)"))


// 결과박스에 마우스 올렸을 때 요소 재선택 및 클로즈 버튼 클릭 시 요소 삭제
resultBox.onmouseenter = function(){
    resultClose = resultBox.querySelectorAll(".closeIcon");

    for(let i = 0; i < resultClose.length; i++){
        resultClose[i].onclick = function(){
            resultClose[i].parentElement.remove();
        }
    }
}