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
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Dropdown } from "antd";

function ProductCardTaoBao({ item }) {
 const navigate=useNavigate()
  const handleCardClick=(id)=>{
    navigate(`details/${id}`)

  }
  const { title, price, sales, pic,num_iid } =
    item;
  return (
    <MDBContainer className="my-4" style={{ width: "300px" }} onClick={()=>{
      handleCardClick(num_iid)
    }}>
      <MDBCard className="text-black">
        <MDBIcon fab icon="apple" size="lg" />
        <MDBCardImage
          src={"https:"+pic}
          // position="top"
          height={250}
          alt="Apple Computer"
        />
        <MDBCardBody>
          <div className="text-start">
            <strong>
            
              {title.length>20?title.slice(0,27)+"...":title}
            </strong>
          </div>
          <div>
            <div className="d-flex justify-content-between">
              <span>Price</span>
              <span>{price+"$"}</span>
            </div>
            <div className="d-flex justify-content-between">
             Sales: <span style={{color:"green"}}>{sales}</span>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default ProductCardTaoBao;
