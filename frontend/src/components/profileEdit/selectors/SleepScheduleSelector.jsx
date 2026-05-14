import LifestyleSelector from "../LifestyleSelector";
import { sleepScheduleOptions } from "../data";

const SleepScheduleSelector = ({ value, onChange }) => {
  return (
    <LifestyleSelector
      title="Sleep schedule"
      description="Let future roommates know whether you tend to rise early or stay up late."
      options={sleepScheduleOptions}
      value={value}
      onChange={onChange}
      columns={3}
    />
  );
};

export default SleepScheduleSelector;
