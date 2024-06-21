import { populate } from "dotenv";
import OrderItem from "../models/order-item.js"; // Adjust the path as needed
import orderModel from "../models/orderModel.js";


export const orderList = async (req, res, next) => {
  try {
    const order = await orderModel
      .find()
      .populate("user", "name")
      .sort({ dateOrdered: -1 });

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json({ order: order });
  } catch (error) {
    next(error);
  }
};

export const addOrder = async (req, res, next) => {
  try {
    // Create and save each order item
    const orderItemIds = await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        const newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });

        const savedOrderItem = await newOrderItem.save();

        return savedOrderItem._id;
      })
    );

    const totalPrices = await Promise.all(
      orderItemIds.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price"
        );
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
      })
    );
    
    const totalPrice = totalPrices.reduce((a, b) => {
      const sum = a + b;
      return sum;
    }, 0);

    // Log the created order item IDs for debugging

    // Destructure the rest of the order details from the request body
    const {
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      status,
      user,
    } = req.body;

    // Create a new order with the saved order item IDs and other details
    const newOrder = new orderModel({
      orderItems: orderItemIds,
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      status,
      totalPrice: totalPrice,
      user,
    });

    // Save the new order
    const savedOrder = await newOrder.save();

    // Populate the order items in the response

    // Respond with success and the created order
    res.status(201).json({
      message: "Order has been created",
      order: savedOrder,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

export const singleOrder = async (req, res, next) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("user", "name")
      //.populate({path:"orderItems", populate:"product"})
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      });

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json({ order: order });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const status = await orderModel.findByIdAndUpdate(
      id,
      {
        status: req.body.status,
      },
      { new: true } // `new: true` returns the updated document, `runValidators` ensures validation rules are applied
    );

    if (!status) {
      return res.status(404).json({ message: "satatus not found" });
    }

    res.status(200).json({ status: status });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await orderModel.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    
    if (order.orderItems && order.orderItems.length > 0) {
      await Promise.all(
        order.orderItems.map(async (orderItemId) => {
          await OrderItem.findByIdAndDelete(orderItemId);
        })
      );
    }

    res.status(200).json({ message: "Order has been deleted" });
  } catch (error) {
    next(error);
  }
};


export const totalSales = async(req,res, next) =>{
    try {

       
       const sales = await  orderModel.aggregate([
        {$group:{_id:null, totalSales:{$sum: "$totalPrice"}}}
       ])
       if(!sales){
        return res.status(400).send("The order sales cannot be generated")
       }
       res.status(200).json({totalSales:sales.pop().totalSales})
    } catch (error) {
      next(error)  
    }
}


export const totalCount = async(req,res,next) =>{
  try {
    const count = await orderModel.countDocuments()
    res.status(200).json({count: count})
  } catch (error) {
    next(error)
  }
}