import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Har baar jab pathname (URL) change ho, scroll upar chala jaye
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;