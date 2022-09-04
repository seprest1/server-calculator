const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));

let results;
let history = [];

app.get('/results', (req,res) => {
    console.log('GET /results recieved a request')
    res.send(results);
});

app.get('/history', (req,res) => {
    console.log('GET /history recieved a request')
    history.push(numObject);
    res.send(history);
});


app.post('/calculate', (req, res) => {
    console.log('POST /calculate received a request!')
    console.log('Req.body is:', req.body);
    calculate(req.body);
    addHistory(req.body);
    res.sendStatus(201);
})

app.delete('/clear', (req, res) => {
    console.log('DELETE /clear recieved a request!');
    history = [];
    res.sendStatus(202);
})


app.listen(PORT, () => {
    console.log(`I'm listening! Go to: http://localhost:${PORT}`);
});


function calculate(numObject){
    let lastOperand = Number(numObject.lastOperand);
    let currentOperand = Number(numObject.currentOperand)
    let operator = numObject.operator;
    results = String(convertOperators(operator, lastOperand, currentOperand));
};


function convertOperators(operator, lastOperand, currentOperand){
    switch (operator){
        case '+': return lastOperand + currentOperand
        case '-': return lastOperand - currentOperand
        case '*': return lastOperand * currentOperand
        case '/': return lastOperand / currentOperand
    }
}

