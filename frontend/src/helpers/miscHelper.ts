// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
export const filterInt = (value: string) => {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value);
  } else {
    return null;
  }
};
