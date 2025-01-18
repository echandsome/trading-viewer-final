import useWebSocketStore from "@/store/useWebSocketStore";
import LoadingSpinner from "../LoadingSpinner/index";

const BestOrder = () => {
  const { bestBidData, bestAskData, isLoading } = useWebSocketStore();

  if (isLoading) {
    return (
      <div className="min-h-[260px] flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#0D1820] min-h-[256px]">
      <table className="min-w-full divide-y divide-[#323f46]">
        <thead className="bg-[#141e24]">
          <tr>
            <th
              scope="col"
              className="py-3 px-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Price (USD)
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Quantity
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#323f46]">
          {bestBidData && (
            <tr className="w-full">
              <td className="py-4 px-6 text-sm text-white">Best Bid</td>
              <td className="py-4 px-6 text-sm text-green-500">
                {bestBidData.price}
              </td>
              <td className="py-4 px-6 text-sm text-white">
                {bestBidData.size}
              </td>
            </tr>
          )}
          {bestAskData && (
            <tr className="w-full bg-[#0D1820]">
              <td className="py-4 px-6 text-sm text-white">Best Ask</td>
              <td className="py-4 px-6 text-sm text-red-500">
                {bestAskData.price}
              </td>
              <td className="py-4 px-6 text-sm text-white">
                {bestAskData.size}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BestOrder;
