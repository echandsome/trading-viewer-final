import { create } from 'zustand';
import { throttle } from 'lodash';

const updateQueue = {
  bids: [],
  asks: [],
};

const useOrderBookStore = create((set, get) => ({
  bids: [],
  asks: [],
  orderBookData: [],
  prevBids: [],
  prevAsks: [],
  tickerData: [],
  isLoading: true,
  priceIncrement: 0.01,
  bestBidData: null,
  bestAskData: null,
  connection: false,
  activeProduct: 'BTC-USD',
  isExpanded: {},

  setBids: (bids) => set({ bids }),
  setAsks: (asks) => set({ asks }),
  setOrderBookData: (orderBookData) => set({ orderBookData }),
  setActiveProduct: (activeProduct) => set({ activeProduct }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setConnection: (connection) => set({ connection }),
  setPriceIncrement: (priceIncrement) => set({ priceIncrement }),
  setIsExpanded: (isExpanded) => set({ isExpanded }),

  updateBids: (update) => {
    updateQueue.bids.push(update);
  },

  updateAsks: (update) => {
    updateQueue.asks.push(update);
  },

  updateBidData: throttle((ticker) => {
    set((state) => {
      const currentTime = new Date().getTime();
      const oneMinuteAgo = currentTime - 60000;
      const newTickerData = [...state.tickerData, ticker];
      return {
        bestBidData: {
          price: ticker.best_bid,
          size: ticker.best_bid_size,
        },
        bestAskData: {
          price: ticker.best_ask,
          size: ticker.best_ask_size,
        },
        tickerData: newTickerData.filter((item) => {
          const timestamp = new Date(item.time).getTime();
          return timestamp >= oneMinuteAgo;
        }),
      };
    });
  }, 1000),

  setUpdates: () => {
    const { bids, asks } = get();
    const updatedBids = updateQueue.bids.reduce((acc, update) => setNewOrderList(acc, update), bids);
    const updatedAsks = updateQueue.asks.reduce((acc, update) => setNewOrderList(acc, update), asks);

    set({ bids: updatedBids, prevBids: bids, asks: updatedAsks, prevAsks: asks });
    updateQueue.bids = [];
    updateQueue.asks = [];
  },

  resetChartData: () => set(() => ({ bestAskData: null, bestBidData: null, tickerData: [] })),
}));

const setNewOrderList = (orders, update) => {
  const [price, size] = update.slice(1).map(parseFloat);
  const index = orders.findIndex(([p]) => p === price);

  if (size === 0) {
    return index > -1 ? orders.filter((_, i) => i !== index) : orders;
  } else if (index > -1) {
    return orders.map((order, i) => (i === index ? [price, size] : order));
  } else {
    const newOrders = [...orders, [price, size]];
    return newOrders.sort((a, b) => a[0] - b[0]);
  }
};

export default useOrderBookStore;
