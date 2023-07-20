import React, { useEffect, useState } from "react";
import { getCategories, getRegions } from "../apiCalls/retailer";
import { Button, Input, Select, Steps } from "antd";
import { useNavigate } from "react-router-dom";

function GlobalRetailerForm() {
  const [current, setCurrent] = useState(0);
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
const navigate=useNavigate()
const fetchCat = async (catg) => {
    try {
        const cat = await getCategories(catg);
    setCategories(cat);
    } catch (error) {
        
    }
    
  };
  const fetchRegions = async () => {
    try {
        const reg = await getRegions();
    setCountries(reg);
    } catch (error) {
        
    }
    
  };
  useEffect(() => {
    fetchRegions();
   
  }, []);
  return (
    <div className="global-retailer-form-container">
      <Steps
        direction="vertical"
        progressDot
        className="p-5 d-flex align-items-center justify-content-center"
        current={current}
        //   status={stepStatus}
        items={[
          {
            
            title: (
              <Select
                style={{ width: 230 }}
                placeholder="Select Country"
                options={countries}
                // value={selectedCountry}
                onChange={(value) => {
                  setSelectedCountry(value);
                  fetchCat(value)
                  setCurrent(1)
                }}
              />
            ),
          },
          {
            title: (
              <Select
                style={{ width: 230 }}
                placeholder="Select Category"
                disabled={selectedCountry.length>1?false:true}
                options={categories}
                onChange={(value) => {
                  setSelectedCategory(value);
                  setCurrent(2)
                }}
              />
            ),
          },
          {
            title: (
              <Button
                disabled={
                  selectedCategory.length > 1 && selectedCountry.length > 1
                    ? false
                    : true
                }
                style={{ width: 230,color:"gray" }}
                onClick={() => {navigate("products",{state:{country:selectedCountry,category:selectedCategory}})}}
              >
                Search
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}

export default GlobalRetailerForm;
