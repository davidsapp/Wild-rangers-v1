import Phaser from "phaser";

const W = 540, H = 960;

let lang = localStorage.getItem("wr_v1_lang") || "en";
let stars = Number(localStorage.getItem("wr_v1_stars")) || 0;
let completed = JSON.parse(localStorage.getItem("wr_v1_completed") || "[]");

const outfitColors = [0x2c9b58, 0xe5a52f, 0x3d83c5, 0xc75c4a];

const L = {
en: {
title:"WILD RANGERS", adventure:"ADVENTURE", tagline:"Explore. Learn. Protect Nature.",
welcome:"Welcome, Little Ranger!", start:"LET'S EXPLORE!", footer:"A wild adventure awaits!",
create:"CREATE YOUR RANGER", choose:"Choose your ranger outfit", go:"LET'S GO!",
back:"BACK", hub:"SAVANNAH PARK", hubWelcome:"Welcome to the park!",
missions:"MISSIONS", animals:"ANIMALS", learn:"LEARNING", badges:"MY BADGES",
outfit:"Choose your outfit!", map:"CHOOSE A MISSION", soon:"Coming soon!",
ok:"OK!", stars:"Stars", m1:"Become a Junior Ranger", m2:"Meet Mimi",
m3:"Count the Zebra Herd", m4:"Find the Lost Lion Cub", m5:"Cross the River",
m6:"Help Tembo Find Water", m7:"Animal Words", m8:"Clean Up the Park",
m9:"Discover Hidden Tracks", m10:"First Ranger Challenge",
training:"Ranger Training", instruction:"Tap each item to get ready!",
hat:"Safari Hat", mapItem:"Park Map", badge:"Ranger Badge",
finish:"MISSION COMPLETE!", reward:"You earned a star!", continue:"CONTINUE",
collected:"Collected", mimiIntro:"Leo: Look! It's Mimi the monkey!",
mimiTask:"Help Mimi find 3 bananas!", bananas:"Bananas", great:"Great job!",
locked:"Complete the previous mission first!", find:"Find the bananas!",
zebraTask:"How many zebras can you see?",
correct:"That's right! Great counting!", wrong:"Try again! Count carefully!",
lionIntro:"Leo: A lion cub is lost! Let's help!",
lionTask:"Find 3 clues to locate the lost cub!", clues:"Clues",
clue1:"Tiny paw prints", clue2:"Golden fur", clue3:"Lion's den",
clueFound:"Clue found!", lionFound:"You found the lost lion cub!",
lionHelp:"The cub is safe! Great ranger work!",
riverIntro:"Leo: Let's cross this river!",
riverTask:"Tap the stones in number order!",
crossing:"Stones crossed", stoneCorrect:"Great step! Keep going!",
stoneWrong:"Oops! Find the next number!",
riverSuccess:"You crossed the river! Amazing!"
},

fr: {
title:"LES RANGERS", adventure:"SAUVAGES",
tagline:"Explore. Apprends. Protège la nature.",
welcome:"Bienvenue, petit Ranger !", start:"PARTONS EXPLORER !",
footer:"Une aventure t'attend !", create:"CRÉE TON RANGER",
choose:"Choisis ta tenue", go:"C'EST PARTI !", back:"RETOUR",
hub:"PARC DE LA SAVANE", hubWelcome:"Bienvenue au parc !",
missions:"MISSIONS", animals:"ANIMAUX", learn:"APPRENDRE",
badges:"MES BADGES", outfit:"Choisis ta tenue !",
map:"CHOISIS UNE MISSION", soon:"Bientôt disponible !",
ok:"OK !", stars:"Étoiles",
m1:"Devenir jeune Ranger", m2:"Rencontre Mimi",
m3:"Compter le troupeau de zèbres", m4:"Retrouver le lionceau perdu",
m5:"Traverser la rivière", m6:"Aider Tembo à trouver de l'eau",
m7:"Les mots des animaux", m8:"Nettoyer le parc",
m9:"Découvrir les traces", m10:"Défi du Ranger",
training:"Entraînement Ranger", instruction:"Touche chaque objet !",
hat:"Chapeau", mapItem:"Carte du parc", badge:"Badge Ranger",
finish:"MISSION TERMINÉE !", reward:"Tu as gagné une étoile !",
continue:"CONTINUER", collected:"Trouvé",
mimiIntro:"Leo : Regarde ! Voici Mimi le singe !",
mimiTask:"Aide Mimi à trouver 3 bananes !",
bananas:"Bananes", great:"Bravo !",
locked:"Termine la mission précédente !",
find:"Trouve les bananes !",
zebraTask:"Combien de zèbres vois-tu ?",
correct:"Bravo ! Tu as bien compté !",
wrong:"Essaie encore ! Compte bien !",
lionIntro:"Leo : Un lionceau est perdu ! Aidons-le !",
lionTask:"Trouve 3 indices pour retrouver le lionceau !",
clues:"Indices", clue1:"Petites empreintes", clue2:"Poils dorés",
clue3:"Tanière du lion", clueFound:"Indice trouvé !",
lionFound:"Tu as retrouvé le lionceau !",
lionHelp:"Le lionceau est en sécurité ! Bravo !",
riverIntro:"Leo : Traversons cette rivière !",
riverTask:"Touche les pierres dans l'ordre !",
crossing:"Pierres traversées", stoneCorrect:"Bravo ! Continue !",
stoneWrong:"Oups ! Trouve le numéro suivant !",
riverSuccess:"Tu as traversé la rivière ! Bravo !"
},

es: {
title:"GUARDIANES", adventure:"SALVAJES",
tagline:"Explora. Aprende. Protege la naturaleza.",
welcome:"¡Bienvenido, pequeño Ranger!", start:"¡VAMOS A EXPLORAR!",
footer:"¡Una aventura te espera!", create:"CREA TU RANGER",
choose:"Elige tu uniforme", go:"¡VAMOS!", back:"VOLVER",
hub:"PARQUE DE LA SABANA", hubWelcome:"¡Bienvenido al parque!",
missions:"MISIONES", animals:"ANIMALES", learn:"APRENDER",
badges:"MIS MEDALLAS", outfit:"¡Elige tu uniforme!",
map:"ELIGE UNA MISIÓN", soon:"¡Muy pronto!", ok:"¡OK!",
stars:"Estrellas", m1:"Ser un Ranger Junior", m2:"Conoce a Mimi",
m3:"Cuenta la manada de cebras", m4:"Encuentra al cachorro de león",
m5:"Cruza el río", m6:"Ayuda a Tembo a encontrar agua",
m7:"Palabras de animales", m8:"Limpia el parque",
m9:"Descubre huellas ocultas", m10:"Desafío Ranger",
training:"Entrenamiento Ranger", instruction:"¡Toca cada objeto!",
hat:"Sombrero", mapItem:"Mapa del parque",
badge:"Insignia Ranger", finish:"¡MISIÓN COMPLETADA!",
reward:"¡Ganaste una estrella!", continue:"CONTINUAR",
collected:"Conseguido", mimiIntro:"Leo: ¡Mira! ¡Es Mimi, la monita!",
mimiTask:"¡Ayuda a Mimi a encontrar 3 bananas!",
bananas:"Bananas", great:"¡Muy bien!",
locked:"¡Completa la misión anterior primero!",
find:"¡Encuentra las bananas!",
zebraTask:"¿Cuántas cebras puedes ver?",
correct:"¡Correcto! ¡Muy bien contado!",
wrong:"¡Inténtalo otra vez! ¡Cuenta bien!",
lionIntro:"Leo: ¡Un cachorro de león está perdido! ¡Ayudémoslo!",
lionTask:"¡Encuentra 3 pistas para localizarlo!",
clues:"Pistas", clue1:"Pequeñas huellas", clue2:"Pelo dorado",
clue3:"La guarida del león", clueFound:"¡Pista encontrada!",
lionFound:"¡Encontraste al cachorro perdido!",
lionHelp:"¡El cachorro está a salvo! ¡Buen trabajo!",
riverIntro:"Leo: ¡Crucemos este río!",
riverTask:"¡Toca las piedras en orden!",
crossing:"Piedras cruzadas", stoneCorrect:"¡Muy bien! ¡Sigue!",
stoneWrong:"¡Ups! ¡Busca el siguiente número!",
riverSuccess:"¡Cruzaste el río! ¡Increíble!"
}
};

