import {React, useState, useContext} from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import {Modal, Button} from "antd";
import getVendorDetailsApi from './../apiCalls/getVendorDetailsApi'
import VendorProfileCard from "./VendorProfileCard";
import {ocrImageDetails} from "./../apiCalls/ocrImageDetails"
import { Context } from "../context/contextApi";

  

function GlobalSuplierItemsCard( props ) {
  const [vendorDetails, setVendorDetails] = useState([])
  const [imageDetails, setImageDetails] = useState()
  const [vendorCard, setVendorCard] = useState(false)
  const {loading, setLoading } = useContext(Context);

  const [ocrDetailsModal, setOcrDetailsModal] = useState(false)

  const handleVendorCard = async (id) => {
   const vendorDetails = await getVendorDetailsApi(id)
   setVendorDetails(vendorDetails)
   setVendorCard(true)
  }

 const handleClose = () => {
  setVendorCard(false)
 }

 const handleCancleClick = () => {
  setOcrDetailsModal(false)
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

  const handleOcrClick = async (url) => {
    setLoading(true)
    const response = await ocrImageDetails(url)
    setImageDetails(response)
    setOcrDetailsModal(true)
    setLoading(false)
  }

  if (ocrDetailsModal) {
    return (
    <div className="d-flex justify-content-between align-items-center">
    <Modal
      className="w-75"
      title=""
      open={true}
      onOk={handleCancleClick}
      okText=""
      onCancel={handleCancleClick}
        >
         <div className="row">
            {imageDetails}
          </div>
        </Modal>
        </div>
)
  }

  return ( 
      props.items.map((items, index) => 
      <>
        <MDBContainer key= {index} className="my-4" style={{ width: "300px" }}>
            <MDBCard className="text-black">
              <MDBIcon fab icon="apple" size="lg" />
              <Button loading={loading} style={{color: 'white',width: 100, backgroundColor: "Blue", marginLeft: '63%' }} onClick={() => handleOcrClick(items.MainPictureUrl)}>
                  OCR
                </Button>
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
          </>
      )
    )}

export default GlobalSuplierItemsCard;
