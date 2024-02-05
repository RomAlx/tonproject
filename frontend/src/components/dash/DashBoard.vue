<template>
  <div class="only_mobile">
    <div class="container">
      <div class="d-flex justify-content-center">
        <div class="balance_block">
          <div class="row">
            <p class="balance">
              <span class="balance second">$</span>
              0
              <span class="balance second lil_size">.00</span>
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
              <div class="balance_button">
                <img src="@/assets/img/icons/balance/history.svg" alt="\/">
                <p>History</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="game_block">
          <div class="game_button">
            <p>PLAY</p>
          </div>
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
export default {
  name: 'DashBoard',
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
