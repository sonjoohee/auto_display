const nodemailer = require('nodemailer');
require('dotenv').config(); // .env 파일의 환경 변수를 로드합니다.

// SMTP 설정을 사용하여 전송기(transporter) 객체를 생성합니다.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // 환경 변수에서 이메일을 가져옵니다.
    pass: process.env.APP_PASSWORD, // 환경 변수에서 앱 비밀번호를 가져옵니다.
  },
});

// 이메일 옵션 설정
const mailOptions = {
  from: process.env.EMAIL, // 발신자 주소 (본인 이메일)
  to: 'endnjs33@gmail.com', // 수신자 주소 (여기서는 본인에게 발송)
  subject: 'Node.js를 통한 테스트 이메일', // 이메일 제목
  text: '이것은 Node.js와 Gmail SMTP를 사용하여 전송된 테스트 이메일입니다.', // 이메일 본문
  // html: '<b>이것은 테스트 이메일입니다.</b>' // HTML 형식의 본문도 사용 가능
};

// 이메일을 전송합니다.
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('이메일 전송 오류:', error);
  } else {
    console.log('이메일이 성공적으로 전송되었습니다:', info.response);
  }
});
