/* ============================================================
   CAN / CAN'T — Interactive English Learning Site
   app.js — All JavaScript Logic
   ============================================================ */

'use strict';

/* ===== STATE ===== */
const STATE = {
  studentName: '',
  teacherMode: false,
  showAnswers: false,
  sectionsCompleted: {grammar: false, glossary: false, exercises: false, games: false},
  scores: {fill: null, mc: null, match: null, image: null, tf: null, writing: null, unscramble: null},
  quizDone: false,
  quizResults: null,
  // Internal
  selectedMatchLeft: null,
  selectedMatchRight: null,
  matchPairs: [],
  matchCompleted: 0,
  sortSelected: null,
  fillAnswered: [],
  mcAnswered: [],
  tfAnswered: [],
  imageAnswered: [],
  animalAnswered: [],
  policeAnswered: [],
  rulesAnswered: [],
  unscrambleState: [], // array of {words, answer, placed}
  writingState: []
};

/* ===== TEACHER PASSWORD ===== */
const TEACHER_PASSWORD = 'TEACHER123';

/* ===== GLOSSARY VERBS ===== */
const VERBS = [
  {icon:'🏃', word:'run', ex:'I can run fast.', es:'correr'},
  {icon:'🦘', word:'jump', ex:'She can jump high.', es:'saltar'},
  {icon:'🏊', word:'swim', ex:'He can swim.', es:'nadar'},
  {icon:'💃', word:'dance', ex:'They can dance.', es:'bailar'},
  {icon:'🎤', word:'sing', ex:'I can\'t sing well.', es:'cantar'},
  {icon:'🎨', word:'draw', ex:'She can draw animals.', es:'dibujar'},
  {icon:'📖', word:'read', ex:'He can read English.', es:'leer'},
  {icon:'✍️', word:'write', ex:'Can you write fast?', es:'escribir'},
  {icon:'🍳', word:'cook', ex:'My mom can cook.', es:'cocinar'},
  {icon:'🚲', word:'ride', ex:'I can ride a bike.', es:'andar en bici'},
  {icon:'🧗', word:'climb', ex:'Cats can climb.', es:'trepar'},
  {icon:'⚽', word:'kick', ex:'He can kick the ball.', es:'patear'},
  {icon:'🤿', word:'catch', ex:'I can\'t catch it!', es:'atrapar'},
  {icon:'🎯', word:'throw', ex:'She can throw far.', es:'lanzar'},
  {icon:'⛸️', word:'skate', ex:'Can you skate?', es:'patinar'},
  {icon:'🎵', word:'play the piano', ex:'She can play the piano.', es:'tocar el piano'},
  {icon:'🗣️', word:'speak', ex:'I can speak English.', es:'hablar'},
  {icon:'👂', word:'listen', ex:'We can listen carefully.', es:'escuchar'},
  {icon:'🤝', word:'help', ex:'Can I help you?', es:'ayudar'},
  {icon:'🚪', word:'open', ex:'He can\'t open the jar.', es:'abrir'},
  {icon:'📦', word:'carry', ex:'She can carry it.', es:'cargar'},
  {icon:'🧹', word:'clean', ex:'I can clean my room.', es:'limpiar'},
  {icon:'🏗️', word:'build', ex:'They can build a house.', es:'construir'},
  {icon:'🖌️', word:'paint', ex:'Can he paint?', es:'pintar'},
  {icon:'🚗', word:'drive', ex:'Adults can drive. (Solo adultos)', es:'manejar'},
  {icon:'📸', word:'take photos', ex:'I can take photos.', es:'tomar fotos'},
  {icon:'🌳', word:'plant', ex:'We can plant trees.', es:'plantar'},
  {icon:'🍪', word:'bake', ex:'She can bake cookies.', es:'hornear'},
  {icon:'🎣', word:'fish', ex:'Grandpa can fish.', es:'pescar'},
  {icon:'🛌', word:'rest', ex:'You can rest now.', es:'descansar'},
  {icon:'🦘', word:'hop', ex:'A kangaroo can hop.', es:'saltar en un pie'},
  {icon:'🔊', word:'whistle', ex:'Can you whistle?', es:'silbar'}
];

/* ===== FILL IN BLANK EXERCISES ===== */
const FILL_EXERCISES = [
  {id:'f1', sentence:'She ____ swim very well.', answer:'can', hint:'Positive ability / Habilidad positiva', explanation:'Use CAN for ability. / Usa CAN para habilidad.'},
  {id:'f2', sentence:'He ____ fly — he\'s not a bird!', answer:"can't", hint:'Negative ability / Habilidad negativa', explanation:'Use CAN\'T when something is not possible. / Usa CAN\'T cuando no es posible.'},
  {id:'f3', sentence:'____ you help me, please?', answer:'Can', hint:'Question / Pregunta', explanation:'In questions: CAN comes first. / En preguntas: CAN va primero.'},
  {id:'f4', sentence:'Dogs ____ bark, but they ____ talk.', answer:'can / can\'t', hint:'Ability + no ability', explanation:'Dogs have the ability to bark but NOT the ability to talk.'},
  {id:'f5', sentence:'I ____ (not) eat in the library.', answer:'cannot', hint:'Formal negative = cannot', explanation:'CANNOT is the formal version of CAN\'T. / CANNOT es la forma formal.'},
  {id:'f6', sentence:'Birds ____ fly, but penguins ____ fly.', answer:"can / can't", hint:'Some birds CAN, penguins CAN\'T', explanation:'Not all birds fly! / ¡No todos los pájaros vuelan!'},
  {id:'f7', sentence:'____ she dance the salsa?', answer:'Can', hint:'Question with she', explanation:'Questions: CAN + subject + base verb. / Preguntas: CAN + sujeto + verbo base.'},
  {id:'f8', sentence:'We ____ speak three languages!', answer:'can', hint:'Positive — a great ability!', explanation:'CAN shows amazing ability. / CAN muestra una habilidad increíble.'},
  {id:'f9', sentence:'He ____ run — his leg hurts. (Use the negative form)', answer:"can't", hint:'Negative: his leg hurts, so he is not able to run.', explanation:'CAN\'T + base verb. No -ing, no -s! / ¡Sin -ing, sin -s!'},
  {id:'f10', sentence:'You ____ use my pencil. (Permission: yes, you can!)', answer:'can', hint:'Permission / Permiso dado', explanation:'CAN is used to give permission. / CAN se usa para dar permiso.'},
  {id:'f11', sentence:'Tom ____ play the guitar. (He is very talented!)', answer:'can', hint:'Positive ability — Tom is talented!', explanation:'CAN + base verb. Tom can PLAY (not plays or playing).'},
  {id:'f12', sentence:'____ I open the window? It\'s hot!', answer:'Can', hint:'Asking for permission', explanation:'CAN I …? = asking permission. / ¿CAN I …? = pedir permiso.'}
];

/* ===== MULTIPLE CHOICE EXERCISES ===== */
const MC_EXERCISES = [
  {id:'m1', q:'Which sentence is correct?', choices:['She can sings.','She can sing.','She cans sing.','She can to sing.'], answer:1, hint:'No -s after can, base verb only!', explanation:'CAN + base verb. No -s on can or the verb. / Sin -s en can ni en el verbo.'},
  {id:'m2', q:'How do we ask a question with CAN?', choices:['He can swim?','Swim can he?','Can he swim?','Does he can swim?'], answer:2, hint:'CAN goes first in questions.', explanation:'Question form: CAN + subject + base verb. / Pregunta: CAN + sujeto + verbo base.'},
  {id:'m3', q:'Choose the short answer for: "Can you run fast?" → No, ...', choices:['No, I don\'t.','No, I can\'t.','No, you can\'t.','No, he can\'t.'], answer:1, hint:'The question asked about YOU (I), negative = can\'t.', explanation:'Yes, I can. / No, I can\'t. → Match the subject! / ¡Usa el pronombre correcto!'},
  {id:'m4', q:'Which word fills the blank? "I ____ understand — please repeat."', choices:["don't",'can\'t','not','cannot can'], answer:1, hint:'CAN\'T for inability. / CAN\'T para incapacidad.', explanation:'I can\'t understand = I don\'t have the ability right now. / No puedo entender.'},
  {id:'m5', q:'Correct answer for: "She ____ dance or sing — she\'s talented!"', choices:["can't",'cannot','can','cans'], answer:2, hint:'Positive ability. No -s!', explanation:'CAN shows ability. No -s for he/she/it. / CAN muestra habilidad. Sin -s.'},
  {id:'m6', q:'"Can I use your pen?" — What is the correct answer?', choices:['Yes, you can.','Yes, I can.','Yes, he can.','Yes, you cans.'], answer:0, hint:'The person asking is I — so answer with YOU.', explanation:'When asked "Can I…?", reply "Yes, you can." / "No, you can\'t."'},
  {id:'m7', q:'Which sentence uses CAN for permission?', choices:['I can swim.','You can go now.','Birds can fly.','She can play piano.'], answer:1, hint:'Who is giving or allowing something?', explanation:'"You can go now" = permission given. / "Puedes irte" = permiso dado.'},
  {id:'m8', q:'Pick the INCORRECT sentence:', choices:['He can draw.','Can they help?','I can to cook.','We can\'t fly.'], answer:2, hint:'Look for the error — something after CAN that shouldn\'t be there!', explanation:'"I can to cook" is wrong. Never use "to" after CAN! / Nunca uses "to" después de CAN.'},
  {id:'m9', q:'Which is the full form of "can\'t"?', choices:['can not','cannot','could not','cant'], answer:1, hint:'It\'s one word!', explanation:'"cannot" is the formal full form of "can\'t". / "cannot" es la forma completa de "can\'t".'},
  {id:'m10', q:'Complete: "The cat ____ climb trees, but it ____ fly."', choices:["can / can't",'can\'t / can','can / can','can\'t / can\'t'], answer:0, hint:'Cats CAN climb. Cats CANNOT fly.', explanation:'A cat has the ability to climb but not to fly. / Un gato puede trepar pero no volar.'},
  {id:'m11', q:'Choose the correct question: "Is she able to run?"', choices:['Does she can run?','Can she run?','She can run?','Can she runs?'], answer:1, hint:'CAN + subject + base verb', explanation:'"Can she run?" = CAN + she + run (base form). / Forma interrogativa correcta.'},
  {id:'m12', q:'Which is a request? (Pedido / solicitud)', choices:['I can dance.','Can you open the door?','She can\'t swim.','They can read.'], answer:1, hint:'"Can you...?" is often a request.', explanation:'"Can you open the door?" = asking someone to do something / pedir ayuda.'}
];

