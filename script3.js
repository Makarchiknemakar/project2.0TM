let answers = document.querySelectorAll('.answer');
let question  = document.querySelector('.question');
let result = document.querySelector('.result');
let start = document.querySelector('.start');
let container = document.querySelector('.container');
let mainContainer = document.querySelector('.main-container');

let signs = ['-','+','/','*'];

start.addEventListener('click', function(){
    container.style.display = "flex";
    mainContainer.style.display = "none";

    currentQuest.display();
});

class Question {
    constructor(a, b) {
        this.a = a || this.randNumber(-100, 100);
        this.b = b || this.randNumber(0, 100);
        this.sign = this.randSign();
        this.b = this.sign === '/' && this.b === 0 ? 1 : this.b; // уникнення ділення на 0
        this.question = `${this.a} ${this.sign} ${this.b}`;
        this.correct = this.makeCorrect();
        this.answers = [
            this.randNumber(this.correct - 10, this.correct + 10),
            this.randNumber(this.correct - 10, this.correct + 10),
            this.randNumber(this.correct - 10, this.correct + 10),
            this.randNumber(this.correct - 10, this.correct + 10),
            this.correct
        ];
        this.shuffle(this.answers);
    }

    display() {
        question.innerHTML = this.question;
        for (let i = 0; i < answers.length; i++) {
            answers[i].innerHTML = this.answers[i];
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
        let x = this.randNumber(0, 3);
        return signs[x];
    }

    makeCorrect() {
        switch (this.sign) {
            case '-':
                return this.a - this.b;
            case '+':
                return this.a + this.b;
            case '*':
                return this.a * this.b;
            case '/':
                return Number((this.a / this.b).toFixed(2));
        }
    }
}

let currentQuest = new Question();

let rightCount = 0;
let total = 0;
let questionCount = 0;

function testResult() {
    mainContainer.style.display = "flex";
    container.style.display = "none";
    result.innerHTML = `
        Ви дали: ${rightCount} правильних відповідей із: ${total}
        Точність: ${(rightCount / total * 100).toFixed(2)}%
    `;
}

for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener('click', function() {
        if (answers[i].innerHTML == currentQuest.correct) {
            answers[i].style.backgroundColor = "#00ff00";
            anime({
                targets: answers[i],
                delay: 500,
                backgroundColor: '#ff7f50', 
                duration: 500, 
                easing: 'linear' 
            });
            rightCount++;
        } else {
            answers[i].style.backgroundColor = "#ff0000";
            anime({
                targets: answers[i],
                delay: 500,
                backgroundColor: '#ff7f50', 
                duration: 500,
                easing: 'linear' 
            });
        }

        total++;
        questionCount++;

        if (questionCount >= 12) {
            testResult();
        } else {
            // Скидання кольору кнопок перед наступним питанням
            for (let btn of answers) {
                btn.style.backgroundColor = '#ff7f50';
            }

            currentQuest = new Question();
            currentQuest.display();
        }
    });
}
