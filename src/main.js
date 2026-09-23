import Phaser from "phaser";

const W = 540, H = 960;

let lang = localStorage.getItem("wr_v1_lang") || "en";
let stars = Number(localStorage.getItem("wr_v1_stars")) || 0;
let completed = JSON.parse(localStorage.getItem("wr_v1_completed") || "[]");

const outfitColors = [0x2c9b58, 0xe5a52f, 0x3d83c5, 0xc75c4a];

const L = {
en:{
 title:"WILD RANGERS",adventure:"ADVENTURE",
 tagline:"Explore. Learn. Protect Nature.",
 welcome:"Welcome, Little Ranger!",start:"LET'S EXPLORE!",
 footer:"A wild adventure awaits!",create:"CREATE YOUR RANGER",
 choose:"Choose your ranger outfit",go:"LET'S GO!",
 back:"BACK",hub:"SAVANNAH PARK",hubWelcome:"Welcome to the park!",
 missions:"MISSIONS",animals:"ANIMALS",learn:"LEARNING",
 badges:"MY BADGES",outfit:"Choose your outfit!",
 map:"CHOOSE A MISSION",soon:"Coming soon!",ok:"OK!",
 stars:"Stars",m1:"Become a Junior Ranger",m2:"Meet Mimi",
 m3:"Count the Zebra Herd",m4:"Find the Lost Lion Cub",
 m5:"Cross the River",m6:"Help Tembo Find Water",
 m7:"Animal Words",m8:"Clean Up the Park",
 m9:"Discover Hidden Tracks",m10:"First Ranger Challenge",
 training:"Ranger Training",instruction:"Tap each item to get ready!",
 hat:"Safari Hat",mapItem:"Park Map",badge:"Ranger Badge",
 finish:"MISSION COMPLETE!",reward:"You earned a star!",
 continue:"CONTINUE",collected:"Collected",
 great:"Great job!",locked:"Complete the previous mission first!",
 task1:"Tap all 3 ranger items!",
 task2:"Help Mimi find 3 bananas!",
 task3:"How many zebras can you see?",
 task4:"Find all 3 clues!",
 task5:"Tap the stones in number order!",
 task6:"Tap all 3 water drops!",
 task7:"Tap the animal that matches the word!",
 task8:"Tap all 3 pieces of rubbish to clean the park!",
 task9:"Which animal made these tracks?",
 task10:"Complete the final ranger challenge!",
 correct:"That's right! Great job!",
 wrong:"Try again!",
 success:"Amazing ranger work!",
 animalsWord:"Which animal is this?",
 clean:"Park cleaned!",
 trackQuestion:"Who left these tracks?",
 finalTask:"Tap all 3 ranger supplies!",
 zebra:"Zebra",lion:"Lion",elephant:"Elephant",
 banana:"Banana",water:"Water",rubbish:"Rubbish",
 lionClue:"Lion clue",rangerItem:"Ranger supply"
},
fr:{
 title:"LES RANGERS",adventure:"SAUVAGES",
 tagline:"Explore. Apprends. Protège la nature.",
 welcome:"Bienvenue, petit Ranger !",start:"PARTONS EXPLORER !",
 footer:"Une aventure t'attend !",create:"CRÉE TON RANGER",
 choose:"Choisis ta tenue",go:"C'EST PARTI !",
 back:"RETOUR",hub:"PARC DE LA SAVANE",hubWelcome:"Bienvenue au parc !",
 missions:"MISSIONS",animals:"ANIMAUX",learn:"APPRENDRE",
 badges:"MES BADGES",outfit:"Choisis ta tenue !",
 map:"CHOISIS UNE MISSION",soon:"Bientôt disponible !",ok:"OK !",
 stars:"Étoiles",m1:"Devenir jeune Ranger",m2:"Rencontre Mimi",
 m3:"Compter les zèbres",m4:"Retrouver le lionceau",
 m5:"Traverser la rivière",m6:"Aider Tembo à trouver de l'eau",
 m7:"Les mots des animaux",m8:"Nettoyer le parc",
 m9:"Découvrir les traces",m10:"Défi du Ranger",
 training:"Entraînement Ranger",instruction:"Touche chaque objet !",
 hat:"Chapeau",mapItem:"Carte du parc",badge:"Badge Ranger",
 finish:"MISSION TERMINÉE !",reward:"Tu as gagné une étoile !",
 continue:"CONTINUER",collected:"Trouvé",
 great:"Bravo !",locked:"Termine la mission précédente !",
 task1:"Touche les 3 objets du Ranger !",
 task2:"Aide Mimi à trouver 3 bananes !",
 task3:"Combien de zèbres vois-tu ?",
 task4:"Trouve les 3 indices !",
 task5:"Touche les pierres dans l'ordre !",
 task6:"Touche les 3 gouttes d'eau !",
 task7:"Touche l'animal correspondant au mot !",
 task8:"Touche les 3 déchets pour nettoyer le parc !",
 task9:"Quel animal a laissé ces traces ?",
 task10:"Relève le défi final du Ranger !",
 correct:"Bravo ! C'est exact !",wrong:"Essaie encore !",
 success:"Excellent travail, Ranger !",
 animalsWord:"Quel est cet animal ?",
 clean:"Parc nettoyé !",
 trackQuestion:"Qui a laissé ces traces ?",
 finalTask:"Touche les 3 équipements du Ranger !",
 zebra:"Zèbre",lion:"Lion",elephant:"Éléphant",
 banana:"Banane",water:"Eau",rubbish:"Déchet",
 lionClue:"Indice du lion",rangerItem:"Équipement Ranger"
},
es:{
 title:"GUARDIANES",adventure:"SALVAJES",
 tagline:"Explora. Aprende. Protege la naturaleza.",
 welcome:"¡Bienvenido, pequeño Ranger!",start:"¡VAMOS A EXPLORAR!",
 footer:"¡Una aventura te espera!",create:"CREA TU RANGER",
 choose:"Elige tu uniforme",go:"¡VAMOS!",
 back:"VOLVER",hub:"PARQUE DE LA SABANA",
 hubWelcome:"¡Bienvenido al parque!",
 missions:"MISIONES",animals:"ANIMALES",learn:"APRENDER",
 badges:"MIS MEDALLAS",outfit:"¡Elige tu uniforme!",
 map:"ELIGE UNA MISIÓN",soon:"¡Muy pronto!",ok:"¡OK!",
 stars:"Estrellas",m1:"Ser un Ranger Junior",m2:"Conoce a Mimi",
 m3:"Cuenta las cebras",m4:"Encuentra al cachorro de león",
 m5:"Cruza el río",m6:"Ayuda a Tembo a encontrar agua",
 m7:"Palabras de animales",m8:"Limpia el parque",
 m9:"Descubre huellas",m10:"Desafío Ranger",
 training:"Entrenamiento Ranger",instruction:"¡Toca cada objeto!",
 hat:"Sombrero",mapItem:"Mapa del parque",badge:"Insignia Ranger",
 finish:"¡MISIÓN COMPLETADA!",reward:"¡Ganaste una estrella!",
 continue:"CONTINUAR",collected:"Conseguido",
 great:"¡Muy bien!",locked:"¡Completa la misión anterior!",
 task1:"¡Toca los 3 objetos Ranger!",
 task2:"¡Ayuda a Mimi a encontrar 3 bananas!",
 task3:"¿Cuántas cebras puedes ver?",
 task4:"¡Encuentra las 3 pistas!",
 task5:"¡Toca las piedras en orden!",
 task6:"¡Toca las 3 gotas de agua!",
 task7:"¡Toca el animal que corresponde a la palabra!",
 task8:"¡Toca los 3 residuos para limpiar el parque!",
 task9:"¿Qué animal dejó estas huellas?",
 task10:"¡Completa el desafío final Ranger!",
 correct:"¡Correcto! ¡Muy bien!",
 wrong:"¡Inténtalo otra vez!",
 success:"¡Excelente trabajo, Ranger!",
 animalsWord:"¿Qué animal es?",
 clean:"¡Parque limpio!",
 trackQuestion:"¿Quién dejó estas huellas?",
 finalTask:"¡Toca los 3 objetos Ranger!",
 zebra:"Cebra",lion:"León",elephant:"Elefante",
 banana:"Banana",water:"Agua",rubbish:"Residuo",
 lionClue:"Pista del león",rangerItem:"Equipo Ranger"
}
};

