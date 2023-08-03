import {React, useState} from 'react'
import { Button, Input, Steps, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { searchItems } from '../apiCalls/searchItems';
import GlobalSuplierItemsCard from './GlobalSuplierItemsCard';

const GlobalSupplierSearch = () => {
  const [searchKeyword, setSearchKeywork] = useState('')
  const [openGlobalSuplierCard, setOpenGlobalSuplierCard] = useState(false)
  const [items, setitems] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate=useNavigate()


  const onChange = (e) => {
    setSearchKeywork(e.target.value);
  };

  const handleSearchClick = async (event) => {
    event.preventDefault()
    if (searchKeyword.length > 2 ) {
        try {
          setLoading(true)
            const items = await searchItems(searchKeyword);
            const filteredItems= items.map(item => {
              return { 
                ProviderType: item.ProviderType,
                OriginalTitle: item.OriginalTitle,
                VendorName: item.VendorName,
                MainPictureUrl: item.MainPictureUrl,
                Price: item.Price.OriginalPrice,
                OriginalCurrencyCode: item.Price.OriginalCurrencyCode,
                location: {
                  city: item.Location.City,
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

  return (
    <>
    {!openGlobalSuplierCard && <div className="job-search-container">
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
                  placeholder="Search"
                  value={searchKeyword}
                  name="searchItems"
                  onChange={onChange}
                ></Input>
              ),
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
          {/* {location.pathname.includes("taobao") && <div className="d-flex mx-4 my-3 w-75"> <Input  style={{maxWidth:400}} value={search} onChange={(e)=>{setSerach(e.target.value)}}/> <Button onClick={fetchProducts} className="mx-1">Search</Button></div>} */}
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