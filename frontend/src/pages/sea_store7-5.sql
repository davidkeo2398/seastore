-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th7 05, 2025 lúc 04:38 PM
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
(1, 'Leffler, Wilkinson and Larkin', '39738 Bernhard Route', 0, 4104791, 2790757, '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(2, 'Okuneva Inc', '61611 Adolph Club', 952, 2265985, 4290413, '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(3, 'Borer - Hagenes', '69302 S West Street', 0, 1616816, 3849540, '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(4, 'Rau LLC', '7858 Ignacio Court', 0, 2609739, 3394753, '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(5, 'Oberbrunner - Medhurst', '8810 Memorial Drive', 1, 3978131, 1332976, '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(6, 'Jacobson Inc', '729 Mueller Motorway', 0, 2808873, 2943099, '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(7, 'Bernier - Connelly', '5321 Katarina Island', 1, 1484368, 1942046, '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(8, 'Ziemann LLC', '8211 Batz Causeway', 781, 4373320, 4028706, '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(9, 'Beatty LLC', '854 Walsh Village', 0, 1406825, 4360241, '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(10, 'Vandervort Group', '634 Kautzer Lakes', 1, 3245495, 1320171, '2025-07-03 17:18:20', '2025-07-03 17:18:20');

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
(1, 'Bronze', 1000000, 10, 'Hạng đồng', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(2, 'Silver', 5000000, 12, 'Hạng bạc', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(3, 'Gold', 10000000, 15, 'Hạng vàng', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(4, 'Platinum', 30000000, 17, 'Hạng platinum', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(5, 'Diamond', 40000000, 20, 'Hạng kim cương', '2025-07-03 17:18:20', '2025-07-03 17:18:20');

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
(1, 'Explicabo repellendus adicio uredo.', '3', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(2, 'Stips admiratio collum at spes.', '2', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(3, 'Tibi adnuo bibo tibi amplexus bonus praesentium.', '2', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(4, 'Brevis officia suffragium.', '1', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(5, 'Confido sunt arbor perspiciatis facere absorbeo.', '3', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(6, 'Cavus confero corpus ademptio venia aro ancilla tergiversatio stipes.', '2', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(7, 'Dignissimos ocer quam conqueror viscus una confero tepidus.', '5', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(8, 'Nesciunt curvo nisi umquam aestus aduro titulus arcus.', '4', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(9, 'Decumbo angelus claro crebro totus arbustum cognomen sublime cultellus.', '5', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(10, 'Cilicium alienus adimpleo tolero sponte voluptates derelinquo claro nemo.', '1', '2025-07-03 17:18:20', '2025-07-03 17:18:20');

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
  `payment_method` enum('cash','paypal','bank_transfer','momo','vnpay') NOT NULL,
  `promotion_code` varchar(255) DEFAULT NULL,
  `status` enum('pending','completed','cancelled') NOT NULL DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `promotion_id` (`promotion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`order_id`, `order_code`, `user_id`, `user_name`, `full_name`, `user_email`, `address_user`, `agency_name`, `address_agency`, `phone_user`, `phone_agency`, `total`, `promotion_id`, `order_date`, `payment_method`, `promotion_code`, `status`, `createdAt`, `updatedAt`) VALUES
(19, '20250704121307256', 12, 'Admin1', '', 'namtran_admin@gmail.com', '', 'Tran Tran', '12345 trần hưng đạo', '', '0337586860', 2927800.00, NULL, '2025-07-04 05:13:07', 'cash', NULL, 'pending', '2025-07-04 05:13:07', '2025-07-04 14:52:57'),
(24, '20250704211348427', 14, 'Agency', '', 'namtran_agency@gmail.com', '', 'Tran Tran', '39 cao lỗ', '', '0337586860', 1317510.00, NULL, '2025-07-04 14:13:48', 'vnpay', NULL, 'completed', '2025-07-04 14:13:48', '2025-07-04 14:15:01'),
(25, '20250704213835530', 14, 'Agency', '', 'namtran_agency@gmail.com', '', 'Tran Tran', '39 cao lỗ', '', '0337586860', 5270040.00, NULL, '2025-07-04 14:38:35', 'cash', NULL, 'completed', '2025-07-04 14:38:35', '2025-07-04 14:38:35'),
(26, '20250704225110901', 12, 'Admin1', '', 'namtran_admin@gmail.com', '', 'Tran Tran', '39 cao lỗ', '', '0337586860', 330400.00, NULL, '2025-07-04 15:51:10', 'vnpay', NULL, 'completed', '2025-07-04 15:51:10', '2025-07-04 15:51:10'),
(27, '20250705135232501', 27, 'Agency2', '', 'namtran_agency2@gmail.com', '', 'Tran Tran', '39 cao lỗ', '', '0337586860', 2628500.00, NULL, '2025-07-05 06:52:32', 'cash', NULL, 'completed', '2025-07-05 06:52:32', '2025-07-05 06:52:32');

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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `orders_item`
--

INSERT INTO `orders_item` (`order_item_id`, `product_id`, `order_id`, `warehouse_id`, `quantity`, `isPaid`, `createdAt`, `updatedAt`) VALUES
(24, 3, 19, NULL, 2, 0, '2025-07-04 05:13:07', '2025-07-04 05:13:07'),
(25, 2, 24, NULL, 1, 0, '2025-07-04 14:13:48', '2025-07-04 14:13:48'),
(26, 2, 25, NULL, 4, 0, '2025-07-04 14:38:35', '2025-07-04 14:38:35'),
(27, 4, 26, NULL, 1, 0, '2025-07-04 15:51:10', '2025-07-04 15:51:10'),
(28, 8, 27, NULL, 1, 0, '2025-07-05 06:52:32', '2025-07-05 06:52:32'),
(29, 13, 27, NULL, 7, 0, '2025-07-05 06:52:32', '2025-07-05 06:52:32');

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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `description`, `category_id`, `agency_id`, `price`, `unit`, `old_price`, `image`, `warehouse_id`, `number_of_inventory`, `createdAt`, `updatedAt`) VALUES
(2, 'Máy đo Kiềm HI755', 'Máy đo HI755 bao gồm 1 chai thuốc thử HI755S cho 25 lần đo, 2 cuvet đựng mẫu có nắp và hộp đựng nhựa tiện lợi, chắc chắn. Một nút bấm duy nhất cho phép đo nhanh và đơn giản chỉ với 10mL mẫu và thuốc thử đi kèm. Thiết kế nhỏ gọn, chi phí thấp nhưng độ chính xác cao.', 1, 1, 1463900.00, 0, 1722235.29, 'https://tepbac.com//upload/product/ge_image/2023/07/1hi755-checkerhc_front-1275x12_1690777976.jpg', 1, 45, '2025-06-07 00:00:00', '2025-07-04 14:38:35'),
(3, 'Máy đo Photphat HI774', 'HI774 được thiết kế để xác định hàm lượng alkalinity trong bể cá nước mặn và ứng dụng sinh học biển. Rất dễ sử dụng với thiết kế chỉ 1 nút bấm, màn hình LCD lớn dễ đọc và tính năng tự động tắt đảm bảo pin không bị cạn kiệt.', 1, 1, 1463900.00, 0, 1722235.29, 'https://tepbac.com//upload/product/ge_image/2023/11/hi774-front_1690542153_1700728451.webp', 1, 337, '2025-06-07 00:00:00', '2025-07-04 05:13:07'),
(4, 'Anti SLIME R.E.P Biotech - Chế phẩm xử lý nhớt bạt và nhớt nước', 'Anti SLIME R.E.P Biotech là chế phẩm sinh học gồm nhiều chủng vi sinh, nấm men và enzyme với hoạt lực mạnh. Chuyên xử lý nhớt bạt, nhớt nước và phân huỷ các chất hữu cơ lơ lửng trong nước như chất thải của tôm, thức ăn dư thừa, giúp cải thiện chất lượng nước nuôi trồng thủy sản.', 1, 1, 330400.00, 0, 413000.00, 'https://tepbac.com//upload/product/ge_image/2024/02/thiet-ke-chua-co-ten-8_1707121055.png', 1, 97, '2025-06-07 00:00:00', '2025-07-04 15:51:10'),
(5, 'Men vi sinh NOVA-BACCI khống chế bệnh phân trắng - Hộp 500g', 'Men vi sinh NOVA-BACCI là men vi sinh chịu kháng sinh cao cấp, giúp nong to đường ruột, tăng hấp thụ và chuyển hóa thức ăn khi sử dụng kháng sinh. Sản phẩm tái tạo nhung mao ruột cho tôm cá bị bệnh đường ruột, phòng nhiễm khuẩn, viêm ruột, sưng chướng bụng, khống chế bệnh phân trắng và giảm lượng phân thải, giảm FCR.', 1, 1, 60000.00, 0, 120000.00, 'https://tepbac.com//upload/product/ge_image/2023/11/2459_1683777418_1700715060.webp', 1, 90, '2025-06-07 00:00:00', '2025-06-07 00:00:00'),
(6, 'Khoáng nước MCP diges bổ sung trực tiếp cho tôm', 'Khoáng hòa tan dạng dung dịch màu xanh, dễ hấp thụ qua đường tiêu hóa tôm. Bổ sung các khoáng chất cần thiết trực tiếp qua đường tiêu hóa, giúp tôm nuôi hấp thụ nhanh đảm bảo cho quá trình lột xác và phát triển, đồng thời phòng trị bệnh cong thân, mềm vỏ do thiếu khoáng.', 1, 1, 192000.00, 0, 240000.00, 'https://tepbac.com//upload/product/ge_image/2022/12/mcp_1670999069.png', 1, 80, '2025-06-07 00:00:00', '2025-06-07 00:00:00'),
(7, 'Thức ăn Tôm May – Mảnh ghép thành công', 'Cung cấp protein, vitamin, khoáng chất thiết yếu, hỗ trợ tôm phát triển khỏe mạnh và giảm hao hụt.', 2, 1, 324700.00, 0, 382000.00, 'https://tepbac.com//upload/product/ge_image/2024/03/m1_1709629979.png', 1, 120, '2025-06-07 00:00:00', '2025-07-04 03:34:48'),
(8, 'Premix vitamin Nutri C cung cấp vitamin C cho tôm cá - Gói 1kg', 'Pha trộn thức ăn, giúp tăng miễn dịch và chống oxy hóa cho tôm cá.', 4, 1, 108500.00, 0, 217000.00, 'https://tepbac.com//upload/product/ge_image/2023/11/2227_5_1682062387_1700728156.webp', 1, 320, '2025-06-07 00:00:00', '2025-07-05 06:52:32'),
(9, 'NOVA-COLOR B tạo màu trà, ngăn chặn sự phát triển của tảo đáy', 'Điều chỉnh màu nước ao, ổn định hệ sinh thái và ức chế tảo đáy phát triển.', 3, 1, 352000.00, 0, 440000.00, 'https://tepbac.com//upload/product/ge_image/2024/11/nova-colorb_1681988484-1_1730966477.png', 1, 777, '2025-06-07 00:00:00', '2025-06-07 00:00:00'),
(10, 'Vi sinh Bio Bactil giúp ổn định đường ruột tôm cá - Lon 500g', 'Chứa chủng vi sinh có lợi, cân bằng hệ vi sinh đường ruột, cải thiện hấp thu và phòng bệnh tiêu hóa.', 4, 1, 180000.00, 0, 360000.00, 'https://tepbac.com//upload/product/ge_image/2023/11/13_1698309721_1700722641.webp', 1, 994, '2025-06-07 00:00:00', '2025-07-03 17:20:13'),
(11, 'Vitamin C Antistress (1kg)', 'Bổ sung Vitamin C giúp tôm cá tăng sức đề kháng, giảm stress khi thay đổi môi trường hoặc vận chuyển.', 4, 1, 95500.00, 0, 100000.00, 'https://web-api.vemedim.vn/vmd-web-mediafile/file/ee3a2230-9cdf-449e-bb4c-5c90f9a239ec?size=720', 1, 888, '2025-06-07 00:00:00', '2025-06-07 00:00:00'),
(12, 'Vi sinh EPondPlus', 'Ngăn ngừa khí độc NH3, H2S, NO2; phòng bệnh EMS và gan tụy; tăng màu tảo silic.', 3, 1, 320000.00, 0, 390000.00, 'https://product.hstatic.net/200000891199/product/proquatic_pondplus31_2e31fbeeef064ebfb36222d8d7a12e6d.jpg', 1, 100, '2025-07-04 22:11:24', '2025-07-04 22:11:24'),
(13, 'Men vi sinh TEX PRO CB LIQUID (5 lít)', 'Bổ sung vi sinh Bacillus, hỗ trợ tiêu hóa, ổn định môi trường ao, giảm FCR.', 3, 1, 360000.00, 0, 450000.00, 'https://khoahocxanh.com/wp-content/uploads/2021/05/TEX-PRO-CB-LIQUID.png', 1, 143, '2025-07-04 22:11:24', '2025-07-05 06:52:32'),
(14, 'Vi sinh IBAC', 'Xử lý phèn, làm sạch đáy ao, xử lý mùn hữu cơ, ngăn xì phèn đáy ao.', 3, 1, 280000.00, 0, 330000.00, 'https://tepbac.com//upload/product/ge_image/2023/07/6_1689610663.png', 1, 120, '2025-07-04 22:11:24', '2025-07-04 22:11:24'),
(15, 'Vitamin C 99%', 'Chống sốc, giảm stress, tăng sức kháng cho tôm, dạng bột 25 kg.', 4, 1, 108500.00, 0, 0.00, 'https://hoachattruongphu.com/image/catalog/185x185/Vitamin%20C%20l%C3%A0%20gi%20-%20Tr%C6%B0%E1%BB%9Dng%20Ph%C3%BA%20Chemical.png', 1, 50, '2025-07-04 22:11:24', '2025-07-04 22:11:24'),
(16, 'PONDTOSS™ (men vi sinh)', 'Xử lý môi trường nuôi thủy sản, giảm khí độc, cải thiện chất lượng nước.', 3, 1, 360000.00, 0, 0.00, 'https://tepbac.com//upload/product/ge_image/2024/07/keeton_1722426855.png', 1, 80, '2025-07-04 22:11:24', '2025-07-04 22:11:24'),
(17, 'BEST GROW – Tăng trưởng nhanh', 'Hỗ trợ gan khỏe mạnh và tăng trưởng nhanh cho thủy sản.', 4, 1, 200000.00, 0, 0.00, 'https://tepbac.com//upload/product/ge_image/2023/11/best-grow_1700554986.webp', 1, 70, '2025-07-04 22:11:24', '2025-07-04 22:11:24'),
(18, 'QUILLAJA YUCCA', 'Giảm phèn, khử độc NH3, NO2; cải thiện môi trường nước ao nuôi.', 3, 1, 195000.00, 0, 0.00, 'https://tomviet.com/wp-content/uploads/2020/09/Quillaja-Yuca-Ep-Nhu-Do.png', 1, 90, '2025-07-04 22:11:24', '2025-07-04 22:11:24'),
(19, 'Zeofish – Zeolite vi sinh', 'Zeolite hạt vi sinh, hỗ trợ xử lý nước ao cho cá, cải thiện hệ môi trường.', 3, 1, 122000.00, 0, 0.00, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyxikejb8hpdd0', 1, 110, '2025-07-04 22:11:24', '2025-07-04 22:11:24'),
(21, 'Chế phẩm NB‑25', 'Xử lý nước ao nuôi tôm, giảm khí độc và cải thiện chất lượng nước.', 3, 1, 190000.00, 0, 0.00, 'https://anova.com.vn/Data/Sites/1/News/1628/nova-nb-25-(tom).jpg', 1, 130, '2025-07-04 22:11:24', '2025-07-04 22:11:24'),
(22, 'PIO NUS đặc trị EHP & phân trắng', 'Ức chế EHP, phục hồi gan tụy và cải thiện đường ruột trên tôm', 4, 1, 265000.00, 0, 320000.00, 'https://tepbac.com//upload/product/ge_image/2024/07/pio-nus_1719818643_1719820681.jpg', 1, 100, '2025-07-04 22:11:54', '2025-07-04 22:11:54'),
(23, 'Men vi sinh BACILLUS LICHENIFORMIS 25kg', 'Giảm khí độc, cải thiện màu nước và hỗ trợ tiêu hóa', 3, 1, 1800000.00, 0, 2000000.00, 'https://aquavet.vn/uploads/product/2025_04/bacillus-lichenifomis_2.png', 1, 150, '2025-07-04 22:11:54', '2025-07-04 22:11:54'),
(24, 'AOCARE Probiotics 200g', 'Vi sinh xử lý nước, khử ammonia/nitrite/nitrate và bùn đáy', 3, 1, 135000.00, 0, 165000.00, 'https://tepbac.com//upload/product/ge_image/2021/09/aocare_1631870830.webp', 1, 120, '2025-07-04 22:11:54', '2025-07-04 22:11:54'),
(25, 'GUT‑PRO men đường ruột 500g', 'Hỗ trợ tiêu hóa, bảo vệ ruột tôm/cá, tránh dư thừa thức ăn', 3, 1, 165000.00, 0, 198000.00, 'https://tepbac.com//upload/product/ge_image/2023/11/gut-pro_1_1682389101_1700724627.webp', 1, 130, '2025-07-04 22:11:54', '2025-07-04 22:11:54'),
(26, 'Kenzym Pro men tiêu hóa 1kg', 'Bổ sung enzyme, phòng ngừa chướng hơi, sình bụng cho thủy sản', 3, 1, 270000.00, 0, 330000.00, 'https://sundovietnam.com/wp-content/uploads/2020/11/ENZYME-PRO-1-400x400.jpg', 1, 110, '2025-07-04 22:11:54', '2025-07-04 22:11:54'),
(27, 'Mipe men tiêu hóa thủy sản', 'Men vi sinh 3‑trong‑1: nở ruột, chắc thịt, lớn nhanh', 3, 1, 190000.00, 0, 240000.00, 'https://vftgroup.vn/wp-content/uploads/2023/09/Men-vi-sinh-mipe-cong-dung.webp', 1, 90, '2025-07-04 22:11:54', '2025-07-04 22:11:54'),
(28, 'Vi sinh BACILLUS PUMILUS 5×10⁹ CFU/g', 'Xử lý nước, hỗ trợ tiêu hóa và hệ ruột tôm/cá', 3, 1, 320000.00, 0, 380000.00, 'https://thientue.net.vn/wp-content/uploads/2024/02/bacillus-pumilus.webp', 1, 100, '2025-07-04 22:11:54', '2025-07-04 22:11:54'),
(29, 'LACTOBACILLUS ACIDOPHILUS 10BN', 'Men đường ruột, tăng enzyme tiêu hóa và miễn dịch', 3, 1, 110000.00, 0, 145000.00, 'https://cdn.xaxi.vn/tpcn/img/nutricost-lactobacillus-acidophilus-10-billion-cfu-120-capsules-129049-702669934565.jpg', 1, 80, '2025-07-04 22:11:54', '2025-07-04 22:11:54'),
(30, 'SIVIBAC Plus xử lý đáy ao', 'Vi sinh xử lý đáy, cân bằng môi trường nước ao nuôi', 3, 1, 290000.00, 0, 350000.00, 'https://tepbac.com//upload/product/ge_image/2023/10/8_1698294956.png', 1, 110, '2025-07-04 22:11:54', '2025-07-04 22:11:54'),
(31, 'NEOPLUS men đường ruột 25kg', 'Lợi khuẩn đường ruột, cải thiện pH và tăng đề kháng', 3, 1, 1950000.00, 0, 2200000.00, 'https://tepbac.com//upload/product/ge_image/2024/09/cat-hinh-14-308x462_1727167341_1727240577.png', 1, 0, '2025-07-04 22:11:54', '2025-07-04 22:11:54');

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
  `promotion_percent` int NOT NULL DEFAULT '5',
  `promotion_created_date` datetime NOT NULL,
  `promotion_expired_date` datetime NOT NULL,
  `promotion_condition` varchar(255) NOT NULL,
  `promotion_quantity` int NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`promotion_id`),
  UNIQUE KEY `promotion_code` (`promotion_code`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `promotion`
--

INSERT INTO `promotion` (`promotion_id`, `promotion_name`, `description`, `promotion_code`, `promotion_price`, `promotion_percent`, `promotion_created_date`, `promotion_expired_date`, `promotion_condition`, `promotion_quantity`, `createdAt`, `updatedAt`) VALUES
(11, 'Mã giảm SS3OFF', 'Ưu đãi 3% cho tất cả khách hàng', 'SS3OFF', 0.00, 3, '2025-07-04 20:42:11', '2025-08-03 20:42:11', 'Đơn hàng từ 200,000đ', 300, '2025-07-04 20:42:11', '2025-07-04 20:42:11'),
(12, 'Mã giảm SALESEA', 'Khuyến mãi đặc biệt từ Sea Store', 'SALESEA', 0.00, 1, '2025-07-04 20:42:11', '2025-08-03 20:42:11', 'Đơn hàng trên 150,000đ', 300, '2025-07-04 20:42:11', '2025-07-04 20:42:11'),
(13, 'Mã giảm WELCOME3', 'Chào mừng bạn đến với Sea Store', 'WELCOME3', 0.00, 2, '2025-07-04 20:42:11', '2025-08-03 20:42:11', 'Cho tất cả đơn hàng', 300, '2025-07-04 20:42:11', '2025-07-04 20:42:11'),
(14, 'Mã giảm GIFTVIP', 'Quà tặng ưu đãi cho khách hàng', 'GIFTVIP', 0.00, 1, '2025-07-04 20:42:11', '2025-08-03 20:42:11', 'Áp dụng cho đơn từ 300,000đ', 300, '2025-07-04 20:42:11', '2025-07-04 20:42:11'),
(15, 'Mã giảm COOLDEAL', 'Ưu đãi mát lạnh 3%', 'COOLDEAL', 0.00, 3, '2025-07-04 20:42:11', '2025-08-03 20:42:11', 'Không áp dụng kèm mã khác', 300, '2025-07-04 20:42:11', '2025-07-04 20:42:11');

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`role_id`, `role_name`, `agency_rank_id`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', NULL, '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(2, 'user', NULL, '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(3, 'admin_agency', NULL, '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(4, 'admin', NULL, '2025-07-03 17:18:47', '2025-07-03 17:18:47'),
(5, 'user', NULL, '2025-07-03 17:18:47', '2025-07-03 17:18:47'),
(6, 'admin_agency', NULL, '2025-07-03 17:18:47', '2025-07-03 17:18:47');

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
  `status` enum('active','locked','guest') DEFAULT 'active',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  KEY `agency_rank_id` (`agency_rank_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `first_name`, `last_name`, `email`, `password`, `phone`, `address`, `role_id`, `agency_rank_id`, `resources`, `createdAt`, `updatedAt`, `status`) VALUES
(12, 'Admin1', 'Nam', 'Tran', 'namtran_admin@gmail.com', '$2b$10$49eWa/4bP/LbTylDnyfxkuKjvMuGbk9dwZkyr186p2YqgaeZtAxMC', '(938) 327-6096', '76676 Glennie Ranch', 1, 1, '{\"canEdit\": true, \"canView\": true, \"agency_id\": null, \"isSuperAdmin\": true, \"warehouse_id\": null}', '2025-07-03 17:18:20', '2025-07-04 05:13:07', 'active'),
(14, 'Agency', 'Nam', 'Tran', 'namtran_agency@gmail.com', '$2b$10$49eWa/4bP/LbTylDnyfxkuKjvMuGbk9dwZkyr186p2YqgaeZtAxMC', '1-757-769-2335', '469 Aufderhar Ford', 2, 2, '{\"canEdit\": true, \"canView\": true, \"agency_id\": 4, \"isSuperAdmin\": false, \"warehouse_id\": 2}', '2025-07-03 17:18:20', '2025-07-05 15:51:52', 'active'),
(25, 'User1', 'Tran', 'Tran', 'namtran_user@gmail.com', '$2b$10$CoERHg1AmajstoybwJUaO.suC8USwQbjQLwE504S86RRN5vLZPKmS', '0337586860', '39 Cao Lỗ, phường 4, quận 8', 2, NULL, '{}', '2025-07-04 04:23:44', '2025-07-04 04:23:44', 'active'),
(26, 'User2', 'Tran', 'Tran', 'namtran_user2@gmail.com', '$2b$10$cFt8Sbmix2k.HbqzJbRaaON0podvSrrONaLKYF/TZUacc2/uJ6Akm', '0337586860', '39 Cao Lỗ, phường 4, quận 8', 2, 1, '{}', '2025-07-04 04:24:52', '2025-07-04 04:27:27', 'active'),
(27, 'Agency2', 'Tran', 'Tran', 'namtran_agency2@gmail.com', '$2b$10$6Sjx4NZLj/MV8QuF7Z0.IuOku8c43WSQA48xuOlgWtSmr2YecRR5q', '0337586860', '39 Cao Lỗ, phường 4, quận 8', 3, 1, '{}', '2025-07-04 08:13:51', '2025-07-05 06:52:32', 'active');

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
(1, 'XDJMYW', '14634 Mohr Brooks', '1-452-294-1187 x086', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(2, 'YYKQPU', '198 Cross Street', '514-716-2095', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(3, 'XFCAWM', '175 Hand Overpass', '(749) 707-0072 x929', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(4, 'WDJJMZ', '727 Nikolaus Creek', '458-927-4368 x50212', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(5, 'EWUMPF', '487 Gibson Keys', '262-934-0123', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(6, 'DGZAMJ', '525 Katlynn Creek', '(806) 515-6289', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(7, 'MKTRRG', '181 Windmill Close', '916-775-5102 x7179', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(8, 'PVAJPZ', '5682 Alphonso Haven', '(406) 479-4562 x61106', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(9, 'MZXKGX', '483 Stephania Summit', '427-537-9246 x9413', '2025-07-03 17:18:20', '2025-07-03 17:18:20'),
(10, 'BFXAWB', '140 Shayne Shores', '698-694-8645', '2025-07-03 17:18:20', '2025-07-03 17:18:20');

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
