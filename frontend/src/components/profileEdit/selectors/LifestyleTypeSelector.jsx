import LifestyleSelector from "../LifestyleSelector";
import { lifestyleTypeOptions } from "../data";

const LifestyleTypeSelector = ({ value, onChange }) => {
  return (
    <LifestyleSelector
      title="Lifestyle type"
      description="Pick the overall energy that feels most like you."
      options={lifestyleTypeOptions}
      value={value}
      onChange={onChange}
      columns={3}
    />
  );
};

export default LifestyleTypeSelector;
