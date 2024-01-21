import { ComponentType } from "react";
import { ControlProps, GroupBase, components } from "react-select";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface dataOption {
  value: string;
  label: string;
}

interface IProps {
  name: string;
  width: string;
  data: { value: string; label: string }[];
  onChange: (newValue: unknown) => void;
}

export const FilterSelector = ({ name, width, data, onChange }: IProps) => {
  const ControlComponent = (props: ControlProps<dataOption, false>) => (
    <div style={{ width: width }}>
      <p
        style={{
          fontSize: "14px",
          fontWeight: "500",
          color: "#8A8A89",
          marginBottom: "8px",
        }}
      >
        {name}
      </p>
      <components.Control {...props} />
    </div>
  );

  return (
    <Select
      className="basic-single"
      name={name}
      options={data}
      components={{
        Control: ControlComponent as ComponentType<
          ControlProps<unknown, boolean, GroupBase<unknown>>
        >,
      }}
      onChange={onChange}
      defaultValue={data[0]}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          border: "none",
          borderRadius: "14px",
          boxShadow: "none",
          fontSize: "18px",
          padding: "7px 14px 7px 18px",
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          margin: "0",
          padding: "0",
        }),
        indicatorSeparator: (baseStyles) => ({
          ...baseStyles,
          display: "none",
        }),
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          color: "#121417",
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          border: "none",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "none",
          width: width,
          fontSize: "18px",
          padding: "10px 18px",
        }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          padding: "0",
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "white",
          color: state.isFocused ? "#121417" : "#12141733",
          cursor: "pointer",
          padding: "4px 0",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }),
      }}
    />
  );
};
