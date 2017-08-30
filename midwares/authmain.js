const sessions = require('../models/sessions.js');
const password = 'dyycyf1314';
//处理cookie
module.exports = async function (req, res, next) {
    //没有cookie,则false
    if (JSON.stringify(req.cookies) == '{}') {
        req.flag = false;
        return next();
    }
    //有cookie并且为真
    else{
       req.flag = await isTrue(req.cookies.sessionId);
       if(req.flag){
           return next();
       }
    }
    //有cookie，看密码是否正确，密码正确则绑定成功，激活cookie
    if (req.body.password === password) {
        await makeTrue(req.cookies.sessionId)
        req.flag = true;
        return next();
    }
    else {
        req.flag = false;
        return next();
    }
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