import { Input, Select, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import {
  curCalculate,
  getCurrencies,
  getCurrencyRates,
} from "../apiCalls/currencies";
import { Context } from "../context/contextApi";

function Currencies() {
  const [allCurrencies, setAllCurrencies] = useState();
  const [curRates, setCurRates] = useState();
  const [curRatesCopy, setCurRatesCopy] = useState();

  const [activeCur, setActiveCur] = useState("USD");
  const [from, setFrom] = useState(activeCur);
  const [to, setTo] = useState();
  const [result, setResult] = useState();
  const [amount, setAmount] = useState(0);


  const { loading, setLoading } = useContext(Context);
  const columns = [
    {
      title: "Currency",
      dataIndex: "currency",
    },

    {
      title: "Rate",
      dataIndex: "rate",
      render: (value) => {
        return <span style={{ color: "#29f505" }}>{value}</span>;
      },
    },
  ];
  const fetchAllCurrencies = async () => {
    try {
      setLoading(true);

      const allCur = await getCurrencies();
      const allCurRates = await getCurrencyRates(
        activeCur,
        allCur.map(({ key }) => key).join()
      );

      setCurRates(allCurRates);
      setCurRatesCopy(allCurRates);

      setAllCurrencies(allCur);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const calculator = async (amount) => {
    try {
      const result = await curCalculate(from, to, amount);
      console.log(result);
      setResult(result.result);
    } catch (error) {}
  };
  const searchData = (search) => {
    const filterData = curRates?.currencies?.filter((cur) => {
      return cur.currency.toUpperCase().includes(search.toUpperCase());
    });
    setCurRatesCopy({ ...curRates, currencies: filterData });
  };
  useEffect(() => {
    fetchAllCurrencies();
  }, [activeCur]);
  useEffect(()=>{
calculator(amount)
  },[to,from])
  return (
    <div className="currencies-container  px-5">
      <div className="row">
        <div className="col-7">
          <div className="d-flex justify-content-between w-100 py-3 px-5">
            <div>
              <Select
                style={{ width: "120px" }}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                defaultValue={activeCur}
                onChange={(value) => {
                  setActiveCur(value);
                }}
                options={allCurrencies?.map(({ key }) => ({
                  label: key,
                  value: key,
                }))}
              ></Select>
              <Input
                style={{ width: "250px" }}
                placeholder="Search"
                className="mx-3"
                onChange={(e) => {
                  searchData(e.target.value);
                }}
              />
            </div>
            <div>Date: {curRates?.date}</div>
          </div>
          <Table
            columns={columns}
            className="stocks-table px-5"
            pagination={{ pageSize: 10 }}
            loading={loading}
            dataSource={curRatesCopy?.currencies}
            //   onRow={rowProps}
          />
        </div>
        <div className="col-5">
          <div className="d-flex pt-5 align-items-center">
            <div>
              <span >From</span>
              <Select
              style={{ width: "100px" }}

          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
                placeholder="From"

                className="mx-2"
                onChange={(value) => {
                  setFrom(value);
                }}
                options={allCurrencies?.map(({ key }) => ({
                  label: key,
                  value: key,
                }))}
              />
            </div>
            <div>
              <span className="mx-1">To</span>
              <Select
              style={{ width: "100px" }}
              className="mx-2"
                placeholder="to"
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                onChange={(value) => {
                  setTo(value);
                }}
                options={allCurrencies?.map(({ key }) => ({
                  label: key,
                  value: key,
                }))}
              />
            </div>

            <Input
              type="number"
              placeholder="amount"
              value={amount}
              style={{ width: "120px" }}
              onChange={(e) => {
                setAmount(e.target.value)
                calculator(e.target.value);
              }}
            />
            <span className="mx-2">=</span>
            <span>{result?.toFixed(2)} {result && to}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Currencies;
