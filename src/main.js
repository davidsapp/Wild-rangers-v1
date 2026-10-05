// =========================================================
// WILD RANGERS ADVENTURE
// MAIN GAME ENTRY
// =========================================================

import Phaser from "phaser";

import {
  W,
  H
} from "./config.js";

import Home from "./scenes/Home.js";
import Ranger from "./scenes/Ranger.js";
import Park from "./scenes/Park.js";
import Wildlife from "./scenes/Wildlife.js";
import Learning from "./scenes/Learning.js";
import RangerQuiz from "./scenes/RangerQuiz.js";
import Badges from "./scenes/Badges.js";
import ParentLogin from "./scenes/ParentLogin.js";
import ParentDashboard from "./scenes/ParentDashboard.js";
import Premium from "./scenes/Premium.js";
import Missions from "./scenes/Missions.js";
import MissionPlay from "./scenes/MissionPlay.js";
import Complete from "./scenes/Complete.js";

// =========================================================
// GAME CONFIGURATION
// =========================================================

const config = {
  type: Phaser.AUTO,

  width: W,
  height: H,

  parent: "game",

  backgroundColor: "#65c9ed",

  scale: {
    mode: Phaser.Scale.FIT,

    autoCenter:
      Phaser.Scale.CENTER_BOTH
  },

  scene: [
    Home,
    Ranger,
    Park,
    Wildlife,
    Learning,
    RangerQuiz,
    Badges,
    ParentLogin,
    ParentDashboard,
    Premium,
    Missions,
    MissionPlay,
    Complete
  ]
};

// =========================================================
// START GAME
// =========================================================

new Phaser.Game(config);