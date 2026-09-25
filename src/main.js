import Phaser from "phaser";

const W=540,H=960;

let lang=localStorage.getItem("wr_v1_lang")||"en";
let stars=Number(localStorage.getItem("wr_v1_stars"))||0;
let completed=JSON.parse(localStorage.getItem("wr_v1_completed")||"[]");
let parentPin=localStorage.getItem("wr_v1_parent_pin")||"1234";

/* =========================================================
   RANGER SOUND SYSTEM
========================================================= */

let soundOn=localStorage.getItem("wr_v1_sound")!=="off";
let audioCtx=null;
let musicTimer=null;

function startAudio(){
 if(!soundOn)return;
 try{
  if(!audioCtx){
   const Ctx=window.AudioContext||window.webkitAudioContext;
   if(Ctx)audioCtx=new Ctx();
  }
  if(audioCtx&&audioCtx.state==="suspended")audioCtx.resume();
 }catch(e){}
}

function tone(freq=440,duration=.08,type="sine",volume=.035,delay=0){
 if(!soundOn)return;
 startAudio();
 if(!audioCtx)return;

 try{
  const osc=audioCtx.createOscillator();
  const gain=audioCtx.createGain();

  osc.type=type;
  osc.frequency.setValueAtTime(freq,audioCtx.currentTime+delay);

  gain.gain.setValueAtTime(0.0001,audioCtx.currentTime+delay);
  gain.gain.exponentialRampToValueAtTime(
   volume,
   audioCtx.currentTime+delay+.01
  );
  gain.gain.exponentialRampToValueAtTime(
   0.0001,
   audioCtx.currentTime+delay+duration
  );

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(audioCtx.currentTime+delay);
  osc.stop(audioCtx.currentTime+delay+duration+.03);
 }catch(e){}
}

function soundTap(){
 tone(520,.06,"sine",.025);
}

function soundCorrect(){
 tone(523,.09,"sine",.035);
 tone(659,.12,"sine",.04,.08);
 tone(784,.18,"sine",.045,.18);
}

function soundWrong(){
 tone(220,.12,"triangle",.035);
 tone(175,.18,"triangle",.03,.1);
}

function soundWin(){
 tone(523,.12,"sine",.04);
 tone(659,.12,"sine",.04,.12);
 tone(784,.14,"sine",.045,.24);
 tone(1046,.28,"sine",.05,.38);
}

function soundGuide(){
 tone(392,.1,"sine",.025);
 tone(523,.15,"sine",.03,.1);
}

function soundCollect(){
 tone(620,.07,"sine",.03);
 tone(820,.1,"sine",.035,.07);
}

function startAmbient(){
 if(!soundOn||musicTimer)return;

 const playAmbient=()=>{
  if(!soundOn){
   musicTimer=null;
   return;
  }

  tone(261,.55,"sine",.008);
  tone(329,.55,"sine",.006,.18);
  tone(392,.7,"sine",.007,.36);

  musicTimer=setTimeout(()=>{
   musicTimer=null;
   startAmbient();
  },6500);
 };

 playAmbient();
}

function stopAmbient(){
 if(musicTimer){
  clearTimeout(musicTimer);
  musicTimer=null;
 }
}

function toggleSound(){
 soundOn=!soundOn;
 localStorage.setItem("wr_v1_sound",soundOn?"on":"off");

 if(soundOn){
  startAudio();
  soundTap();
  startAmbient();
 }else{
  stopAmbient();
 }
}

function soundLabel(){
 return soundOn?"🔊":"🔇";
}

function audioControl(s){
 const hit=s.add.rectangle(500,55,58,50,0xffffff,0)
  .setInteractive({useHandCursor:true});

 const g=s.add.graphics();
 g.fillStyle(0x183d29,.92);
 g.fillRoundedRect(470,30,58,50,16);

 const label=s.add.text(499,55,soundLabel(),{
  fontFamily:"Arial",
  fontSize:"24px"
 }).setOrigin(.5);

 hit.on("pointerdown",()=>{
  toggleSound();
  label.setText(soundLabel());
 });

 return {hit,g,label};
}

/* =========================================================
   COLORS / TRANSLATIONS
========================================================= */

const outfitColors=[0x2c9b58,0xe5a52f,0x3d83c5,0xc75c4a];

