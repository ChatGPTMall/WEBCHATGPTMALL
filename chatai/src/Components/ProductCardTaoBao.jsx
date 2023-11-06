import { useEffect, useState } from "react";
import axios from "axios";
import { MDBModal } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../apiCalls/appService";

function ProductCardTaoBao({ title, pic, price, sales, num_iid }) {
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [communities, setCommunities] = useState([]);
  const [selectedCommunities, setSelectedCommunities] = useState([]);
  const getCommunities = async () => {
    try {
      await axios
        .get("https://chatgptmall.tech/api/v1/home/communities/")
        .then((res) => {
          setCommunities(res?.data);
        });
    } catch (err) {}
  };
  useEffect(() => {
    getCommunities();
  }, []);

  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`details/${id}`);
  };

  const handleChange = (e) => {
    console.log(e.target.value)
    console.log(selectedCommunities);
    const does_exist = selectedCommunities.findIndex(
      (el) => el === e.target.value
    );
    if (e.target.checked && does_exist < 0) {
      selectedCommunities.push(e.target.value);
    }
    if (!e.target.checked && does_exist > -1) {
      
        selectedCommunities.filter((el) => el !== e.target.value)
      
    }
  };

  const postItem = async (Data) => {
    try {
      console.log(Data);
      const com = JSON.stringify(Data.communities);
      com.replace(/'/g, '"'); 
      const formData = new FormData();  // Create a new FormData instance
      
      const imageBlob = await fetch('https:' + pic).then((response) => response.blob());
      formData.append('image', imageBlob, `${Data.title}.jpg`);
      formData.append('title', Data.title);
      formData.append('price', 4);
      formData.append('category', Data.category);
      formData.append('communities', com);
  
      apiClient.postItems(formData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="my-4 flex flex-col border justify-between hover:shadow-md rounded-b-md items-center w-[350px] bg-white relative">
      <img
        src={`https://${pic}`}
        alt="pic"
        className="h-[250px] w-full text-primaryBlue"
      />
      <div className="px-2 py-3">
        <div>
          <p
            onClick={() => {
              handleCardClick(num_iid);
            }}
            className="font-medium text-primaryBlue hover:cursor-pointer hover:text-green-500"
          >
            {title}
          </p>
        </div>
        <div className="flex justify-between items-center ">
          <p className="font-medium font-Poppins text-primaryBlue">Sales</p>
          <p className="font-medium font-Poppins text-primaryBlue">{sales}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium font-Poppins text-primaryBlue">Price</p>
          <p className="font-medium font-Poppins text-primaryBlue">
            {price}
            CYN
          </p>
        </div>
        <button
          className="bg-gradient-to-r text-white from-cyan-500 to-blue-500 px-4 py-2 rounded-md hover:shadow-md font-medium font-Poppins"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Upload to Shop
        </button>
        {showDropdown && (
          <MDBModal tabIndex="-1" show={showDropdown} setShow={setShowDropdown}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-primaryBlue px-4 py-2 absolute rounded-md bg-white z-40 shadow-md">
                <p className="font-Poppins font-semibold text-lg">
                  Select Communities
                </p>
                {/* this is the showDropdown */}
                <div className="overflow-auto h-96">
                  {communities?.map((el, index) => {
                    return (
                      <>
                        <div className="flex" key={index}>
                          {" "}
                          <input
                            key={index}
                            type="checkbox"
                            className="px-3 py-2"
                            value={el?.name}
                            onChange={handleChange}
                          />
                          <label
                            className="px-3 py-2 text-sm font-Poppins"
                            key={index}
                            value=""
                          >
                            {el?.name}
                          </label>
                        </div>
                      </>
                    );
                  })}
                </div>

                <button
                  className="bg-gradient-to-r font-medium font-Poppins mt-5 text-white from-cyan-500 to-blue-500 px-4 py-2 rounded-md shadow-md"
                  onClick={() => {
                    postItem({
                      communities: selectedCommunities,
                      title: title,
                      price: parseInt(price),
                      category: "clothing",
                      image: pic,
                    });
                    setShowDropdown(!showDropdown);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </MDBModal>
        )}
      </div>
    </div>
  );
}

export default ProductCardTaoBao;
