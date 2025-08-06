// src/Components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Override browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Always scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    return () => {
      // (Optional) Reset back to auto on cleanup if needed
      // window.history.scrollRestoration = "auto";
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