const t = k => L[lang]?.[k] || L.en[k] || k;

function txt(s, x, y, str, size = 23, color = "#fff") {
  return s.add.text(x, y, str, {
    fontFamily: "Trebuchet MS, Arial",
    fontSize: size + "px",
    fontStyle: "bold",
    color,
    align: "center",
    wordWrap: { width: 460 },
    stroke: "#49331f",
    strokeThickness: 2
  }).setOrigin(.5);
}

function btn(s, x, y, w, h, label, color, fn, size = 22) {
  const g = s.add.graphics();
  g.fillStyle(0x49321f, .3);
  g.fillRoundedRect(x-w/2+3, y-h/2+6, w, h, 20);
  g.fillStyle(0xffffff, 1);
  g.fillRoundedRect(x-w/2, y-h/2, w, h, 20);
  g.fillStyle(color, 1);
  g.fillRoundedRect(x-w/2+5, y-h/2+5, w-10, h-12, 16);
  txt(s, x, y-2, label, size);
  s.add.rectangle(x, y, w, h, 0xffffff, 0)
    .setInteractive({ useHandCursor: true })
    .on("pointerdown", fn);
}

function cloud(s, x, y, sc = 1) {
  const g = s.add.graphics();
  g.fillStyle(0xffffff, .9);
  g.fillCircle(x, y, 22*sc);
  g.fillCircle(x+25*sc, y-10*sc, 28*sc);
  g.fillCircle(x+52*sc, y, 22*sc);
  g.fillRoundedRect(x-3*sc, y, 60*sc, 18*sc, 10);
}

