// imort App from "./App.vue";

// const imgurl =  require('./assets/imgs/icon.jpg');
import imgurl from './assets/imgs/icon.jpg'

console.log(imgurl);
let img = new Image();
img.src = imgurl;
let app = document.getElementById("app");
app.appendChild(img);

