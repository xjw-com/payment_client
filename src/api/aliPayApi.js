// axios 发送ajax请求
import request from '@/utils/request'

export default{

  //发起支付请求
  tradePagePay(productId) {
    return request({
      url: '/api/ali-pay/trade/page/pay/' + productId,
      method: 'post'
    })
  },
  // 取消
  cancel(orderNo) {
    return request({
      url: '/api/ali-pay/trade/close/' + orderNo,
      method: 'post'
    })
  },
  // 退款
  refunds(orderNo, reason) {
    return request({
      url: '/api/ali-pay/trade/refund/' + orderNo + '/' + reason,
      method: 'post'
    })
  },
  list(userId){
    return request({
      url: '/api/order-info/list/' + userId,
      method: 'post'
    })
  }
}
