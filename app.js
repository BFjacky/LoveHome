const express = require('express')
const app = express();
const path = require('path')
const fs = require('fs')
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', function (req, res) {
    fs.readFile(path.join(__dirname, 'public', 'html', 'index.html'), (err, data) => {
        if (err) {
            throw err
        }
        else {
            res.setHeader('Content-Type', 'text/html')
            res.send(data);
            console.log('返回html')
        }
    })
})

app.listen(80, function(){
    console.log('running...')
})