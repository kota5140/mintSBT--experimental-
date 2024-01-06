import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  // Define your MUI styles here
  example: {
    // Your MUI styles go here
    color: "red",
  },
}));

export function cn(...inputs: (string | undefined)[]) {
  const classes = useStyles();
  return clsx(classes.example, ...inputs);
}

export const formatBalance = (rawBalance: string): string => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex: string): number => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatAddress = (addr: string | undefined): string => {
  return `${addr?.substring(0, 8)}...`;
};
