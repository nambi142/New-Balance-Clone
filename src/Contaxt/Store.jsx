import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import i18next from "i18next";
import { auth, db } from "../Pages/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18next.language || "en");
  const [slideIndex, setSlideIndex] = useState(0);
  const [newOpen, setNewOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const langTimeout = useRef(null);
  const helpTimeout = useRef(null);
  const newTimeout = useRef(null);

  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
  ];

  const messages = [
    "Members: Extra 15% off select markdowns. Shop now.",
    "Stand out on the court — shop tennis.",
    "Free shipping and returns for members. Learn more.",
  ];

  // inside StoreProvider component
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48); // when scrolled past header height
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll promo messages every 3 seconds
  useEffect(() => {
    const interval = setTimeout(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // scroll every 3 seconds

    return () => clearTimeout(interval);
  }, [slideIndex, messages.length]);

  // Language change
  useEffect(() => {
    const onLangChange = (lng) => setCurrentLang(lng);
    i18next.on("languageChanged", onLangChange);
    return () => i18next.off("languageChanged", onLangChange);
  }, []);

  // Restore cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  // Restore userInfo from localStorage (before Firebase confirms)
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  // Sync Firebase auth & Firestore profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));

        const userRef = doc(db, "users", currentUser.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const fullUser = { uid: currentUser.uid, ...snap.data() };
          setUserInfo(fullUser);
          localStorage.setItem("userInfo", JSON.stringify(fullUser));
        }
      } else {
        setUser(null);
        setUserInfo(null);
        localStorage.removeItem("user");
        localStorage.removeItem("userInfo");
      }
    });

    return () => unsubscribe();
  }, []);

  // Add to cart and persist
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems, item];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Dropdown open/close handlers
  const handleMouseEnter = (setOpen, timeoutRef) => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = (setOpen, timeoutRef) => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 700);
  };

  return (
    <StoreContext.Provider
      value={{
        scrolled,
        langOpen,
        setLangOpen,
        helpOpen,
        setHelpOpen,
        newOpen,
        setNewOpen,
        newTimeout,
        currentLang,
        setCurrentLang,
        langTimeout,
        helpTimeout,
        languages,
        messages,
        slideIndex,
        setSlideIndex,
        handleMouseEnter,
        handleMouseLeave,
        addToCart,
        cartItems,
        setCartItems,
        user,
        setUser,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
