import DetailProductProvider from "./_provider/DetailProductProvider";

export default function DetailProductLayout(props: any) {
    return <DetailProductProvider id={props.params.id}>{props.children}</DetailProductProvider>;
  }
  