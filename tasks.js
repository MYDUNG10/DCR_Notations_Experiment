function shuffleWithoutConsecutiveRepeats(array) {
    let shuffled;
    do {
        shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
    } while (hasConsecutiveRepeats(shuffled));
    return shuffled;
}

function hasConsecutiveRepeats(array) {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i][0] === array[i + 1][0]) {
            return true;
        }
    }
    return false;
}

const valueTrue = "TRUE"
const valueFalse = "FALSE"
const valueDoNotKnow = "DO_NOT_KNOW"

var startTime = new Date().toISOString();

var answers = [];

var tasks = [
    ['When "Paint piece JMF" is done, <br> "Move piece KBI" is removed from the process.', "resources/Exclude_01.svg"],
    ['When "Paint piece JMF" is done, <br> "Move piece KBI" is removed from the process.', "resources/Exclude_02.svg"],
    ['When "Paint piece JMF" is done, <br> "Move piece KBI" is removed from the process.', "resources/Exclude_03.svg"],

    ['When "Test piece DCA" is done, <br> "Cut piece LVO" is added to the process.', "resources/Include_01.svg"],
    ['When "Test piece DCA" is done, <br> "Cut piece LVO" is added to the process.', "resources/Include_02.svg"],
    ['When "Test piece DCA" is done, <br> "Cut piece LVO" is added to the process.', "resources/Include_03.svg"],

    ['After "Lift piece AVT" is done, "Bend piece ICL" becomes required (i.e., pending) and must be done before the process can finish.', "resources/Response_01.svg"],
    ['After "Lift piece AVT" is done, "Bend piece ICL" becomes required (i.e., pending) and must be done before the process can finish.', "resources/Response_03.svg"],
    ['After "Lift piece AVT" is done, "Bend piece ICL" becomes required (i.e., pending) and must be done before the process can finish.', "resources/Response_03.svg"],

    ['Before "Heat piece OJX" can be done <br> "Fix piece TQS" should have been done at least once in the past.', "resources/Condition_01.svg"],


    ['While "Fold piece NVC" is required to be done (i.e., pending), <br> "Cool piece XSJ" is blocked from execution.', "resources/Milestone_03.svg"]
    // ['When "Inspect piece FGH" is done, <br> "Upgrade piece ASD" is removed from the process.', "resources/demooo.svg"],
];

tasks = shuffleWithoutConsecutiveRepeats(tasks);

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

    csvString += `"${startTime}"\n`;
    
    answers.forEach(function(row) {
        const quotedRow = row.map(value => `"${value.replace(/"/g, '""')}"`);
        csvString += quotedRow.join(",") + "\n";
    });

    var encodedUri = encodeURI(csvString);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "DCR_Experiment_result.csv");
    document.body.appendChild(link)
    
    console.log(csvString);
    link.click();

    //Go to next page
    window.location.href='completed.html';
}

//Initiate
displayTask(currentIndex);

// Print the shuffled order for checking
console.log("Shuffled order:");
tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task[0]}`);
});