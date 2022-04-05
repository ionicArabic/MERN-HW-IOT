
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

const monoose = require('mongoose');
monoose.connect('mongodb://localhost/calculator');

const Calculator_Schema = new monoose.Schema({
    firestNumber: {type: Number, required: true},
    secondNumber: {type: Number, required: true},
    result: {type: Number, required: true},
    operation: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

const operation = monoose.model('Operation', Calculator_Schema);

app.use(express.static('public'));
app.get('/', (req, res) => {
    
    res.render('index');
});

app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(express.json());
app.use(cors());



app.post('/add', (req, res) => {
    let x = req.body.number1;
    let y = req.body.number2;
    let result = Number( x ) + Number( y );
    console.log(result);
    
    const oper = new operation({
        firestNumber: x,
        secondNumber: y,
        result: result,
        operation: '+'
    });
    console.log(oper);
    oper.save().then(() => console.log("Saved!"));
    res.send({operation:"add",result: result});
    
});

app.post('/sub', (req, res) => {
    let x = req.body.number1;
    let y = req.body.number2;
    let result = Number( x ) - Number( y );
    console.log(result);
    
    const oper = new operation({
        firestNumber: x,
        secondNumber: y,
        result: result,
        operation: '-'
    });
    console.log(oper);
    oper.save().then(() => console.log("Saved!"));
    
    res.send({operation:"sub",result: result});
    
});

app.post('/mul', (req, res) => {
    let x = req.body.number1;
    let y = req.body.number2;
    let result = Number( x ) * Number( y );
    console.log(result);
    
    const oper = new operation({
        firestNumber: x,
        secondNumber: y,
        result: result,
        operation: '*'
    });
    console.log(oper);
    oper.save().then(() => console.log("Saved!"))
    
    res.send({operation:"mul",result: result});
    
});

app.post('/div', (req, res) => {
    let x = req.body.number1;
    let y = req.body.number2;
    if (y == 0) {
        res.send({operation:"div",result: 'Error... division by zero!'});
    } else {
        let result = Number( x ) / Number( y );
        console.log(result);
        
        const oper = new operation({
            firestNumber: x,
            secondNumber: y,
            result: result,
            operation: '/'
        });
        console.log(oper);
        oper.save().then(() => console.log("Saved!"));
        
        res.send({operation:"div",result: result});
}
    
});

app.get('/history', (req, res) => {
    monoose.connection.db.collection('operations')
    .find()
    .filter( /*{operation: '-'} */)
    .sort({"createdAt":-1})
    .limit(10)
    .toArray((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    } );});
    
    app.post('/bydate', (req, res) => {
        
        let date = req.body.date;
        console.log(date);
        monoose.connection.db.collection('operations')
        .find()
        .filter( {
            'createdAt': {
              '$gte': new Date(date)
            }
          } )
        .limit(10)
        .toArray((err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        } );});
        
        app.post('/byoperation', (req, res) => {
        
            let opr = req.body.operation;
            
            console.log(opr);
            monoose.connection.db.collection('operations')
            .find()
            .filter( {
                'operation' : `${opr}`
              } )
            .limit(10)
            .toArray((err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result);
                }
            } );});

app.listen(port, () => {
    console.log(`Server app listening at http://localhost:${port}`);
}   );
