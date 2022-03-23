import React, { useState } from 'react'
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

const App: React.FC = () => {
  const [cartIsShown, setCartIsShow] = useState<boolean>(false);

  const showCartHandler = (): void => {
    setCartIsShow(true);
  }
  
  const hideCartHanlder = (): void => {
    setCartIsShow(false);
  }
  return(
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHanlder}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  )
}

export default App;