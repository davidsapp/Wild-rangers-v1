import Phaser from "phaser";

const W = 540, H = 960;
let lang = localStorage.getItem("wr_v1_lang") || "en";
let stars = Number(localStorage.getItem("wr_v1_stars")) || 0;
let completed = JSON.parse(localStorage.getItem("wr_v1_completed") || "[]");

const words = {
  en: {
    title:"WILD RANGERS", adventure:"ADVENTURE",
    tagline:"Explore. Learn. Protect Nature.",
    welcome:"Welcome, Little Ranger!", start:"LET'S EXPLORE!",
    footer:"A wild adventure awaits!", create:"CREATE YOUR RANGER",
    choose:"Choose your ranger outfit", go:"LET'S GO!",
    back:"BACK", hub:"SAVANNAH PARK", hubWelcome:"Welcome to the park!",
    missions:"MISSIONS", animals:"ANIMALS", learn:"LEARNING",
    badges:"MY BADGES", outfit:"Choose your outfit!",
    map:"CHOOSE A MISSION", soon:"Coming soon!",
    mission1:"Become a Junior Ranger", task:"Ranger Training",
    instruction:"Tap each item to get ready!",
    hat:"Safari Hat", mapItem:"Park Map", badge:"Ranger Badge",
    finish:"MISSION COMPLETE!", reward:"You earned a star!",
    continue:"CONTINUE", collected:"Collected",
    locked:"More adventures coming soon!", ok:"OK!",
    stars:"Stars"
  },
  fr: {
    title:"LES RANGERS", adventure:"SAUVAGES",
    tagline:"Explore. Apprends. Protège la nature.",
    welcome:"Bienvenue, petit Ranger !", start:"PARTONS EXPLORER !",
    footer:"Une aventure t'attend !", create:"CRÉE TON RANGER",
    choose:"Choisis ta tenue", go:"C'EST PARTI !",
    back:"RETOUR", hub:"PARC DE LA SAVANE",
    hubWelcome:"Bienvenue au parc !", missions:"MISSIONS",
    animals:"ANIMAUX", learn:"APPRENDRE", badges:"MES BADGES",
    outfit:"Choisis ta tenue !", map:"CHOISIS UNE MISSION",
    soon:"Bientôt disponible !", mission1:"Devenir jeune Ranger",
    task:"Entraînement Ranger", instruction:"Touche chaque objet !",
    hat:"Chapeau", mapItem:"Carte du parc", badge:"Badge Ranger",
    finish:"MISSION TERMINÉE !", reward:"Tu as gagné une étoile !",
    continue:"CONTINUER", collected:"Trouvé",
    locked:"D'autres aventures bientôt !", ok:"OK !", stars:"Étoiles"
  },
  es: {
    title:"GUARDIANES", adventure:"SALVAJES",
    tagline:"Explora. Aprende. Protege la naturaleza.",
    welcome:"¡Bienvenido, pequeño Ranger!", start:"¡VAMOS A EXPLORAR!",
    footer:"¡Una aventura te espera!", create:"CREA TU RANGER",
    choose:"Elige tu uniforme", go:"¡VAMOS!",
    back:"VOLVER", hub:"PARQUE DE LA SABANA",
    hubWelcome:"¡Bienvenido al parque!", missions:"MISIONES",
    animals:"ANIMALES", learn:"APRENDER", badges:"MIS MEDALLAS",
    outfit:"¡Elige tu uniforme!", map:"ELIGE UNA MISIÓN",
    soon:"¡Muy pronto!", mission1:"Ser un Ranger Junior",
    task:"Entrenamiento Ranger", instruction:"¡Toca cada objeto!",
    hat:"Sombrero", mapItem:"Mapa del parque", badge:"Insignia Ranger",
    finish:"¡MISIÓN COMPLETADA!", reward:"¡Ganaste una estrella!",
    continue:"CONTINUAR", collected:"Conseguido",
    locked:"¡Más aventuras pronto!", ok:"¡OK!", stars:"Estrellas"
  }
};

const t = k => words[lang]?.[k] || words.en[k] || k;

function text(s,x,y,str,size=24,color="#fff") {
  return s.add.text(x,y,str,{
    fontFamily:"Trebuchet MS, Arial",
    fontSize:size+"px",fontStyle:"bold",color,
    align:"center",wordWrap:{width:460},
    stroke:"#49331f",strokeThickness:2
  }).setOrigin(.5);
}

