import { useContext } from "react";
import { CartContext } from "../store/cartContext";

export default function Product({
  id,
  image,
  title,
  price,
  description,
}) {

  const cartContext = useContext(CartContext);

  let productFromCart = cartContext.items.find((item) => item.id == id);
  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">₹{price}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button onClick={() => cartContext.onAddItemToCart(id)}>
            {productFromCart
              ? `Added - ${productFromCart.quantity}`
              : "Add to Cart"}
          </button>
        </p>
      </div>
    </article>
  );
}
