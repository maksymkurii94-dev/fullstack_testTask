const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const currencyCents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatCurrency(value, precise = false) {
  return precise ? currencyCents.format(value) : currency.format(value);
}

export function formatDate(iso) {
  if (!iso) return "—";
  return dateFmt.format(new Date(iso));
}

export function formatPercent(value) {
  return `${value}%`;
}
