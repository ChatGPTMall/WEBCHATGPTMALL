import { Button, Input, Steps } from "antd";
import React, { useState } from "react";
import { upworkjobsapi } from "../apiCalls/upworkjobsapi";
import { useNavigate } from "react-router-dom";
import UpWorkJobs from "./UpWorkJobs";


function UpWorkJobsSearch() {
  const [jobTitle, setJobTitle] = useState("");
  const [loading,setLoading]=useState(true)
  const [jobs,setJobs]=useState([])
  const [upWorkJobsOpen, setUpWorkJonsOpen] = useState(false)

  const navigate=useNavigate()

  const onChange = (e) => {
    setJobTitle(e.target.value);
  };
  const handleSearchClick = async () => {
    if (jobTitle.length > 2 ) {
       
        try {
            const jobs = await upworkjobsapi(jobTitle);
            setJobs(jobs.jobsData)
            setLoading(false)
            setUpWorkJonsOpen(true)
         
        } catch (error) {
          setLoading(false)
          navigate(-1)
    
        }
    }
  };
  return (
    <>
   {!upWorkJobsOpen &&  <div className="job-search-container">
      <h1 className="p-5 text-center">Find Your Dream Job Today</h1>
      <div className="p-5">
        <Steps
          direction="vertical"
          progressDot
          className="p-5 d-flex align-items-center justify-content-center"
          items={[
            {
              title: (
                <Input
                  style={{ width: 230 }}
                  placeholder="Search Job"
                  value={jobTitle}
                  name="jobTitle"
                  onChange={onChange}
                ></Input>
              ),
            },
            {
              title: (
                <Button style={{ width: 230 }} onClick={handleSearchClick}>
                  Search
                </Button>
              ),
            },
          ]}
        />
      </div>
    </div>}
    {upWorkJobsOpen && 
         ( 
         <UpWorkJobs
            key='upworktable'
            loading = {loading}
            jobs = {jobs}
         />
         )}
    </>
  );
}

export default UpWorkJobsSearch;
