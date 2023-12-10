"use client";

import { getQueryProduct } from "@/utils/query-path";
import { useRouter, useSearchParams } from "next/navigation";
import { RangeSlider } from "rsuite";
import { Range } from "rsuite/esm/RangeSlider/RangeSlider";

export default function Price(props: any) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChangeRange = (values: Range) => {
    const query = getQueryProduct(searchParams);
    query.range_price = values.join(",");
    router.push("/product?" + new URLSearchParams(query));
  };
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
        <RangeSlider
          onChangeCommitted={onChangeRange}
          defaultValue={[0, 1000]}
          min={0}
          max={1000}
          step={10}
        />
      </div>
    </div>
  );
}
