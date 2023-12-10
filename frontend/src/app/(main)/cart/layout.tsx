import CartProvider from "./_provider/CartProvider";

export default function CartLayout(props: any) {
    return <CartProvider id={props.params.id}>{props.children}</CartProvider>;
  }
  