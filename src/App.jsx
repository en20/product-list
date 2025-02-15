import { useState, useEffect } from 'react';
import data from './data/data.json';
import Modal from './Modal';

function App() {
  const [cartCounts, setCartCounts] = useState(new Array(data.length + 20).fill(0)); 
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [fakeStoreProducts, setFakeStoreProducts] = useState([]);

  const handleAddToCart = (index) => {
    const newCartCounts = [...cartCounts];
    newCartCounts[index] += 1; 
    setCartCounts(newCartCounts); 
    
    if (!selectedProductIds.includes(index)) {
      setSelectedProductIds([...selectedProductIds, index]);
    }
  };
  const handleIncrease = (index) =>{
    const newCartCounts = [...cartCounts]
    newCartCounts[index] += 1;
    setCartCounts(newCartCounts)
  }
  const handleDecrease = (index) => {
    const newCartCounts = [...cartCounts]
    if (newCartCounts[index] > 0) {
      newCartCounts[index] -= 1;
    }
    setCartCounts(newCartCounts);
}
const handleRemoveItem = (index) => {
  const newCartCounts = [...cartCounts];
  newCartCounts[index] = 0;
  setCartCounts(newCartCounts);

  setSelectedProductIds(selectedProductIds.filter(id => id !== index));
};
const totalOrderPrice = cartCounts.reduce((acc, count, index) => {
  if (index < data.length) {
    return acc + count * data[index].price;
  } else {
    const fakeStoreIndex = index - data.length;
    return acc + count * (fakeStoreProducts[fakeStoreIndex]?.price || 0);
  }
}, 0);

const handleSubmitOrder = (e) => {
  e.preventDefault()
  setShowModal(true)
  setOrderPlaced(true);
  //setCartCounts([])

}
const selectedProducts = [
  ...data.filter((_, index) => cartCounts[index] > 0),
  ...fakeStoreProducts.filter((_, idx) => cartCounts[idx + data.length] > 0)
];

const handleModalClose = () => {
  setShowModal(false);
  setOrderPlaced(false);
  setCartCounts(new Array(data.length + 20).fill(0)); 
  setSelectedProductIds([]);
}

useEffect(() => {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      const formattedProducts = data.map(product => ({
        id: `fakestore-${product.id}`,
        name: product.title.length > 25 ? product.title.substring(0, 25) + '...' : product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      }))
      setFakeStoreProducts(formattedProducts)
    })
}, [])

  return (
    <div className="min-h-screen">
      <div className='flex flex-col md:flex-row justify-center w-full max-w-[1600px] mx-auto px-6 gap-8'>
        <div className='flex flex-col justify-center md:w-3/5'>
          <h1 className='font-bold text-3xl mb-5'>Desserts</h1>
          <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3   w-full'>
            {data.map((product, index) => (
              <div key={index} className="rounded-xl">
                <div className='relative w-64 h-64'>
                  <img 
                    className={`w-64 h-64 object-cover rounded-xl ${cartCounts[index] > 0 ? "outline outline-2 outline-orange-700" : ""}`}
                    src={product.image.desktop}
                    alt={product.name}
                  />
                  <div className='absolute -bottom-5 left-0 right-0 px-4'>
                    {cartCounts[index] > 0 ? (
                      <div className="bg-orange-700 w-48 flex justify-center items-center text-center mx-auto gap-7 rounded-full px-5 py-2">
                        <div onClick={() => handleDecrease(index)} className='text-center group cursor-pointer flex justify-center items-center'>
                          <img className='text-red-600 border w-5 h-5 p-1 rounded-full' src="./assets/images/icon-decrement-quantity.svg" alt="decrease" />
                        </div>
                        <span className='text-white'>{cartCounts[index]}</span>
                        <div onClick={() => handleIncrease(index)} className='p-1 text-center group cursor-pointer flex justify-center items-center'>
                          <img className='text-red-600 border p-1 w-5 h-5 rounded-full' src="./assets/images/icon-increment-quantity.svg" alt="increase" />
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(index)}
                        className="w-48 mx-auto bg-white border border-orange-500 hover:bg-orange-50 transition-colors duration-300 flex items-center justify-center gap-2 rounded-full px-5 py-2 shadow-md"
                      >
                        <img src="./assets/images/icon-add-to-cart.svg" alt="add to cart" />
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
                <div className='pt-8 pb-4 w-64'>
                  <p className='text-gray-500 text-sm'>{product.category}</p>
                  <p className='font-semibold text-lg mt-1'>{product.name}</p>
                  <p className='text-orange-500 font-bold text-xl mt-2'>
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h1 className='font-bold text-3xl mb-5 mt-10'>Store Products</h1>
          <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3  w-full '>
            {fakeStoreProducts.map((product, idx) => {
              const index = idx + data.length;
              return (
                <div key={product.id} className="rounded-xl relative">
                  <div className='relative'>
                    <img 
                      className={`w-full h-72 object-contain rounded-xl ${cartCounts[index] > 0 ? "outline outline-2 outline-orange-700" : ""}`}
                      src={product.image} 
                      alt={product.name} 
                    />
                    <div className='absolute -bottom-5 left-0 right-0 px-4'>
                      {cartCounts[index] > 0 ? (
                        <div className="bg-orange-700 w-48 flex justify-center items-center text-center mx-auto gap-7 rounded-full px-5 py-2">
                          <div onClick={() => handleDecrease(index)} className='text-center group cursor-pointer flex justify-center items-center'>
                            <img className='text-red-600 border w-5 h-5 p-1 rounded-full' src="./assets/images/icon-decrement-quantity.svg" alt="decrease" />
                          </div>
                          <span className='text-white'>{cartCounts[index]}</span>
                          <div onClick={() => handleIncrease(index)} className='p-1 text-center group cursor-pointer flex justify-center items-center'>
                            <img className='text-red-600 border p-1 w-5 h-5 rounded-full' src="./assets/images/icon-increment-quantity.svg" alt="increase" />
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(index)}
                          className="w-48 mx-auto bg-white border border-orange-500 hover:bg-orange-50 transition-colors duration-300 flex items-center justify-center gap-2 rounded-full px-5 py-2 shadow-md"
                        >
                          <img src="./assets/images/icon-add-to-cart.svg" alt="add to cart" />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                  <div className='pt-8 pb-4 w-64'>
                    <p className='text-gray-500 text-sm'>Store Product</p>
                    <p className='font-semibold text-lg mt-1'>{product.name}</p>
                    <p className='text-orange-500 font-bold text-xl mt-2'>
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg w-full md:w-[45%] lg:w-[30%] md:sticky md:top-6 mt-[52px] h-fit'>
          <h1 className='text-orange-500 font-bold mb-6 text-[30px]'>
            Your Cart ({cartCounts.reduce((acc, count) => acc + count, 0)})
          </h1>
          {cartCounts.every(count => count === 0) ? (
            <div className='text-center'>
              <img className='mx-auto' src="./assets/images/illustration-empty-cart.svg" alt="empty cart" />
              <p className='text-sm lg:text-lg'>Your added items will appear here</p>
            </div>
          ) : (
            <div className='divide-y-2'>
              {data.map((product, index) => 
                cartCounts[index] > 0 && (
                  <div className='divide-y-2 mb-4' key={index}>
                    <div>
                      <p>{product.name}</p>
                      <div className='flex justify-between items-center'>
                        <div className='flex justify-between gap-3'>
                          <span className='text-orange-500 font-semibold'>x{cartCounts[index]}</span>
                          <span className='text-red-900'>@ ${product.price.toFixed(2)}</span>
                          <span className='text-red-900 font-semibold'>${(product.price * cartCounts[index]).toFixed(2)}</span>
                        </div>
                        <img 
                          className='p-1 outline outline-1 outline-red-900 rounded-full cursor-pointer' 
                          onClick={() => handleRemoveItem(index)} 
                          src="./assets/images/icon-remove-item.svg" 
                          alt="icon-remove-item" 
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
              
              {fakeStoreProducts.map((product, idx) => {
                const index = idx + data.length;
                return cartCounts[index] > 0 && (
                  <div className='divide-y-2 mb-4' key={product.id}>
                    <div>
                      <p>{product.name}</p>
                      <div className='flex justify-between items-center'>
                        <div className='flex justify-between gap-3'>
                          <span className='text-orange-500 font-semibold'>x{cartCounts[index]}</span>
                          <span className='text-red-900'>@ ${product.price.toFixed(2)}</span>
                          <span className='text-red-900 font-semibold'>${(product.price * cartCounts[index]).toFixed(2)}</span>
                        </div>
                        <img 
                          className='p-1 outline outline-1 outline-red-900 rounded-full cursor-pointer' 
                          onClick={() => handleRemoveItem(index)} 
                          src="./assets/images/icon-remove-item.svg" 
                          alt="icon-remove-item" 
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div className='flex justify-between items-center'>
                <span className='mt-10'>Order Total</span>
                <span className='mt-10 font-bold text-xl'>${totalOrderPrice.toFixed(2)}</span>
              </div>
              <div className='bg-orange-50 flex justify-center mt-10 p-2 gap-1 rounded-lg'>
                <img src="./assets/images/icon-carbon-neutral.svg" alt="icon-carbon-neutral" />
                <span>This is a carbon-neutral delivery</span>
              </div>
              <button 
                className='bg-orange-700 w-full p-3 mt-6 rounded-full text-white' 
                onClick={handleSubmitOrder}
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>
      </div>
      {orderPlaced && (
        <Modal
          show={showModal}
          onClose={handleModalClose}
          selectedProducts={selectedProducts}
          cartCounts={cartCounts}
          totalOrderPrice={totalOrderPrice}
        />
      )}
    </div>
  );
}

export default App;
