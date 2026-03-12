-- Tạo database
CREATE DATABASE IF NOT EXISTS faq_chatbot
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE faq_chatbot;

-- Bảng danh mục (phân loại câu hỏi)
CREATE TABLE categories (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    slug       VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Bảng FAQ chính
CREATE TABLE faqs (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id INT UNSIGNED DEFAULT NULL,
    question    TEXT NOT NULL,
    answer      TEXT NOT NULL,
    keywords    VARCHAR(500) DEFAULT NULL,
    is_active   TINYINT(1) NOT NULL DEFAULT 1,
    sort_order  INT UNSIGNED NOT NULL DEFAULT 0,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FULLTEXT INDEX ft_question_answer (question, answer)
) ENGINE=InnoDB;

-- Bảng lưu lịch sử hội thoại
CREATE TABLE chat_logs (
    id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    session_id   VARCHAR(64) NOT NULL,
    user_message TEXT NOT NULL,
    ai_answer    TEXT NOT NULL,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_session (session_id)
) ENGINE=InnoDB;

-- Insert dữ liệu mẫu
INSERT INTO categories (name, slug) VALUES 
('Giờ & Địa chỉ', 'gio-dia-chi'),
('Sản phẩm & Giá', 'san-pham-gia'),
('Chính sách', 'chinh-sach');

INSERT INTO faqs (category_id, question, answer, keywords) VALUES 
(1, 'Cửa hàng mở cửa lúc mấy giờ?', 'Chúng tôi mở cửa từ 8:00 đến 21:00 mỗi ngày kể cả cuối tuần.', 'giờ mở cửa, open, giờ làm việc'),
(1, 'Địa chỉ cửa hàng ở đâu?', 'Cửa hàng tại 123 Nguyễn Huệ, Quận 1, TP.HCM.', 'địa chỉ, location, ở đâu'),
(2, 'Giá áo thun bao nhiêu?', 'Áo thun cơ bản giá từ 150.000đ đến 350.000đ tuỳ loại.', 'giá áo, price, bao nhiêu tiền'),
(2, 'Có áo sơ mi không?', 'Có, chúng tôi có nhiều mẫu áo sơ mi nam nữ, giá từ 200.000đ.', 'áo sơ mi, shirt'),
(3, 'Chính sách đổi trả như thế nào?', 'Đổi trả miễn phí trong 7 ngày nếu sản phẩm còn nguyên tem mác.', 'đổi trả, return, hoàn hàng'),
(3, 'Có ship hàng không?', 'Có, chúng tôi ship toàn quốc. Miễn phí ship cho đơn từ 500.000đ.', 'ship, giao hàng, delivery');
