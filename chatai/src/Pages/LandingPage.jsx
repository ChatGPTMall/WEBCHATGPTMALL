import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";

function LandingPage() {
  const [featuredVideo, setFeaturedVideo] = useState();
  // const [signUp, setSignUp] = useState(false);
  // const [login, setLogin] = useState(false);
  // const handleSignUp = () => {
  //   setSignUp(true)
  // }

  useEffect(() => {
    axios
      .get("https://chatgptmall.tech/api/v1/home/feature/")
      .then((res) => {
        setFeaturedVideo(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                <button className="shadow-md w-fit px-4 py-2 rounded-md font-Poppins font-medium text-xl text-primaryBlue border-2 border-primaryBlue mt-2 hover:bg-primaryBlue hover:text-white ">
                  Try for Free
                </button>
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
        </section>
      </div>
      {/* )} */}
    </>
  );
}

export default LandingPage;
