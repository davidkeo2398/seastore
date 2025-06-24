const crypto = require('crypto');

exports.createSignature = (rawSignature, secretKey) => {
    return crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
};
