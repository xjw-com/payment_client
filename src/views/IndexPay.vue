<template>
  <div class="payment_navigation">
    <div class="payment_header">
      导航栏
    </div>
    <div class="payment_carousel">
      <a-carousel :dot-position="dotPosition">
          <el-image
              v-for="img in imgList.url"
              :key="img"
              class="payment_carousel_img"
              :src="`http://10.9.1.6/${img}`"
              :fit="imgList.fit"></el-image>
      </a-carousel>
    </div>
  </div>
  <div class="payment_column">
    <div class="payment_column_button">
      政治建设
    </div>
    <div class="payment_column_button">
      经济建设
    </div>
    <div class="payment_column_button">
      文化建设
    </div>
  </div>
  <div class="payment_content">
    <div class="payment_content_rank">
      这里是排行
    </div>
    <div class="payment_content_title">
      政治建设
    </div>
    <div class="payment_content_play">
      <el-image
          v-for="img in imgList.url2"
          :key="img"
          class="payment_content_img"
          :src="`http://10.9.1.6/${img}`"
          :fit="imgList.fit"></el-image>

    </div>
  </div>
  <div class="payment_content">
    <div class="payment_content_rank">
      这里是排行
    </div>
    <div class="payment_content_title">
      经济建设
    </div>
    <div class="payment_content_play">
      <el-image
          v-for="img in imgList.url3"
          :key="img"
          class="payment_content_img"
          :src="`http://10.9.1.6/${img}`"
          :fit="imgList.fit"></el-image>

    </div>
  </div>
  <div class="payment_content">
    <div class="payment_content_rank">
      这里是排行
    </div>
    <div class="payment_content_title">
      文化建设
    </div>
    <div class="payment_content_play">
      <el-image
          v-for="img in imgList.url4"
          :key="img"
          class="payment_content_img"
          :src="`http://10.9.1.6/${img}`"
          :fit="imgList.fit"></el-image>

    </div>
  </div>
</template>

<script>

import { reactive,ref} from 'vue';
import aliPayApi from "@/api/aliPayApi";
// import QrcodeVue from 'qrcode.vue'
export default {
  name: "IndexPay",
  // components: {
  //   QrcodeVue
  // },
  setup(){

    const imgList = reactive({
      fit:'fill ',
      url: [
        "fileUP_zp/payment/beauty1.jpg",
        "fileUP_zp/payment/beauty2.jpg",
        "fileUP_zp/payment/beauty3.jpg",
        "fileUP_zp/payment/beauty4.jpg",
      ],
      url2: [
        "fileUP_zp/payment/img1.jpg",
        "fileUP_zp/payment/img2.jpg",
        "fileUP_zp/payment/img3.jpg",
        "fileUP_zp/payment/img4.jpg",
        "fileUP_zp/payment/img5.jpg",
        "fileUP_zp/payment/img6.jpg",
        "fileUP_zp/payment/img7.jpg",
        "fileUP_zp/payment/img8.jpg",
        "fileUP_zp/payment/img9.jpg",
        "fileUP_zp/payment/img10.jpg",
        "fileUP_zp/payment/img11.jpg",
        "fileUP_zp/payment/img12.jpg",
      ],
      url3: [
        "fileUP_zp/payment/img13.jpg",
        "fileUP_zp/payment/img14.jpg",
        "fileUP_zp/payment/img15.jpg",
        "fileUP_zp/payment/img16.jpg",
        "fileUP_zp/payment/img17.jpg",
        "fileUP_zp/payment/img18.jpg",
        "fileUP_zp/payment/img19.jpg",
        "fileUP_zp/payment/img20.jpg",
        "fileUP_zp/payment/img21.jpg",
        "fileUP_zp/payment/img22.jpg",
        "fileUP_zp/payment/img23.jpg",
        "fileUP_zp/payment/img24.jpg",
      ],
      url4: [
        "fileUP_zp/payment/img25.jpg",
        "fileUP_zp/payment/img26.jpg",
        "fileUP_zp/payment/img27.jpg",
        "fileUP_zp/payment/img28.jpg",
        "fileUP_zp/payment/img29.jpg",
        "fileUP_zp/payment/img30.jpg",
        "fileUP_zp/payment/img31.jpg",
        "fileUP_zp/payment/img32.jpg",
        "fileUP_zp/payment/img33.jpg",
        "fileUP_zp/payment/img34.jpg",
        "fileUP_zp/payment/img35.jpg",
        "fileUP_zp/payment/img36.jpg",
      ],
    })

    const product=reactive({
      selectList:"",
    })

    const toPay = async () => {
        //调用支付宝统一收单下单并支付页面接口
        aliPayApi.tradePagePay(product.selectList).then((response) => {
          //将支付宝返回的表单字符串写在浏览器中，表单会自动触发submit提交
          document.write(response.data.formStr)
        })
    }

    return{
      product,
      imgList,
      toPay,
      dotPosition: ref('right'),
    }
  }
}
</script>

<style lang="scss" scoped>
.payment_navigation {
  @include diy_size(100%,500px);
  position: relative;
  .payment_header{
    @include diy_size(100vw,70px);
    position: absolute;
    top: 0;
    z-index: 9;
    background: #ffffff24;
  }
  .payment_carousel{
    position: absolute;
    top:0;
    z-index: 8;
    @include diy_size(100%,500px);
    .payment_carousel_img{
      @include diy_size(100%,500px);
    }
  }
}
.payment_column{
  @include diy_size(100vw,65px);
  padding: {
    top: 10px;
    left: 50px;
  };
  .payment_column_button{
    float: left;
    margin: {
      left: 20px;
    };
    @include diy_size(120px,45px);
    color: #111111;
    background: #F8F8F8;
    font: {
      size: 15px;
      family: "PingFang SC";
    };
    border:{
      radius: 20px;
    };
  }
}
.payment_content{
  margin-left: 8vw;
  .payment_content_title{
    @include diy_size(76vw,50px);
    font: {
      size: 36px;
      weight: 700;
      family: "PingFang SC";
    };
    text-align: left;
  }
  .payment_content_play{
    @include diy_size_except(64vw,600px);
    text-align: left;
    .payment_content_img{
      @include diy_size_except(180px,250px);
      margin: 10px 10px 10px 10px;
    }
  }
  .payment_content_rank{
    @include diy_size_except(20vw,650px);
    float: right;

  }
}

</style>
