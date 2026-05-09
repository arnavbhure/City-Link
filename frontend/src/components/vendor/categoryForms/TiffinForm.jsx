import VendorFormInput from "../VendorFormInput";
import VendorTextarea from "../VendorTextarea";

const TiffinForm = ({ values, onFieldChange }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <VendorFormInput
        label="Food preference"
        name="mealType"
        value={values.mealType}
        onChange={(event) => onFieldChange("mealType", event.target.value)}
        options={["Veg only", "Non-veg available", "Both veg and non-veg"]}
      />
      <VendorFormInput
        label="Pricing"
        hint="Monthly or per meal"
        name="pricing"
        value={values.pricing}
        onChange={(event) => onFieldChange("pricing", event.target.value)}
        placeholder="Rs. 3,000/month or Rs. 90/meal"
      />
      <VendorFormInput
        label="Meal timings"
        name="mealTimings"
        value={values.mealTimings}
        onChange={(event) => onFieldChange("mealTimings", event.target.value)}
        placeholder="Lunch 12-2 PM, Dinner 7-9 PM"
      />
      <VendorTextarea
        label="Delivery areas"
        name="deliveryAreas"
        value={values.deliveryAreas}
        onChange={(event) => onFieldChange("deliveryAreas", event.target.value)}
        placeholder="Mention neighborhoods, campuses, or hostels you cover"
        rows={3}
      />
    </div>
  );
};

export default TiffinForm;
