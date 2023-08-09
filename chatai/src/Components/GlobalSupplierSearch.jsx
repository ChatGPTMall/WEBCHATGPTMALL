import {React, useEffect, useState} from 'react'
import { Button, Input, Select, Steps, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { searchSuplierItems } from '../apiCalls/searchSuplierItems';
import GlobalSuplierItemsCard from './GlobalSuplierItemsCard';

const GlobalSupplierSearch = () => {
  const [searchKeyword, setSearchKeywork] = useState('')
  const [openGlobalSuplierCard, setOpenGlobalSuplierCard] = useState(false)
  const [items, setitems] = useState([])
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('');

  const navigate=useNavigate()

  useEffect(() => {
    handleSearchClick(searchKeyword)
  }, [])

  const onChangeInputValue = (e) => {
    setSearchKeywork(e.target.value);
  };

  const handleSearchClick = async () => {
    if (searchKeyword.length > 2 ) {
        try {
          setLoading(true)
            const items = await searchSuplierItems(searchKeyword, language);
            const filteredItems= items.map(item => {
              return { 
                ProviderType: item.ProviderType,
                Title: item.Title,
                VendorName: item.VendorName,
                VendorId: item.VendorId,
                MainPictureUrl: item.MainPictureUrl,
                Price: item.Price.OriginalPrice,
                OriginalCurrencyCode: item.Price.OriginalCurrencyCode,
                Location: {
                  City: item.Location.City,
                  State: item.Location.State
                }}
              })
              setitems(filteredItems)
              setLoading(false)
              setOpenGlobalSuplierCard(true)
         
        } catch (error) {
          navigate(-1)
  
        }
    }
  };

  const handleLanguageChange = (value) => {
    setLanguage(value)
  }

 const languages = [
    {label: 'English', value: 'en'},
    {label: 'Chinese(PRC)', value: 'zh-CN'},
    {label: 'Spanish', value: 'es'},
    {label: 'Chinese (Taiwan)', value: 'zh-TW'}
 ]

  return (
    <>
    {!openGlobalSuplierCard && 
    <div className="job-search-container">
      <h1 className="p-5 text-center">Find Your Suplier Today</h1>
      <div className="p-5">
        <Steps
          direction="vertical"
          progressDot
          className="p-5 d-flex align-items-center justify-content-center"
          items={[
            {
              title: (
                <Input
                  style={{ width: 230 }}
                  placeholder="Search item"
                  value={searchKeyword}
                  name="searchItems"
                  onChange={onChangeInputValue}
                ></Input>
              ),
            },
            {
              title: (
              <Select
                style={{ width: 230 }}
                placeholder="Select Language"
                disabled={searchKeyword.length>1?false:true}
                options={languages}
                onChange={(value) => handleLanguageChange(value)}
              />)
            },
            {
              title: (
                <Button style={{ width: 230 }} onClick={handleSearchClick}>
                  Search
                </Button>
              ),
            },
          ]}
        />
      </div>
    </div>
    }
    <div>
    {openGlobalSuplierCard &&
      <div className="global-retailer-container overflow-scroll">
      {loading ? (
        <div className="d-flex align-items-center justify-content-center">
          <Spin></Spin>
        </div>
      ) : (
        <div className="d-flex flex-wrap  ">
         <div className="d-flex flex-wrap  ">
            <GlobalSuplierItemsCard  items = {items}/>
        </div>
     </div>
      )}
    </div>
    }
    </div>
    </>
  )
}

export default GlobalSupplierSearch