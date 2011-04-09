tdl.provide('audio');

// To play a sound, simply call audio.play_sound(id), where id is
// one of the keys of the g_sound_files array, e.g. "damage".
audio = (function() {
  var g_context;
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

  var g_audioMgr;
  var g_sound_bank = {};
  var g_can_play = false;

  function WebAudioSound(name, filename, samples) {
    this.name = name;
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    req.onload = function() {
      this.buffer = g_context.createBuffer(req.response, true);
    }
  }

  WebAudioSound.prototype.play = function() {
    if (!this.buffer) {
      tdl.log(this.name, " not loaded");
      return;
    }
    var src = context.createBufferSource();
    src.buffer = this.buffer;
    src.connect(g_context.destination);
    src.noteOn(0);
  };

  function AudioTagSound(name, filename, samples) {
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
      //audio.onerror = handleError(filename, audio);
      audio.load();
      this.audio[i] = audio;
    }
  };

  AudioTagSound.prototype.play = function() {
    if (this.waiting_on_load > 0) {
      tdl.log(this.name, " not loaded");
      return;
    }
    this.play_idx = (this.play_idx + 1) % this.samples;
    var a = this.audio[this.play_idx];
    // tdl.log(this.name, ":", this.play_idx, ":", a.src);
    var b = new Audio();
    b.src = a.src;
    b.addEventListener("canplaythrough", function() {
      b.play();
      }, false);
    b.load();
  };

    function handleError(filename, audio) {
        return function(e) {
          tdl.log("can't load ", filename);
          /*
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
          */
        }
    }

  function init() {
    var a = new Audio()
    g_can_play = a.canPlayType("audio/ogg") || a.canPlayType("audio/mp3");
    if (!g_can_play)
      return;

    var create;
    if (window.webkitAudioContext) {
      g_context = new webkitAudioContext();
      create = WebAudioSound;
    } else {
      create = AudioTagSound;
    }

    for (sound in g_sound_files) {
      var data = g_sound_files[sound];
      g_sound_bank[sound] = new create(sound, data.filename, data.samples);
    }
  }

  function play_sound(name) {
    if (!g_can_play)
      return;
    var sound = g_sound_bank[name];
    if (!sound) {
      console.error("audio: '" + name + "' not known.");
      return;
    }
    sound.play();
  }

  return {
    init: init,
    play_sound: play_sound,
  };
})();
