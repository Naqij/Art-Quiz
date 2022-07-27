const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const gameRef = document.querySelector('#game');
const homeRef = document.querySelector('#home');
const playBtnRef = document.querySelector('#play-btn');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0

const SCORE_POINTS = 20
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    const quiz = fetch("assets/data/questions.json").then(res => res.json()).then(data => data)
    .then(res => res.json())
    .then(data => data)
    getNewQuestion(quiz.questions)
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/finish.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

playBtnRef.addEventListener("click", () => {
    gameRef.classList.remove("hidden")
    homeRef.classList.add("hidden")
    startGame()
})