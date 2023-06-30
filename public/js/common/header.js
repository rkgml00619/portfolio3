const header = document.querySelector("#header");
const gnbMenu = document.querySelectorAll("#header .gnb > li");
const subMenu = document.querySelector("#header .gnb > li .subMenu");
const moveTop = document.querySelector("#moveTop");
const positionTop = document.querySelectorAll("#container > div");

let locationUrl = window.location.pathname;

// 모바일 메뉴
const gnbBtn_m = document.querySelector("#header .gnbBtn_m");
const closeBtn = document.querySelector("#header .gnbWrap_m .closeBtn");
const gnbWrap_m = document.querySelector("#header .gnbWrap_m");
const gnbMenu_m = document.querySelectorAll("#header .gnbWrap_m .gnb_m > li");
const subMenu_m = document.querySelectorAll("#header .gnbWrap_m .subMenu");
const overlay_m = document.querySelector("#header .overlay_m");
const gnbMenuArrowIcon = document.querySelector("#header .gnb_m > li:first-child > a .arrowIcon");

// 반응형 화면 사이즈 확인
const pc = matchMedia("screen and (min-width: 1201px)");
const tablet = matchMedia("screen and (max-width: 1200px)");
const mobile = matchMedia("screen and (max-width: 768px)");


// PC 버전 메뉴 클릭 시 서브메뉴 제어
if(pc.matches){
    for(let i = 0; i < gnbMenu.length; i++){
        if(gnbMenu[i].querySelector(".subMenu")){
            gnbMenu[i].onmouseenter = function(){
                gnbMenu[i].querySelector(".subMenu").style.height = gnbMenu[i].querySelectorAll(".subMenu > li").length * 50 + "px";
                gnbMenu[i].querySelector(".subMenu").classList.add("on");
            }
            gnbMenu[i].onmouseleave = function(){
                gnbMenu[i].querySelector(".subMenu").style.height = "0";
                gnbMenu[i].querySelector(".subMenu").classList.remove("on");
            }
        }
    }
}
else {// 태블릿 및 모바일 버전 메뉴 버튼 및 클로즈 버튼 클릭 시 서브메뉴 등장 제어
    gnbBtn_m.onclick = function(e){
        e.preventDefault();
        
        gnbWrap_m.classList.add("on");
        overlay_m.classList.add("on");
        setTimeout(function(){
            overlay_m.style.opacity = "1";
        }, 100)
    }
    closeBtn.onclick = function(e){
        e.preventDefault();
        
        gnbWrap_m.classList.remove("on");
        overlay_m.classList.remove("on");
        setTimeout(function(){
            overlay_m.style.opacity = "0";
        }, 100)
    }
    // 태블릿 및 모바일 버전 메뉴 클릭 시 서브메뉴 제어
    for(let i = 0; i < gnbMenu_m.length; i++){
        gnbMenu_m[i].onclick = function(){ 
    
            if(gnbMenu_m[i].classList.contains("on")){
                gnbMenu_m[i].classList.remove("on");
                subMenu_m[i].style.height = "0px";
                gnbMenu_m[i].querySelector(".arrowIcon").innerText = "expand_more";
            }
            else {
                gnbMenu_m.forEach(function(mobileMenu){
                    mobileMenu.classList.remove("on");
                })
                subMenu_m.forEach(function(mobileSubMenu){
                    mobileSubMenu.style.height = "0px";
                })
                gnbMenu_m[i].classList.add("on");
                gnbMenu_m[i].querySelector(".arrowIcon").innerText = "expand_less";
                subMenu_m[i].style.height = subMenu_m[i].querySelectorAll("li").length * 60 + "px";
            }
        }
    }
}


// 메인 페이지인 경우 header 디자인 변경
if(locationUrl === "/" || locationUrl === "/about"){
    header.classList.add("main");
    header.classList.add("transparent");

    window.addEventListener("scroll", function(){
        let windowPosition = window.scrollY;
        
        // 메인페이지인 경우 윈도우 스크롤에 따라 header 디자인 변경
        if(windowPosition > 0){
            header.classList.remove("transparent");
        }
        else if(windowPosition <= 0){
            header.classList.add("transparent");
        }
    
        
    });
}

// 첫번째 섹션을 벗어날 경우 moveTop 버튼 노출
window.addEventListener("scroll", function(){
    let windowPosition = window.scrollY;

    if(windowPosition > positionTop[0].offsetTop){
        moveTop.classList.add("on");
    }
    else {
        moveTop.classList.remove("on");
    }

    // 스크롤이 마지막에 도달했을 때 moveTop 컬러 변경
    if(detectBottom()){
        moveTop.classList.add("colorChange");
    }
    else {        
        moveTop.classList.remove("colorChange");
    }
})


// moveTop 버큰 클릭 시 스크롤 위로 움직임
moveTop.onclick = function(e){
    e.preventDefault();
    
    window.scrollTo({
        top: positionTop[0].offsetTop,
        behavior: "smooth"
    })
}

// 스크롤이 마지막에 도달했는지 여부 확인
function detectBottom() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let innerHeight = window.innerHeight;
    let scrollHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
  
    if (scrollTop + innerHeight >= scrollHeight) {
        return true;
    } else {
        return false;
    }
}


// 메뉴 서브페이지들 제어
const menuLocation = document.querySelectorAll("#container > div .menuLocation > li");
const menuPage = ["signature", "poke", "drink", "side"];

for(i = 0; i < menuPage.length; i++){
    if(locationUrl.includes(menuPage[i])){
        menuLocation.forEach(function(menuPage){
            menuPage.classList.remove("on");
        });
        menuLocation[i].classList.add("on");
    }
}


