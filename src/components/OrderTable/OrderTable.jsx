import { useEffect, useState, useCallback } from "react";
import throttle from 'lodash/throttle';

const OrderTable = ({ isAsked = true, data, updatedOrders }) => {
  const [updatedOrdersState, setUpdatedOrdersState] = useState([]);

  const throttledUpdate = useCallback(
    throttle((orders) => {
      setUpdatedOrdersState(orders);
    }, 2500),
    []
  );

  useEffect(() => {
    throttledUpdate(updatedOrders);

    const timeout = setTimeout(() => {
      setUpdatedOrdersState([]);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [updatedOrders, throttledUpdate]);

  return (
    <div className="w-full overflow-y-scroll h-64 scrollbar-hidden bg-[#0D1820]">
      <table className="text-xs text-left border-collapse w-full">
        <thead className="bg-[#141e24]">
          <tr className="table-head">
            <th className="py-3 px-6 text-slate-500 w-1/2 text-start">Price(USD)</th>
            <th className="py-3 px-6 text-slate-500 w-1/2 text-start">Size</th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto w-full text-start">
          {data.map(([price, size], index) => (
            <tr
              key={index}
              className={
                updatedOrdersState.find(([p]) => p === price)
                  ? !isAsked
                    ? "animate-redFlash"
                    : "animate-greenFlash"
                  : ""
              }
            >
              <td
                className={`px-2 w-1/2 ${isAsked ? "text-green-600" : "text-red-600"}`}
              >
                {price}
              </td>
              <td className="px-2 w-1/2">{size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;