const L={
en:{
title:"WILD RANGERS",adventure:"ADVENTURE",tagline:"Explore. Learn. Protect Nature.",
welcome:"Welcome, Little Ranger!",start:"LET'S EXPLORE!",footer:"A wild adventure awaits!",
create:"CREATE YOUR RANGER",choose:"Choose your ranger outfit",go:"LET'S GO!",back:"BACK",
hub:"SAVANNAH PARK",hubWelcome:"Welcome to the park!",missions:"MISSIONS",animals:"ANIMALS",
learn:"LEARNING",badges:"MY BADGES",outfit:"Choose your outfit!",map:"CHOOSE A MISSION",
soon:"Coming soon!",ok:"OK!",wildlife:"WILDLIFE BOOK",animalFriends:"MEET THE ANIMALS",
tapAnimal:"Tap an animal to learn more!",stars:"Stars",
m1:"Become a Junior Ranger",m2:"Meet Mimi",m3:"Count the Zebra Herd",m4:"Find the Lost Lion Cub",
m5:"Cross the River",m6:"Help Tembo Find Water",m7:"Animal Words",m8:"Clean Up the Park",
m9:"Discover Hidden Tracks",m10:"First Ranger Challenge",
training:"Ranger Training",instruction:"Tap each item to get ready!",hat:"Safari Hat",
mapItem:"Park Map",badge:"Ranger Badge",finish:"MISSION COMPLETE!",reward:"You earned a star!",
continue:"CONTINUE",collected:"Collected",great:"Great job!",
locked:"Complete the previous mission first!",
task1:"Tap all 3 ranger items!",task2:"Help Mimi find 3 bananas!",
task3:"How many zebras can you see?",task4:"Find all 3 clues!",
task5:"Tap the stones in number order!",task6:"Tap all 3 water drops!",
task7:"Tap the animal that matches the word!",
task8:"Tap all 3 pieces of rubbish to clean the park!",
task9:"Which animal made these tracks?",task10:"Complete the final ranger challenge!",
correct:"That's right! Great job!",wrong:"Try again!",success:"Amazing ranger work!",
animalsWord:"Which animal is this?",clean:"Park cleaned!",trackQuestion:"Who left these tracks?",
finalTask:"Tap all 3 ranger supplies!",zebra:"Zebra",lion:"Lion",elephant:"Elephant",
monkey:"Mimi — Monkey",lionCub:"Kimba — Lion Cub",giraffe:"Zuri — Giraffe",
hippo:"Bongo — Hippo",cheetah:"Chase — Cheetah",temboName:"Tembo — Elephant",
zaraName:"Zara — Zebra",banana:"Banana",water:"Water",rubbish:"Rubbish",
lionClue:"Lion clue",rangerItem:"Ranger supply",
learningTitle:"RANGER LEARNING CENTRE",learningWelcome:"Learn about wildlife and nature!",
learnWildlife:"WILDLIFE",learnNature:"NATURE",learnSafety:"RANGER SAFETY",
factMonkey:"Monkeys use their hands and tails to move through trees.",
factLion:"Lion cubs stay close to their mothers while they grow.",
factElephant:"Elephants use their trunks to drink, smell and pick things up.",
factGiraffe:"Giraffes use their long necks to reach leaves high in trees.",
factZebra:"Every zebra has its own unique stripe pattern.",
factHippo:"Hippos spend lots of time in water to keep cool.",
factCheetah:"Cheetahs are built for short bursts of very fast running.",
natureFact:"Plants, water and clean habitats help animals live safely.",
safetyFact:"A good Ranger watches animals from a safe distance.",
learningTip:"Keep exploring and learning, Little Ranger!",
badgeTitle:"MY RANGER BADGES",badgeWelcome:"Collect badges by completing missions!",
badge1:"Junior Ranger",badge2:"Animal Friend",badge3:"Wildlife Explorer",badge4:"Nature Protector",
badge5:"Ranger Champion",earned:"EARNED",lockedBadge:"LOCKED",progress:"Progress",
missionsDone:"Missions complete",badgeNeed1:"Complete Mission 1",badgeNeed3:"Complete 3 missions",
badgeNeed5:"Complete 5 missions",badgeNeed8:"Complete 8 missions",badgeNeed10:"Complete all 10 missions",
parent:"PARENT AREA",parentDashboard:"PARENT DASHBOARD",parentPin:"Enter parent PIN",
enterPin:"ENTER PIN",wrongPin:"Incorrect PIN",parentStats:"RANGER PROGRESS",totalStars:"Total Stars",
completedMissions:"Completed Missions",currentOutfit:"Current Outfit",language:"Language",
changePin:"CHANGE PIN",newPin:"New 4-digit PIN",savePin:"SAVE PIN",parentInfo:"Parent information",
parentText:"Wild Rangers Adventure is designed to encourage children to explore, learn and care for nature.",
resetProgress:"RESET PROGRESS",resetConfirm:"Reset all game progress?",yes:"YES",no:"NO",
premium:"WILD RANGERS PLUS",premiumTitle:"MORE RANGER ADVENTURES",
premiumText:"Unlock extra learning activities, future missions and special Ranger rewards.",
monthly:"MONTHLY",yearly:"YEARLY",monthlyPrice:"$9.99 / month",yearlyPrice:"$24.99 / year",
upgrade:"UPGRADE",currentPlan:"CURRENT PLAN",premiumSoon:"Premium subscriptions will be connected here.",
freePlan:"FREE RANGER",plusPlan:"RANGER PLUS",close:"CLOSE",next:"NEXT",info:"INFO",

leoGuide:"LEO — RANGER GUIDE",askLeo:"ASK LEO",gotIt:"GOT IT!",
leoWelcome:"Hello, Little Ranger! I'm Leo. Let's explore together!",
leoPark:"Remember: explore gently, learn something new, and help protect nature!",
leoHint1:"Look carefully at the three Ranger items. Can you find them all?",
leoHint2:"Mimi loves bananas! Look for three bananas to help her.",
leoHint3:"Count the zebras carefully. Touch the number that matches.",
leoHint4:"Look for three clues that can help us find Kimba.",
leoHint5:"The stones have numbers. Start with number 1 and follow the order.",
leoHint6:"Tembo needs water. Can you find all three water drops?",
leoHint7:"Look at the animal and match it with the correct animal word.",
leoHint8:"A Ranger helps keep the park clean. Find all three pieces of rubbish.",
leoHint9:"Look at the tracks carefully. Which animal could have made them?",
leoHint10:"A Ranger needs supplies. Find all three supplies!",
leoGreat:"Fantastic work, Ranger! You did it!",
leoTry:"That's okay! Take another look and try again.",
leoFact:"Here's a Ranger fact:",
leoLearn:"Learning is part of being a great Ranger!",
leoSafe:"Stay calm, watch wildlife from a safe distance, and follow Ranger rules."
},

fr:{
title:"LES RANGERS",adventure:"SAUVAGES",tagline:"Explore. Apprends. Protège la nature.",
welcome:"Bienvenue, petit Ranger !",start:"PARTONS EXPLORER !",footer:"Une aventure t'attend !",
create:"CRÉE TON RANGER",choose:"Choisis ta tenue",go:"C'EST PARTI !",back:"RETOUR",
hub:"PARC DE LA SAVANE",hubWelcome:"Bienvenue au parc !",missions:"MISSIONS",animals:"ANIMAUX",
learn:"APPRENDRE",badges:"MES BADGES",outfit:"Choisis ta tenue !",map:"CHOISIS UNE MISSION",
soon:"Bientôt disponible !",ok:"OK !",wildlife:"LIVRE DES ANIMAUX",
animalFriends:"RENCONTRE LES ANIMAUX",tapAnimal:"Touche un animal pour en savoir plus !",
stars:"Étoiles",m1:"Devenir jeune Ranger",m2:"Rencontre Mimi",m3:"Compter les zèbres",
m4:"Retrouver le lionceau",m5:"Traverser la rivière",m6:"Aider Tembo à trouver de l'eau",
m7:"Les mots des animaux",m8:"Nettoyer le parc",m9:"Découvrir les traces",m10:"Défi du Ranger",
training:"Entraînement Ranger",instruction:"Touche chaque objet !",hat:"Chapeau",
mapItem:"Carte du parc",badge:"Badge Ranger",finish:"MISSION TERMINÉE !",
reward:"Tu as gagné une étoile !",continue:"CONTINUER",collected:"Trouvé",great:"Bravo !",
locked:"Termine la mission précédente !",task1:"Touche les 3 objets du Ranger !",
task2:"Aide Mimi à trouver 3 bananes !",task3:"Combien de zèbres vois-tu ?",
task4:"Trouve les 3 indices !",task5:"Touche les pierres dans l'ordre !",
task6:"Touche les 3 gouttes d'eau !",task7:"Touche l'animal correspondant au mot !",
task8:"Touche les 3 déchets pour nettoyer le parc !",task9:"Quel animal a laissé ces traces ?",
task10:"Relève le défi final du Ranger !",correct:"Bravo ! C'est exact !",wrong:"Essaie encore !",
success:"Excellent travail, Ranger !",animalsWord:"Quel est cet animal ?",clean:"Parc nettoyé !",
trackQuestion:"Qui a laissé ces traces ?",finalTask:"Touche les 3 équipements du Ranger !",
zebra:"Zèbre",lion:"Lion",elephant:"Éléphant",monkey:"Mimi — Singe",
lionCub:"Kimba — Lionceau",giraffe:"Zuri — Girafe",hippo:"Bongo — Hippopotame",
cheetah:"Chase — Guépard",temboName:"Tembo — Éléphant",zaraName:"Zara — Zèbre",
banana:"Banane",water:"Eau",rubbish:"Déchet",lionClue:"Indice du lion",rangerItem:"Équipement Ranger",
learningTitle:"CENTRE D'APPRENTISSAGE RANGER",learningWelcome:"Apprends sur les animaux et la nature!",
learnWildlife:"ANIMAUX",learnNature:"NATURE",learnSafety:"SÉCURITÉ RANGER",
factMonkey:"Les singes utilisent leurs mains et leur queue pour se déplacer dans les arbres.",
factLion:"Les lionceaux restent près de leur mère pendant leur croissance.",
factElephant:"Les éléphants utilisent leur trompe pour boire, sentir et attraper des objets.",
factGiraffe:"Les girafes utilisent leur long cou pour atteindre les feuilles en hauteur.",
factZebra:"Chaque zèbre possède un motif de rayures unique.",
factHippo:"Les hippopotames passent beaucoup de temps dans l'eau pour rester au frais.",
factCheetah:"Les guépards sont faits pour courir très vite sur de courtes distances.",
natureFact:"Les plantes, l'eau et les habitats propres aident les animaux à vivre en sécurité.",
safetyFact:"Un bon Ranger observe les animaux à une distance sûre.",
learningTip:"Continue à explorer et à apprendre, petit Ranger !",
badgeTitle:"MES BADGES DE RANGER",badgeWelcome:"Gagne des badges en terminant les missions !",
badge1:"Jeune Ranger",badge2:"Ami des animaux",badge3:"Explorateur de la faune",
badge4:"Protecteur de la nature",badge5:"Champion Ranger",earned:"GAGNÉ",lockedBadge:"VERROUILLÉ",
progress:"Progression",missionsDone:"Missions terminées",badgeNeed1:"Termine la Mission 1",
badgeNeed3:"Termine 3 missions",badgeNeed5:"Termine 5 missions",badgeNeed8:"Termine 8 missions",
badgeNeed10:"Termine les 10 missions",parent:"ESPACE PARENTS",parentDashboard:"TABLEAU DE BORD PARENT",
parentPin:"Entre le code parent",enterPin:"ENTRER LE CODE",wrongPin:"Code incorrect",
parentStats:"PROGRÈS DU RANGER",totalStars:"Étoiles totales",completedMissions:"Missions terminées",
currentOutfit:"Tenue actuelle",language:"Langue",changePin:"CHANGER LE CODE",
newPin:"Nouveau code à 4 chiffres",savePin:"ENREGISTRER",parentInfo:"Informations parent",
parentText:"Wild Rangers Adventure encourage les enfants à explorer, apprendre et protéger la nature.",
resetProgress:"RÉINITIALISER",resetConfirm:"Réinitialiser toute la progression ?",yes:"OUI",no:"NON",
premium:"WILD RANGERS PLUS",premiumTitle:"PLUS D'AVENTURES RANGER",
premiumText:"Débloque des activités d'apprentissage, de futures missions et des récompenses spéciales.",
monthly:"MENSUEL",yearly:"ANNUEL",monthlyPrice:"9,99 $ / mois",yearlyPrice:"24,99 $ / an",
upgrade:"S'ABONNER",currentPlan:"PLAN ACTUEL",premiumSoon:"Les abonnements Premium seront connectés ici.",
freePlan:"RANGER GRATUIT",plusPlan:"RANGER PLUS",close:"FERMER",next:"SUIVANT",info:"INFO",
leoGuide:"LEO — GUIDE RANGER",askLeo:"DEMANDER À LEO",gotIt:"J'AI COMPRIS !",
leoWelcome:"Bonjour, petit Ranger ! Je suis Leo. Explorons ensemble !",
leoPark:"Explore doucement, apprends quelque chose et aide à protéger la nature !",
leoHint1:"Regarde bien les trois objets du Ranger. Peux-tu tous les trouver ?",
leoHint2:"Mimi adore les bananes ! Trouve les trois bananes pour l'aider.",
leoHint3:"Compte bien les zèbres. Touche le nombre qui correspond.",
leoHint4:"Cherche trois indices pour nous aider à retrouver Kimba.",
leoHint5:"Les pierres ont des numéros. Commence par 1 et suis l'ordre.",
leoHint6:"Tembo a besoin d'eau. Trouve les trois gouttes.",
leoHint7:"Regarde l'animal et choisis le bon mot.",
leoHint8:"Un Ranger aide à garder le parc propre. Trouve les trois déchets.",
leoHint9:"Regarde les traces. Quel animal pourrait les avoir laissées ?",
leoHint10:"Un Ranger a besoin d'équipement. Trouve les trois objets !",
leoGreat:"Excellent travail, Ranger ! Tu as réussi !",
leoTry:"Ce n'est pas grave ! Regarde encore et essaie.",
leoFact:"Voici un fait Ranger :",
leoLearn:"Apprendre fait partie du travail d'un Ranger !",
leoSafe:"Reste calme, garde une distance sûre et respecte les règles."
},

es:{
title:"GUARDIANES",adventure:"SALVAJES",tagline:"Explora. Aprende. Protege la naturaleza.",
welcome:"¡Bienvenido, pequeño Ranger!",start:"¡VAMOS A EXPLORAR!",footer:"¡Una aventura te espera!",
create:"CREA TU RANGER",choose:"Elige tu uniforme",go:"¡VAMOS!",back:"VOLVER",
hub:"PARQUE DE LA SABANA",hubWelcome:"¡Bienvenido al parque!",missions:"MISIONES",
animals:"ANIMALES",learn:"APRENDER",badges:"MIS MEDALLAS",outfit:"¡Elige tu uniforme!",
map:"ELIGE UNA MISIÓN",soon:"¡Muy pronto!",ok:"¡OK!",wildlife:"LIBRO DE ANIMALES",
animalFriends:"CONOCE A LOS ANIMALES",tapAnimal:"¡Toca un animal para aprender más!",
stars:"Estrellas",m1:"Ser un Ranger Junior",m2:"Conoce a Mimi",m3:"Cuenta las cebras",
m4:"Encuentra al cachorro de león",m5:"Cruza el río",m6:"Ayuda a Tembo a encontrar agua",
m7:"Palabras de animales",m8:"Limpia el parque",m9:"Descubre huellas",m10:"Desafío Ranger",
training:"Entrenamiento Ranger",instruction:"¡Toca cada objeto!",hat:"Sombrero",
mapItem:"Mapa del parque",badge:"Insignia Ranger",finish:"¡MISIÓN COMPLETADA!",
reward:"¡Ganaste una estrella!",continue:"CONTINUAR",collected:"Conseguido",great:"¡Muy bien!",
locked:"¡Completa la misión anterior!",task1:"¡Toca los 3 objetos Ranger!",
task2:"¡Ayuda a Mimi a encontrar 3 bananas!",task3:"¿Cuántas cebras puedes ver?",
task4:"¡Encuentra las 3 pistas!",task5:"¡Toca las piedras en orden!",
task6:"¡Toca las 3 gotas de agua!",task7:"¡Toca el animal que corresponde a la palabra!",
task8:"¡Toca los 3 residuos para limpiar el parque!",task9:"¿Qué animal dejó estas huellas?",
task10:"¡Completa el desafío final Ranger!",correct:"¡Correcto! ¡Muy bien!",wrong:"¡Inténtalo otra vez!",
success:"¡Excelente trabajo, Ranger!",animalsWord:"¿Qué animal es?",clean:"¡Parque limpio!",
trackQuestion:"¿Quién dejó estas huellas?",finalTask:"¡Toca los 3 objetos Ranger!",zebra:"Cebra",
lion:"León",elephant:"Elefante",monkey:"Mimi — Mona",lionCub:"Kimba — Cachorro de león",
giraffe:"Zuri — Jirafa",hippo:"Bongo — Hipopótamo",cheetah:"Chase — Guepardo",
temboName:"Tembo — Elefante",zaraName:"Zara — Cebra",banana:"Banana",water:"Agua",
rubbish:"Residuo",lionClue:"Pista del león",rangerItem:"Equipo Ranger",
learningTitle:"CENTRO DE APRENDIZAJE RANGER",learningWelcome:"¡Aprende sobre los animales y la naturaleza!",
learnWildlife:"ANIMALES",learnNature:"NATURALEZA",learnSafety:"SEGURIDAD RANGER",
factMonkey:"Los monos usan sus manos y colas para moverse entre los árboles.",
factLion:"Los cachorros de león permanecen cerca de sus madres mientras crecen.",
factElephant:"Los elefantes usan sus trompas para beber, oler y recoger cosas.",
factGiraffe:"Las jirafas usan sus largos cuellos para alcanzar hojas altas.",
factZebra:"Cada cebra tiene un patrón de rayas único.",
factHippo:"Los hipopótamos pasan mucho tiempo en el agua para mantenerse frescos.",
factCheetah:"Los guepardos están hechos para correr muy rápido durante distancias cortas.",
natureFact:"Las plantas, el agua y los hábitats limpios ayudan a los animales a vivir seguros.",
safetyFact:"Un buen Ranger observa a los animales desde una distancia segura.",
learningTip:"¡Sigue explorando y aprendiendo, pequeño Ranger!",
badgeTitle:"MIS MEDALLAS RANGER",badgeWelcome:"¡Consigue medallas completando misiones!",
badge1:"Ranger Junior",badge2:"Amigo de los animales",badge3:"Explorador de la fauna",
badge4:"Protector de la naturaleza",badge5:"Campeón Ranger",earned:"GANADA",lockedBadge:"BLOQUEADA",
progress:"Progreso",missionsDone:"Misiones completadas",badgeNeed1:"Completa la Misión 1",
badgeNeed3:"Completa 3 misiones",badgeNeed5:"Completa 5 misiones",badgeNeed8:"Completa 8 misiones",
badgeNeed10:"Completa las 10 misiones",parent:"ÁREA DE PADRES",parentDashboard:"PANEL DE PADRES",
parentPin:"Introduce el PIN de padres",enterPin:"INTRODUCIR PIN",wrongPin:"PIN incorrecto",
parentStats:"PROGRESO DEL RANGER",totalStars:"Estrellas totales",completedMissions:"Misiones completadas",
currentOutfit:"Uniforme actual",language:"Idioma",changePin:"CAMBIAR PIN",
newPin:"Nuevo PIN de 4 dígitos",savePin:"GUARDAR PIN",parentInfo:"Información para padres",
parentText:"Wild Rangers Adventure anima a los niños a explorar, aprender y cuidar la naturaleza.",
resetProgress:"REINICIAR PROGRESO",resetConfirm:"¿Reiniciar todo el progreso?",yes:"SÍ",no:"NO",
premium:"WILD RANGERS PLUS",premiumTitle:"MÁS AVENTURAS RANGER",
premiumText:"Desbloquea actividades de aprendizaje, futuras misiones y recompensas especiales.",
monthly:"MENSUAL",yearly:"ANUAL",monthlyPrice:"$9.99 / mes",yearlyPrice:"$24.99 / año",
upgrade:"ACTUALIZAR",currentPlan:"PLAN ACTUAL",premiumSoon:"Las suscripciones Premium se conectarán aquí.",
freePlan:"RANGER GRATIS",plusPlan:"RANGER PLUS",close:"CERRAR",next:"SIGUIENTE",info:"INFO",
leoGuide:"LEO — GUÍA RANGER",askLeo:"PREGUNTAR A LEO",gotIt:"¡ENTENDIDO!",
leoWelcome:"¡Hola, pequeño Ranger! Soy Leo. ¡Exploremos juntos!",
leoPark:"Explora con cuidado, aprende algo nuevo y ayuda a proteger la naturaleza.",
leoHint1:"Mira bien los tres objetos Ranger. ¿Puedes encontrarlos todos?",
leoHint2:"¡A Mimi le encantan las bananas! Encuentra las tres para ayudarla.",
leoHint3:"Cuenta las cebras con cuidado. Toca el número correcto.",
leoHint4:"Busca tres pistas que nos ayuden a encontrar a Kimba.",
leoHint5:"Las piedras tienen números. Empieza por el 1 y sigue el orden.",
leoHint6:"Tembo necesita agua. Encuentra las tres gotas.",
leoHint7:"Mira el animal y elige la palabra correcta.",
leoHint8:"Un Ranger ayuda a mantener limpio el parque. Encuentra los tres residuos.",
leoHint9:"Mira las huellas. ¿Qué animal pudo dejarlas?",
leoHint10:"Un Ranger necesita equipo. ¡Encuentra los tres objetos!",
leoGreat:"¡Fantástico trabajo, Ranger! ¡Lo lograste!",
leoTry:"¡No pasa nada! Mira otra vez e inténtalo.",
leoFact:"Aquí tienes un dato Ranger:",
leoLearn:"¡Aprender es parte de ser un buen Ranger!",
leoSafe:"Mantén la calma, observa desde una distancia segura y sigue las reglas."
}
};

