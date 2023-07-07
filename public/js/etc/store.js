const mapFrame = document.querySelector("#container.store .cont2 .center > .left .mapList iframe");
const storeList = document.querySelectorAll("#container.store .cont2 .center > .right .rightBottom .storeList .left");
const searchText = document.querySelector("#container.store .cont2 .center > .right #storeSearch .rightTop #search");


storeList.forEach((items,index)=>{
    items.addEventListener("click",()=>{
        mapLoc = items.getAttribute("data-location");
        mapFrame.setAttribute("src",mapLoc);
    })

})

// ajax 비동기 통신 
// fetch  -  jquery ajax

//메서드 체이닝 method chaning
// axios.get('/storeSearch', {
//     // 작명    // 페이지의 input 값
//     storeName: searchText.value
// })
// .then(function (response) {
//     // 성공 핸들링
//     console.log(response);
// })
// .catch(function (error) {
//     // 에러 핸들링
//     console.log(error);
// })