function tree(s, x, y, sc = 1) {
  const g = s.add.graphics();
  g.fillStyle(0x85502d, 1);
  g.fillRoundedRect(x-8*sc, y, 16*sc, 65*sc, 5);
  g.fillStyle(0x3e8b45, 1);
  g.fillEllipse(x, y-12*sc, 115*sc, 35*sc);
  g.fillStyle(0x58a94e, 1);
  g.fillEllipse(x-20*sc, y-23*sc, 55*sc, 25*sc);
}

function savannah(s) {
  const g = s.add.graphics();
  g.fillGradientStyle(0x65c9ed,0x65c9ed,0xb2e9f6,0xb2e9f6,1);
  g.fillRect(0,0,W,H);
  g.fillStyle(0xffe36b,1);
  g.fillCircle(440,140,48);
  cloud(s,65,145,.8);
  cloud(s,290,95,.6);
  g.fillStyle(0xa7d56c,1);
  g.fillEllipse(100,510,450,230);
  g.fillEllipse(450,500,480,260);
  g.fillStyle(0x82bd4d,1);
  g.fillRect(0,540,W,420);
  g.fillStyle(0x6eae42,1);
  g.fillEllipse(70,700,520,280);
  g.fillEllipse(480,740,480,300);
  g.fillStyle(0x9bd45a,1);
  g.fillEllipse(260,850,650,250);
  tree(s,55,490,.7);
  tree(s,485,510,.7);
}

function leo(s, x, y, sc = 1, outfit = 0x2c9b58) {
  const c = s.add.container(x,y).setScale(sc);
  const g = s.add.graphics();

  g.fillStyle(0x6b442b,1);
  g.fillRoundedRect(-34,75,23,62,9);
  g.fillRoundedRect(11,75,23,62,9);
  g.fillStyle(0x49301e,1);
  g.fillRoundedRect(-42,122,36,20,8);
  g.fillRoundedRect(7,122,36,20,8);
  g.fillStyle(outfit,1);
  g.fillRoundedRect(-47,-5,94,100,25);
  g.fillStyle(0x684126,1);
  g.fillRoundedRect(-45,62,90,11,4);
  g.fillStyle(0xffd45e,1);
  g.fillRoundedRect(-8,61,16,13,3);
  g.fillStyle(0xb96e3d,1);
  g.fillRoundedRect(-16,-28,32,32,8);
  g.fillStyle(0x8e542f,1);
  g.fillCircle(-42,-65,18);
  g.fillCircle(42,-65,18);
  g.fillStyle(0xf2b27b,1);
  g.fillCircle(-42,-65,10);
  g.fillCircle(42,-65,10);
  g.fillStyle(0xc9824a,1);
  g.fillCircle(0,-62,57);
  g.fillStyle(0xf4c18d,1);
  g.fillEllipse(0,-38,64,40);
  g.fillStyle(0xffffff,1);
  g.fillEllipse(-21,-68,20,27);
  g.fillEllipse(21,-68,20,27);
  g.fillStyle(0x382619,1);
  g.fillCircle(-20,-65,7);
  g.fillCircle(20,-65,7);
  g.fillStyle(0x4b2c24,1);
  g.fillEllipse(0,-44,16,10);
  g.lineStyle(3,0x6a3927,1);
  g.beginPath();
  g.arc(0,-35,15,.2,Math.PI-.2);
  g.strokePath();
  g.fillStyle(0x9c682e,1);
  g.fillEllipse(0,-108,125,23);
  g.fillStyle(0xe8b653,1);
  g.fillRoundedRect(-42,-147,84,42,14);
  g.fillStyle(0x3c8d48,1);
  g.fillRect(-40,-119,80,8);

  c.add(g);
  s.tweens.add({targets:c,y:y-6,duration:1200,yoyo:true,repeat:-1});
  return c;
}

