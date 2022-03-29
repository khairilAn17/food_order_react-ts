import React,{ useRef, useState } from "react";
import classes from "./Checkout.module.css";



type TFormValidity = {
    name: boolean;
    street: boolean;
    city: boolean;
    postal: boolean;
}

export type TForm = {
    name: string;
    street: string;
    city: string;
    postal: string;
}

type Props = {
    onCancel: (event: React.MouseEvent<HTMLElement>) => void;
    onConfirm: (useData: TForm) => void;
}

const isEmpty = (value: string): boolean => value.trim() === '';
const isFiveChar = (value: string): boolean => value.trimEnd().length === 5;

const Checkout: React.FC<Props> = (props: Props) =>{

    const [formInputValidity, setFormInputValidity] = useState<TFormValidity>({
        name: true,
        street: true,
        city: true,
        postal: true
    });

    const nameInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const streetInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const postalInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const cityInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const confirmHandler = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid = isFiveChar(enteredPostal);

        setFormInputValidity({
            name: enteredCityIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postal: enteredPostalIsValid
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;

        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity
        });

    }

    const nameControlClasses = `${classes.control} ${formInputValidity.name? '' : classes.invalid}`
    const streetControlClasses = `${classes.control} ${formInputValidity.street? '' : classes.invalid}`
    const postalControlClasses = `${classes.control} ${formInputValidity.postal? '' : classes.invalid}`
    const cityControlClasses = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`

    return (
        <form onSubmit={confirmHandler} className={classes.form}>
            <div className={nameControlClasses}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputValidity.name && <p>Please enter valid name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef} />
                {!formInputValidity.street && <p>Please enter valid street</p>}
            </div>
            <div className={postalControlClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalInputRef} />
                {!formInputValidity.postal && <p>Please enter valid postal code</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef}/>
                {!formInputValidity.city && <p>Please enter valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;