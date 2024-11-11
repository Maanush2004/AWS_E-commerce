import Layout from "../../../components/Layout";
import { useContext } from "react";
import { ProductsContext } from "../../../components/ProductsContext";
import { initMongoose } from '../../../lib/mongoose';
import Order from '../../../models/order';
import { useRouter } from 'next/router';


export default function InvoicePage({orderData}) {
  // Include ProductsContext to maintain cart state

  // const orderData = Order.findOne({_id : orderid});
  const { selectedProducts } = useContext(ProductsContext);

  if (!orderData) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white rounded-xl">
        <div className="border-b border-emerald-500 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-emerald-500">Order Confirmation</h1>
          <p className="text-gray-600 mt-2">Order #{orderData._id}</p>
          <p className="text-gray-600">
            Date: {new Date(orderData.orderDate).toLocaleDateString()}
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Customer Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600"><strong>Name:</strong> {orderData.name}</p>
              <p className="text-gray-600"><strong>Email:</strong> {orderData.email}</p>
              <p className="text-gray-600"><strong>Phone:</strong> {orderData.phoneno}</p>
            </div>
            <div>
              <p className="text-gray-600"><strong>Address:</strong> {orderData.address}</p>
              <p className="text-gray-600"><strong>City:</strong> {orderData.city}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Order Items</h2>
          <div className="space-y-4">
            {orderData.products.map((product) => (
              <div key={product.productId} className="flex mb-5">
                <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                  <img src={product.picture} alt={product.name} className="w-24"/>
                </div>
                <div className="pl-4">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <div className="flex mt-2">
                    <div className="grow text-gray-600">
                      ${product.price} × {product.quantity}
                    </div>
                    <div className="text-emerald-500 font-bold">
                      ${(product.quantity * product.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t-2 border-dashed border-emerald-500 pt-4">
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
            <h3 className="font-bold">${orderData.subtotal.toFixed(2)}</h3>
          </div>
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Delivery:</h3>
            <h3 className="font-bold">${orderData.delivery.toFixed(2)}</h3>
          </div>
          <div className="flex my-3 border-t-2 pt-3 border-dashed border-emerald-500">
            <h3 className="grow font-bold text-gray-400">Total:</h3>
            <h3 className="font-bold">${orderData.total.toFixed(2)}</h3>
          </div>
        </div>
        
        <button 
          onClick={() => window.print()} 
          className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4 shadow-emerald-300 shadow-lg"
        >
          Print Invoice
        </button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  await initMongoose();
  
  try {
    const order = await Order.findById(params.orderid);
    if (!order) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        orderData: JSON.parse(JSON.stringify(order))
      }
    };
  } catch (error) {
    console.error('Error fetching order:', error);
    return {
      notFound: true
    };
  }
}