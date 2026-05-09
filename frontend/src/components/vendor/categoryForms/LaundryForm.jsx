import VendorFormInput from "../VendorFormInput";
import VendorTextarea from "../VendorTextarea";

const LaundryForm = ({ values, onFieldChange }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <VendorFormInput
        label="Pickup/drop"
        name="pickupDrop"
        value={values.pickupDrop}
        onChange={(event) => onFieldChange("pickupDrop", event.target.value)}
        options={["Both pickup and drop", "Pickup only", "Drop only", "Store visit"]}
      />
      <VendorFormInput
        label="Price per kg"
        name="pricePerKg"
        value={values.pricePerKg}
        onChange={(event) => onFieldChange("pricePerKg", event.target.value)}
        placeholder="Rs. 70/kg"
      />
      <VendorFormInput
        label="Turnaround time"
        name="turnaroundTime"
        value={values.turnaroundTime}
        onChange={(event) =>
          onFieldChange("turnaroundTime", event.target.value)
        }
        placeholder="24-48 hours"
      />
      <VendorTextarea
        label="Laundry services"
        name="laundryServices"
        value={values.laundryServices}
        onChange={(event) =>
          onFieldChange("laundryServices", event.target.value)
        }
        placeholder="Wash and fold, ironing, dry cleaning, express service"
        rows={3}
      />
    </div>
  );
};

export default LaundryForm;
