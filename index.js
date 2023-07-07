const express = require('express')
const app = express()
const port = 5000

const MongoClient = require('mongodb').MongoClient;


// 파일업로드 기능인 multer를 사용하기 위한 명령어들 불러들임
const multer  = require('multer')

app.set("view engine","ejs")
app.use(express.static('public'))

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

/* passport  passport-local  express-session 설치후 불러오기 > 로그인 검정 및 세션 생성에 필요한 기능 사용*/
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret :'secret', resave : false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session()); 


let db; //데이터베이스 연결을 위한 변수세팅(변수의 이름은 자유롭게 지어도 됨)

MongoClient.connect("mongodb+srv://rkgml00619:!!rkals1010@cluster0.dujoq6u.mongodb.net/?retryWrites=true&w=majority",function(err,result){
    //에러가 발생했을경우 메세지 출력(선택사항)
    if(err) { return console.log(err); }

    //위에서 만든 db변수에 최종연결 ()안에는 mongodb atlas 사이트에서 생성한 데이터베이스 이름
    db = result.db("portfolio3");

    //db연결이 제대로 됬다면 서버실행
    app.listen(port,function(){
        console.log("서버연결 성공");
    });

});

/* 로그인했을 때 검증하는 코드 */
passport.use(new LocalStrategy({
  usernameField:"memberId",
  passwordField:"memberPass",
  session:true,
  },      //해당 name값은 아래 매개변수에 저장
  function(memberId, memberPass, done) {
                  //회원정보 콜렉션에 저장된 아이디랑 입력한 아이디랑 같은지 체크                                 
    db.collection("members").findOne({ memberId:memberId }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      //비밀번호 체크 여기서 user는 db에 저장된 아이디의 비번값 (위의 function(err, "user")에서 받아온 값)
      if (memberPass == user.memberPass) {
          return done(null, user)
        } else {
          return done(null, false)
        }
    });
  }
));

//처음 로그인 했을 시 세션 생성 memberid는 데이터에 베이스에 로그인된 아이디
// 세션을 만들어주는 함수 : serializeUser
passport.serializeUser(function (user, done) {
  done(null, user.memberId)
});

//다른 페이지(서브페이지,게시판 페이지 등 로그인 상태를 계속 표기하기 위한 작업)
//로그인이 되어있는 상태인지 체크
// 세션의 user.memberid값을 가져오는 것
passport.deserializeUser(function (memberId, done) {
  //db의 값과 // 로그인했을 때 아이디 가 일치하면 로그인 유지
  db.collection('members').findOne({memberId:memberId }, function (err,result) {
      done(null, result);
  })
});

//파일 첨부 후 서버에 전달 할 때 multer library 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload') //업로드 폴더 지정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'))
    //영어가 아닌 다른 파일명 안깨지고 나오게 처리
  }
})

//upload는 위의 설정사항을 담은 변수(상수) 
const upload = multer({ storage: storage })



/*경로지정*********************************************************************/


// 메인 페이지
app.get('/', (req, res) => {
  res.render("index.ejs", {login: req.user})
})

// brand의 about us 페이지
app.get("/brand/about", (req, res)=>{   
  res.render("brand/about.ejs", {login: req.user})
})
// brand의 interior 페이지
app.get("/brand/interior", (req, res)=>{   
  res.render("brand/interior.ejs", {login: req.user})
})
// brand의 visual_art 페이지
app.get("/brand/visualart", (req, res)=>{   
  res.render("brand/visual_art.ejs", {login: req.user})
})

