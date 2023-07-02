import { Context } from "../context/contextApi";
import React, { useContext } from "react";

export default function Supervisor() {
  const {
    supervisor_room_key,
    set_supervisor_room_key,
    supervisor_room_id,
    set_supervisor_room_id,
    validateCredentials,
  } = useContext(Context);

  const reset = () => {
    set_supervisor_room_key("");
    set_supervisor_room_id("");
  };

  const validate_Credentials = () => {
    console.log("validate_Credentials");
    validateCredentials();
    reset();
  };

  return (
    <>
      <div className="Supervisor">
        <div className="supervisor-form d-flex flex-column gap-2">
          <input
            type="text"
            value={supervisor_room_id}
            onChange={(event) => {
              set_supervisor_room_id(event.target.value);
            }}
            className="form-control form-control-sm rounded-0 border-0"
            placeholder="ENTER ROOM ID"
          ></input>
          <input
            type="text"
            value={supervisor_room_key}
            onChange={(event) => {
              set_supervisor_room_key(event.target.value);
            }}
            className="form-control form-control-sm rounded-0 border-0"
            placeholder="ENTER ROOM KEY"
          ></input>
          <button
            onClick={validate_Credentials}
            className="btn btn-sm btn-primary rounded-0 border-0"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </>
  );
}
