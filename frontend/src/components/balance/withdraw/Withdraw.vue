<template>
  <div class="only_mobile">
    <div class="container">
      <div class="d-flex justify-content-center">
        <div class="withdraw_block">
          <h1>
            Withdraw
          </h1>
          <div v-if="this.user" class="input_wrapper">
            <img src="@/assets/img/icons/symbols/ton_symbol.svg" alt="Jetton" class="ton_icon"/>
            <input type="number" class="input_amount" placeholder="10" v-model.number="payout_amount"/>
            <div class="max_amount">Max: {{ user.user_balance }}</div>
          </div>
          <div v-if="this.user" class="input_wrapper">
            <input class="input_address" placeholder='Enter your Ton wallet address starting with "EQ"'
                   v-model="payout_address"/>
          </div>
          <div v-if="this.payout_amount && this.payout_address"
               class="payout_button"
               @click="create_payout">
            <h1>Payout</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {Store} from "@/store";
import axios from "axios";

export default {
  name: 'BalanceDeposit',
  components: {},
  data() {
    return {
      user: null,
      payout_amount: null,
      payout_address: null,
    }
  },
  methods: {
    async getUserInfo() {
      this.user = Store().getUser
    },
    async create_payout() {
      if (this.payout_amount <= this.user.user_balance) {
        try {
          const response = await axios.post(
            `${Store().getAPI}/np/create_payout`,
            {
              user_id: this.user.user_id,
              payout_amount: this.payout_amount,
              payout_address: this.payout_address,
            },
            {
              headers: {
                'X-AUTH': this.user.token,
              }
            }
          );
          this.$router.push('/balance/history');
          return response.data;
        } catch (error) {
          console.error('Ошибка при выполнении GET запроса:', error);
          this.$router.push('/error');
        }
      }
    },
    open_dashboard(){
      this.$router.push('/');
    }
  },
  mounted() {
    window.Telegram.WebApp.BackButton.isVisible = true;
    window.Telegram.WebApp.BackButton.onClick(this.open_dashboard.bind(this))
    this.getUserInfo();
  },
}
</script>