// menu의 signature 페이지
app.get("/menu/signature", (req, res)=>{   
  res.render("menu/signature.ejs", {login: req.user})
})
// menu의 poke 페이지
app.get("/menu/poke", (req, res)=>{   
  res.render("menu/poke.ejs", {login: req.user})
})
// menu의 drink 페이지
app.get("/menu/drink", (req, res)=>{   
  res.render("menu/drink.ejs", {login: req.user})
})
// menu의 side 페이지
app.get("/menu/side", (req, res)=>{   
  res.render("menu/side.ejs", {login: req.user})
})
// nutrition 페이지
app.get("/nutrition", (req, res)=>{
  let nutrition = [
    {kind: "Base", defaultText: "베이스를 선택해주세요.", list: ["현미밥", "메밀면", "채소만", "비건(현미밥)", "비건(메밀면)", "비건(채소만)"], value: [499, 479, 320, 261, 299, 398, 229]},
    {kind: "Main Topping", defaultText: "메인토핑을 선택해주세요.", list: ["연어", "훈제오리", "육회", "참치", "불고기", "쭈꾸미", "닭가슴살", "새우", "오징어", "두부버섯", "숯불미트(비건)"], value: [74, 284, 149, 96, 193, 165, 96, 97, 106, 165]},
    {kind: "Souce", defaultText: "소스를 선택해주세요.", list: ["스리라차마요", "참깨간장", "고추냉이간장", "유자간장", "네오쌈장", "비건스리라차", "비건크리미어니언"], value: [168, 50, 42, 80, 112, 80, 35]},
    {kind: "Side", defaultText: "사이드를 선택해주세요.", list: ["쭈꾸미메밀면샐러드", "육회메밀면샐러드", "두부롤(랍스터)", "두부롤(불고기)", "두부롤(크랩미트)", "어니언크리미 치킨랩 샌드위치", "랍스터 크런치랩 샌드위치", "단호박 크림스프", "양송이 크림스프", "코울슬로"], value: [576, 658, 663, 176.16, 231, 191, 194, 307.13, 313.38, 210, 330, 69]},
    {kind: "Drink", defaultText: "음료를 선택해주세요.", list: ["아메리카노", "카페라떼", "바닐라라떼", "돌체라떼", "레몬에이드", "자몽에이드", "하와이안 모히또", "체리 히비스커스", "피치 패션후르츠티"], value: [10, 106, 231, 286, 150, 157, 213, 0, 0]},
  ];
  
  res.render("etc/nutrition.ejs", {login: req.user, nutrition: nutrition})
})

// store List 페이지
app.get("/store", (req, res)=>{   
  db.collection("store").find().sort({storeCount: -1}).toArray((err, result)=>{
    res.render("etc/store.ejs", {data: result, searchText: ""})
  })
})
// store List 검색 경로
app.get("/storeSearch", (req, res)=>{   
  let check = [{
    $search:{
      index: "storeSearch",
      text: {
        query: req.query.search,
        // 사용자가 직접 선택할 수 없어도 어떤 분류로 검색할 것인지는 받아와야 함
        path: "storeName"
      }
    }
  },{
    $sort: {storeCount: -1}
  }];

  db.collection("store").aggregate(check).toArray((err, result)=>{
    res.render("etc/store.ejs",{data:result, searchText: req.query.search})
  })
})
// store register 페이지
app.get("/store/register", (req, res)=>{   
  res.render("etc/store_register.ejs")
})
// store register 데이터 등록 경로
app.get("/storeData", (req, res)=>{  
  db.collection("count").findOne({title: "스토어"}, (err, storeCount)=>{
    db.collection("store").insertOne({
      storeCount: storeCount.storeCount,
      storeName: req.query.storeName,
      storeTel: req.query.storeTel,
      storeAddress: req.query.storeAddress,
      storeMap: req.query.storeMap,
      storeLocation: req.query.storeLocation,
    }, (err, result)=> {
      db.collection("count").updateOne({title: "스토어"}, {$inc: {storeCount:1}}, (err, result)=> {
        res.redirect("/store/register");
      })
    })
  })
})

// event 페이지
app.get("/event", (req, res)=>{  
  db.collection("board").find().sort({eventCount: -1}).toArray((err, result)=>{
    res.render("etc/event.ejs", {data: result})
  })
})
// event 페이지
app.get("/event/register", (req, res)=>{   
  res.render("etc/event_register.ejs")
})
// event register 데이터 등록 경로
const eventImgUpload = upload.fields([{name: 'eventThumb'}, {name: 'eventDetailImg'}]);
app.post("/eventData", eventImgUpload, (req, res)=>{  
  let eventThumbImg = [];
  let detailImg = [];

  for(let i = 0; i < req.files["eventThumb"].length; i++){
    eventThumbImg[i] = req.files["eventThumb"][i].filename;
  }
  for(let i = 0; i < req.files["eventDetailImg"].length; i++){
    detailImg[i] = req.files["eventDetailImg"][i].filename;
  }

  db.collection("count").findOne({title: "이벤트"}, (err, eventResult)=>{
    db.collection("board").insertOne({
      eventCount: eventResult.eventCount,
      eventName: req.body.eventName,      
      eventThumb: eventThumbImg,      
      eventDetailImg: detailImg,      
    }, (err, result)=>{
      db.collection("count").updateOne({title: "이벤트"}, {$inc: {eventCount:1}}, (err, result)=>{
        res.redirect(`/event`);
      })
    })
  })
})

