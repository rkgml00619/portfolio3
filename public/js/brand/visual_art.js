const tabBtns = document.querySelectorAll(".visual_art .cont2 .tabBtn");
const tabConts = document.querySelector(".visual_art .cont2 .tabconts");
const tabListWrap = document.querySelectorAll(".visual_art .cont2 .tabListWrap");
const tabListConts = document.querySelectorAll(".visual_art .cont2 .tabListWrap .tabList.poster");
const goodsTitle = document.querySelectorAll(".visual_art .cont2 .tabListWrap .listText span");

let tabListHeight = [];

let goodsTitleName = ["텀블러", "양초", "유리컵", "머그컵", "클립펜", "타포린백", "비치타월 아이보리", "비치타월 블루", "비치타월 그린", "런치박스&에코백 세트"];

tabListWrap.forEach(function(tabList, idx){
    tabListHeight[idx] = tabList.offsetHeight;
});

// 초기 로드 시 부모 요소의 높이를 자식 요소의 높이로 조정
tabConts.style.height = tabListWrap[0].offsetHeight + 'px';

window.addEventListener("load", function(){
    tabConts.style.height = tabConts.querySelector(".tabListWrap.on").offsetHeight + "px";

    tabListConts.forEach(function(tabListConts){
        tabListConts.style.height = tabListConts.querySelector("img").offsetHeight + "px";
    });
});

window.addEventListener("resize", function(){
    tabConts.style.height = tabConts.querySelector(".tabListWrap.on").offsetHeight + "px";

    tabListConts.forEach(function(tabListConts){
        tabListConts.style.height = tabListConts.querySelector("img").offsetHeight + "px";
    });
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

// 모달창
const posterModal = document.querySelector("#container.visual_art .posterModal");
const tabPoster = document.querySelectorAll("#container.visual_art .cont2 .center .tabWrap .tabconts .tabListWrap .tabList.poster");
const posterModalClose = document.querySelector("#container.visual_art .posterModal .center .closeBtn");
const posterModalDown = document.querySelector("#container.visual_art .posterModal .center .bigPoster .down");
const modalBigImg = document.querySelector("#container.visual_art .posterModal .center .bigPoster img");
const modalImgList = document.querySelectorAll("#container.visual_art .posterModal .center .posterListWrap .posterList");
const posterListWrap = document.querySelector("#container.visual_art .posterModal .center .posterListWrap");

tabPoster.forEach(function(tabPoster, idx){
    tabPoster.onclick = function(e){
        e.preventDefault();

        // 모달창 열렸을 때 뒷 컨텐츠 스크롤 금지
        document.querySelector("body").style.overflow = "hidden";

        // 모달창 열기
        posterModal.classList.add("on");
        setTimeout(function(){
            posterModal.style.opacity = 1;
        }, 10);

        modalBigImg.src = tabPoster.querySelector("img").src;

        modalImgList.forEach(function(modalImgList){
            modalImgList.classList.remove("on");
        })
        modalImgList[idx].classList.add("on");

        posterModalDown.setAttribute("href", tabPoster.querySelector("img").src);
    }
});

for(let i = 0; i < modalImgList.length; i++){
    modalImgList[i].onclick = function(e){
        e.preventDefault();
        
        modalImgList.forEach(function(modalImgList){
            modalImgList.classList.remove("on");
        })
        modalImgList[i].classList.add("on");
        modalBigImg.src = modalImgList[i].querySelector("img").src;

        posterModalDown.setAttribute("href", modalImgList[i].querySelector("img").src);
    }
}

posterModalClose.onclick = function(e){
    e.preventDefault();

    document.querySelector("body").style.overflow = "auto";

    // 모달창 닫기
    posterModal.style.opacity = 0;
    setTimeout(function(){
        posterModal.classList.remove("on");
    }, 400);
}

posterModal.onclick = function(e){
    if(e.target.classList.contains("posterModal")){

        document.querySelector("body").style.overflow = "auto";

        // 모달창 닫기
        posterModal.style.opacity = 0;
        setTimeout(function(){
            posterModal.classList.remove("on");
        }, 400);
    }
}

if(mobile.matches){
    posterModalDown.innerHTML = `<span class="material-symbols-outlined downIcon">download</span>`;
}