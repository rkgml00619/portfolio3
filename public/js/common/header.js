const header = document.querySelector("#header");
const gnbMenu = document.querySelectorAll("#header .gnb > li");
const subMenu = document.querySelector("#header .gnb .subMenu");
const moveTop = document.querySelector("#moveTop");
const positionTop = document.querySelectorAll("#container > div");

let locationUrl = window.location.pathname;


for(let i = 0; i < gnbMenu.length; i++){
    gnbMenu[i].onmouseenter = function(){
        gnbMenu[i].querySelector(".subMenu").style.height = "150px";
        gnbMenu[i].querySelector(".subMenu").classList.add("on");
    }
    gnbMenu[i].onmouseleave = function(){
        gnbMenu[i].querySelector(".subMenu").style.height = "0";
        gnbMenu[i].querySelector(".subMenu").classList.remove("on");
    }
}

if(locationUrl === "/"){
    header.classList.add("main");
    header.classList.add("transparent");
}

window.addEventListener("scroll", function(){
    let windowPosition = window.scrollY;

    if(windowPosition > 0){
        header.classList.remove("transparent");
    }
    else if(windowPosition <= 0){
        header.classList.add("transparent");
    }

    if(windowPosition > positionTop[0].offsetTop){
        moveTop.classList.add("on");
    }
});


moveTop.onclick = function(e){
    e.preventDefault();
    
    window.scrollTo({
        top: positionTop[0].offsetTop,
        behavior: "smooth"
    })
}