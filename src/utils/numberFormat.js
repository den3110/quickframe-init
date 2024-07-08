export function numberFormat(number, options = {
  maximumFractionDigits: 3
}) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
}