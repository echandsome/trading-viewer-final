import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faMinus, faX } from "@fortawesome/free-solid-svg-icons";
import useWebSocketStore from "@/store/useWebSocketStore";
import "./index.css";

const Layout = ({ heading, children, id, layoutHeight, isVisible, setIsVisible }) => {
  const { isExpanded, setIsExpanded } = useWebSocketStore((state) => ({
    isExpanded: state.isExpanded[id] || false,
    setIsExpanded: (id, value) =>
      state.setIsExpanded({ ...state.isExpanded, [id]: value }),
  }));
  

  if (!isVisible) return null;

  return (
    <div
      className={`layout-container ${isExpanded ? "expanded" : ""}`}
      style={{ height: isExpanded ? layoutHeight : "" }}
    >
      <div className="layout-header">
        <div className="flex items-center justify-center gap-1 w-fit">
          <span className="text-white text-sm font-normal">{heading}</span>
          <span
            className="icon cursor-pointer text-[10px]"
            onClick={() => setIsVisible(false)}
          >
            <FontAwesomeIcon icon={faX} />
          </span>
        </div>
        {isExpanded ? (
          <span
            className="icon cursor-pointer text-sm"
            onClick={() => setIsExpanded(id, false)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </span>
        ) : (
          <span
            className="icon cursor-pointer text-sm"
            onClick={() => setIsExpanded(id, true)}
          >
            <FontAwesomeIcon icon={faExpand} />
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default Layout;
