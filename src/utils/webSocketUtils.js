import ReconnectingWebSocket from "reconnecting-websocket";
import useWebSocketStore from "@/store/useWebSocketStore";

const subscribeToCoinbase = (productId) => {
  const {
    setBids,
    setAsks,
    setOrderBookData,
    setConnection,
    updateBidData,
    setIsLoading,
  } = useWebSocketStore.getState();

  setIsLoading(true);
  const COINBASE_WEBSOCKET_URL = import.meta.env.VITE_COINBASE_SOCKET_URL;
  const socket = new ReconnectingWebSocket(COINBASE_WEBSOCKET_URL);

  socket.onopen = () => {
    const subscribeMessage = {
      type: "subscribe",
      product_ids: [productId],
      channels: ["level2_batch", "ticker"],
    };

    socket.send(JSON.stringify(subscribeMessage));
    setConnection(true);
    console.log("WebSocket connection opened");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "l2update") {
      const bids = data.changes.filter((change) => change[0] === "buy");
      const asks = data.changes.filter((change) => change[0] === "sell");
      setOrderBookData(data);
      setBids(bids);
      setAsks(asks);
    } else if (data.type === "ticker") {
      updateBidData({
        best_bid: data.best_bid,
        best_bid_size: data.best_bid_size,
        best_ask: data.best_ask,
        best_ask_size: data.best_ask_size,
        time: data.time,
      });

      setIsLoading(false);
    }
  };

  socket.onclose = () => {
    setConnection(false);
    console.log("WebSocket connection closed");
  };

  return () => {
    socket.close();
  };
};

export { subscribeToCoinbase };
