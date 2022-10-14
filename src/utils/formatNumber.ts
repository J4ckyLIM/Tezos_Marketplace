export const formatNumber = (number: number, limit?: number) => {
  return number !== 0 && typeof number === 'number'
    ? number.toFixed(limit ?? 2)
    : number;
};
