const { User, Order, OrderItem } = require('../Model/Index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../config/authentication');
const generateCode = require('../ultils/generateCode');


module.exports = {
    createOrder: async (orderData) => {
        try {
            const order_code = generateCode();
            const {
                user_id,
                user_name,
                user_email,
                address_user,
                agency_name,
                address_agency,
                phone_user,
                phone_agency,
                total,
                promotion_id,
                order_date,
                payment_method,
                promotion_code,
                product_id,
                quantity
                // status
            } = orderData;
            const user = User.findOne({ where: { user_id: user_id } });
            const orderItem = OrderItem({where: {order_id: orderId, user_id: user_id}})
            const payload = {
                order_code: order_code,
                user_id: user_id,
                user_name: user_name,
                user_email: user_email,
                address_user: address_user,
                agency_name: agency_name,
                address_agency: address_agency,
                phone_user: phone_user,
                phone_agency: phone_agency,
                total: total,
                promotion_id: promotion_id,
                order_date: order_date,
                payment_method: payment_method,
                promotion_code: promotion_code,
                status: 'pending'

            };
            const newOrder = await Order.create(payload);
            return newOrder;
        } catch (error) {
            console.error('Error creating order:', error);
            throw new Error('Failed to create order');
        }
    },
    getOrders: async () => {
        try {

        }
        catch (err) {

        }
    },

    getOrderById: async (orderId) => {
        try {
            const order = await Order.findByPk(orderId);
            if (!order) {
                throw new Error('Order not found');
            }
            return order;
        } catch (error) {
            console.error('Error fetching order:', error);
            throw new Error('Failed to fetch order');
        }
    },

    updateOrder: async (orderId, updateData) => {
        try {
            const [updatedRows, [updatedOrder]] = await Order.update(updateData, {
                where: { order_id: orderId },
                returning: true
            });
            if (updatedRows === 0) {
                throw new Error('Order not found or no changes made');
            }
            return updatedOrder;
        } catch (error) {
            console.error('Error updating order:', error);
            throw new Error('Failed to update order');
        }
    },

    deleteOrder: async (orderId) => {
        try {
            const deletedRows = await Order.destroy({ where: { order_id: orderId } });
            if (deletedRows === 0) {
                throw new Error('Order not found');
            }
            return { message: 'Order deleted successfully' };
        } catch (error) {
            console.error('Error deleting order:', error);
            throw new Error('Failed to delete order');
        }
    }
}