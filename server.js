// server.js

const express = require('express');
const mariadb = require('mariadb');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); // 주석 처리된 부분
const nodemailer = require('nodemailer'); // 주석 처리된 부분
require('dotenv').config(); // .env 파일에서 환경변수를 로드합니다.

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


// nodemailer 전송기 설정
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendVerificationEmail = async (to, link) => {
  const mailOptions = {
    from: 'endnjs33@gmail.com',
    to,
    subject: '이메일 인증',
    html: `<p>다음 링크를 클릭하여 이메일 인증을 완료하세요: <a href="${link}">이메일 인증하기</a></p>`
  };

  await transporter.sendMail(mailOptions);
};

app.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = crypto.randomBytes(32).toString('hex'); // 이메일 인증 토큰 생성

  let conn;
  try {
    conn = await pool.getConnection();
    const query = `
      INSERT INTO users (name, email, password, role, status, token)
      VALUES (?, ?, ?, ?, 'inactive', ?)
    `;
    await conn.query(query, [name, email, hashedPassword, role, token]);

    // 인증 이메일 발송
    const verificationLink = `http://localhost:3000/verify-email?token=${token}`;
    await sendVerificationEmail(email, verificationLink);

    res.status(200).send('회원가입 성공. 이메일을 확인하여 인증을 완료하세요.');
  } catch (err) {
    console.error('회원가입 실패:', err);
    
    // MariaDB에서 발생한 오류 중 'Duplicate entry'인 경우 처리
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).send({ error: '이미 사용 중인 이메일 주소입니다.' });
    } else {
      res.status(500).send('서버 오류');
    }
  } finally {
    if (conn) conn.release();
  }
});

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
      res.status(200).json({ message: '이메일 인증이 완료되었습니다.' });
      // res.redirect('http://localhost:3000/email-verified'); // 성공 시 임시 페이지로 리디렉션
    }
  } catch (err) {
    console.error('이메일 인증 실패:', err);
    res.status(500).send('서버 오류');
  } finally {
    if (conn) conn.release();
  }
});


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

app.get('/current-user', async (req, res) => {
  const { userId } = req.query; // 클라이언트에서 userId를 쿼리로 받아옴

  let conn;
  try {
    conn = await pool.getConnection();
    const query = `SELECT name FROM users WHERE id = ?`;
    const rows = await conn.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(400).send({ error: '사용자를 찾을 수 없습니다.' });
    }

    const user = rows[0];
    res.status(200).send({ user });
  } catch (err) {
    console.error('사용자 정보 조회 실패:', err);
    res.status(500).send('서버 오류');
  } finally {
    if (conn) conn.release();
  }
});



app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});


