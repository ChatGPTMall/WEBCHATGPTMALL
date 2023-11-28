import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../apiCalls/appService";
import { Context } from "../context/contextApi"
import { getCreditHistory } from "../apiCalls/getCreditHistory";

const Usage = () => {
    const {
        user
    } = useContext(Context);
    const fetchCreditHistory = async () => {
        try {
            await getCreditHistory()
        } catch (error) {

        }
    }
    useEffect(()=>{
        if(user){

            fetchCreditHistory()
        }
    },[user])
    return (
        <>
            <div className="flex flex-col w-full">
                <Header />
                <section className="container h-auto">
                    <div className="flex justify-between items-center w-full ">
                        hui
                    </div>
                </section>
            </div>
        </>
    )
}

export default Usage
