const quiz = document.getElementById('quiz');

const answerEls = document.querySelectorAll('.answer');

const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');

const submitBtn = document.getElementById('submit');



let quizData = [];
let currentQuiz = 0;
let score = 0;


fetch("data.json")
  .then(res => res.json())
  .then(data =>{
      quizData = data;
      loadQuiz();
  })


function loadQuiz(){
    deselectAll();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselectAll(){
  answerEls.forEach(answer => answer.checked = false);
}


function getSelected(){
  let answer;
  answerEls.forEach(el => {
    if(el.checked){
      answer = el.id;
    }
  })
  return answer;
}


submitBtn.addEventListener('click',()=>{
  const answer = getSelected();
  if(answer){
    if(answer === quizData[currentQuiz].correct){
      score++;
    }
    currentQuiz++;
    if(currentQuiz < quizData.length){
      loadQuiz();
    }
    else{
      quiz.innerHTML = `
      <div class = "result">
        <h2>${score}/${quizData.length} are correct. </h2>
        <button onclick = "location.reload()">Restart Quiz </button>
      `
    }
  }
})