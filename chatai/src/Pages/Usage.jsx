import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../apiCalls/appService";
import { Context } from "../context/contextApi"
import { getCreditHistory } from "../apiCalls/getCreditHistory";
import { Button, Progress, Table } from "antd";

const Usage = () => {
    const [data, setData] = useState({ data: [], loading: true })
    const {
        user
    } = useContext(Context);
    const fetchCreditHistory = async () => {
        try {
            const { data } = await getCreditHistory()
            setData({ loading: false, data })
        } catch (error) {
            setData({ loading: false, data: [] })

        }
    }
    const conicColors = { '0%': '#87d068', '50%': '#ffe58f', '100%': '#ffccc7' };
    useEffect(() => {
        if (user) {

            fetchCreditHistory()
        }
    }, [user])
    const columns = [
        {
            title: 'Feature',
            dataIndex: 'feature',

        },
        {
            title: 'Debited On',
            dataIndex: 'added_on',
        },
        {
            title: 'Tokens',
            dataIndex: 'tokens',
        },
    ];

    return (
        <>
            <div className="flex flex-col usage-container w-full">
                <Header />
                <section className="container py-3">
                    <div className="row">
                        <div className="col-8">
                            <Table
                                className="w-100"
                                style={{ background: "white" }}
                                columns={columns}
                                loading={data.loading}
                                dataSource={data.data}
                                pagination={false}
                            />
                        </div>
                        <div className="col-4 align-items-center  px-2 my-3 gap-3 justify-content-center d-flex">
                            <Progress type="circle" percent={0} strokeWidth={12} strokeColor={conicColors} />
                            <div className="d-flex flex-column">
                                <strong>Credits: <span style={{ color: "#2A8AE5" }}>{user?.credits}</span></strong>
                                <button
                                    className="p-2 rounded-md font-Poppins bg-primaryBlue text-white "

                                >
                                    Increase Credits
                                </button>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Usage
