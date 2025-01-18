import { useEffect, useState } from "react";
import { BestOrder, MarketDepthChart, OrderTable } from "@/components";
import Layout from "../Layout/index";
import { subscribeToCoinbase } from "@/utils/webSocketUtils.js";
import useWebSocketStore from "@/store/useWebSocketStore";

function Dashboard() {
  const { activeProduct, priceIncrement } = useWebSocketStore();
  const [isChartVisible, setIsChartVisible] = useState(true);
  const [isOrderBookVisible, setIsOrderBookVisible] = useState(true);
  const [isTableVisible, setTableVisible] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToCoinbase(activeProduct, priceIncrement);

    return () => {
      unsubscribe();
    };
  }, [activeProduct]);

  return (
    <div className="w-full h-full">
      <div className="relative my-2">
        <Layout
          heading="Chart"
          id="chart"
          layoutHeight="calc(100% - 5%)"
          isVisible={isChartVisible}
          setIsVisible={setIsChartVisible}
        >
          <MarketDepthChart />
        </Layout>
      </div>
      <div className="w-full md:flex items-start justify-center gap-2">
        <div
          className={`relative ${isOrderBookVisible ? "block" : "hidden"} ${
            isTableVisible ? "md:w-1/2 xs:w-full" : "w-full"
          }`}
        >
          <Layout
            heading="Order Book"
            id="order"
            layoutHeight="100%"
            isVisible={isOrderBookVisible}
            setIsVisible={setIsOrderBookVisible}
          >
            <OrderTable />
          </Layout>
        </div>
        <div
          className={`relative ${isTableVisible ? "block" : "hidden"} ${
            isOrderBookVisible ? "md:!w-1/2 w-full md:m-0 my-2" : "w-full"
          }`}
        >
          <Layout
            heading="Table"
            id="table"
            layoutHeight="100%"
            isVisible={isTableVisible}
            setIsVisible={setTableVisible}
          >
            <BestOrder />
          </Layout>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
