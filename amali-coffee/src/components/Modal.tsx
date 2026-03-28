import ConfirmedItem from "./Confirmed-Item";
import { useShopContext } from "../context/shop-context";
import { products } from "../product";
import orderconfirmed from "../assets/icon-order-confirmed.svg";

interface ModalProps {
  handleShowModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ handleShowModal }) => {
  //   if (!open) return null;

  const { cartItems, getTotalCartAmount, resetCart } = useShopContext();

  const totalAmount = getTotalCartAmount();

  const handleNewOrder = () => {
    resetCart();
    handleShowModal();
  };

  return (
    <div
      onClick={handleShowModal}
      className="fixed inset-0 flex justify-center items-center  bg-black/40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow p-6 font-redhat"
      >
        <div className="py-2">
          <img src={orderconfirmed} alt="order-confirmed image"></img>
        </div>
        <h1 className="font-bold text-2xl">Order Confrimed</h1>
        <p className="text-xs">We hope you enjoy your food</p>
        <div className="bg-pink-50 my-3 px-2 rounded-lg">
          <div className="py-3">
            {products.map((product) =>
              cartItems[product.id] !== 0 ? (
                <ConfirmedItem
                  key={product.id}
                  {...product}
                  quantity={cartItems[product.id]}
                />
              ) : null
            )}
          </div>
          <div className=" py-3 flex items-center">
            <p className="flex-1">Order Total</p>
            <p className="font-bold text-xl">${totalAmount.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex justify-center items-center pt-2">
          <button
            onClick={handleNewOrder}
            className="bg-orange-800 rounded-full  p-2 text-white font-semibold w-full hover:bg-orange-600 transition duration-300"
          >
            Start New Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
