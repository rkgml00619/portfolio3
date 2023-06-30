// 메인토핑 입력
const step2Imgs = document.querySelectorAll(".cont3 .menuList .imgWrap img");
const step2Title = document.querySelectorAll(".cont3 .menuList .textWrap h3");
const step2Text = document.querySelectorAll(".cont3 .menuList .textWrap p");

let mainTopping = [
  {img: "/img/menu/poke/mainTopping/veganMeet.png", title: "비건숯불직화미트", text: "Vegan Charcoal Meet"},
  {img: "/img/menu/poke/mainTopping/salmon.png", title: "연어", text: "Salmon"},
  {img: "/img/menu/poke/mainTopping/rowBeef.png", title: "육회", text: "Beef Tartare"},
  {img: "/img/menu/poke/mainTopping/octopus.png", title: "쭈꾸미", text: "Webfoot Octopus"},
  {img: "/img/menu/poke/mainTopping/tuna.png", title: "참치", text: "Tuna"},
  {img: "/img/menu/poke/mainTopping/shrimp.png", title: "새우", text: "Shirimp"},
  {img: "/img/menu/poke/mainTopping/squid.png", title: "오징어", text: "Squid"},
  {img: "/img/menu/poke/mainTopping/duck.png", title: "오리고기", text: "Duck Meet"},
  {img: "/img/menu/poke/mainTopping/bulgogi.png", title: "불고기", text: "Bulgogi"},
  {img: "/img/menu/poke/mainTopping/tofu.png", title: "두부버섯", text: "Tofu Mushroom"},
  {img: "/img/menu/poke/mainTopping/chicken.png", title: "닭가슴살", text: "Chicken Breast"},
];

for(let i = 0; i < mainTopping.length; i++){
    step2Imgs[i].src = mainTopping[i].img;
    step2Title[i].innerText = mainTopping[i].title;
    step2Text[i].innerText = mainTopping[i].text;
}

// 소스 입력
const step3Imgs = document.querySelectorAll(".cont4 .menuList .imgWrap img");
const step3Title = document.querySelectorAll(".cont4 .menuList .textWrap h3");
const step3Text = document.querySelectorAll(".cont4 .menuList .textWrap p");

let souce = [
  {img: "/img/menu/poke/souce/creamyOnion.png", title: "비건크리미어니언", text: "Vegan Creamy Onion"},
  {img: "/img/menu/poke/souce/veganSriracha.png", title: "비건스리라차", text: "Vegan Sriracha"},
  {img: "/img/menu/poke/souce/srirachaMayo.png", title: "스리라차마요", text: "Sriracha"},
  {img: "/img/menu/poke/souce/sesameSoy.png", title: "참깨간장", text: "Sesame Soy"},
  {img: "/img/menu/poke/souce/citronSoy.png", title: "유자간장", text: "Citron Soy"},
  {img: "/img/menu/poke/souce/wasabiSoy.png", title: "고추냉이 간장", text: "Wasabi Soy"},
  {img: "/img/menu/poke/souce/ssamjang.png", title: "네오쌈장", text: "Ssamjang"},
];

for(let i = 0; i < souce.length; i++){
    step3Imgs[i].src = souce[i].img;
    step3Title[i].innerText = souce[i].title;
    step3Text[i].innerText = souce[i].text;
}

// 추가토핑 입력
const step4Imgs = document.querySelectorAll(".cont5 .menuList .imgWrap img");
const step4Title = document.querySelectorAll(".cont5 .menuList .textWrap h3");
const step4Text = document.querySelectorAll(".cont5 .menuList .textWrap p");

let addTopping = [
  {img: "/img/menu/poke/addTopping/addSalmon.png", title: "메인토핑 추가", text: "Add Main Topping"},
  {img: "/img/menu/poke/addTopping/addAbocado.png", title: "아보카도", text: "Add Abocado"},
  {img: "/img/menu/poke/addTopping/addSmallEgg.png", title: "메추리알", text: "Add Quail Egg"},
  {img: "/img/menu/poke/addTopping/addAsparagus.png", title: "아스파라거스", text: "Add Asparagus"},
  {img: "/img/menu/poke/addTopping/addWrapBread.png", title: "또띠아 빵", text: "Add Wrap Bread"},
  {img: "/img/menu/poke/addTopping/addEggRoll.png", title: "초계란말이", text: "Add Egg Rolled"},
  {img: "/img/menu/poke/addTopping/addRice.png", title: "현미밥", text: "Add Brown Rice"},
  {img: "/img/menu/poke/addTopping/addNoodle.png", title: "메밀면", text: "Add Soba Noodle"},
  {img: "/img/menu/poke/addTopping/addVege.png", title: "야채", text: "Add Vegetables"},
  {img: "/img/menu/poke/addTopping/addSeaweed.png", title: "해초샐러드", text: "Add Seaweed Salad"},
];

for(let i = 0; i < addTopping.length; i++){
    step4Imgs[i].src = addTopping[i].img;
    step4Title[i].innerText = addTopping[i].title;
    step4Text[i].innerText = addTopping[i].text;
}