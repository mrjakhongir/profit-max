import { isSameMonth } from "date-fns";

export function getDividendAmount(
  spottingDate: Date,
  depositDate: string,
  initial: number,
  monthly: number,
) {
  return isSameMonth(spottingDate, depositDate) ? initial : monthly;
}
