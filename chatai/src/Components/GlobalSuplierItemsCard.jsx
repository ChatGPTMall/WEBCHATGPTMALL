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

function GlobalSuplierItemsCard( props ) {
//  const navigate=useNavigate()
  // const handleCardClick=(id)=>{
  //   navigate(`details/${id}`)

  // }
  console.log('i m here', props.items)
  // const { ProviderType, OriginalTitle, VendorName, MainPictureUrl,Price,OriginalCurrencyCode,location } = item;
  return (
   props.items.map(data => {
    return (
      <div className="container" key={data.OriginalTitle}>
      <div className="card">
        <img src={data.MainPictureUrl} alt="Product Image" />
        <h3>{data.OriginalTitle}</h3>
        <p>Provider Type: {data.ProviderType}</p>
        <p>Vendor Name: {data.VendorName}</p>
        <p>Price: {data.Price} {data.OriginalCurrencyCode}</p>
        <p>Location: {data.location.city}, {data.location.State}</p>
      </div>
      </div>
    );
// <MDBContainer className="my-4" style={{ width: "300px" }} onClick={()=>{
//       // handleCardClick(num_iid)
//     }}>
//       <MDBCard className="text-black">
//         <MDBIcon fab icon="apple" size="lg" />
//         <MDBCardImage
//           src={"https:"+item.MainPictureUrl}
//           // position="top"
//           height={250}
//           alt="item"
//         />
//         <MDBCardBody>
//           <div className="text-start">
//             <strong>
//               {item.OriginalTitle}
//             </strong>
//           </div>
//           <div>
//             <div className="d-flex justify-content-between">
//               <span>Price</span>
//               <span>{item.Price+"CYN"}</span>
//             </div>
//             <div className="d-flex justify-content-between">
//              Sales: <span style={{color:"green"}}>{item.VendorName}</span>
//             </div>
//           </div>
//         </MDBCardBody>
//       </MDBCard>
//     </MDBContainer>
   }) 
  );
}

export default GlobalSuplierItemsCard;
