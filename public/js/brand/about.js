const section = document.querySelectorAll(".about > .cont");
const designText = document.querySelector(".about .cont2 .designText");
const aboutTabMenu = document.querySelectorAll(".about .cont2 .storyMenu > li");
const aboutTabContsWrap = document.querySelector(".about .cont2 .storyContWrap");
const aboutTabConts = document.querySelectorAll(".about .cont2 .storyContWrap .storyConts");
const cont3 = document.querySelectorAll(".about .cont3");

let sectionTop = [];
let cont3Top = [];

let tabContsHeight = [];

window.addEventListener("load", function(){
    // cont들의 offsetTop값 배열에 담음
    section.forEach(function(section, idx){
        sectionTop[idx] = section.offsetTop;
    });
    // cont3의 offsetTop값 배열에 담음
    cont3.forEach(function(cont3, idx){
        cont3Top[idx] = cont3.offsetTop;
        cont3.style.opacity = "0";
    });
    // 탭 콘텐츠의 높이값 배열에 담음
    aboutTabConts.forEach(function(tabConts, idx){
        tabContsHeight[idx] = tabConts.offsetHeight;
    });
    // 탭 콘텐츠의 기본 높이 지정
    aboutTabContsWrap.style.height = tabContsHeight[0] + "px";
});
window.addEventListener("resize", function(){
    // cont들의 offsetTop값 배열에 담음
    section.forEach(function(section, idx){
        sectionTop[idx] = section.offsetTop;
    });
    // cont3의 offsetTop값 배열에 담음
    cont3.forEach(function(cont3, idx){
        cont3Top[idx] = cont3.offsetTop;
        cont3.style.opacity = "0";
    });
    // 탭 콘텐츠의 높이값 배열에 담음
    aboutTabConts.forEach(function(tabConts, idx){
        tabContsHeight[idx] = tabConts.offsetHeight;
    });
    // 탭 콘텐츠의 기본 높이 지정
    aboutTabContsWrap.style.height = tabContsHeight[0] + "px";
});

window.addEventListener("scroll", function(){
    let windowPosition = window.scrollY;

    // designText들 스크롤에 따라 등장
    if(windowPosition >= section[1].offsetTop - 400){
        designText.classList.add("on");
    }
    else {
        designText.classList.remove("on");
    }
    
    // cont3 섹션들 스크롤에 따라 등장
    for(let i = 0; i < cont3Top.length; i++){
        if(windowPosition >= cont3Top[i] - 200){
            cont3[i].style.opacity = "1";
        }
        else {
            cont3[i].style.opacity = "0";
        }
    }
});

for(let i = 0; i < aboutTabMenu.length; i++){
    aboutTabMenu[i].onclick = function(){
        aboutTabMenu.forEach(function(tabmenu, idx){
            tabmenu.classList.remove("on");
            aboutTabConts[idx].classList.remove("on");
        })
        aboutTabMenu[i].classList.add("on");
        aboutTabConts[i].classList.add("on");
        aboutTabContsWrap.style.height = tabContsHeight[i] + "px";
    }
}