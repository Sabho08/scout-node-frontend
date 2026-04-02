import { useState, useRef, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { amazonApi } from "../services/amazonApi";

const GooeyFilter = () => {
  return (
    <svg aria-hidden="true" className="absolute h-0 w-0">
      <defs>
        <filter id="goo-effect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -12"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const SearchIcon = ({ isUnsupported }: { isUnsupported: boolean }) => {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.8, x: -4, filter: isUnsupported ? "none" : "blur(3px)" }}
      animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.8, x: -4, filter: isUnsupported ? "none" : "blur(3px)" }}
      transition={{ delay: 0.1, duration: 0.8, type: "spring", bounce: 0.15 }}
      width="14"
      height="14"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
        fill="white"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </motion.svg>
  );
};

const LoadingIcon = () => {
  return (
    <svg className="loading-icon animate-spin h-4 w-4" viewBox="0 0 256 256" stroke="white">
      <rect width="256" height="256" fill="none" />
      <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <line x1="195.88" y1="60.12" x2="173.25" y2="82.75" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <line x1="195.88" y1="195.88" x2="173.25" y2="173.25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <line x1="60.12" y1="195.88" x2="82.75" y2="173.25" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <line x1="60.12" y1="60.12" x2="82.75" y2="82.75" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
    </svg>
  );
};

const buttonVariants = {
  initial: { x: 0, width: 80 },
  step1: { x: 0, width: 80 },
  step2: { x: -20, width: 220 },
};

const iconVariants = {
  hidden: { x: -40, opacity: 0 },
  visible: { x: 120, opacity: 1 },
};

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

export const GooeySearchBar = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState({ step: 1, searchData: [] as string[], searchText: "", isLoading: false });
  const debouncedSearchText = useDebounce(state.searchText, 400);
  const isUnsupported = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes("safari") && !ua.includes("chrome") && !ua.includes("chromium") && !ua.includes("android");
  }, []);

  const handleButtonClick = () => { if (state.step === 1) setState(s => ({ ...s, step: 2 })); };

  useEffect(() => {
    if (state.step === 2) inputRef.current?.focus();
    else setState(s => ({ ...s, searchText: "", searchData: [], isLoading: false }));
  }, [state.step]);

  useEffect(() => {
    let isC = false;
    if (debouncedSearchText && debouncedSearchText.length > 2) {
      (async () => {
        setState(s => ({ ...s, isLoading: true }));
        try {
          const suggestions = await amazonApi.getAutocomplete(debouncedSearchText);
          if (!isC) setState(s => ({ ...s, searchData: suggestions.slice(0, 3), isLoading: false }));
        } catch (error) {
          if (!isC) setState(s => ({ ...s, isLoading: false }));
        }
      })();
    } else setState(s => ({ ...s, searchData: [], isLoading: false }));
    return () => { isC = true; };
  }, [debouncedSearchText]);

  const handleSearch = (query: string) => {
    setState(s => ({ ...s, step: 1, searchText: "", searchData: [] }));
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className={`relative flex items-center justify-end ${isUnsupported ? "" : "gooey-container"}`}>
      <GooeyFilter />
      <div className="relative flex items-center justify-center h-16 w-full">
        <motion.div
          className="relative flex items-center justify-center transform scale-90"
          initial="initial"
          animate={state.step === 1 ? "step1" : "step2"}
          transition={{ duration: 0.6, type: "spring", bounce: 0.1 }}
        >
          {/* Results Modal/Pops */}
          <AnimatePresence>
            {state.searchData.length > 0 && (
              <motion.div
                className="absolute top-full mt-4 w-64 bg-black border border-white/10 rounded-2xl p-2 shadow-2xl z-[100]"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
              >
                 {state.searchData.map((item) => (
                   <div 
                    key={item} 
                    onClick={() => handleSearch(item)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors border-b border-white/[0.03] last:border-0 overflow-hidden"
                   >
                      <span className="material-symbols-outlined text-xs text-primary">circle</span>
                      <span className="text-[11px] font-bold text-white truncate inter">{item}</span>
                   </div>
                 ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header Pill */}
          <motion.div
            variants={buttonVariants}
            onClick={handleButtonClick}
            className="cursor-pointer rounded-full h-[36px] flex items-center justify-center bg-black border border-white/5 shadow-xl"
          >
            {state.step === 1 ? (
              <span className="text-white text-[10px] font-bold uppercase tracking-wider">Search</span>
            ) : (
              <input
                ref={inputRef}
                type="text"
                value={state.searchText}
                className="bg-transparent border-none focus:ring-0 w-full px-4 text-white placeholder-white/20 text-xs font-semibold"
                placeholder="Find Best Price..."
                onChange={e => setState(s => ({ ...s, searchText: e.target.value }))}
                onKeyDown={e => e.key === 'Enter' && handleSearch(state.searchText)}
                onBlur={() => state.searchText === "" && setState(s => ({ ...s, step: 1 }))}
              />
            )}
          </motion.div>

          {/* Header Circle */}
          <AnimatePresence mode="wait">
            {state.step === 2 && (
              <motion.div
                key="header-icon"
                onClick={() => state.searchText && handleSearch(state.searchText)}
                className="absolute w-[36px] h-[36px] bg-black rounded-full flex items-center justify-center border border-white/5 shadow-xl cursor-pointer"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={iconVariants}
                transition={{ duration: 0.7, type: "spring", bounce: 0.1 }}
              >
                {!state.isLoading ? <SearchIcon isUnsupported={isUnsupported} /> : <LoadingIcon />}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
