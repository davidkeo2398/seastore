const querystring = require('qs');
const crypto = require("crypto");
const moment = require('moment');
const { Order } = require("../Model/Index"); // Sửa lại đường dẫn tới model của bạn
const config = require('../utils/vnpay'); // Sửa lại đường dẫn tới file config
require('dotenv').config();

// Hàm phụ trợ để sắp xếp các thuộc tính của object theo alphabet
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

module.exports = {
    /**
     * Hàm tạo URL thanh toán VNPAY
     * @param {object} req - Request object từ Express
     * @returns {string} URL thanh toán VNPAY
     */
    createPaymentUrl: (req) => {
        try {
            process.env.TZ = 'Asia/Ho_Chi_Minh';

            const ipAddr = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                (req.connection.socket ? req.connection.socket.remoteAddress : null);

            const tmnCode = process.env.vnp_TmnCode;
            const secretKey = process.env.vnp_HashSecret;
            let vnpUrl = process.env.vnp_Url;
            const returnUrl = process.env.vnp_ReturnUrl;
            const createDate = moment(new Date()).format('YYYYMMDDHHmmss');

            // Lấy thông tin từ body của request
            const orderId = req.body.order_id || 'TranMap'; // ✅ Lấy order_id thật từ đơn hàng
            const amount = req.body.amount;
            const bankCode = req.body.bankCode || '';
            const orderInfo = req.body.orderDescription || `Thanh toan cho ma GD: ${orderId}`;
            const orderType = req.body.orderType || 'other'; // ✅ Sửa lại đúng mục đích
            const locale = req.body.language || 'vn';

            //in ra các tam số để kiểm tra
            console.log("Debug VNPAY", {    
                tmnCode,
                secretKey,
                vnpUrl,
                returnUrl,
                createDate,
                orderId,
                amount,
                bankCode,
                orderInfo,
                orderType,
                locale
            });

            let vnp_Params = {
                'vnp_Version': '2.1.0',
                'vnp_Command': 'pay',
                'vnp_TmnCode': tmnCode,
                'vnp_Locale': locale,
                'vnp_CurrCode': 'VND',
                'vnp_TxnRef': orderId, // ✅ Phải là mã đơn hàng duy nhất của bạn
                'vnp_OrderInfo': orderInfo,
                'vnp_OrderType': orderType, // ✅ Dùng để phân loại hàng hóa
                'vnp_Amount': amount * 100,
                'vnp_ReturnUrl': returnUrl,
                'vnp_IpAddr': ipAddr,
                'vnp_CreateDate': createDate,
            };

            if (bankCode) {
                vnp_Params['vnp_BankCode'] = bankCode;
            }

            vnp_Params = sortObject(vnp_Params);
            const signData = querystring.stringify(vnp_Params, { encode: false });
            const hmac = crypto.createHmac("sha512", secretKey);
            const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
            vnp_Params['vnp_SecureHash'] = signed;

            vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
            return vnpUrl;

        } catch (error) {
            console.error("Lỗi khi tạo URL thanh toán VNPAY:", error);
            throw new Error("Tạo URL thanh toán thất bại.");
        }
    },

    /**
     * Hàm xử lý kết quả VNPAY trả về (IPN hoặc Return)
     * @param {object} vnp_Params - Query params từ URL VNPAY trả về
     * @returns {object} { code, message }
     */
    handleVnpayReturn: async (vnp_Params) => {
        const secureHash = vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        const sortedParams = sortObject(vnp_Params);
        const secretKey = config.secretKey;
        const signData = querystring.stringify(sortedParams, { encode: false });
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

        if (secureHash !== signed) {
            return { code: '97', message: 'Chữ ký không hợp lệ' };
        }

        const orderId = vnp_Params['vnp_TxnRef'];
        const responseCode = vnp_Params['vnp_ResponseCode'];

        const order = await Order.findOne({ where: { order_id: orderId } });
        if (!order) {
            return { code: '01', message: 'Không tìm thấy đơn hàng' };
        }
        if (order.status !== 'pending') {
            return { code: '02', message: 'Đơn hàng đã được cập nhật' };
        }
        if (responseCode === '00') {
            await Order.update({ status: 'completed' }, { where: { order_id: orderId } });
            return { code: '00', message: 'Giao dịch thành công' };
        } else {
            await Order.update({ status: 'failed' }, { where: { order_id: orderId } });
            return { code: responseCode, message: 'Giao dịch thất bại' };
        }
    }
};