/* ===== MATCHING SETS ===== */
const MATCH_SETS = [
  {
    title: 'Match subject → short answer (Yes)',
    left: ['Can I...?', 'Can she...?', 'Can they...?', 'Can you...?'],
    right: ['Yes, you can.', 'Yes, she can.', 'Yes, they can.', 'Yes, I can.'],
    pairs: [0,1,2,3]
  },
  {
    title: 'Match the action → ability sentence',
    left: ['A bird', 'A fish', 'An elephant', 'A cat'],
    right: ['can swim.', 'can fly.', "can't fly.", 'can climb trees.'],
    pairs: [1,0,2,3]
  },
  {
    title: 'Match question → short answer (No)',
    left: ['Can he jump?', 'Can you sing?', 'Can I stay?', 'Can we go?'],
    right: ["No, we can't.", "No, I can't.", "No, you can't.", "No, he can't."],
    pairs: [3,1,2,0]
  }
];

/* ===== IMAGE EXERCISES ===== */
const IMAGE_EXERCISES = [
  {id:'i1', scene:'playground', q:'The children at the playground can _____.', choices:['fly','swim','slide and swing','drive'], answer:2, hint:'Look at the slide and swing!', explanation:'At the playground, children can slide and swing! / ¡En el patio pueden deslizarse y columpiarse!'},
  {id:'i2', scene:'zoo', q:'A bird can _____.', choices:['swim','fly','climb mountains','bark'], answer:1, hint:'Birds have wings!', explanation:'Birds have wings, so they can fly. / Los pájaros tienen alas, pueden volar.'},
  {id:'i3', scene:'zoo', q:'A fish can NOT _____.', choices:['swim','breathe underwater','fly in the sky','move fins'], answer:2, hint:'Fish live in water...', explanation:'Fish can swim but can\'t fly! / Los peces pueden nadar pero no volar.'},
  {id:'i4', scene:'home', q:'In the home scene, the child can _____.', choices:['drive a car','cook food','fly a plane','swim'], answer:1, hint:'What\'s happening near the stove?', explanation:'The child can cook! It\'s a great skill. / ¡El niño puede cocinar!'},
  {id:'i5', scene:'classroom', q:'In the classroom, students can _____.', choices:['run','shout','raise their hand','play football inside'], answer:2, hint:'Look at the student with a raised hand!', explanation:'Students CAN raise their hand. / Los estudiantes PUEDEN levantar la mano.'},
  {id:'i6', scene:'zoo', q:'An elephant can NOT _____.', choices:['walk','drink water','fly','swim (in rivers)'], answer:2, hint:'Elephants are too big and heavy for...', explanation:'Elephants can\'t fly but they can swim! / Los elefantes no pueden volar.'},
  {id:'i7', scene:'playground', q:'A child at the playground can _____ a ball.', choices:['fly','kick','bark','drive'], answer:1, hint:'Look at the boy near the ball!', explanation:'The boy can KICK the ball. / El niño puede PATEAR el balón.'},
  {id:'i8', scene:'home', q:'At home, someone can _____ the floor.', choices:['swim','fly','clean','bark'], answer:2, hint:'Look at the mop!', explanation:'You can clean the floor at home. / Puedes limpiar el piso en casa.'}
];

/* ===== TRUE/FALSE EXERCISES (based on zoo scene) ===== */
const TF_EXERCISES = [
  {id:'tf1', statement:'A bird can fly.', answer:true, explanation:'Birds have wings and can fly! ✓ / Los pájaros tienen alas.'},
  {id:'tf2', statement:'A fish can climb trees.', answer:false, explanation:'Fish can\'t climb! They live in water. / Los peces no trepan.'},
  {id:'tf3', statement:'An elephant can fly.', answer:false, explanation:'Elephants can\'t fly — they\'re too big! / Los elefantes no pueden volar.'},
  {id:'tf4', statement:'A cat can climb.', answer:true, explanation:'Yes! Cats are excellent climbers. / Los gatos son excelentes trepadores.'},
  {id:'tf5', statement:'A fish can swim.', answer:true, explanation:'Of course! Fish can swim perfectly. / ¡Claro! Los peces nadan perfectamente.'},
  {id:'tf6', statement:'A bird can bark like a dog.', answer:false, explanation:'Birds can\'t bark — dogs bark! / Los pájaros no ladran, eso lo hacen los perros.'},
  {id:'tf7', statement:'A cat can fly.', answer:false, explanation:'Cats can\'t fly — but they can jump high! / Los gatos no pueden volar.'},
  {id:'tf8', statement:'An elephant can swim (in rivers).', answer:true, explanation:'Elephants can actually swim in rivers! / ¡Los elefantes pueden nadar en ríos!'}
];

/* ===== WRITING EXERCISES ===== */
const WRITING_EXERCISES = [
  {id:'w1', prompt:'Write 3 sentences: 2 with "can" and 1 with "can\'t".',
   model:'I can swim. She can dance. He can\'t fly.',
   minWords: 8,
   checklist:['Starts with capital letter','Has a period/full stop (.)','Uses CAN + base verb (e.g. can swim)','Uses CAN\'T + base verb','Has correct subject (I/he/she/we...)']},
  {id:'w2', prompt:'Write a question with "Can" and give a short answer.',
   model:'Can she sing? Yes, she can.',
   minWords: 4,
   checklist:['Starts with Can','Has a question mark (?)','Has a short answer (Yes,… / No,…)','Uses base verb after Can']},
  {id:'w3', prompt:'Write 2 sentences about an animal: what it CAN do and what it CAN\'T do.',
   model:'A dog can run fast. A dog can\'t fly.',
   minWords: 8,
   checklist:['Mentions an animal','Uses CAN for an ability','Uses CAN\'T for a limitation','Uses base verb (not -s or -ing)']},
  {id:'w4', prompt:'Write 3 things YOU can do. Use: I can …',
   model:'I can dance. I can read. I can cook.',
   minWords: 8,
   checklist:['All sentences start with I','Uses CAN (not cans)','Uses base verb','3 different abilities mentioned']},
  {id:'w5', prompt:'Write 2 permission sentences. Use "Can I…?" and "You can…".',
   model:'Can I open the window? Yes, you can open it.',
   minWords: 6,
   checklist:['Has a question with Can I','Has an answer with You can','Uses base verb after can']},
  {id:'w6', prompt:'Describe what your best friend can do. Write at least 2 sentences.',
   model:'My friend can swim. She can also sing well.',
   minWords: 8,
   checklist:['Uses he/she/they','Uses CAN correctly','Uses base verb','At least 2 sentences']},
  {id:'w7', prompt:'Write 1 school rule using CAN\'T and 1 using CAN.',
   model:'You can\'t run in the hall. You can read in the library.',
   minWords: 8,
   checklist:['Uses CAN\'T for a rule','Uses CAN for something allowed','Relates to school','Uses base verb']},
  {id:'w8', prompt:'Write a short dialogue (2 lines): ask permission and reply.',
   model:'Student: Can I use your pen? / Teacher: Yes, you can.',
   minWords: 6,
   checklist:['Has a question','Uses Can I…?','Has a reply','Reply uses you can or you can\'t']}
];

/* ===== UNSCRAMBLE EXERCISES ===== */
const UNSCRAMBLE_EXERCISES = [
  {id:'u1', words:['I','can','dance'], answer:'I can dance.'},
  {id:'u2', words:['Can','you','swim','?'], answer:'Can you swim?'},
  {id:'u3', words:['She','can\'t','fly'], answer:"She can't fly."},
  {id:'u4', words:['He','can','play','football'], answer:'He can play football.'},
  {id:'u5', words:['Can','they','help','us','?'], answer:'Can they help us?'},
  {id:'u6', words:['I','cannot','run','fast'], answer:'I cannot run fast.'},
  {id:'u7', words:['Birds','can','fly'], answer:'Birds can fly.'},
  {id:'u8', words:['Can','she','sing','well','?'], answer:'Can she sing well?'}
];

/* ===== SORT GAME DATA ===== */
const SORT_ITEMS = [
  {text:'I can swim 🏊', type:'can'},
  {text:'Birds can fly 🐦', type:'can'},
  {text:'She can\'t bark 🐕', type:"can't"},
  {text:'He can dance 💃', type:'can'},
  {text:'Elephants can\'t fly 🐘', type:"can't"},
  {text:'I can read 📖', type:'can'},
  {text:'Dogs can\'t talk 🐶', type:"can't"},
  {text:'We can help ✋', type:'can'},
  {text:'Fish can\'t climb 🐟', type:"can't"},
  {text:'She can cook 🍳', type:'can'}
];

