const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');
const bcrypt = require('bcrypt');  // 비밀번호 암호화를 위한 bcrypt 모듈

const app = express();
const port = 3001;

// MariaDB 연결 풀 설정
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',  // MariaDB 사용자 비밀번호
  database: 'user_management', // 사용할 데이터베이스 이름
  connectionLimit: 5,
  charset: 'utf8mb4'  // charset 설정 추가
});

app.use(cors());
app.use(bodyParser.json());

// 회원가입 엔드포인트
app.post('/signup', async (req, res) => {
  const { name, email, password, role, status } = req.body;

  try {
    const conn = await pool.getConnection();
    
    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 회원 정보 저장
    const insertQuery = 'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)';
    await conn.query(insertQuery, [name, email, hashedPassword, role, status]);
    conn.release();
    res.status(200).json({ message: '회원가입이 성공적으로 완료되었습니다!' });
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: '이미 사용 중인 이메일입니다.' });
    } else {
      res.status(500).json({ error: '데이터베이스 오류가 발생했습니다.' });
    }
  }
});

// 로그인 엔드포인트
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const conn = await pool.getConnection();

    // 이메일로 사용자 검색
    const selectQuery = 'SELECT * FROM users WHERE email = ?';
    const rows = await conn.query(selectQuery, [email]);
    conn.release();

    if (rows.length === 0) {
      return res.status(400).json({ error: '존재하지 않는 이메일입니다.' });
    }

    const user = rows[0];

    // 비밀번호 비교
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    res.status(200).json({ message: '로그인에 성공했습니다.', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '데이터베이스 오류가 발생했습니다.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
