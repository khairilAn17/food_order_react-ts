import React from "react";
import { TAction } from "./CartProvider";

export type TItem = {
    id: string;
    name: string;
    description?: string;
    price: number;
    amount: number;
}
export type TInitialState = {
    items: TItem[];
    totalAmount: number;
    addItem: (item: TItem) => void;
    removeItem: (id: string) => void;
}

const item = {
    name: '',
    description: '',
    price: 0,
    amount: 0,
}
export const initialState = {
    items: [],
    totalAmount: 0,
    addItem: (item: TItem) => {},
    removeItem: (id: string) => {}
}
const CartContext = React.createContext<TInitialState>(initialState);

export default CartContext;