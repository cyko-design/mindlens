import { useId, useRef } from "react";
import { useApp, useOverflow } from "../hooks/runtime.jsx";
export function Icon({ name = "arrow", ...props }) {
  const paths = {
    arrow: (
      <>
        <path d="M4 12h16M14 6l6 6-6 6" />
      </>
    ),
    back: (
      <>
        <path d="M20 12H4m6-6-6 6 6 6" />
      </>
    ),
    down: (
      <>
        <path d="M12 4v16m-6-6 6 6 6-6" />
      </>
    ),
    chevron: <path d="m6 9 6 6 6-6" />,
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v6m0-10v1" />
      </>
    ),
    heart: <path d="M12 20 3.5 11.5C-2 5 6-1 12 6c6-7 14-1 8.5 5.5Z" />,
    leaf: (
      <>
        <path d="M5 19C-2 9 9 4 21 3c0 13-6 21-16 16Zm-2 2L17 7" />
      </>
    ),
    people: (
      <>
        <circle cx="12" cy="7" r="3" />
        <path d="M6 20v-3a6 6 0 0 1 12 0v3M4 9a3 3 0 0 0 0 6m16-6a3 3 0 0 1 0 6" />
      </>
    ),
    document: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6m-6 4h6m-6 4h4" />
      </>
    ),
    bulb: (
      <>
        <path d="M8 16c-8-8 0-16 7-12 5 3 4 8 1 12l-1 4H9Zm1 1h6" />
        <path d="M2 9H0m23 0h-2M12 0v2" />
      </>
    ),
    infinity: (
      <path d="M12 12C7-1-5 6 2 15c5 6 9-2 10-3 5-13 17-6 10 3-5 6-9-2-10-3Z" />
    ),
    brain: (
      <>
        <path d="M11 4C7 0 4 4 5 7 0 8 2 14 4 14c-3 4 2 8 6 6V4Zm3 0c4-4 7 0 6 3 5 1 3 7 1 7 3 4-2 8-6 6V4Z" />
      </>
    ),
    code: (
      <>
        <path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
export function Logo({ circlesOnly = false }) {
  return (
    <span className={"logo " + (circlesOnly ? "logo-circles" : "")}>
      <svg viewBox="0 0 72 46" aria-hidden="true">
        <circle cx="25" cy="23" r="23" fill="#88d2dc" fillOpacity=".55" />
        <circle cx="48" cy="23" r="23" fill="#b49be9" fillOpacity=".5" />
      </svg>
      {!circlesOnly && <span>MindLens</span>}
    </span>
  );
}
export function Header() {
  const { t, locale, toggleLocale, go } = useApp();
  return (
    <header className="header">
      <div className="header-row">
        <Logo />
        <div className="header-utilities">
          <button onClick={() => go("support")}>{t("supportMe")}</button>
          <span aria-hidden="true">|</span>
          <button
            lang={locale === "en" ? "zh-CN" : "en"}
            aria-label={
              locale === "en" ? "切换至简体中文" : "Switch to English"
            }
            onClick={toggleLocale}
          >
            {locale === "en" ? "中文" : "EN"}
          </button>
        </div>
      </div>
      <p className="tagline">{t("tagline")}</p>
    </header>
  );
}
export function Back() {
  const { t, back } = useApp();
  return (
    <button className="back" onClick={back}>
      <Icon name="back" />
      {t("back")}
    </button>
  );
}
export function Button({
  children,
  secondary = false,
  arrow = false,
  className = "",
  ...props
}) {
  return (
    <button
      className={`${secondary ? "secondary" : "button"} ${className}`}
      {...props}
    >
      {children}
      {arrow && <Icon />}
    </button>
  );
}
export function Card({ children, tone = "", className = "" }) {
  return <section className={`card ${tone} ${className}`}>{children}</section>;
}
export function Waves({ animate = false, className = "" }) {
  const id = useId();
  return (
    <svg
      className={`waves ${animate ? "ambient" : ""} ${className}`}
      viewBox="0 0 800 300"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id}>
          <stop stopColor="#a4e2e9" stopOpacity=".42" />
          <stop offset="1" stopColor="#c6b6f5" stopOpacity=".55" />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`}>
        <path d="M0 10C200 15 215 270 480 235S690 210 800 260V300H0Z" />
        <path d="M0 210C240 130 430 130 570 60S700 15 800 0V300H0Z" />
        <path d="M0 180C210 40 350 100 470 190S650 280 800 240V300H0Z" />
        <path d="M0 220C150 160 360 180 510 250S700 295 800 265V300H0Z" />
      </g>
      <g fill="none" stroke="white" strokeOpacity=".7">
        <path d="M0 195C160 130 410 315 800 245" />
        <path d="M0 240C250 180 325 180 530 245S700 295 800 300" />
      </g>
    </svg>
  );
}
export function Footer({ animate = false }) {
  const { t } = useApp();
  return (
    <footer className="footer">
      <Waves animate={animate} />
      <div className="footer-art">
        <span>{t("footerLeft")}</span>
        <span className="script-art">{t("footerScript")}</span>
      </div>
      <div className="footer-legal">
        <p>
          {t("footReflection")} · {t("footDiagnosis")}
        </p>
        <p>{t("footAdvice")}</p>
        <p>© 2026 MindLens · {t("copyright")}</p>
      </div>
    </footer>
  );
}
export function Page({
  children,
  className = "",
  home = false,
  animate = false,
}) {
  const ref = useRef(null);
  const show = useOverflow(ref, home);
  const { t } = useApp();
  return (
    <>
      <Header />
      <main className={`page ${className}`}>
        <div ref={ref} className="meaningful">
          {!home && <Back />}
          {children}
        </div>
      </main>
      <Footer animate={animate} />
      {show && (
        <button
          className="overflow-cue"
          aria-label={t("more")}
          onClick={() =>
            window.scrollBy({
              top: Math.max(200, innerHeight * 0.65),
              behavior: "instant",
            })
          }
        >
          <Icon name="down" />
        </button>
      )}
    </>
  );
}
export function Tabs({ labels, value, onChange, label }) {
  const id = useId();
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {labels.map((text, i) => (
        <button
          key={text}
          id={`${id}-${i}`}
          role="tab"
          aria-selected={value === i}
          tabIndex={value === i ? 0 : -1}
          onKeyDown={(e) => {
            if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
              e.preventDefault();
              const next =
                e.key === "Home"
                  ? 0
                  : e.key === "End"
                    ? labels.length - 1
                    : (value +
                        (e.key === "ArrowLeft" ? -1 : 1) +
                        labels.length) %
                      labels.length;
              onChange(next);
              document.getElementById(`${id}-${next}`)?.focus();
            }
          }}
          onClick={() => onChange(i)}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
export function RadioGroup({ question, value, onChange, responses }) {
  return (
    <fieldset className="answers">
      <legend className="sr-only">{question}</legend>
      {responses.map((label, i) => (
        <label className={`radio ${value === 4 - i ? "selected" : ""}`} key={i}>
          <input
            type="radio"
            name="response"
            value={4 - i}
            checked={value === 4 - i}
            onChange={() => onChange(4 - i)}
          />
          <span>{label}</span>
        </label>
      ))}
    </fieldset>
  );
}
export function Accordion({ name, level, open, onToggle, children }) {
  const id = useId();
  return (
    <div className={`accordion ${open ? "open" : ""}`}>
      <h2>
        <button aria-expanded={open} aria-controls={id} onClick={onToggle}>
          <span>{name}</span>
          <span className="level">{level}</span>
          <Icon name="chevron" />
        </button>
      </h2>
      <div id={id} hidden={!open} className="accordion-body">
        {children}
      </div>
    </div>
  );
}
export function InformationPage({ title, intro, sections, children }) {
  return (
    <Page className="information">
      <h1 tabIndex="-1">{title}</h1>
      {intro && <p className="intro">{intro}</p>}
      {sections.map(
        (s, i) =>
          s.title && (
            <section className="information-section" key={i}>
              <h2>{s.title}</h2>
              {s.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </section>
          ),
      )}
      {children}
    </Page>
  );
}
export function ProviderCard({ provider, urgent = false }) {
  const { t } = useApp();
  return (
    <Card className="provider">
      <h2>{provider.name}</h2>
      <p>{provider.address || t(provider.coverage || "online")}</p>
      {urgent && <p>{t("urgentDescription")}</p>}
      <a href={provider.url} target="_blank" rel="noopener noreferrer">
        {t("visit")} ↗
      </a>
      {provider.annotation && (
        <p className="annotation">
          <Icon name="info" />
          {t("annotation")}
        </p>
      )}
      {provider.nationalNote && <p className="annotation">{t("nasomNote")}</p>}
    </Card>
  );
}
