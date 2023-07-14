import { Button, DatePicker, Select, Steps } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCategory,
  getCurrency,
  getLanguages,
  searchProperty,
} from "../apiCalls/airbnb";
import { Context } from "../context/contextApi";

function AirBnb() {
  const [airBnbLang, setAirBnbLang] = useState([]);
  const [airBnbCur, setAirBnbCur] = useState([]);
  const [airBnbCtg, setAirBnbCtg] = useState([]);
  const navigate=useNavigate()
  const { loading, setLoading,anbProperties,setAnbProperties } = useContext(Context);
  const [current, setCurrent] = useState(0);

  const [activeLang, setActiveLang] = useState("");
  const [activeCur, setActiveCur] = useState("");
  const [activeCtg, setActiveCtg] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const apiCalls = async () => {
    try {
      if (!activeLang && !activeCur && !activeCtg) {
        const airBnbLanguages = await getLanguages();
        setAirBnbLang(airBnbLanguages);
      } else if (activeLang && !activeCur && !activeCtg) {
        const airBnbCurrency = await getCurrency();
        setAirBnbCur(airBnbCurrency);
      } else if (activeLang && activeCur && !activeCtg) {
        const airBnbCategory = await getCategory();
        setAirBnbCtg(airBnbCategory);
      }
    } catch (error) {}
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Month is zero-indexed
    const day = ("0" + date.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  const onCheckInChange = ({ $d }) => {
    setCheckIn(formatDate($d));
    setCurrent(4);
  };
  const onCheckOutChange = ({ $d }) => {
    setCheckOut(formatDate($d));
    setCurrent(5);
  };

  const handlePropertyClick = async () => {
    try {
      setLoading(true)
      const params = {
        language: activeLang,
        currency: activeCur,
        category: activeCtg,
        checkin: checkIn,
        checkout: checkOut,
      };
      const properties = await searchProperty(params);
      setAnbProperties(properties)
      setLoading(false)
      navigate("properties",{state:params})

    } catch (error) {
      setLoading(false)
      
    }
    
  };
  useEffect(() => {
    apiCalls();
  }, [activeLang, activeCtg, activeCur]);
  useEffect(() => {
    if (activeLang && !activeCur && !activeCtg && !checkIn && !checkOut) {
      setCurrent(1);
    } else if (activeLang && activeCur && !activeCtg && !checkIn && !checkOut) {
      setCurrent(2);
    } else if (activeLang && activeCur && activeCtg && !checkIn && !checkOut) {
      setCurrent(3);
    } else if (activeLang && activeCur && activeCtg && checkIn && !checkOut) {
      setCurrent(4);
    } else if (activeLang && activeCur && activeCtg && checkIn && checkOut) {
      setCurrent(5);
    }
  }, [activeLang, activeCur, activeCtg, checkIn, checkOut]);

  const description = <div className="my-4"></div>;
  const stepsStyle = {
    width: 300,
  };
  return (
    <div className="airbnb-container">
      <div className="p-5 ">
        <Steps
          direction="vertical"
          className="p-5 d-flex align-items-center justify-content-center"
          current={current}
          items={[
            {
              title: (
                <Select
                  style={stepsStyle}
                  showSearch
                  className=""
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  //   defaultValue={activeCur}
                  placeholder="Select Language"
                  onChange={(value) => {
                    setActiveLang(value);
                    setCurrent(0);
                  }}
                  options={airBnbLang}
                ></Select>
              ),
              description,
            },
            {
              title: (
                <Select
                  style={stepsStyle}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  //   defaultValue={activeCur}
                  placeholder="Select Currency"
                  disabled={current >= 1 ? false : true}
                  onChange={(value) => {
                    setActiveCur(value);
                    setCurrent(1);
                  }}
                  options={airBnbCur}
                ></Select>
              ),
              description,
            },
            {
              title: (
                <Select
                  style={stepsStyle}
                  disabled={current >= 2 ? false : true}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  //   defaultValue={activeCur}
                  placeholder="Select Category"
                  onChange={(value) => {
                    setActiveCtg(value);
                    setCurrent(2);
                  }}
                  options={airBnbCtg}
                ></Select>
              ),
              description,
            },
            {
              title: (
                <DatePicker
                  style={stepsStyle}
                  placeholder="Check In"
                  onChange={onCheckInChange}
                  format="YYYY-MM-DD"
                  clearIcon={false}
                  disabled={current >= 3 ? false : true}
                />
              ),
              description,
            },
            {
              title: (
                <DatePicker
                  style={stepsStyle}
                  placeholder="Check Out"
                  onChange={onCheckOutChange}
                  clearIcon={false}
                  disabled={current >= 4 ? false : true}
                  format="YYYY-MM-DD"
                />
              ),
              description,
            },

            {
              title: (
                <Button
                  style={{...stepsStyle,color:current >= 5 ? "black" : "gray"}}
                  disabled={current >= 5 ? false : true}
                  onClick={handlePropertyClick}
                  loading={loading}
                >
                  Search Property
                </Button>
              ),
              description,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default AirBnb;
