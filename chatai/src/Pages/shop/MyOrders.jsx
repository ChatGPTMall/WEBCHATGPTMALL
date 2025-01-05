import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Image, Tag, Spin } from 'antd';
import { getPurchasesWithAuth } from './getPurchasesWithAuth';
import Header from '../../Components/Header';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Fetch the purchases once the component has mounted
      getPurchasesWithAuth()
        .then((data) => {
          // 'data' should be an array of purchases/orders from your API
          if (data) {
            setOrders(data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
          setLoading(false);
        });
    }, []);
  
    // Show a loading spinner while fetching orders
    if (loading) {
      return <Spin tip="Loading orders..." style={{ marginTop: 50 }} />;
    }
  
    // If no orders were fetched
    if (orders.length === 0) {
      return <p style={{ padding: 24 }}>No orders found.</p>;
    }
  
    return (
        <div  className="flex flex-col w-full">
           <Header /> 
        
      <div className="container">
        <br></br>
        
        {orders.map((order, index) => (
            <Card
            key={index}
            style={{ marginBottom: 24 }}
            bodyStyle={{ padding: 0 }}
            >
            {/* ============== Order Header ============== */}
            <div style={{ padding: '16px' }}>
              <Row justify="space-between" align="middle">
                <Col>
                  {/* Replace purchase_id with any unique identifier from your data */}
                  <div style={{ fontWeight: 'bold' }}>
                    Order #{order.purchase_id}
                  </div>
                  {/* If you have something like a purchase_date field, display it */}
                  <div>Order Placed: {new Date(order.purchase_date).toLocaleString()}</div>
                </Col>
  
                <Col>
                  {/* Example "Track Order" button — if your use case supports it */}
                  <Button type="primary" style={{ borderRadius: 20, backgroundColor: "blue" }}>
                    Track Order
                  </Button>
                </Col>
              </Row>
            </div>
  
            {/* ============== Order Items ============== */}
            {/* 
               Some APIs return multiple items in an order. 
               If your API returns an array (e.g. order.items[]), map through them. 
               Otherwise, if there’s just a single item per order, you can display them directly.
               */}
            <div
              style={{
                  display: 'flex',
                  padding: '16px',
                  borderTop: '1px solid #f0f0f0',
                }}
                >
              {/* Example of item data — adapt based on your actual fields */}
              {/* Use optional chaining (?.) to avoid errors if any field is missing */}
              {order.item?.image && (
                  <Image
                  width={80}
                  src={order.item.image}
                  alt={order.item.title}
                  style={{ borderRadius: 4 }}
                  />
                )}
              <div style={{ marginLeft: 16, flex: 1 }}>
                <div style={{ fontWeight: 'bold' }}>
                  {order.item?.title || 'No Title'}
                </div>
                {/* Possibly show vendor or seller name if available */}
                <div>By: {order.item?.vendor_email || 'Unknown Seller'}</div>
                <div style={{ marginTop: 8 }}>
                  <span>Qty: {order.quantity || 1}</span>
                  <span style={{ marginLeft: 16 }}>
                    Price: Rs. {order.item?.price || 0}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div>
                  <strong>Status:</strong>{' '}
                  <Tag color={order.is_paid ? 'green' : 'red'} style={{ margin: 0 }}>
                    {order.is_paid ? 'Paid' : 'Unpaid'}
                  </Tag>
                </div>
                <div style={{ marginTop: 8 }}>
                  <strong>Shipped:</strong>{' '}
                  {order.is_shipped ? 'Yes' : 'No'}
                </div>
              </div>
            </div>
  
            {/* ============== Order Footer ============== */}
            <div
              style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                }}
                >
              {/* Example of a "Cancel Order" button if needed */}
              <Button danger type="text">
                Cancel Order
              </Button>
  
              {/* Payment method or total price info */}
              <div>
                {/* If needed, show total or mention of payment method */}
                <span>Paid by: {order.buyer_email}</span>
                <strong style={{ marginLeft: 16 }}>
                  Total: Rs. {order.item?.price * (order.quantity || 1)}
                </strong>
              </div>
            </div>
          </Card>
        ))}
      </div>
        </div>
    );
  }
  
  export default MyOrders;
