<template>
  <a-result
      status="success"
      :title="successTips"
  >
    <a-statistic-countdown
        format="s"
        prefix="页面将在"
        suffix="秒后跳转至购买主页"
        :value="deadline"
        style="margin-right: 50px"
        @finish="onFinish"
    />
    <template #extra>
      <a-button key="console" type="primary" @click="toBuy">继续购买</a-button>
      <a-button key="buy" @click="toOrder">查看订单</a-button>
    </template>
  </a-result>
</template>

<script>
import { useRoute } from 'vue-router'
import {ref} from "vue";
import router  from '@/router/index'

export default {
  name: "indexSuccess",
  setup(){
    const route = useRoute();
    const productNo=route.query.out_trade_no;
    const successTips=ref( `订单${productNo}已支付成功!!`);
    const onFinish =async ()=>{
      await router.push('/')
    }
    const toBuy = async ()=>{
      await router.push('/')
    }
    const toOrder = async ()=>{
      await router.push('/indexOrder')
    }
    return{
      successTips,
      deadline: Date.now() + 1000 * 5 ,
      onFinish,
      toBuy,
      toOrder
    }
  }
}
</script>

<style scoped>

</style>