const t=k=>L[lang]?.[k]||L.en[k]||k;

const CHARACTERS={
leo:"/assets/characters/Leo_Junior_Ranger.png",
mimi:"/assets/characters/Mimi_Monkey.png",
kimba:"/assets/characters/Kimba_Lion_Cub.png",
tembo:"/assets/characters/Tembo_Elephant.png",
zuri:"/assets/characters/Zuri_Giraffe.png",
zara:"/assets/characters/Zara_Zebra.png",
bongo:"/assets/characters/Bongo_Hippo.png",
chase:"/assets/characters/Chase_Cheetah.png"
};

/* =========================================================
   UI HELPERS
========================================================= */

function txt(s,x,y,str,size=23,color="#fff"){
 return s.add.text(x,y,str,{
  fontFamily:"Trebuchet MS,Arial",
  fontSize:size+"px",
  fontStyle:"bold",
  color,
  align:"center",
  wordWrap:{width:460},
  stroke:"#49331f",
  strokeThickness:2
 }).setOrigin(.5);
}

function btn(s,x,y,w,h,label,color,fn,size=22){
 const sh=s.add.graphics();
 sh.fillStyle(0x49321f,.3);
 sh.fillRoundedRect(x-w/2+3,y-h/2+7,w,h,20);

 const wh=s.add.graphics();
 wh.fillStyle(0xffffff,1);
 wh.fillRoundedRect(x-w/2,y-h/2,w,h,20);

 const face=s.add.graphics();
 face.fillStyle(color,1);
 face.fillRoundedRect(x-w/2+5,y-h/2+5,w-10,h-12,16);

 const lt=txt(s,x,y-2,label,size);

 const hit=s.add.rectangle(x,y,w,h,0xffffff,0)
  .setInteractive({useHandCursor:true});

 hit.on("pointerover",()=>{
  s.tweens.add({targets:[face,lt],scale:1.03,duration:100});
 });

 hit.on("pointerout",()=>{
  s.tweens.add({targets:[face,lt],scale:1,duration:100});
 });

 hit.on("pointerdown",()=>{
  startAudio();
  soundTap();
  s.tweens.add({
   targets:[face,lt],
   scale:.96,
   duration:70,
   yoyo:true
  });
  fn();
 });

 return hit;
}

