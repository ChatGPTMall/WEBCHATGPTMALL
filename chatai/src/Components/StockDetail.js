import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStockDetails } from "../apiCalls/stocks";
import { CandleChart } from "./Charts/CandleChart";
import { Context } from "../context/contextApi";
import { Select } from "antd";

function StockDetail() {
  const { loading, setLoading } = useContext(Context);
  const [data, setData] = useState();
  const [interval, setInterval] = useState("1day");
  const params = useParams();
  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await getStockDetails({
        symbol: params.symbol,
        interval: interval,
      });
      setData(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, [interval]);
  const handleChange = (value) => {
    setInterval(value.key); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };
  return (
    <div className="stock-detail-container d-flex justify-content-center flex-column">
      <div className="d-flex justify-content-end">
        <div>
          <span className="mx-2">Interval</span>
          <Select
            labelInValue
            defaultValue={interval}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              {
                value: "1min",
                label: "1min",
              },
              {
                value: "5min",
                label: "5min",
              },
              {
                value: "15min",
                label: "15min",
              },
              {
                value: "30min",
                label: "30min",
              },
              {
                value: "45min",
                label: "45min",
              },
              {
                value: "1h",
                label: "1hour",
              },
              {
                value: "2h",
                label: "2hour",
              },
              {
                value: "4h",
                label: "4hour",
              },
              {
                value: "1day",
                label: "1day",
              },
              {
                value: "1week",
                label: "1week",
              },
              {
                value: "1month",
                label: "1month",
              },
            ]}
          />
        </div>
      </div>

      <CandleChart data={data} />
    </div>
  );
}

export default StockDetail;
