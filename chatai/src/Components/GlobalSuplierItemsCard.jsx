import {React, useState} from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import getVendorDetailsApi from './../apiCalls/getVendorDetailsApi'
import VendorProfileCard from "./VendorProfileCard";

  

function GlobalSuplierItemsCard( props ) {
  const [vendorDetails, setVendorDetails] = useState([])
  const [vendorCard, setVendorCard] = useState(false)

  const handleVendorCard = async (id) => {
   const vendorDetails = await getVendorDetailsApi(id)
   setVendorDetails(vendorDetails)
   setVendorCard(true)
  }

 const handleClose = () => {
  setVendorCard(false)
 }

  if (vendorCard) {
    return (
      <div className="d-flex flex-wrap  ">
      <div className="d-flex flex-wrap  ">
        <VendorProfileCard  open={vendorCard} onClose = {handleClose} vendorDetails = {vendorDetails}/>
      </div>
      </div>
    ) 
  }

  return ( 
      props.items.map((items, index) => 
         <MDBContainer key= {index} className="my-4" style={{ width: "300px" }}>
            <MDBCard className="text-black">
              <MDBIcon fab icon="apple" size="lg" />
              <MDBCardImage
                src={items.MainPictureUrl}
                position="top"
                height={250}
                alt={items.Title}
              />
              <MDBCardBody>
                <div className="text-start">
                  <strong>
                    {items.Title.length>20?items.Title.slice(0,27)+"...":items.Title}
                  </strong>
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <span>Price</span>
                    <span>{items.Price+"CYN"}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                  Vendor Name: <a href='#'><span style={{color:"blue"}} onClick={()=>{handleVendorCard(items.VendorId)}}>{items.VendorName}</span></a>
                  </div>
                  <div className="d-flex justify-content-between">
                  Provider Type: <span style={{color:"green"}}>{items.ProviderType}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                  City: <div style={{color:"green"}}>{items.Location.City}</div> 
                  </div>
                  <div className="d-flex justify-content-between">
                  State: <div style={{color:"green"}}>{items.Location.State}</div> 
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer> 
      )
    )}

export default GlobalSuplierItemsCard;
