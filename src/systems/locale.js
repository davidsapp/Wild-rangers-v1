// =========================================================
// WILD RANGERS ADVENTURE
// LOCALIZATION SYSTEM
// =========================================================

import { OUTFIT_COLORS } from "../data/characters.js";

export const outfitColors = OUTFIT_COLORS;

export let lang =
  localStorage.getItem("wr_v1_lang") || "en";

// =========================================================
// TRANSLATIONS
// =========================================================

export const L = {
  // =======================================================
  // ENGLISH
  // =======================================================

  en: {
    title: "WILD RANGERS",
    adventure: "ADVENTURE",
    tagline:
      "Explore. Learn. Protect Nature.",
    welcome:
      "Welcome, Little Ranger!",
    start: "LET'S EXPLORE!",
    footer:
      "A wild adventure awaits!",
    create: "CREATE YOUR RANGER",
    choose:
      "Choose your ranger outfit",
    go: "LET'S GO!",
    back: "BACK",

    hub: "SAVANNAH PARK",
    hubWelcome:
      "Welcome to the park!",
    missions: "MISSIONS",
    animals: "ANIMALS",
    learn: "LEARNING",
    badges: "MY BADGES",
    outfit: "Choose your outfit!",
    map: "CHOOSE A MISSION",
    soon: "Coming soon!",
    ok: "OK!",

    wildlife: "WILDLIFE BOOK",
    animalFriends:
      "MEET THE ANIMALS",
    tapAnimal:
      "Tap an animal to learn more!",
    stars: "Stars",

    m1: "Become a Junior Ranger",
    m2: "Meet Mimi",
    m3: "Count the Zebra Herd",
    m4: "Find the Lost Lion Cub",
    m5: "Cross the River",
    m6: "Help Tembo Find Water",
    m7: "Animal Words",
    m8: "Clean Up the Park",
    m9: "Discover Hidden Tracks",
    m10: "First Ranger Challenge",

    training: "Ranger Training",
    instruction:
      "Tap each item to get ready!",
    hat: "Safari Hat",
    mapItem: "Park Map",
    badge: "Ranger Badge",

    finish: "MISSION COMPLETE!",
    reward: "You earned a star!",
    continue: "CONTINUE",
    collected: "Collected",
    great: "Great job!",
    locked:
      "Complete the previous mission first!",

    task1:
      "Tap all 3 ranger items!",
    task2:
      "Help Mimi find 3 bananas!",
    task3:
      "How many zebras can you see?",
    task4:
      "Find all 3 clues!",
    task5:
      "Tap the stones in number order!",
    task6:
      "Tap all 3 water drops!",
    task7:
      "Tap the animal that matches the word!",
    task8:
      "Tap all 3 pieces of rubbish to clean the park!",
    task9:
      "Which animal made these tracks?",
    task10:
      "Complete the final ranger challenge!",

    correct:
      "That's right! Great job!",
    wrong:
      "Try again!",
    success:
      "Amazing ranger work!",

    animalsWord:
      "Which animal is this?",
    clean:
      "Park cleaned!",
    trackQuestion:
      "Who left these tracks?",
    finalTask:
      "Tap all 3 ranger supplies!",

    zebra: "Zebra",
    lion: "Lion",
    elephant: "Elephant",

    monkey: "Mimi — Monkey",
    lionCub:
      "Kimba — Lion Cub",
    giraffe:
      "Zuri — Giraffe",
    hippo:
      "Bongo — Hippo",
    cheetah:
      "Chase — Cheetah",
    temboName:
      "Tembo — Elephant",
    zaraName:
      "Zara — Zebra",

    banana: "Banana",
    water: "Water",
    rubbish: "Rubbish",
    lionClue: "Lion clue",
    rangerItem: "Ranger supply",

    learningTitle:
      "RANGER LEARNING CENTRE",
learning:
  "RANGER LEARNING CENTRE",
learningSubtitle:
  "Learn about wildlife and nature!",
nature:
  "NATURE",
safety:
  "RANGER SAFETY",
quiz:
  "RANGER QUIZ",
wildlifeInstruction:
  "Turn the pages to meet the animals!",
    learningWelcome:
      "Learn about wildlife and nature!",
    learnWildlife: "WILDLIFE",
    learnNature: "NATURE",
    learnSafety: "RANGER SAFETY",
natureLesson:
  "NATURE LESSON",
safetyLesson:
  "RANGER SAFETY LESSON",

    factMonkey:
      "Monkeys use their hands and tails to move through trees.",
    factLion:
      "Lion cubs stay close to their mothers while they grow.",
    factElephant:
      "Elephants use their trunks to drink, smell and pick things up.",
    factGiraffe:
      "Giraffes use their long necks to reach leaves high in trees.",
    factZebra:
      "Every zebra has its own unique stripe pattern.",
    factHippo:
      "Hippos spend lots of time in water to keep cool.",
    factCheetah:
      "Cheetahs are built for short bursts of very fast running.",
    natureFact:
      "Plants, water and clean habitats help animals live safely.",
    safetyFact:
      "A good Ranger watches animals from a safe distance.",

    natureShade:
      "Trees give us shade and cool places to rest.",
    natureOxygen:
      "Trees help put oxygen into the air we breathe.",
    natureHomes:
      "Trees give birds, insects and other animals a place to live.",
    natureWater:
      "Clean water helps animals drink, cool down and survive.",
    natureHabitat:
      "Clean land and water help plants and animals stay healthy.",

    safetyFeed:
      "Never feed wild animals. Let them find their natural food.",
    safetyAdult:
      "Stay with a trusted grown-up when exploring.",
    safetyRespect:
      "Respect plants, animals and their homes.",

    learningTip:
      "Keep exploring and learning, Little Ranger!",
badgesSubtitle:
  "Collect badges by completing missions!",
badgeBeginner:
  "Junior Ranger",
badgeBeginnerDesc:
  "Complete your first mission!",
badgeExplorer:
  "Animal Explorer",
badgeExplorerDesc:
  "Discover amazing animals!",
badgeStar:
  "Star Ranger",
badgeStarDesc:
  "Earn stars on your adventures!",
badgeQuiz:
  "Quiz Champion",
badgeQuizDesc:
  "Test your Ranger knowledge!",
badgeNature:
  "Nature Protector",
badgeNatureDesc:
  "Learn how to protect nature!",
badgeRanger:
  "Ranger Hero",
badgeRangerDesc:
  "Complete all 10 missions!",
    badgeTitle:
      "MY RANGER BADGES",
    badgeWelcome:
      "Collect badges by completing missions!",
    badge1: "Junior Ranger",
    badge2: "Animal Friend",
    badge3: "Wildlife Explorer",
    badge4: "Nature Protector",
    badge5: "Ranger Champion",
    earned: "EARNED",
    lockedBadge: "LOCKED",
    progress: "Progress",
    missionsDone:
      "Missions complete",
    badgeNeed1:
      "Complete Mission 1",
    badgeNeed3:
      "Complete 3 missions",
    badgeNeed5:
      "Complete 5 missions",
    badgeNeed8:
      "Complete 8 missions",
    badgeNeed10:
      "Complete all 10 missions",
parent: "PARENT AREA",
parentDashboard:
  "PARENT DASHBOARD",
parentDashboardSubtitle:
  "View your child's progress",
parentPin:
  "Enter parent PIN",
createParentPin:
  "Create a new 4-digit parent PIN",
confirmParentPin:
  "Confirm your 4-digit PIN",
parentPinMismatch:
  "PINs do not match. Try again.",
enterPin:
  "ENTER PIN",
wrongPin:
  "Incorrect PIN",
parentStats:
  "RANGER PROGRESS",
totalStars:
  "Total Stars",
completedMissions:
  "Completed Missions",
currentOutfit:
  "Current Outfit",
language: "Language",
changePin:
  "CHANGE PIN",
newPin:
  "New 4-digit PIN",
savePin:
  "SAVE PIN",
parentInfo:
  "Parent information",
parentText:
  "Wild Rangers Adventure is designed to encourage children to explore, learn and care for nature.",
resetProgress:
  "RESET PROGRESS",
resetConfirm:
  "Reset all game progress?",
yes: "YES",
no: "NO",
    
    premium: "WILD RANGERS PLUS",
    premiumTitle:
      "MORE RANGER ADVENTURES",
    premiumText:
      "Unlock extra learning activities, future missions and special Ranger rewards.",
    monthly: "MONTHLY",
    yearly: "YEARLY",
    monthlyPrice:
      "$9.99 / month",
    yearlyPrice:
      "$24.99 / year",
    upgrade: "UPGRADE",
    currentPlan:
      "CURRENT PLAN",
    premiumSoon:
      "Premium subscriptions will be connected here.",
    freePlan: "FREE RANGER",
    plusPlan: "RANGER PLUS",
    close: "CLOSE",
    next: "NEXT",
    info: "INFO",

    leoGuide:
      "LEO — RANGER GUIDE",
    askLeo: "ASK LEO",
    gotIt: "GOT IT!",
    leoWelcome:
      "Hello, Little Ranger! I'm Leo. Let's explore together!",
    leoPark:
      "Remember: explore gently, learn something new, and help protect nature!",
    leoHint1:
      "Look carefully at the three Ranger items. Can you find them all?",
    leoHint2:
      "Mimi loves bananas! Look for three bananas to help her.",
    leoHint3:
      "Count the zebras carefully. Touch the number that matches.",
    leoHint4:
      "Look for three clues that can help us find Kimba.",
    leoHint5:
      "The stones have numbers. Start with number 1 and follow the order.",
    leoHint6:
      "Tembo needs water. Can you find all three water drops?",
    leoHint7:
      "Look at the animal and match it with the correct animal word.",
    leoHint8:
      "A Ranger helps keep the park clean. Find all three pieces of rubbish.",
    leoHint9:
      "Look at the tracks carefully. Which animal could have made them?",
    leoHint10:
      "A Ranger needs supplies. Find all three supplies!",
    leoGreat:
      "Fantastic work, Ranger! You did it!",
    leoTry:
      "That's okay! Take another look and try again.",
    leoFact:
      "Here's a Ranger fact:",
    leoLearn:
      "Learning is part of being a great Ranger!",
    leoSafe:
      "Stay calm, watch wildlife from a safe distance, and follow Ranger rules.",

    // -----------------------------------------------------
    // RANGER QUIZ
    // -----------------------------------------------------

    quizTitle:
      "🧠 RANGER QUIZ",
    quizSubtitle:
      "Test your Ranger knowledge!",
    quizQuestion:
      "Question",
    quizScore:
"⭐ Score: {score} / {total}",
    quizQ1:
      "Which animal has a long trunk?",
    quizQ1A:
      "🐘 Elephant",
    quizQ1B:
      "🦓 Zebra",
    quizQ1C:
      "🦒 Giraffe",
    quizQ2:
      "Which animal has stripes?",
    quizQ2A:
      "🦁 Lion",
    quizQ2B:
      "🦓 Zebra",
    quizQ2C:
      "🐘 Elephant",
    quizQ3:
      "Which animal is the fastest?",
    quizQ3A:
      "🐆 Cheetah",
    quizQ3B:
      "🦛 Hippo",
    quizQ3C:
      "🐒 Monkey",
    quizGreat:
      "🎉 GREAT JOB!",
    quizResult:
      "You scored {score} / {total}",
    quizKeepLearning:
      "Keep learning, Little Ranger!",
    quizPlayAgain:
      "🔄 PLAY AGAIN"
  },

  // =======================================================
  // FRENCH
  // =======================================================

  fr: {
    title: "LES RANGERS",
    adventure: "SAUVAGES",
    tagline:
      "Explore. Apprends. Protège la nature.",
    welcome:
      "Bienvenue, petit Ranger !",
    start:
      "PARTONS EXPLORER !",
    footer:
      "Une aventure t'attend !",
    create: "CRÉE TON RANGER",
    choose:
      "Choisis ta tenue",
    go: "C'EST PARTI !",
    back: "RETOUR",

    hub: "PARC DE LA SAVANE",
    hubWelcome:
      "Bienvenue au parc !",
    missions: "MISSIONS",
    animals: "ANIMAUX",
    learn: "APPRENDRE",
    badges: "MES BADGES",
    outfit:
      "Choisis ta tenue !",
    map:
      "CHOISIS UNE MISSION",
    soon:
      "Bientôt disponible !",
    ok: "OK !",

    wildlife:
      "LIVRE DES ANIMAUX",
    animalFriends:
      "RENCONTRE LES ANIMAUX",
    tapAnimal:
      "Touche un animal pour en savoir plus !",
    stars: "Étoiles",

    m1: "Devenir jeune Ranger",
    m2: "Rencontre Mimi",
    m3: "Compter les zèbres",
    m4: "Retrouver le lionceau",
    m5: "Traverser la rivière",
    m6:
      "Aider Tembo à trouver de l'eau",
    m7: "Les mots des animaux",
    m8: "Nettoyer le parc",
    m9: "Découvrir les traces",
    m10: "Défi du Ranger",

    training:
      "Entraînement Ranger",
    instruction:
      "Touche chaque objet !",
    hat: "Chapeau",
    mapItem:
      "Carte du parc",
    badge:
      "Badge Ranger",

    finish:
      "MISSION TERMINÉE !",
    reward:
      "Tu as gagné une étoile !",
    continue:
      "CONTINUER",
    collected:
      "Trouvé",
    great:
      "Bravo !",
    locked:
      "Termine la mission précédente !",

    task1:
      "Touche les 3 objets du Ranger !",
    task2:
      "Aide Mimi à trouver 3 bananes !",
    task3:
      "Combien de zèbres vois-tu ?",
    task4:
      "Trouve les 3 indices !",
    task5:
      "Touche les pierres dans l'ordre !",
    task6:
      "Touche les 3 gouttes d'eau !",
    task7:
      "Touche l'animal correspondant au mot !",
    task8:
      "Touche les 3 déchets pour nettoyer le parc !",
    task9:
      "Quel animal a laissé ces traces ?",
    task10:
      "Relève le défi final du Ranger !",

    correct:
      "Bravo ! C'est exact !",
    wrong:
      "Essaie encore !",
    success:
      "Excellent travail, Ranger !",

    animalsWord:
      "Quel est cet animal ?",
    clean:
      "Parc nettoyé !",
    trackQuestion:
      "Qui a laissé ces traces ?",
    finalTask:
      "Touche les 3 équipements du Ranger !",

    zebra: "Zèbre",
    lion: "Lion",
    elephant: "Éléphant",

    monkey:
      "Mimi — Singe",
    lionCub:
      "Kimba — Lionceau",
    giraffe:
      "Zuri — Girafe",
    hippo:
      "Bongo — Hippopotame",
    cheetah:
      "Chase — Guépard",
    temboName:
      "Tembo — Éléphant",
    zaraName:
      "Zara — Zèbre",

    banana: "Banane",
    water: "Eau",
    rubbish: "Déchet",
    lionClue:
      "Indice du lion",
    rangerItem:
      "Équipement Ranger",

    learningTitle:
      "CENTRE D'APPRENTISSAGE RANGER",
learning:
  "CENTRE D'APPRENTISSAGE RANGER",
learningSubtitle:
  "Découvre les animaux et la nature !",
nature:
  "NATURE",
safety:
  "SÉCURITÉ RANGER",
quiz:
  "QUIZ DU RANGER",
wildlifeInstruction:
  "Tourne les pages pour découvrir les animaux !",
    learningWelcome:
      "Apprends sur les animaux et la nature!",
    learnWildlife:
      "ANIMAUX",
    learnNature:
      "NATURE",
    learnSafety:
      "SÉCURITÉ RANGER",
natureLesson: "LEÇON SUR LA NATURE",
safetyLesson: "LEÇON DE SÉCURITÉ DU RANGER",

    factMonkey:
      "Les singes utilisent leurs mains et leur queue pour se déplacer dans les arbres.",
    factLion:
      "Les lionceaux restent près de leur mère pendant leur croissance.",
    factElephant:
      "Les éléphants utilisent leur trompe pour boire, sentir et attraper des objets.",
    factGiraffe:
      "Les girafes utilisent leur long cou pour atteindre les feuilles en hauteur.",
    factZebra:
      "Chaque zèbre possède un motif de rayures unique.",
    factHippo:
      "Les hippopotames passent beaucoup de temps dans l'eau pour rester au frais.",
    factCheetah:
      "Les guépards sont faits pour courir très vite sur de courtes distances.",
    natureFact:
      "Les plantes, l'eau et les habitats propres aident les animaux à vivre en sécurité.",
    safetyFact:
      "Un bon Ranger observe les animaux à une distance sûre.",

    natureShade:
      "Les arbres donnent de l'ombre et des endroits frais pour se reposer.",
    natureOxygen:
      "Les arbres aident à mettre de l'oxygène dans l'air que nous respirons.",
    natureHomes:
      "Les arbres offrent aux oiseaux, aux insectes et à d'autres animaux un endroit où vivre.",
    natureWater:
      "L'eau propre aide les animaux à boire, à se rafraîchir et à survivre.",
    natureHabitat:
      "La terre et l'eau propres aident les plantes et les animaux à rester en bonne santé.",
    safetyFeed:
      "Ne nourris jamais les animaux sauvages. Laisse-les trouver leur nourriture naturelle.",
    safetyAdult:
      "Reste avec un adulte de confiance lorsque tu explores.",
    safetyRespect:
      "Respecte les plantes, les animaux et leurs habitats.",

    learningTip:
      "Continue à explorer et à apprendre, petit Ranger!",
badgesSubtitle:
  "Gagne des badges en terminant les missions !",
badgeBeginner:
  "Jeune Ranger",
badgeBeginnerDesc:
  "Termine ta première mission !",
badgeExplorer:
  "Explorateur des animaux",
badgeExplorerDesc:
  "Découvre des animaux extraordinaires !",
badgeStar:
  "Ranger étoilé",
badgeStarDesc:
  "Gagne des étoiles pendant tes aventures !",
badgeQuiz:
  "Champion du quiz",
badgeQuizDesc:
  "Teste tes connaissances de Ranger !",
badgeNature:
  "Protecteur de la nature",
badgeNatureDesc:
  "Apprends à protéger la nature !",
badgeRanger:
  "Héros Ranger",
badgeRangerDesc:
  "Termine les 10 missions !",
    badgeTitle:
      "MES BADGES DE RANGER",
    badgeWelcome:
      "Gagne des badges en terminant les missions !",
    badge1:
      "Jeune Ranger",
    badge2:
      "Ami des animaux",
    badge3:
      "Explorateur de la faune",
    badge4:
      "Protecteur de la nature",
    badge5:
      "Champion Ranger",
    earned:
      "GAGNÉ",
    lockedBadge:
      "VERROUILLÉ",
    progress:
      "Progression",
    missionsDone:
      "Missions terminées",
    badgeNeed1:
      "Termine la Mission 1",
    badgeNeed3:
      "Termine 3 missions",
    badgeNeed5:
      "Termine 5 missions",
    badgeNeed8:
      "Termine 8 missions",
    badgeNeed10:
      "Termine les 10 missions",

   parent:
  "ESPACE PARENTS",
parentDashboard:
  "TABLEAU DE BORD PARENT",
parentDashboardSubtitle:
  "Consultez les progrès de votre enfant",
parentPin:
  "Entre le code parent",
createParentPin:
  "Créez un nouveau code PIN parental à 4 chiffres",
confirmParentPin:
  "Confirmez votre code PIN à 4 chiffres",
parentPinMismatch:
  "Les codes PIN ne correspondent pas. Réessayez.",
enterPin:
  "ENTRER LE CODE",
wrongPin:
  "Code incorrect",
parentStats:
  "PROGRÈS DU RANGER",
totalStars:
  "Étoiles totales",
completedMissions:
  "Missions terminées",
currentOutfit:
  "Tenue actuelle",
language:
  "Langue",
changePin:
  "CHANGER LE CODE",
newPin:
  "Nouveau code à 4 chiffres",
savePin:
  "ENREGISTRER",
parentInfo:
  "Informations parent",
parentText:
  "Wild Rangers Adventure encourage les enfants à explorer, apprendre et protéger la nature.",
resetProgress:
  "RÉINITIALISER",
resetConfirm:
  "Réinitialiser toute la progression ?",
yes: "OUI",
no: "NON", 
    premium:
      "WILD RANGERS PLUS",
    premiumTitle:
      "PLUS D'AVENTURES RANGER",
    premiumText:
      "Débloque des activités d'apprentissage, de futures missions et des récompenses spéciales.",
    monthly:
      "MENSUEL",
    yearly:
      "ANNUEL",
    monthlyPrice:
      "9,99 $ / mois",
    yearlyPrice:
      "24,99 $ / an",
    upgrade:
      "S'ABONNER",
    currentPlan:
      "PLAN ACTUEL",
    premiumSoon:
      "Les abonnements Premium seront connectés ici.",
    freePlan:
      "RANGER GRATUIT",
    plusPlan:
      "RANGER PLUS",
    close:
      "FERMER",
    next:
      "SUIVANT",
    info:
      "INFO",

    leoGuide:
      "LEO — GUIDE RANGER",
    askLeo:
      "DEMANDER À LEO",
    gotIt:
      "J'AI COMPRIS !",

    leoWelcome:
      "Bonjour, petit Ranger ! Je suis Leo. Explorons ensemble !",
    leoPark:
      "Explore doucement, apprends quelque chose et aide à protéger la nature !",
    leoHint1:
      "Regarde bien les trois objets du Ranger. Peux-tu tous les trouver ?",
    leoHint2:
      "Mimi adore les bananes ! Trouve les trois bananes pour l'aider.",
    leoHint3:
      "Compte bien les zèbres. Touche le nombre qui correspond.",
    leoHint4:
      "Cherche trois indices pour nous aider à retrouver Kimba.",
    leoHint5:
      "Les pierres ont des numéros. Commence par 1 et suis l'ordre.",
    leoHint6:
      "Tembo a besoin d'eau. Trouve les trois gouttes.",
    leoHint7:
      "Regarde l'animal et choisis le bon mot.",
    leoHint8:
      "Un Ranger aide à garder le parc propre. Trouve les trois déchets.",
    leoHint9:
      "Regarde les traces. Quel animal pourrait les avoir laissées ?",
    leoHint10:
      "Un Ranger a besoin d'équipement. Trouve les trois objets !",
    leoGreat:
      "Excellent travail, Ranger ! Tu as réussi !",
    leoTry:
      "Ce n'est pas grave ! Regarde encore et essaie.",
    leoFact:
      "Voici un fait Ranger :",
    leoLearn:
      "Apprendre fait partie du travail d'un Ranger !",
    leoSafe:
      "Reste calme, garde une distance sûre et respecte les règles.",

    // -----------------------------------------------------
    // RANGER QUIZ
    // -----------------------------------------------------

    quizTitle:
      "🧠 QUIZ DU RANGER",
    quizSubtitle:
      "Teste tes connaissances de Ranger !",
    quizQuestion:
      "Question",
    quizScore:
"⭐ Score : {score} / {total}",
    quizQ1:
      "Quel animal a une longue trompe ?",
    quizQ1A:
      "🐘 Éléphant",
    quizQ1B:
      "🦓 Zèbre",
    quizQ1C:
      "🦒 Girafe",
    quizQ2:
      "Quel animal a des rayures ?",
    quizQ2A:
      "🦁 Lion",
    quizQ2B:
      "🦓 Zèbre",
    quizQ2C:
      "🐘 Éléphant",
    quizQ3:
      "Quel animal est le plus rapide ?",
    quizQ3A:
      "🐆 Guépard",
    quizQ3B:
      "🦛 Hippopotame",
    quizQ3C:
      "🐒 Singe",
    quizGreat:
      "🎉 BRAVO !",
    quizResult:
      "Tu as obtenu {score} / {total}",
    quizKeepLearning:
      "Continue à apprendre, petit Ranger !",
    quizPlayAgain:
      "🔄 REJOUER"
  },

  // =======================================================
  // SPANISH
  // =======================================================

  es: {
    title: "GUARDIANES",
    adventure: "SALVAJES",
    tagline:
      "Explora. Aprende. Protege la naturaleza.",
    welcome:
      "¡Bienvenido, pequeño Ranger!",
    start:
      "¡VAMOS A EXPLORAR!",
    footer:
      "¡Una aventura te espera!",
    create:
      "CREA TU RANGER",
    choose:
      "Elige tu uniforme",
    go:
      "¡VAMOS!",
    back:
      "VOLVER",

    hub:
      "PARQUE DE LA SABANA",
    hubWelcome:
      "¡Bienvenido al parque!",
    missions:
      "MISIONES",
    animals:
      "ANIMALES",
    learn:
      "APRENDER",
    badges:
      "MIS MEDALLAS",
    outfit:
      "¡Elige tu uniforme!",
    map:
      "ELIGE UNA MISIÓN",
    soon:
      "¡Muy pronto!",
    ok:
      "¡OK!",

    wildlife:
      "LIBRO DE ANIMALES",
    animalFriends:
      "CONOCE A LOS ANIMALES",
    tapAnimal:
      "¡Toca un animal para aprender más!",
    stars:
      "Estrellas",

    m1:
      "Ser un Ranger Junior",
    m2:
      "Conoce a Mimi",
    m3:
      "Cuenta las cebras",
    m4:
      "Encuentra al cachorro de león",
    m5:
      "Cruza el río",
    m6:
      "Ayuda a Tembo a encontrar agua",
    m7:
      "Palabras de animales",
    m8:
      "Limpia el parque",
    m9:
      "Descubre huellas",
    m10:
      "Desafío Ranger",

    training:
      "Entrenamiento Ranger",
    instruction:
      "¡Toca cada objeto!",
    hat:
      "Sombrero",
    mapItem:
      "Mapa del parque",
    badge:
      "Insignia Ranger",

    finish:
      "¡MISIÓN COMPLETADA!",
    reward:
      "¡Ganaste una estrella!",
    continue:
      "CONTINUAR",
    collected:
      "Conseguido",
    great:
      "¡Muy bien!",
    locked:
      "¡Completa la misión anterior!",

    task1:
      "¡Toca los 3 objetos Ranger!",
    task2:
      "¡Ayuda a Mimi a encontrar 3 bananas!",
    task3:
      "¿Cuántas cebras puedes ver?",
    task4:
      "¡Encuentra las 3 pistas!",
    task5:
      "¡Toca las piedras en orden!",
    task6:
      "¡Toca las 3 gotas de agua!",
    task7:
      "¡Toca el animal que corresponde a la palabra!",
    task8:
      "¡Toca los 3 residuos para limpiar el parque!",
    task9:
      "¿Qué animal dejó estas huellas?",
    task10:
      "¡Completa el desafío final Ranger!",

    correct:
      "¡Correcto! ¡Muy bien!",
    wrong:
      "¡Inténtalo otra vez!",
    success:
      "¡Excelente trabajo, Ranger!",

    animalsWord:
      "¿Qué animal es?",
    clean:
      "¡Parque limpio!",
    trackQuestion:
      "¿Quién dejó estas huellas?",
    finalTask:
      "¡Toca los 3 objetos Ranger!",

    zebra:
      "Cebra",
    lion:
      "León",
    elephant:
      "Elefante",

    monkey:
      "Mimi — Mona",
    lionCub:
      "Kimba — Cachorro de león",
    giraffe:
      "Zuri — Jirafa",
    hippo:
      "Bongo — Hipopótamo",
    cheetah:
      "Chase — Guepardo",
    temboName:
      "Tembo — Elefante",
    zaraName:
      "Zara — Cebra",

    banana:
      "Banana",
    water:
      "Agua",
    rubbish:
      "Residuo",
    lionClue:
      "Pista del león",
    rangerItem:
      "Equipo Ranger",

    learningTitle:
      "CENTRO DE APRENDIZAJE RANGER",
learning:
  "CENTRO DE APRENDIZAJE RANGER",
learningSubtitle:
  "¡Aprende sobre los animales y la naturaleza!",
nature:
  "NATURALEZA",
safety:
  "SEGURIDAD RANGER",
quiz:
  "QUIZ DEL RANGER",
wildlifeInstruction:
  "¡Pasa las páginas para conocer a los animales!",
    learningWelcome:
      "¡Aprende sobre los animales y la naturaleza!",
    learnWildlife:
      "ANIMALES",
    learnNature:
      "NATURALEZA",
    learnSafety:
      "SEGURIDAD RANGER",

natureLesson: "LECCIÓN SOBRE LA NATURALEZA",
safetyLesson: "LECCIÓN DE SEGURIDAD DEL RANGER",
    factMonkey:
      "Los monos usan sus manos y colas para moverse entre los árboles.",
    factLion:
      "Los cachorros de león permanecen cerca de sus madres mientras crecen.",
    factElephant:
      "Los elefantes usan sus trompas para beber, oler y recoger cosas.",
    factGiraffe:
      "Las jirafas usan sus largos cuellos para alcanzar hojas altas.",
    factZebra:
      "Cada cebra tiene un patrón de rayas único.",
    factHippo:
      "Los hipopótamos pasan mucho tiempo en el agua para mantenerse frescos.",
    factCheetah:
      "Los guepardos están hechos para correr muy rápido durante distancias cortas.",
    natureFact:
      "Las plantas, el agua y los hábitats limpios ayudan a los animales a vivir seguros.",
    safetyFact:
      "Un buen Ranger observa a los animales desde una distancia segura.",

    natureShade:
      "Los árboles dan sombra y lugares frescos para descansar.",
    natureOxygen:
      "Los árboles ayudan a poner oxígeno en el aire que respiramos.",
    natureHomes:
      "Los árboles dan a las aves, los insectos y otros animales un lugar donde vivir.",
    natureWater:
      "El agua limpia ayuda a los animales a beber, refrescarse y sobrevivir.",
    natureHabitat:
      "La tierra y el agua limpias ayudan a las plantas y los animales a estar sanos.",

    safetyFeed:
      "Nunca alimentes a los animales salvajes. Deja que encuentren su comida natural.",
    safetyAdult:
      "Quédate con un adulto de confianza cuando explores.",
    safetyRespect:
      "Respeta las plantas, los animales y sus hogares.",

    learningTip:
      "¡Sigue explorando y aprendiendo, pequeño Ranger!",
badgesSubtitle:
  "¡Consigue medallas completando misiones!",
badgeBeginner:
  "Ranger Junior",
badgeBeginnerDesc:
  "¡Completa tu primera misión!",
badgeExplorer:
  "Explorador de animales",
badgeExplorerDesc:
  "¡Descubre animales increíbles!",
badgeStar:
  "Ranger Estrella",
badgeStarDesc:
  "¡Consigue estrellas en tus aventuras!",
badgeQuiz:
  "Campeón del quiz",
badgeQuizDesc:
  "¡Pon a prueba tus conocimientos Ranger!",
badgeNature:
  "Protector de la naturaleza",
badgeNatureDesc:
  "¡Aprende a proteger la naturaleza!",
badgeRanger:
  "Héroe Ranger",
badgeRangerDesc:
  "¡Completa las 10 misiones!",
    badgeTitle:
      "MIS MEDALLAS RANGER",
    badgeWelcome:
      "¡Consigue medallas completando misiones!",
    badge1:
      "Ranger Junior",
    badge2:
      "Amigo de los animales",
    badge3:
      "Explorador de la fauna",
    badge4:
      "Protector de la naturaleza",
    badge5:
      "Campeón Ranger",
    earned:
      "GANADA",
    lockedBadge:
      "BLOQUEADA",
    progress:
      "Progreso",
    missionsDone:
      "Misiones completadas",
    badgeNeed1:
      "Completa la Misión 1",
    badgeNeed3:
      "Completa 3 misiones",
    badgeNeed5:
      "Completa 5 misiones",
    badgeNeed8:
      "Completa 8 misiones",
    badgeNeed10:
      "Completa las 10 misiones",

 parent:
  "ÁREA DE PADRES",
parentDashboard:
  "PANEL DE PADRES",
parentDashboardSubtitle:
  "Consulta el progreso de tu hijo",
parentPin:
  "Introduce el PIN de padres",
createParentPin:
  "Crea un nuevo PIN parental de 4 dígitos",
confirmParentPin:
  "Confirma tu PIN de 4 dígitos",
parentPinMismatch:
  "Los PIN no coinciden. Inténtalo de nuevo.",
enterPin:
  "INTRODUCIR PIN",
wrongPin:
  "PIN incorrecto",
parentStats:
  "PROGRESO DEL RANGER",
totalStars:
  "Estrellas totales",
completedMissions:
  "Misiones completadas",
currentOutfit:
  "Uniforme actual",
language:
  "Idioma",
changePin:
  "CAMBIAR PIN",
newPin:
  "Nuevo PIN de 4 dígitos",
savePin:
  "GUARDAR PIN",
parentInfo:
  "Información para padres",
parentText:
  "Wild Rangers Adventure anima a los niños a explorar, aprender y cuidar la naturaleza.",
resetProgress:
  "REINICIAR PROGRESO",
resetConfirm:
  "¿Reiniciar todo el progreso?",
yes: "SÍ",
no: "NO",
    premium:
      "WILD RANGERS PLUS",
    premiumTitle:
      "MÁS AVENTURAS RANGER",
    premiumText:
      "Desbloquea actividades de aprendizaje, futuras misiones y recompensas especiales.",
    monthly:
      "MENSUAL",
    yearly:
      "ANUAL",
    monthlyPrice:
      "$9.99 / mes",
    yearlyPrice:
      "$24.99 / año",
    upgrade:
      "ACTUALIZAR",
    currentPlan:
      "PLAN ACTUAL",
    premiumSoon:
      "Las suscripciones Premium se conectarán aquí.",
    freePlan:
      "RANGER GRATIS",
    plusPlan:
      "RANGER PLUS",
    close:
      "CERRAR",
    next:
      "SIGUIENTE",
    info:
      "INFO",

    leoGuide:
      "LEO — GUÍA RANGER",
    askLeo:
      "PREGUNTAR A LEO",
    gotIt:
      "¡ENTENDIDO!",

    leoWelcome:
      "¡Hola, pequeño Ranger! Soy Leo. ¡Exploremos juntos!",
    leoPark:
      "Explora con cuidado, aprende algo nuevo y ayuda a proteger la naturaleza.",
    leoHint1:
      "Mira bien los tres objetos Ranger. ¿Puedes encontrarlos todos?",
    leoHint2:
      "¡A Mimi le encantan las bananas! Encuentra las tres para ayudarla.",
    leoHint3:
      "Cuenta las cebras con cuidado. Toca el número correcto.",
    leoHint4:
      "Busca tres pistas que nos ayuden a encontrar a Kimba.",
    leoHint5:
      "Las piedras tienen números. Empieza por el 1 y sigue el orden.",
    leoHint6:
      "Tembo necesita agua. Encuentra las tres gotas.",
    leoHint7:
      "Mira el animal y elige la palabra correcta.",
    leoHint8:
      "Un Ranger ayuda a mantener limpio el parque. Encuentra los tres residuos.",
    leoHint9:
      "Mira las huellas. ¿Qué animal pudo dejarlas?",
    leoHint10:
      "Un Ranger necesita equipo. ¡Encuentra los tres objetos!",
    leoGreat:
      "¡Fantástico trabajo, Ranger! ¡Lo lograste!",
    leoTry:
      "¡No pasa nada! Mira otra vez e inténtalo.",
    leoFact:
      "Aquí tienes un dato Ranger:",
    leoLearn:
      "¡Aprender es parte de ser un buen Ranger!",
    leoSafe:
      "Mantén la calma, observa desde una distancia segura y sigue las reglas.",

    // -----------------------------------------------------
    // RANGER QUIZ
    // -----------------------------------------------------

    quizTitle:
      "🧠 QUIZ DEL RANGER",
    quizSubtitle:
      "¡Pon a prueba tus conocimientos de Ranger!",
    quizQuestion:
      "Pregunta",
   quizScore:
"⭐ Puntuación: {score} / {total}", 
    quizQ1:
      "¿Qué animal tiene una trompa larga?",
    quizQ1A:
      "🐘 Elefante",
    quizQ1B:
      "🦓 Cebra",
    quizQ1C:
      "🦒 Jirafa",
    quizQ2:
      "¿Qué animal tiene rayas?",
    quizQ2A:
      "🦁 León",
    quizQ2B:
      "🦓 Cebra",
    quizQ2C:
      "🐘 Elefante",
    quizQ3:
      "¿Qué animal es el más rápido?",
    quizQ3A:
      "🐆 Guepardo",
    quizQ3B:
      "🦛 Hipopótamo",
    quizQ3C:
      "🐒 Mono",
    quizGreat:
      "🎉 ¡MUY BIEN!",
    quizResult:
      "Has conseguido {score} / {total}",
    quizKeepLearning:
      "¡Sigue aprendiendo, pequeño Ranger!",
    quizPlayAgain:
      "🔄 JUGAR DE NUEVO"
  }
};

// =========================================================
// TRANSLATION FUNCTION
// =========================================================

export const t = k =>
  L[lang]?.[k] ||
  L.en[k] ||
  k;

// =========================================================
// CHANGE LANGUAGE
// =========================================================

export function changeLanguage() {
  lang =
    lang === "en"
      ? "fr"
      : lang === "fr"
        ? "es"
        : "en";

  localStorage.setItem(
    "wr_v1_lang",
    lang
  );

  return lang;
}
export function setLanguage(code) {
  if (
    code !== "en" &&
    code !== "fr" &&
    code !== "es"
  ) {
    return lang;
  }

  lang = code;

  localStorage.setItem(
    "wr_v1_lang",
    lang
  );

  return lang;
}