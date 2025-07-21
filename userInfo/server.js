const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();

// 🔧 DB 연결 및 에러 처리 강화
const db = new sqlite3.Database('userInfo.db', (err) => {
  if (err) {
    console.error('❌ 데이터베이스 연결 실패:', err.message);
    process.exit(1);
  } else {
    console.log('✅ 데이터베이스 연결 성공');
  }
});

// 🔧 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // JSON도 처리할 수 있도록 추가

// 정적 파일 제공
app.use(express.static(path.join(__dirname, '..')));

app.use(session({
  secret: 'greenwaves-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 1000 }
}));

// 🔧 요청 로그 미들웨어 추가 (디버깅용)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// 🔧 DB 테이블 생성
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT UNIQUE,
    name TEXT,
    phone TEXT,
    postcode TEXT,
    address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('❌ 테이블 생성 실패:', err.message);
  } else {
    console.log('✅ users 테이블 준비 완료');
  }
});

// 기존 GET 라우트들...
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'main.html'));
});

app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'main.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'profile.html'));
});

app.get('/sale', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'sale.html'));
});

app.get('/school', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'school.html'));
});

app.get('/shopping-bag', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'shopping-bag.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'signin.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'signup.html'));
});

app.get('/signup2', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'signup2.html'));
});

app.get('/bathroom', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'bathroom.html'));
});

app.get('/bedroom', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'bedroom.html'));
});

app.get('/kitchen', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'kitchen.html'));
});

app.get('/:page.html', (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, '..', 'html', `${page}.html`), (err) => {
    if (err) {
      res.status(404).send('페이지를 찾을 수 없습니다.');
    }
  });
});

// 🟡 [POST] 1단계 등록 - 개선된 버전
app.post('/register', (req, res) => {
  console.log('🔍 /register 요청 받음:', req.body);
  
  const { username, password, confirm, email } = req.body;

  // 필수 필드 체크
  if (!username || !password || !confirm || !email) {
    console.log('❌ 필수 필드 누락');
    return res.status(400).json({ 
      success: false, 
      field: 'username', 
      message: '모든 값을 입력해주세요.' 
    });
  }

  // 유효성 검증
  if (username.length < 4) {
    return res.status(400).json({ 
      success: false, 
      field: 'username', 
      message: '아이디는 4자 이상이어야 합니다.' 
    });
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      success: false, 
      field: 'password', 
      message: '비밀번호는 6자 이상이어야 합니다.' 
    });
  }

  if (password !== confirm) {
    return res.status(400).json({ 
      success: false, 
      field: 'confirm-password', 
      message: '비밀번호가 일치하지 않습니다.' 
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      field: 'email', 
      message: '올바른 이메일 형식을 입력하세요.' 
    });
  }

  // 중복 확인
  console.log('🔍 중복 확인 시작');
  db.get('SELECT id FROM users WHERE username = ? OR email = ?', [username, email], (err, row) => {
    if (err) {
      console.error('❌ DB 조회 오류:', err);
      return res.status(500).json({ 
        success: false, 
        field: 'username', 
        message: '서버 오류가 발생했습니다.' 
      });
    }

    if (row) {
      console.log('❌ 중복된 사용자 발견');
      return res.status(409).json({ 
        success: false, 
        field: 'username', 
        message: '이미 존재하는 아이디 또는 이메일입니다.' 
      });
    }

    // 세션에 저장
    req.session.userInfo = { username, password, email };
    console.log('✅ 1단계 등록 성공, 세션 저장됨');
    
    res.json({ success: true });
  });
});