function mimi(s, x, y, sc = 1) {
  const c = s.add.container(x,y).setScale(sc);
  const g = s.add.graphics();

  g.lineStyle(12,0x8b552f,1);
  g.beginPath();
  g.arc(48,40,35,0,Math.PI*1.8,false);
  g.strokePath();
  g.fillStyle(0x9b6036,1);
  g.fillEllipse(0,35,78,95);
  g.fillEllipse(-42,25,25,55);
  g.fillEllipse(42,25,25,55);
  g.fillStyle(0x704329,1);
  g.fillEllipse(-22,78,34,18);
  g.fillEllipse(22,78,34,18);
  g.fillStyle(0x8b552f,1);
  g.fillCircle(-38,-35,23);
  g.fillCircle(38,-35,23);
  g.fillStyle(0xf3a58b,1);
  g.fillCircle(-38,-35,12);
  g.fillCircle(38,-35,12);
  g.fillStyle(0x9b6036,1);
  g.fillCircle(0,-27,48);
  g.fillStyle(0xf5c69a,1);
  g.fillEllipse(0,-14,58,43);
  g.fillStyle(0xffffff,1);
  g.fillCircle(-17,-34,10);
  g.fillCircle(17,-34,10);
  g.fillStyle(0x34251c,1);
  g.fillCircle(-16,-33,4);
  g.fillCircle(18,-33,4);
  g.fillStyle(0x553522,1);
  g.fillEllipse(0,-17,12,8);
  g.lineStyle(3,0x6b3e2a,1);
  g.beginPath();
  g.arc(0,-7,12,.2,Math.PI-.2);
  g.strokePath();

  c.add(g);
  s.tweens.add({
    targets:c,y:y-10,duration:650,yoyo:true,
    repeat:-1,ease:"Sine.easeInOut"
  });
  return c;
}

class Home extends Phaser.Scene {
  constructor(){super("Home");}
  create(){
    savannah(this);
    txt(this,270,70,t("title"),37,"#fff6c7");
    txt(this,270,115,t("adventure"),29,"#ffdf65");
    txt(this,270,195,t("tagline"),18);
    leo(this,270,440,1.25);
    txt(this,270,625,t("welcome"),24,"#fff6c7");
    btn(this,270,755,420,78,t("start"),0x35a85b,
      ()=>this.scene.start("Ranger"),24);
    txt(this,270,825,t("footer"),18);

    ["en","fr","es"].forEach((l,i)=>{
      btn(this,170+i*100,900,82,48,l.toUpperCase(),
        lang===l?0xe5a52f:0x3d83c5,()=>{
          lang=l;
          localStorage.setItem("wr_v1_lang",l);
          this.scene.restart();
        },17);
    });
  }
}

