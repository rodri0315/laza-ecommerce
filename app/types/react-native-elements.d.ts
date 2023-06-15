import '@rneui/themed';

declare module '@rneui/themed' {
  export interface Theme {
    // myCustomProperty: string;
    // myCustomFunction: () => void;
    header1: {
      fontSize: number;
    },
    header2: {
      fontSize: number;
    },
  }
}