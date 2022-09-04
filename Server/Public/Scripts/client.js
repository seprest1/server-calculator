
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
    let digit = $(this).attr('id');                                     //assigns value of button based on ID
    appendNumber(digit);                                            
}

function operatorButton(){                              
    if (operator === ''){                                              //normal assigning of operator
        operator = $(this).attr('id');  
        $('#displayNum').append(operator);                             //adds operator to DOM
    }
    else if (operator === '-' && $(this).attr('id') === '-'){          //doesn't allow a double minus
        return;
    }
    else if (operator !== '' && $(this).attr('id') === '-'){           //allows a minus operator if not, to
        appendNumber($(this).attr('id'));                              //allow for negative numbers, for 
    }                                                                  //example (2 + -3) = -1
    else{
        return;
    }
}

function appendNumber(digit){
    if (digit === '.' && lastOperand.includes('.') && operator === ''   //doesn't allow multiple decimals
     || digit === '.' && currentOperand.includes('.')){
        return;
    }
    if (operator === ''){                                               //pushes digit pressed into "last
        lastOperand.push(digit);                                        //operand" array and adds to DOM
        $('#displayNum').append(digit); 
    }
    else {  
        currentOperand.push(digit);                                     //pushes digit pressed into "current
        $('#displayNum').append(digit);                                 //operand" array and adds to DOM
    }
}

function clearNumber(){
    if (currentOperand.length === 0 && operator !== ''){                //specifies clearing operator and 
        operator = '';                                                  //appends the DOM
        $('#displayNum').empty();
        $('#displayNum').append(lastOperand);
    }
    else if (currentOperand.length === 0){                              //specifies clearing "last operator"
        lastOperand.pop(lastOperand.length-1);                          //and appends the DOM
        $('#displayNum').empty();
        $('#displayNum').append(lastOperand);
    }
    else{                                                               //specifies clearing "current operator"
        currentOperand.pop(currentOperand.length-1);                    //and appends the DOM
        $('#displayNum').empty();
        $('#displayNum').append(lastOperand, operator, currentOperand);
    }
}

function clearAll(){
    $('#displayNum').empty();                   //deletes history on the DOM and server
    $('#totalNum').empty();                     //and sets arrays/variables back to 0.
    $('#historyList').empty();
    lastOperand = [];
    currentOperand = [];
    operator = '';
    deleteHistory();
}

function equalButtonEvent(){
    if (lastOperand.length === 0 || currentOperand.length === 0 || operator === ''){
        return;                     //makes it so users have to have all 3 inputs clicked
    }                               //before having the equal button work
    else{
        postNumbers();              //send data object to the server
    }
}

function fetchResults(){
    $.ajax({                                                        //get results
        method: 'GET',
        url: '/results'
    }).then(function(results){
      $('#displayNum').empty();                                     //empty display and append DOM with results.
      $('#totalNum').empty();                                       //resets values/arrays client-side
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
        url: '/history'                                             //get history
    }).then(function(history){
        $('#historyList').empty();                                  //empty DOM, loop through history and
        for (item of history){                                      //append DOM with updated history   
            $('#historyList').prepend(`                             
                <li class = "historyLi">${item.lastOperand} ${item.operator} ${item.currentOperand}</li>
            `);
        }
    })
};

function postNumbers(){
    console.log(lastOperand, currentOperand);
    if (typeof lastOperand === 'object' && typeof currentOperand === 'object'){         //allows for the selectHistory
            lastOperand = lastOperand.join('');                                         //function to run results again
            currentOperand = currentOperand.join('');                                   //because they come out as a string
    }                                                                                   //instead of an array, could be fixed later.
    $.ajax({
        method: 'POST',
        url: '/calculate',                                                              //defines andmails data object
        data: {lastOperand, operator, currentOperand}                                   //to the server, runs GET functions
    }).then(function(respone){
        fetchResults();
        fetchHistory();
    })
};

function deleteHistory(){               //runs DELETE route
    $.ajax({
        method: 'DELETE',
        url: '/clear',
        data: {}
    })
};

function selectHistory(){
    let selectedRow = $(this).text().split(' ');                    //set variable to text of each <li>, split
    console.log(selectedRow);                                       //it into an array, with variables
    for(i=0; i<selectedRow.length; i++){                            //loop through array and reset arrays/
        lastOperand = selectedRow[0];                               //elements to these values, which will be
        operator = selectedRow[1];                                  //run again successfully when user presses
        currentOperand = selectedRow[2];                            //the equal sign.
    }

    $('#displayNum').empty();
    $('#displayNum').append(`${lastOperand} ${operator} ${currentOperand}`);        //update DOM with old calcuation
}

//USER ERROR CONSIDERATIONS:

// - Multiple operators in a row        - SOLVED.
// - Changing operators mid-way         - SOLVED.
// - Multiple decimals in a row         - SOLVED.
// - Missing fields                     - SOLVED.
// - Computing with negative numbers    - SOLVED
