# 我的餐廳清單

一個由Node.js 及 express 打造而成的餐廳清單

## 預覽

### 首頁

![image](https://github.com/hijerry1007/restaurantList_v2/blob/master/photo/homepage.png)

### 新增頁面

![image](https://github.com/hijerry1007/restaurantList_v2/blob/master/photo/addpage.png)


## 安裝

1. 打開你的Termianl，複製此專案至本機電腦 https://github.com/hijerry1007/restaurantList_v3.git
2. 開啟終端機，進入存放此專案的資料夾restaurant
3. 安裝npm在Terminal輸入npm install指令
4. 安裝nodemon套件(express/express-handblebars/body-parser/mongoose/methodoverride/express-session/passport/connect-flash) 
5. 進入/restaurant/models/seeds，先輸入node userseeder，再輸入node restaurantseeder，建立種子檔案
6. Termianl輸入 npm run dev指令
7. 輸入本機地址localhost:3000 即可瀏覽此頁面

## 功能列表

新增/瀏覽/搜尋自己的喜好餐廳清單

新增: 可自行新增餐廳依喜好評價1-5顆星以及是否去吃過為清單下註解
瀏覽: 可依據字母A-Z、Z-A、評價高低及餐廳分類排序
搜尋: 可依據餐廳名稱及餐廳分類搜尋
