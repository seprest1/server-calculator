$(document).ready(onReady);

function onReady(){
    clickHandler();
    fetchHistory();
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
let historyCount = 0;

function numButton(){
    let digit = $(this).attr('id');  
    appendNumber(digit); 
}

function operatorButton(){
    if (operator === ''){
        operator = $(this).attr('id');  
        $('#displayNum').append(operator); 
    }
    else if (operator === '-' && $(this).attr('id') === '-'){
        return;
    }
    else if (operator !== '' && $(this).attr('id') === '-'){
        appendNumber($(this).attr('id'));
    }
    else{
        return;
    }
}

function appendNumber(digit){
    if (digit === '.' && lastOperand.includes('.') && operator === '' 
     || digit === '.' && currentOperand.includes('.')){
        return;
    }
    if (operator === ''){
        lastOperand.push(digit);
        $('#displayNum').append(digit); 
    }
    else {
        currentOperand.push(digit);
        $('#displayNum').append(digit); 
    }
}

function clearNumber(){
    if (currentOperand.length === 0){
        lastOperand.pop(lastOperand.length-1);
        $('#displayNum').empty();
        $('#displayNum').append(lastOperand);
    }
    else{
        currentOperand.pop(currentOperand.length-1);
        $('#displayNum').empty();
        $('#displayNum').append(lastOperand, operator, currentOperand);
    }
}

function clearAll(){
    $('#displayNum').empty();
    $('#totalNum').empty();
    $('#historyList').empty();
    lastOperand = [];
    currentOperand = [];
    operator = '';
    deleteHistory();
    historyCount = 0;
}

function equalButtonEvent(){
    if (lastOperand.length === 0 || currentOperand.length === 0 || operator === ''){
        return;
    }
    else{
        postNumbers();
    }
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
        historyCount++;
        console.log(historyCount);
        for (item of history){
        $('#historyList').append(`<li id = ${historyCount}>${item.lastOperand} ${item.operator} ${item.currentOperand}</li>`);
        }
    })
};

function postNumbers(){
    lastOperand = lastOperand.join('');
    currentOperand = currentOperand.join('');
    console.log(lastOperand, operator, currentOperand);
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: {lastOperand, operator, currentOperand}
    }).then(function(respone){
        fetchResults();
        fetchHistory();
    })
};

function deleteHistory(){
    $.ajax({
        method: 'DELETE',
        url: '/clear',
        data: {}
    })
};



//USER ERROR CONSIDERATIONS:

// - Multiple operators in a row        - SOLVED.
// - Changing operators mid-way         - SOLVED.
// - Multiple decimals in a row         - SOLVED.
// - Missing fields                     - SOLVED.
// - Computing with negative numbers    - SOLVED
