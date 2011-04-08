tdl.provide('audio');

// To play a sound, simply call audio.play_sound(id), where id is
// one of the keys of the g_sound_files array, e.g. "damage".
var gg;

audio = (function() {
  var g_sound_files = {
    fire: {
      filename: "assets/fire.ogg",
      samples: 8,
    },
    explosion: {
      filename: "assets/explosion.ogg",
      samples: 6,
    },
    launch: {
      filename: "assets/launch.ogg",
      samples: 2,
    },
    gameover: {
      filename: "assets/gameover.ogg",
      samples: 1,
    },
    play: {
      filename: "assets/play.ogg",
      samples: 1,
    },
  };

  var g_sound_bank = {};
  var g_can_play = false;

  function Sound(name, filename, samples) {
    this.waiting_on_load = samples;
    this.samples = samples;
    this.name = name;
    this.play_idx = 0;
    this.audio = {};
    for (var i = 0; i < samples; i++) {
      var audio = new Audio();
      var that = this;
      audio.addEventListener("canplaythrough", function() {
        that.waiting_on_load--;
      }, false);
      audio.src = filename;
      audio.onerror = handleError(filename, audio);
      audio.load();
      this.audio[i] = audio;
    }

    function handleError(filename, audio) {
        return function(e) {
          tdl.log("can't load ", filename);
          if (filename.substr(filename.length - 4) == ".ogg") {
            filename = filename.substr(0, filename.length - 4) + ".mp3";
            tdl.log("trying ", filename);
            audio.src = filename;
            audio.onerror = handleError(filename, audio);
            audio.load();
          } else if (filename.substr(filename.length - 4) == ".mp3") {
            filename = filename.substr(0, filename.length - 4) + ".wav";
            tdl.log("trying ", filename);
            audio.src = filename;
            audio.onerror = handleError(filename, audio);
            audio.load();
          }
        }
    }
  }

  function init() {
    var a = new Audio()
    g_can_play = a.canPlayType("audio/ogg") || a.canPlayType("audio/mp3");
    if (!g_can_play)
      return;

    for (sound in g_sound_files) {
      var data = g_sound_files[sound];
      g_sound_bank[sound] = new Sound(sound, data.filename, data.samples);
    }
  }

  function play_sound(name) {
    if (!g_can_play)
      return;
    if (g_sound_bank[name] === undefined) {
      console.error("audio: '" + name + "' not known.");
      return;
    } else if (g_sound_bank[name].waiting_on_load > 0) {
      console.error("audio: '" + name + "' not loaded.");
      return;
    }
    var sound = g_sound_bank[name];
    sound.play_idx = (sound.play_idx + 1) % sound.samples;
    sound.audio[sound.play_idx].play();
  }

  return {
    init: init,
    play_sound: play_sound,
  };
})();