function popIn(s,o,delay=0){
 o.setScale(.85);
 o.setAlpha(0);

 s.tweens.add({
  targets:o,
  scale:1,
  alpha:1,
  duration:350,
  delay,
  ease:"Back.Out"
 });

 return o;
}

function pulse(s,o){
 s.tweens.add({
  targets:o,
  scale:1.06,
  duration:180,
  yoyo:true,
  ease:"Sine.easeInOut"
 });
}

function fadeScene(s,next,data={}){
 startAudio();

 const c=s.add.rectangle(
  W/2,H/2,W,H,
  0x183d29,0
 );

 s.tweens.add({
  targets:c,
  alpha:1,
  duration:220,
  onComplete:()=>{
   s.scene.start(next,data);
  }
 });
}

function savannah(s){
 const g=s.add.graphics();

 g.fillGradientStyle(
  0x65c9ed,
  0x65c9ed,
  0xb2e9f6,
  0xb2e9f6,
  1
 );

 g.fillRect(0,0,W,H);

 g.fillStyle(0xffe36b,1);
 g.fillCircle(440,140,48);

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

 for(let i=0;i<14;i++){
  const x=20+i*42;
  const y=900-(i%4)*35;

  g.lineStyle(3,0x4f9837,1);
  g.beginPath();
  g.moveTo(x,y);
  g.lineTo(x-5,y-18);
  g.moveTo(x,y);
  g.lineTo(x+6,y-22);
  g.strokePath();
 }
}

function character(s,key,x,y,height=180){
 const im=s.add.image(x,y,key);

 im.setScale(height/im.height);

 s.tweens.add({
  targets:im,
  y:y-5,
  duration:1400+Math.random()*400,
  yoyo:true,
  repeat:-1,
  ease:"Sine.easeInOut"
 });

 return im;
}

/* =========================================================
   LEO RANGER GUIDE
========================================================= */

function leoGuide(s,message){
 startAudio();
 soundGuide();

 const overlay=s.add.container(0,0);

 const box=s.add.graphics();
 box.fillStyle(0x183d29,.98);
 box.fillRoundedRect(25,250,490,390,28);

 const portrait=character(s,"leo",105,350,145);

 const title=txt(
  s,
  270,
  285,
  t("leoGuide"),
  24,
  "#ffdf65"
 );

 const body=txt(
  s,
  295,
  400,
  message,
  20,
  "#fff6c7"
 );

 overlay.add([
  box,
  portrait,
  title,
  body
 ]);

 const ok=btn(
  s,
  270,
  555,
  190,
  58,
  t("gotIt"),
  0x35a85b,
  ()=>{
   overlay.destroy(true);
   ok.destroy();

   if(s.soundGuideActive){
    s.soundGuideActive=false;
   }
  },
  18
 );

 overlay.setDepth(100);
 ok.setDepth(101);

 s.soundGuideActive=true;

 return overlay;
}

function guideButton(s,x,y,message){
 return btn(
  s,
  x,
  y,
  170,
  52,
  "🤖 "+t("askLeo"),
  0x6d5acb,
  ()=>leoGuide(s,message),
  16
 );
}

