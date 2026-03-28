import Card from "./Card";
import { products } from "./product";
function Shop() {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {products.map((product) => (
        <Card
        key={product.id}
          id={product.id}
          productimage={product.productimage}
          product={product.product}
          productdefn={product.productdefn}
          price={product.price}
        />
      ))}
    </div>
  );
}

export default Shop;
