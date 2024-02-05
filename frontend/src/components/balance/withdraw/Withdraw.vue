<template>
  <div class="only_mobile">
    <div class="container">
      <div class="d-flex justify-content-center">
        <div class="withdraw_block">
          <h1>
            Withdraw Jetton
          </h1>
          <div class="input_wrapper">
            <img src="@/assets/img/icons/symbols/jetton_symbol.svg" alt="Jetton" class="jetton_icon"/>
            <input type="number" class="input_amount" placeholder="10"/>
            <div class="max_amount">Max: 1000 mt</div>
          </div>
          <p>Minimal withdraw is 10 mt</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BalanceDeposit',
  components: {},
  data() {
    return {
      selectedAsset: null
    }
  },
  methods: {},
}
</script>
