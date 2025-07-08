import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Tenants.css";
import Users from "./Users";
import axios from "axios";

const Tenants = () => {
  const [tenantValues, setTenantValues] = useState({
    tenantName: "",
    tenantMail: "",
    tenantPhoneNo: "",
    unitNumber: "",
    noofUnit: "",
    tenantRentAmount: "",
    tenantSecurityDeposit: "",
    tenantStartDate: "",
    tenantEndDate: "",
  });

  const handleChanges = (x) => {
    setTenantValues({ ...tenantValues, [x.target.name]: [x.target.value] });
  };

  const [errors, setErrors] = useState({});

  const validate = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!tenantValues.tenantName)
      newErrors.tenantName = "Tenant name is required";

    if (!tenantValues.tenantMail) {
      newErrors.tenantMail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(tenantValues.tenantMail)) {
      newErrors.tenantMail = "Invalid email format";
    }

    if (!tenantValues.tenantPhoneNo) {
      newErrors.tenantPhoneNo = "Phone number is required";
    } else if (!/^\d{10}$/.test(tenantValues.tenantPhoneNo)) {
      newErrors.tenantPhoneNo = "Phone number must be 10 digits";
    }

    if (!tenantValues.unitNumber)
      newErrors.unitNumber = "Unit number is required";
    if (!tenantValues.noofUnit) newErrors.noofUnit = "No. of units is required";

    if (!tenantValues.tenantRentAmount) {
      newErrors.tenantRentAmount = "Rent amount is required";
    } else if (isNaN(tenantValues.tenantRentAmount)) {
      newErrors.tenantRentAmount = "Rent must be a number";
    }

    if (!tenantValues.tenantSecurityDeposit) {
      newErrors.tenantSecurityDeposit = "Security deposit is required";
    } else if (isNaN(tenantValues.tenantSecurityDeposit)) {
      newErrors.tenantSecurityDeposit = "Deposit must be a number";
    }

    if (!tenantValues.tenantStartDate)
      newErrors.tenantStartDate = "Start date is required";
    if (!tenantValues.tenantEndDate)
      newErrors.tenantEndDate = "End date is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      axios
        .post("http://localhost:8080/tenant", tenantValues)
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "Submitted Successfully!",
            icon: "success",
            draggable: true,
          });
          setTenantValues({
            tenantName: "",
            tenantMail: "",
            tenantPhoneNo: "",
            unitNumber: "",
            noofUnit: "",
            tenantRentAmount: "",
            tenantSecurityDeposit: "",
            tenantStartDate: "",
            tenantEndDate: "",
          });
          setErrors({});
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Error!",
            err,
            icon: "error",
            draggable: true,
          });
        });
    } else {
      Swal.fire({
        title: "Enter all Fields!",
        icon: "error",
        draggable: true,
      });
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     Swal.fire({
  //       title: "Submitted Successfully!",
  //       icon: "success",
  //       draggable: true,
  //     });
  //     console.log("Submitted:", tenantValues);

  //     // Reset form if needed
  //     setTenantValues({
  //       tenantName: "",
  //       tenantMail: "",
  //       tenantPhoneNo: "",
  //       unitNumber: "",
  //       noofUnit: "",
  //       tenantRentAmount: "",
  //       tenantSecurityDeposit: "",
  //       tenantStartDate: "",
  //       tenantEndDate: "",
  //     });

  //     setErrors({});
  //   }
  //   else{
  //     Swal.fire({
  //       title: "Enter all Fields!",
  //       icon: "error",
  //       draggable: true,
  //     });
  //   }
  // };

  return (
    <div>
      <div className="tenantMainDiv">
        {/* <img
          src="../src/assets/tenant.jpg"
          alt="tenant"
          className="tenantImg"
        /> */}

        <div className="tenantFormDiv">
          <form onSubmit={validate} className="tenantform">
            <h2>Tenant Details Form</h2>

            <label htmlFor="">
              Tenant Name:<span className="span">*</span>
            </label>
            <input
              type="text"
              name="tenantName"
              id=""
              value={tenantValues.tenantName}
              onChange={handleChanges}
              placeholder=""
            />
            {errors.tenantName && <p className="">{errors.tenantName}</p>}

            <label htmlFor="">
              Tenant Mail:<span className="span">*</span>
            </label>
            <input
              type="text"
              name="tenantMail"
              id=""
              value={tenantValues.tenantMail}
              onChange={handleChanges}
            />
            {errors.tenantMail && <p className="">{errors.tenantMail}</p>}
            <label htmlFor="">
              Tenant Phone Number:<span className="span">*</span>
            </label>
            <input
              type="number"
              name="tenantPhoneNo"
              id=""
              value={tenantValues.tenantPhoneNo}
              onChange={handleChanges}
            />
            {errors.tenantPhoneNo && <p className="">{errors.tenantPhoneNo}</p>}
            <label htmlFor="">
              Unit Number:<span className="span">*</span>
            </label>
            <input
              type="number"
              name="unitNumber"
              id=""
              value={tenantValues.unitNumber}
              onChange={handleChanges}
            />
            {errors.unitNumber && <p className="">{errors.unitNumber}</p>}
            <label htmlFor="">
              Number of Units:<span className="span">*</span>
            </label>
            <input
              type="number"
              name="noofUnit"
              id=""
              value={tenantValues.noofUnit}
              onChange={handleChanges}
            />
            {errors.noofUnit && <p className="">{errors.noofUnit}</p>}

            <label htmlFor="">
              Tenant Rent Amount:<span className="span">*</span>
            </label>
            <input
              type="number"
              name="tenantRentAmount"
              id=""
              value={tenantValues.tenantRentAmount}
              onChange={handleChanges}
            />
            {errors.tenantRentAmount && (
              <p className="">{errors.tenantRentAmount}</p>
            )}

            <label htmlFor="">
              Tenant Security Deposit:<span className="span">*</span>
            </label>
            <input
              type="number"
              name="tenantSecurityDeposit"
              id=""
              value={tenantValues.tenantSecurityDeposit}
              onChange={handleChanges}
            />
            {errors.tenantSecurityDeposit && (
              <p className="">{errors.tenantSecurityDeposit}</p>
            )}

            <label htmlFor="">
              Tenant Start Date:<span className="span">*</span>
            </label>
            <input
              type="date"
              name="tenantStartDate"
              id=""
              value={tenantValues.tenantStartDate}
              onChange={handleChanges}
            />
            {errors.tenantStartDate && (
              <p className="">{errors.tenantStartDate}</p>
            )}

            <label htmlFor="">
              Tenant End Date:<span className="span">*</span>
            </label>
            <input
              type="date"
              name="tenantEndDate"
              id=""
              value={tenantValues.tenantEndDate}
              onChange={handleChanges}
            />
            {errors.tenantEndDate && <p className="">{errors.tenantEndDate}</p>}

            {/* <button type="button" onClick={reset} >Reset</button> */}
            <button type="submit" className="submitBtn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tenants;
