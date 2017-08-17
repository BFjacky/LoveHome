const express = require('express')
const app = express();
const path = require('path')
const fs = require('fs')
app.use(express.static(path.join(__dirname, 'public')))

let times =0 ;

app.get('/', function (req, res) {
    times++;
    fs.readFile(path.join(__dirname, 'public', 'html', 'index.html'), (err, data) => {
        if (err) {
            throw err
        }
        else {
            res.setHeader('Content-Type', 'text/html')
            res.send(data);
            console.log('访问了'+times+'次')
        }
    })
})

app.listen(81, function(){
    console.log('running...')
})