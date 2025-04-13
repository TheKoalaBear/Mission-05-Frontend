import { useState } from "react";

const useProductOptions = () => {
      const [selectedMilk, setSelectedMilk] = useState("");
      const [selectedStrength, setSelectedStrength] = useState("");
      const [selectedFlavour, setSelectedFlavour] = useState("");

      return {
            selectedMilk,
            setSelectedMilk,
            selectedStrength,
            setSelectedStrength,
            selectedFlavour,
            setSelectedFlavour,
      };
};

export default useProductOptions;
