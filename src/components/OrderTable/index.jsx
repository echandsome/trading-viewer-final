import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import OrderTable from "./OrderTable";
import useWebSocketStore from "@/store/useWebSocketStore";
import LoadingSpinner from "../LoadingSpinner/index";
import { cumulativeOrders, findUpdatedOrders } from "../../utils/orderBook";

const OrderBook = () => {
  const { isLoading, bids, asks, priceIncrement, prevBids, prevAsks } =
    useWebSocketStore();
  const cumulativeBid = useMemo(
    () => cumulativeOrders(bids, priceIncrement),
    [bids, priceIncrement]
  );
  const cumulativeAsks = useMemo(
    () => cumulativeOrders(asks, priceIncrement),
    [asks, priceIncrement]
  );

  const topBids = useMemo(
    () => cumulativeBid.slice(-20).reverse(),
    [cumulativeBid]
  );
  const topAsks = useMemo(
    () => cumulativeAsks.slice(0, 20).reverse(),
    [cumulativeAsks]
  );

  const [delayedBids, setDelayedBids] = useState([]);
  const [delayedAsks, setDelayedAsks] = useState([]);

  const updatedBids = useMemo(
    () => findUpdatedOrders(topBids, prevBids),
    [topBids, prevBids]
  );
  const updatedAsks = useMemo(
    () => findUpdatedOrders(topAsks, prevAsks),
    [topAsks, prevAsks]
  );

  const throttleUpdate = useRef((bids, asks) => {
    setDelayedBids(bids);
    setDelayedAsks(asks);
  }).current;

  useEffect(() => {
    throttleUpdate(updatedBids, updatedAsks);
  }, [updatedBids, updatedAsks, throttleUpdate]);

  return (
    <>
      {isLoading ? (
        <div className="min-h-[260px] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3 w-full">
          <OrderTable
            isAsked={true}
            data={topAsks}
            updatedOrders={delayedAsks}
          />
          <OrderTable
            isAsked={false}
            data={topBids}
            updatedOrders={delayedBids}
          />
        </div>
      )}
    </>
  );
};

export default OrderBook;
