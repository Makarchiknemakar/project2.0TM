class GeographyLangQuestion {
    constructor() {
        const questionPool = [
            {
                
                question: 'Яка річка є найдовшою в Україні?',
                correct: 'Дніпро',
                answers: ['Південний Буг','Дністер','Дніпро','Сіверський Донець']
            },
          {
                
                question: 'Який материк найменший за площею?',
                correct: 'Австралія',
                answers: ['Антарктида',' Європа','Австралія','Південна Америка']
            }, {
                
                question: 'Який клімат переважає в Сахарі?',
                correct: 'Тропічний пустельний',
                answers: ['Субтропічний',' Помірний','Тропічний пустельний',' Екваторіальний']
            }, {
                
               
                question: 'Столиця Канади — це:',
                correct: 'Оттава',
                answers: [' Торонто','Монреаль','Оттава','Ванкувер']
            }, {
                
                question: 'Яка країна має найбільше населення у світі (станом на 2024 рік)?',
                correct: 'Індія',
                answers: ['Індія','Китай','США','Індонезія']
            }, {
                
                question: 'Карпати — це:?',
                correct: 'Складчасті гори середньої висоти',
                answers: ['Вулканічне плато','Складчасті гори середньої висоти','Низовина','Острів']
            }, {
                
                question: 'Яке з наведених морів повністю омиває територію України?',
                correct: 'Азовське',
                answers: ['Азовське','Чорне','Балтійське','Середземне']
            }, {
                
                question: 'Сонце знаходиться у зеніті двічі на рік на:?',
                correct: 'Екваторі',
                answers: ['Екваторі','Тропіках','Північному полюсі','Південному полюсі']
            }, {
                
                question: 'Яке озеро є найглибшим у світі?',
                correct: 'Байкал',
                answers: ['Вікторія','Байкал','Танганьїка','Онтаріо']
            }, {
                
                question: 'Який природний ресурс є основним експортом Саудівської Аравії?',
                correct: ' Нафта',
                answers: [' Вугілля',' Газ',' Золото',' Нафта']
            }, {
                
                question: 'Географічна довгота відлічується від:',
                correct: 'Гринвіцького меридіана',
                answers: ['Екватора','Гринвіцького меридіана','Північного полюса','Початкової паралелі']
            },
               {question: 'Україна межує з такою кількістю держав:',
                correct: '7',
                answers: ['5','6','7','8']
            },] 
                

        const randomIndex = GEOGRAPHY LangQuestion.counter++;
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
GEOGRAPHY LangQuestion.counter = 0;

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
    GEOGRAPHY LangQuestion.counter = 0;
    for (let i = 0; i < 12; i++) {
        questions.push(new  GEOGRAPHY LangQuestion());
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
