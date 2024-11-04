import emptycart from "./assets/illustration-empty-cart.svg";
import carbon_neutral from "./assets/icon-carbon-neutral.svg";
import { products } from "./product";
import CartItem from "./CartItem";
import { useShopContext } from "./context/shop-context";

interface CartProps {
  handleShowModal: () => void;
}
const Cart: React.FC<CartProps> = ({ handleShowModal }) => {
  const { cartItems, getTotalCartAmount } = useShopContext();

  const totalAmount = getTotalCartAmount();

  const totalItems = Object.values(cartItems).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  return (
    <div className="border-2 border-solid rounded-xl bg-slate-50 min-h-[350px]  pb-4 font-redhat mt-4">
      <h1 className="text-orange-600 font-bold px-5 pt-5 text-[25px]">
        Your cart
        {totalItems > 0 && <span className="px-1">({totalItems})</span>}
      </h1>

      {totalAmount > 0 ? (
        <div>
          <div>
            {products.map((product) =>
              cartItems[product.id] !== 0 ? (
                <CartItem
                  key={product.id}
                  {...product}
                  quantity={cartItems[product.id]}
                />
              ) : null
            )}
          </div>
          <div className="space-y-3">
            <div className="mx-4 py-3 flex items-center">
              <p className="flex-1">Order Total</p>
              <p className="font-bold text-xl">${totalAmount.toFixed(2)}</p>
            </div>
            <div className="bg-pink-50 mx-4 text-center p-4 rounded-lg flex justify-center items-center gap-2">
              <img src={carbon_neutral} alt="Carbon-neutral"></img>
              <p>
                This is a <span className="font-semibold">carbon-neutral</span>{" "}
                delivery
              </p>
            </div>
            <div className="flex justify-center items-center ">
              <button
                onClick={handleShowModal}
                className="bg-orange-800 rounded-full px-4 p-2 text-white font-semibold w-full mx-4 hover:bg-orange-600 transition duration-300"
              >
                Confirm order
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center p-8">
            <img src={emptycart} alt="empty cart"></img>
          </div>
          <div>
            <p className="font-semibold text-center py-4">
              Your added items will appear here
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
