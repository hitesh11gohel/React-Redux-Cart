import React from "react";
const Register = () => {
  return (
    <div>
      <div className="main">
        <div
          className="text-center"
          style={{ padding: "100px", width: "550px" }}
        >
          <h3>Register</h3>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="form-control my-2"
            />

            <input
              type="text"
              name="phone"
              placeholder="Enter Contact"
              className="form-control my-2"
            />

            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              className="form-control my-2"
            />
            
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="form-control my-2"
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-outline-primary mx-2"
            />
            <input
              type="reset"
              value="Cancel"
              className="btn btn-outline-danger mx-2"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
