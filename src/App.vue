<template>
<div id="app">
    <a href="javascript:;">点点点</a> -->
    <img src="./assets/imgs/icon.jpg">
    <baidu-map class="bm-view" ak="qhm0ZRSvsDXKHXulmHlltkHnc8IDkzIF" id="allmap" style="width:100%;height:800px;" @ready="handler" :scroll-wheel-zoom="true">
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <my-overlay :position="center" text="点击我" :active="active" @mouseover.native="active = true" @mouseleave.native="active = false">
        </my-overlay>
        <!-- <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" :locationIcon="{url: require('./assets/imgs/icon.jpg'), size: {width: 18, height: 18}}">
        </bm-geolocation> -->
    </baidu-map>

</div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
import MyOverlay from './components/MyOverlay.vue'
import {
    BmlMarkerClusterer
} from 'vue-baidu-map';
import {
    BmNavigation
} from 'vue-baidu-map';
import {
    BmGeolocation
} from 'vue-baidu-map';

export default {
    components: {
        BaiduMap,
        BmlMarkerClusterer,
        BmNavigation,
        BmGeolocation,
        MyOverlay
    },
    data() {
        return {
            center: {
                lng: 0,
                lat: 0
            },
            zoom: 3,
            active: false
        }
    },

    methods: {
        handler({
            BMap,
            map
        }) {
            let _this = this; // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (r) {
                console.log(r);
                _this.center = {
                    lng: r.longitude,
                    lat: r.latitude
                }; // 设置center属性值
                _this.autoLocationPoint = {
                    lng: r.longitude,
                    lat: r.latitude
                }; // 自定义覆盖物
                _this.initLocation = true;
                console.log('center:', _this.center) // 如果这里直接使用this是不行的
            }, {
                enableHighAccuracy: true
            })

        },
        draw({
            el,
            BMap,
            map
        }) {
            const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915))
            el.style.left = pixel.x - 60 + 'px'
            el.style.top = pixel.y - 20 + 'px'
        }

    }
}
</script>

<style lang="scss">
@import "./assets/css/common.scss";

.my-map {
    width: 400px;
    height: 200px;
}
</style>
