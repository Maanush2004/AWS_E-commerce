import { useContext, useState } from 'react';
import { ProductsContext } from './ProductsContext';
import { MerchantContext } from './MerchantContext';

export default function Product({ name, category, price, description, picture }) {
  const [isAddHovered, setIsAddHovered] = useState(false);
  const [isEditHovered, setIsEditHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const { setSelectedProducts } = useContext(ProductsContext);
  const { merchant } = useContext(MerchantContext);

  function addProducts() {
    setSelectedProducts(prev => [...prev, name]);
  }

  return (
    <div className="w-64 p-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
      <div className="bg-blue-100 p-5 rounded-xl overflow-hidden">
        <img 
          src={picture} 
          alt={name}
          className="w-full h-48 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <h3 className="font-bold text-lg text-gray-800">{name}</h3>
      </div>
      <p className="text-sm mt-2 leading-5 text-gray-600 line-clamp-2">{description}</p>
      <div className="flex items-center justify-between mt-3">
        <div className="text-2xl font-bold text-gray-800">₹{price}</div>
        {!merchant ? <button 
          className={`
            bg-emerald-500 text-white py-2 px-4 rounded-xl
            transform transition-all duration-200
            hover:bg-emerald-600 hover:shadow-md 
            active:bg-emerald-700 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50
          `}
          onMouseEnter={() => setIsAddHovered(true)}
          onMouseLeave={() => setIsAddHovered(false)}
          onClick={addProducts}
        >
          {isAddHovered ? 'Add' : '+'}
        </button>
        :<>
        <button 
          className={`
            bg-yellow-500 text-white py-2 px-4 rounded-xl
            transform transition-all duration-200
            hover:bg-yellow-600 hover:shadow-md 
            active:bg-yellow-700 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50
          `}
          onMouseEnter={() => setIsEditHovered(true)}
          onMouseLeave={() => setIsEditHovered(false)}
          onClick={()=>window.location.href=`/addproduct?name=${name}&category=${category}&price=${price}&description=${description}&picture=${picture}`}
        >
          {isEditHovered ? 'Edit' : '✏️'}
        </button>
        <button 
        className={`
          bg-red-500 text-white py-2 px-4 rounded-xl
          transform transition-all duration-200
          hover:bg-red-600 hover:shadow-md 
          active:bg-red-700 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
        `}
        onMouseEnter={() => setIsDeleteHovered(true)}
        onMouseLeave={() => setIsDeleteHovered(false)}
        onClick={async () => {await fetch(`/api/rmdb/?name=${name}`); window.location.href='/'}}
      >
        {isDeleteHovered ? 'Remove' : '🗑️'}
      </button> </>}
      </div>
    </div>
  );
}