function button(s,x,y,w,h,label,color,fn,size=22) {
  const g=s.add.graphics();
  g.fillStyle(0x49321f,.3);
  g.fillRoundedRect(x-w/2+3,y-h/2+6,w,h,20);
  g.fillStyle(0xffffff,1);
  g.fillRoundedRect(x-w/2,y-h/2,w,h,20);
  g.fillStyle(color,1);
  g.fillRoundedRect(x-w/2+5,y-h/2+5,w-10,h-12,16);
  text(s,x,y-2,label,size);
  s.add.rectangle(x,y,w,h,0xffffff,0)
    .setInteractive({useHandCursor:true})
    .on("pointerdown",fn);
}

function cloud(s,x,y,sc=1) {
  const g=s.add.graphics();g.fillStyle(0xffffff,.9);
  g.fillCircle(x,y,22*sc);g.fillCircle(x+25*sc,y-10*sc,28*sc);
  g.fillCircle(x+52*sc,y,22*sc);
  g.fillRoundedRect(x-3*sc,y,60*sc,18*sc,10);
}

function tree(s,x,y,sc=1) {
  const g=s.add.graphics();
  g.fillStyle(0x85502d,1);g.fillRoundedRect(x-8*sc,y,16*sc,65*sc,5);
  g.fillStyle(0x3e8b45,1);g.fillEllipse(x,y-12*sc,115*sc,35*sc);
  g.fillStyle(0x58a94e,1);g.fillEllipse(x-20*sc,y-23*sc,55*sc,25*sc);
}

function savannah(s) {
  const g=s.add.graphics();
  g.fillGradientStyle(0x65c9ed,0x65c9ed,0xb2e9f6,0xb2e9f6,1);
  g.fillRect(0,0,W,H);
  g.fillStyle(0xffe36b,1);g.fillCircle(440,140,48);
  cloud(s,65,145,.8);cloud(s,290,95,.6);
  g.fillStyle(0xa7d56c,1);g.fillEllipse(100,510,450,230);
  g.fillEllipse(450,500,480,260);
  g.fillStyle(0x82bd4d,1);g.fillRect(0,540,W,420);
  g.fillStyle(0x6eae42,1);g.fillEllipse(70,700,520,280);
  g.fillEllipse(480,740,480,300);
  g.fillStyle(0x9bd45a,1);g.fillEllipse(260,850,650,250);
  tree(s,55,490,.7);tree(s,485,510,.7);
}

function leo(s,x,y,sc=1,outfit=0x2c9b58) {
  const c=s.add.container(x,y).setScale(sc),g=s.add.graphics();
  g.fillStyle(0x6b442b,1);
  g.fillRoundedRect(-34,75,23,62,9);g.fillRoundedRect(11,75,23,62,9);
  g.fillStyle(0x49301e,1);
  g.fillRoundedRect(-42,122,36,20,8);g.fillRoundedRect(7,122,36,20,8);
  g.fillStyle(outfit,1);g.fillRoundedRect(-47,-5,94,100,25);
  g.fillStyle(0x684126,1);g.fillRoundedRect(-45,62,90,11,4);
  g.fillStyle(0xffd45e,1);g.fillRoundedRect(-8,61,16,13,3);
  g.fillStyle(0xb96e3d,1);g.fillRoundedRect(-16,-28,32,32,8);
  g.fillStyle(0x8e542f,1);g.fillCircle(-42,-65,18);g.fillCircle(42,-65,18);
  g.fillStyle(0xf2b27b,1);g.fillCircle(-42,-65,10);g.fillCircle(42,-65,10);
  g.fillStyle(0xc9824a,1);g.fillCircle(0,-62,57);
  g.fillStyle(0xf4c18d,1);g.fillEllipse(0,-38,64,40);
  g.fillStyle(0xffffff,1);g.fillEllipse(-21,-68,20,27);g.fillEllipse(21,-68,20,27);
  g.fillStyle(0x382619,1);g.fillCircle(-20,-65,7);g.fillCircle(20,-65,7);
  g.fillStyle(0xffffff,1);g.fillCircle(-22,-69,3);g.fillCircle(18,-69,3);
  g.fillStyle(0x4b2c24,1);g.fillEllipse(0,-44,16,10);
  g.lineStyle(3,0x6a3927,1);g.beginPath();g.arc(0,-35,15,.2,Math.PI-.2);g.strokePath();
  g.fillStyle(0x9c682e,1);g.fillEllipse(0,-108,125,23);
  g.fillStyle(0xe8b653,1);g.fillRoundedRect(-42,-147,84,42,14);
  g.fillStyle(0x3c8d48,1);g.fillRect(-40,-119,80,8);
  c.add(g);
  s.tweens.add({targets:c,y:y-6,duration:1200,yoyo:true,repeat:-1});
  return c;
}

