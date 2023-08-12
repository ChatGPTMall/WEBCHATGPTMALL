import {React, useEffect, useState} from 'react'
import { Button, Input, Select, Steps, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { searchSuplierItems } from '../apiCalls/searchSuplierItems';
import GlobalSuplierItemsCard from './GlobalSuplierItemsCard';
import {detectTextLanguage}  from '../apiCalls/detectTextLanguage'
import {getTranslatedText}  from '../apiCalls/getTranslatedText'
import { getLanguages } from '../apiCalls/getLanguages';

const GlobalSupplierSearch = () => {
  const [searchKeyword, setSearchKeywork] = useState('')
  const [openGlobalSuplierCard, setOpenGlobalSuplierCard] = useState(false)
  const [items, setitems] = useState([])
  const [loading, setLoading] = useState(false)
  const [languages, setLanguages] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [languageCode, setLanguageCode] = useState('')

  const navigate=useNavigate()

  useEffect(() => {
    handleSearchClick(searchKeyword)
    const getLanguage = async () => {
      const languages = await getLanguages()
      console.log('languages', [languages])
      setLanguages([languages])
    }
    getLanguage()
  }, [])

  const onChangeInputValue = async(e) => {
    setSearchKeywork(e.target.value);
    const languageCode = await detectTextLanguage(e.target.value)
    const translatedText = await getTranslatedText(languageCode,e.target.value)
    setTranslatedText(translatedText)
    setLanguageCode(languageCode)
  };

  const handleSearchClick = async () => {
    if (searchKeyword.length > 2 ) {
        try {
          setLoading(true)
            const items = await searchSuplierItems(searchKeyword, selectedLanguage);
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
    setSelectedLanguage(value)
  }

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
              <Select
                style={{ width: 230 }}
                placeholder="Select Language"
                options={languages}
                onChange={(value) => handleLanguageChange(value)}
              />)
            },{
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
                <Input
                  readOnly ={true}
                  style={{ width: 230 }}
                  placeholder="Translated Text"
                  value={translatedText}
                  name="translated text"
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
         <div className="d-flex flex-wrap  ">
            <GlobalSuplierItemsCard  items = {items} language = {selectedLanguage}/>
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