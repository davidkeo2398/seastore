-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th6 13, 2025 lúc 05:45 AM
-- Phiên bản máy phục vụ: 8.2.0
-- Phiên bản PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `sea_store`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `agency`
--

DROP TABLE IF EXISTS `agency`;
CREATE TABLE IF NOT EXISTS `agency` (
  `agency_id` int NOT NULL AUTO_INCREMENT,
  `agency_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` int NOT NULL,
  `import_price` int NOT NULL DEFAULT '0',
  `export_price` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`agency_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `agency`
--

INSERT INTO `agency` (`agency_id`, `agency_name`, `address`, `phone`, `import_price`, `export_price`, `createdAt`, `updatedAt`) VALUES
(1, 'Quitzon, Daniel and Mayer', '912 Lafayette Street', 275, 2846280, 3171191, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(2, 'Auer, Frami and Prohaska', '7739 Meadow Close', 400, 3617077, 2511102, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(3, 'Hoeger, Flatley and Franey', '48445 Fisher Freeway', 500, 4029203, 2285787, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(4, 'Streich - Wilderman', '4275 Chapel Road', 547, 3122565, 3910287, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(5, 'Lubowitz and Sons', '4326 Ruecker Extensions', 671, 1237925, 2915560, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(6, 'Prohaska - Senger', '836 S Main Avenue', 379, 1811650, 2609534, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(7, 'Fisher, Mosciski and Aufderhar', '15227 Oak Lane', 898, 3650590, 3570177, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(8, 'Haag, Cormier and Reynolds', '108 E State Street', 474, 1624611, 1351156, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(9, 'Torphy, Wisozk and Champlin', '330 O\'Reilly Views', 0, 3866805, 1803045, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(10, 'Hermann and Sons', '504 Noel Grove', 826, 2512238, 3121435, '2025-06-11 17:33:08', '2025-06-11 17:33:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `agency_point_log`
--

DROP TABLE IF EXISTS `agency_point_log`;
CREATE TABLE IF NOT EXISTS `agency_point_log` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`log_id`),
  KEY `user_id` (`user_id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `agency_point_log`
--

INSERT INTO `agency_point_log` (`log_id`, `user_id`, `order_id`, `createdAt`, `updatedAt`) VALUES
(1, 10, 5, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(2, 9, 5, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(3, 2, 2, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(4, 10, 1, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(5, 1, 1, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(6, 4, 8, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(7, 7, 7, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(8, 2, 6, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(9, 9, 6, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(10, 3, 5, '2025-06-11 17:33:08', '2025-06-11 17:33:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `agency_rank`
--

DROP TABLE IF EXISTS `agency_rank`;
CREATE TABLE IF NOT EXISTS `agency_rank` (
  `agency_rank_id` int NOT NULL AUTO_INCREMENT,
  `agency_rank_name` varchar(255) NOT NULL,
  `min_accumulated_value` int NOT NULL DEFAULT '0',
  `discount_percent` int NOT NULL DEFAULT '0',
  `note` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`agency_rank_id`),
  UNIQUE KEY `agency_rank_name` (`agency_rank_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `agency_rank`
--

INSERT INTO `agency_rank` (`agency_rank_id`, `agency_rank_name`, `min_accumulated_value`, `discount_percent`, `note`, `createdAt`, `updatedAt`) VALUES
(1, 'Bronnze', 1000000, 10, 'Hạng đồng', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(2, 'Silver', 5000000, 20, 'Hạng bạc', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(3, 'Gold', 10000000, 30, 'Hạng vàng', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(4, 'Platinum', 30000000, 40, 'Hạng platinum', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(5, 'Diamond', 40000000, 50, 'Hạng kim cương', '2025-06-11 17:33:08', '2025-06-11 17:33:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Thức ăn thủy sản', 'Thức ăn cho các loại thủy sản như cá, tôm, cua, ...', '2025-06-08 05:49:08', '2025-06-08 05:49:08'),
(2, 'Giống thủy sản', 'Các loại giống thủy sản như cá giống, tôm giống, ...', '2025-06-08 05:49:08', '2025-06-08 05:49:08'),
(3, 'Thuốc và chế phẩm sinh học', 'Các loại thuốc và chế phẩm sinh học dùng trong nuôi trồng thủy sản', '2025-06-08 05:49:08', '2025-06-08 05:49:08'),
(4, 'Thiết bị đo và kiểm tra', 'Các thiết bị đo lường và kiểm tra chất lượng nước, môi trường nuôi', '2025-06-08 05:49:08', '2025-06-08 05:49:08'),
(5, 'Xử lý nước', 'Các sản phẩm và thiết bị dùng để xử lý nước trong ao nuôi', '2025-06-08 05:49:08', '2025-06-08 05:49:08'),
(6, 'Khoáng và vitamin', 'Các loại khoáng và vitamin bổ sung cho thủy sản', '2025-06-08 05:49:08', '2025-06-08 05:49:08'),
(7, 'Máy móc và thiết bị ao nuôi', 'Các loại máy móc và thiết bị sử dụng trong ao nuôi thủy sản', '2025-06-08 05:49:08', '2025-06-08 05:49:08'),
(8, 'Sách và tài liệu chuyên ngành', 'Các loại sách và tài liệu chuyên ngành về nuôi trồng thủy sản', '2025-06-08 05:49:08', '2025-06-08 05:49:08'),
(9, 'Phụ kiện và vật tư nuôi trồng', 'Các loại phụ kiện và vật tư sử dụng trong nuôi trồng thủy sản', '2025-06-08 05:49:08', '2025-06-08 05:49:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment_content` varchar(255) NOT NULL,
  `rate` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`comment_id`, `comment_content`, `rate`, `createdAt`, `updatedAt`) VALUES
(1, 'Voluptate canis defungo.', '5', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(2, 'Trans veritas ceno.', '1', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(3, 'Tepesco altus adipiscor vel patria atrox crux ciminatio deripio degenero.', '4', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(4, 'Quis vulpes quasi perferendis aufero conservo voluptatibus.', '1', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(5, 'Creo provident spiculum textor angelus aliquid defaeco nulla strues degusto.', '3', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(6, 'Urbanus tersus tabesco cribro tenax armarium aequitas canis tenax.', '3', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(7, 'Tenetur decerno desidero celo.', '1', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(8, 'Eligendi virtus suffragium viduo patior testimonium somniculosus.', '4', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(9, 'Despecto adimpleo quibusdam omnis stipes civis amet venustas aliqua solus.', '3', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(10, 'Antiquus admitto voluntarius vesica tredecim.', '3', '2025-06-11 17:33:08', '2025-06-11 17:33:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_code` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `address_user` varchar(255) NOT NULL,
  `agency_name` varchar(255) NOT NULL,
  `address_agency` varchar(255) NOT NULL,
  `phone_user` varchar(255) NOT NULL,
  `phone_agency` varchar(255) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `promotion_id` int DEFAULT NULL,
  `order_date` datetime NOT NULL,
  `payment_method` enum('cash','paypal','bank_transfer','momo') NOT NULL,
  `promotion_code` varchar(255) DEFAULT NULL,
  `status` enum('pending','completed','cancelled') NOT NULL DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `promotion_id` (`promotion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`order_id`, `order_code`, `user_id`, `user_name`, `full_name`, `user_email`, `address_user`, `agency_name`, `address_agency`, `phone_user`, `phone_agency`, `total`, `promotion_id`, `order_date`, `payment_method`, `promotion_code`, `status`, `createdAt`, `updatedAt`) VALUES
(1, '20250612003308433', 4, 'Adele_Stehr', 'Marisa Cassin', 'Ayana.Zulauf32@hotmail.com', '975 Kirsten Views', 'Veum Inc', '89268 Harber Ferry', '805.615.0408 x4061', '221-341-6287 x650', 49.39, 5, '2025-06-01 20:00:27', 'momo', '0jNCp0eT3s', 'completed', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(2, '20250612003308433', 5, 'Lolita_Christiansen-Gibson', 'Dewayne Rippin', 'Junius_Nolan@yahoo.com', '125 Gulgowski Lights', 'Hane - Stehr', '850 Schaden Parks', '203-365-8585 x32509', '1-303-529-6893 x6460', 4.81, 9, '2025-03-28 19:40:44', 'cash', 'ywDZC8aHH6', 'cancelled', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(3, '20250612003308433', 10, 'Rupert_Connelly', 'Alycia Gleichner', 'Blair73@hotmail.com', '778 Aubree Ports', 'Fritsch - Toy', '98147 Park Avenue', '520-816-2139', '(588) 622-9133', 97.41, 9, '2024-10-15 06:39:53', 'paypal', 'Mf5LSrandj', 'completed', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(4, '20250612003308433', 9, 'Annabell_Franey', 'Michel Steuber', 'Ella_Thiel62@gmail.com', '8603 Emmerich Stravenue', 'Barton Inc', '3138 Middle Street', '366-509-4280 x38863', '1-834-419-8981 x6695', 52.25, 2, '2024-11-07 11:41:40', 'cash', 'FZdSWuEars', 'pending', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(5, '20250612003308433', 1, 'Isom_Abshire', 'Maximillian Runolfsdottir', 'Flo14@hotmail.com', '743 Maggio Valley', 'Littel and Sons', '4198 Lynch Neck', '545.486.1112 x84623', '695-800-4743 x36706', 31.25, 5, '2024-07-20 09:17:09', 'paypal', 'hm1Vr0HXET', 'cancelled', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(6, '20250612003308433', 9, 'Amos_Bartell', 'Emelie White', 'Meghan_Koelpin40@hotmail.com', '376 3rd Avenue', 'Lang Inc', '3406 Cole Ramp', '890.605.0999 x24622', '(616) 681-6822', 20.97, 4, '2025-06-07 22:18:19', 'momo', 'EMmztYDFHW', 'completed', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(7, '20250612003308433', 7, 'Katharina_Ritchie', 'Cecilia Ernser', 'Percival.Bahringer@gmail.com', '5308 Woodlands Road', 'Trantow, Boyle and Tillman', '65935 Springfield Close', '1-344-410-3559 x4365', '1-752-211-7914 x5185', 35.79, 3, '2024-12-15 18:16:22', 'paypal', 'g7QQMQ4BOu', 'completed', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(8, '20250612003308433', 9, 'Therese_Kuhic', 'Cali Buckridge', 'Lavina.Harris-Lebsack@yahoo.com', '7784 Langosh Mills', 'Gleichner - Morissette', '4996 Dickens Coves', '898.678.0786 x40920', '882-674-1589 x895', 68.31, 5, '2024-11-03 00:14:49', 'paypal', 'R39X8DempJ', 'pending', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(9, '20250612003308433', 4, 'Bertram_Bergnaum', 'Asia Stracke', 'Daisha.Reilly@hotmail.com', '4333 Commercial Street', 'Von, Torp and Schamberger', '97772 Boyer Light', '810.767.1425', '(222) 249-0235 x80334', 96.50, 1, '2025-05-14 22:10:36', 'momo', 'ExvGW97sx2', 'completed', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(10, '20250612003308433', 4, 'Olin_Dicki', 'Mariela Wisoky', 'Jodie.Abbott27@yahoo.com', '122 W 4th Street', 'Langosh Inc', '88959 O\'Hara Heights', '221.200.3433 x63152', '251-637-5173 x4562', 1.58, 4, '2024-08-06 21:36:48', 'paypal', 'ZUXZ4tgqaS', 'pending', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(11, '20250612004129380', 14, 'nametran321', '', 'namtran321@gmail.com', '', 'Trân', '12345 trần hưng đạo', '', '0337586860', 860800.00, 1, '2025-06-11 17:41:29', 'cash', NULL, 'pending', '2025-06-11 17:41:29', '2025-06-11 17:41:29'),
(12, '20250612004135715', 14, 'nametran321', '', 'namtran321@gmail.com', '', 'Trân', '12345 trần hưng đạo', '', '0337586860', 860800.00, 1, '2025-06-11 17:41:35', 'cash', NULL, 'pending', '2025-06-11 17:41:35', '2025-06-11 17:41:35'),
(13, '20250612004203202', 14, 'nametran321', '', 'namtran321@gmail.com', '', 'Trân', '12345 trần hưng đạo', '', '0337586860', 330400.00, 1, '2025-06-11 17:42:03', 'cash', NULL, 'pending', '2025-06-11 17:42:03', '2025-06-11 17:42:03'),
(14, '20250612004345056', 14, 'nametran321', '', 'namtran321@gmail.com', '', 'Trân', '12345 trần hưng đạo', '', '0337586860', 330400.00, 1, '2025-06-11 17:43:45', 'cash', NULL, 'pending', '2025-06-11 17:43:45', '2025-06-11 17:43:45'),
(15, '20250612132825133', 14, 'nametran321', '', 'namtran321@gmail.com', '', 'Trân', '12345 trần hưng đạo', '', '0337586860', 0.00, 1, '2025-06-12 06:28:25', 'cash', NULL, 'pending', '2025-06-12 06:28:25', '2025-06-12 06:28:25'),
(16, '20250612134355501', 14, 'nametran321', '', 'namtran321@gmail.com', '', 'Trân', '12345 trần hưng đạo', '', '0337586860', 330400.00, 1, '2025-06-12 06:43:55', 'cash', NULL, 'pending', '2025-06-12 06:43:55', '2025-06-12 06:43:55'),
(17, '20250612140706843', 14, 'nametran321', '', 'namtran321@gmail.com', '', 'Trân', '12345 trần hưng đạo', '', '0337586860', 660800.00, 1, '2025-06-12 07:07:06', 'cash', NULL, 'pending', '2025-06-12 07:07:06', '2025-06-12 07:07:06'),
(18, '20250612151726296', 14, 'nametran321', '', 'namtran321@gmail.com', '', 'Trân', 'ư', '', '0337586860', 430400.00, 1, '2025-06-12 08:17:26', 'cash', NULL, 'pending', '2025-06-12 08:17:26', '2025-06-12 08:17:26'),
(19, '20250612172253442', 14, 'nametran321', '', 'namtran321@gmail.com', '', 'Trân', '12', '', '0337586860', 0.00, 1, '2025-06-12 10:22:53', 'cash', NULL, 'pending', '2025-06-12 10:22:53', '2025-06-12 10:22:53'),
(20, '20250612230437891', 14, 'nametran321', '', 'namtran321@gmail.com', '', 'Tran Tran', '12345 trần hưng đạo', '', '0337586860', 1463900.00, 1, '2025-06-12 16:04:37', 'cash', NULL, 'pending', '2025-06-12 16:04:37', '2025-06-12 16:04:37');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders_item`
--

DROP TABLE IF EXISTS `orders_item`;
CREATE TABLE IF NOT EXISTS `orders_item` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `order_id` int NOT NULL,
  `warehouse_id` int DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `isPaid` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  KEY `warehouse_id` (`warehouse_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `orders_item`
--

INSERT INTO `orders_item` (`order_item_id`, `product_id`, `order_id`, `warehouse_id`, `quantity`, `isPaid`, `createdAt`, `updatedAt`) VALUES
(1, 8, 3, 9, 2, 0, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(2, 8, 1, 3, 3, 0, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(3, 8, 7, 9, 1, 0, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(4, 4, 1, 10, 7, 0, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(5, 5, 9, 2, 9, 0, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(6, 4, 8, 5, 4, 0, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(7, 9, 7, 7, 5, 0, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(8, 2, 4, 4, 1, 0, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(9, 9, 10, 10, 6, 0, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(10, 5, 1, 7, 10, 0, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(11, 1, 11, NULL, 2, 0, '2025-06-11 17:41:29', '2025-06-11 17:41:29'),
(12, 1, 12, NULL, 2, 0, '2025-06-11 17:41:35', '2025-06-11 17:41:35'),
(13, 4, 13, NULL, 1, 0, '2025-06-11 17:42:03', '2025-06-11 17:42:03'),
(14, 4, 14, NULL, 1, 0, '2025-06-11 17:43:45', '2025-06-11 17:43:45'),
(15, 4, 16, NULL, 1, 0, '2025-06-12 06:43:55', '2025-06-12 06:43:55'),
(16, 4, 17, NULL, 2, 0, '2025-06-12 07:07:06', '2025-06-12 07:07:06'),
(17, 1, 18, NULL, 1, 0, '2025-06-12 08:17:26', '2025-06-12 08:17:26'),
(18, 2, 20, NULL, 1, 0, '2025-06-12 16:04:37', '2025-06-12 16:04:37');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `description` text,
  `category_id` int NOT NULL,
  `agency_id` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `unit` int NOT NULL DEFAULT '0',
  `old_price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `warehouse_id` int NOT NULL,
  `number_of_inventory` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `warehouse_id` (`warehouse_id`),
  KEY `category_id` (`category_id`),
  KEY `agency_id` (`agency_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `description`, `category_id`, `agency_id`, `price`, `unit`, `old_price`, `image`, `warehouse_id`, `number_of_inventory`, `createdAt`, `updatedAt`) VALUES
(1, 'Tip Topp GUT - Chế phẩm hỗ trợ tiêu hóa cho tôm cá', 'TipTopp GUT là probiotic chất lượng cao, được thiết kế đặc biệt để tối ưu hóa sức khỏe của cá và tôm, mang lại những lợi ích đáng chú ý: Hỗ trợ tiêu hóa thức ăn; Giảm FCR; Ức chế vi khuẩn gây bệnh; Hỗ trợ phân hủy phân; Tăng tốc độ tăng trưởng; Tăng tỷ lệ sống sót; Tăng cường sức khỏe và miễn dịch; Cải thiện sức khỏe đường ruột.', 1, 1, 430400.00, 0, 538000.00, 'https://tepbac.com//upload/product/ge_image/2025/01/1_1736248887.png', 1, 100, '2025-06-07 00:00:00', '2025-06-07 00:00:00'),
(2, 'Máy đo Kiềm HI755', 'Máy đo HI755 bao gồm 1 chai thuốc thử HI755S cho 25 lần đo, 2 cuvet đựng mẫu có nắp và hộp đựng nhựa tiện lợi, chắc chắn. Một nút bấm duy nhất cho phép đo nhanh và đơn giản chỉ với 10mL mẫu và thuốc thử đi kèm. Thiết kế nhỏ gọn, chi phí thấp nhưng độ chính xác cao.', 1, 1, 1463900.00, 0, 1722235.29, 'https://tepbac.com//upload/product/ge_image/2023/07/1hi755-checkerhc_front-1275x12_1690777976.jpg', 1, 50, '2025-06-07 00:00:00', '2025-06-07 00:00:00'),
(3, 'Máy đo Photphat HI774', 'HI774 được thiết kế để xác định hàm lượng alkalinity trong bể cá nước mặn và ứng dụng sinh học biển. Rất dễ sử dụng với thiết kế chỉ 1 nút bấm, màn hình LCD lớn dễ đọc và tính năng tự động tắt đảm bảo pin không bị cạn kiệt.', 1, 1, 1463900.00, 0, 1722235.29, 'https://tepbac.com//upload/product/ge_image/2023/11/hi774-front_1690542153_1700728451.webp', 1, 340, '2025-06-07 00:00:00', '2025-06-07 00:00:00'),
(4, 'Anti SLIME R.E.P Biotech - Chế phẩm xử lý nhớt bạt và nhớt nước', 'Anti SLIME R.E.P Biotech là chế phẩm sinh học gồm nhiều chủng vi sinh, nấm men và enzyme với hoạt lực mạnh. Chuyên xử lý nhớt bạt, nhớt nước và phân huỷ các chất hữu cơ lơ lửng trong nước như chất thải của tôm, thức ăn dư thừa, giúp cải thiện chất lượng nước nuôi trồng thủy sản.', 1, 1, 330400.00, 0, 413000.00, 'https://tepbac.com//upload/product/ge_image/2024/02/thiet-ke-chua-co-ten-8_1707121055.png', 1, 99, '2025-06-07 00:00:00', '2025-06-07 00:00:00'),
(5, 'Men vi sinh NOVA-BACCI khống chế bệnh phân trắng - Hộp 500g', 'Men vi sinh NOVA-BACCI là men vi sinh chịu kháng sinh cao cấp, giúp nong to đường ruột, tăng hấp thụ và chuyển hóa thức ăn khi sử dụng kháng sinh. Sản phẩm tái tạo nhung mao ruột cho tôm cá bị bệnh đường ruột, phòng nhiễm khuẩn, viêm ruột, sưng chướng bụng, khống chế bệnh phân trắng và giảm lượng phân thải, giảm FCR.', 1, 1, 60000.00, 0, 120000.00, 'https://tepbac.com//upload/product/ge_image/2023/11/2459_1683777418_1700715060.webp', 1, 90, '2025-06-07 00:00:00', '2025-06-07 00:00:00'),
(6, 'Khoáng nước MCP diges bổ sung trực tiếp cho tôm', 'Khoáng hòa tan dạng dung dịch màu xanh, dễ hấp thụ qua đường tiêu hóa tôm. Bổ sung các khoáng chất cần thiết trực tiếp qua đường tiêu hóa, giúp tôm nuôi hấp thụ nhanh đảm bảo cho quá trình lột xác và phát triển, đồng thời phòng trị bệnh cong thân, mềm vỏ do thiếu khoáng.', 1, 1, 192000.00, 0, 240000.00, 'https://tepbac.com//upload/product/ge_image/2022/12/mcp_1670999069.png', 1, 80, '2025-06-07 00:00:00', '2025-06-07 00:00:00'),
(7, 'Thức ăn Tôm May – Mảnh ghép thành công', 'Cung cấp protein, vitamin, khoáng chất thiết yếu, hỗ trợ tôm phát triển khỏe mạnh và giảm hao hụt.', 2, 1, 324700.00, 0, 382000.00, 'https://tepbac.com//upload/product/ge_image/2024/03/m1_1709629979.png', 1, 123, '2025-06-07 00:00:00', '2025-06-07 00:00:00'),
(8, 'Premix vitamin Nutri C cung cấp vitamin C cho tôm cá - Gói 1kg', 'Pha trộn thức ăn, giúp tăng miễn dịch và chống oxy hóa cho tôm cá.', 4, 1, 108500.00, 0, 217000.00, 'https://tepbac.com//upload/product/ge_image/2023/11/2227_5_1682062387_1700728156.webp', 1, 321, '2025-06-07 00:00:00', '2025-06-07 00:00:00'),
(9, 'NOVA-COLOR B tạo màu trà, ngăn chặn sự phát triển của tảo đáy', 'Điều chỉnh màu nước ao, ổn định hệ sinh thái và ức chế tảo đáy phát triển.', 3, 1, 352000.00, 0, 440000.00, 'https://tepbac.com//upload/product/ge_image/2024/11/nova-colorb_1681988484-1_1730966477.png', 1, 777, '2025-06-07 00:00:00', '2025-06-07 00:00:00'),
(10, 'Vi sinh Bio Bactil giúp ổn định đường ruột tôm cá - Lon 500g', 'Chứa chủng vi sinh có lợi, cân bằng hệ vi sinh đường ruột, cải thiện hấp thu và phòng bệnh tiêu hóa.', 4, 1, 180000.00, 0, 360000.00, 'https://tepbac.com//upload/product/ge_image/2023/11/13_1698309721_1700722641.webp', 1, 999, '2025-06-07 00:00:00', '2025-06-07 00:00:00'),
(11, 'Vitamin C Antistress (1kg)', 'Bổ sung Vitamin C giúp tôm cá tăng sức đề kháng, giảm stress khi thay đổi môi trường hoặc vận chuyển.', 4, 1, 95500.00, 0, 100000.00, 'https://web-api.vemedim.vn/vmd-web-mediafile/file/ee3a2230-9cdf-449e-bb4c-5c90f9a239ec?size=720', 1, 888, '2025-06-07 00:00:00', '2025-06-07 00:00:00'),
(12, 'PREBIO hỗ trợ phòng ngừa các vấn đề ở gan tôm', 'Giúp dự phòng bệnh gan – tụy ở tôm, phù hợp giai đoạn nuôi dài ngày.', 1, 1, 375000.00, 0, NULL, 'https://tepbac.com//upload/product/ge_image/2024/02/thanh-phan-trong-1_1709024611.webp', 1, 100, '2025-06-12 20:54:16', '2025-06-12 20:54:16'),
(13, 'TS 111 – Đại bổ siêu tăng trọng cho tôm cá', 'Tăng cường chất dinh dưỡng, hỗ trợ tăng trọng nhanh cho tôm và cá.', 1, 1, 225750.00, 0, NULL, 'http://truongsinhgialai.com/uploads/product/27-ts-111---dai-bo-sieu-tang-trong-thuoc-thuy-san.jpg.webp', 1, 100, '2025-06-12 20:54:16', '2025-06-12 20:54:16'),
(14, 'MEN MK – Chuyên gia cắt tảo', 'Chế phẩm enzyme/vi sinh chuyên xử lý tảo, giúp duy trì môi trường ao nuôi ổn định.', 1, 1, 375000.00, 0, NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUcl3arRwupwX_IYcKHJeoc8fcdwWWnLz7kw&s', 1, 100, '2025-06-12 20:54:16', '2025-06-12 20:54:16'),
(15, 'BET‑TO‑GANE – Cải thiện sưng gan mật', 'Hỗ trợ giải quyết tình trạng gan mật, giúp tôm khỏe mạnh hơn.', 1, 1, 469350.00, 0, NULL, 'https://tepbac.com//upload/product/ge_image/2021/09/bet-to-gane_1631000904.webp', 1, 100, '2025-06-12 20:54:16', '2025-06-12 20:54:16'),
(16, 'Procozoll – Enzyme xử lý nước ao nuôi', 'Sản phẩm enzyme giúp làm sạch nước, cải thiện môi trường ao nuôi.', 1, 1, 190000.00, 0, NULL, 'https://thainamviet.com/wp-content/uploads/2022/08/Procozoll-1Lit.png', 1, 100, '2025-06-12 20:54:16', '2025-06-12 20:54:16'),
(17, 'Nano EGCG (Tôm xanh) – Tăng miễn dịch, giảm căng thẳng', 'Chữa stress cho tôm, tăng sức đề kháng tự nhiên.', 1, 1, 1150000.00, 0, NULL, 'https://tepbac.com//upload/product/ge_image/2023/10/nano-egcg_1697691618.png', 1, 100, '2025-06-12 20:54:16', '2025-06-12 20:54:16');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_comment`
--

DROP TABLE IF EXISTS `product_comment`;
CREATE TABLE IF NOT EXISTS `product_comment` (
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  UNIQUE KEY `unique_product_user_comment` (`product_id`,`user_id`,`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `comment_id` (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `product_comment`
--

INSERT INTO `product_comment` (`product_id`, `user_id`, `comment_id`, `createdAt`, `updatedAt`) VALUES
(10, 7, 3, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(3, 8, 1, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(4, 5, 9, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(7, 9, 5, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(8, 10, 9, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(10, 3, 3, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(5, 5, 6, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(2, 4, 5, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(6, 1, 8, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(3, 5, 9, '2025-06-11 17:33:08', '2025-06-11 17:33:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotion`
--

DROP TABLE IF EXISTS `promotion`;
CREATE TABLE IF NOT EXISTS `promotion` (
  `promotion_id` int NOT NULL AUTO_INCREMENT,
  `promotion_name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `promotion_code` varchar(255) NOT NULL,
  `promotion_price` decimal(10,2) NOT NULL,
  `promotion_created_date` datetime NOT NULL,
  `promotion_expired_date` datetime NOT NULL,
  `promotion_condition` varchar(255) NOT NULL,
  `promotion_quantity` int NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`promotion_id`),
  UNIQUE KEY `promotion_code` (`promotion_code`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `promotion`
--

INSERT INTO `promotion` (`promotion_id`, `promotion_name`, `description`, `promotion_code`, `promotion_price`, `promotion_created_date`, `promotion_expired_date`, `promotion_condition`, `promotion_quantity`, `createdAt`, `updatedAt`) VALUES
(1, 'Giam gia Electronic Plastic Chips', 'Verto vicinus curatio pecto necessitatibus adfectus denuo.', '6XYCAJKEOU', 201028.00, '2024-08-21 00:00:00', '2025-07-03 00:00:00', 'Tripudio subseco aliquam amet vehemens illo.', 33, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(2, 'Giam gia Frozen Silk Hat', 'Truculenter suasoria expedita attollo.', 'YVEVAFPO8S', 181423.00, '2024-07-08 00:00:00', '2026-01-30 00:00:00', 'Bene convoco venia veritas spiritus quaerat spiculum consuasor aptus demonstro.', 95, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(3, 'Giam gia Practical Gold Table', 'Architecto triduana truculenter viscus depono carus triumphus ter.', 'GLNURTV4HE', 57817.00, '2024-07-23 00:00:00', '2026-01-21 00:00:00', 'Adnuo ceno sublime.', 64, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(4, 'Giam gia Gorgeous Ceramic Pants', 'Suasoria vulgivagus sustineo atrocitas annus timidus vinitor.', 'CPENINYNGR', 416680.00, '2024-07-07 00:00:00', '2025-07-13 00:00:00', 'Arx armarium colligo admitto torrens.', 39, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(5, 'Giam gia Awesome Plastic Mouse', 'Capillus adeo calco vorax stipes.', 'KTMKMKZJI9', 392895.00, '2025-02-14 00:00:00', '2025-11-18 00:00:00', 'Copiose cupiditas beatus aegre vestigium deprecator.', 99, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(6, 'Giam gia Tasty Bronze Salad', 'Atque carmen trans voluptatum tenax bellum similique voluntarius curso claro.', 'H5PFOC59N6', 13425.00, '2024-06-12 00:00:00', '2025-06-19 00:00:00', 'Cimentarius demulceo decimus tibi depono conatus paulatim templum benigne.', 100, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(7, 'Giam gia Luxurious Marble Pants', 'Conduco ad degero ait velit.', 'TRVQFBSXB3', 428932.00, '2024-07-26 00:00:00', '2025-06-27 00:00:00', 'Decet tricesimus cado.', 85, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(8, 'Giam gia Ergonomic Plastic Cheese', 'Cado voluptate deporto patria defungo desipio.', 'ZCILPW0U7N', 448646.00, '2024-08-29 00:00:00', '2026-02-12 00:00:00', 'Barba depromo undique conculco beatus sopor nihil valde tenetur facilis.', 61, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(9, 'Giam gia Sleek Cotton Bike', 'Audentia corroboro conicio acies maiores.', 'UTP9JXVIKR', 169492.00, '2024-11-15 00:00:00', '2025-10-16 00:00:00', 'Ab occaecati suppono fugit suasoria laboriosam communis terra.', 26, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(10, 'Giam gia Small Metal Shirt', 'Timidus una advoco.', 'EOLIKJQP08', 151591.00, '2025-02-21 00:00:00', '2025-06-13 00:00:00', 'Synagoga socius verbera crudelis enim decet libero capio aetas.', 82, '2025-06-11 17:33:08', '2025-06-11 17:33:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` enum('admin','user','admin_agency') NOT NULL,
  `agency_rank_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`role_id`),
  KEY `agency_rank_id` (`agency_rank_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`role_id`, `role_name`, `agency_rank_id`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', NULL, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(2, 'user', NULL, '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(3, 'admin_agency', NULL, '2025-06-11 17:33:08', '2025-06-11 17:33:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20250601173223-create-agency-rank.js'),
('20250601174017-create-role.js'),
('20250602164821-create-user.js'),
('20250602170704-create-orders.js'),
('20250602170725-create-agency-point-log.js'),
('20250602171849-create-promotion.js'),
('20250602171908-create-orders-item.js'),
('20250603151633-create-categories.js'),
('20250603151636-create-products.js'),
('20250603151718-create-comment.js'),
('20250603151729-create-product-comment.js'),
('20250603162338-create-warehouse.js'),
('20250603162351-create-agency.js'),
('20250603162926-create-foreignkey-products.js'),
('20250603164155-create-foreignkey-orders-item.js'),
('20250603164429-create-foreignkey-orders.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role_id` int NOT NULL DEFAULT '2',
  `agency_rank_id` int DEFAULT NULL,
  `resources` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  KEY `agency_rank_id` (`agency_rank_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `first_name`, `last_name`, `email`, `password`, `phone`, `address`, `role_id`, `agency_rank_id`, `resources`, `createdAt`, `updatedAt`) VALUES
(1, 'jacynthe_mayert', 'Reyes', 'Bayer', 'Cornell96@yahoo.com', '$2b$10$OXyi89oZ/kb4dqp0q0QQX.kDWRf0sRpIII1WH4sSFyg2XpdzALQ6u', '489.943.3261 x58942', '7302 Walnut Street', 1, NULL, '{\"canEdit\": true, \"canView\": true, \"agency_id\": 8, \"isSuperAdmin\": false, \"warehouse_id\": 3}', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(2, 'eugene_kulas-vonrueden', 'Vidal', 'Williamson', 'Birdie_Christiansen97@yahoo.com', '$2b$10$OXyi89oZ/kb4dqp0q0QQX.kDWRf0sRpIII1WH4sSFyg2XpdzALQ6u', '(670) 257-9718', '88959 O\'Hara Cove', 1, NULL, '{\"canEdit\": true, \"canView\": true, \"agency_id\": 1, \"isSuperAdmin\": false, \"warehouse_id\": 3}', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(3, 'ashlee_price', 'Isadore', 'Schuster', 'Nigel_Greenholt@yahoo.com', '$2b$10$OXyi89oZ/kb4dqp0q0QQX.kDWRf0sRpIII1WH4sSFyg2XpdzALQ6u', '1-488-775-4149', '27637 Missouri Club', 2, NULL, '{\"canEdit\": true, \"canView\": true, \"agency_id\": 10, \"isSuperAdmin\": false, \"warehouse_id\": 9}', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(4, 'sabrina_quigley', 'Marina', 'Kuhlman', 'Clarissa.Balistreri@hotmail.com', '$2b$10$OXyi89oZ/kb4dqp0q0QQX.kDWRf0sRpIII1WH4sSFyg2XpdzALQ6u', '263.735.6118 x5765', '81026 Sauer Canyon', 3, NULL, '{\"canEdit\": true, \"canView\": true, \"agency_id\": 1, \"isSuperAdmin\": false, \"warehouse_id\": 1}', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(5, 'gilberto_veum', 'Nella', 'Reinger', 'Jayden.Stiedemann@hotmail.com', '$2b$10$OXyi89oZ/kb4dqp0q0QQX.kDWRf0sRpIII1WH4sSFyg2XpdzALQ6u', '(214) 259-5440 x7449', '8900 Marisa Forges', 2, NULL, '{\"canEdit\": true, \"canView\": true, \"agency_id\": 7, \"isSuperAdmin\": false, \"warehouse_id\": 6}', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(6, 'olaf_kassulke', 'Kelton', 'White', 'Providenci40@yahoo.com', '$2b$10$OXyi89oZ/kb4dqp0q0QQX.kDWRf0sRpIII1WH4sSFyg2XpdzALQ6u', '457.972.1102 x69120', '577 Heathcote Inlet', 2, NULL, '{\"canEdit\": true, \"canView\": true, \"agency_id\": 4, \"isSuperAdmin\": false, \"warehouse_id\": 1}', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(7, 'lue_stiedemann', 'Deven', 'Ryan', 'Krystal.Terry78@gmail.com', '$2b$10$OXyi89oZ/kb4dqp0q0QQX.kDWRf0sRpIII1WH4sSFyg2XpdzALQ6u', '(371) 455-5445 x3202', '442 Jasen Rapids', 3, NULL, '{\"canEdit\": true, \"canView\": true, \"agency_id\": 10, \"isSuperAdmin\": false, \"warehouse_id\": 2}', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(8, 'maverick_bernier', 'Rebeka', 'Dicki', 'Torey28@gmail.com', '$2b$10$OXyi89oZ/kb4dqp0q0QQX.kDWRf0sRpIII1WH4sSFyg2XpdzALQ6u', '369.321.8044 x48797', '87007 Woodland Close', 1, NULL, '{\"canEdit\": true, \"canView\": true, \"agency_id\": 1, \"isSuperAdmin\": false, \"warehouse_id\": 10}', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(9, 'tia_streich', 'Princess', 'Rau', 'Kallie.Gibson75@gmail.com', '$2b$10$OXyi89oZ/kb4dqp0q0QQX.kDWRf0sRpIII1WH4sSFyg2XpdzALQ6u', '635.233.6943 x3381', '1059 Ellis Pass', 2, NULL, '{\"canEdit\": true, \"canView\": true, \"agency_id\": 3, \"isSuperAdmin\": false, \"warehouse_id\": 7}', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(10, 'marisa_gibson', 'Keira', 'Brekke', 'Quinn86@yahoo.com', '$2b$10$OXyi89oZ/kb4dqp0q0QQX.kDWRf0sRpIII1WH4sSFyg2XpdzALQ6u', '622-856-3157 x770', '646 Auer Valley', 2, NULL, '{\"canEdit\": true, \"canView\": true, \"agency_id\": 3, \"isSuperAdmin\": false, \"warehouse_id\": 3}', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(11, 'kyle123', 'Kyle', 'Lee', 'kyleadmin@gmail.com', '$2b$10$j.bO1/DkL3LbmlcZASuuFOKJS4gLRBUSOxX8TeD6uDOWifJ8lN7aC', '566-554-5980 x84856', '4247 2nd Avenue', 1, NULL, '{\"canEdit\": true, \"canView\": true, \"agency_id\": null, \"isSuperAdmin\": true, \"warehouse_id\": null}', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(12, 'nametran123', 'Nam', 'Tran', 'namtran123@gmail.com', '$2b$10$j.bO1/DkL3LbmlcZASuuFOKJS4gLRBUSOxX8TeD6uDOWifJ8lN7aC', '798-843-8386 x90450', '2485 Third Avenue', 1, NULL, '{\"canEdit\": true, \"canView\": true, \"agency_id\": null, \"isSuperAdmin\": true, \"warehouse_id\": null}', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(13, 'kyle321', 'Kyle', 'Lee', 'kyleadminwarehouse@gmail.com', '$2b$10$j.bO1/DkL3LbmlcZASuuFOKJS4gLRBUSOxX8TeD6uDOWifJ8lN7aC', '1-388-878-5781 x96400', '94803 Chester Road', 3, NULL, '{\"canEdit\": true, \"canView\": true, \"agency_id\": 4, \"isSuperAdmin\": false, \"warehouse_id\": 8}', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(14, 'nametran321', 'Nam', 'Tran', 'namtran321@gmail.com', '$2b$10$j.bO1/DkL3LbmlcZASuuFOKJS4gLRBUSOxX8TeD6uDOWifJ8lN7aC', '1-804-775-6263 x99012', '7559 Haag Common', 3, NULL, '{\"canEdit\": true, \"canView\": true, \"agency_id\": 4, \"isSuperAdmin\": false, \"warehouse_id\": 10}', '2025-06-11 17:33:08', '2025-06-11 17:33:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `warehouse`
--

DROP TABLE IF EXISTS `warehouse`;
CREATE TABLE IF NOT EXISTS `warehouse` (
  `warehouse_id` int NOT NULL AUTO_INCREMENT,
  `warehouse_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`warehouse_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `warehouse`
--

INSERT INTO `warehouse` (`warehouse_id`, `warehouse_name`, `address`, `phone_number`, `createdAt`, `updatedAt`) VALUES
(1, 'TYCZQT', '208 Meadow Way', '(215) 969-7366', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(2, 'SCMMSJ', '450 W Main', '1-396-595-8958 x115', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(3, 'XDGJDG', '58782 E Washington Avenue', '1-949-311-0753 x16650', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(4, 'AHHBJP', '96253 Witting Valley', '471-586-7760 x853', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(5, 'KGMZPJ', '89718 Herzog Manor', '1-861-639-4939 x1799', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(6, 'WWBSVN', '15882 S Main Avenue', '981-338-1906 x0528', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(7, 'SRMCCS', '2170 Luisa Mills', '1-753-399-5247 x6507', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(8, 'FMNMGM', '34741 Imani Pine', '(581) 366-8352', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(9, 'PUWVMG', '488 Erich River', '(822) 408-4005 x05392', '2025-06-11 17:33:08', '2025-06-11 17:33:08'),
(10, 'BSPWQW', '40750 Lindgren Green', '828.216.7854', '2025-06-11 17:33:08', '2025-06-11 17:33:08');

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `agency_point_log`
--
ALTER TABLE `agency_point_log`
  ADD CONSTRAINT `agency_point_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `agency_point_log_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`promotion_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `orders_item`
--
ALTER TABLE `orders_item`
  ADD CONSTRAINT `orders_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_item_ibfk_3` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`warehouse_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`warehouse_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`agency_id`) REFERENCES `agency` (`agency_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_comment`
--
ALTER TABLE `product_comment`
  ADD CONSTRAINT `product_comment_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_comment_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `role`
--
ALTER TABLE `role`
  ADD CONSTRAINT `role_ibfk_1` FOREIGN KEY (`agency_rank_id`) REFERENCES `agency_rank` (`agency_rank_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`agency_rank_id`) REFERENCES `agency_rank` (`agency_rank_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
