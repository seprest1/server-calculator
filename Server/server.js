const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));

let results = '5000';
let history = ['hi'];

app.get('/results', (req,res) => {
    console.log('GET /results recieved a request')
    res.send(results);
});

app.get('/history', (req,res) => {
    console.log('GET /history recieved a request')
    res.send(history);
});


app.post('/calculate', (req, res) => {
    console.log('POST /calculate received a request!')
    console.log('Req.body is:', req.body);
    combineArrays(req.body);
    res.sendStatus(201);
  })


app.listen(PORT, () => {
    console.log(`I'm listening! Go to: http://localhost:${PORT}`);
});


function combineArrays(numObject){
    result = 0;
    history = [];

    const array1 = numObject.operandArray;
    const array2 = numObject.operatorArray;

    let mergedArray = [];
    let l = Math.min(array1.length, array2.length);

    for (i = 0; i < l; i++){
        mergedArray.push(array1[i], array2[i]);
    }

    mergedArray.push (...array1.slice(l), ...array1.slice(l));
    mergedArray.pop(mergedArray.length-1);
    let historyString = mergedArray.join(' ');

    console.log(historyString);
    history.push(historyString);

    calculateResults(mergedArray);
};


function calculateResults(mergedArray){
    console.log(mergedArray);
}