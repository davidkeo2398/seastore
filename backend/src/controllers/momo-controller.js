const {momoService} = require('../services/index');

exports.createPayment = async (req, res) => {
    try {
        const result = await momoService.createPayment(req.body);
        if (result && result.resultCode === 0) {
            res.json({ payUrl: result.payUrl });
        } else {
            res.status(400).json({ error: result.message || 'MoMo payment error' });
        }
    } catch (err) {
        console.error('Create Payment Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};