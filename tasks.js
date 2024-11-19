function shuffle(array) { //https://stackoverflow.com/a/2450976
    var currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}


const valueTrue = "TRUE"
const valueFalse = "FALSE"
const valueDoNotKnow = "DO_NOT_KNOW"

var startTime;

var answers = [];

var tasks = [['When "Paint piece JMF" is done, <br> "Move piece KBI" is removed from the process.', "resources/Exclude_01.svg"],
            //  ['When "Paint piece JMF" is done, <br> "Move piece KBI" is removed from the process.', "resources/Exclude_02.svg"],
            //  ['When "Paint piece JMF" is done, <br> "Move piece KBI" is removed from the process.', "resources/Exclude_03.svg"],

            //  ['When "Test piece DCA" is done, <br> "Cut piece LVO" is added to the process.', "resources/Include_01.svg"],
             ['When "Test piece DCA" is done, <br> "Cut piece LVO" is added to the process.', "resources/Include_02.svg"],
            //  ['When "Test piece DCA" is done, <br> "Cut piece LVO" is added to the process.', "resources/Include_03.svg"],

            //  ['After "Lift piece AVT" is done, "Bend piece ICL" becomes required (i.e., pending) and must be done before the process can finish.', "resources/Response_01.svg"],
            //  ['After "Lift piece AVT" is done, "Bend piece ICL" becomes required (i.e., pending) and must be done before the process can finish.', "resources/Response_02.svg"],
             ['After "Lift piece AVT" is done, "Bend piece ICL" becomes required (i.e., pending) and must be done before the process can finish.', "resources/Response_03.svg"],

             ['Before "Heat piece OJX" can be done <br> "Fix piece TQS" should have been done at least once in the past.', "resources/Condition_01.svg"],
            //  ['Before "Heat piece OJX" can be done <br> "Fix piece TQS" should have been done at least once in the past.', "resources/Condition_02.svg"],
            //  ['Before "Heat piece OJX" can be done <br> "Fix piece TQS" should have been done at least once in the past.', "resources/Condition_03.svg"],

            //  ['While "Fold piece NVC" is required to be done (i.e., pending), <br> "Cool piece XSJ" is blocked from execution.', "resources/Milestone_01.svg"],
            //  ['While "Fold piece NVC" is required to be done (i.e., pending), <br> "Cool piece XSJ" is blocked from execution.', "resources/Milestone_02.svg"],
             ['While "Fold piece NVC" is required to be done (i.e., pending), <br> "Cool piece XSJ" is blocked from execution.', "resources/Milestone_03.svg"]];
shuffle(tasks);

var currentIndex = 0;

var nextButton = document.getElementById("next-button");
var optionTrue = document.getElementById("option-true");
var optionFalse = document.getElementById("option-false");
var optionDoNotKnow = document.getElementById("option-do-not-know");

var taskText = document.getElementById("task-text");
var taskImage = document.getElementById("task-image");

function enableNext(){
    nextButton.disabled = false;
}

function displayTask(i){
    let text = tasks[i][0];
    text = text.replace(/"([^"]+)"/g, '<strong><u>"$1"</u></strong>');
    taskText.innerHTML = text;
    taskImage.src = tasks[i][1];
}

function nextTask(){
    //Save answer
    currentTime = new Date();
    if (optionTrue.checked) {
        answers[currentIndex] = [currentTime.toISOString(), tasks[currentIndex][0], valueTrue];
    } else if (optionFalse.checked) {
        answers[currentIndex] = [currentTime.toISOString(), tasks[currentIndex][0], valueFalse];
    } else if (optionDoNotKnow.checked) {
        answers[currentIndex] = [currentTime.toISOString(), tasks[currentIndex][0], valueDoNotKnow];
    }
    console.log(optionTrue.checked, optionFalse.checked, optionDoNotKnow.checked);
    //Reset
    optionTrue.checked = false;
    optionFalse.checked = false;
    optionDoNotKnow.checked = false;
    nextButton.disabled = true;

    //Next
    currentIndex++;
    
    if(currentIndex >= tasks.length) {
        completeExperiment();
    } else {
        displayTask(currentIndex);
    }
}

function completeExperiment(){ //https://stackoverflow.com/a/14966131
    //Create CSV
    let csvString = "data:text/csv;charset=utf-8,";

    answers.forEach(function(row) {
        csvString += row.join(",") + "\n";
    });

    var encodedUri = encodeURI(csvString);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "DCR_Notations_Experiment_result.csv");
    document.body.appendChild(link)
    
    console.log(csvString);
    link.click();

    //Go to next page
    window.location.href='completed.html';
}

//Initiate

startTime = Date.now();
displayTask(currentIndex);