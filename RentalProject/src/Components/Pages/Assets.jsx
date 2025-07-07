import { React, useState } from "react";
import Swal from "sweetalert2";
import "./Assets.css";

const Assets = () => {
  const [assetsValues, setAssetsValues] = useState({
    assetName: "",
    assetType: "",
    assetCost: "",
    assetStatus: "",
    lastMaintenanceDate: "",
    nextMaintenanceDate: "",
    assetPurchesDate: "",
    warrentyEndDate: "",
    assetDescription: "",
  });

  const handleChanges = (x) => {
    setAssetsValues({ ...assetsValues, [x.target.name]: [x.target.value] });
  };

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!assetsValues.assetName) newErrors.assetName = "Asset name is required";

    if (!assetsValues.assetType) {
      newErrors.assetType = "Asset type is required";
    }

    if (!assetsValues.assetCost) {
      newErrors.assetCost = "Asset cost is required";
    }

    if (!assetsValues.assetStatus)
      newErrors.assetStatus = "Asset status is required";
    
    if (!assetsValues.assetLocation)
      newErrors.assetLocation = "Asset location is required";

    if (!assetsValues.unitNumber) {
      newErrors.unitNumber = "Unit number is required";
    }

    if (!assetsValues.lastMaintenanceDate) {
      newErrors.lastMaintenanceDate = "Last maintenance date is required";
    }

    if (!assetsValues.nextMaintenanceDate) {
      newErrors.nextMaintenanceDate = "Next maintenance date is required";
    }

    if (!assetsValues.assetPurchesDate) {
      newErrors.assetPurchesDate = "Asset purches date is required";
    }

    if (!assetsValues.warrentyEndDate) {
      newErrors.warrentyEndDate = "Warenty end date is required";
    }

    if (!assetsValues.assetDescription >= 1) {
      newErrors.assetDescription = "Asset description contain at list one word";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      Swal.fire({
        title: "Submitted Successfully!",
        icon: "success",
        draggable: true,
      });
      console.log("Submitted:", assetsValues);

      // Reset form if needed
      setAssetsValues({
        assetName: "",
        assetType: "",
        assetCost: "",
        assetStatus: "",
        lastMaintenanceDate: "",
        nextMaintenanceDate: "",
        assetPurchesDate: "",
        warrentyEndDate: "",
        assetDescription: "",
      });

      setErrors({});
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
      <div>
        <div className="assetMainDiv">
          {/* <img
          src="../src/assets/tenant.jpg"
          alt="tenant"
          className="tenantImg"
        /> */}

          <div className="assetFormDiv">
            <form onSubmit={handleSubmit} className="assetForm">
              <h2>Assets Details Form</h2>

              <label htmlFor="">
                Asset Name:<span className="span">*</span>
              </label>
              <input
                type="text"
                name="assetName"
                id=""
                value={assetsValues.assetName}
                onChange={handleChanges}
                placeholder=""
              />
              {errors.assetName && <p>{errors.assetName}</p>}

              <label htmlFor="">
                Asset Type:<span className="span">*</span>
              </label>
              <select
                value={assetsValues.assetType}
                name="assetType"
                onChange={handleChanges}
                id="select"
              >
                <option className="option"  selected>
                  Select Asset Type...
                </option>
                <option className="option" value="Elevators">
                  Elevators
                </option>
                <option className="option" value="Escalators">
                  Escalators
                </option>
                <option className="option" value="Generators">
                  Generators
                </option>
                <option className="option" value="Transformers">
                  Transformers
                </option>
                <option className="option" value="Lighting Systems">
                  Lighting Systems
                </option>
                <option className="option" value="Water Pumps">
                  Water Pumps
                </option>
                <option className="option" value=" Air Conditioning Units">
                  Air Conditioning Units
                </option>
              </select>
              {errors.assetType && <p>{errors.assetType}</p>}
              
              <label htmlFor="">
                Asset Cost:<span className="span">*</span>
              </label>
              <input
                type="number"
                name="assetCost"
                id=""
                value={assetsValues.assetCost}
                onChange={handleChanges}
              />
              {errors.assetCost && <p>{errors.assetCost}</p>}
              <label htmlFor="">
                Asset Status:<span className="span">*</span>
              </label>
            
              <select
                name="assetStatus"
                onChange={handleChanges}
                value={assetsValues.assetStatus}
                id="select"
              >
                <option className="option" value="">
                  Select Asset Status...
                </option>
                <option className="option" value="Good">
                  Good
                </option>
                <option className="option" value="Average">
                  Average
                </option>
                <option className="option" value="Bad">
                  Bad
                </option>
              </select>
              {errors.assetStatus && <p>{errors.assetStatus}</p>}

              <label htmlFor="">
                Last Maintenance Date:<span className="span">*</span>
              </label>
              <input
                type="date"
                name="lastMaintenanceDate"
                id=""
                value={assetsValues.lastMaintenanceDate}
                onChange={handleChanges}
              />
              {errors.lastMaintenanceDate && (
                <p>{errors.lastMaintenanceDate}</p>
              )}

              <label htmlFor="">
                Next Maintenance Date:<span className="span">*</span>
              </label>
              <input
                type="date"
                name="nextMaintenanceDate"
                id=""
                value={assetsValues.nextMaintenanceDate}
                onChange={handleChanges}
              />
              {errors.nextMaintenanceDate && (
                <p>{errors.nextMaintenanceDate}</p>
              )}

              <label htmlFor="">
                Asset Purches Date:<span className="span">*</span>
              </label>
              <input
                type="date"
                name="assetPurchesDate"
                id=""
                value={assetsValues.assetPurchesDate}
                onChange={handleChanges}
              />
              {errors.assetPurchesDate && <p>{errors.assetPurchesDate}</p>}

              <label htmlFor="">
                Warrenty End Date:<span className="span">*</span>
              </label>
              <input
                type="date"
                name="warrentyEndDate"
                id=""
                value={assetsValues.warrentyEndDate}
                onChange={handleChanges}
              />
              {errors.warrentyEndDate && <p>{errors.warrentyEndDate}</p>}

              <label htmlFor="">
                Description:<span className="span">*</span>
              </label>
              <textarea
                name="assetDescription"
                id=""
                value={assetsValues.assetDescription}
                onChange={handleChanges}
              ></textarea>
              {errors.assetDescription && <p>{errors.assetDescription}</p>}

              <button type="submit" className="submitBtn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;
