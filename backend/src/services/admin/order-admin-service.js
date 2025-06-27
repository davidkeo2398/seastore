const { Order, Categories } = require("../../Model/Index");

module.exports = {
    getOrders: async()=> {
        try{
            const orders = await Order.findAll();
            console.log(orders);
            return orders;
        }
        catch(error){
            console.error('Get order fails');
            throw new Error('Get orders fail: ', error);
        }
    },
    updateStatusOrderById: async(data, order_id)=> {
        try{
            const {status} = data;
            const udpatedOrder = Order.update({status: status}, {where:{order_id: order_id}});
            return udpatedOrder;
        }
        catch(error){
            console.error('Update order by id fail');
            throw new Error('Update order by id fail: ', error);
        }
    }
}