/* ===== PERMISSION POLICE DATA ===== */
const POLICE_SCENARIOS = [
  {emoji:'🚿', situation:'Use the restroom during class after asking', answer:'can', explanation:'"Can I go to the bathroom?" → Yes, you can! (With permission)'},
  {emoji:'📱', situation:'Use your phone during a test', answer:"can't", explanation:'You can\'t use your phone during a test — it\'s not allowed!'},
  {emoji:'🗣️', situation:'Talk to your friend during free time', answer:'can', explanation:'During free time, you can talk! / Durante el tiempo libre, ¡puedes hablar!'},
  {emoji:'🍕', situation:'Eat lunch in the cafeteria', answer:'can', explanation:'Yes! You can eat in the cafeteria. / ¡Sí! Puedes comer en la cafetería.'},
  {emoji:'⚽', situation:'Play football inside the classroom', answer:"can't", explanation:'You can\'t play football inside! It\'s dangerous. / ¡No puedes jugar fútbol adentro!'},
  {emoji:'🎒', situation:'Bring your backpack to class', answer:'can', explanation:'You can bring your backpack. / Puedes traer tu mochila.'},
  {emoji:'📢', situation:'Shout in the library', answer:"can't", explanation:'You can\'t shout in the library — others are reading! / ¡No puedes gritar en la biblioteca!'},
  {emoji:'✏️', situation:'Use a pencil during the exam', answer:'can', explanation:'Yes, you can use a pencil! / ¡Sí, puedes usar un lápiz!'}
];

/* ===== ANIMAL POWERS DATA ===== */
const ANIMAL_POWERS = [
  {emoji:'🐦', name:'Parrot', abilities:[
    {text:'can talk', correct:true},
    {text:'can swim underwater', correct:false},
    {text:"can't make sounds", correct:false}
  ]},
  {emoji:'🐟', name:'Fish', abilities:[
    {text:'can climb trees', correct:false},
    {text:'can swim', correct:true},
    {text:'can fly high', correct:false}
  ]},
  {emoji:'🦅', name:'Eagle', abilities:[
    {text:"can't see far", correct:false},
    {text:'can fly very fast', correct:true},
    {text:'can swim like a fish', correct:false}
  ]},
  {emoji:'🐘', name:'Elephant', abilities:[
    {text:'can fly', correct:false},
    {text:'can bark', correct:false},
    {text:'can remember paths', correct:true}
  ]}
];

/* ===== SCHOOL RULES DATA ===== */
const SCHOOL_RULES = [
  {emoji:'📚', text:'read books in the library', answer:'can'},
  {emoji:'🏃', text:'run in the corridor', answer:"can't"},
  {emoji:'✏️', text:'use pencils and pens', answer:'can'},
  {emoji:'📱', text:'use your phone during class', answer:"can't"},
  {emoji:'🤝', text:'help your classmates', answer:'can'},
  {emoji:'🍔', text:'eat in the classroom', answer:"can't"},
  {emoji:'🎨', text:'draw in art class', answer:'can'},
  {emoji:'🔊', text:'make loud noise in the library', answer:"can't"}
];

/* ===== QUIZ QUESTIONS ===== */
const QUIZ_QUESTIONS = [
  // MCQ (8)
  {type:'mcq', q:'Which sentence is correct?', choices:['She can sings.','She can sing.','She cans to sing.','She can sings well.'], answer:1, topic:'base-verb-rule'},
  {type:'mcq', q:'How do we make a negative sentence?', choices:['I don\'t can swim.','I can\'t swim.','I not can swim.','I can swim not.'], answer:1, topic:'negative-form'},
  {type:'mcq', q:'Choose the correct question form:', choices:['Can she run?','She can run?','Does she can run?','Can she runs?'], answer:0, topic:'question-form'},
  {type:'mcq', q:'"Can you dance?" → No, _____', choices:['No, I don\'t.','No, you can\'t.','No, I can\'t.','No, he can\'t.'], answer:2, topic:'short-answers'},
  {type:'mcq', q:'Which is CORRECT?', choices:['He cans jump.','He can to jump.','He can jump.','He jump can.'], answer:2, topic:'base-verb-rule'},
  {type:'mcq', q:'A bird can _____ .', choices:['swim','fly','climb','bark'], answer:1, topic:'vocabulary'},
  {type:'mcq', q:'"Can I open the window?" — This is a question about...', choices:['ability','permission','vocabulary','short answers'], answer:1, topic:'uses-of-can'},
  {type:'mcq', q:'Which verb form is correct after CAN?', choices:['swimming','swims','to swim','swim'], answer:3, topic:'base-verb-rule'},
  // Fill (5)
  {type:'fill', q:'She ____ dance very well.', answer:'can', topic:'affirmative', hint:'Positive ability'},
  {type:'fill', q:'He ____ fly — he\'s not a bird!', answer:"can't", topic:'negative-form', hint:'Negative ability'},
  {type:'fill', q:'____ you help me?', answer:'Can', topic:'question-form', hint:'Question form'},
  {type:'fill', q:'We ____ run in the classroom.', answer:"can't", topic:'uses-of-can', hint:'School rule — not allowed'},
  {type:'fill', q:'Birds ____ fly.', answer:'can', topic:'vocabulary', hint:'Animal ability'},
  // Writing (2)
  {type:'writing', q:'Write ONE sentence using CAN for ability. (Una oración usando CAN para habilidad.)', topic:'writing', minWords:3},
  {type:'writing', q:'Write ONE sentence using CAN\'T. (Una oración usando CAN\'T.)', topic:'writing', minWords:3}
];

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  renderUI();
  initExercises();
  initGames();
  updateProgress();
});

/* ===== STORAGE ===== */
function saveState() {
  localStorage.setItem('cantSiteState', JSON.stringify({
    studentName: STATE.studentName,
    sectionsCompleted: STATE.sectionsCompleted,
    scores: STATE.scores,
    quizDone: STATE.quizDone,
    quizResults: STATE.quizResults
  }));
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem('cantSiteState');
    if (saved) {
      const data = JSON.parse(saved);
      STATE.studentName = data.studentName || '';
      STATE.sectionsCompleted = data.sectionsCompleted || STATE.sectionsCompleted;
      STATE.scores = data.scores || STATE.scores;
      STATE.quizDone = data.quizDone || false;
      STATE.quizResults = data.quizResults || null;
    }
  } catch(e) { console.warn('Storage load error:', e); }
}

/* ===== RENDER UI ===== */
function renderUI() {
  renderName();
  updateProgress();
  updateTopicCards();
}

/* ===== NAME ===== */
function validateName(name) {
  if (!name || name.trim().length < 2) return 'Name must be at least 2 characters. / Mínimo 2 caracteres.';
  if (name.trim().length > 20) return 'Name must be max 20 characters. / Máximo 20 caracteres.';
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-]+$/.test(name.trim())) return 'Only letters, spaces and hyphens. / Solo letras, espacios y guiones.';
  return null;
}

function saveName() {
  const input = document.getElementById('nameInput');
  const errorEl = document.getElementById('nameError');
  const val = input.value.trim();
  const error = validateName(val);
  if (error) {
    errorEl.textContent = error;
    errorEl.classList.add('show');
    return;
  }
  errorEl.classList.remove('show');
  STATE.studentName = val;
  saveState();
  renderName();
  showMotivational('Great! Welcome, ' + val + '! 🎉');
}

function renderName() {
  const greeting = document.getElementById('heroGreeting');
  const nameSection = document.getElementById('nameSection');
  const nameDisplay = document.getElementById('nameDisplay');
  const progressLabel = document.getElementById('progressLabel');
  const nameInput = document.getElementById('nameInput');

  if (STATE.studentName) {
    greeting.textContent = 'Hi, ' + STATE.studentName + '! 👋';
    nameSection.classList.add('hidden');
    nameDisplay.classList.remove('hidden');
    progressLabel.textContent = STATE.studentName + '\'s Progress';
    nameInput.value = STATE.studentName;
  } else {
    greeting.textContent = 'Hi there! 👋';
    nameSection.classList.remove('hidden');
    nameDisplay.classList.add('hidden');
    progressLabel.textContent = 'Progress';
  }
}

function editName() {
  const nameSection = document.getElementById('nameSection');
  const nameDisplay = document.getElementById('nameDisplay');
  nameSection.classList.remove('hidden');
  nameDisplay.classList.add('hidden');
  document.getElementById('nameInput').focus();
}

/* ===== SECTION NAVIGATION ===== */
function showSection(id) {
  document.querySelectorAll('.section-page').forEach(s => s.classList.remove('active'));
  document.getElementById('section-' + id).classList.add('active');
  document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
  window.scrollTo({top:0, behavior:'smooth'});
  if (document.getElementById('navMenu').classList.contains('open')) toggleNav();
  // Auto-render quiz state
  if (id === 'quiz') renderQuizState();
}

function toggleNav() {
  document.getElementById('navMenu').classList.toggle('open');
}

/* ===== TABS ===== */
function switchTab(group, tabId) {
  const panels = document.querySelectorAll(`#section-${group==='ex'?'exercises':group==='games'?'games':'grammar'} .tab-panel`);
  panels.forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`${group === 'grammar'? 'grammar' : group}-${tabId}`);
  if (panel) panel.classList.add('active');

  const buttons = document.querySelectorAll(`#section-${group==='ex'?'exercises':group==='games'?'games':'grammar'} .tab-btn`);
  buttons.forEach(b => b.classList.remove('active'));
  const idx = Array.from(buttons).findIndex(b => b.getAttribute('onclick') && b.getAttribute('onclick').includes(tabId));
  if (idx > -1) buttons[idx].classList.add('active');
}

