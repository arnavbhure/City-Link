import VendorFormInput from "../VendorFormInput";

const furnishedOptions = ["Fully furnished", "Semi furnished", "Unfurnished"];

const PGForm = ({ values, onFieldChange }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <VendorFormInput
        label="Rent range"
        name="rentRange"
        value={values.rentRange}
        onChange={(event) => onFieldChange("rentRange", event.target.value)}
        placeholder="Rs. 8,000 - Rs. 14,000/month"
      />
      <VendorFormInput
        label="Suitable for"
        name="occupancy"
        value={values.occupancy}
        onChange={(event) => onFieldChange("occupancy", event.target.value)}
        options={["Boys", "Girls", "Co-ed"]}
      />
      <div>
        <p className="mb-2 text-sm font-medium text-slate-300">Furnished</p>
        <div className="grid gap-2 rounded-2xl border border-white/10 bg-slate-950/70 p-2 sm:grid-cols-3">
          {furnishedOptions.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => onFieldChange("furnished", option)}
              className={`rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                values.furnished === option
                  ? "bg-white text-slate-950"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <VendorFormInput
        label="Sharing type"
        name="sharingType"
        value={values.sharingType}
        onChange={(event) => onFieldChange("sharingType", event.target.value)}
        options={["Single and sharing", "Single room", "2 sharing", "3 sharing", "Dormitory"]}
      />
    </div>
  );
};

export default PGForm;
