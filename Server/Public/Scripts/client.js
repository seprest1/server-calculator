console.log('in js');

$(document).ready(onReady);

function onReady(){
    console.log('jQuery working!')
    clickHandler();
};


function clickHandler(){
    $('.numButton').on('click', numInput);
    $('.operatorButton').on('click', operatorInput);
   
};

let numArray = [];
let operandArray = [];
let operatorArray = [];


function numInput(){
    let numId = $(this).attr('id');                         //ids for each button are a number or a decimal point, 
    numArray.push(numId);                                   //so every time a user presses a button, it adds 
    $('#displayNum').append(`${numId}`);                    //that number to an array and also appends the DOM. 
};

function operatorInput(){
    let operatorId = $(this).attr('id');                    //sets operator id ('+','-','*','/') as a variable.
    let fullNumber = numArray.join('');                     //joins the single digits of a number together as a string
    operandArray.push(fullNumber);                          //pushes into operand array
    operatorArray.push(operatorId);                         //pushes specific operator into operator array
    
    $('#displayNum').append(`${$(this).attr('id')}`);       //updates the DOM with the operator
    console.log(operandArray);
    console.log(operatorArray);
    numArray = [];                                          //resets the number array, which allows for a new number
    if (operatorId === '='){                                //once user presses =, it sends expressions to server
        postNumbers();                                      //to be calculated. Setting the data object this way allows 
        $('#displayNum').empty();                           //user to do unlimited calculations. Empty the display.
    }                                                       
}                                                            
                                                            
function fetchResults(){
    $.ajax({
        method: 'GET',
        url: '/results'
    }).then(function(results){
      $('#displayNum').append(`${results}`);
    })
};

function fetchHistory(){
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function(history){
      $('#historyList').append(`<li>${history}</li>`);
    })
};


function postNumbers(){
    let value = $('#numberInput').val();
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: {operandArray, operatorArray}
    }).then(function(respone){
        fetchResults();
        fetchHistory();
    })
};




//USER ERRORS TO CONSIDER:
// - What if user presses two expressions in a row?