/* ===== PROGRESS ===== */
function updateProgress() {
  const total = 5; // grammar, glossary, exercises, games, quiz
  let done = 0;
  if (STATE.sectionsCompleted.grammar) done++;
  if (STATE.sectionsCompleted.glossary) done++;
  if (STATE.sectionsCompleted.exercises) done++;
  if (STATE.sectionsCompleted.games) done++;
  if (STATE.quizDone) done++;
  const pct = Math.round((done / total) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressPct').textContent = pct + '%';
  updateTopicCards();
}

function markSectionDone(section) {
  STATE.sectionsCompleted[section] = true;
  saveState();
  updateProgress();
}

function updateTopicCards() {
  const keys = ['grammar','glossary','exercises','games'];
  keys.forEach(k => {
    const card = document.getElementById('topic-' + k);
    if (card) {
      if (STATE.sectionsCompleted[k]) card.classList.add('completed');
      else card.classList.remove('completed');
    }
  });
  if (document.getElementById('topic-quiz')) {
    if (STATE.quizDone) document.getElementById('topic-quiz').classList.add('completed');
    else document.getElementById('topic-quiz').classList.remove('completed');
  }
}

/* ===== MOTIVATIONAL ===== */
const MOTIVATIONAL_MSGS = [
  'Amazing work! 🌟', 'Keep going! 💪', 'You\'re a star! ⭐',
  'Excellent! 🎉', 'Super! 🚀', 'Brilliant! 🧠', 'Fantastic! 🎊'
];

function showMotivational(msg) {
  const el = document.getElementById('motivationalMsg');
  el.classList.remove('hidden');
  const name = STATE.studentName;
  el.textContent = msg || (name ? `Great job, ${name}! ` : '') + MOTIVATIONAL_MSGS[Math.floor(Math.random() * MOTIVATIONAL_MSGS.length)];
  setTimeout(() => { el.classList.add('hidden'); }, 4000);
}

/* ===== GLOSSARY ===== */
function initGlossary() {
  const grid = document.getElementById('glossaryGrid');
  if (!grid || grid.children.length > 0) return;
  grid.innerHTML = VERBS.map((v, i) => `
    <div class="verb-card" onclick="showVerbExample(${i})" role="button" tabindex="0" aria-label="${v.word} — ${v.es}" onkeydown="if(event.key==='Enter')showVerbExample(${i})">
      <span class="verb-icon">${v.icon}</span>
      <div class="verb-word">${v.word}</div>
      <div class="verb-ex">${v.es}</div>
    </div>
  `).join('');
}

function showVerbExample(idx) {
  const v = VERBS[idx];
  const box = document.getElementById('verbExample');
  const title = document.getElementById('verbExTitle');
  const content = document.getElementById('verbExContent');
  box.classList.remove('hidden');
  title.textContent = v.icon + ' ' + v.word + ' — ' + v.es;
  content.innerHTML = `
    <div class="formula-box" style="font-size:1.1rem;">${v.ex}</div>
    <ul class="example-list" style="margin-top:10px;">
      <li><span class="en">I <strong>can</strong> ${v.word}.</span></li>
      <li><span class="en">I <strong>can't</strong> ${v.word}.</span></li>
      <li><span class="en"><strong>Can</strong> you ${v.word}?</span><span class="es"> ¿Puedes ${v.es}?</span></li>
    </ul>
  `;
  box.scrollIntoView({behavior:'smooth', block:'nearest'});
}

/* ===== INIT EXERCISES ===== */
function initExercises() {
  initGlossary();
  renderFillExercises();
  renderMCExercises();
  renderMatchExercises();
  renderImageExercises();
  renderTFExercises();
  renderWritingExercises();
  renderUnscrambleExercises();
}

/* ===== FILL IN BLANK ===== */
function renderFillExercises() {
  const container = document.getElementById('fillExercises');
  if (!container) return;
  STATE.fillAnswered = new Array(FILL_EXERCISES.length).fill(false);
  container.innerHTML = FILL_EXERCISES.map((ex, i) => {
    const parts = ex.sentence.split('____');
    return `
      <div class="exercise-wrapper" id="fill-wrap-${i}">
        <div class="exercise-header">
          <span class="exercise-num">${i+1}</span>
          <div class="exercise-q" style="display:flex;flex-wrap:wrap;align-items:center;gap:4px;">
            ${parts[0]} <input class="blank-input" id="fill-${i}" type="text" maxlength="30" aria-label="Fill in the blank ${i+1}" autocomplete="off"/>
            ${parts[1] !== undefined ? parts[1] : ''}
          </div>
        </div>
        <div class="hint-area">
          <button class="btn btn-accent btn-sm" onclick="toggleHint('fillhint-${i}')">💡 Hint</button>
          <div class="hint-text" id="fillhint-${i}">💡 ${ex.hint}</div>
        </div>
        <div class="feedback" id="fill-fb-${i}"></div>
      </div>
    `;
  }).join('');
}

function checkAllFill() {
  let correct = 0;
  FILL_EXERCISES.forEach((ex, i) => {
    const input = document.getElementById('fill-' + i);
    const fb = document.getElementById('fill-fb-' + i);
    if (!input) return;
    const userVal = input.value.trim().toLowerCase().replace(/'/g,"'");
    const acceptedAnswers = ex.answer.toLowerCase().split('/').map(a => a.trim().replace(/'/g,"'"));
    const isCorrect = acceptedAnswers.some(a => userVal === a || userVal === a.replace("'","'"));
    input.classList.remove('correct', 'wrong');
    input.classList.add(isCorrect ? 'correct' : 'wrong');
    input.disabled = true;
    fb.className = 'feedback show ' + (isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      fb.innerHTML = '✅ Correct! / ¡Correcto!';
      correct++;
    } else {
      fb.innerHTML = `❌ The answer is: <strong>${ex.answer}</strong><br/><span class="es-note">${ex.explanation}</span>`;
    }
    STATE.fillAnswered[i] = isCorrect;
  });
  const scoreEl = document.getElementById('fillScore');
  scoreEl.classList.remove('hidden');
  scoreEl.innerHTML = `<span class="score-text">📊 Score: ${correct}/${FILL_EXERCISES.length}</span>`;
  STATE.scores.fill = correct;
  saveState();
  if (correct >= FILL_EXERCISES.length * 0.7) { markSectionDone('exercises'); showMotivational(); }
}

function resetFill() {
  renderFillExercises();
  document.getElementById('fillScore').classList.add('hidden');
}

/* ===== MULTIPLE CHOICE ===== */
function renderMCExercises() {
  const container = document.getElementById('mcExercises');
  if (!container) return;
  STATE.mcAnswered = new Array(MC_EXERCISES.length).fill(null);
  container.innerHTML = MC_EXERCISES.map((ex, i) => `
    <div class="exercise-wrapper" id="mc-wrap-${i}">
      <div class="exercise-header">
        <span class="exercise-num">${i+1}</span>
        <div class="exercise-q">${ex.q}</div>
      </div>
      <div class="choices">
        ${ex.choices.map((c, ci) => `
          <button class="choice-btn" id="mc-${i}-${ci}" onclick="selectMC(${i},${ci})" aria-label="Option ${ci+1}: ${c}">${c}</button>
        `).join('')}
      </div>
      <div class="hint-area">
        <button class="btn btn-accent btn-sm" onclick="toggleHint('mchint-${i}')">💡 Hint</button>
        <div class="hint-text" id="mchint-${i}">💡 ${ex.hint}</div>
      </div>
      <div class="feedback" id="mc-fb-${i}"></div>
    </div>
  `).join('');
}

function selectMC(exIdx, choiceIdx) {
  if (STATE.mcAnswered[exIdx] !== null) return;
  const ex = MC_EXERCISES[exIdx];
  const fb = document.getElementById('mc-fb-' + exIdx);
  const isCorrect = choiceIdx === ex.answer;
  // Disable all buttons
  ex.choices.forEach((_, ci) => {
    const btn = document.getElementById(`mc-${exIdx}-${ci}`);
    btn.disabled = true;
    if (ci === ex.answer) btn.classList.add('correct');
    else if (ci === choiceIdx && !isCorrect) btn.classList.add('wrong');
  });
  STATE.mcAnswered[exIdx] = isCorrect;
  fb.className = 'feedback show ' + (isCorrect ? 'correct' : 'wrong');
  fb.innerHTML = isCorrect
    ? '✅ Correct! / ¡Correcto!'
    : `❌ Correct answer: <strong>${ex.choices[ex.answer]}</strong><br/><span class="es-note">${ex.explanation}</span>`;
  STATE.scores.mc = (STATE.scores.mc || 0) + (isCorrect ? 1 : 0);
  saveState();
  if (isCorrect) showMotivational();
}

/* ===== MATCHING ===== */
let currentMatchSet = 0;
let matchState = [];

function renderMatchExercises() {
  const container = document.getElementById('matchExercises');
  if (!container) return;
  renderMatchSet(0);
}

function renderMatchSet(setIdx) {
  const container = document.getElementById('matchExercises');
  if (!container) return;
  const set = MATCH_SETS[setIdx];
  matchState = {matched: new Array(set.left.length).fill(false), selectedLeft: null, selectedRight: null};

  let html = `
    <div style="margin-bottom:12px;">
      <span style="font-weight:800;color:var(--purple);">${setIdx+1}/${MATCH_SETS.length}:</span> ${set.title}
    </div>
    <div class="matching-container">
      <div class="match-column" id="match-left">
        ${set.left.map((item, i) => `<div class="match-item" id="mleft-${i}" onclick="selectMatchLeft(${i})" tabindex="0" onkeydown="if(event.key==='Enter')selectMatchLeft(${i})">${item}</div>`).join('')}
      </div>
      <div class="match-column" id="match-right">
        ${shuffleArray([...set.right.map((item,i) => ({item,i}))]).map(({item,i}) => `<div class="match-item" id="mright-${i}" onclick="selectMatchRight(${i})" tabindex="0" onkeydown="if(event.key==='Enter')selectMatchRight(${i})">${item}</div>`).join('')}
      </div>
    </div>
    <div style="text-align:center;margin-top:12px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
      ${MATCH_SETS.map((_,i) => `<button class="btn btn-sm ${i===setIdx?'btn-primary':'btn-outline'}" onclick="renderMatchSet(${i})">Set ${i+1}</button>`).join('')}
      <button class="btn btn-outline btn-sm" onclick="renderMatchSet(${setIdx})">Reset 🔄</button>
    </div>
    <div class="feedback mt-12" id="match-fb"></div>
  `;
  container.innerHTML = html;
  currentMatchSet = setIdx;
  matchState.set = set;
  matchState.matchedCount = 0;
}

function selectMatchLeft(idx) {
  if (matchState.matched[idx]) return;
  document.querySelectorAll('#match-left .match-item').forEach(el => el.classList.remove('selected'));
  document.getElementById('mleft-' + idx).classList.add('selected');
  matchState.selectedLeft = idx;
  tryMatch();
}

function selectMatchRight(idx) {
  const alreadyMatched = document.getElementById('mright-' + idx).classList.contains('matched');
  if (alreadyMatched) return;
  document.querySelectorAll('#match-right .match-item').forEach(el => el.classList.remove('selected'));
  document.getElementById('mright-' + idx).classList.add('selected');
  matchState.selectedRight = idx;
  tryMatch();
}

function tryMatch() {
  if (matchState.selectedLeft === null || matchState.selectedRight === null) return;
  const set = matchState.set;
  const leftIdx = matchState.selectedLeft;
  const rightIdx = matchState.selectedRight;
  const correctRightIdx = set.pairs[leftIdx];
  const leftEl = document.getElementById('mleft-' + leftIdx);
  const rightEl = document.getElementById('mright-' + rightIdx);

  if (rightIdx === correctRightIdx) {
    leftEl.classList.add('matched');
    rightEl.classList.add('matched');
    leftEl.classList.remove('selected');
    rightEl.classList.remove('selected');
    matchState.matched[leftIdx] = true;
    matchState.matchedCount++;
    if (matchState.matchedCount === set.left.length) {
      document.getElementById('match-fb').className = 'feedback show correct';
      document.getElementById('match-fb').innerHTML = '🎉 All matched! / ¡Todo emparejado! ' + (STATE.studentName ? `Great job, ${STATE.studentName}!` : '');
      STATE.scores.match = (STATE.scores.match || 0) + 1;
      saveState();
      showMotivational();
    }
  } else {
    leftEl.classList.add('wrong-match');
    rightEl.classList.add('wrong-match');
    setTimeout(() => {
      leftEl.classList.remove('wrong-match','selected');
      rightEl.classList.remove('wrong-match','selected');
    }, 800);
  }
  matchState.selectedLeft = null;
  matchState.selectedRight = null;
}

/* ===== IMAGE EXERCISES ===== */
function renderImageExercises() {
  const container = document.getElementById('imageExercises');
  if (!container) return;
  STATE.imageAnswered = new Array(IMAGE_EXERCISES.length).fill(null);
  container.innerHTML = IMAGE_EXERCISES.map((ex, i) => `
    <div class="exercise-wrapper" id="img-wrap-${i}">
      <div class="scene-container" style="max-width:400px;">
        <img src="assets/${ex.scene}.svg" alt="${ex.scene} scene" style="border-radius:12px;"/>
      </div>
      <div class="exercise-header" style="margin-top:10px;">
        <span class="exercise-num">${i+1}</span>
        <div class="exercise-q">${ex.q}</div>
      </div>
      <div class="choices">
        ${ex.choices.map((c, ci) => `
          <button class="choice-btn" id="img-${i}-${ci}" onclick="selectImage(${i},${ci})">${c}</button>
        `).join('')}
      </div>
      <div class="hint-area">
        <button class="btn btn-accent btn-sm" onclick="toggleHint('imghint-${i}')">💡 Hint</button>
        <div class="hint-text" id="imghint-${i}">💡 ${ex.hint}</div>
      </div>
      <div class="feedback" id="img-fb-${i}"></div>
    </div>
  `).join('');
}

function selectImage(exIdx, choiceIdx) {
  if (STATE.imageAnswered[exIdx] !== null) return;
  const ex = IMAGE_EXERCISES[exIdx];
  const isCorrect = choiceIdx === ex.answer;
  ex.choices.forEach((_, ci) => {
    const btn = document.getElementById(`img-${exIdx}-${ci}`);
    btn.disabled = true;
    if (ci === ex.answer) btn.classList.add('correct');
    else if (ci === choiceIdx) btn.classList.add('wrong');
  });
  STATE.imageAnswered[exIdx] = isCorrect;
  const fb = document.getElementById('img-fb-' + exIdx);
  fb.className = 'feedback show ' + (isCorrect ? 'correct' : 'wrong');
  fb.innerHTML = isCorrect
    ? '✅ Correct! / ¡Correcto!'
    : `❌ Correct: <strong>${ex.choices[ex.answer]}</strong><br/><span class="es-note">${ex.explanation}</span>`;
  STATE.scores.image = (STATE.scores.image || 0) + (isCorrect ? 1 : 0);
  saveState();
  if (isCorrect) showMotivational();
}

/* ===== TRUE/FALSE ===== */
function renderTFExercises() {
  const container = document.getElementById('tfExercises');
  if (!container) return;
  STATE.tfAnswered = new Array(TF_EXERCISES.length).fill(null);
  container.innerHTML = TF_EXERCISES.map((ex, i) => `
    <div class="exercise-wrapper" id="tf-wrap-${i}">
      <div class="exercise-header">
        <span class="exercise-num">${i+1}</span>
        <div class="exercise-q">${ex.statement}</div>
      </div>
      <div class="tf-container">
        <button class="tf-btn true-btn" id="tf-t-${i}" onclick="selectTF(${i},true)" aria-label="True">✅ True</button>
        <button class="tf-btn false-btn" id="tf-f-${i}" onclick="selectTF(${i},false)" aria-label="False">❌ False</button>
      </div>
      <div class="feedback" id="tf-fb-${i}"></div>
    </div>
  `).join('');
}

function selectTF(idx, userAnswer) {
  if (STATE.tfAnswered[idx] !== null) return;
  const ex = TF_EXERCISES[idx];
  const isCorrect = userAnswer === ex.answer;
  const trueBtn = document.getElementById('tf-t-' + idx);
  const falseBtn = document.getElementById('tf-f-' + idx);
  trueBtn.disabled = true;
  falseBtn.disabled = true;
  if (ex.answer) trueBtn.classList.add('correct');
  else falseBtn.classList.add('correct');
  if (!isCorrect) {
    if (userAnswer) trueBtn.classList.add('wrong');
    else falseBtn.classList.add('wrong');
  }
  STATE.tfAnswered[idx] = isCorrect;
  const fb = document.getElementById('tf-fb-' + idx);
  fb.className = 'feedback show ' + (isCorrect ? 'correct' : 'wrong');
  fb.innerHTML = isCorrect
    ? '✅ Correct! / ¡Correcto! ' + ex.explanation
    : `❌ The answer is: <strong>${ex.answer ? 'True' : 'False'}</strong><br/><span class="es-note">${ex.explanation}</span>`;
  STATE.scores.tf = (STATE.scores.tf || 0) + (isCorrect ? 1 : 0);
  saveState();
  if (isCorrect) showMotivational();
}

/* ===== WRITING ===== */
function renderWritingExercises() {
  const container = document.getElementById('writingExercises');
  if (!container) return;
  STATE.writingState = new Array(WRITING_EXERCISES.length).fill(null);
  container.innerHTML = WRITING_EXERCISES.map((ex, i) => `
    <div class="exercise-wrapper" id="writing-wrap-${i}">
      <div class="exercise-header">
        <span class="exercise-num">${i+1}</span>
        <div class="exercise-q">${ex.prompt}</div>
      </div>
      <div class="model-example">
        <strong>Model example:</strong> <em>${ex.model}</em>
      </div>
      <textarea class="writing-textarea" id="writing-${i}" aria-label="Writing exercise ${i+1}" placeholder="Write your answer here..."></textarea>
      <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-secondary btn-sm" onclick="checkWriting(${i})">Check ✔️</button>
        <button class="btn btn-outline btn-sm" onclick="clearWriting(${i})">Clear</button>
      </div>
      <ul class="checklist" id="checklist-${i}">
        ${ex.checklist.map((c,ci) => `<li class="pending" id="chk-${i}-${ci}">⬜ ${c}</li>`).join('')}
      </ul>
      <div class="feedback" id="writing-fb-${i}"></div>
    </div>
  `).join('');
}

function checkWriting(idx) {
  const ex = WRITING_EXERCISES[idx];
  const textarea = document.getElementById('writing-' + idx);
  const text = textarea.value.trim();
  const fb = document.getElementById('writing-fb-' + idx);
  if (text.length < 3) {
    fb.className = 'feedback show wrong';
    fb.innerHTML = '❌ Please write your answer first! / ¡Escribe tu respuesta primero!';
    return;
  }
  const words = text.split(/\s+/).length;
  if (words < ex.minWords) {
    fb.className = 'feedback show wrong';
    fb.innerHTML = `❌ Write at least ${ex.minWords} words! / ¡Escribe al menos ${ex.minWords} palabras!`;
    return;
  }
  // Evaluate checklist
  const textLow = text.toLowerCase();
  const checks = [
    /^[A-Z]/.test(text),
    /[.?!]$/.test(text.trim()),
    /\bcan\b/.test(textLow),
    /\bcan't\b|\bcannot\b/.test(textLow) || idx === 1 || idx === 3 || idx === 6,
    words >= ex.minWords
  ];
  let passed = 0;
  ex.checklist.forEach((c, ci) => {
    const liEl = document.getElementById(`chk-${idx}-${ci}`);
    const result = checks[ci] !== undefined ? checks[ci] : true;
    liEl.className = result ? 'pass' : 'fail';
    liEl.innerHTML = (result ? '✅ ' : '❌ ') + c;
    if (result) passed++;
  });
  const score = Math.round((passed / ex.checklist.length) * 100);
  fb.className = 'feedback show ' + (score >= 60 ? 'correct' : 'wrong');
  fb.innerHTML = `${score >= 60 ? '✅' : '⚠️'} ${score}% — ${score >= 80 ? 'Excellent!' : score >= 60 ? 'Good job! Keep improving.' : 'Check the list above.'}
    <span class="es-note">${score >= 60 ? '¡Muy bien!' : 'Revisa la lista arriba.'}</span>`;
  STATE.writingState[idx] = score;
  STATE.scores.writing = (STATE.scores.writing || 0) + (score >= 60 ? 1 : 0);
  saveState();
  if (score >= 60) showMotivational();
}

function clearWriting(idx) {
  document.getElementById('writing-' + idx).value = '';
  document.getElementById('writing-fb-' + idx).className = 'feedback';
  const ex = WRITING_EXERCISES[idx];
  ex.checklist.forEach((_, ci) => {
    const li = document.getElementById(`chk-${idx}-${ci}`);
    li.className = 'pending';
    li.innerHTML = '⬜ ' + ex.checklist[ci];
  });
}

/* ===== UNSCRAMBLE ===== */
function renderUnscrambleExercises() {
  const container = document.getElementById('unscrambleExercises');
  if (!container) return;
  STATE.unscrambleState = UNSCRAMBLE_EXERCISES.map(ex => ({
    shuffled: shuffleArray([...ex.words.map((w,i)=>({w,i}))]),
    placed: []
  }));
  container.innerHTML = UNSCRAMBLE_EXERCISES.map((ex, i) => `
    <div class="exercise-wrapper" id="unscramble-wrap-${i}">
      <div class="exercise-header">
        <span class="exercise-num">${i+1}</span>
        <div class="exercise-q">Put the words in order:</div>
      </div>
      <div style="font-size:0.82rem;color:var(--text-light);margin-bottom:8px;">Click words to build the sentence below. / Haz clic para ordenar la oración.</div>
      <div class="scramble-words" id="scramble-bank-${i}"></div>
      <div style="font-size:0.82rem;color:var(--text-light);margin:4px 0;">Your answer / Tu respuesta:</div>
      <div class="scramble-answer" id="scramble-answer-${i}"></div>
      <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-secondary btn-sm" onclick="checkUnscramble(${i})">Check ✔️</button>
        <button class="btn btn-outline btn-sm" onclick="resetUnscramble(${i})">Reset 🔄</button>
      </div>
      <div class="feedback" id="unscramble-fb-${i}"></div>
    </div>
  `).join('');
  UNSCRAMBLE_EXERCISES.forEach((_, i) => renderUnscrambleSet(i));
}

function renderUnscrambleSet(idx) {
  const st = STATE.unscrambleState[idx];
  const bank = document.getElementById('scramble-bank-' + idx);
  const ans = document.getElementById('scramble-answer-' + idx);
  if (!bank || !ans) return;

  bank.innerHTML = st.shuffled.map(({w, i}) => {
    const isPlaced = st.placed.some(p => p.origIdx === i);
    return `<div class="word-chip ${isPlaced?'locked':''}" id="chip-bank-${idx}-${i}" onclick="moveWordToAnswer(${idx},${i})">${w}</div>`;
  }).join('');

  ans.innerHTML = st.placed.map(p => `
    <div class="word-chip in-answer" id="chip-ans-${idx}-${p.origIdx}" onclick="moveWordToBank(${idx},${p.origIdx})">${p.w}</div>
  `).join('');
}

function moveWordToAnswer(exIdx, wordIdx) {
  const st = STATE.unscrambleState[exIdx];
  const wordObj = UNSCRAMBLE_EXERCISES[exIdx].words;
  if (st.placed.some(p => p.origIdx === wordIdx)) return;
  st.placed.push({origIdx: wordIdx, w: wordObj[wordIdx]});
  renderUnscrambleSet(exIdx);
}

function moveWordToBank(exIdx, wordIdx) {
  const st = STATE.unscrambleState[exIdx];
  st.placed = st.placed.filter(p => p.origIdx !== wordIdx);
  renderUnscrambleSet(exIdx);
}

function checkUnscramble(idx) {
  const ex = UNSCRAMBLE_EXERCISES[idx];
  const st = STATE.unscrambleState[idx];
  const fb = document.getElementById('unscramble-fb-' + idx);
  const userSentence = st.placed.map(p => p.w).join(' ');
  const expected = ex.words.join(' ');
  const isCorrect = userSentence.toLowerCase().replace(/[.?!]/g,'') === expected.toLowerCase().replace(/[.?!]/g,'');
  fb.className = 'feedback show ' + (isCorrect ? 'correct' : 'wrong');
  fb.innerHTML = isCorrect
    ? `✅ Correct! "${userSentence}" ✓`
    : `❌ Try again! Hint: the correct sentence is: <strong>${expected}</strong>`;
  if (isCorrect) {
    STATE.scores.unscramble = (STATE.scores.unscramble || 0) + 1;
    saveState();
    showMotivational();
  }
}

function resetUnscramble(idx) {
  STATE.unscrambleState[idx] = {
    shuffled: shuffleArray([...UNSCRAMBLE_EXERCISES[idx].words.map((w,i)=>({w,i}))]),
    placed: []
  };
  renderUnscrambleSet(idx);
  document.getElementById('unscramble-fb-' + idx).className = 'feedback';
}

/* ===== GAMES ===== */
function initGames() {
  initSort();
  initPolice();
  initAnimalPowers();
  initSchoolRules();
}

/* Sort game */
let sortCardPlacements = {}; // idx -> 'can' | 'cant' | null

function initSort() {
  sortCardPlacements = {};
  STATE.sortSelected = null;
  const bank = document.getElementById('sortBank');
  const canItems = document.getElementById('sortCanItems');
  const cantItems = document.getElementById('sortCantItems');
  const fb = document.getElementById('sortFeedback');
  if (!bank) return;
  fb.className = 'feedback';
  fb.innerHTML = '';
  canItems.innerHTML = '';
  cantItems.innerHTML = '';

  const shuffled = shuffleArray([...SORT_ITEMS.map((item, i) => ({...item, idx: i}))]);
  bank.innerHTML = shuffled.map(item => `
    <div class="sort-card" id="sort-card-${item.idx}" onclick="selectSortCard(${item.idx})" role="button" tabindex="0">
      ${item.text}
    </div>
  `).join('');

  // Add click listeners to the columns
  document.getElementById('sortCan').onclick = () => placeSortCard('can');
  document.getElementById('sortCant').onclick = () => placeSortCard('cant');
}

function selectSortCard(idx) {
  // Deselect previously selected
  document.querySelectorAll('.sort-card').forEach(c => c.style.outline = '');
  if (STATE.sortSelected && STATE.sortSelected.idx === idx) {
    STATE.sortSelected = null;
    return;
  }
  STATE.sortSelected = {idx, type: SORT_ITEMS[idx].type};
  const card = document.getElementById('sort-card-' + idx);
  if (card) card.style.outline = '3px solid var(--primary)';

  // Show helper message
  const fb = document.getElementById('sortFeedback');
  fb.className = 'feedback show correct';
  fb.innerHTML = '👆 Now click the <strong>CAN</strong> or <strong>CAN\'T</strong> column to place the card!';
}

function placeSortCard(column) {
  if (!STATE.sortSelected) return;
  const {idx} = STATE.sortSelected;
  const card = document.getElementById('sort-card-' + idx);
  if (!card) { STATE.sortSelected = null; return; }

  // Move card visually to the target column items area
  const targetId = column === 'can' ? 'sortCanItems' : 'sortCantItems';
  const targetEl = document.getElementById(targetId);

  // Create a copy in the column
  const clone = document.createElement('div');
  clone.className = 'sort-card placed';
  clone.id = 'placed-card-' + idx;
  clone.textContent = SORT_ITEMS[idx].text;
  clone.style.cursor = 'pointer';
  clone.onclick = () => returnSortCard(idx);
  targetEl.appendChild(clone);

  // Mark original as placed
  card.style.opacity = '0.35';
  card.style.pointerEvents = 'none';
  card.style.outline = '';

  // Track placement
  sortCardPlacements[idx] = column;
  STATE.sortSelected = null;

  const fb = document.getElementById('sortFeedback');
  fb.className = 'feedback show correct';
  fb.innerHTML = '✅ Card placed! Click it in the column to move it back, or select another card.';
}

function returnSortCard(idx) {
  // Remove from column
  const placed = document.getElementById('placed-card-' + idx);
  if (placed) placed.remove();
  delete sortCardPlacements[idx];

  // Restore original card
  const card = document.getElementById('sort-card-' + idx);
  if (card) {
    card.style.opacity = '';
    card.style.pointerEvents = '';
  }
}

function checkSort() {
  const total = SORT_ITEMS.length;
  const placed = Object.keys(sortCardPlacements).length;
  const fb = document.getElementById('sortFeedback');

  if (placed < total) {
    fb.className = 'feedback show wrong';
    fb.innerHTML = `⚠️ Please sort all ${total} cards first! You've placed ${placed}/${total}. / Ordena todas las tarjetas primero.`;
    return;
  }

  let correct = 0;
  SORT_ITEMS.forEach((item, i) => {
    const userPlacement = sortCardPlacements[i];
    const correctType = item.type === 'can' ? 'can' : 'cant';
    const isCorrect = userPlacement === correctType;
    if (isCorrect) correct++;

    // Color the placed card
    const placedCard = document.getElementById('placed-card-' + i);
    if (placedCard) {
      placedCard.style.borderColor = isCorrect ? 'var(--green)' : 'var(--red)';
      placedCard.style.background = isCorrect ? '#DCFCE7' : '#FEE2E2';
      if (!isCorrect) {
        placedCard.title = `Should be in: ${item.type.toUpperCase()}`;
        placedCard.textContent = item.text + ` → should be ${item.type.toUpperCase()}`;
      }
    }
  });

  fb.className = 'feedback show ' + (correct >= total * 0.7 ? 'correct' : 'wrong');
  fb.innerHTML = `${correct >= total * 0.7 ? '🎉' : '💪'} Score: ${correct}/${total}! ${correct === total ? 'Perfect!' : 'Check the red cards — they\'re in the wrong column.'}
    <span class="es-note">${correct >= total * 0.7 ? '¡Muy bien!' : 'Revisa las tarjetas rojas.'}</span>`;

  if (correct >= total * 0.7) {
    markSectionDone('games');
    showMotivational();
  }
}

/* Permission Police */
function initPolice() {
  STATE.policeAnswered = new Array(POLICE_SCENARIOS.length).fill(null);
  const container = document.getElementById('policeScenarios');
  if (!container) return;
  container.innerHTML = POLICE_SCENARIOS.map((s, i) => `
    <div class="scenario-card" id="police-card-${i}">
      <span class="emoji">${s.emoji}</span>
      <div class="situation">${s.situation}</div>
      <div class="perm-choices">
        <button class="perm-btn can-btn" id="perm-can-${i}" onclick="answerPolice(${i}, 'can')">✅ CAN</button>
        <button class="perm-btn cant-btn" id="perm-cant-${i}" onclick="answerPolice(${i}, 'cant')">❌ CAN'T</button>
      </div>
      <div class="feedback" id="perm-fb-${i}" style="margin-top:8px;font-size:0.82rem;"></div>
    </div>
  `).join('');
}

function answerPolice(idx, answer) {
  if (STATE.policeAnswered[idx] !== null) return;
  const scenario = POLICE_SCENARIOS[idx];
  // Normalize: compare 'cant' == "can't"
  const normalizedAnswer = answer === 'cant' ? "can't" : answer;
  const isCorrect = normalizedAnswer === scenario.answer;
  STATE.policeAnswered[idx] = isCorrect;
  document.getElementById('perm-can-' + idx).disabled = true;
  document.getElementById('perm-cant-' + idx).disabled = true;
  if (scenario.answer === 'can') {
    document.getElementById('perm-can-' + idx).classList.add('correct');
    if (!isCorrect) document.getElementById('perm-cant-' + idx).classList.add('wrong');
  } else {
    document.getElementById('perm-cant-' + idx).classList.add('correct');
    if (!isCorrect) document.getElementById('perm-can-' + idx).classList.add('wrong');
  }
  const fb = document.getElementById('perm-fb-' + idx);
  fb.className = 'feedback show ' + (isCorrect ? 'correct' : 'wrong');
  fb.innerHTML = isCorrect ? '✅ ' + scenario.explanation : '❌ ' + scenario.explanation;

  const allDone = STATE.policeAnswered.every(a => a !== null);
  if (allDone) {
    const correct = STATE.policeAnswered.filter(Boolean).length;
    document.getElementById('policeResult').innerHTML = `
      <div class="motivational">🎉 Game complete! Score: ${correct}/${POLICE_SCENARIOS.length}
      ${STATE.studentName ? `Great job, ${STATE.studentName}!` : ''}</div>
    `;
    markSectionDone('games');
    showMotivational();
  }
}

/* Animal Powers */
function initAnimalPowers() {
  STATE.animalAnswered = new Array(ANIMAL_POWERS.length).fill(null);
  const grid = document.getElementById('animalGrid');
  if (!grid) return;
  grid.innerHTML = ANIMAL_POWERS.map((animal, i) => `
    <div class="animal-card-game">
      <span class="animal-emoji">${animal.emoji}</span>
      <div class="animal-name">${animal.name}</div>
      <div class="ability-choices">
        ${animal.abilities.map((ab, ai) => `
          <button class="ability-btn" id="animal-${i}-${ai}" onclick="answerAnimal(${i},${ai},${ab.correct})">${ab.text}</button>
        `).join('')}
      </div>
      <div class="feedback" id="animal-fb-${i}" style="margin-top:6px;font-size:0.82rem;"></div>
    </div>
  `).join('');
}

function answerAnimal(animalIdx, abilityIdx, isCorrect) {
  if (STATE.animalAnswered[animalIdx] !== null) return;
  STATE.animalAnswered[animalIdx] = isCorrect;
  const animal = ANIMAL_POWERS[animalIdx];
  animal.abilities.forEach((_, ai) => {
    const btn = document.getElementById(`animal-${animalIdx}-${ai}`);
    btn.disabled = true;
    if (animal.abilities[ai].correct) btn.classList.add('correct');
    else if (ai === abilityIdx) btn.classList.add('wrong');
  });
  const fb = document.getElementById('animal-fb-' + animalIdx);
  fb.className = 'feedback show ' + (isCorrect ? 'correct' : 'wrong');
  fb.innerHTML = isCorrect ? '✅ Correct!' : '❌ Try again!';

  const allDone = STATE.animalAnswered.every(a => a !== null);
  if (allDone) {
    const correct = STATE.animalAnswered.filter(Boolean).length;
    document.getElementById('animalResult').innerHTML = `
      <div class="motivational">🦁 Done! Score: ${correct}/${ANIMAL_POWERS.length}
      ${STATE.studentName ? ` Well done, ${STATE.studentName}!` : ''}</div>
    `;
    markSectionDone('games');
  }
}

/* School Rules */
function initSchoolRules() {
  STATE.rulesAnswered = new Array(SCHOOL_RULES.length).fill(null);
  const container = document.getElementById('schoolRules');
  if (!container) return;
  container.innerHTML = SCHOOL_RULES.map((rule, i) => `
    <div class="rule-item" id="rule-item-${i}">
      <span class="rule-emoji">${rule.emoji}</span>
      <div class="rule-text">You _____ ${rule.text}</div>
      <div class="rule-choices">
        <button class="rule-btn can-r" id="rule-can-${i}" onclick="answerRule(${i}, 'can')">CAN ✅</button>
        <button class="rule-btn cant-r" id="rule-cant-${i}" onclick="answerRule(${i}, 'cant')">CAN'T ❌</button>
      </div>
    </div>
  `).join('');
}

function answerRule(idx, answer) {
  if (STATE.rulesAnswered[idx] !== null) return;
  const rule = SCHOOL_RULES[idx];
  // Normalize: compare 'cant' == "can't"
  const normalizedAnswer = answer === 'cant' ? "can't" : answer;
  const isCorrect = normalizedAnswer === rule.answer;
  STATE.rulesAnswered[idx] = isCorrect;
  document.getElementById('rule-can-' + idx).disabled = true;
  document.getElementById('rule-cant-' + idx).disabled = true;
  if (rule.answer === 'can') {
    document.getElementById('rule-can-' + idx).classList.add('correct');
    if (!isCorrect) document.getElementById('rule-cant-' + idx).classList.add('wrong');
  } else {
    document.getElementById('rule-cant-' + idx).classList.add('correct');
    if (!isCorrect) document.getElementById('rule-can-' + idx).classList.add('wrong');
  }
  const item = document.getElementById('rule-item-' + idx);
  // Remove any previous feedback in this item
  const oldFb = item.querySelector('.feedback');
  if (oldFb) oldFb.remove();
  const fb = document.createElement('div');
  fb.className = 'feedback show ' + (isCorrect ? 'correct' : 'wrong');
  fb.innerHTML = isCorrect ? `✅ You ${rule.answer} ${rule.text}` : `❌ You ${rule.answer} ${rule.text}`;
  item.appendChild(fb);

  const allDone = STATE.rulesAnswered.every(a => a !== null);
  if (allDone) {
    const correct = STATE.rulesAnswered.filter(Boolean).length;
    document.getElementById('rulesResult').innerHTML = `
      <div class="motivational">🏫 School Rules Done! ${correct}/${SCHOOL_RULES.length} correct!
      ${STATE.studentName ? ` Great, ${STATE.studentName}!` : ''}</div>
    `;
    markSectionDone('games');
    showMotivational();
  }
}

/* ===== QUIZ ===== */
function renderQuizState() {
  if (STATE.quizDone) {
    document.getElementById('quizIntro').classList.add('hidden');
    document.getElementById('quizForm').classList.add('hidden');
    if (STATE.quizResults) {
      document.getElementById('quizLocked').classList.remove('hidden');
      document.getElementById('quizResult').classList.remove('show');
    } else {
      document.getElementById('quizLocked').classList.remove('hidden');
    }
  } else {
    document.getElementById('quizLocked').classList.add('hidden');
    document.getElementById('quizForm').classList.add('hidden');
    document.getElementById('quizResult').classList.remove('show');
    document.getElementById('quizIntro').classList.remove('hidden');
    if (STATE.studentName) {
      document.getElementById('quizIntroTitle').textContent = '🏆 Ready, ' + STATE.studentName + '?';
    }
  }
}

function startQuiz() {
  document.getElementById('quizIntro').classList.add('hidden');
  document.getElementById('quizForm').classList.remove('hidden');
  renderQuizForm();
}

function renderQuizForm() {
  const container = document.getElementById('quizQuestions');
  container.innerHTML = QUIZ_QUESTIONS.map((q, i) => {
    if (q.type === 'mcq') return `
      <div class="quiz-question">
        <div class="quiz-q-num">Question ${i+1} of ${QUIZ_QUESTIONS.length}</div>
        <div class="quiz-q-text">${q.q}</div>
        <div class="quiz-choices">
          ${q.choices.map((c, ci) => `
            <label class="quiz-choice" id="quizlabel-${i}-${ci}">
              <input type="radio" name="quiz-q-${i}" value="${ci}" aria-label="${c}" onchange="selectQuizChoice(${i},${ci})"/> ${c}
            </label>
          `).join('')}
        </div>
      </div>
    `;
    if (q.type === 'fill') return `
      <div class="quiz-question">
        <div class="quiz-q-num">Question ${i+1} of ${QUIZ_QUESTIONS.length}</div>
        <div class="quiz-q-text">${q.q}</div>
        <input class="quiz-fill" id="quiz-fill-${i}" type="text" placeholder="Your answer..." maxlength="30" aria-label="Fill in the blank"/>
        <div style="font-size:0.8rem;color:var(--text-light);margin-top:4px;">💡 Hint: ${q.hint}</div>
      </div>
    `;
    if (q.type === 'writing') return `
      <div class="quiz-question">
        <div class="quiz-q-num">Question ${i+1} of ${QUIZ_QUESTIONS.length}</div>
        <div class="quiz-q-text">${q.q}</div>
        <textarea class="quiz-writing" id="quiz-writing-${i}" placeholder="Write here..." aria-label="Writing question ${i+1}"></textarea>
      </div>
    `;
    return '';
  }).join('');
}

function selectQuizChoice(qIdx, choiceIdx) {
  document.querySelectorAll(`label[id^="quizlabel-${qIdx}"]`).forEach(l => l.classList.remove('selected'));
  document.getElementById(`quizlabel-${qIdx}-${choiceIdx}`).classList.add('selected');
}

function submitQuiz() {
  if (STATE.quizDone) return;

  let score = 0;
  const results = [];
  const reviewTopics = new Set();

  QUIZ_QUESTIONS.forEach((q, i) => {
    let correct = false;
    let userAnswer = '';

    if (q.type === 'mcq') {
      const selected = document.querySelector(`input[name="quiz-q-${i}"]:checked`);
      userAnswer = selected ? parseInt(selected.value) : -1;
      correct = userAnswer === q.answer;
      if (!correct) reviewTopics.add(q.topic);
    } else if (q.type === 'fill') {
      const inp = document.getElementById('quiz-fill-' + i);
      userAnswer = inp ? inp.value.trim().toLowerCase() : '';
      correct = userAnswer === q.answer.toLowerCase() || userAnswer === q.answer.toLowerCase().replace("'","'");
      if (!correct) reviewTopics.add(q.topic);
    } else if (q.type === 'writing') {
      const ta = document.getElementById('quiz-writing-' + i);
      userAnswer = ta ? ta.value.trim() : '';
      // Basic auto-scoring: check minimum words, has can/can't
      const words = userAnswer.split(/\s+/).length;
      correct = words >= (q.minWords || 3) && /\bcan\b/i.test(userAnswer);
      if (!correct) reviewTopics.add(q.topic);
    }

    if (correct) score++;
    results.push({
      qNum: i+1,
      q: q.q,
      correct,
      userAnswer: q.type === 'mcq' ? (q.choices[userAnswer] || 'No answer') : userAnswer,
      correctAnswer: q.type === 'mcq' ? q.choices[q.answer] : q.answer
    });
  });

  STATE.quizDone = true;
  STATE.quizResults = {score, total: QUIZ_QUESTIONS.length, results, reviewTopics: [...reviewTopics]};
  saveState();
  updateProgress();

  // Show results
  showQuizResults();
}

function showQuizResults() {
  if (!STATE.quizResults) return;
  const {score, total, results, reviewTopics} = STATE.quizResults;
  document.getElementById('quizIntro').classList.add('hidden');
  document.getElementById('quizForm').classList.add('hidden');
  document.getElementById('quizLocked').classList.add('hidden');

  const resultEl = document.getElementById('quizResult');
  resultEl.classList.add('show');

  const pct = Math.round((score/total)*100);
  const name = STATE.studentName;

  document.getElementById('resultTitle').textContent =
    name ? `Final results for ${name} 🏆` : 'Final Results 🏆';

  document.getElementById('resultScore').textContent = score + '/' + total;
  document.getElementById('resultMsg').innerHTML = `
    <div style="font-size:1.1rem;margin-bottom:12px;">
      ${pct >= 80 ? '🌟 Excellent! ' : pct >= 60 ? '👍 Good work! ' : '💪 Keep practicing! '}
      ${name ? `Well done, ${name}!` : ''}
      <em style="font-size:0.85rem;color:var(--text-light);display:block;margin-top:4px;">${pct}% correct</em>
    </div>
  `;

  document.getElementById('resultItems').innerHTML = results.map(r => `
    <div class="result-item ${r.correct ? 'correct' : 'wrong'}">
      <span>${r.correct ? '✅' : '❌'}</span>
      <div>
        <strong>Q${r.qNum}:</strong> ${r.q}<br/>
        <span style="font-size:0.82rem;">Your answer: ${r.userAnswer} ${r.correct ? '' : `→ Correct: ${r.correctAnswer}`}</span>
      </div>
    </div>
  `).join('');

  const reviewEl = document.getElementById('reviewSuggestions');
  if (reviewTopics.length > 0) {
    reviewEl.classList.remove('hidden');
    const topicNames = {
      'base-verb-rule': 'Base Verb Rule (can + play, not plays)',
      'negative-form': 'Negative Form (can\'t / cannot)',
      'question-form': 'Question Form (Can + subject + verb?)',
      'short-answers': 'Short Answers (Yes, I can. / No, I can\'t.)',
      'uses-of-can': 'Uses of CAN (ability, permission, possibility)',
      'vocabulary': 'Vocabulary & Animal Abilities',
      'writing': 'Writing Sentences with CAN / CAN\'T'
    };
    document.getElementById('reviewList').innerHTML = reviewTopics.map(t =>
      `<li>📖 Review: <strong>${topicNames[t] || t}</strong></li>`
    ).join('');
  }
}

/* ===== TEACHER MODE ===== */
function toggleTeacherModal() {
  if (STATE.teacherMode) {
    deactivateTeacher();
    return;
  }
  document.getElementById('teacherModal').classList.add('show');
  document.getElementById('teacherPasswordInput').value = '';
  document.getElementById('teacherPwError').textContent = '';
  setTimeout(() => document.getElementById('teacherPasswordInput').focus(), 100);
}

function closeTeacherModal() {
  document.getElementById('teacherModal').classList.remove('show');
}

function submitTeacherPassword() {
  const val = document.getElementById('teacherPasswordInput').value;
  if (val === TEACHER_PASSWORD) {
    STATE.teacherMode = true;
    document.getElementById('teacherBtn').classList.add('active');
    document.getElementById('teacherBtn').textContent = '🔓 Teacher ON';
    document.getElementById('teacherPanel').classList.add('show');
    closeTeacherModal();
  } else {
    document.getElementById('teacherPwError').textContent = '❌ Wrong password. / Contraseña incorrecta.';
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('teacherModal').classList.contains('show')) {
    submitTeacherPassword();
  }
});

function deactivateTeacher() {
  STATE.teacherMode = false;
  STATE.showAnswers = false;
  document.getElementById('teacherBtn').classList.remove('active');
  document.getElementById('teacherBtn').textContent = '🔐 Teacher';
  document.getElementById('teacherPanel').classList.remove('show');
}

function toggleAnswers() {
  STATE.showAnswers = !STATE.showAnswers;
  alert(STATE.showAnswers
    ? '👁️ Answers are now visible in exercises!\n(Hint texts and correct answers shown.)'
    : '🙈 Answers hidden again.');
}

function resetQuizTeacher() {
  if (confirm('Reset the final quiz? The student will be able to take it again.\n¿Reiniciar el quiz final?')) {
    STATE.quizDone = false;
    STATE.quizResults = null;
    saveState();
    renderQuizState();
    updateProgress();
    alert('Quiz reset! / ¡Quiz reiniciado!');
  }
}

function resetStudentName() {
  if (confirm('Reset student name?\n¿Eliminar el nombre del estudiante?')) {
    STATE.studentName = '';
    saveState();
    renderName();
    document.getElementById('heroGreeting').textContent = 'Hi there! 👋';
  }
}

/* ===== HINT ===== */
function toggleHint(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('show');
}

/* ===== UTILITY ===== */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
