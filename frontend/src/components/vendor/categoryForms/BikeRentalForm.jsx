import VendorFormInput from "../VendorFormInput";
import VendorTextarea from "../VendorTextarea";

const BikeRentalForm = ({ values, onFieldChange }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <VendorFormInput
        label="Vehicles available"
        name="vehicleOptions"
        value={values.vehicleOptions}
        onChange={(event) =>
          onFieldChange("vehicleOptions", event.target.value)
        }
        placeholder="Scooters, bikes, EVs"
      />
      <VendorFormInput
        label="Pricing model"
        name="pricingModel"
        value={values.pricingModel}
        onChange={(event) => onFieldChange("pricingModel", event.target.value)}
        placeholder="Rs. 350/day or Rs. 4,000/month"
      />
      <VendorFormInput
        label="Documents needed"
        name="documentsNeeded"
        value={values.documentsNeeded}
        onChange={(event) =>
          onFieldChange("documentsNeeded", event.target.value)
        }
        placeholder="Driving licence, college ID, deposit"
      />
      <VendorTextarea
        label="Availability areas"
        name="availabilityAreas"
        value={values.availabilityAreas}
        onChange={(event) =>
          onFieldChange("availabilityAreas", event.target.value)
        }
        placeholder="Where students can pick up or get delivery"
        rows={3}
      />
    </div>
  );
};

export default BikeRentalForm;
