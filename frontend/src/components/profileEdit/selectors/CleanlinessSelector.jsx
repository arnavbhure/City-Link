import LifestyleSelector from "../LifestyleSelector";
import { cleanlinessOptions } from "../data";

const CleanlinessSelector = ({ value, onChange }) => {
  return (
    <LifestyleSelector
      title="Cleanliness level"
      description="How tidy do you like a shared room or apartment to stay?"
      options={cleanlinessOptions}
      value={value}
      onChange={onChange}
      columns={3}
    />
  );
};

export default CleanlinessSelector;
