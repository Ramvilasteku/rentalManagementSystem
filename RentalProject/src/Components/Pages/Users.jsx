import React, { useState } from "react";
import "./Users.css";
import Swal from "sweetalert2";
import axios from "axios";

const Users = () => {
  const [userValues, setUserValues] = useState({
    userName: "",
    userMail: "",
    userPassword: "",
    userPhoneNumber: "",
    noOfUnits: "",
  });

  const handelChanges = (x) => {
    setUserValues({ ...userValues, [x.target.name]: [x.target.value] });
  };

  const [errors, setErrors] = useState({});

  const validate = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!userValues.userName) {
      newErrors.userName = "User Name is required";
    }
    if (!userValues.userMail) {
      newErrors.userMail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userValues.userMail)) {
      newErrors.userMail = "Invalid email format";
    }

    if (!userValues.userPassword) {
      newErrors.userPassword = "Password is required";
    } else if (userValues.userPassword.length > 6) {
      newErrors.userPassword = "Password must be at least 6 characters long";
    }

    if (!userValues.userPhoneNumber) {
      newErrors.userPhoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(userValues.userPhoneNumber)) {
      newErrors.userPhoneNumber = "Phone number must be 10 digits";
    }

    if (!userValues.noOfUnits)
      newErrors.noOfUnits = "Number of units is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      axios.post("http://localhost:8080/users", userValues)
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "Submitted Successfully!",
            icon: "success",
            draggable: true,
          });
          setUserValues({
            userName: "",
            userMail: "",
            userPassword: "",
            userPhoneNumber: "",
            noOfUnits: "",
          });
          setErrors({});
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "Enter all Fields!",
        icon: "error",
        draggable: true,
      });
    }
  };

  return (
    <div>
      <div className="userMainDiv">
        {/* <img
          src="../src/assets/user.jpg"
          alt="user"
          className="userImg"
        /> */}

        <div className="userFormDiv">
          <form onSubmit={validate} className="userForm">
            <h2>User Detail Form</h2>

            <label htmlFor="">User Name</label>
            <input
              onChange={handelChanges}
              value={userValues.userName}
              type="text"
              name="userName"
            />
            {errors.userName && <p>{errors.userName}</p>}
            <label htmlFor="">User Mail</label>
            <input
              onChange={handelChanges}
              value={userValues.userMail}
              type="email"
              name="userMail"
            />
            {errors.userMail && <p>{errors.userMail}</p>}
            <label htmlFor="">User Password</label>
            <input
              onChange={handelChanges}
              value={userValues.userPassword}
              type="password"
              name="userPassword"
            />
            {errors.userPassword && <p>{errors.userPassword}</p>}
            <label htmlFor="">User Phone Number</label>
            <input
              onChange={handelChanges}
              value={userValues.userPhoneNumber}
              type="number"
              name="userPhoneNumber"
            />
            {errors.userPhoneNumber && <p>{errors.userPhoneNumber}</p>}
            <label htmlFor="">No Of Units</label>
            <input
              onChange={handelChanges}
              value={userValues.noOfUnits}
              type="number"
              name="noOfUnits"
            />
            {errors.noOfUnits && <p>{errors.noOfUnits}</p>}
            <button type="Submit" className="submitBtn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Users;
