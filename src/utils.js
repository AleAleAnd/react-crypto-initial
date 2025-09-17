export function percentDifference(price1, price2) {
  return +(100 * Math.abs((price1 - price2) / ((price1 + price2) / 2)))
}

export function toCapitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
