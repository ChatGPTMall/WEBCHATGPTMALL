import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBIcon,
} from "mdb-react-ui-kit";
  

function GlobalSuplierItemsCard( props ) {

 
//  const navigate=useNavigate()
  // const handleCardClick=(id)=>{
  //   navigate(`details/${id}`)

  // }
  // const { ProviderType, OriginalTitle, VendorName, MainPictureUrl,Price,OriginalCurrencyCode,location } = item;
  return (
      props.items.map((items, index) =>
       <MDBContainer key= {index} className="my-4" style={{ width: "300px" }} onClick={()=>{
            // handleCardClick(num_iid)
          }}>
            <MDBCard className="text-black">
              <MDBIcon fab icon="apple" size="lg" />
              <MDBCardImage
                src={items.MainPictureUrl}
                position="top"
                height={250}
                alt={items.OriginalTitle}
              />
              <MDBCardBody>
                <div className="text-start">
                  <strong>
                    {items.OriginalTitle}
                  </strong>
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <span>Price</span>
                    <span>{items.Price+"CYN"}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                  Sales: <span style={{color:"green"}}>{items.VendorName}</span>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
      )
  );
}

export default GlobalSuplierItemsCard;
