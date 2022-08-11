<template>
  <div class="order_body">
    <div class="order_header">这里是头部</div>
    <div class="order_body_content">
      <div v-for="list in orderList" :key="list">
        {{list}}
      </div>
<!--      <vxe-grid v-bind="gridOptions"></vxe-grid>-->
    </div>
  </div>
</template>

<script>
import aliPayApi from "@/api/aliPayApi";
import { defineComponent, reactive,onMounted } from 'vue'

export default defineComponent({
  name: "IndexOrder",
  setup(){
    let orderList=reactive(null)
    onMounted(() => {
      aliPayApi.list(2).then((response)=>{
         orderList=response.data;
      })
    })

    const gridOptions = reactive({
      border: true,
      showHeaderOverflow: true,
      showOverflow: true,
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
        { type: 'seq', width: 60 },
        { field: 'name', title: '商品',sortable: true },
        { field: 'unit_price', title: '单价' },
        { field: 'order_amount', title: '数量' },
        { field: 'payment_type',
          title: '支付方式',
          sortable: true,
          filters: [
            { label: '支付宝', value: '支付宝' },
            { label: '微信', value: '微信' }
          ],
        },
        { field: 'order_status',
          title: '订单状态',
          filters: [
            { label: '未支付', value: '未支付' },
            { label: '已退款', value: '已退款' },
            { label: '退款异常', value: '退款异常' },
            { label: '支付成功', value: '支付成功' },
            { label: '用户已取消', value: '用户已取消' },
            { label: '超时已关闭', value: '用户已取消' },
          ],
          sortable: true,
        },
        { field: 'create_time',
          title: '交易时间',
          sortable: true,
        },
        // { field: 'address', title: 'Address', showOverflow: true }
      ],
      proxyConfig: {

        seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
        sort: true, // 启用排序代理，当点击排序时会自动触发 query 行为
        filter: true,
        props: {
          result: 'result',
          total: 'page.total'
        },
        ajax: {
          // 接收 Promise
          query: ({ page }) => {
            return new Promise(resolve => {
              setTimeout(() => {
                const list = [
                  { name: 'Test1', unit_price: 'T1', order_amount: 'Develop', payment_type: 'Man', order_status: 28, create_time: 'Shenzhen' },
                  { name: 'Test1', unit_price: 'T1', order_amount: 'Develop', payment_type: 'Man', order_status: 28, create_time: 'Shenzhen' },
                  { name: 'Test1', unit_price: 'T1', order_amount: 'Develop', payment_type: 'Man', order_status: 28, create_time: 'Shenzhen' },
                  { name: 'Test1', unit_price: 'T1', order_amount: 'Develop', payment_type: 'Man', order_status: 28, create_time: 'Shenzhen' },
                  { name: 'Test1', unit_price: 'T1', order_amount: 'Develop', payment_type: 'Man', order_status: 28, create_time: 'Shenzhen' },
                  { name: 'Test1', unit_price: 'T1', order_amount: 'Develop', payment_type: 'Man', order_status: 28, create_time: 'Shenzhen' },
                  { name: 'Test1', unit_price: 'T1', order_amount: 'Develop', payment_type: 'Man', order_status: 28, create_time: 'Shenzhen' },
                  { name: 'Test1', unit_price: 'T1', order_amount: 'Develop', payment_type: 'Man', order_status: 28, create_time: 'Shenzhen' },
                  { name: 'Test1', unit_price: 'T1', order_amount: 'Develop', payment_type: 'Man', order_status: 28, create_time: 'Shenzhen' },
                  { name: 'Test1', unit_price: 'T1', order_amount: 'Develop', payment_type: 'Man', order_status: 28, create_time: 'Shenzhen' },
                  { name: 'Test1', unit_price: 'T1', order_amount: 'Develop', payment_type: 'Man', order_status: 28, create_time: 'Shenzhen' },
                  { name: 'Test1', unit_price: 'T1', order_amount: 'Develop', payment_type: 'Man', order_status: 28, create_time: 'Shenzhen' },
                  { name: 'Test1', unit_price: 'T1', order_amount: 'Develop', payment_type: 'Man', order_status: 28, create_time: 'Shenzhen' },
                  { name: 'Test1', unit_price: 'T1', order_amount: 'Develop', payment_type: 'Man', order_status: 28, create_time: 'Shenzhen' },
                  { name: 'Test1', unit_price: 'T1', order_amount: 'Develop', payment_type: 'Man', order_status: 28, create_time: 'Shenzhen' },
                  { name: 'Test1', unit_price: 'T1', order_amount: 'Develop', payment_type: 'Man', order_status: 28, create_time: 'Shenzhen' }
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

    return {
      gridOptions,
      orderList
    }
  }
})
</script>

<style lang="scss"  scoped>

.order_body{
  position: relative;
  background: #e8e2e0;
  @include diy_size_minHeight(100vw,100vh);
  padding-bottom: 50px;
  .order_header{
    position: absolute;
    background: #ffffff;
    @include diy_size_except(100vw,50px)
  }
  .order_body_content{
    position: absolute;
    left: 20vw;
    top: 100px;
    @include diy_size_minHeight(60vw,800px);
    background: #ffffff;
    border: {
      radius: 20px;
    };
  }
}
</style>