/* =========================================================
   BASE SCENE
========================================================= */

class BaseScene extends Phaser.Scene{
 preload(){
  Object.entries(CHARACTERS).forEach(([k,p])=>{
   this.load.image(k,p);
  });
 }

 audio(){
  audioControl(this);
  startAmbient();
 }
}

/* =========================================================
   HOME
========================================================= */

class Home extends BaseScene{
 constructor(){super("Home");}

 create(){
  startAudio();
  this.audio();

  savannah(this);

  txt(this,270,70,t("title"),37,"#fff6c7");
  txt(this,270,115,t("adventure"),29,"#ffdf65");
  txt(this,270,195,t("tagline"),18);

  const r=character(this,"leo",270,450,360);

  this.tweens.add({
   targets:r,
   y:444,
   duration:1200,
   yoyo:true,
   repeat:-1
  });

  txt(this,270,625,t("welcome"),24,"#fff6c7");

  btn(
   this,
   270,
   755,
   420,
   78,
   t("start"),
   0x35a85b,
   ()=>{
    startAudio();
    startAmbient();
    fadeScene(this,"Ranger");
   },
   24
  );

  txt(this,270,825,t("footer"),18);

  ["en","fr","es"].forEach((l,i)=>{
   btn(
    this,
    170+i*100,
    900,
    82,
    48,
    l.toUpperCase(),
    lang===l?0xe5a52f:0x3d83c5,
    ()=>{
     lang=l;
     localStorage.setItem("wr_v1_lang",l);
     this.scene.restart();
    },
    17
   );
  });
 }
}

/* =========================================================
   RANGER CREATION
========================================================= */

class Ranger extends BaseScene{
 constructor(){super("Ranger");}

 create(){
  this.audio();

  savannah(this);

  txt(this,270,75,t("create"),30);
  txt(this,270,125,t("choose"),21);

  let chosen=Number(localStorage.getItem("wr_v1_outfit"))||0;

  character(this,"leo",270,430,360);

  outfitColors.forEach((col,i)=>{
   const x=90+i*120;
   const g=this.add.graphics();

   g.fillStyle(0xffffff,1);
   g.fillRoundedRect(x-39,635,78,78,16);

   g.fillStyle(col,1);
   g.fillRoundedRect(x-32,642,64,64,13);

   if(i===chosen){
    g.lineStyle(5,0xffe05d,1);
    g.strokeRoundedRect(x-39,635,78,78,16);
   }

   this.add.rectangle(
    x,674,85,90,0xffffff,0
   )
   .setInteractive()
   .on("pointerdown",()=>{
    startAudio();
    soundTap();

    chosen=i;
    localStorage.setItem("wr_v1_outfit",i);
    this.scene.restart();
   });
  });

  txt(this,270,755,t("outfit"),21);

  btn(
   this,
   270,
   835,
   370,
   72,
   t("go"),
   0x35a85b,
   ()=>fadeScene(this,"Park"),
   25
  );

  btn(
   this,
   100,
   920,
   150,
   52,
   t("back"),
   0x3d83c5,
   ()=>fadeScene(this,"Home"),
   19
  );
 }
}

/* =========================================================
   PARK
========================================================= */

class Park extends BaseScene{
 constructor(){super("Park");}

 create(){
  this.audio();

  savannah(this);

  txt(this,270,55,t("hub"),31);
  txt(this,270,100,t("hubWelcome"),20);

  character(this,"leo",270,315,220);

  txt(
   this,
   270,
   455,
   `⭐ ${t("stars")}: ${stars}`,
   23
  );

  btn(
   this,
   145,
   555,
   220,
   82,
   "🌟 "+t("missions"),
   0x35a85b,
   ()=>fadeScene(this,"Missions"),
   19
  );

  btn(
   this,
   395,
   555,
   220,
   82,
   "🦓 "+t("animals"),
   0xe5a52f,
   ()=>fadeScene(this,"Wildlife"),
   19
  );

  btn(
   this,
   145,
   670,
   220,
   82,
   "📚 "+t("learn"),
   0x3d83c5,
   ()=>fadeScene(this,"Learning"),
   19
  );

  btn(
   this,
   395,
   670,
   220,
   82,
   "🏅 "+t("badges"),
   0xb86ac9,
   ()=>fadeScene(this,"Badges"),
   18
  );

  guideButton(
   this,
   145,
   785,
   t("leoPark")
  );

  btn(
   this,
   395,
   785,
   220,
   68,
   "⭐ "+t("premium"),
   0xd89b28,
   ()=>fadeScene(this,"Premium"),
   16
  );

  btn(
   this,
   270,
   895,
   220,
   55,
   t("back"),
   0x3d83c5,
   ()=>fadeScene(this,"Home"),
   19
  );
 }
}

/* =========================================================
   WILDLIFE
========================================================= */

class Wildlife extends BaseScene{
 constructor(){super("Wildlife");}

 create(){
  this.audio();

  savannah(this);

  txt(this,270,50,t("wildlife"),31,"#fff6c7");
  txt(this,270,95,t("animalFriends"),20);
  txt(this,270,130,t("tapAnimal"),15,"#fff6c7");

  const animals=[
   ["mimi","🐒",t("monkey"),t("factMonkey")],
   ["kimba","🦁",t("lionCub"),t("factLion")],
   ["tembo","🐘",t("temboName"),t("factElephant")],
   ["zuri","🦒",t("giraffe"),t("factGiraffe")],
   ["zara","🦓",t("zaraName"),t("factZebra")],
   ["bongo","🦛",t("hippo"),t("factHippo")],
   ["chase","🐆",t("cheetah"),t("factCheetah")]
  ];

  animals.forEach((a,i)=>{
   const col=i%2;
   const row=Math.floor(i/2);
   const x=145+col*250;
   const y=245+row*150;

   const card=this.add.graphics();

   card.fillStyle(0xffffff,.96);
   card.fillRoundedRect(x-105,y-60,210,120,22);

   popIn(
    this,
    character(this,a[0],x-45,y,100),
    i*60
   );

   popIn(
    this,
    txt(this,x+50,y,a[2],13,"#315b35"),
    i*60
   );

   this.add.rectangle(
    x,y,210,120,0xffffff,0
   )
   .setInteractive({useHandCursor:true})
   .on("pointerdown",()=>{
    startAudio();
    soundTap();
    this.showAnimal(a);
   });
  });

  btn(
   this,
   270,
   875,
   230,
   58,
   t("back"),
   0x3d83c5,
   ()=>fadeScene(this,"Park"),
   20
  );
 }

 showAnimal(a){
  const o=this.add.graphics();

  o.fillStyle(0x183d29,.98);
  o.fillRoundedRect(30,160,480,590,28);

  character(this,a[0],270,350,230);

  txt(this,270,505,a[2],25,"#fff6c7");
  txt(this,270,555,a[1],42);
  txt(this,270,615,"🤖 "+t("leoFact"),17,"#ffdf65");
  txt(this,270,670,a[3],17,"#fff");

  btn(
   this,
   270,
   725,
   140,
   50,
   t("close"),
   0x35a85b,
   ()=>this.scene.restart(),
   18
  );
 }
}

/* =========================================================
   LEARNING
========================================================= */

class Learning extends BaseScene{
 constructor(){super("Learning");}

 create(){
  this.audio();

  savannah(this);

  txt(this,270,55,t("learningTitle"),25,"#fff6c7");
  txt(this,270,105,t("learningWelcome"),17);

  btn(
   this,
   270,
   200,
   390,
   82,
   "🦁 "+t("learnWildlife"),
   0x35a85b,
   ()=>this.showLesson("wildlife"),
   20
  );

  btn(
   this,
   270,
   320,
   390,
   82,
   "🌱 "+t("learnNature"),
   0x3d83c5,
   ()=>this.showLesson("nature"),
   20
  );

  btn(
   this,
   270,
   440,
   390,
   82,
   "🛡️ "+t("learnSafety"),
   0xe5a52f,
   ()=>this.showLesson("safety"),
   20
  );

  character(this,"leo",270,675,230);

  txt(this,270,820,t("learningTip"),18,"#fff6c7");

  guideButton(
   this,
   270,
   875,
   t("leoLearn")
  );

  btn(
   this,
   270,
   935,
   170,
   42,
   t("back"),
   0x3d83c5,
   ()=>fadeScene(this,"Park"),
   16
  );
 }

