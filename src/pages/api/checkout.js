import { fetchProducts } from "./products";

export default async function handler(req, res) {
  
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const createOrder = async (orderDetails) => {
    try {
      const response = await fetch(process.env.OrdersAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify(orderDetails),
      })
      if (!response.ok) throw new Error('Fetch error');
      return await response.json()
    } catch (error) {
      return {};
    }
  }

  try {
    const {
      name,
      email,
      address,
      city,
      phoneno,
      products
    } = req.body;

    // Convert comma-separated string to array
    const productNameArray = products.split(',');

    // Get unique product IDs and their quantities
    const productCounts = {};
    productNameArray.forEach(name => {
      productCounts[name] = (productCounts[name] || 0) + 1;
    });

    // Fetch product details and calculate totals
    const productDetails = [];
    let subtotal = 0;
    
    for (const [productName, quantity] of Object.entries(productCounts)) {
      const product = await fetchProducts(productName);
      if (Object.keys(product).length == 0) {
        res.status(404).json({ error: `Product ${productName} not found` });
        return;
      }

      productDetails.push({
        name: product[0].name,
        quantity: quantity,
        price: product[0].price,
        picture: product[0].picture
      });
      
      subtotal += product[0].price * quantity;
    }

    const delivery = productDetails.length > 0 ? 5 : 0;
    const total = subtotal + delivery;

    // Create the order
    const order = await createOrder({
      name,
      email,
      address,
      city,
      phoneno,
      products: productDetails,
      subtotal,
      delivery,
      total,
      orderDate: new Date()
    });

    // Redirect to invoice page
    res.redirect(303, `/invoice/${order.id}`);

  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Error processing order' });
  }
}