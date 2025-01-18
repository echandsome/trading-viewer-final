import { useState, useEffect, useRef } from "react";
import { Button, MenuItem, CbboItem } from "@/components";
import {
  additionalCurrencies,
  cummulationOptions,
} from "@/utils/currencyPairs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWebSocketStore from "@/store/useWebSocketStore";
import {
  faChevronDown,
  faChevronUp,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const {
    bestBidData,
    bestAskData,
    activeProduct,
    priceIncrement,
    setActiveProduct,
    setPriceIncrement,
  } = useWebSocketStore();

  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isCummulationMenuOpen, setIsCummulationMenuOpen] = useState(false);

  const handleProductMenuToggle = () => {
    setIsProductMenuOpen((prevState) => !prevState);
    setIsCummulationMenuOpen(false);
  };

  const handleCummulationMenuToggle = () => {
    setIsCummulationMenuOpen((prevState) => !prevState);
    setIsProductMenuOpen(false);
  };

  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProductMenuOpen(false);
        setIsCummulationMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="md:flex items-center gap-4 md:!p-0 p-4" ref={menuRef}>
      <div className="relative md:!p-0 py-3">
        <Button
          bgColor="#3EA2F4"
          color="white"
          borderRadius="8px"
          padding="6px 24px"
          fontSize="18px"
          hoverBgColor="rgb(43, 113, 170)"
          disabledBgColor="lightgray"
          onClick={handleProductMenuToggle}
        >
          <div className="flex items-center gap-2">
            <div className="bg-gray-800 p-3 rounded-full size-5 flex items-center justify-center">
              <FontAwesomeIcon icon={faDollarSign} />
            </div>
            <span className="flex items-center justify-center gap-2">
              {activeProduct}
              <FontAwesomeIcon
                icon={isProductMenuOpen ? faChevronUp : faChevronDown}
                style={{ fontSize: "12px" }}
              />
            </span>
          </div>
        </Button>
        <MenuItem
          isMenuOpen={isProductMenuOpen}
          setIsMenuOpen={setIsProductMenuOpen}
          label={activeProduct}
          options={additionalCurrencies}
          action={setActiveProduct}
        />
      </div>
      <div className="relative md:!p-0 py-3 w-fit">
        <Button
          bgColor="#3EA2F4"
          color="white"
          borderRadius="8px"
          padding="6px 24px"
          fontSize="18px"
          hoverBgColor="rgb(43, 113, 170)"
          disabledBgColor="lightgray"
          onClick={handleCummulationMenuToggle}
        >
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center gap-2">
              {priceIncrement}
              <FontAwesomeIcon
                icon={isCummulationMenuOpen ? faChevronUp : faChevronDown}
                style={{ fontSize: "12px" }}
              />
            </span>
          </div>
        </Button>
        <MenuItem
          isMenuOpen={isCummulationMenuOpen}
          setIsMenuOpen={setIsCummulationMenuOpen}
          label={priceIncrement}
          options={cummulationOptions}
          action={setPriceIncrement}
        />
      </div>
      <div className="flex items-center gap-6 md:!p-0 py-4">
        <CbboItem
          label={"Best Bid"}
          value={bestBidData?.price}
          color={"green"}
        />
        <CbboItem label={"Bid Ask"} value={bestAskData?.price} color={"red"} />
      </div>
    </div>
  );
}

export default Navbar;
