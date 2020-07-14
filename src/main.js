import Vue from 'vue';
import App from "./App.vue";

require("@babel/polyfill"); //用来将es6转es5,

// const imgurl =  require('./assets/imgs/icon.jpg');
// import imgurl from './assets/imgs/icon.jpg'

// console.log(imgurl);
// let img = new Image();
// img.src = imgurl;
// let app = document.getElementById("app");
// app.appendChild(img);
function getComponent(){
  return import(/*webpackChunkName: 'lodash'*/ './lodash').then(({default: _})=>{
      var el = document.createElement('div');
      el.innerHTML = _.join(['a','b'],'******');
      return el;
  })
}

getComponent().then(el=>{
  document.body.appendChild(el);
})



new Vue({
    render: h => h(App)
  }).$mount("#app");
  

