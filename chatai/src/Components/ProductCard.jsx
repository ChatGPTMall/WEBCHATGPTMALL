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
import { Button, Dropdown } from "antd";
function ProductCard({ item }) {
  const { name, price, stock, images, logoPicture, rgbColors, variantSizes } =
    item;
  return (
    <MDBContainer className="my-4" style={{ width: "230px" }}>
      <MDBCard className="text-black">
        <MDBIcon fab icon="apple" size="lg" />
        <MDBCardImage
          src={images[0].baseUrl}
          // position="top"
          height={180}
          alt="Apple Computer"
        />
        <MDBCardBody>
          <div className="text-start">
            <strong>
              {name.length > 12 ? name.slice(0, 10) + "..." : name}
            </strong>
          </div>
          <div>
            <div className="d-flex justify-content-between">
              <span>Price</span>
              <span>{price.formattedValue}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Colors</span>

              <div className="d-flex align-items-center">
                {rgbColors.map((color) => {
                  return (
                    <div
                      style={{
                        backgroundColor: color,
                        height: 10,
                        width: 10,
                        borderRadius: "50%",
                        marginInline: 2,
                        border: "1px solid",
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <span>
                {stock.stockLevel < 4 ? (
                  stock.stockLevel == 0 ? (
                    <span style={{ color: "red" }}>
                    out of stock
                    </span>
                  ) : (
                    <span style={{ color: "red" }}>
                      only {stock.stockLevel} left
                    </span>
                  )
                ) : (
                  <span style={{ color: "green" }}>In Stock</span>
                )}
              </span>
              <div className="d-flex" style={{ width: 50 }}>
                {variantSizes.length > 0 && (
                  <Dropdown
                    menu={{
                      items: variantSizes.map((size) => {
                        return {
                          key: size.orderFilter,
                          label: <span>{size.filterCode}</span>,
                        };
                      }),
                    }}
                    placement="bottom"
                    arrow
                  >
                    <Button type="link">Sizes</Button>
                  </Dropdown>
                )}
              </div>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default ProductCard;