class Home extends Phaser.Scene {
  constructor(){super("Home");}
  create(){
    savannah(this);
    const p=this.add.graphics();p.fillStyle(0x315b35,.94);
    p.fillRoundedRect(30,28,480,150,28);
    text(this,270,72,t("title"),37,"#fff6c7");
    text(this,270,119,t("adventure"),29,"#ffdf65");
    text(this,270,215,t("tagline"),18);
    leo(this,270,465,1.25);
    text(this,270,650,t("welcome"),24,"#fff6c7");
    button(this,270,755,420,78,t("start"),0x35a85b,
      ()=>this.scene.start("Ranger"),24);
    text(this,270,825,t("footer"),18);
    ["en","fr","es"].forEach((l,i)=>button(this,170+i*100,900,82,48,l.toUpperCase(),
      lang===l?0xe5a52f:0x3d83c5,()=>{
        lang=l;localStorage.setItem("wr_v1_lang",l);this.scene.restart();
      },17));
  }
}

class Ranger extends Phaser.Scene {
  constructor(){super("Ranger");}
  create(){
    savannah(this);text(this,270,75,t("create"),30);
    text(this,270,125,t("choose"),21);
    const colors=[0x2c9b58,0xe5a52f,0x3d83c5,0xc75c4a];
    let chosen=Number(localStorage.getItem("wr_v1_outfit"))||0;
    leo(this,270,430,1.35,colors[chosen]);
    colors.forEach((col,i)=>{
      const x=90+i*120,g=this.add.graphics();
      g.fillStyle(0xffffff,1);g.fillRoundedRect(x-39,635,78,78,16);
      g.fillStyle(col,1);g.fillRoundedRect(x-32,642,64,64,13);
      if(i===chosen){g.lineStyle(5,0xffe05d,1);g.strokeRoundedRect(x-39,635,78,78,16);}
      this.add.rectangle(x,674,85,90,0xffffff,0).setInteractive()
        .on("pointerdown",()=>{chosen=i;localStorage.setItem("wr_v1_outfit",i);this.scene.restart();});
    });
    text(this,270,755,t("outfit"),21);
    button(this,270,835,370,72,t("go"),0x35a85b,
      ()=>this.scene.start("Park"),25);
    button(this,100,920,150,52,t("back"),0x3d83c5,
      ()=>this.scene.start("Home"),19);
  }
}

class Park extends Phaser.Scene {
  constructor(){super("Park");}
  create(){
    savannah(this);
    text(this,270,75,t("hub"),31);
    text(this,270,120,t("hubWelcome"),20);
    const colors=[0x2c9b58,0xe5a52f,0x3d83c5,0xc75c4a];
    leo(this,270,330,.8,colors[Number(localStorage.getItem("wr_v1_outfit"))||0]);
    text(this,270,475,`⭐ ${t("stars")}: ${stars}`,23);
    button(this,155,590,240,90,"🌟 "+t("missions"),0x35a85b,
      ()=>this.scene.start("Missions"),21);
    button(this,405,590,220,90,"🦓 "+t("animals"),0xe5a52f,
      ()=>this.notice(),20);
    button(this,155,715,240,90,"📚 "+t("learn"),0x3d83c5,
      ()=>this.notice(),21);
    button(this,405,715,220,90,"🏅 "+t("badges"),0xb86ac9,
      ()=>this.notice(),19);
    button(this,270,865,240,60,t("back"),0x3d83c5,
      ()=>this.scene.start("Home"),20);
  }
  notice(){
    const box=this.add.graphics();box.fillStyle(0x315b35,.97);
    box.fillRoundedRect(45,390,450,150,22);
    const msg=text(this,270,440,t("soon"),25);
    button(this,270,500,130,48,t("ok"),0x35a85b,()=>{
      box.destroy();msg.destroy();
    },19);
  }
}

