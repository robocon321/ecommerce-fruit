import HeaderCart from "./HeaderCart";
import HeaderLogo from "./HeaderLogo";
import HeaderMenu from "./HeaderMenu";
import HeaderTop from "./HeaderTop";

export default function Header() {
  return (
    <header className="header">
      <HeaderTop />
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <HeaderLogo />
          </div>
          <div className="col-lg-6">
            <HeaderMenu />
          </div>
          <div className="col-lg-3">
            <HeaderCart />
          </div>
        </div>
        <div className="humberger__open">
          <i className="fa fa-bars"></i>
        </div>
      </div>
    </header>
  );
}
