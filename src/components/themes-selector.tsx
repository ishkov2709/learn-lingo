import React from "react";
import chroma from "chroma-js";
import { StylesConfig } from "react-select";
import dynamic from "next/dynamic";

const Select = dynamic(
  () => import("react-select").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
);

interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const colourOptions: readonly ColourOption[] = [
  {
    value: "yellow",
    label: "Sunflower Yellow",
    color: "#F4C550",
  },
  { value: "green", label: "Mint Green", color: "#9FBAAE" },
  { value: "plue", label: "Sky Blue", color: "#9FB7CE" },
  { value: "pink", label: "Salmon Pink", color: "#E0A39A" },
  { value: "peach", label: "Peach", color: "#F0AA8D" },
];

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles: StylesConfig<ColourOption> = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

console.log(colourStyles);

export default function ThemesSelector() {
  return (
    <Select
      defaultValue={colourOptions[0]}
      options={colourOptions}
      styles={colourStyles}
      onChange={(o) => console.log(o)}
    />
  );
}
