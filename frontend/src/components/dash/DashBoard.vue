<template>
  <div v-if="user" class="only_mobile">
    <div class="container">
      <div class="d-flex justify-content-center">
        <div  class="balance_block">
          <div class="row">
            <p class="balance username">{{ this.user.username }}</p>
          </div>
          <div class="row">
            <p class="balance">
              {{ Math.floor(this.user.user_balance) }}
              <span class="balance second lil_size">
                .{{ ((this.user.user_balance).toString().split('.')[1] || '0') }}
              </span>
              <span class="balance second"><img src="@/assets/img/icons/symbols/ton_symbol.svg" alt=""></span>
            </p>
          </div>
          <div class="row">
            <div class="col-4">
              <RouterLink
                  to="/balance/deposit"
                  class="no-links"
              >
                <div class="balance_button">
                  <img src="@/assets/img/icons/balance/deposit.svg" alt="\/">
                  <p>Deposit</p>
                </div>
              </RouterLink>
            </div>
            <div class="col-4">
              <RouterLink
                  to="/balance/withdraw"
                  class="no-links"
              >
                <div class="balance_button">
                  <img src="@/assets/img/icons/balance/withdraw.svg" alt="/\">
                  <p>Withdraw</p>
                </div>
              </RouterLink>
            </div>
            <div class="col-4">
              <RouterLink
                  to="/balance/history"
                  class="no-links"
              >
                <div class="balance_button">
                  <img src="@/assets/img/icons/balance/history.svg" alt="\/">
                  <p>History</p>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="game_block">
          <RouterLink
                  to="/game"
                  class="no-links"
              >
            <div class="game_button">
              <p>PLAY</p>
            </div>
          </RouterLink>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="description_block">
          <img src="@/assets/img/tonproject_logo.svg" alt="logo">
          <h1>TON PROJECT</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse elit diam, commodo eget imperdiet ac,
            pellentesque nec nunc. Donec ex elit, dapibus vitae accumsan in, molestie vel diam. Nulla mi quam, dictum
            vel venenatis et, convallis ut ipsum. Morbi auctor enim at magna mattis, eu condimentum lorem volutpat. Duis
            vestibulum, elit non blandit viverra, ante ex consequat ipsum, a pharetra mi enim id turpis. Ut ut diam
            risus. Mauris porttitor quam id ligula eleifend, non egestas turpis dignissim. Suspendisse rutrum est nulla,
            ut blandit lorem bibendum vitae. Curabitur malesuada ligula ac aliquam vestibulum. Nullam ultricies nisi vel
            elit rutrum, eget dapibus lorem iaculis. Duis et odio arcu.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {Store} from '@/store'

export default {
  name: 'DashBoard',
  data() {
    return {
      user_id: null,
      user: null,
      game_link: null,
    }
  },
  methods: {
    async getUserInfo() {
      console.log(`${Store().getAPI}/app/user`);
      try {
        const response = await axios.get(
            `${Store().getAPI}/app/user`,
            {
              params: {
                tg_id: this.user_id,
                // tg_id: 324354843,
              }
            }
        );
        if (response.data.user_id !== undefined) {
          Store().setUser(response.data)
          this.user = Store().getUser
          this.getUserBalance();
        }
      } catch (error) {
        console.error('Ошибка при выполнении GET запроса:', error);
      }
    },
    async getUserBalance() {
      console.log(`${Store().getAPI}/np/get_balance`);
      try {
        const response = await axios.get(
            `${Store().getAPI}/np/get_balance`,
            {
              params: {
                np_id: this.user.np_id,
              }
            }
        );
        console.log(response.data)
        if (response.data.user_balance !== undefined) {
          this.user.user_balance = response.data.user_balance
          Store().setUser(this.user)
        }
      } catch (error) {
        console.error('Ошибка при выполнении GET запроса:', error);
      }
    },
  },
  mounted() {
    this.user_id = window.Telegram.WebApp.initDataUnsafe.user.id
    window.Telegram.WebApp.BackButton.isVisible = false;
    this.getUserInfo();
  },
  computed: {},
}
</script>
