const https = require('https');
const { createSignature } = require('../utils/momo');

const partnerCode = 'MOMO';
const accessKey = 'F8BBA842ECF85';
const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
// const redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
// const ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';

exports.createPayment = (data) => {
    return new Promise((resolve, reject) => {
        const orderId = partnerCode + new Date().getTime();
        const requestId = orderId;
         const redirectUrl = data.redirectUrl || 'https://webhook.site/your-default-redirect';
        const ipnUrl = data.ipnUrl || 'https://webhook.site/your-default-ipn';
        const rawSignature = `accessKey=${accessKey}&amount=${data.amount}&extraData=&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${data.orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=payWithMethod`;

        const signature = createSignature(rawSignature, secretKey);

        const requestBody = JSON.stringify({
            partnerCode,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId,
            amount: data.amount,
            orderId,
            orderInfo: data.orderInfo,
            redirectUrl,
            ipnUrl,
            lang: "vi",
            requestType: "payWithMethod",
            autoCapture: true,
            extraData: "",
            orderGroupId: "",
            signature
        });

        const options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            }
        };

        const req = https.request(options, res => {
            let responseBody = '';
            res.on('data', chunk => responseBody += chunk);
            res.on('end', () => resolve(JSON.parse(responseBody)));
        });

        req.on('error', err => reject(err));
        req.write(requestBody);
        req.end();
    });
};
