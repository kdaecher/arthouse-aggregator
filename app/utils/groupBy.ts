export default function groupBy(data: Record<string, any>[], field: string) {
  const result = data.reduce((x, y) => {

    (x[y[field]] = x[y[field]] || []).push(y);

    return x;

  }, {});

  return result;
}
