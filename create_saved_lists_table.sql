-- 저장된 목록 테이블 생성
CREATE TABLE IF NOT EXISTS saved_lists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    list_type VARCHAR(20) NOT NULL COMMENT '목록 타입: products, discounts, payments',
    list_data JSON NOT NULL COMMENT '목록 데이터 (JSON)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_list_type (list_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='저장된 상품/할인/결제 목록';
