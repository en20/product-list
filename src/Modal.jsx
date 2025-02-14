import PropTypes from 'prop-types';
import data from './data/data.json';
import "./Modal.css";

function Modal({ show, onClose, selectedProducts, cartCounts, totalOrderPrice }) {
  if (!show) return null;

  const getProductQuantity = (product, index) => {
    const isStoreProduct = 'id' in product && product.id.startsWith('fakestore-');
    if (isStoreProduct) {
      const storeIndex = parseInt(product.id.split('-')[1]) - 1;
      return cartCounts[storeIndex + data.length];
    }
    // Para produtos desserts
    const dessertIndex = data.findIndex(item => item.name === product.name);
    return cartCounts[dessertIndex];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg max-w-md w-full my-8">
        <div className="max-h-[80vh] overflow-y-auto">
          <img 
            className="mx-auto mb-4" 
            src="./assets/images/icon-order-confirmed.svg" 
            alt="order confirmed" 
          />
          <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your order has been confirmed. You will receive an email confirmation shortly.</p>
          
          <div className="divide-y">
            {selectedProducts.map((product, index) => {
              const isStoreProduct = 'id' in product && product.id.startsWith('fakestore-');
              const quantity = getProductQuantity(product, index);
              
              return (
                <div key={isStoreProduct ? product.id : index} className="py-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={isStoreProduct ? product.image : product.image.desktop} 
                      alt={product.name}
                      className="w-16 h-16 object-contain rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                        <p className="font-bold text-orange-500">
                          ${(product.price * quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span className="bg-orange-100 px-2 py-1 rounded-full">
                          x{quantity}
                        </span>
                        <span>@ ${product.price.toFixed(2)} each</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className="py-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Order Total</span>
                <span className="text-orange-500">${totalOrderPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-orange-700 text-white py-3 rounded-full mt-6 hover:bg-orange-800 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedProducts: PropTypes.array.isRequired,
  cartCounts: PropTypes.array.isRequired,
  totalOrderPrice: PropTypes.number.isRequired
};

export default Modal;