class Ranger extends Phaser.Scene {
  constructor(){super("Ranger");}
  create(){
    savannah(this);
    txt(this,270,75,t("create"),30);
    txt(this,270,125,t("choose"),21);

    let chosen=Number(localStorage.getItem("wr_v1_outfit"))||0;
    leo(this,270,430,1.35,outfitColors[chosen]);

    outfitColors.forEach((col,i)=>{
      const x=90+i*120,g=this.add.graphics();
      g.fillStyle(0xffffff,1);
      g.fillRoundedRect(x-39,635,78,78,16);
      g.fillStyle(col,1);
      g.fillRoundedRect(x-32,642,64,64,13);

      if(i===chosen){
        g.lineStyle(5,0xffe05d,1);
        g.strokeRoundedRect(x-39,635,78,78,16);
      }

      this.add.rectangle(x,674,85,90,0xffffff,0)
        .setInteractive()
        .on("pointerdown",()=>{
          chosen=i;
          localStorage.setItem("wr_v1_outfit",i);
          this.scene.restart();
        });
    });

    txt(this,270,755,t("outfit"),21);
    btn(this,270,835,370,72,t("go"),0x35a85b,
      ()=>this.scene.start("Park"),25);
    btn(this,100,920,150,52,t("back"),0x3d83c5,
      ()=>this.scene.start("Home"),19);
  }
}

class Park extends Phaser.Scene {
  constructor(){super("Park");}
  create(){
    savannah(this);
    txt(this,270,75,t("hub"),31);
    txt(this,270,120,t("hubWelcome"),20);
    leo(this,270,330,.8,
      outfitColors[Number(localStorage.getItem("wr_v1_outfit"))||0]);
    txt(this,270,475,`⭐ ${t("stars")}: ${stars}`,23);

    btn(this,155,590,240,90,"🌟 "+t("missions"),0x35a85b,
      ()=>this.scene.start("Missions"),21);
    btn(this,405,590,220,90,"🦓 "+t("animals"),0xe5a52f,
      ()=>this.notice(),20);
    btn(this,155,715,240,90,"📚 "+t("learn"),0x3d83c5,
      ()=>this.notice(),21);
    btn(this,405,715,220,90,"🏅 "+t("badges"),0xb86ac9,
      ()=>this.notice(),19);
    btn(this,270,865,240,60,t("back"),0x3d83c5,
      ()=>this.scene.start("Home"),20);
  }

  notice(){
    const g=this.add.graphics();
    g.fillStyle(0x315b35,.97);
    g.fillRoundedRect(45,390,450,150,22);
    const m=txt(this,270,440,t("soon"),23);
    btn(this,270,500,130,48,t("ok"),0x35a85b,()=>{
      g.destroy();m.destroy();
    },19);
  }
}

class Missions extends Phaser.Scene {
  constructor(){super("Missions");}
  create(){
    savannah(this);
    txt(this,270,50,t("map"),28);
    txt(this,270,95,`⭐ ${stars} ${t("stars")}`,20);

    const names=[
      t("m1"),t("m2"),t("m3"),t("m4"),t("m5"),
      t("m6"),t("m7"),t("m8"),t("m9"),t("m10")
    ];

    names.forEach((name,i)=>{
      const x=145+(i%2)*250;
      const y=190+Math.floor(i/2)*125;

      // Mission 1 is open initially.
      // Each next mission unlocks after the previous is completed.
      const unlocked = i===0 || completed.includes(i-1);
      const done=completed.includes(i);

      btn(this,x,y,220,96,
        `${done?"✅":unlocked?"🌟":"🔒"} ${i+1}. ${name}`,
        done?0x65a84b:unlocked?0xe5a52f:0x78909c,
        ()=>{
          if(!unlocked){
            this.popup(t("locked"));
            return;
          }

          if(i===0)this.scene.start("MissionOne");
          else if(i===1)this.scene.start("MissionTwo");
          else if(i===2)this.scene.start("MissionThree");
          else if(i===3)this.scene.start("MissionFour");
          else if(i===4)this.scene.start("MissionFive");
          else this.popup(t("soon"));
        },15
      );
    });

    btn(this,270,875,230,58,t("back"),0x3d83c5,
      ()=>this.scene.start("Park"),20);
  }

  popup(message){
    const g=this.add.graphics();
    g.fillStyle(0x315b35,.97);
    g.fillRoundedRect(45,390,450,155,22);
    const m=txt(this,270,440,message,22);
    btn(this,270,500,130,48,t("ok"),0x35a85b,()=>{
      g.destroy();m.destroy();
    },19);
  }
}

