export enum Theme {
  Yellow = "yellow",
  Green = "green",
  Blue = "blue",
  Pink = "pink",
  Peach = "peach",
}

interface initialState {
  currentTheme:
    | Theme.Yellow
    | Theme.Green
    | Theme.Blue
    | Theme.Pink
    | Theme.Peach;
}

export const initialState: initialState = {
  currentTheme: Theme.Yellow,
};
