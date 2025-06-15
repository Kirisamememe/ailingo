"use client";

import { createContext, use, useEffect, useMemo, useState } from "react";

type ScrollStateContextType = {
  atTop: boolean;
  setAtTop: React.Dispatch<React.SetStateAction<boolean>>;
  prevScrollTop: number;
  setPrevScrollTop: React.Dispatch<React.SetStateAction<number>>;
  isGoingUp: boolean;
  setIsGoingUp: React.Dispatch<React.SetStateAction<boolean>>;
  headerFixed: boolean;
  setHeaderFixed: React.Dispatch<React.SetStateAction<boolean>>;
  headerStatic: boolean;
  setHeaderStatic: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * ScrollStateContext
 */
export const ScrollStateContext = createContext<ScrollStateContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

/**
 * ScrollStateProvider
 */
export const ScrollStateProvider = ({ children }: Props) => {
  const [atTop, setAtTop] = useState(true);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [isGoingUp, setIsGoingUp] = useState(true);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [headerStatic, setHeaderStatic] = useState(false);

  useEffect(() => {
    if (headerFixed || headerStatic) return;

    const handleScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      setPrevScrollTop(currentScrollTop);
      if (currentScrollTop > 16) {
        setAtTop(false);
      } else if (currentScrollTop <= 16) {
        setAtTop(true);
      }

      if (currentScrollTop > prevScrollTop + 2) {
        setIsGoingUp(false);
      } else if (currentScrollTop < prevScrollTop - 2) {
        setIsGoingUp(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerFixed, headerStatic, prevScrollTop]);

  const values = useMemo(
    () => ({
      atTop,
      setAtTop,
      prevScrollTop,
      setPrevScrollTop,
      isGoingUp,
      setIsGoingUp,
      headerFixed,
      setHeaderFixed,
      headerStatic,
      setHeaderStatic,
    }),
    [atTop, prevScrollTop, isGoingUp, headerFixed, headerStatic],
  );

  return <ScrollStateContext value={values}>{children}</ScrollStateContext>;
};

/**
 * useScrollState
 */
export const useScrollState = () => {
  const context = use(ScrollStateContext);
  if (!context) {
    throw new Error("useScrollState must be used within an ScrollStateProvider");
  }
  return context;
};
