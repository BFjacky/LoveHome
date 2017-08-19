const students = require('../models/students.js')

function Mates() {

}

//姓名查找
function findByName(name) {
    let p = new Promise(function (resolve, reject) {
        wherestr = { 'originInfo.姓名': name };
        students.find(wherestr, function (err, res) {
            if (err) {
                console.log('err: ' + err)
            }
            else {
                resolve(res);
            }
        })
    })
    return p;
}
//班级查找
function findByClass(className) {
    let p = new Promise(function (resolve, reject) {
        wherestr = { 'className': className };
        students.find(wherestr, function (err, res) {
            if (err) {
                console.log('err: ' + err)
            }
            else {
                resolve(res);
            }
        })
    })
    return p;
}
//考区查找
function findByHome(Homename) {
    let p = new Promise(function (resolve, reject) {
        wherestr = { 'originInfo.考区': Homename };
        students.find(wherestr, function (err, res) {
            if (err) {
                console.log('err: ' + err)
            }
            else {
                resolve(res);
            }
        })
    })
    return p;
}
//生日查找
function findByBirthday(birthday) {
    let p = new Promise(function (resolve, reject) {
        wherestr = { birthday: birthday };
        students.find(wherestr, function (err, res) {
            if (err) {
                console.log('err: ' + err)
            }
            else {
                resolve(res);
            }
        })
    })
    return p;
}
//查找重名的人
async function findSameName(name) {
    let res = await findByName(name)
    return res;
}
//查找相同生日的人
Mates.prototype.findSameBirthday = async function (name) {
    let res = await findByName(name);
    if (res.length === 1) {
        let birthday = res[0].birthday
        let resBirthMates = await findByBirthday(birthday)
        return resBirthMates;
    }
    else {
        console.log('有重名!!!')
    }
}
//查找相同班级的人
Mates.prototype.findSameClass=async function (name) {
    let res = await findByName(name);
    if (res.length === 1) {
        let className = res[0].className
        let resClassmates = await findByClass(className)
        return resClassmates;
    }
    else {
        console.log('有重名!!!')
    }
}
//查找相同家乡的人
Mates.prototype.findSameHome=async function (name) {
    let res = await findByName(name);
    if (res.length === 1) {
        let homeName = res[0].originInfo['考区']
        let resHomeMates = await findByHome(homeName)
        return resHomeMates
    }
    else {
        console.log('有重名!!!')
    }
}
//处理重名的人
async function handleSameName(name) {
    let resNamemates = await findSameName(name)
    console.log(resNamemates.length)
    for (let i = 0; i < resNamemates.length; i++) {
        console.log(
            resNamemates[i].name,
            resNamemates[i].birthday,
            resNamemates[i].stuId,
            resNamemates[i].pswd,
            resNamemates[i].gender,
            resNamemates[i].className,
            resNamemates[i].originInfo['毕业中学'],
            resNamemates[i].originInfo['宿舍地址'],
            resNamemates[i].originInfo['通讯地址'],
        )
    }
}
//处理相同生日的人
async function handleSameBirth(name) {
    let resBirthmates = await findSameBirthday(name)
    console.log(resBirthmates.length)
    for (let i = 0; i < resBirthmates.length; i++) {
        console.log(
            resBirthmates[i].name,
            resBirthmates[i].birthday,
            resBirthmates[i].stuId,
            //resBirthmates[i].pswd,
            resBirthmates[i].gender,
            resBirthmates[i].className,
            resBirthmates[i].originInfo['毕业中学'],
            resBirthmates[i].originInfo['宿舍地址'],
            resBirthmates[i].originInfo['通讯地址'],
        )
    }
}
//处理相同班级的人的数据
async function handleSameClass(name) {
    let resClassmates = await findSameClass(name)
    console.log(resClassmates.length)
    for (let i = 0; i < resClassmates.length; i++) {
        console.log(resClassmates[i].name,
            resClassmates[i].birthday,
            resClassmates[i].stuId,
            resClassmates[i].pswd,
            resClassmates[i].gender,
            resClassmates[i].originInfo['毕业中学'],
            resClassmates[i].originInfo['宿舍地址'],
            resClassmates[i].originInfo['通讯地址'],
        );
    }
}
//处理相同家乡的人的数据
async function handleSameHome(name) {
    let resHomeMates = await findSameHome(name);
    console.log(resHomeMates.length)
    for (let i = 0; i < resHomeMates.length; i++) {
        if (getCity(resHomeMates[i].originInfo['通讯地址']) !== null)
            console.log(
                resHomeMates[i].stuId,
                resHomeMates[i].pswd,
                resHomeMates[i].name,
                resHomeMates[i].gender,
                resHomeMates[i].className,
                resHomeMates[i].originInfo['毕业中学'],
                resHomeMates[i].originInfo['宿舍地址'],
                resHomeMates[i].originInfo['通讯地址'],
            );
    }

    process.exit(0);
}

module.exports = Mates;













//匹配城市的正则表达式
//
function getCity(home) {
    let patt = /(唐山)|(丰润)|(玉田)|(迁安)|(滦南)|(丰南)/g;
    let res = home.match(patt)
    return res;
}


