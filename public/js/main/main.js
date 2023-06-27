const mainDiv = document.querySelectorAll(".main > .cont");
const fixMenuList = document.querySelectorAll(".main .fixMenu > li");

let sectionPosition = [];

console.log(mainDiv[2].offsetTop)
console.log(mainDiv[2].offsetHeight)
console.log(mainDiv[2].offsetTop + mainDiv[2].offsetHeight)

mainDiv.forEach(function(div, idx){
    sectionPosition[idx] = div.offsetTop;
})

window.addEventListener("scroll", function(){
    let windowPosition = window.scrollY;
    console.log(windowPosition)

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

    if(windowPosition >= mainDiv[2].offsetTop + mainDiv[2].offsetHeight){
        moveTop.classList.add("colorChange");
    }
})