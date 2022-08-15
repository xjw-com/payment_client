<template>
  <div class="order_body">
    <div class="order_header">这里是头部</div>
    <div class="order_body_content">
      <vxe-grid v-bind="gridOptions"></vxe-grid>
<!--      <a-row type="flex">-->
<!--        <a-col :flex="6" class="order_list_header">宝贝</a-col>-->
<!--        <a-col :flex="2" class="order_list_header">单价</a-col>-->
<!--        <a-col :flex="2" class="order_list_header">数量</a-col>-->
<!--        <a-col :flex="2" class="order_list_header">-->
<!--          <a-dropdown :trigger="['click']">-->
<!--            <a class="ant-dropdown-link" style="color:#2c3e50" @click.prevent>-->
<!--              支付方式-->
<!--              <DownOutlined />-->
<!--            </a>-->
<!--            <template #overlay>-->
<!--              <a-menu>-->
<!--                <a-menu-item key="0">-->
<!--                  <a href="http://www.alipay.com/">支付宝</a>-->
<!--                </a-menu-item>-->
<!--                <a-menu-divider />-->
<!--                <a-menu-item key="1">-->
<!--                  <a href="http://www.taobao.com/">微信</a>-->
<!--                </a-menu-item>-->
<!--              </a-menu>-->
<!--            </template>-->
<!--          </a-dropdown>-->
<!--        </a-col>-->
<!--        <a-col :flex="2" class="order_list_header">-->
<!--          <a-dropdown :trigger="['click']">-->
<!--            <a class="ant-dropdown-link" style="color:#2c3e50" @click.prevent>-->
<!--              订单状态-->
<!--              <DownOutlined />-->
<!--            </a>-->
<!--            <template #overlay>-->
<!--              <a-menu>-->
<!--                <a-menu-item key="0">-->
<!--                  <a href="http://www.alipay.com/">未支付</a>-->
<!--                </a-menu-item>-->
<!--                <a-menu-divider />-->
<!--                <a-menu-item key="1">-->
<!--                  <a href="http://www.taobao.com/">支付成功</a>-->
<!--                </a-menu-item>-->
<!--                <a-menu-divider />-->
<!--                <a-menu-item key="3">超时已关闭</a-menu-item>-->
<!--                <a-menu-divider />-->
<!--                <a-menu-item key="4">订单已取消</a-menu-item>-->
<!--                <a-menu-divider />-->
<!--                <a-menu-item key="5">已退款</a-menu-item>-->
<!--              </a-menu>-->
<!--            </template>-->
<!--          </a-dropdown>-->

<!--        </a-col>-->
<!--        <a-col :flex="4" class="order_list_header">交易时间</a-col>-->
<!--      </a-row>-->
<!--      <div class="order_list">-->
<!--        <div class="order_list_number">-->
<!--          订单号: 1576129083700552179-->
<!--        </div>-->

<!--          <a-row type="flex">-->
<!--            <a-col :flex="3">宝贝</a-col>-->
<!--            <a-col :flex="1">￥100:00</a-col>-->
<!--            <a-col :flex="1">1</a-col>-->
<!--            <a-col :flex="1">支付宝</a-col>-->
<!--            <a-col :flex="1">已付款</a-col>-->
<!--            <a-col :flex="2">2022-08-12 16:21:57</a-col>-->
<!--          </a-row>-->

<!--      </div>-->
    </div>
  </div>
</template>

<script>
import aliPayApi from "@/api/aliPayApi";
import {defineComponent, reactive} from 'vue';


export default defineComponent({
  name: "IndexOrder",
  components: {

  },
  setup() {
    const gridOptions = reactive({
      border: true,
      height: 600,
      rowConfig: {
        keyField: 'id'
      },
      columnConfig: {
        resizable: true
      },
      checkboxConfig: {
        reserve: true
      },
      pagerConfig: {
        pageSize: 10
      },
      columns: [
        { field: 'order_no', title: '订单号' },
        { field: 'title', title: '订单' },
        { field: 'price', title: '单价' },
        { field: 'total', title: '数量' },
        { field: 'total_fee', title: '实付款' },
        { field: 'payment_type', title: '支付方式' },
        { field: 'order_status', title: '订单状态' },
        { field: 'update_time', title: '交易时间'}
      ],
      proxyConfig: {
        seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
        props: {
          result: 'result',
          total: 'page.total'
        },
        ajax: {
          // 接收 Promise
          query: ({ page }) => {
            return new Promise(resolve => {
              gridOptions.loading = true
              setTimeout(() => {
               gridOptions.loading = false
                const list = [
                  { order_no: 'ORDER_20220812162010629', title: '商品1', price: '￥10.00', total: '3', total_fee: '￥30.00', payment_type: '支付宝', order_status: '已付款',update_time:"2022-08-12 16:53:03" },
                  { order_no: 'ORDER_20220812162010629', title: '商品1', price: '￥10.00', total: '3', total_fee: '￥30.00', payment_type: '支付宝', order_status: '已付款',update_time:"2022-08-12 16:53:03" },
                  { order_no: 'ORDER_20220812162010629', title: '商品1', price: '￥10.00', total: '3', total_fee: '￥30.00', payment_type: '支付宝', order_status: '已付款',update_time:"2022-08-12 16:53:03" },
                  { order_no: 'ORDER_20220812162010629', title: '商品1', price: '￥10.00', total: '3', total_fee: '￥30.00', payment_type: '支付宝', order_status: '已付款',update_time:"2022-08-12 16:53:03" },
                ]
                resolve({
                  page: {
                    total: list.length
                  },
                  result: list.slice((page.currentPage - 1) * page.pageSize, page.currentPage * page.pageSize)
                })
              }, 100)
            })
          }
        }
      }
    })

    let orderList = reactive({
      list:[],
    });
    const list = async () => {
      aliPayApi.list(2).then((response) => {
        orderList.list=response.data.list;
      })
    }


  //  list()
    return {
      gridOptions,
      orderList,
      list,
    }
  }
})
</script>

<style lang="scss" scoped>

.order_body {
  position: relative;
  background: #e8e2e0;
  @include diy_size_minHeight(100vw, 100vh);
  padding-bottom: 50px;

  .order_header {
    position: absolute;
    background: #ffffff;
    @include diy_size_except(100vw, 50px)
  }

  .order_body_content {
    position: absolute;
    left: 20vw;
    top: 100px;
    padding: 5px 10px 5px 10px;
    @include diy_size_minHeight(60vw, 800px);
    background: #ffffff;
    border: {
      radius: 20px;
    };
  }
}
</style>
