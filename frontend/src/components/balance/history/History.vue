<template>
  <div class="only_mobile">
    <div class="container">
      <div class="d-flex justify-content-center">
        <div class="history_block">
          <h1>History</h1>
          <table>
            <thead>
            <tr>
              <th>Payment ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Symbol</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="transaction in this.history" :key="transaction">
              <td>{{ transaction.payment_id.slice(0, 2) + '...' + transaction.payment_id.slice(-2) }}</td>
              <td>
                <img v-if="transaction.type==='deposit'" :src="imgs.deposit" alt="deposit">
                <img v-if="transaction.type==='withdraw'" :src="imgs.withdraw" alt="withdraw">
              </td>
              <td>{{ transaction.amount.toFixed(2) }}</td>
              <td>
                <img v-if="transaction.symbol==='Ton'" :src="imgs.ton" alt="ton">
              </td>
              <td>{{ transaction.date }}</td>
              <td>
                <img v-if="['finished'].includes(transaction.payment_status.toLowerCase())"
                     :src="imgs.done" alt="done">
                <img
                    v-if="['waiting', 'confirming', 'confirmed', 'sending', 'partially_paid', 'created'].includes(transaction.payment_status.toLowerCase())"
                    :src="imgs.waiting"
                    alt="waiting">
                <img
                    v-if="['failed', 'refunded', 'expired', 'rejected'].includes(transaction.payment_status.toLowerCase())"
                    :src="imgs.canceled"
                    alt="canceled">
              </td>
            </tr>
            </tbody>
          </table>
          <div v-if="this.history && ! this.is_end" class="button_load" @click="get_history(this.page)">
            load more
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {Store} from "@/store";
import done from "@/assets/img/icons/history/done.svg";
import canceled from "@/assets/img/icons/history/canceled.svg";
import waiting from "@/assets/img/icons/history/waiting.svg";
import deposit from "@/assets/img/icons/history/deposit.svg";
import withdraw from "@/assets/img/icons/history/withdraw.svg";
import ton from "@/assets/img/icons/symbols/ton_symbol.svg"

export default {
  name: 'BalanceHistory',
  components: {},
  data() {
    return {
      imgs: {
        //statuses
        done: done,
        waiting: waiting,
        canceled: canceled,
        // types
        deposit: deposit,
        withdraw: withdraw,
        // symbols
        ton: ton,
      },
      user: null,
      page: 1,
      history: [],
      is_end: 0,
    }
  },
  methods: {
    getUserInfo() {
      this.user = Store().getUser
    },
    async get_history(page) {
      try {
        const response = await axios.get(
            `${Store().getAPI}/app/get_history`,
            {
              params: {
                user_id: this.user.user_id,
                page: page,
                per_page: 10,
              }
            }
        );
        this.history.push(...response.data.result);
        this.page = response.data.page
        if (!response.data.result || response.data.result.length === 0) {
          this.is_end = true
        }
      } catch (error) {
        console.error('Ошибка при выполнении GET запроса:', error);
      }
    },
  },
  mounted() {
    this.getUserInfo();
    this.get_history(1)
  }
}
</script>
