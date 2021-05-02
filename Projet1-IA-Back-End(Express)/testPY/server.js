const express = require('express')
const app = express()
const port = 4000
var cors = require('cors')
const {spawn} = require('child_process')
const bodyParser = require('body-parser')
//npm install child_process

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.engine("html", require("ejs").renderFile)
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });

app.post("/", (req, res) => {
    res.render("index.ejs")
})

app.use(cors())

app.get('/calculate', (req, res) => {
    let dataToSend
    console.log(JSON.stringify(req.query));
    const python = spawn('python', ['python/avc2.py', JSON.stringify(req.query)])
    
    python.stdout.on('data', (data) => {
        dataToSend = data.toString()
        //si besoin de json en retour 
        //dataToSend = JSON.parse(dataToSend)
    })
    
    python.on('close', (code) => {
        res.send(dataToSend)
        //si besoin de json en retour 
     //   res.json(dataToSend)
    })
})

app.get('/estimatecar', (req, res) => {
    let dataToSend
    console.log(req.query);
    const python = spawn('python', ['python/cars.py', JSON.stringify(req.query)])
    
    python.stdout.on('data', (data) => {
        dataToSend = data.toString()
        //si besoin de json en retour 
        //dataToSend = JSON.parse(dataToSend)
    })
    
    python.on('close', (code) => {
        console.log(dataToSend)
        res.send(dataToSend)
        //si besoin de json en retour 
     //   res.json(dataToSend)
    })
})

app.post('/mask', multipartMiddleware, (req, res) => {
    console.log(req.files.image)
    let dataToSend
    // console.log(req.query);
    const python = spawn('python', ['python/mask.py', req.files.image.path])
    
    // python.stdout.on('data', (data) => {
    //     dataToSend = data.toString()
    //     //si besoin de json en retour 
    //     //dataToSend = JSON.parse(dataToSend)
    // })
    
    python.on('close', (code) => {
        //remove old file
        res.sendFile('./outputs/test.jpg', { root: __dirname });
        //si besoin de json en retour 
     //   res.json(dataToSend)
    })
})


app.listen(port, () => {
    console.log(`listening port ${port}`)
})