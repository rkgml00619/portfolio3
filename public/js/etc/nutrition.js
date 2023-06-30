const body = document.querySelector("body");
const selBtn = document.querySelectorAll(".nutrition .cont2 .selectWrap .selectBtns .selectList .selBtn");
const selOption = document.querySelectorAll(".nutrition .cont2 .selectWrap .selectBtns .selectList .option");


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