import { SearchOutlined } from '@ant-design/icons'
import React from 'react'

function CustomSearch({ setSearch, search,...props }) {
    return (

        <div className='w-50 position-relative custom_search'>

            <input {...props}  className='w-100 px-4 py-2' value={search} style={{ height: 50, fontSize: 22, borderRadius: 20, border: "2px solid #076ec3" }}  onChange={(e) => setSearch(e.target.value)} />
            <SearchOutlined className='position-absolute' style={{ top: 18, right: 20 }} />
        </div>

    )
}

export default CustomSearch