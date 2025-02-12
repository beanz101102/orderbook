import numeral from "numeral";
import BigNumber from "bignumber.js";
export const formatNumber = (val: number | string, suffix = 4): string => {
  try {
    const num = new BigNumber(val);
    if (isNaN(num.toNumber())) return "0.000";

    if (num.isLessThanOrEqualTo(1e-7)) {
      return num.toFixed(suffix);
    }

    const format = `0,0.${"0".repeat(suffix)}`;

    return numeral(val).format(format);
  } catch {
    return "0.000";
  }
};
