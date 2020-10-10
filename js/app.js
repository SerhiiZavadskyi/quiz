document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('btn-start'),
      skipButton = document.getElementById('btn-skip'),
      questionContainer = document.querySelector('.question-container'),
      totalContainer = document.querySelector('.total-container'),
      questionElement = document.querySelector('#question'),
      answerButtons = document.getElementById('answer-buttons'),
      totalPrizeElement = document.getElementById('total-prize'),
      currentPrizeElement = document.getElementById('current-prize'),
      result = document.querySelector('.result');
     
    let shuffledQuestions, currentQuestionIndex;
  
    startButton.addEventListener('click', startGame);
    skipButton.addEventListener('click', skipQuestion);
  
    function startGame() {
      skipButton.classList.remove('hide');
      questionContainer.classList.remove('hide');
      totalContainer.classList.remove('hide');
      document.querySelector('.container').classList.remove('items-center');
      result.classList.add('hide');
      shuffledQuestions = questions.sort(() => Math.random() - 0.5);
      currentQuestionIndex = 0;
      currentPrizeElement.textContent = 100;
      totalPrizeElement.textContent = 0;
      setNextQeustion();
    }
  
    function skipQuestion() {
      currentQuestionIndex++;
      setNextQeustion();
      skipButton.classList.add('hide');
    }
  
    function setNextQeustion() {
      if (+totalPrizeElement.textContent < 1000000) {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
      } else {
        gameOver('Congratulations, you won 1000000!');
      }
    }
  
    function showQuestion(question) {
      questionElement.textContent = question.question;
      question.content.forEach((answer, idx) => {
        const button = document.createElement('button');
        button.classList.add('btn-answer');
        button.textContent = answer;
        if (idx === question.correct) {
          button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
      });
    }
    function selectAnswer(e) {
      const isCorrect = e.target.dataset.correct;
  
      if (isCorrect) {
        totalPrizeElement.textContent =
          +totalPrizeElement.innerText + +currentPrizeElement.innerText;
        currentPrizeElement.textContent = +currentPrizeElement.textContent * 2;
        currentQuestionIndex++;
        setNextQeustion();
      } else {
        gameOver(`Game over your prize is: ${totalPrizeElement.textContent}`);
      }
    }
  
    function gameOver(msg) {
      skipButton.classList.add('hide');
      questionContainer.classList.add('hide');
      totalContainer.classList.add('hide');
      result.classList.remove('hide');
      result.textContent = msg;
    }
    function resetState() {
      while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
      }
    }
  });
  