 showLesson(type){
  let title="";
  let fact="";

  if(type==="wildlife"){
   title=t("learnWildlife");

   fact=Phaser.Utils.Array.GetRandom([
    "🐒 "+t("factMonkey"),
    "🦁 "+t("factLion"),
    "🐘 "+t("factElephant"),
    "🦒 "+t("factGiraffe"),
    "🦓 "+t("factZebra"),
    "🦛 "+t("factHippo"),
    "🐆 "+t("factCheetah")
   ]);
  }

  if(type==="nature"){
   title=t("learnNature");
   fact="🌿 "+t("natureFact");
  }

  if(type==="safety"){
   title=t("learnSafety");
   fact="🛡️ "+t("safetyFact");
  }

  const o=this.add.graphics();

  o.fillStyle(0x183d29,.98);
  o.fillRoundedRect(30,225,480,430,28);

  txt(this,270,290,title,27,"#fff6c7");
  txt(this,270,435,fact,21,"#fff");
  txt(this,270,535,"🤖 "+t("leoLearn"),17,"#ffdf65");

  btn(
   this,
   270,
   600,
   150,
   55,
   t("close"),
   0x35a85b,
   ()=>this.scene.restart(),
   19
  );
 }
}

/* =========================================================
   BADGES
========================================================= */

class Badges extends BaseScene{
 constructor(){super("Badges");}

 create(){
  this.audio();

  savannah(this);

  txt(this,270,55,t("badgeTitle"),29,"#fff6c7");
  txt(this,270,100,t("badgeWelcome"),17);

  const data=[
   ["🌱",t("badge1"),1,t("badgeNeed1")],
   ["🐾",t("badge2"),3,t("badgeNeed3")],
   ["🔭",t("badge3"),5,t("badgeNeed5")],
   ["🌍",t("badge4"),8,t("badgeNeed8")],
   ["🏆",t("badge5"),10,t("badgeNeed10")]
  ];

  data.forEach((b,i)=>{
   const y=180+i*125;
   const earned=completed.length>=b[2];

   const c=this.add.graphics();

   c.fillStyle(
    earned?0xfff4c2:0xffffff,
    .97
   );

   c.fillRoundedRect(55,y-42,430,92,20);

   popIn(
    this,
    txt(this,105,y,b[0],42),
    i*80
   );

   txt(
    this,
    290,
    y-12,
    b[1],
    19,
    "#315b35"
   );

   txt(
    this,
    290,
    y+20,
    earned?t("earned"):b[3],
    14,
    earned?"#d08b16":"#777"
   );
  });

  txt(
   this,
   270,
   820,
   `${t("progress")}: ${completed.length} / 10`,
   21
  );

  btn(
   this,
   270,
   895,
   210,
   55,
   t("back"),
   0x3d83c5,
   ()=>fadeScene(this,"Park"),
   19
  );
 }
}

/* =========================================================
   PARENT LOGIN
========================================================= */

class ParentLogin extends BaseScene{
 constructor(){super("ParentLogin");}

 create(){
  this.audio();

  savannah(this);

  txt(this,270,180,"🔒",70);
  txt(this,270,285,t("parent"),30,"#fff6c7");
  txt(this,270,335,t("parentPin"),20);

  this.pin="";

  this.display=txt(
   this,
   270,
   415,
   "----",
   32,
   "#fff6c7"
  );

  [1,2,3,4,5,6,7,8,9,0].forEach((num,i)=>{
   const x=i===9?270:135+(i%3)*135;
   const y=i===9?785:545+Math.floor(i/3)*80;

   btn(
    this,
    x,
    y,
    105,
    60,
    String(num),
    0x3d83c5,
    ()=>{
     if(this.pin.length>=4)return;

     this.pin+=String(num);

     this.display.setText(
      "•".repeat(this.pin.length)
     );

     if(this.pin.length===4){
      if(this.pin===parentPin){
       fadeScene(this,"ParentDashboard");
      }else{
       soundWrong();

       this.display.setText(
        t("wrongPin")
       );

       this.time.delayedCall(
        900,
        ()=>{
         this.pin="";
         this.display.setText("----");
        }
       );
      }
     }
    },
    24
   );
  });

  btn(
   this,
   270,
   875,
   180,
   55,
   t("back"),
   0x3d83c5,
   ()=>fadeScene(this,"Park"),
   19
  );
 }
}

/* =========================================================
   PARENT DASHBOARD
========================================================= */

class ParentDashboard extends BaseScene{
 constructor(){super("ParentDashboard");}

 create(){
  this.audio();

  savannah(this);

  txt(this,270,55,t("parentDashboard"),27,"#fff6c7");
  txt(this,270,105,t("parentStats"),19);

  const p=this.add.graphics();

  p.fillStyle(0xffffff,.96);
  p.fillRoundedRect(45,145,450,300,25);

  txt(this,270,190,`⭐ ${t("totalStars")}: ${stars}`,22,"#315b35");
  txt(this,270,245,`🎯 ${t("completedMissions")}: ${completed.length} / 10`,20,"#315b35");
  txt(this,270,300,`🌍 ${t("language")}: ${lang.toUpperCase()}`,20,"#315b35");
  txt(this,270,355,`🎒 ${t("currentOutfit")}: ${Number(localStorage.getItem("wr_v1_outfit"))+1}`,19,"#315b35");

  txt(
   this,
   270,
   400,
   completed.length===10
    ?"🏆 "+t("badge5")
    :`${t("missionsDone")}: ${completed.length}`,
   19,
   "#315b35"
  );

  btn(
   this,
   155,
   525,
   210,
   65,
   "🔑 "+t("changePin"),
   0x6d5acb,
   ()=>this.changePin(),
   17
  );

  btn(
   this,
   385,
   525,
   210,
   65,
   "🌐 "+t("language"),
   0x3d83c5,
   ()=>this.changeLanguage(),
   17
  );

  btn(
   this,
   270,
   635,
   300,
   65,
   "ℹ️ "+t("parentInfo"),
   0x35a85b,
   ()=>this.showInfo(),
   17
  );

  btn(
   this,
   270,
   735,
   300,
   65,
   "⚠️ "+t("resetProgress"),
   0xc75c4a,
   ()=>this.resetProgress(),
   17
  );

  btn(
   this,
   270,
   875,
   210,
   55,
   t("back"),
   0x3d83c5,
   ()=>fadeScene(this,"Park"),
   19
  );
 }

 changePin(){
  const o=this.add.graphics();

  o.fillStyle(0x183d29,.98);
  o.fillRoundedRect(35,270,470,330,25);

  txt(this,270,330,t("changePin"),25,"#fff6c7");

  let value="";

  const d=txt(
   this,
   270,
   390,
   "----",
   30
  );

  [1,2,3,4,5,6,7,8,9,0].forEach((n,i)=>{
   const x=i===9?270:150+(i%3)*120;
   const y=i===9?545:450+Math.floor(i/3)*55;

   btn(
    this,
    x,
    y,
    80,
    45,
    String(n),
    0x3d83c5,
    ()=>{
     if(value.length<4){
      value+=String(n);
      d.setText("•".repeat(value.length));
     }
    },
    18
   );
  });

  btn(
   this,
   270,
   590,
   150,
   48,
   t("savePin"),
   0x35a85b,
   ()=>{
    if(value.length===4){
     parentPin=value;
     localStorage.setItem(
      "wr_v1_parent_pin",
      value
     );
     this.scene.restart();
    }
   },
   17
  );
 }

 changeLanguage(){
  lang=lang==="en"
   ?"fr"
   :lang==="fr"
    ?"es"
    :"en";

  localStorage.setItem(
   "wr_v1_lang",
   lang
  );

  this.scene.restart();
 }

