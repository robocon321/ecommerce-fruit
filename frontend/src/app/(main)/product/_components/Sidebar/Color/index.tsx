export default function Color(props: any) {
  return (
    <div className="sidebar__item sidebar__item__color--option">
      <h4>Colors</h4>
      <div className="sidebar__item__color sidebar__item__color--white">
        <label htmlFor="white">
          White
          <input type="radio" id="white" />
        </label>
      </div>
      <div className="sidebar__item__color sidebar__item__color--gray">
        <label htmlFor="gray">
          Gray
          <input type="radio" id="gray" />
        </label>
      </div>
      <div className="sidebar__item__color sidebar__item__color--red">
        <label htmlFor="red">
          Red
          <input type="radio" id="red" />
        </label>
      </div>
      <div className="sidebar__item__color sidebar__item__color--black">
        <label htmlFor="black">
          Black
          <input type="radio" id="black" />
        </label>
      </div>
      <div className="sidebar__item__color sidebar__item__color--blue">
        <label htmlFor="blue">
          Blue
          <input type="radio" id="blue" />
        </label>
      </div>
      <div className="sidebar__item__color sidebar__item__color--green">
        <label htmlFor="green">
          Green
          <input type="radio" id="green" />
        </label>
      </div>
    </div>
  );
}
