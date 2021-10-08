const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


async function test(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

test();

if (typeof localStorage === "undefined" || localStorage === null) { //Подключение localStorage
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

let runtimeArr = [];
let storeArr = localStorage.getItem('strArray');
if (storeArr){
    runtimeArr = storeArr.split(',');
}

app.post('/strings', (req, res) =>{
    runtimeArr.push(req.body.str);
    localStorage.setItem("strArray", runtimeArr);
    res.status(200).json({message: 'added'})
});

app.get('/strings', (req, res) =>{
    res.status(200).json({array: runtimeArr})
});

app.delete('/strings', (req, res) =>{
    runtimeArr = [];
    localStorage.setItem("strArray", runtimeArr);
    res.status(200).json({message: 'All Deleted'})
});

app.delete('/strings/:index', (req, res) =>{
    runtimeArr.splice(req.params.index - 1, 1);
    localStorage.setItem("strArray", runtimeArr);
    res.status(200).json({message: 'Deleted'})
});

app.use((req, res, next) => {
  console.log('URL = ', req.url);
  console.log('Original_URL = ', req.originalUrl);
  console.log('METHOD = ', req.method);
  console.log('HOST = ', req.headers.host);
  console.log('IsSecure = ', req.secure);
  console.log('BODY', req.body);
  console.log('QUERY', req.query);

  next();
});

app.all('/test', (req, res) => {
  res.status(200).json({ message: 'KKKKKK'});
})

app.post('/sum', (req, res) =>{
    let sum = req.body.num1 + req.body.num2;
    res.status(200).json({sum: sum})
})

app.post('/reverseCase', (req, res) =>{
    let arr = req.body.str.split('');
    let reverseCase = [];
    arr.forEach(element => {
        if (element == element.toLowerCase()) { 
            reverseCase.push(element.toUpperCase());
        }
        else { 
            reverseCase.push(element.toLowerCase());
        }
    });
    res.status(200).json({reverseCase: reverseCase.join("")})
})

app.post('/reverseString', (req, res) =>{
    let reverseArray = req.body.str.split('');
    reverseArray = reverseArray.reverse();
    res.status(200).json({reverseArray: reverseArray.join("")})
})

app.post('/reverseArray', (req, res) =>{
    let reverseArray = req.body.arr;
    reverseArray = reverseArray.reverse()
    res.status(200).json({reverseArray: reverseArray})
})

// app.get('/test', (req, res) => {
//     res.status(200).json({message: 'GET'});
// })

// app.post('/test', (req, res) => {
//     res.status(200).json({message: 'POST'});
// })

// app.put('/test', (req, res) => {
//     res.status(200).json({message: 'PUT'});
// })

// app.patch('/test', (req, res) => {
//     res.status(200).json({message: 'PATCH'});
// })

// app.delete('/test', (req, res) => {
//     res.status(200).json({message: 'Delete'});
// })

http.createServer(app).listen(3001, () => {
  console.log('Server is working on port 3001');
})