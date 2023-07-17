import React, { useContext, useEffect, useState } from "react";
import { getJobs } from "../apiCalls/jobs";
import { Button, Input, Table } from "antd";
import Link from "antd/es/typography/Link";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/contextApi";

function Jobs() {
  const [loading,setLoading]=useState(true)
  const [jobs,setJobs]=useState([])
  const [jobsCopy,setJobsCopy]=useState([])

  const navigate=useNavigate()

  const {state}=useLocation()
  const fetchJobs = async () => {

    try {
      if(state){

        const jobs = await getJobs(state);
        setJobs(jobs)
        setJobsCopy(jobs)
        setLoading(false)
      }
      else{
        setLoading(false)

        navigate(-1)
      }
    } catch (error) {
      setLoading(false)

    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  const columns = [
    {
      title: "Company",
      dataIndex: "company_name",
      render:({name,link})=>{
        return <a href={link}>{name}</a>
      }
    },
    {
      title: "Job Location",
      dataIndex: "job_location",
    },
    {
      title: "Job Title",
      dataIndex: "job_title",
    },

    {
      title: "Posted On",
      dataIndex: "posted_date",
    },
    {
      title: "Action",
      dataIndex: "job_url",
      render:(url)=>{
        
        return <a href={url}>Apply Now</a>
      }
    },
  ];
  const searchData = (e) => {
    const filterData = jobs?.filter((job) => {
      return job.job_title.toUpperCase().includes(e.target.value.toUpperCase());
    });
    setJobsCopy(filterData);
  };
  return (
    <div className="jobs-container">
      <Input
        style={{ width: "250px" }}
        placeholder="Search"
        onChange={searchData}
      />
      <Table
        columns={columns}
        className=" px-5"
        pagination={{ pageSize: 10 }}
        dataSource={jobsCopy}
        loading={loading}
      />
    </div>
  );
}

export default Jobs;
