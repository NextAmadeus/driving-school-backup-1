const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');

const app = express();
const PORT = config.port;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 서빙 (프론트엔드 파일들)
app.use(express.static('.'));

// 데이터베이스 연결 설정
const dbConfig = config.database;

// 데이터베이스 연결 풀 생성
const pool = mysql.createPool(dbConfig);

// 데이터베이스 연결 테스트
pool.getConnection((err, connection) => {
    if (err) {
        console.error('데이터베이스 연결 실패:', err);
        return;
    }
    console.log('데이터베이스 연결 성공!');
    connection.release();
});

// 회원 등록 API
app.post('/api/members', (req, res) => {
    const {
        branch, name, gender, birthYear, birthMonth, birthDay,
        address, detailAddress, phone, noPhone, receptionDate,
        productName, productPrice, productPeriod, productHours,
        paymentType, discountName, discountRate, finalAmount, unpaid,
        otherPayment, visitPaths, practiceMethod, practiceMemo,
        indoorTestDate, roadTestDate, testCenter,
        preConsultation, writtenPass, functionPass, drivingPass, finalPass,
        refunded, expired, termsAgreed, termsContent,
        generalMemo, educationMemos
    } = req.body;

    // 방문경로와 교육메모를 JSON 문자열로 변환
    const visitPathsJson = JSON.stringify(visitPaths || []);
    const educationMemosJson = JSON.stringify(educationMemos || []);

    const sql = `
        INSERT INTO members (
            branch, name, gender, birth_year, birth_month, birth_day,
            address, detail_address, phone, no_phone, reception_date,
            product_name, product_price, product_period, product_hours,
            payment_type, discount_name, discount_rate, final_amount, unpaid,
            other_payment, visit_paths, practice_method, practice_memo,
            indoor_test_date, road_test_date, test_center,
            pre_consultation, written_pass, function_pass, driving_pass, final_pass,
            refunded, expired, terms_agreed, terms_content,
            general_memo, education_memos
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        branch, name, gender, birthYear, birthMonth, birthDay,
        address, detailAddress, phone, noPhone, receptionDate,
        productName, productPrice, productPeriod, productHours,
        paymentType, discountName, discountRate, finalAmount, unpaid,
        otherPayment, visitPathsJson, practiceMethod, practiceMemo,
        indoorTestDate, roadTestDate, testCenter,
        preConsultation, writtenPass, functionPass, drivingPass, finalPass,
        refunded, expired, termsAgreed, termsContent,
        generalMemo, educationMemosJson
    ];

    pool.execute(sql, values, (err, result) => {
        if (err) {
            console.error('회원 등록 실패:', err);
            return res.status(500).json({
                success: false,
                message: '회원 등록 중 오류가 발생했습니다.',
                error: err.message
            });
        }

        console.log('회원 등록 성공:', result);
        res.json({
            success: true,
            message: '회원이 성공적으로 등록되었습니다.',
            memberId: result.insertId
        });
    });
});

// 회원 목록 조회 API
app.get('/api/members', (req, res) => {
    const sql = 'SELECT * FROM members ORDER BY created_at DESC';
    
    pool.execute(sql, (err, results) => {
        if (err) {
            console.error('회원 목록 조회 실패:', err);
            return res.status(500).json({
                success: false,
                message: '회원 목록 조회 중 오류가 발생했습니다.',
                error: err.message
            });
        }

        res.json({
            success: true,
            members: results
        });
    });
});

// 특정 회원 조회 API
app.get('/api/members/:id', (req, res) => {
    const memberId = req.params.id;
    const sql = 'SELECT * FROM members WHERE id = ?';
    
    pool.execute(sql, [memberId], (err, results) => {
        if (err) {
            console.error('회원 조회 실패:', err);
            return res.status(500).json({
                success: false,
                message: '회원 조회 중 오류가 발생했습니다.',
                error: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: '회원을 찾을 수 없습니다.'
            });
        }

        res.json({
            success: true,
            member: results[0]
        });
    });
});

// 회원 정보 수정 API
app.put('/api/members/:id', (req, res) => {
    const memberId = req.params.id;
    const updateData = req.body;
    
    // 동적으로 UPDATE 쿼리 생성
    const fields = Object.keys(updateData).filter(key => key !== 'id');
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const values = fields.map(field => updateData[field]);
    values.push(memberId);

    const sql = `UPDATE members SET ${setClause} WHERE id = ?`;

    pool.execute(sql, values, (err, result) => {
        if (err) {
            console.error('회원 수정 실패:', err);
            return res.status(500).json({
                success: false,
                message: '회원 수정 중 오류가 발생했습니다.',
                error: err.message
            });
        }

        res.json({
            success: true,
            message: '회원 정보가 성공적으로 수정되었습니다.'
        });
    });
});

// 회원 삭제 API
app.delete('/api/members/:id', (req, res) => {
    const memberId = req.params.id;
    const sql = 'DELETE FROM members WHERE id = ?';

    pool.execute(sql, [memberId], (err, result) => {
        if (err) {
            console.error('회원 삭제 실패:', err);
            return res.status(500).json({
                success: false,
                message: '회원 삭제 중 오류가 발생했습니다.',
                error: err.message
            });
        }

        res.json({
            success: true,
            message: '회원이 성공적으로 삭제되었습니다.'
        });
    });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`접속 URL: ${config.domain}`);
    console.log(`환경: ${process.env.NODE_ENV || 'development'}`);
});
