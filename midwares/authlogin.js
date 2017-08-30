const sessions = require('../models/sessions.js');

//处理cookie
module.exports = async function (req, res, next) {
    //没有，给新cookie，并存入数据库中,并返回给浏览器
    if (JSON.stringify(req.cookies) == '{}') {
        req.flag = false;
        console.log('浏览器中的cookie为空！');
        let randomStr = Math.random().toString(36).substring(2, 20);
        let sessionId = randomStr;
        await NewSessionId(sessionId);
        req.mySessionId = 'sessionId=' + sessionId;
        res.cookie('sessionId', sessionId);
        return next();
    }
    //浏览器中有cookie,在数据库中查找到该cookie，判断是否可用
    console.log('浏览器中有cookie')
    console.log('浏览器中的sessionId:', req.cookies.sessionId);
    let flag = await isTrue(req.cookies.sessionId);
    //不可用，给新cookie，并存入数据库中
    if (!flag) {
        req.flag = false;
        console.log('sessionId不可用', req.cookies.sessionId);
        await delSession(req.cookies.sessionId);
        console.log('数据库中原来的cookie不可用');
        let randomStr = Math.random().toString(36).substring(2, 20);
        await NewSessionId(randomStr);
        req.mySessionId = 'sessionId=' + randomStr;
        res.cookie('sessionId', randomStr);
        return next();
    }
    req.flag = true;
    return next();
}
function NewSessionId(sessionId) {
    console.log('正在向数据库中插入新sessionId: ', sessionId);
    let p = new Promise(function (resolve, reject) {
        let session = new sessions(
            {
                sessionId: sessionId,
                isAvilible: false,
            }
        )
        session.save(function (err, res) {
            if (err) {
                console.log('err:', err)
                reject(err)
            }
            else {
                resolve(res)
            }
        })
    })
    return p;
}
function delSession(sessionId) {
    console.log('正在删除不可用sessionId: ', sessionId)
    let p = new Promise(function (resolve, reject) {
        let whereStr = { sessionId: sessionId }
        sessions.remove(whereStr, function (err, res) {
            if (err) {
                console.log('err:', err)
                reject(err)
            }
            else {
                resolve(res)
            }
        })
    })

    return p;
}
function makeTrue(sessionId) {
    console.log('正在使sessionId生效: ', sessionId);
    let p = new Promise(function (resolve, reject) {
        let whereStr = { sessionId: sessionId }
        let updateStr = {
            isAvilible: true,
        }
        let cond = { upsert: false, nulti: true }
        sessions.update(whereStr, updateStr, cond, function (err, res) {
            if (err) {
                console.log('err:', err)
                reject(err)
            }
            else {
                resolve(res)
            }
        })
    })
    return p;
}

function isTrue(sessionId) {
    console.log('正在判断是否sessionId是否可用')
    let p = new Promise(function (resolve, reject) {
        let whereStr = { sessionId: sessionId }
        sessions.find(whereStr, function (err, res) {
            if (err) {
                console.log('err:', err)
                reject(err);
            }
            else {
                let flag;
                res.forEach(function (e) {
                    flag = e.isAvilible;
                })
                if (flag !== true) {
                    flag = false;
                }
                console.log(flag);
                resolve(flag);
            }
        })
    })
    return p;
}