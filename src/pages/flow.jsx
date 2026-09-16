import { useEffect, useState, useRef } from "react";
import { copyText } from "../domain/clipboard.js";
import { useApp } from "../hooks/runtime.jsx";
import { AREAS, band, calculate, validAnswers } from "../domain/scoring.js";
import {
  Button,
  PageTitle,
  ResultsShell,
  TraitCard,
  Page,
  Card,
  Logo,
  ResultGraphic,
  Icon,
  Waves,
  Tabs,
  RadioGroup,
  Accordion,
  InformationPage,
  ProviderCard,
  Footer,
} from "../components/shared.jsx";
import {
  DONATION_URL,
  REPOSITORY_URL,
  assetUrl,
  canonicalUrl,
  CITY_MARKETS,
} from "../data/config.js";
import assessment from "../data/assessment.json";
import health from "../data/mental-health.json";
export function Home() {
  const { strings, t, session, patch, go } = useApp();
  const terms = t("consent");
  const termName = t("terms");
  const parts = terms.split(termName);
  return (
    <Page home animate className="home">
      <PageTitle>{t("hero")}</PageTitle>
      <p className="intro">{t("heroText")}</p>
      <div className="hero-venn">
        <img className="home-circles" src={assetUrl("home-venn.svg")} alt="" />
        <div className="venn-label left">
          <Icon name="brain" />
          <strong>ADHD</strong>
          <span>{t("attentionDifference")}</span>
        </div>
        <div className="venn-label centre">
          <strong>AuDHD</strong>
          <span>{t("sharedStrengths")}</span>
        </div>
        <div className="venn-label right">
          <Icon name="infinity" />
          <strong>ASD</strong>
          <span>{t("differentPerspective")}</span>
        </div>
      </div>
      <div className="trust">
        {strings.trust.map((item, i) => (
          <div key={i}>
            <span className="icon-disc">
              <Icon name={["leaf", "people", "document"][i]} />
            </span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <div className="entry">
        <Button
          disabled={!session.adult || !session.terms}
          arrow
          onClick={() => go("questionnaire")}
        >
          {t("start")}
        </Button>
        <label className="check">
          <input
            type="checkbox"
            checked={session.adult}
            onChange={(e) => patch({ adult: e.target.checked })}
          />
          <span>{t("adult")}</span>
        </label>
        <div className="check">
          <input
            id="terms-accept"
            type="checkbox"
            checked={session.terms}
            onChange={(e) => patch({ terms: e.target.checked })}
            aria-label={terms}
          />
          <label htmlFor="terms-accept">
            <span>{parts[0]}</span>
            {parts.length > 1 && (
              <>
                <a
                  href="#terms"
                  onClick={(e) => {
                    e.preventDefault();
                    go("terms");
                  }}
                >
                  {termName}
                </a>
                <span>{parts.slice(1).join(termName)}</span>
              </>
            )}
          </label>
        </div>
        <p className="time">{t("time")}</p>
      </div>
      <button className="route-card" onClick={() => go("accuracy")}>
        <Icon name="info" />
        <span>
          <strong>{t("accuracy")}</strong>
          <span>{t("learn")}</span>
        </span>
        <Icon />
      </button>
      <button className="route-card" onClick={() => go("professional")}>
        <Icon name="document" />
        <strong>{t("assessmentSupport")}</strong>
        <Icon />
      </button>
    </Page>
  );
}
export function Info({ terms = false }) {
  const { strings, t, go } = useApp();
  return (
    <InformationPage
      title={t(terms ? "terms" : "accuracy")}
      intro={terms ? null : strings.accuracyIntro}
      sections={strings[terms ? "terms" : "accuracy"]}
    >
      {!terms && (
        <div className="info-links">
          <Button arrow onClick={() => go("professional")}>
            {t("professional")}
          </Button>
          <button className="text-link" onClick={() => go("terms")}>
            {t("terms")} →
          </button>
        </div>
      )}
    </InformationPage>
  );
}
export function Restart() {
  const { t, dispatch, go } = useApp();
  return (
    <Page>
      <PageTitle>{t("restartTitle")}</PageTitle>
      <p>{t("restartText")}</p>
      <Button
        onClick={() => {
          dispatch({ type: "retake" });
          go("home", { replace: true });
        }}
      >
        {t("retake")}
      </Button>
    </Page>
  );
}
export function Questionnaire() {
  const { strings, t, session: s, patch, dispatch, go } = useApp();
  const i = s.position;
  const advanceTimer = useRef(null);
  useEffect(() => () => clearTimeout(advanceTimer.current), []);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelector(".questionnaire h1")?.focus({ preventScroll: true });
  }, [i]);
  const progress = Math.round((i / 22) * 100);
  useEffect(() => {
    dispatch({ type: "review" });
  }, [dispatch]);
  const area = AREAS.findIndex(([start, end]) => i >= start && i < end);
  if (!s.adult || !s.terms) return <Restart />;
  function next() {
    clearTimeout(advanceTimer.current);
    advanceTimer.current = null;
    if (i < 21) {
      patch({ position: i + 1 });
      window.scrollTo(0, 0);
    } else {
      dispatch({ type: "complete" });
      go("building");
    }
  }
  return (
    <Page className="questionnaire">
      <div className="progress-meta">
        <span>{t("question", i + 1)}</span>
        <span>{t("progress", progress)}</span>
      </div>
      <progress max="22" value={i} aria-label={t("progress", progress)} />
      <p className="section-label">{strings.areas[area].name}</p>
      {i === 0 && (
        <div className="framing">
          {strings.framing.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )}
      <PageTitle>{strings.questions[i]}</PageTitle>
      <p className="reassurance">
        {strings.reassurances[Math.min(4, Math.floor(progress / 20))]}
      </p>
      <RadioGroup
        key={i}
        question={strings.questions[i]}
        value={s.answers[i]}
        responses={strings.responses}
        onChange={(value) => {
          if (advanceTimer.current) return;
          dispatch({ type: "answer", value });
          if (i < 21) advanceTimer.current = setTimeout(next, 180);
        }}
      />
      <div className="question-nav">
        <Button
          secondary
          disabled={i === 0}
          onClick={() => {
            clearTimeout(advanceTimer.current);
            advanceTimer.current = null;
            patch({ position: i - 1 });
            window.scrollTo(0, 0);
          }}
        >
          <Icon name="back" />
          {t("previous")}
        </Button>
        <Button disabled={s.answers[i] === null} arrow onClick={next}>
          {t(i === 21 ? "complete" : "next")}
        </Button>
      </div>
    </Page>
  );
}
export function Building() {
  const { strings, t, session: s, go } = useApp();
  const [elapsed, setElapsed] = useState(
    () => Date.now() - (s.buildingStarted || Date.now()),
  );
  useEffect(() => {
    const timer = setInterval(
      () => setElapsed(Date.now() - (s.buildingStarted || Date.now())),
      100,
    );
    return () => clearInterval(timer);
  }, [s.buildingStarted]);
  const done = elapsed >= 1200;
  useEffect(() => {
    if (done && s.completed && validAnswers(s.answers))
      go("results", { replace: true });
  }, [done, s.completed, s.answers, go]);
  if (!s.completed || !validAnswers(s.answers)) return <Restart />;
  return <BuildingContent elapsed={elapsed} />;
}
export function BuildingContent({ elapsed }) {
  const { strings, t } = useApp();
  return (
    <Page animate className="building">
      <PageTitle>{t("building")}</PageTitle>
      <p className="intro">{t("buildingText")}</p>
      <div className="profile-illustration">
        <img
          className="profile-brain"
          src={assetUrl("profile-brain.svg")}
          width="58"
          height="58"
          alt=""
        />
        <Waves animate variant="profile" className="building-waves" />
      </div>
      <div className="status" role="status" aria-live="polite">
        <p>{strings.status[Math.min(2, Math.floor(elapsed / 400))]}</p>
        <p className="muted">{t("moment")}</p>
      </div>
    </Page>
  );
}
export function Results() {
  const { strings, t, session: s, patch, dispatch, go } = useApp();
  if (!s.completed || !validAnswers(s.answers)) return <Restart />;
  const score = calculate(s.answers);
  const level = band(score.combined);
  return (
    <ResultsShell>
      <Tabs
        labels={[t("yourResult"), t("score")]}
        label={t("results")}
        value={s.resultTab}
        onChange={(resultTab) => patch({ resultTab })}
      />
      <div
        role="tabpanel"
        aria-label={t(s.resultTab === 0 ? "yourResult" : "score")}
      >
        {s.resultTab === 0 ? (
          <>
            <div className="open-result">
              <p className="eyebrow">{t("yourResult")}</p>
              <ResultGraphic classification={score.classification} />
              <PageTitle as="h2">
                {strings.results[score.classification].name}
              </PageTitle>
            </div>
            <div className="dimension-rows">
              {[score.adhd, score.asd].map((value, i) => (
                <TraitCard
                  key={i}
                  type={i ? "asd" : "adhd"}
                  label={strings.traitCardLabels[i]}
                  level={strings.bands[band(value)]}
                />
              ))}
            </div>
            <Card className="meaning">
              <Icon name="info" />
              <div>
                <h2>{t("meaning")}</h2>
                <p>{strings.results[score.classification].text}</p>
              </div>
            </Card>
          </>
        ) : (
          <>
            <div className="open-score">
              <PageTitle as="h2">{t("combined")}</PageTitle>
              <div
                className="donut"
                role="img"
                aria-label={`${t("combined")}: ${Math.round(score.combined)}%`}
              >
                <svg viewBox="0 0 120 120" aria-hidden="true">
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#efedf8"
                    strokeWidth="12"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#b6a5e7"
                    strokeWidth="12"
                    pathLength="100"
                    strokeDasharray={`${score.combined} 100`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <strong>{Math.round(score.combined)}%</strong>
              </div>
              <h2>{strings.indications[level]}</h2>
              {strings.scoreTexts[level] && <p>{strings.scoreTexts[level]}</p>}
            </div>
            <Card className="meaning">
              <Icon name="info" />
              <div>
                <h2>{t("aboutScore")}</h2>
                <p>{t("reassurance")}</p>
              </div>
            </Card>
          </>
        )}
      </div>
      <div className="actions">
        <Button arrow onClick={() => go("explore")}>
          {t("explore")}
        </Button>
        <Button
          secondary
          arrow={false}
          onClick={() => {
            dispatch({ type: "retake" });
            go("questionnaire");
          }}
        >
          {t("retake")}
        </Button>
      </div>
      <p className="result-reassurance">{t("reassurance")}</p>
    </ResultsShell>
  );
}
export function Explore() {
  const { strings, t, session: s, patch, go } = useApp();
  if (!s.completed || !validAnswers(s.answers)) return <Restart />;
  const scores = calculate(s.answers);
  return (
    <Page>
      <PageTitle>{t("explore")}</PageTitle>
      <p className="intro">{t("exploreIntro")}</p>
      <div className="accordions">
        {strings.areas.map((area, i) => {
          const level = band(scores.areas[i]);
          const content = area.levels[level];
          return (
            <Accordion
              key={i}
              name={area.name}
              level={strings.bands[level]}
              open={s.openAreas[0] === i}
              onToggle={() =>
                patch({
                  openAreas: s.openAreas[0] === i ? [] : [i],
                })
              }
            >
              <p>{content.text}</p>
              <h3>{t("examples")}</h3>
              <ul>
                {content.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </Accordion>
          );
        })}
      </div>
      <div className="actions">
        <Button arrow onClick={() => go("together")}>
          {t("together")}
        </Button>
      </div>
    </Page>
  );
}
export function Together() {
  const { strings, t, session: s, go, patch } = useApp();
  if (!s.completed || !validAnswers(s.answers)) return <Restart />;
  const classification = calculate(s.answers).classification;
  return (
    <Page>
      <PageTitle>{t("together")}</PageTitle>
      <p className="intro">{t("togetherIntro")}</p>
      <div className="summary-cards">
        {strings.summaries[classification].map((item, i) => (
          <Card key={i} tone={i === 0 ? "teal" : "violet"}>
            <span className="icon-disc">
              <Icon name={["bulb", "leaf", "heart"][i]} />
            </span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </Card>
        ))}
      </div>
      <h2 className="eyebrow">{t("nextSteps")}</h2>
      <ol className="next-steps">
        {strings.nextSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <Card>
        <p>{t("oneAtATime")}</p>
      </Card>
      <div className="actions">
        <Button arrow onClick={() => go("professional")}>
          {t("professional")}
        </Button>
        <button
          className="text-link"
          onClick={() => {
            patch({ supportType: 1 });
            go("professional");
          }}
        >
          {t("broader")}
        </button>
      </div>
    </Page>
  );
}
export function Professional() {
  const { strings, t, session: s, patch, locale } = useApp();
  const market = strings.markets;
  const markets = [
    "Malaysia",
    "Singapore",
    "Thailand",
    "Vietnam",
    "Indonesia",
    "China",
    "Japan",
    "South Korea",
  ];
  const cities = Object.keys(CITY_MARKETS);
  const city = cities.includes(s.city) ? s.city : cities[0];
  const selectedMarket = markets.includes(s.market) ? s.market : "Malaysia";
  const region = ["Mainland China", "Hong Kong", "Taipei"].includes(s.region)
    ? s.region
    : "Mainland China";
  const providers =
    s.supportType === 0
      ? assessment.filter((p) => p.city === city)
      : s.supportType === 1
        ? health.filter(
            (p) =>
              p.market === CITY_MARKETS[city] &&
              (p.city
                ? p.city === city
                : p.market !== "China" ||
                  !["Hong Kong", "Taipei"].includes(city)),
          )
        : health.filter(
            (p) =>
              p.urgent &&
              p.market === selectedMarket &&
              (p.market !== "China" || p.region === region),
          );
  return (
    <Page className="professional">
      <PageTitle>{t("professional")}</PageTitle>
      <p className="intro">{t("supportIntro")}</p>
      <h2>{t("looking")}</h2>
      <Tabs
        labels={strings.supportTypes}
        variant="support"
        label={t("looking")}
        value={s.supportType}
        onChange={(supportType) => patch({ supportType })}
      />
      {s.supportType !== 2 ? (
        <label className="select-control">
          <span>{t("city")}</span>
          <select
            value={city}
            onChange={(e) =>
              patch({
                city: e.target.value,
                market: CITY_MARKETS[e.target.value],
                region: ["Hong Kong", "Taipei"].includes(e.target.value)
                  ? e.target.value
                  : "Mainland China",
              })
            }
          >
            {markets.map((m, i) => (
              <optgroup label={market[i]} key={m}>
                {cities
                  .filter((c) => CITY_MARKETS[c] === m)
                  .map((c) => (
                    <option value={c} key={c}>
                      {strings.cities[cities.indexOf(c)]}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </label>
      ) : (
        <>
          <label className="select-control">
            <span>{t("country")}</span>
            <select
              value={selectedMarket}
              onChange={(e) => patch({ market: e.target.value })}
            >
              {markets.map((m, i) => (
                <option key={m} value={m}>
                  {market[i]}
                </option>
              ))}
            </select>
          </label>
          {selectedMarket === "China" && (
            <div className="region-controls">
              {["Mainland China", "Hong Kong", "Taipei"].map((r, i) => (
                <button
                  className="region"
                  aria-pressed={region === r}
                  key={r}
                  onClick={() => patch({ region: r })}
                >
                  {strings.regions[i]}
                </button>
              ))}
            </div>
          )}
        </>
      )}
      <div className="providers" aria-live="polite">
        {providers.map((p) => (
          <ProviderCard key={p.id} provider={p} urgent={s.supportType === 2} />
        ))}
      </div>
      <Card className="provider-notice">
        <Icon name="info" />
        <p>{t("providerNotice")}</p>
      </Card>
    </Page>
  );
}
export function Support() {
  const { strings, t } = useApp();
  return (
    <Page className="support">
      <PageTitle>{t("supportMe")}</PageTitle>
      <p className="intro">{strings.support.intro}</p>
      <div className="thanks-crop">
        <img
          className="thanks-gif"
          src={assetUrl("purple_thanks.gif")}
          width="480"
          height="480"
          alt=""
        />
      </div>
      {strings.support.body.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <Card className="future">
        <span className="icon-disc">
          <img
            src={assetUrl("github-mark.svg")}
            width="25"
            height="25"
            alt="GitHub"
          />
        </span>
        <div>
          <h2>{strings.support.futureTitle}</h2>
          <p>{strings.support.future}</p>
          <a href={REPOSITORY_URL} target="_blank" rel="noopener noreferrer">
            {strings.support.repositoryCTA}
          </a>
        </div>
      </Card>
      <a
        className="bmc"
        href={DONATION_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("supportCTA")}
      >
        <img
          src={assetUrl("bmc-button.svg")}
          alt="Buy me a coffee"
          width="260"
          height="73"
        />
      </a>
      <div className="thanks-text">
        <p>{t("thanks")}</p>
        <p>{t("thanksText")}</p>
      </div>
    </Page>
  );
}
export function Desktop() {
  const [qr, setQr] = useState("");
  const [copy, setCopy] = useState("");
  const url = canonicalUrl();
  useEffect(() => {
    let live = true;
    import("qrcode")
      .then((m) =>
        m.default.toDataURL(url, {
          width: 240,
          margin: 2,
          color: { dark: "#102a43", light: "#ffffff" },
        }),
      )
      .then((data) => {
        if (live) setQr(data);
      });
    return () => {
      live = false;
    };
  }, [url]);
  return (
    <div className="desktop">
      <main className="handoff">
        <Logo />
        <h1>MindLens is designed for mobile.</h1>
        <p lang="zh-CN" className="chinese-title">
          MindLens 专为移动设备设计。
        </p>
        <p>
          Scan the QR code with your phone to continue.
          <br />
          <span lang="zh-CN">请使用手机扫描二维码继续。</span>
        </p>
        {qr && (
          <img
            className="qr"
            src={qr}
            width="240"
            height="240"
            alt="Scan to open MindLens on your phone"
          />
        )}
        <div className="handoff-actions">
          <Button
            onClick={async () => {
              try {
                if (!(await copyText(url))) throw new Error("Copy unavailable");
                setCopy("Link copied / 链接已复制");
              } catch {
                setCopy("Please copy the link below. / 请复制下方链接。");
              }
            }}
          >
            Copy link / 复制链接
          </Button><br /><br />
          <a href={REPOSITORY_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
        <p className="canonical">{url}</p>
        <p role="status">{copy}</p>
      </main>
      <Footer animate desktop />
    </div>
  );
}
