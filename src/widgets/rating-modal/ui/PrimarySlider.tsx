import styles from "./PrimarySlider.module.css";
import "./PrimarySlider.css";
import Slider from "@mui/material/Slider";

interface PrimarySliderProps {
  label: string;
  value: number;
  onChange: (event: Event, value: number | number[]) => void;
}

export default function PrimarySlider({
  label,
  value,
  onChange,
}: PrimarySliderProps) {
  return (
    <div className={styles.container}>
      <div className={`text-bold text-sm ${styles.label}`}>{label}</div>
      <Slider
        defaultValue={0}
        value={value}
        onChange={onChange}
        step={1}
        // marks={Array.from({ length: 11 }, (v, i) => ({ value: i, label: i }))}
        marks={[
          { value: 0, label: 0 },
          { value: 10, label: 10 },
        ]}
        // marks
        min={0}
        max={10}
        valueLabelDisplay="off"
      />
    </div>
  );
}