 showInfo(){
  const o=this.add.graphics();

  o.fillStyle(0x183d29,.98);
  o.fillRoundedRect(35,300,470,320,25);

  txt(
   this,
   270,
   360,
   t("parentInfo"),
   25,
   "#fff6c7"
  );

  txt(
   this,
   270,
   470,
   t("parentText"),
   20
  );

  btn(
   this,
   270,
   560,
   140,
   50,
   t("close"),
   0x35a85b,
   ()=>this.scene.restart(),
   18
  );
 }

 resetProgress(){
  const o=this.add.graphics();

  o.fillStyle(0x4b1f1f,.98);
  o.fillRoundedRect(45,330,450,250,25);

  txt(
   this,
   270,
   390,
   t("resetConfirm"),
   21
  );

  btn(
   this,
   175,
   500,
   150,
   55,
   t("yes"),
   0xc75c4a,
   ()=>{
    stars=0;
    completed=[];

    localStorage.setItem(
     "wr_v1_stars",
     "0"
    );

    localStorage.setItem(
     "wr_v1_completed",
     "[]"
    );

    this.scene.restart();
   },
   19
  );

  btn(
   this,
   365,
   500,
   150,
   55,
   t("no"),
   0x35a85b,
   ()=>this.scene.restart(),
   19
  );
 }
}

/* =========================================================
   PREMIUM
========================================================= */

class Premium extends BaseScene{
 constructor(){super("Premium");}

 create(){
  this.audio();

  savannah(this);

  txt(this,270,65,"⭐ "+t("premium"),29,"#fff6c7");
  txt(this,270,135,t("premiumTitle"),25);

  character(this,"leo",270,310,210);

  txt(this,270,465,t("premiumText"),19);

  btn(
   this,
   270,
   570,
   370,
   75,
   "🌟 "+t("monthly")+" — "+t("monthlyPrice"),
   0xe5a52f,
   ()=>this.premiumMessage(),
   18
  );

  btn(
   this,
   270,
   675,
   370,
   75,
   "🏆 "+t("yearly")+" — "+t("yearlyPrice"),
   0xd89b28,
   ()=>this.premiumMessage(),
   18
  );

  txt(this,270,770,t("freePlan"),18,"#fff6c7");

  btn(
   this,
   270,
   875,
   210,
   55,
   t("back"),
   0x3d83c5,
   ()=>fadeScene(this,"Park"),
   19
  );
 }

 premiumMessage(){
  const o=this.add.graphics();

  o.fillStyle(0x183d29,.98);
  o.fillRoundedRect(35,335,470,250,25);

  txt(
   this,
   270,
   410,
   "⭐ "+t("premium"),
   25,
   "#fff6c7"
  );

  txt(
   this,
   270,
   480,
   t("premiumSoon"),
   19
  );

  btn(
   this,
   270,
   545,
   130,
   48,
   t("ok"),
   0x35a85b,
   ()=>this.scene.restart(),
   18
  );
 }
}

/* =========================================================
   MISSIONS
========================================================= */

class Missions extends BaseScene{
 constructor(){super("Missions");}

 create(){
  this.audio();

  savannah(this);

  txt(this,270,50,t("map"),28);

  txt(
   this,
   270,
   95,
   `⭐ ${stars} ${t("stars")}`,
   20
  );

  for(let i=0;i<10;i++){
   const unlocked=
    i===0||completed.includes(i-1);

   const done=
    completed.includes(i);

   const x=145+(i%2)*250;
   const y=190+Math.floor(i/2)*125;

   btn(
    this,
    x,
    y,
    220,
    96,
    `${done?"✅":unlocked?"🌟":"🔒"} ${i+1}. ${t("m"+(i+1))}`,
    done
     ?0x65a84b
     :unlocked
      ?0xe5a52f
      :0x78909c,
    ()=>{
     if(!unlocked){
      this.popup(t("locked"));
      return;
     }

     fadeScene(
      this,
      "MissionPlay",
      {idx:i}
     );
    },
    15
   );
  }

  btn(
   this,
   270,
   875,
   230,
   58,
   t("back"),
   0x3d83c5,
   ()=>fadeScene(this,"Park"),
   20
  );
 }

 popup(message){
  const g=this.add.graphics();

  g.fillStyle(0x315b35,.97);
  g.fillRoundedRect(45,390,450,155,22);

  txt(this,270,440,message,22);

  btn(
   this,
   270,
   500,
   130,
   48,
   t("ok"),
   0x35a85b,
   ()=>this.scene.restart(),
   19
  );
 }
}

/* =========================================================
   MISSION PLAY
========================================================= */

class MissionPlay extends BaseScene{
 constructor(){super("MissionPlay");}

 init(data){
  this.idx=data.idx||0;
 }

 create(){
  this.audio();

  savannah(this);

  const n=this.idx+1;

  txt(
   this,
   270,
   48,
   t("m"+n),
   27
  );

  character(
   this,
   "leo",
   95,
   205,
   145
  );

  txt(
   this,
   270,
   310,
   t("task"+n),
   21,
   "#fff6c7"
  );

  guideButton(
   this,
   420,
   205,
   t("leoHint"+n)
  );

  this.feedback=txt(
   this,
   270,
   835,
   "",
   20,
   "#fff6c7"
  );

  this.count=0;
  this.finished=false;

  if(n===3)this.makeCountQuiz();
  else if(n===5)this.makeOrderGame();
  else if(n===7)this.makeAnimalWords();
  else if(n===9)this.makeTracksQuiz();
  else this.makeTapGame(n);

  btn(
   this,
   270,
   920,
   220,
   52,
   t("back"),
   0x3d83c5,
   ()=>fadeScene(this,"Missions"),
   19
  );
 }

 makeTapGame(n){
  let items=[];

  if(n===1){
   items=[
    ["🧢",t("hat")],
    ["🗺️",t("mapItem")],
    ["🏅",t("badge")]
   ];
  }

  if(n===2){
   items=[
    ["🍌",t("banana")],
    ["🍌",t("banana")],
    ["🍌",t("banana")]
   ];

   character(
    this,
    "mimi",
    400,
    450,
    190
   );
  }

  if(n===4){
   items=[
    ["🐾",t("lionClue")],
    ["🟡",t("lionClue")],
    ["🌳",t("lionClue")]
   ];

   character(
    this,
    "kimba",
    400,
    450,
    180
   );
  }

  if(n===6){
   items=[
    ["💧",t("water")],
    ["💧",t("water")],
    ["💧",t("water")]
   ];

   character(
    this,
    "tembo",
    400,
    450,
    190
   );
  }

  if(n===8){
   items=[
    ["🥫",t("rubbish")],
    ["🧴",t("rubbish")],
    ["🗑️",t("rubbish")]
   ];

   character(
    this,
    "bongo",
    400,
    450,
    180
   );
  }

  if(n===10){
   items=[
    ["🧢",t("rangerItem")],
    ["🗺️",t("rangerItem")],
    ["🏅",t("rangerItem")]
   ];
  }

  const spots=[
   {x:105,y:560},
   {x:270,y:650},
   {x:435,y:560}
  ];

  this.status=txt(
   this,
   270,
   770,
   `${t("collected")}: 0 / 3`,
   22
  );

  items.forEach((item,i)=>{
   const p=spots[i];

   const g=this.add.graphics();

   g.fillStyle(0xffffff,1);
   g.fillRoundedRect(
    p.x-55,
    p.y-55,
    110,
    110,
    18
   );

   txt(
    this,
    p.x,
    p.y-8,
    item[0],
    42
   );

   txt(
    this,
    p.x,
    p.y+35,
    item[1],
    13,
    "#315b35"
   );

   this.add.rectangle(
    p.x,
    p.y,
    110,
    110,
    0xffffff,
    0
   )
   .setInteractive({useHandCursor:true})
   .on("pointerdown",()=>{
    if(g.getData("found")||this.finished)return;

    startAudio();
    soundCollect();

    g.setData("found",true);

    g.clear();

    g.fillStyle(0x65a84b,1);

    g.fillRoundedRect(
     p.x-55,
     p.y-55,
     110,
     110,
     18
    );

    txt(
     this,
     p.x,
     p.y,
     "✅",
     42
    );

    this.count++;

    this.status.setText(
     `${t("collected")}: ${this.count} / 3`
    );

    this.feedback.setText(
     t("great")
    );

    pulse(
     this,
     this.feedback
    );

    if(this.count===3){
     this.win();
    }
   });
  });
 }

