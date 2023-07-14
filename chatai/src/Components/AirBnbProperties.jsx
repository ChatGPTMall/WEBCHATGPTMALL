import React, { useContext, useEffect } from 'react'
import { Context } from '../context/contextApi';
import { Rate, Table } from 'antd';
import { useLocation } from 'react-router-dom';
import { searchProperty } from '../apiCalls/airbnb';

function AirBnbProperties() {
  const { loading, setLoading,anbProperties,setAnbProperties } = useContext(Context);
const {state}=useLocation()
const fetchProperties = async () => {
    try {
        if(state){
      setLoading(true)

          const properties = await searchProperty(state);
          setAnbProperties(properties)
          setLoading(false)
         
          
        }
        } catch (error) {
            setLoading(false)
            
        }
        
  };
useEffect(()=>{
fetchProperties()
},[state])

    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'City',
          dataIndex: 'city',
          key: 'city',
        },
        {
          title: 'Beds',
          dataIndex: 'beds',
          key: 'beds',
        },
        {
          title: 'Bedrooms',
          dataIndex: 'bedrooms',
          key: 'bedrooms',
        },
        {
          title: 'Bathrooms',
          dataIndex: 'bathrooms',
          key: 'bathrooms',
        },
        {
          title: 'Space Type',
          dataIndex: 'spaceType',
          key: 'spaceType',
        },
        {
          title: 'Rating',
          dataIndex: 'starRating',
          key: 'starRating',
          render:(value)=>{
            return <Rate allowHalf  value={value}   />
          }
        },
      ];
  return (
    <div className='air-bnb-properties-container'>
      <div>
      <Table
            columns={columns}
            className=" px-5"
            pagination={{ pageSize: 10 }}
            loading={loading}
            dataSource={anbProperties}
            //   onRow={rowProps}
          />
      </div>
    </div>
  )
}

export default AirBnbProperties