const t = k => L[lang]?.[k] || L.en[k] || k;

function txt(s,x,y,str,size=23,color="#fff"){
 return s.add.text(x,y,str,{
  fontFamily:"Trebuchet MS, Arial",
  fontSize:size+"px",fontStyle:"bold",color,
  align:"center",wordWrap:{width:460},
  stroke:"#49331f",strokeThickness:2
 }).setOrigin(.5);
}

function btn(s,x,y,w,h,label,color,fn,size=22){
 const g=s.add.graphics();
 g.fillStyle(0x49321f,.3);
 g.fillRoundedRect(x-w/2+3,y-h/2+6,w,h,20);
 g.fillStyle(0xffffff,1);
 g.fillRoundedRect(x-w/2,y-h/2,w,h,20);
 g.fillStyle(color,1);
 g.fillRoundedRect(x-w/2+5,y-h/2+5,w-10,h-12,16);
 txt(s,x,y-2,label,size);
 s.add.rectangle(x,y,w,h,0xffffff,0)
  .setInteractive({useHandCursor:true}).on("pointerdown",fn);
}

function savannah(s){
 const g=s.add.graphics();
 g.fillGradientStyle(0x65c9ed,0x65c9ed,0xb2e9f6,0xb2e9f6,1);
 g.fillRect(0,0,W,H);
 g.fillStyle(0xffe36b,1);g.fillCircle(440,140,48);
 g.fillStyle(0xa7d56c,1);
 g.fillEllipse(100,510,450,230);
 g.fillEllipse(450,500,480,260);
 g.fillStyle(0x82bd4d,1);g.fillRect(0,540,W,420);
 g.fillStyle(0x6eae42,1);
 g.fillEllipse(70,700,520,280);
 g.fillEllipse(480,740,480,300);
 g.fillStyle(0x9bd45a,1);g.fillEllipse(260,850,650,250);
}

