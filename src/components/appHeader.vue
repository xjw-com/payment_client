<template>
  <header id="header" class="header">
    <div class="header_content">
      <insert-row-above-outlined />
      <router-link to="/">
        商品主页
      </router-link>
    </div>
    <div class="header_content">
      <shopping-outlined />
      <router-link to="/indexOrder">
        我的订单
      </router-link>
    </div>
    <div class="header_content">
      <shopping-cart-outlined />
      <router-link to="/indexOrder">
        我的购物车
      </router-link>
    </div>
    <div class="header_content">
      <download-outlined />
      <router-link to="/indexDownLoad">
        下载账单
      </router-link>
    </div>
  </header>
</template>

<script>
import {ShoppingCartOutlined,DownloadOutlined,ShoppingOutlined,InsertRowAboveOutlined } from '@ant-design/icons-vue';
export default {
  name: "appHeader",
  components:{
    ShoppingCartOutlined,
    DownloadOutlined,
    ShoppingOutlined,
    InsertRowAboveOutlined
  },
  setup(){

  }
}
</script>

<style lang="scss" scoped>
.header{
  z-index: 99;
  position: fixed;
  @include diy_size(100vw,50px);
  background: #f5f5f5;
  .header_content{
    @include diy_size(150px,50px);
    float: right;
    cursor: pointer;
    margin-right: 20px;
    font: {
      size: 20px;
    };
    &:hover{
      color: #ff0036;
    }
  }
}
</style>
