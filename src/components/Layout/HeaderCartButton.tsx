import React,{ useContext, useState, useEffect} from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-contex";

type Props = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const HeaderCartButton: React.FC<Props> = (props: Props) => {
    const [btnIsHighLighted, setBtnIsHighLighted] = useState<boolean>(false);

    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;
    const numberOfCartItems = cartCtx.items.reduce((curName, item) => {
        return curName + item.amount;
    }, 0)
    const btnClasses = `${classes.button} ${btnIsHighLighted?  classes.bump : ''}`

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnIsHighLighted(true);
        const timer = setTimeout(()=>{
            setBtnIsHighLighted(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        }
    }, [items])
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;