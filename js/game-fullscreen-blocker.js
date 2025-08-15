// Game Fullscreen Blocker
document.addEventListener("DOMContentLoaded", function () {
  // Block fullscreen API
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen = function () {
      console.log("Fullscreen blocked for Safari Match game");
      return Promise.reject(new Error("Fullscreen blocked"));
    };
  }

  if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen = function () {
      console.log("Webkit fullscreen blocked for Safari Match game");
      return Promise.reject(new Error("Webkit fullscreen blocked"));
    };
  }

  if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen = function () {
      console.log("Mozilla fullscreen blocked for Safari Match game");
      return Promise.reject(new Error("Mozilla fullscreen blocked"));
    };
  }

  if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen = function () {
      console.log("MS fullscreen blocked for Safari Match game");
      return Promise.reject(new Error("MS fullscreen blocked"));
    };
  }

  // Block iframe fullscreen
  const gameIframe = document.querySelector(".game-container iframe");
  if (gameIframe) {
    gameIframe.addEventListener("load", function () {
      try {
        // Try to access iframe content to block fullscreen
        const iframeDoc =
          gameIframe.contentDocument || gameIframe.contentWindow.document;
        if (iframeDoc) {
          // Block fullscreen in iframe
          if (iframeDoc.documentElement.requestFullscreen) {
            iframeDoc.documentElement.requestFullscreen = function () {
              return Promise.reject(new Error("Fullscreen blocked in iframe"));
            };
          }
        }
      } catch (e) {
        // Cross-origin iframe, can't access content
        console.log(
          "Cross-origin iframe detected, fullscreen blocked at parent level"
        );
      }
    });
  }

  // Block fullscreen change events
  document.addEventListener("fullscreenchange", function (e) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  });

  document.addEventListener("webkitfullscreenchange", function (e) {
    if (document.webkitFullscreenElement) {
      document.webkitExitFullscreen();
    }
  });

  document.addEventListener("mozfullscreenchange", function (e) {
    if (document.mozFullScreenElement) {
      document.mozCancelFullScreen();
    }
  });

  document.addEventListener("MSFullscreenChange", function (e) {
    if (document.msFullscreenElement) {
      document.msExitFullscreen();
    }
  });
});
