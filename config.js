// 환경별 설정
const config = {
    development: {
        port: 3000,
        database: {
            host: 'localhost',
            user: 'induck1111',
            password: 'APPLEwogh3853!',
            database: 'induck1111',
            charset: 'utf8mb4'
        },
        domain: 'http://localhost:3000'
    },
    production: {
        port: process.env.PORT || 3000,
        database: {
            host: 'localhost', // dothome.co.kr의 MySQL 서버 주소
            user: 'induck1111',
            password: 'APPLEwogh3853!',
            database: 'induck1111',
            charset: 'utf8mb4'
        },
        domain: 'http://induck1111.dothome.co.kr'
    }
};

// 현재 환경 설정 (NODE_ENV가 설정되지 않으면 development)
const env = process.env.NODE_ENV || 'development';
module.exports = config[env];
