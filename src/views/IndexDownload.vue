<template>
  <div class="download_bg">
    <div class="download_content">
      <a-card hoverable class="download_card">
        <a-card-meta title="日账单下载">
          <template #description>最早可下载2016年1月1日开始的日账单。不支持下载当日账单，只能下载前一日24点前的账单数据</template>
        </a-card-meta>
        <a-divider/>
        <div>选择日期:
          <a-date-picker v-model:value="timeDate" :disabled-date="disabledDate"  valueFormat="YYYY-MM-DD"/>
        </div>
        <div style="margin-top:20px">
          <a-button type="primary" :loading="downDayLoading" @click="downloadBillAliPayDay('trade')">
            <template #icon>
              <DownloadOutlined/>
            </template>
            下载交易账单
          </a-button>
        </div>
        <div style="margin-top:20px">
          <a-button type="primary" :loading="downDayLoading" @click="downloadBillAliPayDay('signcustomer')">
            <template #icon>
              <DownloadOutlined/>
            </template>
            下载资金账单
          </a-button>
        </div>
      </a-card>
      <a-card hoverable class="download_card">
        <a-card-meta title="月账单下载">
          <template #description>最早可下载2016年1月开始的月账单。不支持下载当月账单，只能下载上一月账单数据</template>
        </a-card-meta>
        <a-divider/>
        <div>选择日期:
          <a-date-picker v-model:value="timeMonth" :disabled-date="disabledMonth"  picker="month" valueFormat="YYYY-MM"/>
        </div>
        <div style="margin-top:20px">
          <a-button type="primary" :loading="downMonthLoading" @click="downloadBillAliPayMonth('trade')">
            <template #icon>
              <DownloadOutlined/>
            </template>
            下载交易账单
          </a-button>
        </div>
        <div style="margin-top:20px">
          <a-button type="primary" :loading="downMonthLoading" @click="downloadBillAliPayMonth('signcustomer')">
            <template #icon>
              <DownloadOutlined/>
            </template>
            下载资金账单
          </a-button>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import dayjs from 'dayjs';
import aliPayApi from "@/api/aliPayApi";
import {DownloadOutlined} from '@ant-design/icons-vue';
import {message} from "ant-design-vue";

export default {
  name: "IndexDownload",
  components: {
    DownloadOutlined
  },
  setup() {

    const timeDate = ref();
    const timeMonth = ref();


    const downDayLoading = ref(false);
    const downMonthLoading = ref(false);
    const downloadBillAliPayDay = async (type) => {
      if(timeDate.value!=null){
        downDayLoading.value = true;
        aliPayApi.downloadBillAliPay(timeDate.value, type).then((response) => {
          downDayLoading.value = false;
          console.log(response.data.downloadUrl)
          const element = document.createElement('a')
          element.setAttribute('href', response.data.downloadUrl)
          element.setAttribute('download', this.billDate_alipay + '-' + type)
          element.style.display = 'none'
          element.click()
        })
      }else{
        message.warning("请选择打印账单的日期！！！")
      }
    }

    const downloadBillAliPayMonth = async (type) => {
      if(timeMonth.value!=null){
        downMonthLoading.value = true;
        aliPayApi.downloadBillAliPay(timeMonth.value, type).then((response) => {
          downMonthLoading.value = false;
          console.log(response.data.downloadUrl)
          const element = document.createElement('a')
          element.setAttribute('href', response.data.downloadUrl)
          element.setAttribute('download', this.billDate_alipay + '-' + type)
          element.style.display = 'none'
          element.click()
        })
      }else{
        message.warning("请选择打印账单的月份！！！")
      }
    }
    const disabledDate = current => {
      return current && current >= dayjs().startOf('day');
    };
    const disabledMonth = current => {
      return current && current >= dayjs().startOf('month');
    };


    return {
      timeDate,
      timeMonth,
      downMonthLoading,
      downDayLoading,
      downloadBillAliPayDay,
      downloadBillAliPayMonth,
      disabledDate,
      disabledMonth,
    }
  }
}
</script>

<style lang="scss" scoped>
.download_bg {
  background: #e8e2e0;
  @include diy_size_minHeight(100vw, 100vh);
  padding-bottom: 50px;

  .download_content {
    background: #ffffff;
    border: {
      radius: 20px;
    };
    position: absolute;
    left: 20vw;
    top: 10vw;
    @include diy_size_minHeight(60vw, 450px);

    .download_card {
      width: 27vw;
      margin: {
        left: 2vw;
        top: 50px;
      }
      float: left;
    }
  }
}
</style>
