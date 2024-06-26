import { DUMMY_PRODUCTS } from '../dummy-products.js';
import Product from './Product.jsx';

export default function Shop({ onAddItemToCart }) {
  return (
    <section id="shop">
      <h2>Sports equipment for your need</h2>

      <ul id="products">
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product}  />
          </li>
        ))}
      </ul>
    </section>
  );
}
