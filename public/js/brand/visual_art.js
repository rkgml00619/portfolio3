const tabBtns = document.querySelectorAll(".visual_art .cont2 .tabBtn");
const tabConts = document.querySelector(".visual_art .cont2 .tabconts");
const tabListWrap = document.querySelectorAll(".visual_art .cont2 .tabListWrap");
const goodsTitle = document.querySelectorAll(".visual_art .cont2 .tabListWrap .listText span");

let tabListHeight = [];

let goodsTitleName = ["텀블러", "양초", "유리컵", "머그컵", "클립펜", "타포린백", "비치타월 아이보리", "비치타월 블루", "비치타월 그린", "런치박스&에코백 세트"];

tabListWrap.forEach(function(tabList, idx){
    tabListHeight[idx] = tabList.offsetHeight;
})

// 초기 로드 시 부모 요소의 높이를 자식 요소의 높이로 조정
tabConts.style.height = tabListWrap[0].offsetHeight + 200 + 'px';

window.addEventListener("load", function(){
    tabConts.style.height = tabConts.querySelector(".tabListWrap.on").offsetHeight + "px";

    console.log(tabConts.querySelector(".tabListWrap.on").offsetHeight)
});

window.addEventListener("resize", function(){
    tabConts.style.height = tabConts.querySelector(".tabListWrap.on").offsetHeight + "px";

    console.log(tabConts.querySelector(".tabListWrap.on").offsetHeight)
});

goodsTitle.forEach(function(title, idx){
    title.innerText = goodsTitleName[idx];
})

for(let i = 0; i < tabBtns.length; i++){
    tabBtns[i].onclick = function(e){
        e.preventDefault();

        tabBtns.forEach(function(tabBtn, idx){
            tabBtn.classList.remove("on");
            tabListWrap[idx].classList.remove("on");
        })
        tabBtns[i].classList.add("on");
        tabListWrap[i].classList.add("on");

        tabConts.style.height = tabConts.querySelector(".tabListWrap.on").offsetHeight + "px";
    }
}

