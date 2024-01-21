interface ITheme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
}

export const themeSwitcher = (theme: string): ITheme => {
  switch (theme) {
    case "yellow":
      return {
        name: theme,
        primaryColor: "#F4C550",
        secondaryColor: "#FBE9BA",
      };

    case "green":
      return {
        name: theme,
        primaryColor: "#9FBAAE",
        secondaryColor: "#CBDED3",
      };

    case "blue":
      return {
        name: theme,
        primaryColor: "#9FB7CE",
        secondaryColor: "#BFD6EA",
      };

    case "pink":
      return {
        name: theme,
        primaryColor: "#E0A39A",
        secondaryColor: "#F2C0BD",
      };

    case "peach":
      return {
        name: theme,
        primaryColor: "#F0AA8D",
        secondaryColor: "#F4C8BA",
      };

    default:
      return {
        name: "yellow",
        primaryColor: "#F4C550",
        secondaryColor: "#FBE9BA",
      };
  }
};
