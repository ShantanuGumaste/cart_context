import { useRef, useContext } from 'react';
import { CartContext } from '../store/cartContext.jsx';

import CartModal from './CartModal.jsx';

export default function Header({ onUpdateCartItemQuantity }) {

  const cartContext = useContext(CartContext);

  const modal = useRef();

  const cartQuantity = cartContext.items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        title="Your Cart"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.jpg" alt="Triathalon" />
          <h1>Triathalon</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
