const questionContainer = document.getElementById("question-container");
const questionTextElement = document.getElementById("question-text");
const answerButtons = document.getElementsByClassName("answer-option");
const answerButtonsContainer = document.getElementById("answer-options");
const resetTimerButton = document.getElementById("reset-timer");
const deleteAnswersButton = document.getElementById("delete-answers");
const askFriendButton = document.getElementById("ask-friend");
const nextQuestionButton = document.getElementById("next-question");
const correctSound = new Audio("correct.mp3");
const fireworksEffect = document.getElementById("fireworks-effect");
const timerElement = document.getElementById("timer");
const scoreElement1 = document.getElementById("score1");
const scoreElement2 = document.getElementById("score2");
const container = document.getElementById('fireworks-container');
const alertpopup = document.getElementById("alertpopup");
const pointpopup = document.getElementById("finalpopup");
const pointText1 = document.getElementById("point1-text");
const pointText2 = document.getElementById("point2-text");
const winnerText = document.getElementById("winner-text");
const alertText = document.getElementById("alerttext");
const circleCheck = document.getElementById("circle-check");
const circleXmark = document.getElementById("circle-xmark");
const typeGq = document.getElementById("type-g-q");
const popContainerAlert = document.getElementById("pop-container-alert");
const groupName = document.getElementById("group-name");


let currentQuestionIndex = 0;
let score1 = 0;
let score2 = 0;
let timer = 30;
let timerInterval;
var fireworks;
var frined=false;
var dalateA=false;
var meet;
var counter=0;

function passData(i) {
    meet = i;
    // Encode the data and navigate to the second page
    question = i;
    window.location.href = "index3.html?meet=" + encodeURIComponent(i);
}


// Function to start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer === 0) {
            clearInterval(timerInterval);
            handleTimeUp();
        }
    }, 1000);
}

// Function to handle when time runs out
function handleTimeUp() {
    disableAnswerButtons();
    handleAnswer();
    resetTimerButton.disabled = true;
    deleteAnswersButton.disabled = true;
    askFriendButton.disabled = true;
    nextQuestionButton.disabled = false;
    scoreElement1.textContent = score1;
    scoreElement2.textContent = score2;
}

function getQuestion1(){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    meet = urlParams.get("meet");
    if(meet == 1 ){
        return questions11;
    }else if(meet==2){
        return questions21;
    }else if(meet==3){
        return questions31;
    }else if(meet==4){
        return questions41;
    }else if(meet==5){
        return questions51;
    }else if(meet==6){
        return questions61;
    }else if(meet==7){
        return questions71;
    }else if(meet==8){
        return questions81;
    }else if(meet==9){
        return questions91;
    }
}

function getQuestion2(){
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  meet = urlParams.get("meet");
  if(meet == 1 ){
      return questions12;
  }else if(meet==2){
      return questions22;
  }else if(meet==3){
      return questions32;
  }else if(meet==4){
      return questions42;
  }else if(meet==5){
      return questions52;
  }else if(meet==6){
      return questions62;
  }else if(meet==7){
      return questions72;
  }else if(meet==8){
      return questions82;
  }else if(meet==9){
      return questions92;
  }
}


// Function to display the current question
function displayQuestion() {
    frined=false;
    dalateA=false;
    var question;

      if(counter%2==0){
        question = getQuestion1();
        groupName.textContent = "الفريق الاول";
      }else{
          question = getQuestion2();
          groupName.textContent = "الفريق الثاني";
      }
    
    
    
    if (question[currentQuestionIndex].typeofAnswer === 'multiple') {
        deleteAnswersButton.style.display = "block";
    }else{
        deleteAnswersButton.style.display = "none";
    }
    questionTextElement.textContent = question[currentQuestionIndex].text;
    typeGq.textContent = question[currentQuestionIndex].group;
    answers = question[currentQuestionIndex].answers;
    // answerButtonsContainer
    var buttonHTML="";
    for (let i = 0; i < answers.length; i++) {
         buttonHTML += '<button class="answer-option"">'+answers[i]+'</button>';
       
    }
    answerButtonsContainer.innerHTML = buttonHTML;  
    for (let i = 0; i < answers.length; i++) {
        answerButtons[i].disabled = false;
        answerButtons[i].addEventListener("click", handleAnswer);
    }
    resetTimer();
    startTimer();
    nextQuestionButton.disabled = true;
}

