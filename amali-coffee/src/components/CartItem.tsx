import { CircleX } from "lucide-react";
import { useShopContext } from "../context/shop-context";

type CardProps = {
  id: number;
  productimage: string;
  product: string;
  productdefn: string;
  price: number;
  quantity: number;
};
const CartItem: React.FC<CardProps> = ({
  id,
  productdefn,
  price,
  quantity,
}) => {
  const { deleteFromCart } = useShopContext();

  const itemTotalPrice = price * quantity;

  return (
    <div className="px-4 flex items-center font-redhat">
      <div className="border-b-2 p-2 flex-1">
        <p className="font-semibold">{productdefn}</p>
        <div className="flex items-center ">
          <div className=" flex flex-1 gap-2">
            <p className="text-orange-700 font-semibold">{quantity}x</p>
            <p className="text-orange-800">@${price}</p>
            <p className="text-orange-800">${itemTotalPrice.toFixed(2)}</p>
          </div>
          <div>
            <CircleX
              onClick={() => deleteFromCart(id)}
              className="text-orange-600 hover:text-orange-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
