$(document).ready(onReady);

function onReady(){
    console.log('jQuery working!')
    clickHandler();
};

function clickHandler(){
    $('.numButton').on('click', numButton);
    $('.operatorButton').on('click', operatorButton);
    $('#clearButton').on('click', clearNumber);
    $('#clearAll').on('click', clearAll);
};
                                                        

let appendArray = [];
let operandArray = [];
let operatorArray = [];

function numButton(){
    let digit = $(this).attr('id');  
    appendNumber(digit);
}

function operatorButton(){
    let operator = $(this).attr('id');  
    $('#displayNum').empty();
    concatNumber();
    operatorArray.push(operator);
    appendHistory(operator);
    console.log(operatorArray);
}

function appendDisplay(input){
    $('#displayNum').append(input);
}

function appendHistory(input){
    $(`#historyList`).append(`${input} `);
}

function appendNumber(input){
    if (input === '.' && appendArray.includes('.')){
        return;
    }
    else{
        appendArray.push(input);
        console.log(appendArray);
        appendDisplay(input);
    }
}

function concatNumber(){
    let operand = appendArray.join('');
    operandArray.push(operand);
    appendArray = [];
    console.log(operandArray);
    appendHistory(operand);
}

function clearNumber(){
    appendArray.pop(appendArray.length-1);
    $('#displayNum').empty();
    $('#displayNum').append(appendArray);
}

function clearAll(){
    $('#displayNum').empty();
    $('#historyList').empty();
    appendArray = [];
    operandArray = [];
    operatorArray = [];
    deleteHistory();
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

function deleteHistory(){

}


//USER ERRORS TO CONSIDER:
// - What if user presses two expressions in a row? 
// - What about decimals? - SOLVED.
// - What about negative numbers?