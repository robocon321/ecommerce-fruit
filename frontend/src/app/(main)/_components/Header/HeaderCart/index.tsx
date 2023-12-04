export default function HeaderCart(props: any) {
  return (
    <div className="header__cart">
      <ul>
        <li>
          <a href="#">
            <i className="fa fa-heart"></i> <span>1</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-shopping-bag"></i> <span>3</span>
          </a>
        </li>
      </ul>
      <div className="header__cart__price">
        item: <span>$150.00</span>
      </div>
    </div>
  );
}
