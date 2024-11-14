import { useState, useContext, useEffect } from "react";
import Layout from "../../components/Layout";
import { MerchantContext } from "../../components/MerchantContext";
import { useRouter } from "next/router";

export default function addProduct(props) {
    const router = useRouter();
    const { merchant } = useContext(MerchantContext);

    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");

    const [formValid, setFormValid] = useState(false);

    // This will run once the component has mounted
    useEffect(() => {
        if (router.isReady) {
            const { name, category, price, description } = router.query;
            setProductName(name || "");
            setProductCategory(category || "");
            setProductPrice(price || "");
            setProductDescription(description || "");
        }
    }, [router.isReady, router.query]); // Only run when router is ready

    useEffect(() => {
        if (productName && productCategory && productPrice && productDescription ) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [productName, productCategory, productPrice, productDescription]);

    return (
        <Layout>
            {merchant ? (
                <form action="/api/addtodb" method="POST">
                    <div className="mt-4">
                        <input
                            name="name"
                            value={productName}
                            onChange={e => setProductName(e.target.value)}
                            type="text"
                            placeholder="Enter Product Name"
                            className="w-full rounded-lg px-4 py-2 mb-2 border border-gray-300 focus:outline-none focus:border-emerald-500"
                        />
                        <input
                            name="category"
                            value={productCategory}
                            onChange={e => setProductCategory(e.target.value)}
                            type="text"
                            placeholder="Enter Product Category"
                            className="w-full rounded-lg px-4 py-2 mb-2 border border-gray-300 focus:outline-none focus:border-emerald-500"
                        />
                        <input
                            name="price"
                            value={productPrice}
                            onChange={e => setProductPrice(e.target.value)}
                            type="text"
                            placeholder="Enter Price"
                            className="w-full rounded-lg px-4 py-2 mb-2 border border-gray-300 focus:outline-none focus:border-emerald-500"
                        />
                        <input
                            name="description"
                            value={productDescription}
                            onChange={e => setProductDescription(e.target.value)}
                            type="text"
                            placeholder="Enter Description"
                            className="w-full rounded-lg px-4 py-2 mb-2 border border-gray-300 focus:outline-none focus:border-emerald-500"
                        />
                        <button
                            type="submit"
                            className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4 shadow-emerald-300 shadow-lg"
                            disabled={!formValid}
                        >
                            Add to Database
                        </button>
                    </div>
                </form>
            ) : (
                <>Access Denied. Only for Merchant</>
            )}
        </Layout>
    );
}
