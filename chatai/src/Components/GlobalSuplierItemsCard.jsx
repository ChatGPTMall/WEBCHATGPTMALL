import {React, useState} from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  Input,
  Modal,
  Tag,
  Button
} from "antd";
import { toast } from "react-toastify";
import networkingIcon from "../assets/networking.png";
import getVendorDetailsApi from './../apiCalls/getVendorDetailsApi'
import VendorProfileCard from "./VendorProfileCard";

  

function GlobalSuplierItemsCard( props ) {
  const [vendorDetails, setVendorDetails] = useState([])
  const [vendorCard, setVendorCard] = useState(false)
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

  const handleOcrClick = () => {
    console.log('clicked...')
    setOcrDetailsModal(true)
  }

  if (ocrDetailsModal) {
     return (
      <div>
      <div className="d-flex justify-content-between align-items-center">
      <Modal
        className="w-75"
        title="ocrDetailsModal"
        open={true}
        onOk={() => ''}
        okText="Share"
        onCancel={handleCancleClick}
          >
            <div className="">
              <div className="row">
                <div
                  className="col-6 d-flex  flex-column"
                  style={{ borderRight: "1px solid gray" }}
                >
                  <h4 className="my-2">Share Room Access</h4>
                  <p className="my-2">
                  Share Access With Email
                  </p>
                  <div className="d-flex align-items-center justify-content-center py-3 mt-3">
                    <img
                      src={networkingIcon}
                      height={250}
                      width={250}
                      alt="icon"
                    />
                  </div>
                </div>
                <div className="col-6 py-3 px-4">
                  <div className="mt-5">
                    {/* {emails.map((email, index) => (
                      <Tag
                        key={index}
                        style={{ color: getRandomColor() }}
                        closable
                        size="large"
                        onClose={() => handleTagClose(email)}
                      >
                        {email}
                      </Tag>
                    ))}
                  </div>
                  <div>
                  <Input
                    className="my-3"
                    placeholder="Add Email"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                   /> */}
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          </div>
          </div>
     )
  }

  return ( 
      props.items.map((items, index) => 
      <>
         <MDBContainer key= {index} className="my-4" style={{ width: "300px" }}>
            <MDBCard className="text-black">
              <MDBIcon fab icon="apple" size="lg" />
              <Button style={{color: 'white',width: 100, backgroundColor: "Blue", marginLeft: '63%' }} onClick={handleOcrClick}>
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