class MissionOne extends Phaser.Scene {
  constructor(){super("MissionOne");}
  create(){
    savannah(this);
    txt(this,270,55,t("training"),29);
    txt(this,270,105,t("instruction"),20);
    leo(this,270,265,.8);

    const items=[
      ["🧢",t("hat")],
      ["🗺️",t("mapItem")],
      ["🏅",t("badge")]
    ];

    let found=[];
    const status=txt(this,270,390,`${t("collected")}: 0 / 3`,22);

    items.forEach((item,i)=>{
      const x=100+i*170,y=535,g=this.add.graphics();
      g.fillStyle(0xffffff,1);
      g.fillRoundedRect(x-65,y-65,130,130,20);
      txt(this,x,y-15,item[0],42);
      txt(this,x,y+43,item[1],15,"#315b35");

      this.add.rectangle(x,y,130,130,0xffffff,0)
        .setInteractive()
        .on("pointerdown",()=>{
          if(found.includes(i))return;
          found.push(i);
          g.clear();
          g.fillStyle(0x65a84b,1);
          g.fillRoundedRect(x-65,y-65,130,130,20);
          txt(this,x,y,"✅",45);
          status.setText(`${t("collected")}: ${found.length} / 3`);

          if(found.length===3){
            this.time.delayedCall(400,()=>{
              this.scene.start("Complete",{mission:0});
            });
          }
        });
    });

    btn(this,270,820,220,60,t("back"),0x3d83c5,
      ()=>this.scene.start("Missions"),20);
  }
}

class MissionTwo extends Phaser.Scene {
  constructor(){super("MissionTwo");}
  create(){
    savannah(this);
    txt(this,270,45,t("m2"),30);
    leo(this,155,240,.65);
    mimi(this,365,245,.85);

    const bubble=this.add.graphics();
    bubble.fillStyle(0xffffff,1);
    bubble.fillRoundedRect(25,355,490,95,22);
    txt(this,270,402,t("mimiIntro"),19,"#315b35");
    txt(this,270,485,t("mimiTask"),22,"#fff6c7");

    const spots=[
      {x:105,y:620},
      {x:270,y:690},
      {x:435,y:610}
    ];

    let found=0;
    const status=txt(this,270,780,`${t("bananas")}: 0 / 3`,23,"#fff6c7");

    spots.forEach(p=>{
      const g=this.add.graphics();
      g.fillStyle(0xffffff,1);
      g.fillRoundedRect(p.x-48,p.y-48,96,96,18);
      txt(this,p.x,p.y,"🍌",42);

      this.add.rectangle(p.x,p.y,96,96,0xffffff,0)
        .setInteractive()
        .on("pointerdown",()=>{
          if(g.getData("found"))return;
          g.setData("found",true);
          g.clear();
          g.fillStyle(0x65a84b,1);
          g.fillRoundedRect(p.x-48,p.y-48,96,96,18);
          txt(this,p.x,p.y,"✅",38);
          found++;
          status.setText(`${t("bananas")}: ${found} / 3`);

          if(found===3){
            this.time.delayedCall(500,()=>{
              this.scene.start("Complete",{mission:1});
            });
          }
        });
    });

    btn(this,270,875,220,58,t("back"),0x3d83c5,
      ()=>this.scene.start("Missions"),20);
  }
}

