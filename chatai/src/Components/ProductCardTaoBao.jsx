import { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "axios";
import {
  MDBModal,
  MDBBtn,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";

function ProductCardTaoBao({ item }) {
  const [centredModal, setCentredModal] = useState(false);
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const getCommunities = async () => {
    try {
      await axios
        .get("https://chatgptmall.tech/api/v1/home/communities/")
        .then((res) => {
          setCommunities(res?.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCommunities();
  }, []);

  const toggleShow = () => setCentredModal(!centredModal);
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`details/${id}`);
  };
  const { title, price, sales, pic, num_iid } = item;
  // console.log(communities, "these are the communities");

  return (
    <MDBContainer className="my-4" style={{ width: "300px" }}>
      <MDBCard className="text-black">
        <MDBIcon fab icon="apple" size="lg" />
        {pic && (
          <MDBCardImage
            src={`https:${pic}`}
            height={250}
            width={300}
            alt="Apple Computer"
          />
        )}
        <MDBCardBody>
          <div
            className="text-start"
            onClick={() => {
              handleCardClick(num_iid);
            }}
          >
            <strong>
              {title.length > 20 ? title.slice(0, 27) + "..." : title}
            </strong>
          </div>
          <div>
            <div className="d-flex justify-content-between">
              <span>Price</span>
              <span>
                {price == null || undefined
                  ? 0
                  : Math.round(price / 7.317108864)}{" "}
                CYN
              </span>
            </div>
            <div className="d-flex justify-content-between">
              Sales: <span style={{ color: "green" }}>{sales}</span>
            </div>
            <div>
              <MDBBtn onClick={toggleShow} className="bg-white text-textColor">
                Upload to Shop
              </MDBBtn>
              {centredModal && (
                <MDBModal
                  tabIndex="-1"
                  show={centredModal}
                  setShow={setCentredModal}
                >
                  <MDBModalDialog centered className="z-0">
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle>Select Communities</MDBModalTitle>
                        <MDBBtn
                          className="btn-close"
                          color="none"
                          onClick={toggleShow}
                        ></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody className="h-96">
                        <select
                          name="communities"
                          className="w-96"
                          value={selectedCommunity?.name}
                          onChange={(e) => {
                            const selectedCommunity = communities.find(
                              (community) => community.name === e.target.value
                            );
                            setSelectedCommunity(selectedCommunity);
                          }}
                        >
                          <option value="" selected disabled>
                            Select a community
                          </option>
                          {Array.isArray(communities) &&
                            communities?.map((el, index) => {
                              return (
                                <option value={el?.name} key={index}>
                                  <img src={el?.logo} alt="logo" />
                                  {el?.name}
                                </option>
                              );
                            })}
                        </select>
                      </MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={toggleShow}>
                          Close
                        </MDBBtn>
                        <MDBBtn>Save changes</MDBBtn>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
              )}
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default ProductCardTaoBao;
