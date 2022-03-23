import classes from "./Modal.module.css";
import ReactDom from "react-dom";
import React from "react";

type BackDropProps = {
    onClose: (event: React.MouseEvent) => void;
}

type ModalOverlayProps = {
    children: React.ReactNode;
}

type ModalProps = {
    children?: React.ReactNode;
    onClose: (event: React.MouseEvent) => void;
}

const BackDrop: React.FC<BackDropProps>= (props: BackDropProps) => {
 return <div className={classes.backdrop} onClick={props.onClose} />
}

const ModalOverlay = (props: ModalOverlayProps) => {
 return <div className={classes.modal}>
     <div className={classes.content}>{props.children}</div>
 </div>
}
const portalElement = document.getElementById('overlays') as HTMLElement;



const Modal: React.FC<ModalProps> = (props: ModalProps) => {
 return <>
    {ReactDom.createPortal(<BackDrop onClose={props.onClose} />, portalElement )}
    {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
 </>
}

export default Modal;