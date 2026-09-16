import { useId, useRef } from "react";
import { useApp, useOverflow } from "../hooks/runtime.jsx";
import { assetUrl } from "../data/config.js";
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
      <path d="M12 12C9 7 7 5 4.5 6C1.5 7 1.5 17 4.5 18C7 19 9 17 12 12C15 7 17 5 19.5 6C22.5 7 22.5 17 19.5 18C17 19 15 17 12 12Z" />
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
export function ResultGraphic({ classification }) {
  const adhdActive = classification === 1 || classification === 3;
  const asdActive = classification === 2 || classification === 3;
  return (
    <div
      className="result-graphic"
      data-classification={classification}
      aria-hidden="true"
    >
      <svg className="result-circles" viewBox="0 0 72 46">
        <circle
          cx="25"
          cy="23"
          r="23"
          fill="#88d2dc"
          fillOpacity={adhdActive ? 0.65 : 0.2}
        />
        <circle
          cx="48"
          cy="23"
          r="23"
          fill="#b49be9"
          fillOpacity={asdActive ? 0.65 : 0.2}
        />
      </svg>
      <span
        className="result-trait result-trait-adhd"
        data-emphasis={adhdActive ? "strong" : "subdued"}
      >
        <Icon name="brain" />
        <span>ADHD</span>
      </span>
      <span
        className="result-trait result-trait-asd"
        data-emphasis={asdActive ? "strong" : "subdued"}
      >
        <Icon name="infinity" />
        <span>ASD</span>
      </span>
      <span
        className="result-shared"
        data-emphasis={classification === 3 ? "strong" : "subdued"}
      >
        AuDHD
      </span>
    </div>
  );
}
export function Header() {
  const { t, locale, toggleLocale, go } = useApp();
  return (
    <header className="header">
      <div className="header-row">
        <a
          className="home-logo"
          href="#home"
          aria-label={`MindLens · ${t("home")}`}
          onClick={(e) => {
            e.preventDefault();
            go("home");
          }}
        >
          <Logo />
        </a>
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
// Artwork is exported verbatim from Figma; motion only translates its container.
export function Waves({ animate = false, className = "", variant = "footer" }) {
  return (
    <div
      className={`waves ${animate ? "ambient" : ""} ${className}`}
      aria-hidden="true"
    >
      <img
        className="wave-layer"
        src={assetUrl(
          `${variant === "profile" ? "profile" : "footer"}-wave.svg`,
        )}
        alt=""
      />
    </div>
  );
}
export function PageTitle({ as: Tag = "h1", children, className = "" }) {
  return (
    <Tag className={`page-title ${className}`} tabIndex="-1">
      {children}
    </Tag>
  );
}
export function TraitCard({ type, label, level }) {
  return (
    <section className={`trait-card trait-card--${type}`}>
      <Icon name={type === "adhd" ? "brain" : "infinity"} />
      <div>
        <span>{label}</span>
        <strong>{level}</strong>
      </div>
    </section>
  );
}
export function ResultsShell({ children }) {
  const { t } = useApp();
  return (
    <Page className="results" navigationTitle={t("results")}>
      {children}
    </Page>
  );
}
export function Footer({ animate = false, desktop = false }) {
  const { t } = useApp();
  return (
    <footer className={`footer ${desktop ? "footer--desktop" : ""}`}>
      <Waves animate={animate} />
      <div className="footer-art">
        <span>{t("footerLeft")}</span>
        <img
          className="script-art"
          src={assetUrl("footer-script.svg")}
          width="116"
          height="134"
          loading="lazy"
          alt="Different Minds Brighter Lives"
        />
      </div>
      <div className="footer-legal">
        <p>
          {t("footReflection")} · {t("footDiagnosis")}
        </p>
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
  navigationTitle,
}) {
  const ref = useRef(null);
  const show = useOverflow(ref, home);
  const { t } = useApp();
  return (
    <div
      className={`page-shell ${className ? `page-shell--${className}` : ""}`}
    >
      <Header />
      <main className={`page ${className}`}>
        <div ref={ref} className="meaningful">
          {!home && (
            <div className="page-navigation">
              <Back />
              {navigationTitle && <PageTitle>{navigationTitle}</PageTitle>}
            </div>
          )}
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
    </div>
  );
}
export function Tabs({ labels, value, onChange, label, variant = "results" }) {
  const id = useId();
  return (
    <div className={`tabs tabs--${variant}`} role="tablist" aria-label={label}>
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
            onChange={() => {}}
            onClick={() => onChange(4 - i)}
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
      <PageTitle>{title}</PageTitle>
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
  const { t, locale } = useApp();
  const name =
    locale === "zh-CN" ? provider.nameZh || provider.name : provider.name;
  const address =
    locale === "zh-CN"
      ? provider.addressZh || provider.address
      : provider.address;
  return (
    <Card className="provider">
      {provider.logo && (
        <img
          className="provider-logo"
          src={provider.logo}
          alt=""
          loading="lazy"
        />
      )}
      <div className="provider-details">
        <h2>{name}</h2>
        <p>{address || t(provider.coverage || "online")}</p>
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
        {provider.nationalNote && (
          <p className="annotation">{t("nasomNote")}</p>
        )}
      </div>
    </Card>
  );
}
