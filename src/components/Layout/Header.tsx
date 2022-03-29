import React from "react";
import mealsImage from '../../assets/images/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

type Props = {
    onShowCart: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Header: React.FC<Props> = (props: Props) => {
    return (
        <>
            <header className={classes.header}>
                <h1>KueKita</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="meals image" />
            </div>
        </>
        )
}

export default Header;