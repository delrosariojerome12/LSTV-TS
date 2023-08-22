import React from "react";
import Select from "react-select";

interface CivilStatusComboBoxProps {
  civilstatus: string;
  setCivilStatus: (value: string) => void;
}

const CivilStatusComboBox: React.FC<CivilStatusComboBoxProps> = ({
  civilstatus,
  setCivilStatus,
}) => {
  const civilStatusOptions = [
    {value: "Single", label: "Single"},
    {value: "Married", label: "Married"},
    {value: "Divorced", label: "Divorced"},
    {value: "Widowed", label: "Widowed"},
    {value: "Other", label: "Other"},
  ];

  const handleCivilStatusChange = (selectedOption: any) => {
    setCivilStatus(selectedOption.value);
  };

  return (
    <div>
      <Select
        value={civilStatusOptions.find(
          (option) => option.value === civilstatus
        )}
        onChange={handleCivilStatusChange}
        options={civilStatusOptions}
        placeholder="Civil Status"
      />
    </div>
  );
};

export default CivilStatusComboBox;
