import VendorFormInput from "../VendorFormInput";
import VendorTextarea from "../VendorTextarea";

const MoversForm = ({ values, onFieldChange }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <VendorFormInput
        label="Vehicle type"
        name="vehicleType"
        value={values.vehicleType}
        onChange={(event) => onFieldChange("vehicleType", event.target.value)}
        options={["Mini truck", "Pickup van", "Two-wheeler luggage", "Full truck"]}
      />
      <VendorFormInput
        label="Starting price"
        name="startingPrice"
        value={values.startingPrice}
        onChange={(event) => onFieldChange("startingPrice", event.target.value)}
        placeholder="Rs. 800 onwards"
      />
      <VendorFormInput
        label="Helpers"
        name="helpersAvailable"
        value={values.helpersAvailable}
        onChange={(event) =>
          onFieldChange("helpersAvailable", event.target.value)
        }
        options={["Helpers available", "Driver only", "On request"]}
      />
      <VendorTextarea
        label="City coverage"
        name="cityCoverage"
        value={values.cityCoverage}
        onChange={(event) => onFieldChange("cityCoverage", event.target.value)}
        placeholder="Mention areas, campuses, or nearby cities you cover"
        rows={3}
      />
    </div>
  );
};

export default MoversForm;
