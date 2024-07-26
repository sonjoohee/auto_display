// server.js

const express = require('express');
const mariadb = require('mariadb');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
// const crypto = require('crypto'); // 주석 처리된 부분
// const nodemailer = require('nodemailer'); // 주석 처리된 부분

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // 클라이언트 주소
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// COOP 및 COEP 설정 추가
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root', // 사용자 비밀번호
  database: 'user_management',
  connectionLimit: 5
});

/*
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'endnjs33@gmail.com',
    pass: 'fprmcetbdjwrivjk', // 앱 비밀번호
  },
});

const sendVerificationEmail = async (to, link) => {
  const mailOptions = {
    from: 'endnjs33@gmail.com',
    to,
    subject: '이메일 인증',
    text: `다음 링크를 클릭하여 이메일 인증을 완료하세요: ${link}`,
  };

  await transporter.sendMail(mailOptions);
};
*/

app.post('/signup', async (req, res) => {
  const { name, email, password, role, status } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // const token = crypto.randomBytes(32).toString('hex'); // 이메일 인증 토큰 생성

  let conn;
  try {
    conn = await pool.getConnection();
    const query = `
      INSERT INTO users (name, email, password, role, status)
      VALUES (?, ?, ?, ?, ?)
    `;
    await conn.query(query, [name, email, hashedPassword, role, status]);

    // 인증 이메일 발송
    // const verificationLink = `http://localhost:3000/verify-email?token=${token}`;
    // await sendVerificationEmail(email, verificationLink);

    res.status(200).send('회원가입 성공.');
  } catch (err) {
    console.error('회원가입 실패:', err);
    res.status(500).send('서버 오류');
  } finally {
    if (conn) conn.release();
  }
});

/*
app.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  let conn;
  try {
    conn = await pool.getConnection();
    const query = `UPDATE users SET status = 'active', token = NULL WHERE token = ? AND status = 'inactive'`;
    const result = await conn.query(query, [token]);

    if (result.affectedRows === 0) {
      res.status(400).send('잘못되었거나 만료된 토큰입니다.');
    } else {
      res.status(200).send('이메일 인증이 완료되었습니다.');
    }
  } catch (err) {
    console.error('이메일 인증 실패:', err);
    res.status(500).send('서버 오류');
  } finally {
    if (conn) conn.release();
  }
});
*/

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();
    const query = `SELECT * FROM users WHERE email = ?`;
    const rows = await conn.query(query, [email]);

    if (rows.length === 0) {
      return res.status(400).send({ error: '사용자를 찾을 수 없습니다.' });
    }

    const user = rows[0];

    if (user.status !== 'active') {
      return res.status(400).send({ error: '이메일이 인증되지 않았습니다.' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({ error: '비밀번호가 올바르지 않습니다.' });
    }

    res.status(200).send({ user });
  } catch (err) {
    console.error('로그인 실패:', err);
    res.status(500).send('서버 오류');
  } finally {
    if (conn) conn.release();
  }
});

app.post('/google-login', async (req, res) => {
  const { uid, name, email } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();
    const query = `
      INSERT INTO users (uid, name, email, status)
      VALUES (?, ?, ?, 'active')
      ON DUPLICATE KEY UPDATE name = ?, email = ?
    `;
    await conn.query(query, [uid, name, email, name, email]);

    res.status(200).send({ user: { uid, name, email } });
  } catch (err) {
    console.error('사용자 정보 저장 실패:', err);
    res.status(500).send('서버 오류');
  } finally {
    if (conn) conn.release();
  }
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
