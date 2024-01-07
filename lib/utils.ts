import { styled } from "@mui/system";
import clsx from "clsx";

const Example = styled("div")({
  color: "red",
});

export function cn(...inputs: (string | undefined)[]) {
  return clsx(Example, ...inputs);
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
