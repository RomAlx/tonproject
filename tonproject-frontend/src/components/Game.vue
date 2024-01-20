<template>
  <!-- PERCENT LOADER START-->
  <div id="mainLoader"><img src="assets/loader.png"/><br/><span>0</span></div>
  <!-- PERCENT LOADER END-->

  <!-- CONTENT START-->
  <div id="mainHolder">

    <!-- BROWSER NOT SUPPORT START-->
    <div id="notSupportHolder">
      <div class="notSupport">Your browser isn't supported.<br/>Please update your browser in order to run the game.
      </div>
    </div>
    <!-- BROWSER NOT SUPPORT END-->

    <!-- CANVAS START-->
    <div id="canvasHolder">
      <canvas id="gameCanvas" width="1280" height="768"></canvas>
    </div>
    <!-- CANVAS END-->

  </div>
  <!-- CONTENT END-->
</template>

<script>
export default {
  name: 'GameCore'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
