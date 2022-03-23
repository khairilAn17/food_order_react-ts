import React, { Dispatch, useReducer } from "react";
import CartContext, { initialState, TInitialState, TItem } from "./cart-contex";

type Props = {
    children: React.ReactNode;
}

type TDefaultCartState = {
    items: any[];
    totalAmount: number;
}

const defaultCartState = {
    items: [],
    totalAmount: 0, 
}
export type TAction = 
    | {type: 'ADD', item: TItem} 
    | {type: 'REMOVE', id: string}

const cartReducer = (state: TDefaultCartState, action: TAction): TDefaultCartState => {
    if(action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id)
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    // if(action.type === 'REMOVE'){
    //     const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

    //     const existingItem = state.items[existingCartItemIndex];
    //     const updatedTotalAmount = state.totalAmount - existingItem.price;
    //     let updatedItems;
    //     if(existingItem.amount === 1){
    //         updatedItems = state.items.filter(item => item.id !== action.id);
    //     } else {
    //         const updatedItem = { ...existingItem, amount: existingItem.amount -1 };
    //         updatedItems = [ ...state.items ];
    //         updatedItems[existingCartItemIndex] = updatedItem;
    //     }
    //     return {
    //         items: updatedItems,
    //         totalAmount: updatedTotalAmount
    //     }
    // }
    return defaultCartState;
}
const CartProvider: React.FC<Props> = (props: Props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item: TItem) => {
        dispatchCartAction({type: 'ADD', item: item});
    };
    const removeItemHandler = (id: string) => {
        dispatchCartAction({type: 'REMOVE', id});
    };
    const cartContext: TInitialState= {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemHandler
    }
    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
}

export default CartProvider;