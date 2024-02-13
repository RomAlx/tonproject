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
// import canvas from "@/assets/js/canvas"
// import game from "@/assets/js/game"
// import init from "@/assets/js/init"
// import loader from "@/assets/js/loader"
// import main from "@/assets/js/main"
// import mobile from "@/assets/js/mobile"
// import p2 from "@/assets/js/p2"
// import plugins from "@/assets/js/plugins"
// import sound from "@/assets/js/sound"

export default {
  name: 'GameCore',
  methods: {
    // loadScript(source, callback) {
    //   let script = document.createElement('script');
    //   script.type = 'text/javascript';
    //   script.src = source;
    //   script.defer = true;
    //
    //   script.onload = () => {
    //     console.log(`Скрипт ${source} успешно загружен`);
    //     if (callback) callback();
    //   };
    //
    //   script.onerror = () => {
    //     console.error(`Ошибка при загрузке скрипта ${source}`);
    //   };
    //
    //   document.body.appendChild(script);
    // }
  },
  mounted() {
    const JSSources = [
      canvas,
      game,
      init,
      loader,
      main,
      mobile,
      p2,
      plugins,
      sound
    ]
    JSSources.forEach(source => {
      // Загружаем скрипты, когда компонент монтируется
      this.loadScript(source, () => {
        console.log('Скрипт подключен и готов к использованию');
        // Здесь код, который выполнится после загрузки скрипта
      });
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
