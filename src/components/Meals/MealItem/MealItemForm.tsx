import React, { useRef, useState} from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

type Props ={
    id: string;
    onAddOnToCart: (amount: number) => void;
}
const MealItemForm: React.FC<Props> = (props: Props) => {
    const amountInputRef = useRef<HTMLInputElement>(null);
    const [amountIsValid, setAmountIsValid] = useState<boolean>(true);

    const submitHandler = (e: any): void => {
        e.preventDefault()
        const enteredAmount = amountInputRef.current?.value;
        const enteredAmountNumber = enteredAmount? +enteredAmount: 0;

        if(enteredAmount?.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber >5) {
            setAmountIsValid(false);
            return;
        }
        
        props.onAddOnToCart(enteredAmountNumber);
    }
 return <form className={classes.form} onSubmit={submitHandler}>
     <Input 
         ref={amountInputRef}
         label="amount" 
         input={{
         id: "amount_" + + props.id,
         type: "number",
         min: "1",
         max: "5",
         step: "1",
         defaultValue: "1"
     }}/>
     <button>+ Add</button>
     {!amountIsValid && <p>Please enter a valid number (1-5).</p>}
 </form>
}

export default MealItemForm;