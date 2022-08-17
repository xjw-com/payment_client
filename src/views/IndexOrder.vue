<template>
  <div class="order_body">
    <div class="order_header">这里是头部</div>
    <div class="order_body_content">
      <vxe-grid v-bind="gridOptions">
        <template #payment_default="{ row }">
          <span v-if="row.payment_type==='支付宝'">
              <a-tag color="#55acee">
                <template #icon>
                  <alipay-outlined/>
                </template>{{ row.payment_type }}
              </a-tag>
          </span>
          <span v-else>
             <a-tag color="#1cd66c">
                <template #icon>
                  <wechat-outlined/>
                </template>{{ row.payment_type }}
              </a-tag>
          </span>
        </template>
        <template #order_default="{ row }">
          <span v-if="row.order_status==='未支付'">
             <a-tag color="#b88230">
                <template #icon>
                 <exclamation-circle-outlined/>
                </template>{{ row.order_status }}
             </a-tag>
          </span>
          <span v-if="row.order_status==='支付成功'">
             <a-tag color="#52c41a">
                <template #icon>
                 <check-circle-outlined/>
                </template>{{ row.order_status }}
             </a-tag>
          </span>
          <span v-if="row.order_status==='超时已关闭'">
             <a-tag color="#91d5ff">
                <template #icon>
                <close-circle-outlined/>
                </template>{{ row.order_status }}
             </a-tag>
          </span>
          <span v-if="row.order_status==='用户已取消'">
             <a-tag color="#d7dee1">
                <template #icon>
              <info-circle-outlined/>
                </template>{{ row.order_status }}
             </a-tag>
          </span>
          <span v-if="row.order_status==='退款中'">
             <a-tag color="#faad14">
                <template #icon>
                  <a-space>
                     <loading-outlined/>
                  </a-space>
                </template>{{ row.order_status }}
             </a-tag>
          </span>
          <span v-if="row.order_status==='已退款'">
             <a-tag color="#a26ef4">
                <template #icon>
             <check-outlined/>
                </template>{{ row.order_status }}
             </a-tag>
          </span>
          <span v-if="row.order_status==='退款异常'">
             <a-tag color="#ff4d4f">
                <template #icon>
                  <warning-outlined/>
                </template>{{ row.order_status }}
             </a-tag>
          </span>
          <span v-if="row.order_status==='交易结束'">
             <a-tag color="#ff4d4f">
                <template #icon>
                  <smile-outlined />
                </template>{{ row.order_status }}
             </a-tag>
          </span>

        </template>
        <template #operation_default="{ row }">
          <span v-if="row.order_status==='支付成功'">
            <a-button type="link" @click="alipayRefund(row)">退款</a-button>
          </span>
          <span v-else-if="row.order_status==='未支付'">
            <a-button type="link" @click="cancelPurchase(row.order_no)">取消购买</a-button>
          </span>
        </template>
      </vxe-grid>
    </div>
  </div>


<!--  退款理由弹出框-->
  <a-modal
      v-model:visible="refund.visible"
      :title="refund.title"
      centered
      @ok="refundOk"
  >
    <template #footer>
      <a-button key="back" @click="refund.visible=false">取消退款</a-button>
      <a-button key="submit" type="primary" :loading="refund.loading" @click="refundOk">确认退款</a-button>
    </template>
    <a-radio-group v-model:value="refund.reason" :options="refundReasonOptions" />
  </a-modal>
</template>

<script>
import { getDays } from "@/utils/globaljs"
import aliPayApi from "@/api/aliPayApi";
import { defineComponent, reactive } from 'vue';
import { message } from 'ant-design-vue';
import {
  AlipayOutlined,
  WechatOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  CheckOutlined,
  WarningOutlined,
  SmileOutlined
} from '@ant-design/icons-vue';


const refundReasonOptions = ['不想买了', '太贵了', '买错了'];

export default defineComponent({
  name: "IndexOrder",
  components: {
    AlipayOutlined,
    WechatOutlined,
    ExclamationCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
    LoadingOutlined,
    CheckOutlined,
    WarningOutlined,
    SmileOutlined
  },
  setup() {
    const gridOptions = reactive({
      border: true,
      height: 600,
      align: 'center',
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
        {field: 'order_no', title: '订单号'},
        {field: 'title', title: '订单'},
        {field: 'price', title: '单价'},
        {field: 'product_amounts', title: '数量'},
        {field: 'total_fee', title: '实付款'},
        {
          field: 'payment_type',
          title: '支付方式',
          showOverflow: true,
          slots: {default: 'payment_default'}
        },
        {
          field: 'order_status',
          title: '订单状态',
          showOverflow: true,
          slots: {default: 'order_default'}
        },
        {field: 'update_time', title: '交易时间'},
        {
          field: 'operation',
          title: '操作',
          showOverflow: true,
          slots: {default: 'operation_default'}
        },
      ],
      proxyConfig: {
        seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
        props: {
          result: 'result',
          total: 'page.total'
        },
        ajax: {
          // 接收 Promise
          query: ({page}) => {
            return new Promise(resolve => {
              gridOptions.loading = true
              aliPayApi.list(96).then((response) => {
               const orderList=response.data.list;

                gridOptions.loading = false
                const list=orderList;
              gridOptions.loading = false
              resolve({
                page: {
                  total: list.length
                },
                result: list.slice((page.currentPage - 1) * page.pageSize, page.currentPage * page.pageSize)
              })

              })
            })
          }
        }
      }
    })

    //取消订单
    const cancelPurchase=async (order_number)=>{
      aliPayApi.cancel(order_number).then((response) => {
        message.success(response.message).then(()=> location.reload());
      })
    }

    // 退款
    const alipayRefund=async (order)=>{
      refund.time=order.update_time;
      if(getDays(refund.time.substring(0,10))>7){
        message.warning("订单日期超过7天,不允许退款").then(()=>{ location.reload() })
      }else{
        refund.visible=true;
        refund.title=`${order.order_no}退款理由:`;
      }
    }


    const refundOk = () => {
      refund.loading = true;
      aliPayApi.refunds(refund.title.replace("退款理由:",""),refund.reason.toString()).then((response) => {
        refund.loading = false;
        refund.visible = false;
        message.success(response.data).then(()=> location.reload());
      })
    };


    const refund=reactive({
      visible:false,
      title:"",
      time:"",
      loading:false,
      reason:[],
    })

    return {
      gridOptions,
      cancelPurchase,
      alipayRefund,
      refund,
      refundOk,
      refundReasonOptions,
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
