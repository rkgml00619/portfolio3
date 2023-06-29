const body = document.querySelectorAll("body");
const mainDiv = document.querySelectorAll(".main > .cont");
const fixMenuList = document.querySelectorAll(".main .fixMenu > li");

let sectionPosition = [];

// 각 섹션별 top 값 배열에 삽입
mainDiv.forEach(function(div, idx){
    sectionPosition[idx] = div.offsetTop;
})

window.addEventListener("scroll", function(){
    let windowPosition = window.scrollY;

    // 픽스메뉴 제어
    for(let i = 0; i < sectionPosition.length; i++){
        if(windowPosition >= sectionPosition[i] - 100){
            fixMenuList.forEach(function(fixMenu){
                fixMenu.classList.remove("on");
            })
            fixMenuList[i].classList.add("on");
        }

        fixMenuList[i].onclick = function(e){
            e.preventDefault();

            window.scrollTo({
                top: sectionPosition[i],
                behavior: "smooth"
            })
        }
    }

    // 스크롤이 마지막에 도달했을 때 moveTop 컬러 변경
    if(detectBottom()){
        fixMenuList.forEach(function(fixMenu){
            fixMenu.style.opacity = "0";
        })
    }
    else {        
        fixMenuList.forEach(function(fixMenu){
            fixMenu.style.opacity = "1";
        })
    }
    
})


