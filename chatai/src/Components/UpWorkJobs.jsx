import {React, useState} from "react";
import { Button, Input, Table } from "antd";
import moment from "moment/moment";

const UpWorkJobs = (props) => {
  const [jobsCopy,setJobsCopy]=useState(props.jobs)

  const searchData = (e) => {
    const filterData = props.jobs?.filter((job) => {
      console.log(props.jobs)
      return job.title.toUpperCase().includes(e.target.value.toUpperCase());
    });
    setJobsCopy(filterData);
  };

 const userColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Category",
      dataIndex: "category2",
      key: "category"
    },
    {
      title: "Job Type",
      dataIndex: "job_type",
      key: "type"
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget"
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration"
    },
    {
      title: "Job Status",
      dataIndex: "job_status",
      key: "job_status"
    },
    {
      title: "Date Created",
      dataIndex: "publish_time",
      key: "created",
      render: (publish_time) => moment(publish_time).format("MM/DD/YYYY"),
    },
    {
      title: "Action",
      dataIndex: "url",
      render:(url)=>{
        
        return <a href={url}>Apply Now</a>
      }
    },
  ];
  

  return (
    <div className="jobs-container">
       <Input
        style={{ width: "250px" }}
        placeholder="Search"
        onChange={searchData}
      />
      <br /> <br />
      <Table
        rowKey="name"
        dataSource={jobsCopy}
        columns={userColumns}
        loading={props.loading}
        className=" px-5"
        pagination={{ pageSize: 10 }}
      />
    </div>

  )
}
export default UpWorkJobs