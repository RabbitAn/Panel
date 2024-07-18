<template>
  <div class="container">

    <div class="header">
      <p style="font-family: AlimamaDaoLiTi; font-size: 34px; font-weight: bold; color: #fff; position: absolute; top: 10%; left: 0%; right: 0%; bottom: 0%; margin: auto; 
        text-align: center; z-index: 1000;">
        凌骁新能源科技AI智能工厂企业大脑</p>
      <dv-decoration5 :dur="5" :color="['#48b59d', '#48b59d', '#0e2c5a', '#0e2c5a']" style="width:65%;height:100%; position: absolute;
        top: 0%; left: 0%; right: 0%; bottom: 0%; margin: auto; z-index: 1000;" />
      <dv-decoration8 :color="['#48b59d', '#48b59d']"
        style="width:300px; height: 50px;     position: absolute; top: 0%; left: 0%;" />
      <dv-decoration8 :color="['#48b59d', '#48b59d']" :reverse="true"
        style="width:300px;height:50px;  position: absolute; top: 0%; right: 0%;" />
      <div style="font-family: electronicFont; font-size: 18px;  color: #fff; position: absolute; top: 35%; left: 17%; right: 0%; bottom: 0%; margin: auto; font-weight: bold;
       ">{{ time }}</div>
      <iframe style="font-size: 18px;  color: #fff; position: absolute; top: 25%; right: 17%; bottom: 0%; margin: auto; 
       " allowtransparency="true" frameborder="0" width="180" height="36" scrolling="no"
        src="//tianqi.2345.com/plugin/widget/index.htm?s=3&z=2&t=0&v=0&d=3&bd=0&k=&f=ffffff&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=60183&w=180&h=36&align=center"></iframe>
    </div>

    <div class="content">

      <div class="left">
        <div class="left-top">
          <right-mid1 style="width: 100%;height: 100%;" />
        </div>
        <div class="left-bottom">
          <left-bottom style="width: 100%;height: 98%;" />
        </div>
      </div>
      <div class="mid">
        <dv-decoration2 :reverse="true" :color="['#48b59d']" :dur="5"
          style="width:5px;height:100%; position: absolute;top:1;left: 0;" />
        <div class="mid-top">
          <china style="width: 100%;height: 100%;" />
        </div>
        <div class="mid-bottom">
          <mid-bottom style="width: 100%;height: 98%; padding: 5px;" />
        </div>
      </div>
      <div class="right">
        <dv-decoration2 :reverse="true" :color="['#48b59d']" :dur="5"
          style="width:5px;height:100%; position: absolute;top:1;left: 0;" />
        <div class="right-top">
          <right-top style="width: 100%;height: 100%;" />
        </div>
        <div class="right-mid1">

          <left-top style="width: 100%;height: 100%;" />
        </div>
        <div class="right-mid2">
          <pictorialBar style="width: 100%;height: 100%;" />
        </div>
        <div class="right-bottom">
          <radius style="width: 98%;height: 98%;" />
        </div>
      </div>
    </div>

  </div>


</template>

<script setup lang="ts">
import china from '@/components/map/China.vue'
import leftTop from '@/components/left-top/index.vue'
import leftBottom from '@/components/left-bottom/index.vue'
import midBottom from '@/components/mid-bottom/index.vue'
import rightTop from '@/components/right-top/index.vue'
import rightMid1 from '@/components/right-mid1/index.vue'
import pictorialBar from '@/components/pictorialBar/index.vue'
import radius from '@/components/radius/index.vue'
import { ref, onMounted } from 'vue'




const time = ref('2022-01-01 00:00:00')
onMounted(() => {

})
//实时刷新时间

setInterval(function () {
  time.value = new Date().toLocaleString()
}, 1000);


</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  position: relative;
  // background: url('/public/bg.png') no-repeat;
  background-color: #04132a;
  background-size: cover;
  display: flex;
  flex-direction: column;

  .header {
    flex: 1;
    background-color: transparent;
    position: relative;

  }

  .content {

    display: flex;
    flex: 8;
    background-color: transparent;
    flex-direction: row;

    .left {
      flex: 2;

      display: flex;
      flex-direction: column;

      .left-top {
        flex: 1;

      }

      .left-bottom {
        flex: 1;
      }
    }

    .mid {
      position: relative;
      flex: 5;
      display: flex;
      flex-direction: column;

      .mid-top {
        flex: 3;

        display: flex;
        justify-content: center;
        align-items: center;
      }

      .mid-bottom {
        flex: 1.5;
        background-color: transparent;
      }
    }

    .right {
      position: relative;
      flex: 4;
      background-color: transparent;
      display: flex;
      flex-direction: column;


      .right-top {
        flex: 1;
      }

      .right-mid1 {
        flex: 1;
        background-color: transparent;
      }

      .right-mid2 {
        flex: 1;
        background-color: transparent;
      }

      .right-bottom {
        flex: 1;
        background-color: transparent;
      }
    }
  }
}
</style>
