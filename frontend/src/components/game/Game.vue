<template>
  <div class="only_mobile">
    <div class="container">
      <div class="d-flex justify-content-center">
        <div v-if="user" class="game_settings_block">
          <div class="row">
            <p class="game_settings header">Balance</p>
          </div>
          <div class="row">
            <p class="game_settings">
              {{ Math.floor(this.user.user_balance) }}
              <span class="game_settings second">
                .{{ ((this.user.user_balance).toFixed(6).toString().split('.')[1] || '0') }}
              </span>
              <span class="game_settings second"><img src="@/assets/img/icons/symbols/ton_symbol.svg" alt=""
                                                      class="game_settings symbol"></span>
            </p>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="row">
                <p class="game_settings header">Bet</p>
              </div>
              <div class="row">
                <div class="col-3 d-flex justify-content-center align-items-center">
                  <img
                      src="@/assets/img/icons/settings/left-arrow.svg"
                      alt=""
                      class="game_settings arrows"
                      @click="decreaseBet"
                  >
                </div>
                <div class="col-6 d-flex justify-content-center align-items-center">
                  <p class="game_settings">{{ this.bet }}</p>
                </div>
                <div class="col-3 d-flex justify-content-center align-items-center">
                  <img
                      src="@/assets/img/icons/settings/right-arrow.svg"
                      alt=""
                      class="game_settings arrows"
                      @click="increaseBet"
                  >
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row">
                <p class="game_settings header">Risk</p>
              </div>
              <div class="row">
                <div class="col-3 d-flex justify-content-center align-items-center">
                  <img
                      src="@/assets/img/icons/settings/left-arrow.svg"
                      alt=""
                      class="game_settings arrows"
                      @click="decreaseRisk"
                  >
                </div>
                <div class="col-6 d-flex justify-content-center align-items-center">
                  <p class="game_settings">{{ this.risklvls[this.risk] }}</p>
                </div>
                <div class="col-3 d-flex justify-content-center align-items-center">
                  <img
                      src="@/assets/img/icons/settings/right-arrow.svg"
                      alt=""
                      class="game_settings arrows"
                      @click="increaseRisk"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="row">
                <p class="game_settings header">Balls</p>
              </div>
              <div class="row">
                <div class="col-3 d-flex justify-content-center align-items-center">
                  <img
                      src="@/assets/img/icons/settings/left-arrow.svg"
                      alt=""
                      class="game_settings arrows"
                      @click="decreaseBalls"
                  >
                </div>
                <div class="col-6 d-flex justify-content-center align-items-center">
                  <p class="game_settings">{{ this.balls }}</p>
                </div>
                <div class="col-3 d-flex justify-content-center align-items-center">
                  <img
                      src="@/assets/img/icons/settings/right-arrow.svg"
                      alt=""
                      class="game_settings arrows"
                      @click="increaseBalls"
                  >
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row">
                <p class="game_settings header">Rows</p>
              </div>
              <div class="row">
                <div class="col-3 d-flex justify-content-center align-items-center">
                  <img
                      src="@/assets/img/icons/settings/left-arrow.svg"
                      alt=""
                      class="game_settings arrows"
                      @click="decreaseRows"
                  >
                </div>
                <div class="col-6 d-flex justify-content-center align-items-center">
                  <p class="game_settings">{{ this.rows[this.rows_id] }}</p>
                </div>
                <div class="col-3 d-flex justify-content-center align-items-center">
                  <img
                      src="@/assets/img/icons/settings/right-arrow.svg"
                      alt=""
                      class="game_settings arrows"
                      @click="increaseRows"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div v-if="this.history.length === 0" class="game_history_block_no_content">
          <p class="game_history">history</p>
        </div>
        <div v-else class="game_history_block">
          <div v-for="item in this.history" :key="item" class="game_history_box">
            <p v-if="item<0" class="lose">{{ -item }}</p>
            <p v-else class="win">{{ item }}</p>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <canvas id="gameCanvas" class="gameCanvas" ref="gameCanvas"></canvas>
      </div>
      <div class="d-flex justify-content-center">
        <div class="game_play_button" @click="getGameResult">
          <p>{{ this.playText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Store} from "@/store";
import {Plinko, PlinkoScene} from "@/components/game/Plinko";
import axios from "axios";

export default {
  name: 'GameCore',
  data() {
    return {
      user: null,
      bet: 5,
      risklvls: ['low', 'mid', 'high'],
      risk: 0,
      balls: 1,
      rows_id: 1,
      rows: [6,8,10],
      game_results: null,
      playText: 'start',
      gameScene: null,
      game: null,
      isPlaying: false,
      history: [],
      game_status: {
        isPlaying: false,
      }
    }
  },
  methods: {
    async getUserInfo() {
      this.user = Store().getUser
      console.log(this.history.length)
    },
    setCanvasSize() {
      this.$refs.gameCanvas.width = window.innerWidth * 0.89;
      this.$refs.gameCanvas.height = this.$refs.gameCanvas.width * 1.1;
    },
    generateGame() {
      this.gameScene = new PlinkoScene(this.$refs.gameCanvas.width, this.$refs.gameCanvas.height, this.rows_id)
      this.game = new Plinko(this.gameScene);
    },
    handlePlayStatusChange(event) {
      this.game_status.balls_status[event.detail.id].isPlaying = event.detail.isPlaying;
      let flag = false;
      for (let ball in this.game_status.balls_status) {
        if (!this.game_status.balls_status[ball].isPlaying) {
          this.history.unshift(this.game_status.balls_status[ball].result);
          this.user.user_balance += this.game_status.balls_status[ball].result
        } else {
          flag = true;
          break;
        }
      }
      this.game_status.isPlaying = flag;
      if (!this.game_status.isPlaying) {
        this.playText = 'start';
      } else {
        this.playText = 'playing...';
      }
    },
    increaseBet() {
      if (this.bet < 100) {
        this.bet = this.bet + 5;
      }
    },
    decreaseBet() {
      if (this.bet > 5) {
        this.bet = this.bet - 5;
      }
    },
    increaseRisk() {
      if (!this.game_status.isPlaying && this.risk < 2) {
        this.risk = this.risk + 1;
        this.gameScene.updateBoxes(this.risk);
      }
    },
    decreaseRisk() {
      if (!this.game_status.isPlaying && this.risk > 0) {
        this.risk = this.risk - 1;
        this.gameScene.updateBoxes(this.risk);
      }
    },
    increaseBalls() {
      if (this.balls < 10) {
        this.balls += 1;
      }
      // if ((this.balls + 1) * this.bet < this.user.user_balance && this.balls < 10) {
      //   this.balls += 1;
      // }
    },
    decreaseBalls() {
      if (this.balls - 1 > 0) {
        this.balls -= 1;
      }
    },
    increaseRows() {
      if (!this.game_status.isPlaying && this.rows_id < 2) {
        this.rows_id += 1;
        this.gameScene.updatePins(this.rows_id);
      }
    },
    decreaseRows() {
      if (!this.game_status.isPlaying && this.rows_id > 0) {
        this.rows_id -= 1;
        this.gameScene.updatePins(this.rows_id);
      }
    },
    async getGameResult() {
      if (!this.game_status.isPlaying) {
        // if(this.bet <= this.user.user_balance){
        try {
          const response = await axios.post(
              `${Store().getAPI}/app/game`,
              {
                bet: this.bet,
                risk: this.risk,
                balls: this.balls,
                rows: this.rows_id
              },
              {
                headers: {
                  'X-AUTH': this.user.token,
                }
              }
          );
          this.game_results = response.data
          await this.createBalls()
          // this.gameScene.createBall(this.risk, response.data['coefficient'])
          // this.result = response.data['result']
        } catch (error) {
          console.error('Ошибка при выполнении GET запроса:', error);
          this.$router.push('/error');
        }
      } else {
        console.log("Not enough money")
      }
      // }
    },
    async createBalls() {
      this.playText = 'playing...';
      this.game_status.isPlaying = true;
      this.game_status.balls = this.game_results['balls'];
      this.game_status.balls_status = [];
      for (let i = 1; i <= this.game_results['balls']; i++) {
        this.gameScene.createBall(this.game_results[String(i)]['id'], this.game_results[String(i)]['coefficient']);
        this.game_status.balls_status[i] = {
          result: this.game_results[String(i)]['result'],
          isPlaying: true
        };
        await this.delay(1000);
      }
    },
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    open_dashboard() {
      this.$router.push('/');
    }
  },
  mounted() {
    window.Telegram.WebApp.BackButton.isVisible = true;
    window.Telegram.WebApp.BackButton.onClick(this.open_dashboard.bind(this))
    this.getUserInfo();
    this.setCanvasSize();
    this.generateGame();
    document.addEventListener('changePlayStatus', this.handlePlayStatusChange);
  },
  beforeUnmount() {
    this.game = null;
    this.gameScene = null;
    document.removeEventListener('changePlayStatus', this.handlePlayStatusChange);
  },
}

</script>

<style scoped>
</style>
