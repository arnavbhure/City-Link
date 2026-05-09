import VendorFormInput from "../VendorFormInput";
import VendorTextarea from "../VendorTextarea";

const WifiForm = ({ values, onFieldChange }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <VendorFormInput
        label="Plan speed"
        name="planSpeed"
        value={values.planSpeed}
        onChange={(event) => onFieldChange("planSpeed", event.target.value)}
        placeholder="100 Mbps, 200 Mbps, fiber plans"
      />
      <VendorFormInput
        label="Monthly price"
        name="monthlyPrice"
        value={values.monthlyPrice}
        onChange={(event) => onFieldChange("monthlyPrice", event.target.value)}
        placeholder="Rs. 699/month onwards"
      />
      <VendorFormInput
        label="Installation time"
        name="installationTime"
        value={values.installationTime}
        onChange={(event) =>
          onFieldChange("installationTime", event.target.value)
        }
        placeholder="Same day or 24 hours"
      />
      <VendorTextarea
        label="Service areas"
        name="serviceAreas"
        value={values.serviceAreas}
        onChange={(event) => onFieldChange("serviceAreas", event.target.value)}
        placeholder="Mention hostels, societies, or neighborhoods"
        rows={3}
      />
    </div>
  );
};

export default WifiForm;
