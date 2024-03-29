"use client";

import dynamic from "next/dynamic";
import { DataOption } from "@/utils/reactSelectOptions";
import { ComponentType } from "react";
import { ControlProps, GroupBase, components } from "react-select";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface IProps {
  label: string;
  name: string;
  width: string;
  data: DataOption[];
  saveValue: string | null;
  onChange: (newValue: unknown) => void;
}

const FilterSelector = ({
  label,
  name,
  width,
  data,
  saveValue,
  onChange,
}: IProps) => {
  const ControlComponent = (props: ControlProps<DataOption, false>) => (
    <div style={{ width: width }}>
      <p
        style={{
          fontSize: "14px",
          fontWeight: "500",
          color: "#8A8A89",
          marginBottom: "8px",
        }}
      >
        {label}
      </p>
      <components.Control {...props} />
    </div>
  );

  return (
    <Select
      isSearchable={false}
      className="basic-single"
      name={name}
      options={data}
      components={{
        Control: ControlComponent as ComponentType<
          ControlProps<unknown, boolean, GroupBase<unknown>>
        >,
      }}
      onChange={onChange}
      defaultValue={data.find((opt) => opt.value === saveValue) ?? data[0]}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          border: "none",
          borderRadius: "14px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
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
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
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

export default FilterSelector;
