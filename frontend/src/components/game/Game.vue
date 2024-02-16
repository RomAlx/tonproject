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
// import {WebAudioPlugin} from "createjs-module"
//
// import {checkBrowser, resizeLoaderFunc} from "@/components/game/GameCore/gameCore"


export default {
  name: 'GameCore',
  data() {
    return {
      scripts: [
        "js/vendor/jquery.min.js",
        "js/vendor/detectmobilebrowser.js",
        "js/vendor/createjs.min.js",
        "js/vendor/TweenMax.min.js",
        "js/vendor/p2.min.js",
        "js/plugins.js",
        "js/sound.js",
        "js/canvas.js",
        "js/p2.js",
        "js/game.js",
        "js/mobile.js",
        "js/main.js",
        "js/loader.js",
        "js/init.js",
      ],
      loadedScripts: [] // Для хранения загруженных тэгов скриптов
    }
  },
  methods: {
    loadScripts() {
      this.scripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false; // Для последовательной загрузки

        document.body.appendChild(script);
        this.loadedScripts.push(script); // Добавляем скрипт в массив для последующего удаления
      });
    },
    removeScripts() {
      // Удаление всех скриптов, которые были добавлены
      this.loadedScripts.forEach(script => {
        document.body.removeChild(script);
      });
      // Очистка массива
      this.loadedScripts = [];
    }
  },
  mounted() {
    this.loadScripts(); // Загрузка скриптов при монтировании компонента
  },
  beforeUnmount() {
    this.removeScripts(); // Удаление скриптов перед размонтированием компонента
  }
}
  // methods: {
  //   resumeAudioContext() {
  //     try {
  //       // Предполагается, что 'createjs' доступен в вашем приложении
  //       if (WebAudioPlugin.context.state === 'suspended') {
  //         WebAudioPlugin.context.resume();
  //         window.removeEventListener('click', this.resumeAudioContext);
  //       }
  //     } catch (e) {
  //       console.error('There was an error while trying to resume the SoundJS Web Audio context...');
  //       console.error(e);
  //     }
  //   }
  // },
  // mounted() {
  //   checkBrowser();
  //
  //   if (window.location.protocol === 'file') {
  //     alert("To install the game just upload folder 'game' to your server. The game won't run locally with some browser like Chrome due to some security mode.");
  //   }
  //
  //   window.addEventListener('click', this.resumeAudioContext);
  //   window.addEventListener('resize',() => resizeLoaderFunc);
  //   resizeLoaderFunc(); // вызываем сразу, чтобы применить необходимые изменения при монтировании
  // },
  //
  // beforeUnmount() {
  //   // Удаление обработчиков событий при уничтожении компонента
  //   window.removeEventListener('click', this.resumeAudioContext);
  //   window.removeEventListener('resize', resizeLoaderFunc);
//   }
// };
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
