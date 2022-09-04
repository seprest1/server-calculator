
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
    $('#displaySection').on('click', '.historyLi', selectHistory);
};

let lastOperand = [];
let currentOperand = [];
let operator = '';

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
    if (currentOperand.length === 0 && operator !== ''){
        operator = '';
        $('#displayNum').empty();
        $('#displayNum').append(lastOperand);
        console.log('hi');
        console.log(lastOperand, operator, currentOperand);
    }
    else if (currentOperand.length === 0){
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
      console.log(results);
      lastOperand = [];                                                  
      currentOperand = [];
      operator = '';
    })
};

function fetchHistory(){
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function(history){
        $('#historyList').empty();
        for (item of history){
            $('#historyList').append(`
                <li class = "historyLi">${item.lastOperand} ${item.operator} ${item.currentOperand}</li>
            `);
        }
    })
};

function postNumbers(){
    console.log(lastOperand, currentOperand);
    if (typeof lastOperand === 'object' && typeof currentOperand === 'object'){
            lastOperand = lastOperand.join('');
            currentOperand = currentOperand.join('');
    }
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

function selectHistory(){
    let selectedRow = $(this).text().split(' ');
    console.log(selectedRow);
    for(i=0; i<selectedRow.length; i++){
        lastOperand = selectedRow[0];
        operator = selectedRow[1];
        currentOperand = selectedRow[2];
    }
    console.log(lastOperand, operator, currentOperand);
    $('#displayNum').empty();
    $('#displayNum').append(`${lastOperand} ${operator} ${currentOperand}`);
}

//USER ERROR CONSIDERATIONS:

// - Multiple operators in a row        - SOLVED.
// - Changing operators mid-way         - SOLVED.
// - Multiple decimals in a row         - SOLVED.
// - Missing fields                     - SOLVED.
// - Computing with negative numbers    - SOLVED
