<template>
  <div class="only_mobile">
    <!--    {{ this.user }}-->
    <!--    {{ this.payment_info }}-->
    <div class="container">
      <div class="d-flex justify-content-center">
        <div class="deposit_block">
          <h1>
            Choose asset to top up
          </h1>
          <div class="deposit_block dropdown_select" @click="choose_asset">
            <img class="symbol_img"
                 v-if="this.asset.symbol_img"
                 :src="this.asset.symbol_img"
                 alt=""
            >
            <p>{{ this.asset.value }}</p>
            <img
                class="choose_arrow"
                src="@/assets/img/icons/balance/dropdown_arrow.svg"
                alt="">
          </div>
          <div class="dropdown_elements" v-for="symbol in this.symbols" :key="symbol">
            <div v-if="this.is_choosing_asset"
                 class="dropdown_element"
                 @click="select_asset(symbol)">
              <img class="symbol_img"
                   :src="symbol.symbol_img"
                   alt=""
              >
              <p>{{ symbol.value }}</p>
            </div>
          </div>
          <div v-if="this.payment_info.is_relevant" class="input_wrapper">
            <input type="number" class="input_amount" :placeholder="this.payment_info.min_amount.toFixed(2)"
                   v-model.number="payment_amount"/>
            <div v-if="this.asset.symbol!='btc'" class="min_amount">Min: {{ this.payment_info.min_amount.toFixed(2) }}
              {{ this.asset.value }}
            </div>
            <div v-else class="min_amount">Min: {{ this.payment_info.min_amount.toFixed(7) }} {{
                this.asset.value
              }}
            </div>
          </div>
          <div v-if="this.payment_info.is_relevant && !this.payment_info.pay_address"
               class="pay_button"
               @click="create_pay_page">
            <h1>Top up</h1>
          </div>
          <div v-if="this.payment_info.pay_address" class="pay_address">
            <p v-if="this.payment_info.amount_received">
              Send {{ this.payment_amount }} {{ this.asset.value }} to this address<br>
              You will receive {{ this.payment_info.amount_received.toFixed(2) }} Ton after transfer and exchange fees
            </p>
            <img
                class="pay_address qr_code"
                :src="this.payment_info.qr_code_url"
                alt="">
            <p v-for="text in this.text_wrapper(this.payment_info.pay_address)"
               :key="text" @click="copyTextToClipboard(this.payment_info.pay_address)">
              {{ text }}
            </p>
            <img
                class="copy_img"
                :src="this.copy_img"
                alt=""
                @click="copyTextToClipboard(this.payment_info.pay_address)"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import symbolsConfig from "@/configs/symbols";
import copy from "@/assets/img/icons/app/copy.svg";
import copy_success from "@/assets/img/icons/app/copy-success.svg";
import axios from "axios";
import {Store} from "@/store";

export default {
  name: 'BalanceDeposit',
  components: {},
  data() {
    return {
      user: null,
      is_choosing_asset: false,
      asset: {
        symbol: null,
        symbol_img: null,
        value: "Select asset",
      },
      payment_info: {
        currency_from: null,
        currency_to: null,
        min_amount: null,
        usd_eqivalent: null,
        is_relevant: false,
        amount_received: null,
        pay_address: null,
        qr_code_url: null
      },
      payment_amount: 0,
      symbols: symbolsConfig,
      copy_img: copy
    }
  },
  watch: {
    payment_amount() {
      this.payment_info.pay_address = null
    }
  },
  methods: {
    getUserInfo() {
      this.user = Store().getUser
    },
    choose_asset() {
      this.is_choosing_asset = !this.is_choosing_asset
      this.payment_info.is_relevant = false
      this.payment_info.pay_address = null
    },
    select_asset(symbol) {
      this.asset.symbol = symbol.symbol
      this.asset.symbol_img = symbol.symbol_img
      this.asset.value = symbol.value
      this.get_symbol_info(this.asset.symbol)
      this.choose_asset()
    },
    async get_symbol_info(symbol) {
      try {
        const response = await axios.get(
            `${Store().getAPI}/np/min_payment`,
            {
              headers: {
                'X-AUTH': this.user.token,
              },
              params: {
                symbol: symbol,
              }
            }
        );
        if (response.data.currency_from !== undefined) {
          this.payment_info.currency_from = response.data.currency_from
          this.payment_info.currency_to = response.data.currency_to
          this.payment_info.min_amount = response.data.min_amount
          this.payment_info.usd_eqivalent = response.data.fiat_equivalent
          this.payment_info.is_relevant = true
        }
      } catch (error) {
        console.error('Ошибка при выполнении GET запроса:', error);
        this.$router.push('/error');
      }
    },
    async create_pay_page() {
      try {
        const response = await axios.get(
            `${Store().getAPI}/np/create_payment_page`,
            {
              headers: {
                'X-AUTH': this.user.token,
              },
              params: {
                np_id: this.user.np_id,
                amount: this.payment_amount,
                currency_from: this.payment_info.currency_from,
                currency_to: this.payment_info.currency_to,
              }
            }
        );
        this.payment_info.pay_address = response.data.pay_address
        this.payment_info.amount_received = response.data.amount_received
        this.generate_qr(this.payment_info.pay_address)
      } catch (error) {
        console.error('Ошибка при выполнении GET запроса:', error);
        this.$router.push('/error');
      }
    },
    async generate_qr(text) {
      try {
        const response = await axios.get(
            `${Store().getAPI}/app/generate_qr`,
            {
              params: {
                text: text
              }, responseType: "blob"
            }
        );
        this.payment_info.qr_code_url = URL.createObjectURL(response.data)
      } catch (error) {
        console.error('Ошибка при выполнении GET запроса:', error);
        this.$router.push('/error');
      }
    },
    text_wrapper(str) {
      let length = str.length;
      let half = Math.floor(length / 2);
      let part1 = str.slice(0, half);
      let part2 = str.slice(half);
      return [part1, part2];
    },
    async copyTextToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        this.copy_img = copy_success;
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    },
    open_dashboard() {
      this.$router.push('/');
    }
  },
  mounted() {
    window.Telegram.WebApp.BackButton.isVisible = true;
    window.Telegram.WebApp.BackButton.onClick(this.open_dashboard.bind(this))
    this.getUserInfo();
  }
}
</script>
