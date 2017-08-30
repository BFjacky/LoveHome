const express = require('express')
const app = express();
const path = require('path')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const Mates = require('./persistence/Mates.js')
const myMates = new Mates();
const authlogin = require('./midwares/authlogin.js')
const authmain = require('./midwares/authmain.js')
const auth = require('./midwares/auth.js')
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
let times = 0;
app.get('/', authlogin, function (req, res) {
    console.log(req.flag);
    if (req.flag) {
        //重定向main页面
        res.writeHead(302, {
            'Location': '/main'
        });
        res.end();
        return;
    }
    fs.readFile(path.join(__dirname, 'public', 'html', 'login.html'), (err, data) => {
        if (err) {
            throw err
        }
        else {
            res.setHeader('Content-Type', 'text/html')
            res.send(data);
            console.log('访问了' + times + '次')
        }
    })
})

app.use('/main',authmain, function (req, res) {
    console.log('访问了main页面')
    if (req.flag) {
        fs.readFile(path.join(__dirname, 'public', 'html', 'main.html'), (err, data) => {
            if (err) {
                throw err
            }
            else {
                res.setHeader('Content-Type', 'text/html')
                res.send(data);
            }
        })
    }
    else {
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
    }
})

app.get('/index', auth,function (req, res) {
    if (req.flag) {
        fs.readFile(path.join(__dirname, 'public', 'html', 'index.html'), (err, data) => {
            if (err) {
                throw err
            }
            else {
                res.setHeader('Content-Type', 'text/html')
                res.send(data);

            }
        })
    }
    else {
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
    }
})

app.get('/findMates', auth,function (req, res) {
    if (req.flag) {
        fs.readFile(path.join(__dirname, 'public', 'html', 'findMates.html'), (err, data) => {
            if (err) {
                throw err
            }
            else {
                res.setHeader('Content-Type', 'text/html')
                res.send(data);
            }
        })
    }
    else {
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
    }
})

app.get('/returnMates',auth, async function (req, res) {
    if (req.flag) {
        console.log(req.query);
        let name = req.query['name'];
        let text = req.query['text'];
        console.log(name, text)
        console.log('收到了请求')
        switch (text) {
            case '找老乡': {
                let result = await myMates.findSameHome(name)
                res.send(result)
                console.log('找到了老乡')
                break;
            }
            case '找同生日': {
                let result = await myMates.findSameBirthday(name)
                res.send(result)
                console.log('找到了生日')
                break;
            }
            case '找同班': {
                let result = await myMates.findSameClass(name)
                res.send(result)
                console.log('找到了同班')
                break;
            }
        }
    }
})

app.listen(520, function () {
    console.log('listening 520...')
})