const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service: "Naver",
    auth: {
        user: "flzlfkdrnfma@naver.com",
        pass: "비밀번호입력"
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    smtpTransport
}