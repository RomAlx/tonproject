<template>
  <div class="only_mobile">
    <div class="container">
      <div class="d-flex justify-content-center">
        <div class="deposit_block">
          <h1>
            Choose asset to top up
          </h1>
          <div class="row">
            <div class="col-6">
              <div class="deposit_button" @click="selectAsset('Ton')">
                <img src="@/assets/img/icons/symbols/ton_symbol.svg" alt="">
                <p>Ton</p>
              </div>
            </div>
            <div class="col-6">
              <div class="deposit_button" @click="selectAsset('Jetton')">
                <img src="@/assets/img/icons/symbols/jetton_symbol.svg" alt="">
                <p>Jetton</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {Store} from '@/store'

const store = Store()
export default {
  name: 'BalanceDeposit',
  components: {},
  data() {
    return {
      selectedAsset: null
    }
  },
  methods: {
    async postShitPrint() {
      console.log(`${store.getAPI}/sample/print`);

      try {
        const response = await axios.post(
            `${store.getAPI}/shit/print`,
            {tgInitData: window.Telegram.WebApp.initData},
        );
        return response.data;
      } catch (error) {
        console.error('Ошибка при выполнении POST запроса:', error);
      }
    },
  }
  ,
  mounted() {
    this.postShitPrint();
  }
}
</script>
