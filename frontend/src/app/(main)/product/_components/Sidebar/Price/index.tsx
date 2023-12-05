export default function Price(props: any) {
  return (
    <div className="sidebar__item">
      <h4>Price</h4>
      <div className="price-range-wrap">
        <div
          className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
          data-min="10"
          data-max="540"
        >
          <div className="ui-slider-range ui-corner-all ui-widget-header"></div>
          <span
            tabIndex={0}
            className="ui-slider-handle ui-corner-all ui-state-default"
          ></span>
          <span
            tabIndex={0}
            className="ui-slider-handle ui-corner-all ui-state-default"
          ></span>
        </div>
        <div className="range-slider">
          <div className="price-input">
            <input type="text" id="minamount" />
            <input type="text" id="maxamount" />
          </div>
        </div>
      </div>
    </div>
  );
}
