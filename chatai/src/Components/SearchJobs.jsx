import { Button, Input, Steps } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchJobs() {
  const [formData, setFormData] = useState({ jobTitle: "", location: "" });
  const navigate = useNavigate();
  const [stepStatus,setStepStatus]=useState("process")
  const [current, setCurrent] = useState(0);

  const onChange = (e) => {
    if (e.target.name == "location") {
      setCurrent(2);
    }
    else if(e.target.name == "jobTitle"){
      setCurrent(0);

    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSearchClick = () => {
    if (formData.jobTitle.length < 2 || formData.location < 2) {
     
    } else {
      navigate("all", {
        state: {
          search_terms: formData.jobTitle,
          location: formData.location,
        },
      });
    }
  };
  return (
    <div className="job-search-container">
      <h1 className="p-5 text-center">Find Your Dream Job Today</h1>
      <div className="p-5">
        <Steps
          direction="vertical"
          progressDot
          className="p-5 d-flex align-items-center justify-content-center"
          current={current}
          status={stepStatus}
          items={[
            {
              title: (
                <Input
                  style={{ width: 230 }}
                  placeholder="Search Job"
                  value={formData.jobTitle}
                  name="jobTitle"
                  onChange={onChange}
                ></Input>
              ),
            },
            {
              title: (
                <Input
                  style={{ width: 230 }}
                  placeholder="Location"
                  value={formData.location}
                  name="location"
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
    </div>
  );
}

export default SearchJobs;
