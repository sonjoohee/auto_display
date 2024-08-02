const nodemailer = require('nodemailer');

// 테스트용 계정 설정
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'endnjs33@gmail.com',
      pass: '',        // 테스트용 계정의 앱 비밀번호
  },
});

const sendTestEmail = async () => {
  const mailOptions = {
    from: 'endnjs33@gmail.com',
    to: 'endnjs33@gmail.com', // 수신자 이메일 주소
    subject: 'Nodemailer Test',
    text: 'Hello, this is a test email sent using Nodemailer!',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

// 테스트 이메일 발송
sendTestEmail();
