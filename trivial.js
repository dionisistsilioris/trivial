const result = document.getElementById('result');
let correctAnswer = '';
const score = document.getElementById('score');
const question = document.getElementById('question');
const scoreBoard = {
    correct: 1,
    incorrect: 1
}

//https://opentdb.com/api.php?amount=1&type=multiple
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getNew() {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')

        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // console.log(data.results[0].question);
            document.getElementById('question').innerHTML = data.results[0]['question'];

            let answersList = [];
            answersList.push(data.results[0].correct_answer);
            correctAnswer = data.results[0].correct_answer;
            data.results[0].incorrect_answers.forEach(element => {
                answersList.push(element);

            });
            shuffleArray(answersList);
            let answers = '';
            answersList.forEach(element => {
                answers += '<input id="radioButtons" type="radio" name="answer" value="' + element + '">' + element + '<br> ';

            });

            document.getElementById('answers').innerHTML = answers + `<button type="button" class="btn btn-primary" data-toggle="modal"
             data-target="#exampleModal" id="check" onclick="player()">check</button>`;
            //  + `<p> <button  class="btn btn-primary" onclick="getNew()">Next question</button></p>`
        })

        .catch(error => {
            console.log(error);
        });
}
getNew(question);

let chooseAnswer;

function player() {
    let chooseAnswer = document.querySelector('input[name="answer"]:checked').value;
    if (chooseAnswer === correctAnswer) {
        result.innerHTML = `
      <p style="color:green">Correct </p>
   `
        $("#correct").after(function () {
            return $(this).text("correct : " +scoreBoard.correct++);
        })
        getNew();
        ;

    }
    else if (chooseAnswer != correctAnswer) {
        result.innerHTML = `
        <p style="color:red">wrong</p> 
       <p style="color:green">The correct answer is : <br>${correctAnswer}</p>
       `
        $("#incorrect").after(function () {
            return $(this).text("incorrect : "+scoreBoard.incorrect++);
        })
        
        
       $(".modal").after(function(){
        setTimeout($(".modal").modal("hide"),5000);;
           getNew();
       } );
        ;

    }
    else {
        result.innerHTML = `
        <p>You must answer</p>`;
    }
}
$(".modal").after(function(){
    $(this).slideUp(1000)
});

// function getScore(){
//     if(chooseAnswer===correctAnswer){
//         result.scoreBoard.correct++;
//     }
//     else {
//         scoreBoard.incorrect++;
//     }
//     score.innerHTML=`
//     <p> correct: ${scoreBoard.correct} </p>
//     <p>incorrect: ${scoreBoard.incorrect}</p>

//     `;
// }
