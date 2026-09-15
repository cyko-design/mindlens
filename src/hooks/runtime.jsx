import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
  useLayoutEffect,
  useRef,
} from "react";
import en from "../locales/en.json";
import zh from "../locales/zh-CN.json";
import {
  initialSession,
  restoreSession,
  reducer,
  SESSION_KEY,
} from "../domain/session.js";
const AppContext = createContext(null);
const read = (key) => {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key, value) => {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* Memory-only remains functional. */
  }
};
const routes = new Set([
  "home",
  "terms",
  "accuracy",
  "questionnaire",
  "building",
  "results",
  "explore",
  "together",
  "professional",
  "support",
]);
const currentRoute = () => {
  const r = location.hash.slice(1);
  return routes.has(r) ? r : "home";
};
export function Runtime({ children }) {
  const [session, dispatch] = useReducer(reducer, null, () =>
    restoreSession(read(SESSION_KEY)),
  );
  const [locale, setLocale] = useState(
    () =>
      read("mindlens.language") ||
      (navigator.language.toLowerCase().startsWith("zh") ? "zh-CN" : "en"),
  );
  const [route, setRoute] = useState(currentRoute);
  const [entry, setEntry] = useState(0);
  const scrollRestore = useRef(null);
  const strings = locale === "zh-CN" ? zh : en;
  useEffect(() => write(SESSION_KEY, JSON.stringify(session)), [session]);
  useEffect(() => {
    write("mindlens.language", locale);
    document.documentElement.lang = locale;
  }, [locale]);
  useEffect(() => {
    history.scrollRestoration = "manual";
    if (!history.state?.mindlens)
      history.replaceState(
        { mindlens: true, depth: 0, scroll: 0 },
        "",
        `#${currentRoute()}`,
      );
    const pop = () => {
      scrollRestore.current = history.state?.scroll || 0;
      if (currentRoute() === "questionnaire") dispatch({ type: "review" });
      setRoute(currentRoute());
      setEntry((e) => e + 1);
    };
    addEventListener("popstate", pop);
    return () => removeEventListener("popstate", pop);
  }, []);
  useLayoutEffect(() => {
    const y = scrollRestore.current ?? 0;
    scrollRestore.current = null;
    const id = requestAnimationFrame(() => {
      window.scrollTo(0, y);
      if (!y)
        document
          .querySelector("main h1, main legend")
          ?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [route, entry]);
  function go(next, { replace = false } = {}) {
    if (next === "questionnaire") dispatch({ type: "review" });
    history.replaceState({ ...history.state, scroll: window.scrollY }, "");
    const data = {
      mindlens: true,
      depth: (history.state?.depth || 0) + (replace ? 0 : 1),
      scroll: 0,
    };
    history[replace ? "replaceState" : "pushState"](data, "", `#${next}`);
    scrollRestore.current = 0;
    setRoute(next);
    setEntry((e) => e + 1);
  }
  function back() {
    if (history.state?.depth > 0) history.back();
    else go("home", { replace: true });
  }
  const value = {
    session,
    dispatch,
    patch: (patch) => dispatch({ type: "patch", patch }),
    locale,
    strings,
    t: (key, n) => strings.ui[key]?.replace("{n}", n),
    toggleLocale: () => setLocale((l) => (l === "en" ? "zh-CN" : "en")),
    route,
    go,
    back,
    entry,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export const useApp = () => useContext(AppContext);
export function useMedia(query) {
  const [value, set] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const m = matchMedia(query);
    const update = () => set(m.matches);
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, [query]);
  return value;
}
export function useOverflow(ref, disabled) {
  const { route, entry } = useApp();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (disabled) {
      setShow(false);
      return;
    }
    const measure = () => {
      const el = ref.current;
      const viewport = window.visualViewport?.height || innerHeight;
      const bottom = (el?.getBoundingClientRect().bottom || 0) + scrollY;
      setShow(bottom > viewport + 2 && scrollY < 48);
    };
    const ro = new ResizeObserver(measure);
    if (ref.current) {
      ro.observe(ref.current);
    }
    addEventListener("scroll", measure, { passive: true });
    addEventListener("resize", measure);
    visualViewport?.addEventListener("resize", measure);
    measure();
    return () => {
      ro.disconnect();
      removeEventListener("scroll", measure);
      removeEventListener("resize", measure);
      visualViewport?.removeEventListener("resize", measure);
    };
  }, [route, entry, disabled, ref]);
  return show;
}