class MissionThree extends Phaser.Scene {
  constructor(){super("MissionThree");}
  create(){
    savannah(this);
    txt(this,270,50,t("m3"),28);
    leo(this,115,205,.55);
    txt(this,300,150,t("zebraTask"),23,"#fff6c7");

    const zebra=(x,y,sc=1)=>{
      const c=this.add.container(x,y).setScale(sc);
      const g=this.add.graphics();

      g.fillStyle(0xffffff,1);
      g.fillRoundedRect(-28,20,13,35,5);
      g.fillRoundedRect(15,20,13,35,5);
      g.fillStyle(0x302c2a,1);
      g.fillRoundedRect(-29,48,15,8,3);
      g.fillRoundedRect(14,48,15,8,3);
      g.fillStyle(0xffffff,1);
      g.fillEllipse(0,0,76,48);
      g.lineStyle(6,0x292929,1);
      g.lineBetween(-20,-20,-10,20);
      g.lineBetween(0,-22,8,22);
      g.lineBetween(20,-18,25,15);
      g.fillStyle(0xffffff,1);
      g.fillRoundedRect(20,-30,20,40,7);
      g.fillEllipse(35,-32,35,27);
      g.fillStyle(0x292929,1);
      g.fillRoundedRect(18,-49,8,24,3);
      g.fillStyle(0xffffff,1);
      g.fillTriangle(25,-42,28,-58,34,-42);
      g.fillStyle(0x292929,1);
      g.fillCircle(43,-34,3);
      g.fillStyle(0xf0c9b5,1);
      g.fillEllipse(49,-25,17,10);

      c.add(g);
      return c;
    };

    const herd=[
      {x:95,y:365},{x:225,y:350},{x:365,y:365},
      {x:155,y:485},{x:310,y:490}
    ];

    herd.forEach((p,i)=>{
      const z=zebra(p.x,p.y,.9);
      this.tweens.add({
        targets:z,y:p.y-5,duration:700+i*100,
        yoyo:true,repeat:-1,ease:"Sine.easeInOut"
      });
    });

    const answers=[3,4,5,6];
    Phaser.Utils.Array.Shuffle(answers);
    let answered=false;

    answers.forEach((answer,i)=>{
      const x=105+(i%2)*330;
      const y=625+Math.floor(i/2)*95;

      btn(this,x,y,190,72,String(answer),0xe5a52f,()=>{
        if(answered)return;

        if(answer===herd.length){
          answered=true;
          txt(this,270,825,t("correct"),21,"#fff6c7");
          this.time.delayedCall(1000,()=>{
            this.scene.start("Complete",{mission:2});
          });
        }else{
          txt(this,270,825,t("wrong"),19,"#fff6c7");
        }
      },28);
    });

    btn(this,270,920,220,52,t("back"),0x3d83c5,
      ()=>this.scene.start("Missions"),19);
  }
}

// MISSION 4 — FIND THE LOST LION CUB
class MissionFour extends Phaser.Scene {
  constructor(){super("MissionFour");}

  create(){
    savannah(this);
    txt(this,270,48,t("m4"),27);
    leo(this,100,205,.52);

    const bubble=this.add.graphics();
    bubble.fillStyle(0xffffff,1);
    bubble.fillRoundedRect(25,300,490,85,20);
    txt(this,270,337,t("lionIntro"),20,"#315b35");
    txt(this,270,420,t("lionTask"),21,"#fff6c7");

    const clues=[
      {x:110,y:535,emoji:"🐾",name:t("clue1")},
      {x:430,y:535,emoji:"🟡",name:t("clue2")},
      {x:270,y:680,emoji:"🌳",name:t("clue3")}
    ];

    let found=0;
    const status=txt(this,270,765,`${t("clues")}: 0 / 3`,23,"#fff6c7");

    clues.forEach(clue=>{
      const g=this.add.graphics();
      g.fillStyle(0xffffff,1);
      g.fillRoundedRect(clue.x-65,clue.y-65,130,130,20);
      txt(this,clue.x,clue.y-15,clue.emoji,40);
      txt(this,clue.x,clue.y+43,clue.name,14,"#315b35");

      const hit=this.add.rectangle(
        clue.x,clue.y,130,130,0xffffff,0
      ).setInteractive({useHandCursor:true});

      hit.on("pointerdown",()=>{
        if(g.getData("found"))return;

        g.setData("found",true);
        g.clear();
        g.fillStyle(0x65a84b,1);
        g.fillRoundedRect(clue.x-65,clue.y-65,130,130,20);
        txt(this,clue.x,clue.y,"✅",42);

        found++;
        status.setText(`${t("clues")}: ${found} / 3`);

        if(found<3){
          txt(this,270,825,t("clueFound"),20,"#fff6c7");
        }else{
          this.showLionCub();
        }
      });
    });

    btn(this,270,920,220,52,t("back"),0x3d83c5,
      ()=>this.scene.start("Missions"),19);
  }

  showLionCub(){
    const overlay=this.add.graphics();
    overlay.fillStyle(0x315b35,.96);
    overlay.fillRoundedRect(25,250,490,430,25);

    txt(this,270,305,"🦁",100);
    txt(this,270,425,t("lionFound"),25,"#fff6c7");
    txt(this,270,490,t("lionHelp"),21,"#ffffff");

    btn(this,270,590,300,65,t("continue"),0x35a85b,
      ()=>this.scene.start("Complete",{mission:3}),22);
  }
}

// MISSION 5 — CROSS THE RIVER
class MissionFive extends Phaser.Scene {
  constructor(){super("MissionFive");}

