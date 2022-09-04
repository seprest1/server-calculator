const express = require('express');                     //get access to express
const bodyParser = require('body-parser');              //get access to body-parser
const app = express();                                  //set variable to be able to call express
const PORT = 5000;                                      //set location of port

app.use(express.static('server/public'));               //load up client side files 
app.use(bodyParser.urlencoded({extended:true}));

let results;
let history = [];

app.get('/results', (req,res) => {                      //GET route for results, send results variable               
    console.log('GET /results recieved a request')
    res.send(results);
});

app.get('/history', (req,res) => {                     //GET route for history, send history array
    console.log('GET /history recieved a request')
    res.send(history);
});


app.post('/calculate', (req, res) => {                  //POST route for data object
    console.log('POST /calculate received a request!')
    console.log('Req.body is:', req.body);
    calculate(req.body);                                //run calculate function with data object
    history.push(req.body);                             //push data object into history array
    res.sendStatus(201);                                //send 'created' status
})

app.delete('/clear', (req, res) => {                    //DELETE route, delete history array
    console.log('DELETE /clear recieved a request!');   //send 'accepted' status
    history = [];
    console.log(history);
    res.sendStatus(202);
})

function calculate(numObject){
    let lastOperand = Number(numObject.lastOperand);                //converts string to number
    let currentOperand = Number(numObject.currentOperand)
    let operator = numObject.operator;
    results = String(Math.round((convertOperators(operator, lastOperand, currentOperand))*1000)/1000);
};                      //rounds results to the third decimal and converts back to string after calculated


function convertOperators(operator, lastOperand, currentOperand){       //had to do a switch, because
    switch (operator){                                                  //the operator key was sent as a 
        case '+': return lastOperand + currentOperand                   //string, but it worked out well.
        case '-': return lastOperand - currentOperand
        case '*': return lastOperand * currentOperand
        case '/': return lastOperand / currentOperand
    }
}

app.listen(PORT, () => {                                                //listening event waiting for http request
    console.log(`I'm listening! Go to: http://localhost:${PORT}`);
});

