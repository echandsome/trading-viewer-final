import Decimal from "decimal.js";

export const cumulativeOrders = (orders, increment) => {
  const cumulative = {};

  orders.forEach((order) => {
    if (order.length === 3) {
      const [_, price, size] = order;
      try {
        const decimalPrice = new Decimal(price);
        const bucket = decimalPrice.div(increment).floor().mul(increment);
        const bucketKey = formatPrice(bucket, increment);
        cumulative[bucketKey] = (cumulative[bucketKey] || new Decimal(0)).add(
          size
        );
      } catch (error) {
        console.error(
          `Error for orders ${JSON.stringify(order)}: ${error.message}`
        );
      }
    } else if (order.length === 2) {
      const [price, size] = order;
      try {
        const decimalPrice = new Decimal(price);
        const bucket = decimalPrice.div(increment).floor().mul(increment);
        const bucketKey = formatPrice(bucket, increment);
        cumulative[bucketKey] = (cumulative[bucketKey] || new Decimal(0)).add(
          size
        );
      } catch (error) {
        console.error(
          `Error for orders ${JSON.stringify(order)}: ${error.message}`
        );
      }
    } else {
      console.error(`Invalid order format: ${JSON.stringify(order)}`);
    }
  });

  return Object.entries(cumulative)
    .map(([priceStr, decimalSize]) => [
      parseFloat(priceStr),
      parseFloat(formatSize(decimalSize)),
    ])
    .sort((a, b) => new Decimal(a[0]).cmp(new Decimal(b[0])));
};

export const findUpdatedOrders = (currentOrders, prevOrders) => {
  return currentOrders.filter(
    (order) =>
      !prevOrders.find(
        ([prevPrice, prevSize]) =>
          prevPrice === order[0] && prevSize === order[1]
      )
  );
};

export const formatSize = (size) => {
  return size.toFixed(5);
};

const formatPrice = (price, increment) => {
  const decimalFormat =
    increment < 1 ? increment.toString().split(".")[1].length : 0;
  return price.toFixed(decimalFormat);
};
