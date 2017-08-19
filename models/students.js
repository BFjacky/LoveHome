const db = require('./db.js')
Schema = db.Schema;

let StudentsSchema = new Schema(
    {
        schoolId: String,
        stuId: String,
        pswd: String,
        className: String,
        major: String,
        department: String,
        grade: String,
        birthday: String,
        nation: String,
        gender: String,
        IDCardNo: String,
        name: String,
        originInfo: {
            '考区': String,
            '通讯地址': String,
            '毕业中学': String,
            '出生日期': String,
            '宿舍地址': String,
        }
    }
)
module.exports = db.model('students', StudentsSchema);