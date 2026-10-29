import { useEffect } from "react";
import { useLocation } from "react-router";
const ScrollToTop = ({ scrollRef }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      // Wait a brief split second for lazy components to mount
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 50);
    }
  }, [pathname, scrollRef]);
  return null;
};

export default ScrollToTop;
