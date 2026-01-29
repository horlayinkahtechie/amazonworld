// /app/api/send-order-email/route.js
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request) {
  try {
    const { order, paymentRef } = await request.json();
    
    // Get owner email from environment variable
    const ownerEmail = "madubugochinonso2018@gmail.com";
    
    const results = {
      customerEmail: null,
      ownerEmail: null,
      errors: []
    };

    // 1. Send email to customer first
    try {
      console.log('Attempting to send customer email...');
      const customerEmailData = await resend.emails.send({
        from: 'Amazon World <contact@amazonwrld.com>', // Use Resend's onboarding domain for testing
        to: [order.customer.email],
        subject: `Order Confirmation #${order.id}`,
        html: generateCustomerEmailHTML(order, paymentRef),
      });
      results.customerEmail = customerEmailData;
      console.log('Customer email sent successfully');
    } catch (customerError) {
      console.error('Failed to send customer email:', customerError);
      results.errors.push({ type: 'customer', error: customerError.message });
    }

    // Add 1 second delay between emails to respect rate limit
    await delay(1000);

    // 2. Send email to owner/admin
    try {
      console.log('Attempting to send owner email...');
      const ownerEmailData = await resend.emails.send({
        from: 'Amazon World <contact@amazonwrld.com>', // Use Resend's onboarding domain for testing
        to: [ownerEmail],
        subject: `New Order Received #${order.id}`,
        html: generateOwnerEmailHTML(order, paymentRef),
      });
      results.ownerEmail = ownerEmailData;
      console.log('Owner email sent successfully');
    } catch (ownerError) {
      console.error('Failed to send owner email:', ownerError);
      results.errors.push({ type: 'owner', error: ownerError.message });
    }

    // Check if at least one email was sent successfully
    if (results.customerEmail || results.ownerEmail) {
      return NextResponse.json({
        success: true,
        customerEmailId: results.customerEmail?.id || null,
        ownerEmailId: results.ownerEmail?.id || null,
        errors: results.errors,
        message: results.errors.length > 0 
          ? 'Some emails failed to send, but order was processed' 
          : 'Emails sent successfully'
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'All emails failed to send',
          details: results.errors 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in email sending process:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process email request', 
        details: error.message,
        suggestion: 'Please check your Resend API key and rate limits'
      },
      { status: 500 }
    );
  }
}

// Email template functions remain the same...
function generateCustomerEmailHTML(order, paymentRef) {
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const itemsHTML = order.items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <img src="${item.image}" alt="${item.title}" width="60" height="60" style="border-radius: 8px; object-fit: cover;">
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <strong>${item.title}</strong><br>
        <small>${item.category}</small>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        ₦${item.price.toLocaleString()}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        ₦${(item.price * item.quantity).toLocaleString()}
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .order-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .item-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .total-row { background: #f8f9fa; font-weight: bold; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px; }
        .button { display: inline-block; padding: 12px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Order Confirmed!</h1>
          <p>Thank you for shopping with Amazon World!</p>
        </div>
        
        <div class="content">
          <h2>Hi ${order.customer.firstName},</h2>
          <p>Your order has been confirmed and is being processed. Here are your order details:</p>
          
          <div class="order-info">
            <p><strong>Order Number:</strong> ${order.id}</p>
            <p><strong>Order Date:</strong> ${orderDate}</p>
            <p><strong>Payment Reference:</strong> ${paymentRef || 'N/A'}</p>
            <p><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">Paid</span></p>
          </div>
          
          <h3>Shipping Information</h3>
          <p>
            ${order.customer.firstName} ${order.customer.lastName}<br>
            ${order.customer.address}<br>
            ${order.customer.city}, ${order.customer.state}<br>
            ${order.customer.country}<br>
            Phone: ${order.customer.phone}<br>
            Email: ${order.customer.email}
          </p>
          
          <h3>Order Summary</h3>
          <table class="item-table">
            <thead>
              <tr style="background: #f8f9fa;">
                <th style="padding: 10px; text-align: left;">Product</th>
                <th style="padding: 10px; text-align: left;">Description</th>
                <th style="padding: 10px; text-align: center;">Qty</th>
                <th style="padding: 10px; text-align: right;">Price</th>
                <th style="padding: 10px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
              <tr class="total-row">
                <td colspan="4" style="padding: 10px; text-align: right;">Subtotal:</td>
                <td style="padding: 10px; text-align: right;">₦${order.totals.subtotal.toLocaleString()}</td>
              </tr>
              <tr class="total-row">
                <td colspan="4" style="padding: 10px; text-align: right;">Shipping:</td>
                <td style="padding: 10px; text-align: right;">${order.totals.shippingFee === 0 ? 'FREE' : `₦${order.totals.shippingFee.toLocaleString()}`}</td>
              </tr>
              <tr class="total-row">
                <td colspan="4" style="padding: 10px; text-align: right;"><strong>Total Amount:</strong></td>
                <td style="padding: 10px; text-align: right;"><strong>₦${order.totals.total.toLocaleString()}</strong></td>
              </tr>
            </tbody>
          </table>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://amazonwrld.com'}/shop" class="button">
              Continue Shopping
            </a>
          </div>
          
      
          
          <div class="footer">
            <p>Need help? Contact us at madubugochinonso2018@gmail.com or call +234 907 7080 174</p>
            <p>© ${new Date().getFullYear()} Amazon World. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateOwnerEmailHTML(order, paymentRef) {
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const itemsHTML = order.items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.title}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₦${item.price.toLocaleString()}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₦${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order Notification</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .alert { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 8px; }
        .customer-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .item-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .total-row { background: #f8f9fa; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛒 New Order Received!</h1>
          <p>Order #${order.id} has been placed</p>
        </div>
        
        <div class="content">
          <div class="alert">
            <strong>⚠️ Action Required:</strong> Please process this order within 24 hours.
          </div>
          
          <h2>Order Details</h2>
          <div class="customer-info">
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Order Date:</strong> ${orderDate}</p>
            <p><strong>Payment Status:</strong> <span style="color: #10b981; font-weight: bold;">Paid</span></p>
            <p><strong>Payment Reference:</strong> ${paymentRef || 'N/A'}</p>
            <p><strong>Total Amount:</strong> ₦${order.totals.total.toLocaleString()}</p>
          </div>
          
          <h3>Customer Information</h3>
          <p>
            <strong>Name:</strong> ${order.customer.firstName} ${order.customer.lastName}<br>
            <strong>Email:</strong> ${order.customer.email}<br>
            <strong>Phone:</strong> ${order.customer.phone}<br>
            <strong>Shipping Address:</strong><br>
            ${order.customer.address}, ${order.customer.city}<br>
            ${order.customer.state}, ${order.customer.country}<br>
            ${order.customer.postalCode ? `Postal Code: ${order.customer.postalCode}<br>` : ''}
            ${order.customer.deliveryInstructions ? `Delivery Instructions: ${order.customer.deliveryInstructions}` : ''}
          </p>
          
          <h3>Order Items</h3>
          <table class="item-table">
            <thead>
              <tr style="background: #f8f9fa;">
                <th style="padding: 10px; text-align: left;">Product</th>
                <th style="padding: 10px; text-align: center;">Qty</th>
                <th style="padding: 10px; text-align: right;">Unit Price</th>
                <th style="padding: 10px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
              <tr class="total-row">
                <td colspan="3" style="padding: 10px; text-align: right;">Subtotal:</td>
                <td style="padding: 10px; text-align: right;">₦${order.totals.subtotal.toLocaleString()}</td>
              </tr>
              <tr class="total-row">
                <td colspan="3" style="padding: 10px; text-align: right;">Shipping:</td>
                <td style="padding: 10px; text-align: right;">${order.totals.shippingFee === 0 ? 'FREE' : `₦${order.totals.shippingFee.toLocaleString()}`}</td>
              </tr>
              <tr class="total-row">
                <td colspan="3" style="padding: 10px; text-align: right;"><strong>Total Amount:</strong></td>
                <td style="padding: 10px; text-align: right;"><strong>₦${order.totals.total.toLocaleString()}</strong></td>
              </tr>
            </tbody>
          </table>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p>
              <strong>Next Steps:</strong><br>
              1. Verify payment with reference: ${paymentRef || order.id}<br>
              2. Prepare items for shipping<br>
              3. Update order status in your dashboard<br>
              4. Send tracking information to customer
            </p>
          </div>
        
        </div>
      </div>
    </body>
    </html>
  `;
}