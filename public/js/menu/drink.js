// 음료 입력
const drinkImgs = document.querySelectorAll(".cont2 .menuList .imgWrap img");
const drinkTitle = document.querySelectorAll(".cont2 .menuList .textWrap h3");
const drinkText = document.querySelectorAll(".cont2 .menuList .textWrap p");

let drinks = [
  {img: "americano_ice.png", title: "아메리카노(ICE)", text: "Iced Americano"},
  {img: "americano_hot.png", title: "아메리카노(HOT)", text: "Hot Americano"},
  {img: "vanilla_ice.png", title: "바닐라라떼(ICE)", text: "Iced Vanilla Latte"},
  {img: "vanilla_hot.png", title: "바닐라라떼(HOT)", text: "Hot Vanilla Latte"},
  {img: "dolce_ice.png", title: "돌체라떼(ICE)", text: "Iced Dolce Latte"},
  {img: "dolce_hot.png", title: "돌체라떼(HOT)", text: "Hot Dolce Latte"},
  {img: "cafeLatte_ice.png", title: "카페라떼(ICE)", text: "Iced Cafe Latte"},
  {img: "cafeLatte_hot.png", title: "카페라떼(HOT)", text: "Hot Cafe Latte"},
  {img: "peach.png", title: "피치&패션후르츠티", text: "Peach&Fashion Fruits Tea"},
  {img: "cherry.png", title: "체리&히비스커스티", text: "Cherry&Hibiscus Tea"},
  {img: "grapeFruit.png", title: "자몽에이드", text: "Grapefruit Ade"},
  {img: "lemon.png", title: "레몬에이드", text: "Lemon Ade"},
  {img: "mojito.png", title: "하와이안 모히또", text: "Hawaiian Mojito"},
  {img: "abc.png", title: "ABC 주소", text: "ABC Juice"},
  {img: "citronBanana.png", title: "유자&바나나 주스", text: "Citron&Banana Juice"},
  {img: "wheatgrassApple.png", title: "밀싹&애플 주스", text: "Wheatgrass&Apple Juice"},
];

for(let i = 0; i < drinks.length; i++){
    drinkImgs[i].src = "/img/menu/drink/" + drinks[i].img;
    drinkTitle[i].innerText = drinks[i].title;
    drinkText[i].innerText = drinks[i].text;
}