export function normalizeMongo(value) {
  if (value === null || value === undefined) return value;

  if (Array.isArray(value)) {
    return value.map(normalizeMongo);
  }

  if (typeof value === "object") {
    if (Object.keys(value).length === 1 && "$oid" in value) {
      return value.$oid;
    }
    if (Object.keys(value).length === 1 && "$date" in value) {
      return value.$date;
    }

    const out = {};
    for (const [key, nested] of Object.entries(value)) {
      out[key] = normalizeMongo(nested);
    }
    return out;
  }

  return value;
}
