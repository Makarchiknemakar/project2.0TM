class HistoryLangQuestion {
    constructor() {
        const questionPool = [
            {
                
                question: 'Коли була прийнята Конституція України?',
                correct: '1996',
                answers: ['1991','1996','2004','2014']
            },
          {
                
                question: 'Хто був першим президентом незалежної України',
                correct: 'Леонід Кравчук',
                answers: ['Петро Порошенко','Леонід Кучма','Леонід Кравчук','Віктор Ющенко']
            },
      {
                
                question: 'Коли відбулося хрещення Русі?',
                correct: '988',
                answers: ['882','988','1019','1054']
            },{
                
                question: 'Яка країна розпочала Першу світову війну',
                correct: ' Австро-Угорщина',
                answers: ['Росія','Німеччина',' Австро-Угорщина','Франція']
            },{
                
                question: 'Хто був автором "Заповіту"?',
                correct: 'Тарас Шевченко',
                answers: [' Іван Франко','Леся Українка','Тарас Шевченко',' Григорій Сковорода']
            },{
                
                question: 'Коли Україна здобула незалежність?',
                correct: '24 серпня 1991',
                answers: ['24 серпня 1991','1 грудня 1990',' 28 червня 1996',' 22 січня 1918']
            },{
                
                question: 'Який діяч очолював Запорозьку Січ?',
                correct: 'Дмитро Вишневецький',
                answers: ['Богдан Хмельницький','Іван Мазепа',' Петро Конашевич-Сагайдачний','Дмитро Вишневецький']
            },{
                
                question: 'Коли тривала Друга світова війна?',
                correct: '1939–1945',
                answers: [' 1937–1945','1939–1945',' 1941–1945','1939–1944']
            },{
                
                question: ' Столиця Галицько-Волинського князівства:',
                 correct: 'Галич',
                answers: [' Київ','Чернігів','Львів','Галич']
            },{
                
                question: 'У якому році було укладено Берестейську унію?',
                correct: ' 1596',
                answers: [' 1596','1648','1569','1620']
            },{
                
                question: ' Коли почався Майдан (Революція Гідності)?',
                correct: ' 2013',
                answers: [' 2004','2014',' 2013','2012']
            },{
                
                question: 'Яка країна першою визнала незалежність України?',
                correct: ' Канада',
                answers: ['Польща',' Канада','Росія',' США']
            }
        ];

        const randomIndex = HistoryLangQuestion.counter++;
        const data = questionPool[randomIndex];

        this.question = data.question;
        this.correct = data.correct;
        this.answers = [...data.answers];
        this.shuffle(this.answers);
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}
HistoryLangQuestion.counter = 0;

const startBtn = document.querySelector('.start');
const questionEl = document.querySelector('.question');
const answersEl = document.querySelector('.answers');
const resultEl = document.querySelector('.result');
const container = document.querySelector('.container');
const mainContainer = document.querySelector('.main-container');

let questions = [];
let current = 0;
let score = 0;

startBtn.addEventListener('click', () => {
    questions = [];
    HistoryLangQuestion.counter = 0;
    for (let i = 0; i < 12; i++) {
        questions.push(new  HISTORY LangQuestion());
    }
    current = 0;
    score = 0;
    mainContainer.style.display = 'none';
    container.style.display = 'block';
    showQuestion();
});

function showQuestion() {
    if (current >= questions.length) {
        container.style.display = 'none';
        mainContainer.style.display = 'block';
        resultEl.textContent = `Ваш результат: ${score} з ${questions.length}`;
        return;
    }

    const q = questions[current];
    questionEl.textContent = q.question;
    answersEl.innerHTML = '';

    q.answers.forEach(ans => {
        const div = document.createElement('div');
        div.className = 'answer';
        div.textContent = ans;
        div.addEventListener('click', () => {
            if (ans === q.correct) score++;
            current++;
            showQuestion();
        });
        answersEl.appendChild(div);
    });
}
