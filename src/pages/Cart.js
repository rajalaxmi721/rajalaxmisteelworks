import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Minus, Plus } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { user } = useAuth();


  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">
        <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png" alt="Empty Cart" className="w-64 mb-6" />
        <h2 className="text-xl font-bold mb-2">Your cart is empty!</h2>
        <p className="text-gray-500 mb-6 text-sm">Add items to it now.</p>
        <Link to="/" className="bg-blue-600 text-white px-12 py-2.5 font-bold rounded-sm shadow hover:bg-blue-700 transition-colors">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-4">
        {/* Cart Items List */}
        <div className="flex-1 bg-white shadow-sm rounded-sm">
          <div className="p-4 border-b">
            <h1 className="text-lg font-bold">My Cart ({cartItems.length})</h1>
          </div>
          
          <div className="divide-y">
            {cartItems.map((item) => (
              <div key={item.id} className="p-6 flex flex-col md:flex-row gap-6">
                <div className="w-24 h-24 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{item.category}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 px-3 hover:bg-gray-50"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1 border-x font-bold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 px-3 hover:bg-gray-50"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 font-bold text-sm flex items-center gap-1"
                    >
                      <Trash2 size={16} /> REMOVE
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 flex justify-end shadow-inner sticky bottom-0 bg-white border-t">
            <button className="bg-orange-500 text-white px-12 py-3 font-bold rounded-sm shadow-md hover:bg-orange-600 uppercase tracking-wider">
              Place Order
            </button>
          </div>
        </div>

        {/* Price Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-white shadow-sm rounded-sm sticky top-24">
            <div className="p-4 border-b">
              <h2 className="text-gray-500 font-bold uppercase text-sm">Price Details</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between">
                <span>Price ({cartItems.length} items)</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">− ₹0</span>
              </div>
              <div className="flex justify-between border-t pt-4 font-bold text-lg">
                <span>Total Amount</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <p className="text-green-600 font-bold text-xs pt-2">You will save ₹0 on this order</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