function leo(s,x,y,sc=1,outfit=0x2c9b58){
 const c=s.add.container(x,y).setScale(sc);
 const g=s.add.graphics();
 g.fillStyle(0x6b442b,1);
 g.fillRoundedRect(-34,75,23,62,9);
 g.fillRoundedRect(11,75,23,62,9);
 g.fillStyle(outfit,1);
 g.fillRoundedRect(-47,-5,94,100,25);
 g.fillStyle(0xc9824a,1);g.fillCircle(0,-62,57);
 g.fillStyle(0xf4c18d,1);g.fillEllipse(0,-38,64,40);
 g.fillStyle(0xffffff,1);
 g.fillEllipse(-21,-68,20,27);g.fillEllipse(21,-68,20,27);
 g.fillStyle(0x382619,1);
 g.fillCircle(-20,-65,7);g.fillCircle(20,-65,7);
 g.fillStyle(0x9c682e,1);g.fillEllipse(0,-108,125,23);
 g.fillStyle(0xe8b653,1);g.fillRoundedRect(-42,-147,84,42,14);
 c.add(g);
 s.tweens.add({targets:c,y:y-6,duration:1200,yoyo:true,repeat:-1});
 return c;
}

class Home extends Phaser.Scene{
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
     lang=l;localStorage.setItem("wr_v1_lang",l);
     this.scene.restart();
    },17);
  });
 }
}

