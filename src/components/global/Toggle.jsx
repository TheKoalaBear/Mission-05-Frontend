import React, { useState } from "react";
import styles from "./Toggle.module.css";

const Toggle = ({ isChecked: initialChecked = true, onChange }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleChange = (event) => {
    const newCheckedState = event.target.checked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default Toggle;
