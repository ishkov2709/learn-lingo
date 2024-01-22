import React from "react";
import chroma from "chroma-js";
import { GroupBase, StylesConfig } from "react-select";
import dynamic from "next/dynamic";
import { useAppDispatch } from "@/redux/hooks";
import { setTheme } from "@/redux/themes/themesSlice";

const Select = dynamic(() => import("react-select"), { ssr: false });

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
  { value: "blue", label: "Sky Blue", color: "#9FB7CE" },
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

const colourStyles: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    boxShadow: "none",
    borderRadius: "14px",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma((data as ColourOption).color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? (data as ColourOption).color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : (data as ColourOption).color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? (data as ColourOption).color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...dot((data as ColourOption).color),
  }),
  menu: (styles) => ({
    ...styles,
    boxShadow: "none",
    border: "1px solid hsl(0, 0%, 80%)",
    borderRadius: "14px",
    overflow: "hidden",
  }),
};

export default function ThemesSelector() {
  const dispatch = useAppDispatch();

  const handleChange = (newValue: unknown) => {
    const theme = newValue as Readonly<ColourOption>;

    dispatch(setTheme(theme.value));
  };

  return (
    <Select
      defaultValue={colourOptions[0]}
      options={colourOptions}
      styles={colourStyles}
      onChange={handleChange}
    />
  );
}