class Ranger extends Phaser.Scene{
 constructor(){super("Ranger");}
 create(){
  savannah(this);
  txt(this,270,75,t("create"),30);
  txt(this,270,125,t("choose"),21);
  let chosen=Number(localStorage.getItem("wr_v1_outfit"))||0;
  leo(this,270,430,1.35,outfitColors[chosen]);
  outfitColors.forEach((col,i)=>{
   const x=90+i*120,g=this.add.graphics();
   g.fillStyle(0xffffff,1);g.fillRoundedRect(x-39,635,78,78,16);
   g.fillStyle(col,1);g.fillRoundedRect(x-32,642,64,64,13);
   if(i===chosen){
    g.lineStyle(5,0xffe05d,1);g.strokeRoundedRect(x-39,635,78,78,16);
   }
   this.add.rectangle(x,674,85,90,0xffffff,0).setInteractive()
    .on("pointerdown",()=>{
     chosen=i;localStorage.setItem("wr_v1_outfit",i);
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

class Park extends Phaser.Scene{
 constructor(){super("Park");}
 create(){
  savannah(this);
  txt(this,270,75,t("hub"),31);
  txt(this,270,120,t("hubWelcome"),20);
  leo(this,270,330,.8,outfitColors[Number(localStorage.getItem("wr_v1_outfit"))||0]);
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
  const g=this.add.graphics();g.fillStyle(0x315b35,.97);
  g.fillRoundedRect(45,390,450,150,22);
  const m=txt(this,270,440,t("soon"),23);
  btn(this,270,500,130,48,t("ok"),0x35a85b,()=>{
   g.destroy();m.destroy();
  },19);
 }
}

class Missions extends Phaser.Scene{
 constructor(){super("Missions");}
 create(){
  savannah(this);txt(this,270,50,t("map"),28);
  txt(this,270,95,`⭐ ${stars} ${t("stars")}`,20);
  for(let i=0;i<10;i++){
   const unlocked=i===0||completed.includes(i-1);
   const done=completed.includes(i);
   const x=145+(i%2)*250,y=190+Math.floor(i/2)*125;
   btn(this,x,y,220,96,
    `${done?"✅":unlocked?"🌟":"🔒"} ${i+1}. ${t("m"+(i+1))}`,
    done?0x65a84b:unlocked?0xe5a52f:0x78909c,
    ()=>{
     if(!unlocked){this.popup(t("locked"));return;}
     this.scene.start("MissionPlay",{idx:i});
    },15);
  }
  btn(this,270,875,230,58,t("back"),0x3d83c5,
   ()=>this.scene.start("Park"),20);
 }
 popup(message){
  const g=this.add.graphics();g.fillStyle(0x315b35,.97);
  g.fillRoundedRect(45,390,450,155,22);
  const m=txt(this,270,440,message,22);
  btn(this,270,500,130,48,t("ok"),0x35a85b,()=>{
   g.destroy();m.destroy();
  },19);
 }
}

// One shared, fully playable scene powers Missions 1–10.
class MissionPlay extends Phaser.Scene{
 constructor(){super("MissionPlay");}

 init(data){this.idx=data.idx||0;}

 create(){
  savannah(this);
  const n=this.idx+1;
  txt(this,270,48,t("m"+n),27);
  leo(this,95,205,.48,
   outfitColors[Number(localStorage.getItem("wr_v1_outfit"))||0]);

  const task=txt(this,270,310,t("task"+n),21,"#fff6c7");
  this.feedback=txt(this,270,835,"",20,"#fff6c7");
  this.count=0;this.finished=false;

  if(n===3)this.makeCountQuiz();
  else if(n===5)this.makeOrderGame();
  else if(n===7)this.makeAnimalWords();
  else if(n===9)this.makeTracksQuiz();
  else this.makeTapGame(n);

  btn(this,270,920,220,52,t("back"),0x3d83c5,
   ()=>this.scene.start("Missions"),19);
 }

 makeTapGame(n){
  let items;
  if(n===1)items=[["🧢",t("hat")],["🗺️",t("mapItem")],["🏅",t("badge")]];
  if(n===2)items=[["🍌",t("banana")],["🍌",t("banana")],["🍌",t("banana")]];
  if(n===4)items=[["🐾",t("lionClue")],["🟡",t("lionClue")],["🌳",t("lionClue")]];
  if(n===6)items=[["💧",t("water")],["💧",t("water")],["💧",t("water")]];
  if(n===8)items=[["🥫",t("rubbish")],["🧴",t("rubbish")],["🗑️",t("rubbish")]];
  if(n===10)items=[["🧢",t("rangerItem")],["🗺️",t("rangerItem")],["🏅",t("rangerItem")]];

  const spots=[
   {x:105,y:560},{x:270,y:650},{x:435,y:560}
  ];
  this.status=txt(this,270,770,`${t("collected")}: 0 / 3`,22);

  items.forEach((item,i)=>{
   const p=spots[i],g=this.add.graphics();
   g.fillStyle(0xffffff,1);g.fillRoundedRect(p.x-55,p.y-55,110,110,18);
   txt(this,p.x,p.y-8,item[0],42);
   txt(this,p.x,p.y+35,item[1],13,"#315b35");
   const hit=this.add.rectangle(p.x,p.y,110,110,0xffffff,0)
    .setInteractive({useHandCursor:true});
   hit.on("pointerdown",()=>{
    if(g.getData("found")||this.finished)return;
    g.setData("found",true);g.clear();
    g.fillStyle(0x65a84b,1);g.fillRoundedRect(p.x-55,p.y-55,110,110,18);
    txt(this,p.x,p.y,"✅",42);
    this.count++;
    this.status.setText(`${t("collected")}: ${this.count} / 3`);
    this.feedback.setText(t("great"));
    if(this.count===3)this.win();
   });
  });
 }

 makeCountQuiz(){
  txt(this,270,420,"🦓  🦓  🦓  🦓  🦓",42);
  const answers=Phaser.Utils.Array.Shuffle([3,4,5,6]);
  answers.forEach((a,i)=>{
   btn(this,145+(i%2)*250,620+Math.floor(i/2)*95,180,70,String(a),
    0xe5a52f,()=>{
     if(this.finished)return;
     if(a===5){this.feedback.setText(t("correct"));this.win();}
     else this.feedback.setText(t("wrong"));
    },28);
  });
 }

 makeOrderGame(){
  const stones=[1,2,3,4];
  Phaser.Utils.Array.Shuffle(stones);
  this.order=1;
  this.status=txt(this,270,800,"0 / 4",22);
  stones.forEach((num,i)=>{
   const x=90+(i%2)*350,y=475+Math.floor(i/2)*150;
   const g=this.add.graphics();g.fillStyle(0xc2d0d0,1);
   g.fillEllipse(x,y,115,80);txt(this,x,y,String(num),28,"#315b35");
   this.add.rectangle(x,y,120,90,0xffffff,0).setInteractive()
    .on("pointerdown",()=>{
     if(this.finished)return;
     if(num===this.order){
      this.order++;txt(this,x,y,"✓",25,"#315b35");
      this.status.setText(`${this.order-1} / 4`);
      this.feedback.setText(t("great"));
      if(this.order===5)this.win();
     }else this.feedback.setText(t("wrong"));
    });
  });
 }

 makeAnimalWords(){
  txt(this,270,440,t("animalsWord"),22);
  const opts=Phaser.Utils.Array.Shuffle([
   {e:"🦓",name:t("zebra"),ok:true},
   {e:"🦁",name:t("lion"),ok:false},
   {e:"🐘",name:t("elephant"),ok:false}
  ]);
  opts.forEach((o,i)=>{
   btn(this,270,560+i*100,300,75,`${o.e} ${o.name}`,0xe5a52f,()=>{
    if(this.finished)return;
    if(o.ok){this.feedback.setText(t("correct"));this.win();}
    else this.feedback.setText(t("wrong"));
   },22);
  });
 }

 makeTracksQuiz(){
  txt(this,270,440,"🐾 🐾 🐾",48);
  txt(this,270,505,t("trackQuestion"),21);
  const opts=Phaser.Utils.Array.Shuffle([
   {e:"🦁",name:t("lion"),ok:true},
   {e:"🦓",name:t("zebra"),ok:false},
   {e:"🐘",name:t("elephant"),ok:false}
  ]);
  opts.forEach((o,i)=>{
   btn(this,270,600+i*85,300,65,`${o.e} ${o.name}`,0xe5a52f,()=>{
    if(this.finished)return;
    if(o.ok){this.feedback.setText(t("correct"));this.win();}
    else this.feedback.setText(t("wrong"));
   },22);
  });
 }

 win(){
  if(this.finished)return;
  this.finished=true;
  this.feedback.setText(t("success"));
  this.time.delayedCall(700,()=>{
   this.scene.start("Complete",{mission:this.idx});
  });
 }
}

class Complete extends Phaser.Scene{
 constructor(){super("Complete");}
 init(data){this.mission=data.mission??0;}

 create(){
  savannah(this);
  const already=completed.includes(this.mission);
  if(!already){
   completed.push(this.mission);stars++;
   localStorage.setItem("wr_v1_completed",JSON.stringify(completed));
   localStorage.setItem("wr_v1_stars",String(stars));
  }

  txt(this,270,170,t("finish"),30,"#fff6c7");
  txt(this,270,285,"🏆",100);
  txt(this,270,405,t("m"+(this.mission+1)),25);
  txt(this,270,480,t("reward"),23);
  txt(this,270,540,`⭐ ${t("stars")}: ${stars}`,23);
  leo(this,270,640,.65,
   outfitColors[Number(localStorage.getItem("wr_v1_outfit"))||0]);

  btn(this,270,775,340,70,t("continue"),0x35a85b,
   ()=>this.scene.start("Missions"),23);
  btn(this,270,865,250,58,t("hub"),0x3d83c5,
   ()=>this.scene.start("Park"),20);
 }
}

new Phaser.Game({
 type:Phaser.AUTO,
 width:W,height:H,parent:"game",
 backgroundColor:"#65c9ed",
 scale:{
  mode:Phaser.Scale.FIT,
  autoCenter:Phaser.Scale.CENTER_BOTH
 },
 scene:[
  Home,Ranger,Park,Missions,MissionPlay,Complete
 ]
});