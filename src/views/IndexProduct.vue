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
          <shopping-cart-outlined key="shopping" title="添加至购物车" @click="addCollection(list.id)"/>
          <alipay-circle-outlined key="alipay" @click="alipayPurchase(list)" title="支付宝购买"/>
          <ellipsis-outlined key="ellipsis" title="了解更多" @click="learnMore(list.id)"/>
        </template>
        <a-card-meta :title="list.title" :description="list.description">
        </a-card-meta>
      </a-card>
    </div>
  </div>


  <a-modal
      v-model:visible="product.visible"
      :title="product.title"
      :maskClosable=false
      centered
      @ok="toPay(product.id)"
  >
    <template #footer>
      <a-button key="back" @click="product.visible=false">取消购买</a-button>
      <a-button key="submit" type="primary" :loading="product.loading" @click="toPay(product.id)">确认购买</a-button>
    </template>
    <a-image
        :width="200"
        :src="`http://10.9.1.6/${product.imgUrl}`"
    />
    <div style="float: right;margin-right: 10px">
      <div class="product_price">
        <span style="margin-right: 10px"> 价格：</span><span class="product_price_number">￥{{ product.totalPrice }}</span>
      </div>
      数量:
      <el-input-number v-model="product.amount" :min="1" :max="10" label="购买的数量"></el-input-number>
    </div>
  </a-modal>

</template>

<script>
import aliPayApi from "@/api/aliPayApi";
import {ShoppingCartOutlined, AlipayCircleOutlined, EllipsisOutlined} from '@ant-design/icons-vue';
import {reactive, defineComponent, watchEffect} from 'vue';
import {message} from "ant-design-vue";

export default defineComponent({
  name: "IndexProduct",
  components: {
    AlipayCircleOutlined,
    ShoppingCartOutlined,
    EllipsisOutlined,
  },
  setup() {
    const product = reactive({
          list: [],
          visible: false,
          title: "",
          id: '',
          amount: 1,
          price: 0,
          totalPrice: 0,
          imgUrl: "",
          loading: false,
        }
    )
    const getProductList = async () => {
      aliPayApi.productList().then((response) => {
        product.list = response.data.productList;
      })
    }

    const toPay = async (productId) => {
      //调用支付宝统一收单下单并支付页面接口
      aliPayApi.tradePagePay(productId, 96, product.amount).then((response) => {
        //将支付宝返回的表单字符串写在浏览器中，表单会自动触发submit提交
        document.write(response.data.formStr)
      })
    }

    const addCollection = async (productId) => {
      message.success(`${productId}功能暂未完成`)
    }

    const learnMore = async (productId) => {
      message.success(`${productId}功能暂未完成`)
    }

    const alipayPurchase = async (productData) => {
      product.visible = true;
      product.title = `商品:${productData.title}`;
      product.id = productData.id;
      product.imgUrl = productData.imgUrl;
      product.price = productData.price;
    }

    watchEffect(() => {
      product.totalPrice = product.price * product.amount;
    });

    getProductList()
    return {
      product,
      getProductList,
      toPay,
      addCollection,
      learnMore,
      alipayPurchase
    }
  }
})
</script>

<style lang="scss" scoped>
.product_bg {
  background: #e8e2e0;
  @include diy_size_minHeight(100vw, 100vh);
  padding-bottom: 50px;

  .product_content {
    background: #ffffff;
    border: {
      radius: 20px;
    };
    position: absolute;
    left: 20vw;
    top: 50px;
    @include diy_size_minHeight(60vw, 800px);

    .product_card {
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

.product_price {
  background: #e9e9e9;
  padding-left: 10px;
  line-height: 40px;
  margin-bottom: 20px;

  .product_price_number {
    color: #ff0036;
    font: {
      size: 24px;
    };
  }
}

</style>
