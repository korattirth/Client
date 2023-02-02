export const getCookie = (key: string) => {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
};

export const currencyFormate = (price: number) => {
  return "$" + (price / 100).toFixed(2);
};
