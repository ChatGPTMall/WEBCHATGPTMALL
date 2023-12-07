import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../apiCalls/appService";
import { Context } from "../context/contextApi";
import { supplyChainWithAuth, supplyChainWithoutAuth } from "../apiCalls/supplyChain";
import SupplyChainCard from "../Components/SupplyChainCard";
import { Carousel } from "antd";

function LandingPage() {
  const [featuredVideo, setFeaturedVideo] = useState();
  const isLoggedIn = localStorage.getItem("is_active");
  const navigate = useNavigate();
  const {
    user
  } = useContext(Context);
  const slides = [];
    const cardsPerSlide = 8
  const tryForFree = () => {
    navigate("/login");
  };

  useEffect(() => {
    apiClient.Feature().then((response) => {
      setFeaturedVideo(response?.data);
    });
  }, []);

  const [loading, setLoading] = useState(true)
  const [supplyChain, setSupplyChain] = useState([])
  const fetchSupplyChain = async () => {
    try {
      const { data } = user?await supplyChainWithAuth():await supplyChainWithoutAuth()
      setSupplyChain(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)

    }

  }
  useEffect(() => {
    fetchSupplyChain()
  }, [user])
  const renderSlides = () => {
    ; // Number of cards to display per slide
    const totalSlides = Math.ceil(supplyChain.length / cardsPerSlide);
    for (let i = 0; i < totalSlides; i++) {
      const start = i * cardsPerSlide;
      const end = start + cardsPerSlide;
      const slideCards = supplyChain.slice(start, end);
      slides.push(
        <div className="d-flex flex-wrap gap-3  justify-content-between" key={`slide-${i}`}>
          {slideCards.map(({ community_id, name, logo, total_members ,has_joined}, index) => {
            return logo && <SupplyChainCard title={name} id={community_id} image={logo} members={total_members} has_joined={has_joined} index={index} page="home" />
          })}
        </div>
      );
    }

    return slides;
  };


  return (
    <>
      {/* {!signUp && !login && ( */}
      <div className="flex flex-col w-full">
        <Header />
        <section className="container h-auto">
          <div className="flex justify-between items-center w-full ">
            <div className=" flex w-full justify-between mt-28">
              <div className="flex flex-col w-[50%]">
                <p className="font-Poppins text-4xl w-fit leading-relaxed font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                  {featuredVideo?.title}
                </p>
                <p className="font-Poppins text-xl w-full font-medium leading-relaxed text-primaryBlue">
                  {featuredVideo?.description}
                </p>
                {user && <button
                  onClick={() => tryForFree()}
                  className="shadow-md w-fit px-4 py-2 rounded-md font-Poppins font-medium text-xl text-primaryBlue border-2 border-primaryBlue mt-2 hover:bg-primaryBlue hover:text-white "
                >
                  Try for Free
                </button>}
              </div>
              {featuredVideo ? (
                <div className="overflow-hidden shadow-lg w-fit h-fit rounded-2xl">
                  <video
                    width="600"
                    height="240"
                    controls
                    className=""
                    title={featuredVideo?.title}
                    allowFullScreen={false}
                  >
                    <source src={featuredVideo?.video} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <div className="w-10 h-4">
                  <img src={featuredVideo?.image} alt={featuredVideo?.title} />
                  <p>{featuredVideo?.title}</p>
                </div>
              )}

            </div>


          </div>

           <div className='mt-4'>
            <div className="py-5 d-flex justify-content-center ">
              <h1 className="text-primaryBlue font-semibold">Growth Networks</h1>
            </div>
          <Carousel autoplay speed={1000}>
            {renderSlides()}
          </Carousel>
          </div>
        </section>
      </div>
      {/* )} */}
    </>
  );
}

export default LandingPage;
