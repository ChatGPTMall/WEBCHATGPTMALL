import React, { useContext, useEffect, useState } from "react";
import { getStocks } from "../apiCalls/stocks";
import { Input, Table } from "antd";
import { Context } from "../context/contextApi";
import { useNavigate } from "react-router-dom";

function Stocks() {
  const [data, setData] = useState();
  const [dataCopy, setDataCopy] = useState();
  const [search, setSearch] = useState();
const navigate=useNavigate()
  const { loading, setLoading } = useContext(Context);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
    },

    {
      title: "Currency",
      dataIndex: "currency",
    },
    {
      title: "Exchange",
      dataIndex: "exchange",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
  ];
  const fetchStockData = async () => {
    try {
      
    
    setLoading(true);
    const res = await getStocks();
    setLoading(false);
    setData(res.data);
    setDataCopy(res.data);
  } catch (error) {
      
  }
  };
  const searchData = () => {
    const filterData = data?.filter((stock) => {
      return stock.name.toUpperCase().includes(search.toUpperCase());
    });
    setDataCopy(filterData);
  };
  useEffect(() => {
    fetchStockData();
  }, []);
  useEffect(() => {
    searchData();
  }, [search]);
  const handleRowClick = (record) => {
    navigate(`${record.symbol}/analysis`)
    console.log('Clicked row:', record);
    // Perform any actions you want with the clicked row data
  };

  const rowProps = (record) => ({
    onClick: () => handleRowClick(record),
  });
  return (
    <div className="stocks-container p-5">
      <Input
        style={{ width: "250px" }}
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {
        <Table
          columns={columns}
          pagination={{ pageSize: 10 }}
          loading={loading}
          dataSource={dataCopy}
          onRow={rowProps}
        />
      }
    </div>
  );
}

export default Stocks;