// Function to handle the selected answer
function handleAnswer() {
    clearInterval(timerInterval);
    disableAnswerButtons();
    resetTimerButton.disabled = true;
    deleteAnswersButton.disabled = true;
    askFriendButton.disabled = true;

    const selectedAnswerIndex = Array.from(answerButtons).indexOf(this);
    var q;

    if(counter%2==0){
      q = getQuestion1();
    }else{
      q = getQuestion2();
    }

    if (selectedAnswerIndex === q[currentQuestionIndex].correctAnswer) {
        if(counter%2==0){
          if(frined==true){
            score1 += (q[currentQuestionIndex].point - 2);
          }else if(dalateA==true){
              score1 += (q[currentQuestionIndex].point - 3);
          }else{
              score1 += q[currentQuestionIndex].point;
          }
          
        }else{
          if(frined==true){
            score2 += (q[currentQuestionIndex].point - 2);
          }else if(dalateA==true){
              score2 += (q[currentQuestionIndex].point - 3);
          }else{
              score2 += q[currentQuestionIndex].point;
          }
          
        }
        scoreElement1.textContent = score1;
        scoreElement2.textContent = score2;
        displayFireworks();
        if(q[currentQuestionIndex].typeofAnswer === 'multiple'){
          alertpopup.style.display = "flex";
          popContainerAlert.style.borderColor = "green";
          alertText.style.color = "green";
          circleXmark.style.display = "none";
          circleCheck.style.display = "block";
          var i =q[currentQuestionIndex].correctAnswer;
          var t=q[currentQuestionIndex].answers[i];
          alertText.textContent = "الاجابة الصحيحة:"+t;
          // Close the popup after 3 seconds
          setTimeout(function() {
              alertpopup.style.display = "none";
          }, 2500);
        }else{
            alertpopup.style.display = "flex";
            popContainerAlert.style.borderColor = "green";
            alertText.style.color = "green";
            circleXmark.style.display = "none";
            circleCheck.style.display = "block";
            var t =q[currentQuestionIndex].correctAnswerText;
            alertText.textContent = "الاجابة الصحيحة:"+t;
            // Close the popup after 3 seconds
            setTimeout(function() {
                alertpopup.style.display = "none";
            }, 2500);
        }
    } else {
      if(counter%2==0){
        score1 += 0;
      }else{
        score2 += 0;
      }
        
        if(q[currentQuestionIndex].typeofAnswer === 'multiple'){
            alertpopup.style.display = "flex";
            popContainerAlert.style.borderColor = "red";
            alertText.style.color = "red";
            circleCheck.style.display = "none";
            circleXmark.style.display = "block";
            var i =q[currentQuestionIndex].correctAnswer;
            var t=q[currentQuestionIndex].answers[i];
            alertText.textContent = "الاجابة الصحيحة:"+t;
            // Close the popup after 3 seconds
            setTimeout(function() {
                alertpopup.style.display = "none";
            }, 2500);
        }else{
            alertpopup.style.display = "flex";
            popContainerAlert.style.borderColor = "red";
            alertText.style.color = "red";
            circleCheck.style.display = "none";
            circleXmark.style.display = "block";
            var t =q[currentQuestionIndex].correctAnswerText;
            alertText.textContent = "الاجابة الصحيحة:"+t;
            // Close the popup after 3 seconds
            setTimeout(function() {
                alertpopup.style.display = "none";
            }, 2500);
        }
    }
    var lQ=1;
    if(counter === 28){

      currentQuestionIndex=9;

      lQ=0;
    }
    if(counter >= 20){

      if(lQ==1){
        counter=counter+2;
        currentQuestionIndex++;
      }else{
        counter=counter+1;
        currentQuestionIndex++;
      }
      
    }else{
      if(counter%2==0){
        counter++;
      }else{
          counter++;
        currentQuestionIndex++;
      }
    }
    
    

    // if (currentQuestionIndex === q.length) {
    //     // transitionToSecondType();
    // } else {
        nextQuestionButton.disabled = false;
    // }
}

