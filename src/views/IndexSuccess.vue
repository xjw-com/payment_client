<template>
  <a-result
      status="success"
      :title="successTips"
      sub-title="页面将在5s后跳转购买页面"
  >
    <template #extra>
      <a-button key="console" type="primary">继续购买</a-button>
      <a-button key="buy">查看订单</a-button>
    </template>
  </a-result>
</template>

<script>
import { useRoute } from 'vue-router'
import {ref} from "vue";

export default {
  name: "indexSuccess",
  setup(){
    const route = useRoute();
    const productNo=route.query.out_trade_no;
    const successTips=ref( `订单${productNo}已支付成功!!`);
    console.log(successTips.value)

    return{
      successTips
    }
  }
}
</script>

<style scoped>

</style>
