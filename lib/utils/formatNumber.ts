import numeral from "numeral";
import BigNumber from "bignumber.js";
export const formatNumber = (val: number | string, suffix = 4): string => {
  try {
    const num = new BigNumber(val);
    if (isNaN(num.toNumber())) return "0.000";

    const format = `0,0.${"0".repeat(suffix)}`;
    const formattedNum = numeral(val).format(format);

    // Remove trailing zeros after decimal point
    const parts = formattedNum.split(".");
    if (parts.length === 2) {
      const decimals = parts[1].replace(/0+$/, "");
      return decimals ? `${parts[0]}.${decimals}` : parts[0];
    }
    return formattedNum;
  } catch {
    return "0.000";
  }
};
