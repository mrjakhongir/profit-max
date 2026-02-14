export function formatNumber(
  value: number | string | null | undefined,
): string {
  if (value === null || value === undefined || value === "") return "0.00";

  const number_ =
    typeof value === "string" ? Number(value.replaceAll(",", "")) : value;

  if (Number.isNaN(number_)) return "0.00";

  return number_.toLocaleString("en-US");
}
