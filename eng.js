class EngLangQuestion {
    constructor() {
        const questionPool = [
            {
                question: 'Choose a synonym for "happy":',
                correct: 'joyful',
                answers: ['sad', 'angry', 'joyful', 'tired', 'bored']
            },
            {
                question: 'Choose the correct past tense of "go":',
                correct: 'went',
                answers: ['gone', 'goes', 'went', 'going', 'go']
            },
            {
                question: 'Which word is an adjective?',
                correct: 'beautiful',
                answers: ['beauty', 'beautiful', 'beautify', 'beautifully', 'be']
            },
            {
                question: 'Which is a noun?',
                correct: 'happiness',
                answers: ['happy', 'happiness', 'happily', 'unhappy', 'happier']
            },
            {
                question: 'Choose the opposite of "early":',
                correct: 'late',
                answers: ['fast', 'quick', 'late', 'young', 'slow']
            },
            {
                question: 'Which sentence is correct?',
                correct: 'She speaks English well.',
                answers: [
                    'She speak English good.',
                    'She speaks English well.',
                    'She speaking English good.',
                    'She is speak English well.',
                    'She speaking well English.'
                ]
            },
            {
                question: 'What is the plural of "child"?',
                correct: 'children',
                answers: ['childs', 'childes', 'children', 'childrens', 'child']
            },
            {
                question: 'Which is a preposition?',
                correct: 'under',
                answers: ['run', 'under', 'blue', 'slow', 'think']
            },
            {
                question: 'What does "bright" mean?',
                correct: 'full of light',
                answers: ['very dark', 'full of light', 'cold', 'boring', 'quiet']
            },
            {
                question: 'Choose the correct form: "I ___ a book now."',
                correct: 'am reading',
                answers: ['read', 'am reading', 'reads', 'reading', 'am read']
            },
            {
                question: 'Choose an adverb:',
                correct: 'quickly',
                answers: ['quick', 'quicker', 'quickly', 'quicken', 'quickness']
            },
            {
                question: 'Which is an interjection?',
                correct: 'Wow!',
                answers: ['Cat', 'Wow!', 'Run', 'Blue', 'Fast']
            }
        ];

        const randomIndex = EngLangQuestion.counter++;
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
EngLangQuestion.counter = 0;

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
    EngLangQuestion.counter = 0;
    for (let i = 0; i < 12; i++) {
        questions.push(new EngLangQuestion());
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
        resultEl.textContent = `Your score: ${score} out of ${questions.length}`;
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
