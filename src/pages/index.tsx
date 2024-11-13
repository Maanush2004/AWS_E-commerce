import { useState } from "react";
import Product from "../../src/components/Product";
import Layout from "../../components/Layout";
import { fetchProducts } from "./api/products";

export default function Home({ products = [] }) {
  
  const [phrase, setPhrase] = useState('');

  // Filter products based on search phrase
  const filteredProducts = phrase
    ? products.filter(p => p.name.toLowerCase().includes(phrase.toLowerCase()))
    : products;

  const categoriesName = [...new Set(filteredProducts.map(p => p.category))];

  return (

    <Layout>
    
      <input
        value={phrase}
        onChange={e => setPhrase(e.target.value)}
        type="text"
        placeholder="Search for Products..."
        className="bg-gray-100 w-full py-2 px-4 rounded-xl" 
      />
      
      <div>
        {categoriesName.map(categoryName => {
          // Check if there are products in this category after filtering
          const productsInCategory = filteredProducts.filter(p => p.category === categoryName);
          if (productsInCategory.length === 0) return null; // Skip category if no products match

          return (

            <div key={categoryName}>
              <h2 className="text-2xl py-5 capitalize">{categoryName}</h2>
              <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                {productsInCategory.map(productInfo => (
                  <div key={productInfo.name} className="px-5 snap-start">
                    <Product {...productInfo} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
        
    </Layout>
  );
}

export async function getServerSideProps() {
  const products = await fetchProducts();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