// 🟢 [POST] 2단계 등록
app.post('/register/final', (req, res) => {
  console.log('🔍 /register/final 요청 받음:', req.body);
  
  const { name, phone, postcode, address } = req.body;
  const sessionData = req.session.userInfo;

  if (!sessionData) {
    console.log('❌ 세션 데이터 없음');
    return res.status(400).json({
      success: false,
      message: '세션이 만료되었습니다. 처음부터 다시 진행해주세요.'
    });
  }

  if (!name || !phone || !postcode || !address) {
    return res.status(400).json({
      success: false,
      message: '모든 필드를 입력해주세요.'
    });
  }

  if (name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: '이름은 2자 이상이어야 합니다.'
    });
  }

  const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
  if (!phoneRegex.test(phone.replace(/-/g, ''))) {
    return res.status(400).json({
      success: false,
      message: '올바른 전화번호 형식을 입력하세요.'
    });
  }

  const postcodeRegex = /^\d{5}$/;
  if (!postcodeRegex.test(postcode)) {
    return res.status(400).json({
      success: false,
      message: '우편번호는 5자리 숫자여야 합니다.'
    });
  }

  if (address.trim().length < 5) {
    return res.status(400).json({
      success: false,
      message: '상세주소를 정확히 입력하세요.'
    });
  }

  const { username, password, email } = sessionData;

  const stmt = db.prepare(`
    INSERT INTO users (username, password, email, name, phone, postcode, address)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(username, password, email, name, phone, postcode, address, function(err) {
    if (err) {
      console.error('❌ DB 삽입 오류:', err);
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).send('이미 존재하는 아이디 또는 이메일입니다.');
      }
      return res.status(500).send('회원가입 중 오류가 발생했습니다.');
    }
  
    console.log('✅ 사용자 등록 완료, ID:', this.lastID);
  
    // 세션 정리
    req.session.destroy((err) => {
      if (err) {
        console.error('❌ 세션 삭제 오류:', err);
      }
    });
  
    // 단순 텍스트 응답으로 변경
    res.send('🎉 회원가입이 완료되었습니다! Green Waves에 오신 것을 환영합니다.');
  });

  stmt.finalize();
});

// 🔵 [POST] 로그인 API
app.post('/api/login', (req, res) => {
  console.log('🔍 /api/login 요청 받음:', req.body);
  
  const { userId, password } = req.body;

  // 입력값 검증
  if (!userId || !password) {
    console.log('❌ 필수 필드 누락');
    return res.status(400).json({ 
      success: false, 
      message: '아이디와 비밀번호를 모두 입력해주세요.' 
    });
  }

  // DB에서 사용자 조회
  db.get('SELECT * FROM users WHERE username = ?', [userId], (err, row) => {
    if (err) {
      console.error('❌ DB 조회 오류:', err);
      return res.status(500).json({ 
        success: false, 
        message: '서버 오류가 발생했습니다.' 
      });
    }

    if (!row) {
      console.log('❌ 존재하지 않는 아이디:', userId);
      return res.status(401).json({ 
        success: false, 
        message: '존재하지 않는 아이디입니다.' 
      });
    }

    // 비밀번호 확인
    if (password === row.password) {
      console.log('✅ 로그인 성공:', userId);
      
      // 세션에 로그인 정보 저장
      req.session.user = {
        id: row.id,
        username: row.username,
        name: row.name,
        email: row.email
      };

      return res.json({ 
        success: true, 
        message: '로그인 성공',
        userId: row.username 
      });
    } else {
      console.log('❌ 비밀번호 불일치:', userId);
      return res.status(401).json({ 
        success: false, 
        message: '비밀번호가 틀렸습니다.' 
      });
    }
  });
});

// 🔧 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error('💥 서버 에러:', err);
  res.status(500).json({
    success: false,
    message: '서버 내부 오류가 발생했습니다.'
  });
});

// 🔧 404 핸들러
app.use((req, res) => {
  console.log('❌ 404 - 페이지를 찾을 수 없음:', req.path);
  res.status(404).send('페이지를 찾을 수 없습니다.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Green Waves 서버 실행 중: http://localhost:${PORT}`);
});

// 프로세스 종료 시 DB 연결 정리
process.on('SIGINT', () => {
  console.log('🔧 서버 종료 중...');
  db.close((err) => {
    if (err) {
      console.error('❌ DB 연결 종료 오류:', err.message);
    } else {
      console.log('✅ DB 연결 종료됨');
    }
    process.exit(0);
  });
});