 makeCountQuiz(){
  character(
   this,
   "zara",
   270,
   445,
   230
  );

  txt(
   this,
   270,
   580,
   "🦓  🦓  🦓  🦓  🦓",
   38
  );

  Phaser.Utils.Array.Shuffle(
   [3,4,5,6]
  ).forEach((a,i)=>{
   btn(
    this,
    145+(i%2)*250,
    680+Math.floor(i/2)*90,
    180,
    65,
    String(a),
    0xe5a52f,
    ()=>{
     if(this.finished)return;

     if(a===5){
      soundCorrect();

      this.feedback.setText(
       "⭐ "+t("correct")
      );

      pulse(
       this,
       this.feedback
      );

      this.win();
     }else{
      soundWrong();

      this.feedback.setText(
       "💡 "+t("wrong")
      );

      leoGuide(
       this,
       t("leoTry")
      );
     }
    },
    28
   );
  });
 }

 makeOrderGame(){
  character(
   this,
   "tembo",
   270,
   270,
   170
  );

  let stones=[1,2,3,4];

  Phaser.Utils.Array.Shuffle(
   stones
  );

  this.order=1;

  this.status=txt(
   this,
   270,
   800,
   "0 / 4",
   22
  );

  stones.forEach((num,i)=>{
   const x=90+(i%2)*350;
   const y=475+Math.floor(i/2)*150;

   const g=this.add.graphics();

   g.fillStyle(0xc2d0d0,1);
   g.fillEllipse(x,y,115,80);

   txt(
    this,
    x,
    y,
    String(num),
    28,
    "#315b35"
   );

   this.add.rectangle(
    x,
    y,
    120,
    90,
    0xffffff,
    0
   )
   .setInteractive()
   .on("pointerdown",()=>{
    if(this.finished)return;

    startAudio();

    if(num===this.order){
     soundCorrect();

     this.order++;

     txt(
      this,
      x,
      y,
      "✓",
      25,
      "#315b35"
     );

     this.status.setText(
      `${this.order-1} / 4`
     );

     this.feedback.setText(
      "⭐ "+t("great")
     );

     if(this.order===5){
      this.win();
     }
    }else{
     soundWrong();

     this.feedback.setText(
      "💡 "+t("wrong")
     );

     leoGuide(
      this,
      t("leoHint5")
     );
    }
   });
  });
 }

 makeAnimalWords(){
  character(
   this,
   "zara",
   270,
   400,
   180
  );

  txt(
   this,
   270,
   520,
   t("animalsWord"),
   22
  );

  Phaser.Utils.Array.Shuffle([
   {
    e:"🦓",
    name:t("zebra"),
    ok:true
   },
   {
    e:"🦁",
    name:t("lion"),
    ok:false
   },
   {
    e:"🐘",
    name:t("elephant"),
    ok:false
   }
  ]).forEach((o,i)=>{
   btn(
    this,
    270,
    610+i*90,
    300,
    70,
    `${o.e} ${o.name}`,
    0xe5a52f,
    ()=>{
     if(this.finished)return;

     if(o.ok){
      soundCorrect();

      this.feedback.setText(
       "⭐ "+t("correct")
      );

      this.win();
     }else{
      soundWrong();

      this.feedback.setText(
       "💡 "+t("wrong")
      );

      leoGuide(
       this,
       t("leoHint7")
      );
     }
    },
    22
   );
  });
 }

 makeTracksQuiz(){
  character(
   this,
   "kimba",
   270,
   385,
   170
  );

  txt(
   this,
   270,
   515,
   "🐾 🐾 🐾",
   42
  );

  txt(
   this,
   270,
   570,
   t("trackQuestion"),
   21
  );

  Phaser.Utils.Array.Shuffle([
   {
    e:"🦁",
    name:t("lion"),
    ok:true
   },
   {
    e:"🦓",
    name:t("zebra"),
    ok:false
   },
   {
    e:"🐘",
    name:t("elephant"),
    ok:false
   }
  ]).forEach((o,i)=>{
   btn(
    this,
    270,
    650+i*75,
    300,
    60,
    `${o.e} ${o.name}`,
    0xe5a52f,
    ()=>{
     if(this.finished)return;

     if(o.ok){
      soundCorrect();

      this.feedback.setText(
       "⭐ "+t("correct")
      );

      this.win();
     }else{
      soundWrong();

      this.feedback.setText(
       "💡 "+t("wrong")
      );

      leoGuide(
       this,
       t("leoHint9")
      );
     }
    },
    22
   );
  });
 }

 win(){
  if(this.finished)return;

  this.finished=true;

  soundWin();

  this.feedback.setText(
   "🎉 "+t("success")+" ⭐"
  );

  pulse(
   this,
   this.feedback
  );

  leoGuide(
   this,
   t("leoGreat")
  );

  this.time.delayedCall(
   1600,
   ()=>{
    fadeScene(
     this,
     "Complete",
     {mission:this.idx}
    );
   }
  );
 }
}

/* =========================================================
   MISSION COMPLETE
========================================================= */

class Complete extends BaseScene{
 constructor(){super("Complete");}

 init(data){
  this.mission=data.mission??0;
 }

 create(){
  this.audio();

  savannah(this);

  if(!completed.includes(this.mission)){
   completed.push(this.mission);
   stars++;

   localStorage.setItem(
    "wr_v1_completed",
    JSON.stringify(completed)
   );

   localStorage.setItem(
    "wr_v1_stars",
    String(stars)
   );
  }

  soundWin();

  txt(
   this,
   270,
   170,
   t("finish"),
   30,
   "#fff6c7"
  );

  const trophy=txt(
   this,
   270,
   285,
   "🏆",
   100
  );

  this.tweens.add({
   targets:trophy,
   scale:1.15,
   duration:500,
   yoyo:true,
   repeat:-1,
   ease:"Sine.easeInOut"
  });

  this.celebrate();

  txt(
   this,
   270,
   405,
   t("m"+(this.mission+1)),
   25
  );

  txt(
   this,
   270,
   480,
   t("reward"),
   23
  );

  const st=txt(
   this,
   270,
   540,
   `⭐ ${t("stars")}: ${stars}`,
   23
  );

  this.tweens.add({
   targets:st,
   scale:1.08,
   duration:600,
   yoyo:true,
   repeat:-1
  });

  character(
   this,
   "leo",
   270,
   655,
   210
  );

  btn(
   this,
   270,
   775,
   340,
   70,
   t("continue"),
   0x35a85b,
   ()=>fadeScene(this,"Missions"),
   23
  );

  btn(
   this,
   270,
   865,
   250,
   58,
   t("hub"),
   0x3d83c5,
   ()=>fadeScene(this,"Park"),
   20
  );
 }

 celebrate(){
  [
   "⭐","✨","🎉","🏆","⭐",
   "✨","🎊","🌟","⭐","🎉"
  ].forEach((e,i)=>{
   const x=35+Math.random()*470;
   const y=170+Math.random()*600;

   const a=txt(
    this,
    x,
    y,
    e,
    25
   );

   a.setAlpha(0);

   this.tweens.add({
    targets:a,
    alpha:1,
    y:y-100,
    duration:900,
    delay:i*80,
    yoyo:true,
    ease:"Sine.easeOut",
    onComplete:()=>a.destroy()
   });
  });
 }
}

/* =========================================================
   START GAME
========================================================= */

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
  Wildlife,
  Learning,
  Badges,
  ParentLogin,
  ParentDashboard,
  Premium,
  Missions,
  MissionPlay,
  Complete
 ]
});