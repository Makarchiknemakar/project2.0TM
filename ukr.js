class UkrLangQuestion {
    constructor() {
        const questionPool = [
            {
                question: 'Оберіть синонім до слова "гарний":',
                correct: 'вродливий',
                answers: ['брудний', 'вродливий', 'повний', 'добрий', 'звуковий']
            },
            {
                question: 'Оберіть антонім до слова "сильний":',
                correct: 'слабкий',
                answers: ['великий', 'розумний', 'слабкий', 'міцний', 'енергійний']
            },
            {
                question: 'Яке слово написане правильно?',
                correct: 'будь ласка',
                answers: ['будласка', 'будь ласка', 'бутьласка', 'буд ласка', 'будласка']
            },
            {
                question: 'Укажіть правильну форму слова: "У класі багато ___":',
                correct: 'учнів',
                answers: ['ученики', 'учні', 'учнів', 'учень', 'учеників']
            },
            {
                question: 'Яке слово зайве?',
                correct: 'трактор',
                answers: ['олівець', 'ручка', 'зошит', 'трактор', 'папір']
            },
            {
                question: 'До якого роду належить слово "вікно"?',
                correct: 'середній',
                answers: ['чоловічий', 'жіночий', 'середній', 'абстрактний', 'живий']
            },
            {
                question: 'Яка літера пропущена в слові: ма..бутнє?',
                correct: 'й',
                answers: ['и', 'і', 'е', 'й', 'я']
            },
            {
                question: 'Оберіть прикметник:',
                correct: 'смачний',
                answers: ['їсти', 'смачний', 'їжа', 'смак', 'смачно']
            },
            {
                question: 'Що означає фразеологізм "зарубати на носі"?',
                correct: 'добре запам’ятати',
                answers: ['поранись', 'образитись', 'переплутатись', 'добре запам’ятати', 'сумувати']
            },
            {
                question: 'Оберіть дієслово:',
                correct: 'читати',
                answers: ['книга', 'читати', 'читання', 'читаючий', 'прочитаний']
            },
            {
                question: 'Яке речення є окличним?',
                correct: 'Як гарно навесні!',
                answers: ['Я люблю весну.', 'Як гарно навесні!', 'Навесні розквітають квіти.', 'Весна прийшла.', 'Пора прокидатися.']
            },
            {
                question: 'Який префікс треба додати: ...бігти?',
                correct: 'у',
                answers: ['з', 'на', 'у', 'від', 'пере']
            }
        ];

        const randomIndex = UkrLangQuestion.counter++;
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
UkrLangQuestion.counter = 0;

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
    UkrLangQuestion.counter = 0;
    for (let i = 0; i < 12; i++) {
        questions.push(new UkrLangQuestion());
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
