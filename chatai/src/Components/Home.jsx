import { React, useContext } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LeftNav from "../Components/LeftPanel";
import CenterNav from "../Components/CenterPanel";
import Settings from "../Components/Settings";
import License from "../Components/License";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateLicene from "../Components/CreateLicene";
import Room from "./Room";
import Supervisor from "./Supervisor";
import RoomHistory from "./RoomHistory";
import ViewItems from "./ViewItems";
import CustomerSupport from "./CustomerSupport";
import { Context } from "../context/contextApi";
import ItemDetailView from "./ItemDetailView";
import MessageDetailView from "./MessageDetailView";
import Stocks from "./Stocks";
import StockDetail from "./StockDetail";
import Currencies from "./Currencies";
import AirBnb from "./AirBnb";
import AirBnbProperties from "./AirBnbProperties";
import Jobs from "./Jobs";
import SearchJobs from "./SearchJobs";
import GlobalRetailer from "./GlobalRetailer";
import GlobalRetailerForm from "./GlobalRetailerForm";
import AIinput from "./AIinput";
import AIresponse from "./AIresponse";
import ThreeSixtyView from "./ThreeSixtyView";
import EtherConnect from "./EtherConnect";

import TaoBaoProductDetails from "./TaoBaoProductDetails";

export default function Home() {
  const {setIsValidKey,isValidKey}=useContext(Context)

  return (
    <>
      <BrowserRouter>
        <div className="App d-flex">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <LeftNav></LeftNav>
                  <CenterNav></CenterNav>
                </>
              }
            />
            <Route
              exact
              path="/settings"
              element={
                <>
                  <LeftNav></LeftNav>
                  <Settings></Settings>
                </>
              }
            />
            <Route
              exact
              path="/license"
              element={
                <>
                  <LeftNav></LeftNav>
                  <License></License>
                </>
              }
            />
            <Route
              exact
              path="items/view/:productId"
              element={
                <>
                  <ItemDetailView/>
                </>
              }
            />
            <Route
              path="/:id/history/details/:history_id"
              element={
                <>
                  <MessageDetailView/>
                </>
              }
            />
            <Route
              exact
              path="/create-licenses"
              element={
                <>
                  <LeftNav></LeftNav>
                  <CreateLicene></CreateLicene>
                </>
              }
            />
            <Route path="/:segment1/room/:id" element={<Room />} />
            <Route path="/:segment1/:id/stocks" element={<Stocks/>} />
            <Route path="/:segment1/:id/airbnb" element={<AirBnb/>} />
            <Route path="/:segment1/:id/jobs" element={<SearchJobs/>} />

            <Route path="/:segment1/:id/jobs/all" element={<Jobs/>} />

            <Route path="/:segment1/:id/airbnb/properties" element={<AirBnbProperties/>} />
            <Route path="/:segment1/:id/currencies" element={<Currencies/>} />
            <Route path="/:segment1/:id/ai_input" element={<AIinput/>} />
            <Route path="/:segment1/:id/three_sixty" element={<ThreeSixtyView/>} />
            <Route path="/:segment1/:id/ether_connect" element={<EtherConnect/>} />

            <Route path="/:segment1/:id/ai_input/response" element={<AIresponse/>} />

            <Route path="/:segment1/:id/global_retailer_handm" element={<GlobalRetailerForm/>} />
            <Route path="/:segment1/:id/global_retailer_handm/products" element={<GlobalRetailer/>} />
            <Route path="/:segment1/:id/global_retailer_taobao/products" element={<GlobalRetailer/>} />
            <Route path="/:segment1/:id/global_retailer_taobao/products/details/:num_id" element={<TaoBaoProductDetails/>} />
          
            <Route path="/:segment1/:id/stocks/:symbol/analysis/" element={<StockDetail/>} />
            <Route
              path="/:segment1/:id"
              element={
                <>
                  <LeftNav />
                  <CenterNav></CenterNav>
                </>
              }
            />
             <Route
              path="/:segment1/support/room/:id"
              element={
                <>
                
                {isValidKey && <LeftNav/>}
                 <CustomerSupport/>
                </>
              }
            />
            <Route
              path="/:segment1/:id/view-items"
              element={
                <>
                  <ViewItems />
                </>
              }
            />
             
            <Route path="/supervisor" element={<Supervisor />} />
            <Route path="/supervisor/room/history" element={<RoomHistory />} />
          </Routes>
        </div>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