  create(){
    savannah(this);

    txt(this,270,48,t("m5"),29);
    leo(this,100,205,.52);

    // River
    const river=this.add.graphics();
    river.fillStyle(0x238fce,1);
    river.fillRoundedRect(0,390,W,405,25);
    river.fillStyle(0x55c5ec,1);
    river.fillEllipse(100,460,180,24);
    river.fillEllipse(370,610,220,24);
    river.fillEllipse(250,755,190,20);

    txt(this,270,300,t("riverIntro"),20,"#fff6c7");
    txt(this,270,350,t("riverTask"),21,"#fff6c7");

    // Tap stones in the order 1 → 2 → 3 → 4.
    const stones=[
      {x:90,y:445,n:1},
      {x:350,y:535,n:2},
      {x:180,y:640,n:3},
      {x:420,y:735,n:4}
    ];

    let step=0;
    let finished=false;

    const status=txt(
      this,270,815,`${t("crossing")}: 0 / 4`,21,"#fff6c7"
    );

    const feedback=txt(this,270,865,"",18,"#fff6c7");

    stones.forEach((stone,i)=>{
      const sg=this.add.graphics();

      // Stone base
      sg.fillStyle(0x87999d,1);
      sg.fillEllipse(stone.x,stone.y,112,72);
      sg.fillStyle(0xc2d0d0,1);
      sg.fillEllipse(stone.x-5,stone.y-6,84,46);

      txt(this,stone.x,stone.y,String(stone.n),27,"#315b35");

      const hit=this.add.rectangle(
        stone.x,stone.y,120,85,0xffffff,0
      ).setInteractive({useHandCursor:true});

      hit.on("pointerdown",()=>{
        if(finished || i<step)return;

        if(i===step){
          step++;

          // Turn the correctly tapped stone green.
          sg.clear();
          sg.fillStyle(0x65a84b,1);
          sg.fillEllipse(stone.x,stone.y,112,72);

          txt(this,stone.x,stone.y,"✓",32,"#ffffff");

          status.setText(`${t("crossing")}: ${step} / 4`);
          feedback.setText(t("stoneCorrect"));

          // Complete mission after all four stones.
          if(step===stones.length){
            finished=true;
            feedback.setText(t("riverSuccess"));

            this.time.delayedCall(1100,()=>{
              this.scene.start("Complete",{mission:4});
            });
          }
        }else{
          feedback.setText(t("stoneWrong"));
        }
      });
    });

    btn(this,270,930,220,50,t("back"),0x3d83c5,
      ()=>this.scene.start("Missions"),19);
  }
}

class Complete extends Phaser.Scene {
  constructor(){super("Complete");}

  init(data){
    this.mission=data.mission ?? 0;
  }

  create(){
    savannah(this);

    // Award a star only on the first completion of a mission.
    const already=completed.includes(this.mission);

    if(!already){
      completed.push(this.mission);
      stars++;

      localStorage.setItem(
        "wr_v1_completed",JSON.stringify(completed)
      );
      localStorage.setItem("wr_v1_stars",String(stars));
    }

    txt(this,270,170,t("finish"),30,"#fff6c7");
    txt(this,270,285,"🏆",100);

    const missionNames=[
      t("m1"),t("m2"),t("m3"),t("m4"),t("m5")
    ];

    txt(this,270,405,missionNames[this.mission]||t("m1"),25);
    txt(this,270,480,t("reward"),23);
    txt(this,270,540,`⭐ ${t("stars")}: ${stars}`,23);

    if(this.mission===1){
      mimi(this,270,640,.65);
    }else{
      leo(this,270,640,.65);
    }

    btn(this,270,775,340,70,t("continue"),0x35a85b,
      ()=>this.scene.start("Missions"),23);

    btn(this,270,865,250,58,t("hub"),0x3d83c5,
      ()=>this.scene.start("Park"),20);
  }
}

new Phaser.Game({
  type:Phaser.AUTO,
  width:W,
  height:H,
  parent:"game",
  backgroundColor:"#65c9ed",
  scale:{
    mode:Phaser.Scale.FIT,
    autoCenter:Phaser.Scale.CENTER_BOTH
  },
  scene:[
    Home,
    Ranger,
    Park,
    Missions,
    MissionOne,
    MissionTwo,
    MissionThree,
    MissionFour,
    MissionFive,
    Complete
  ]
});