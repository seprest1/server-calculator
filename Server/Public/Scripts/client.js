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
    $('#equalButton').on('click', equalButtonEvent);
};

              



let lastOperand = [];
let currentOperand = [];
let operator = '';
// let historyCount;

function numButton(){
    let digit = $(this).attr('id');  
    appendNumber(digit);
    $('#displayNum').append(digit);  
}

function operatorButton(){
    operator = $(this).attr('id');  
    $('#displayNum').append(operator);  
}

function appendNumber(input, array){
    if (input === '.' && lastOperand.includes('.') || input === '.' && currentOperand.includes('.')){
        return;
    }
    if (operator === ''){
        lastOperand.push(input);
    }
    else {
        currentOperand.push(input);
    }
}

// function appendDisplay(input){
//     $('#displayNum').append(input);
// }

// function appendHistory(input){
//     historyCount++;
//     $(`#historyList`).append(`<li id='#row ${historyCount}'>${input}</li>`);
// }

function clearNumber(){
    if (currentOperand = []){
        lastOperand.pop(lastOperand.length-1);
        $('#displayNum').empty();
        $('#displayNum').append(lastOperand);
    }
    else{
        currentOperand.pop(currentOperand.length-1);
        $('#displayNum').empty();
        $('#displayNum').append(currentOperand);
    }
    
    // if ($(this).array === currentOperand){
    //     currentOperand.pop(currentOperand.length-1);
    // }
    // $('#displayNum').empty();
    // $('#displayNum').append(currentOperand);
}

function clearAll(){
    $('#displayNum').empty();
    $('#historyList').empty();
    appendArray = [];
    operand = '';
    operator = '';
    deleteHistory();
}

function equalButtonEvent(){
    console.log(lastOperand, currentOperand, operator);
    postNumbers();
}

function fetchResults(){
    $.ajax({
        method: 'GET',
        url: '/results'
    }).then(function(results){
      $('#displayNum').empty();
      $('#totalNum').empty();
      $('#totalNum').append(`${results}`);
      lastOperand = [];                                                   //results.split('');
      currentOperand = [];
      operator = '';
      console.log(lastOperand, operator, currentOperand);
    })
};

function fetchHistory(){
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function(history){
        $('#historyList').empty();
        for (item of history){
        $('#historyList').append(`<li>${item.lastOperand} ${item.operator} ${item.currentOperand}</li>`);
        }
    })
};

function postNumbers(){
    lastOperand = lastOperand.join('');
    currentOperand = currentOperand.join('');
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: {lastOperand, operator, currentOperand}
    }).then(function(respone){
        fetchResults();
        fetchHistory();
    })
};



// function deleteHistory(){

// }


//USER ERRORS TO CONSIDER:
// - What if user presses two expressions in a row? 
// - What about decimals? - SOLVED.
// - What about negative numbers?