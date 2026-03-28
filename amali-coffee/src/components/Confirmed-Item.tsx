type CardProps = {
  id: number;
  productimage: string;
  product: string;
  productdefn: string;
  price: number;
  quantity: number;
};
const ConfirmedItem: React.FC<CardProps> = ({
  productimage,
  productdefn,
  price,
  quantity,
}) => {
  const itemTotalPrice = price * quantity;

  return (
    <div className="px-4 flex items-center border-b-2">
      <img
        className="rounded-lg w-12 h-12 "
        src={productimage}
        alt="productimage"
      ></img>
      <div className=" p-2 ">
        <p className="font-semibold">{productdefn}</p>
        <div className="flex items-center ">
          <div className=" flex gap-2">
            <p className="text-orange-700 font-semibold flex-1">{quantity}x</p>
            <p className="text-orange-800 flex-1">@${price}</p>
            <p className="text-orange-800 flex-none">
              ${itemTotalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedItem;
