<template>
  <div class="product_bg">
    <div class="product_content">
      <a-card hoverable class="product_card" v-for="list in product.list" :key="list.id">
        <template #cover>
          <img
              alt="example"
              :src="`http://10.9.1.6/${list.imgUrl}`"
          />
        </template>
        <template #actions>
          <shopping-cart-outlined key="shopping" title="添加至购物车" />
          <alipay-circle-outlined key="alipay" @click="toPay(list.id)" title="支付宝购买" />
          <ellipsis-outlined key="ellipsis" title="了解更多" />
        </template>
        <a-card-meta :title="list.title" :description="list.description">
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
           <div>价格:￥{{list.price}}</div>
          </template>
        </a-card-meta>
      </a-card>
    </div>
  </div>

</template>

<script>
import aliPayApi from "@/api/aliPayApi";
import { ShoppingCartOutlined, AlipayCircleOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import { reactive,defineComponent  } from 'vue';

export default defineComponent ({
  name: "IndexProduct",
  components: {
    AlipayCircleOutlined,
    ShoppingCartOutlined,
    EllipsisOutlined,
  },
  setup() {
    const product = reactive({
          list: [],
        }
    )
    const getProductList = async () => {
      aliPayApi.productList().then((response) => {
        product.list=response.data.productList;
      })
    }

    const toPay = async (productId) => {
      //调用支付宝统一收单下单并支付页面接口
      aliPayApi.tradePagePay(productId,96,2).then((response) => {
        //将支付宝返回的表单字符串写在浏览器中，表单会自动触发submit提交
        document.write(response.data.formStr)
      })
    }


    getProductList()
    return {
      product,
      getProductList,
      toPay,
    }
  }
})
</script>

<style lang="scss" scoped>
.product_bg{
  background: #e8e2e0;
  @include diy_size_minHeight(100vw, 100vh);
  padding-bottom: 50px;
  .product_content{
    background: #ffffff;
    border: {
      radius: 20px;
    };
    position: absolute;
    left: 20vw;
    top:50px;
    @include diy_size_minHeight(60vw, 800px);
    .product_card{
      float: left;
      width: 10.8vw;
      margin: {
        left: 1vw;
        top: 20px;
        bottom: 0;
        right: 0;
      };
    }
  }
}
</style>