// Function to disable answer buttons
function disableAnswerButtons() {
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].disabled = true;
    }
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    timer = 30;
    timerElement.textContent = timer;
    resetTimerButton.disabled = false;
    deleteAnswersButton.disabled = false;
    askFriendButton.disabled = false;
   
    // startTimer();
  
}

// Function to delete two answers
function deleteTwoAnswers() {
  deleteAnswersButton.disabled = true;

  var q;
    if(counter%2==0){
       q = getQuestion1();
    }else{
       q = getQuestion2();
    }

   
    const question = q[currentQuestionIndex];
    
    if (question.typeofAnswer === 'multiple') {
        alertpopup.style.display = "flex";
        alertText.textContent = "سيتم خصم ثلاث درجات ";
        // Close the popup after 3 seconds
        setTimeout(function() {
            alertpopup.style.display = "none";
        }, 2500);
        const correctAnswerIndex = question.correctAnswer;
        const wrongAnswersIndexes = [];

        // Generate an array of wrong answers indexes
        for (let i = 0; i < question.answers.length; i++) {
            if (i !== correctAnswerIndex) {
            wrongAnswersIndexes.push(i);
            }
        }

        // Shuffle the wrong answers indexes
        wrongAnswersIndexes.sort(() => Math.random() - 0.5);

        // Remove two wrong answers from the answers array
        for (let i = 0; i < 1; i++) {
            var id=wrongAnswersIndexes[i];
            answerButtons[id].style.display = "none";
        }
        dalateA=true;
    }else{
        alertpopup.style.display = "flex";
  alertText.textContent = "لا يمكن استخدام هذه الخاصية";

  // Close the popup after 3 seconds
  setTimeout(function() {
      alertpopup.style.display = "none";
  }, 2500);
    }
}
// Function to generate an array of random indices within a given range
function getRandomIndices(range, count) {
  const indices = [];

  while (indices.length < count) {
    const index = Math.floor(Math.random() * range);
    if (!indices.includes(index)) {
      indices.push(index);
    }
  }

  return indices;
}

// Function to ask a friend for help
function askFriendForHelp() {
    askFriendButton.disabled = true;

    alertpopup.style.display = "flex";
    alertText.textContent = "سيتم خصم درجتين ";

    // Close the popup after 3 seconds
    setTimeout(function() {
        alertpopup.style.display = "none";
    }, 2500);
    frined=true;
}



// Function to display the final score
function displayFinalScore() {
   

      scoreElement1.textContent = score1;
      pointText1.textContent = score1;
      scoreElement2.textContent = score2;
      pointText2.textContent = score2;

      if(score1>score2){
        winnerText.textContent = "الفريق الاول";
        pointText2.style.color = "red";
      }else if(score1<score2){
        winnerText.textContent = "الفريق الثاني";
        pointText1.style.color = "red";
      }else{
        winnerText.textContent = "تعادل";
        pointText1.style.color = "green";
        pointText2.style.color = "green";
      }

    
    pointpopup.style.display = "flex";
    

}

// Event listeners
resetTimerButton.addEventListener("click", resetTimer);
deleteAnswersButton.addEventListener("click", deleteTwoAnswers);
askFriendButton.addEventListener("click", askFriendForHelp);

nextQuestionButton.addEventListener("click", () => {
    nextQuestionButton.disabled = true;
    var q;
    if(counter%2==0){
       q = getQuestion1();
    }else{
       q = getQuestion2();
    }
    
  
    if (currentQuestionIndex === q.length) {
        displayFinalScore();
    } else {
        questionContainer.style.display = "block";
        displayQuestion();
    }
    // correctSound.pause();
        // applauseSound.pause();
        while (container.firstChild) {
            container.removeChild(container.firstChild);
          }

});

function backMain(){
    window.location.href ="index.html";
}
function backGroup(){
    history.back();
}

function displayFireworks() {
    fireworks= particlesJS('fireworks-container', {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#ffd700'
        },
        shape: {
          type: 'star',
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 5
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 10,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: false,
          distance: 500,
          color: '#ffffff',
          opacity: 0.4,
          width: 2
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'bottom',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: false,
            mode: 'repulse'
          },
          onclick: {
            enable: false,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
}



// Start the competition
displayQuestion();


