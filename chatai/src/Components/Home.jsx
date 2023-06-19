import { React } from "react";
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
export default function Home() {
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
              path="/create-licenses"
              element={
                <>
                  <LeftNav></LeftNav>
                  <CreateLicene></CreateLicene>
                </>
              }
            />
            <Route path="/:segment1/room/:id" element={<Room />} />
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
              path="/:segment1/customer_support/room/:id"
              element={
                <>
                
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
