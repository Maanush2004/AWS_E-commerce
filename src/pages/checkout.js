import Layout from "../../components/Layout";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../components/ProductsContext";
import { useRouter } from "next/router";
import { LoginContext } from "../../components/LoginContext";

export default function CheckOut() {
  const router = useRouter();
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productInfo, setProductInfo] = useState([]);
  const [address, setAddress] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formValid, setFormValid] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [warning, setWarning] = useState('');
  const {Login} = useContext(LoginContext);
  const validateForm = (e) => {
    e.preventDefault();
    if(!name || !phoneno || !address || !city || !email) {
      setFormValid(false);
      setWarning("Please Fill all the above fields before proceeding");
      return;
    }
    setWarning("");
    e.target.submit();
  }

  useEffect(()=>{
    if (!Login) window.location.href = '/'
  },[])

  useEffect(() => {
    
    if (selectedProducts.length > 0) {
      const uniqProducts = [...new Set(selectedProducts)];
      fetch(`/api/products?names=${uniqProducts.join(',')}`)
        .then(response => response.json())
        .then(json => setProductInfo(json))
        .catch(error => console.error(error));
    } else {
      setProductInfo([]);
    }
  }, [selectedProducts]);

  
  useEffect(() => {
    // Check if all fields are filled
    if (address && city && name && email && phoneno) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [address, city, name, email, phoneno]);


  function moreOfThisProduct(name) {
    setSelectedProducts(prev => [...prev, name]);
  }

  function lessOfThisProduct(name) {
    const pos = selectedProducts.indexOf(name);
    if (pos !== -1) {
      setSelectedProducts(prev => prev.filter((value, index) => index !== pos));
    }
  }

  const delivery = selectedProducts.length > 0 ? 5 : 0;  
  let subtotal = 0;
  if (selectedProducts?.length && productInfo?.length) {
    for (let name of selectedProducts) {
      const product = productInfo.find(p => p.name === name);
      if (product) {
        subtotal += Number(product.price);
      }
    }
  }
  const total = subtotal + delivery;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // Send POST request to your backend for payment processing
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phoneno,
          address,
          city,
          email,
          products: selectedProducts.join(","),
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Payment successful, redirect to invoice page
        router.push(`/invoice/${data.orderId}`);
      } else {
        // Handle any errors from backend response
        console.error("Error processing payment:", response.statusText);
        // You might want to display an error message to the user here
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle network errors or other exceptions
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false); // Set isSubmitting back to false
    }
  };

  return (
    <Layout>
      {!productInfo.length && (
                <div className="text-center text-gray-500 font-medium text-bold text-2xl">
                No products in the Shopping Cart
              </div>
      )}
      {productInfo.length > 0 && productInfo.map(product => {
        const amount = selectedProducts.filter(name => name === product.name).length;
        if (amount === 0) return null;
        return (
          <div key={product.name} className="flex mb-5 border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-gray-100 p-3 rounded-xl shrink-0">
              <img className="w-24 rounded-md" src={product.picture} alt={product.name} />
            </div>
            <div className="pl-4">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-sm leading-4 text-gray-500">{product.description}</p>
              <div className="flex items-center">
                <div className="grow font-semibold text-emerald-600">${product.price}</div>
                <div className="flex items-center">
                  <button
                    onClick={() => lessOfThisProduct(product.name)}
                    className="border border-emerald-500 px-2 rounded-lg text-emerald-500 hover:bg-emerald-100 transition">
                    -
                  </button>
                  <span className="px-5 font-semibold">{amount}</span>
                  <button
                    onClick={() => moreOfThisProduct(product.name)}
                    className="bg-emerald-500 px-2 rounded-lg text-white hover:bg-emerald-600 transition">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <form onSubmit={validateForm} action="/api/checkout" method="POST" className="mt-4 bg-white p-6 rounded-xl shadow-md">
        <div className="mt-4">
          <input
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Your Name"
            className="mb-2 w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:border-emerald-500"
          />
          <input
            name="phoneno"
            value={phoneno}
            onChange={e => setPhoneno(e.target.value)}
            type="tel"
            placeholder="Enter Phone Number"
            className="mb-2 w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:border-emerald-500"
          />
          <input
            name="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            type="text"
            placeholder="Address"
            className="mb-2 w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:border-emerald-500"
          />
          <input
            name="city"
            value={city}
            onChange={e => setCity(e.target.value)}
            type="text"
            placeholder="City and State"
            className="mb-2 w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:border-emerald-500"
          />
          
          <input
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Email address"
            className="mb-2 w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:border-emerald-500"
          />
        </div>
        {warning && (
          <div className="text-red-500 mt-2 font-semibold text-sm">
            {warning}
          </div>
        )}

      <div className="mt-4">
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">SubTotal: </h3>
            <h3 className="font-bold">${subtotal} </h3>
          </div>
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Delivery: </h3>
            <h3 className="font-bold">${delivery} </h3>
          </div>
          <div className="flex my-3 border-t-2 pt-3 border-dashed border-emerald-500">
            <h3 className="grow font-bold text-gray-400">Total: </h3>
            <h3 className="font-bold">${total} </h3>
          </div>
        </div>
        <input type="hidden" name="products" value={selectedProducts.join(',')} />

        <button
          type="submit"
          className={`bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4 shadow-lg transition ${
            !formValid ? "cursor-not-allowed" : "hover:bg-emerald-600"
          }`}
        >
          Pay ${total}
        </button>
      </form>
    </Layout>
  );
}
