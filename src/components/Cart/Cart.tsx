import React, { useContext } from "react";
import CartContext from "../../store/cart-contex";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

type Props = {
    onClose: (event: React.MouseEvent) => void;    
}
const Cart: React.FC<Props> = (props: Props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItem = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id:string)=> {
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler = (item: any) => {
        cartCtx.addItem(item)
    }
    const CartItems = (
        <ul className={classes['cart-items']}> 
            {cartCtx.items.map((item) => (<CartItem key={item.id} name={item.name} price={item.price} amount={item.amount} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />))}
        </ul>
        )
 return (
    <Modal onClose={props.onClose}>
        {CartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItem && <button className={classes.button}>Order</button>}
        </div>
    </Modal>
 )
}

export default Cart;