const missionNames=[
  ["mission1","🦁"],["Meet Mimi","🐒"],["Count Zebra Herd","🦓"],
  ["Find Lost Lion Cub","🐾"],["Cross the River","🌊"],
  ["Help Tembo Find Water","🐘"],["Animal Words","📚"],
  ["Clean Up the Park","♻️"],["Discover Hidden Tracks","🔎"],
  ["First Ranger Challenge","🏅"]
];

class Missions extends Phaser.Scene {
  constructor(){super("Missions");}
  create(){
    savannah(this);
    text(this,270,55,t("map"),29);
    text(this,270,105,`⭐ ${stars}  ${t("stars")}`,20);
    missionNames.forEach((m,i)=>{
      const col=i%2,row=Math.floor(i/2);
      const x=145+col*250,y=205+row*125;
      const done=completed.includes(i);
      const label=i===0?t("mission1"):m[0];
      button(this,x,y,220,96,
        `${done?"✅":m[1]} ${i+1}. ${label}`,
        done?0x65a84b:(i===0?0xe5a52f:0x78909c),
        ()=>{
          if(i===0)this.scene.start("MissionOne");
          else this.popup();
        },16);
    });
    button(this,270,875,230,58,t("back"),0x3d83c5,
      ()=>this.scene.start("Park"),20);
  }
  popup(){
    const g=this.add.graphics();g.fillStyle(0x315b35,.97);
    g.fillRoundedRect(45,390,450,155,22);
    const msg=text(this,270,440,t("locked"),23);
    button(this,270,500,130,48,t("ok"),0x35a85b,()=>{
      g.destroy();msg.destroy();
    },19);
  }
}

class MissionOne extends Phaser.Scene {
  constructor(){super("MissionOne");}
  create(){
    savannah(this);
    text(this,270,55,t("task"),29);
    text(this,270,105,t("instruction"),20);
    leo(this,270,270,.8);
    this.items=[
      {emoji:"🧢",name:t("hat")},
      {emoji:"🗺️",name:t("mapItem")},
      {emoji:"🏅",name:t("badge")}
    ];
    this.found=[];
    this.status=text(this,270,390,`${t("collected")}: 0 / 3`,22,"#fff6c7");
    this.items.forEach((item,i)=>{
      const x=100+i*170,y=535;
      const g=this.add.graphics();g.fillStyle(0xffffff,1);
      g.fillRoundedRect(x-65,y-65,130,130,20);
      text(this,x,y-15,item.emoji,42,"#ffffff");
      text(this,x,y+43,item.name,15,"#315b35");
      this.add.rectangle(x,y,130,130,0xffffff,0).setInteractive()
        .on("pointerdown",()=>{
          if(this.found.includes(i))return;
          this.found.push(i);
          g.clear();g.fillStyle(0x65a84b,1);g.fillRoundedRect(x-65,y-65,130,130,20);
          text(this,x,y,"✅",45);
          this.status.setText(`${t("collected")}: ${this.found.length} / 3`);
          if(this.found.length===3)this.time.delayedCall(500,()=>this.scene.start("MissionComplete"));
        });
    });
    button(this,270,820,220,60,t("back"),0x3d83c5,
      ()=>this.scene.start("Missions"),20);
  }
}

class MissionComplete extends Phaser.Scene {
  constructor(){super("MissionComplete");}
  create(){
    savannah(this);
    const already=completed.includes(0);
    if(!already){
      completed.push(0);stars+=1;
      localStorage.setItem("wr_v1_completed",JSON.stringify(completed));
      localStorage.setItem("wr_v1_stars",String(stars));
    }
    text(this,270,180,t("finish"),31,"#fff6c7");
    text(this,270,300,"🏆",100);
    text(this,270,430,t("mission1"),25);
    text(this,270,500,already?t("reward"):`⭐ ${t("reward")}`,23);
    text(this,270,560,`⭐ ${t("stars")}: ${stars}`,23);
    button(this,270,700,350,75,t("continue"),0x35a85b,
      ()=>this.scene.start("Missions"),23);
    button(this,270,800,260,60,t("hub"),0x3d83c5,
      ()=>this.scene.start("Park"),20);
  }
}

new Phaser.Game({
  type:Phaser.AUTO,width:W,height:H,parent:"game",
  backgroundColor:"#65c9ed",
  scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},
  scene:[Home,Ranger,Park,Missions,MissionOne,MissionComplete]
});