// 게시판 목록 검색 데이터 전달
app.get("/board/search", (req, res)=>{
  let currentUrlValue = req.query.currentUrl;
  console.log(currentUrlValue)
  let check = [];
  if(currentUrlValue === "board"){
    check = [
      {
        $search: {
          index: "mlb_board_search",
          text: {
            query: req.query.searchText,
            path: [req.query.searchOption]
          }
        }
      },
      {
        $sort: {boardCount: -1}
      }
    ]
  }
  else {
    check = [
      {
        $search: {
          index: "mlb_board_search",
          text: {
            query: req.query.searchText,
            path: [req.query.searchOption]
          }
        }
      },
      {
        $sort: {boardCount: -1}
      },
      {
        $match: { boardCategory: currentUrlValue }
      }
    ]
  }
  db.collection("board").aggregate(check).toArray((err, result)=>{
    res.render("board_list_category.ejs", {data: result, searchText:req.query.searchText, login: req.user, currentUrl:req.query.currentUrl})
  })
})
// 게시판 등록 데이터 전달
const brdImgUpload = upload.fields([{name: 'boardImg'},]);

app.post("/board/upload/data", brdImgUpload, (req, res)=>{   
  let brdImgs = [];

  if(req.files.length > 0){
    for(let i = 0; i < req.files.length; i++){
      brdImgs[i] = req.files[i].filename;
    }
  }
  db.collection("count").findOne({title: "게시판"}, (err, boardNum)=>{   
    // console.log(boardNum);
    db.collection("board").insertOne({      
      boardCount: boardNum.boardCount,
      boardCategory: req.body.boardCategory,
      memberId: req.body.memberId,
      boardDate: req.body.boardDate,
      boardTitle: req.body.boardTitle,
      boardImg: brdImgs,
      boardConts: req.body.boardConts,
    }, (err, result)=>{
      db.collection("count").updateOne({title: "게시판"}, {$inc: {boardCount: 1}}, (err, result)=>{
        res.redirect(`/board/detail/${boardNum.boardCount}`)
      })
    })
  })
})


// 제품 목록
app.get('/shop/:category', (req, res) => {
  db.collection("product").findOne({category: req.params.category}, (err, result)=>{
    db.collection("product").find().toArray((err, total)=>{
      let categoryClothes = [];
      let categoryAcc = [];
      let totalData;

      for(let i = 0; i < total.length; i++){
        if(total[i].category === "clothes"){
          categoryClothes[categoryClothes.length] = total[i]
        }
        else if(total[i].category === "acc"){
          categoryAcc[categoryAcc.length] = total[i]
        }
      }

      if(req.params.category === "clothes"){
        totalData = categoryClothes.length;
      }
      else if(req.params.category === "acc"){
        totalData = categoryAcc.length;
      }            
      let pageNumber = (req.query.page == null) ? 1 : Number(req.query.page);
      let perPage = 16; // 한페이지에서 보여질 상품갯수
      let blockCount = 5; // 한페이지에서 보여질 페이지 넘버 갯수
      let blockNum = Math.ceil(pageNumber / blockCount);
      let blockStart = ((blockNum - 1) * blockCount) + 1;
      let blockEnd = blockStart + blockCount - 1;
      let totalPaging = Math.ceil(totalData / perPage);

      if(blockEnd > totalPaging){
        blockEnd = totalPaging;
      }

      let totalBlock = Math.ceil(totalPaging / blockCount)
      let startFrom = (pageNumber - 1) * perPage;

      db.collection("product").find().sort({num: -1}).skip(startFrom).limit(perPage).toArray((err, result)=>{
        res.render("shop/shop_list.ejs", {
          data: result,
          totalPaging: totalPaging,
          blockStart : blockStart,
          blockEnd : blockEnd,
          blockNum : blockNum,
          totalBlock : totalBlock,
          pageNumber : pageNumber,
          login: req.user
        })
      })
    })
  })
})

// 제품 등록
app.get('/shop/edit/register', (req, res) => {
  res.render("shop/shop_register.ejs", {login: req.user})
})

// 제품 등록 데이터
const cpUpload = upload.fields([{ name: 'prdImg'}, {name: 'addPrdImg'} ,{ name: 'detailImg'}]);
app.post("/shop/edit/register/data",cpUpload,(req,res)=>{
  // console.log(req.files["addPrdImg"])

  let prdImgs = [];
  let addPrdImgs = [];
  let detailImgs = [];

  for(let i = 0; i < req.files["prdImg"].length; i++){
    prdImgs[i] = req.files["prdImg"][i].filename;
  }

  for(let i = 0; i < req.files["addPrdImg"].length; i++){
    addPrdImgs[i] = req.files["addPrdImg"][i].filename;
  }

  for(let i = 0; i < req.files["detailImg"].length; i++){
    detailImgs[i] =  req.files["detailImg"][i].filename;
  }

  db.collection("count").findOne({title: "상품갯수"}, (err, countResult)=>{
    db.collection("product").insertOne({
      num: countResult.num,
      category: req.body.category,
      prdName: req.body.prdName,
      prdImg : prdImgs,
      addPrdImg : addPrdImgs,
      detailImg: detailImgs,
      detailTxt: req.body.detailTxt,
      price: req.body.price,
      color: req.body.color,
      size: req.body.size,
      
    }, (err, result)=>{
      db.collection("count").updateOne({title: "상품갯수"}, {$inc: {num:1}}, (err, result)=>{
        res.redirect(`/shop/detail/${countResult.num}`);
      })
    })
  })
})

