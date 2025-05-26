 // ПОВНИЙ JAVASCRIPT
let answers = document.querySelectorAll('.answer');
let question = document.querySelector('.question');
let result = document.querySelector('.result');
let start = document.querySelector('.start');
let container = document.querySelector('.container');
let mainContainer = document.querySelector('.main-container');

let signs = ['-', '+', '/', '*'];
let currentQuest;
let rightCount = 0;
let total = 0;
let questionCount = 0;

class Question {
    constructor(a, b) {
        this.a = a || this.randNumber(-100, 100);
        this.b = b || this.randNumber(1, 100); // уникнення 0 для ділення
        this.sign = this.randSign();
        this.b = this.sign === '/' && this.b === 0 ? 1 : this.b;
        this.question = `${this.a} ${this.sign} ${this.b}`;
        this.correct = this.makeCorrect();
        this.answers = this.generateAnswers();
        this.shuffle(this.answers);
    }

    generateAnswers() {
        let set = new Set();
        set.add(this.correct);

        while (set.size < 5) {
            let fake = this.randNumber(this.correct - 10, this.correct + 10);
            if (this.sign === '/') fake = Number(fake.toFixed(2));
            set.add(fake);
        }

        return Array.from(set);
    }

    display() {
        question.innerHTML = this.question;
        for (let i = 0; i < answers.length; i++) {
            answers[i].innerHTML = this.answers[i];
            answers[i].style.backgroundColor = '#ff7f50'; // скидання кольору
        }
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    randNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    randSign() {
        return signs[Math.floor(Math.random() * signs.length)];
    }

    makeCorrect() {
        switch (this.sign) {
            case '-': return this.a - this.b;
            case '+': return this.a + this.b;
            case '*': return this.a * this.b;
            case '/': return Number((this.a / this.b).toFixed(2));
        }
    }
}

function testResult() {
    mainContainer.style.display = "flex";
    container.style.display = "none";
    result.style.display = "block";
    result.innerHTML = `
        Ви дали: ${rightCount} правильних відповідей із ${total}.<br>
        Точність: ${(rightCount / total * 100).toFixed(2)}%
    `;
}

// Старт гри
start.addEventListener('click', function () {
    rightCount = 0;
    total = 0;
    questionCount = 0;
    result.style.display = "none";

    container.style.display = "flex";
    mainContainer.style.display = "none";

    currentQuest = new Question();
    currentQuest.display();
});

// Обробка відповіді
answers.forEach(btn => {
    btn.addEventListener('click', function () {
        let userAnswer = Number(btn.innerHTML);
        let correctAnswer = Number(currentQuest.correct.toFixed(2));

        if (userAnswer.toFixed(2) == correctAnswer.toFixed(2)) {
            btn.style.backgroundColor = "#00ff00";
            rightCount++;
        } else {
            btn.style.backgroundColor = "#ff0000";
        }

        total++;
        questionCount++;

        setTimeout(() => {
            if (questionCount >= 12) {
                testResult();
            } else {
                currentQuest = new Question();
                currentQuest.display();
            }
        }, 600);
    });
});
