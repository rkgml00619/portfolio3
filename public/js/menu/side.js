// 음료 입력
const sideImgs = document.querySelectorAll(".cont2 .menuList .imgWrap img");
const sideTitle = document.querySelectorAll(".cont2 .menuList .textWrap h3");
const sideText = document.querySelectorAll(".cont2 .menuList .textWrap p");

let sideMenu = [
  {img: "pumpkin.png", title: "단호박 스프", text: "Sweet Pumpkin Soup"},
  {img: "mushroom.png", title: "양송이 스프", text: "Mushroom Soup"},
  {img: "Kohlslow.png", title: "코울슬로", text: "Kohlslow"},
  {img: "seaWrap.png", title: "씨랩", text: "Sea Wrap"},
  {img: "meetWrap.png", title: "미트랩", text: "Meet Wrap"},
  {img: "noodleSalad.png", title: "들기름 메밀면 샐러드", text: "Perilla Oil Soba Noodles Salad"},
  {img: "tofuRoll.png", title: "두부롤", text: "Tofu Rolled"},
];

for(let i = 0; i < sideMenu.length; i++){
    sideImgs[i].src = "/img/menu/side/" + sideMenu[i].img;
    sideTitle[i].innerText = sideMenu[i].title;
    sideText[i].innerText = sideMenu[i].text;
}