// 제품 상세
app.get('/shop/detail/:num', (req, res) => {  
  db.collection("product").findOne({num: Number(req.params.num)}, (err, result)=>{

    // color 값을 무조건 배열로 가져올 수 있도록
    if (result && typeof result.color === 'string') {
      result.color = [result.color]; 
    }
    // console.log(result.detailImg);
    res.render("shop/shop_detail.ejs", {data: result, login: req.user});
  })
})



// 회원가입 페이지
app.get("/members/join", (req, res) => {
  res.render("members/join.ejs", {login: req.user})
})

//아이디 중복체크 요청
app.post("/idcheck",(req,res)=>{
  db.collection("members").findOne({memberId: req.body.memberId}, (err, member)=>{
       res.send({member:member})
  })
})
//비밀번호 중복체크 요청
app.post("/passCheck",(req,res)=>{
  db.collection("members").findOne({memberPass: req.body.memberPass}, (err, member)=>{
       res.send({member:member})
  })
})

// 회원가입 데이터
app.post("/members/join/data", (req, res)=>{
  db.collection("members").findOne({memberId: req.body.memberId}, (err, member)=>{
    db.collection("count").findOne({title: "회원"}, (err, result)=>{
      db.collection("members").insertOne({
        memberNo: result.memberCount,
        memberName: req.body.memberName,
        memberTel_one: req.body.memberTel_one,
        memberTel: req.body.memberTel,
        memberTel_three: req.body.memberTel_three,
        memberEmail: req.body.memberEmail,
        emailTextSel: req.body.emailTextSel,
        memberId: req.body.memberId,
        memberPass: req.body.memberPass,
      }, (err, result)=>{
        db.collection("count").updateOne({title: "회원"}, {$inc: {memberCount: 1}}, (err)=>{
            res.send("<script> alert('회원가입 완료'); location.href ='/members/join' </script>")
        })
      })
    })
  })
});

// 로그인
app.get("/members/login", (req, res) => {  
  // 로그인 페이지(ejs)파일에서 input (type=hidden / name=referer)을 만들어서 이전 경로를 삽입하고
  res.render("members/login.ejs", {login: req.user, referer:req.headers.referer})
})
// 로그인 처리 요청 경로
app.post("/logincheck", passport.authenticate('local', {failureRedirect : '/members/login'}), (req, res)=>{
  // 로그인 처리 요청 경로에서 이전 경로에 대한
  if (req.body.referer && (req.body.referer !== undefined && req.body.referer.slice(-6) !== "/login")) {
    res.redirect(req.body.referer);
  } else {
    res.redirect("/");
  }
})
// 로그아웃 처리 요청 경로
app.get("/logout", (req, res)=>{
  req.logout(()=>{
    // 로그아웃 시 이전 경로로 돌아가기
    res.send(`<script>
      if(document.referrer.includes("mypage")){
        window.location = "/";
      }
      else {
        window.location = document.referrer;
      }
    </script>`);
  })
})

// 마이페이지
app.get("/members/mypage", (req, res) => {
  res.render("members/myPage.ejs", {login: req.user})
})
// 마이페이지 수정
app.get("/members/mypage/edit", (req, res) => {
  res.render("members/mypageEdit.ejs", {login: req.user})
})
// 마이페이지 수정된 데이터 업데이트
app.post("/members/mypage/editUpdate", (req, res) => {
  console.log(req.body.memberTel_one);
  db.collection("members").updateOne({memberId: req.user.memberId}, {$set: {
    memberName: req.body.memberName,
    memberPass: req.body.changePass,
    memberTel_one: req.body.memberTel_one,
    memberTel: req.body.memberTel,
    memberTel_three: req.body.memberTel_three,
    memberEmail: req.body.memberEmail,
    emailTextSel: req.body.emailTextSel,
  }}, (err, result)=>{
    res.redirect("/members/login");
  })
})
