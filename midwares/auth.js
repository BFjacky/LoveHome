const sessions = require('../models/sessions.js');
const password = 'dyycyf1314';
//处理cookie
module.exports = async function (req, res, next) {
    //没有cookie,则false
    console.log('1-----')
    if (JSON.stringify(req.cookies) == '{}') {
        req.flag = false;
        return next();
    }
    console.log('2-------')
    //有cookie，看是否可用
    req.flag = await isTrue(req.cookies.sessionId);
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
    let p = new Promise(function (resolve, reject) {
        let whereStr = { sessionId: sessionId }
        sessions.find(whereStr, function (err, res) {
            if (err) {
                console.log('err:', err)
                reject(err);
            }
            else {
                let flag;
                flag = res[0].isAvilible;
                if (flag !== true) {
                    flag = false;
                }
                console.log('经istrue方法验证flag为: ', flag);
                resolve(flag);
            }
        })
    })
    return p;
}