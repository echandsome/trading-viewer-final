import useWebSocketStore from "@/store/useWebSocketStore";

const BlinkingIndicator = () => {
  const { connection } = useWebSocketStore();
  return (
    <div className="relative md:block hidden">
      <span
        className={`text-gray-300 text-xs font-semibold ${
          connection ? "" : "!line-through"
        }`}
      >
        Connection
      </span>
      <div
        className={`size-2 rounded-full border border-gray-950 absolute top-1 -right-2 ${
          connection ? "bg-green-500 animate-blink" : "bg-red-500 animate-blink"
        }`}
      ></div>
    </div>
  );
};

export default BlinkingIndicator;
