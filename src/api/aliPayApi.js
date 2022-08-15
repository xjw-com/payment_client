// axios 发送ajax请求
import request from '@/utils/request'

export default {

  //发起支付请求
  tradePagePay(productId,userId,productAmount) {
    return request({
      url: '/api/ali-pay/trade/page/pay/' + productId + '/' + userId+'/'+productAmount,
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
  // 订单列表
  list(userId) {
    return request({
      url: '/api/order-info/list/' + userId,
      method: 'post'
    })
  },
  // 商品列表
  productList() {
    return request({
      url: '/api/product/list',
      method: 'get'
    })
  }
}
