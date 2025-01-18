import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function MenuItem({ isMenuOpen, setIsMenuOpen, label, options, action }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isMenuOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMenuOpen]);

  const selectOption = (option) => {
    action(option.Symbol);
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && (
        <div className="absolute md:!top-10 top-14 z-[999] bg-[#1F2A31] rounded-md w-full overflow-y-auto h-48 menu-container min-w-96">
          <div className="p-2">
            <input
              type="text"
              className="w-full py-1 px-4 bg-transparent border border-gray-300 rounded-sm focus:outline-blue-500 focus:ring-inset focus-within:outline-blue-500 focus-visible:outline-none focus:border-blue-500 focus-within:border-blue-500"
              value={label}
              readOnly
              ref={inputRef}
            />
          </div>
          {options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-4 hover:bg-gray-700 cursor-pointer ${
                label === option.Symbol
                  ? "bg-[#3EA2F4] hover:!bg-[#3EA2F4]"
                  : ""
              }`}
              onClick={() => selectOption(option)}
            >
              <FontAwesomeIcon icon={faStar} />
              <span className="flex flex-col items-start font-semibold text-sm font-serif py-3">
                {option.Name}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MenuItem;
