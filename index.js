<<<<<<< HEAD
const { sequelize } = require('./Db');

const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const ToDo = require('./ToDo');

class ValidationError extends Error {
    constructor(message) {
        super(message);
    }
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    console.log('URL = ', req.url);
    console.log('Original_URL = ', req.originalUrl);
    console.log('METHOD = ', req.method);
    console.log('HOST = ', req.headers.host);
    console.log('IsSecure = ', req.secure);
    console.log('BODY', req.body);
    console.log('QUERY', req.query);

    return next();
});

app.post('/todo',async (req, res, next) => {
    let title = req.body.title;
    let description = req.body.description;
    try {
        await ToDo.create({ title: title, description: description});
        res.json({message: "Created"});
    } catch (e){
        return next(e)
    }

});

app.get('/todo/:index', async (req, res, next) => {
    try {
        await ToDo.findByPk(req.params.index).then((data)=>{
            if (data == null) {
                return next(new ValidationError("Wrong ID"))
            } else res.json({ data })
        });
    } catch (e) {
        return next(e)
    }
})

app.put('/todo/:index', async(req, res, next) =>{
    const doc = {};
    const title = req.body.title;
    const description = req.body.description;

    if (title) doc.title = title;
    if (description) doc.description = description;

    try {
        await ToDo.update(doc, {
            where: {
                id: req.params.index
            }
        })
        res.json({message: "Updated"})
    } catch (e) {
        return next(e)
    }
})

app.delete('/todo/:index', async (req, res, next) => {
    try {
        await ToDo.destroy({
            where: {
                id: req.params.index
            }
        });
        res.json({message: "Deleted"});
    } catch (e) {
        next(e);
    }
})

app.use((err, req, res, next) => {
    if (err instanceof ValidationError){
        res
            .status(500)
            .json(err.message);
    } else {
        console.error(err)
        res
            .status(500)
            .json('Internal server error');
    }
})

async function start(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await ToDo.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    http.createServer(app).listen(3001, () => {
        console.log('Server is working on port 3001');
    })
}

start();
=======
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
>>>>>>> 962adf77bd313a31168bfa6866248976976c55ec
