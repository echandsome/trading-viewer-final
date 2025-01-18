import { useState, useEffect, useRef } from "react";
import { Button, Navigation, BlinkingIndicator } from "@/components";
import Logo from "@/assets/logo.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <header className="bg-[#172229] h-16 md:px-6 md:py-1">
        <div className="flex items-center justify-between relative z-[99] bg-[#172229] w-full">
          <div className="md:flex items-center gap-3 w-full md:justify-normal justify-between">
            <div className="flex items-center justify-between w-full md:w-fit">
              <Button
                bgColor="transparent"
                color="white"
                borderRadius="50%"
                padding="12px"
                size="60"
                fontSize="18"
                hoverBgColor="rgba(255, 255, 255, 0.08)"
                disabledBgColor="lightgray"
              >
                <span className="flex items-center justify-center">
                  <img src={Logo} alt="Logo" loading="lazy" />
                </span>
              </Button>

              <div className="md:hidden px-4">
                <Button
                  bgColor="transparent"
                  color="white"
                  padding="6px"
                >
                  <span onClick={toggleMobileMenu}>
                  <FontAwesomeIcon
                    icon={isMobileMenuOpen ? faTimes : faBars}
                    size="lg"
                  />
                  </span>
                </Button>
              </div>
            </div>

            <div
              className={`${
                isMobileMenuOpen ? "block" : "hidden"
              } md:flex md:items-center md:gap-4 w-full md:h-full min z-[999] md:!border-0 border-t border-gray-500`}
            >
              <Navigation />
            </div>
          </div>

          <BlinkingIndicator />
        </div>
      </header>
    </>
  );
}

export default Navbar;