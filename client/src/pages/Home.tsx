/**
 * Orbital Editorial: a left-weighted scientific narrative illuminated by a polar-Earth
 * field, precise Aurora Cyan telemetry, and calm transform/opacity-led motion.
 */
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Compass,
  Menu,
  Orbit,
  Play,
  Radio,
  Satellite,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { NorthStarMark } from "@/components/NorthStarMark";

const heroImage = "/manus-storage/polaris-hero-earth_e6b6028e.jpg";
const arcticImage = "/manus-storage/polaris-arctic_5aabdf27.jpg";
const antarcticaImage = "/manus-storage/polaris-antarctica_6e927572.jpg";
const mapImage = "/manus-storage/polaris-expedition-map_a222e81c.jpg";

const navigation = [
  ["Explore", "#explore"],
  ["Research", "#research"],
  ["Expeditions", "#expeditions"],
  ["Media", "#outreach"],
  ["Learn", "#learn"],
] as const;

const research = [
  {
    code: "CRY-241",
    region: "Antarctica",
    topic: "Cryosphere",
    institution: "National Centre for Polar & Ocean Research",
    year: "2025",
    title: "Antarctic Ice Sheet Dynamics and Mass Balance",
    text: "A synthesis of satellite altimetry, gravity and field observations tracking change across East Antarctica.",
  },
  {
    code: "ARC-118",
    region: "Arctic",
    topic: "Earth observation",
    institution: "Indian Institute of Remote Sensing",
    year: "2026",
    title: "Satellite-Based Monitoring of Arctic Sea Ice",
    text: "A changing record of seasonal sea-ice concentration, lead formation and regional climate signals.",
  },
  {
    code: "SOC-067",
    region: "Southern Ocean",
    topic: "Ocean systems",
    institution: "National Institute of Ocean Technology",
    year: "2024",
    title: "Southern Ocean Temperature Variability",
    text: "Observations from drifting instruments reveal how the ocean stores and transfers heat around Antarctica.",
  },
];

const expeditions = [
  ["XLI Indian Antarctic Expedition", "ACTIVE", "Prydz Bay · 69°S"],
  ["Himalayan Arctic Programme", "UPCOMING", "Svalbard · 78°N"],
  ["Southern Ocean Survey", "COMPLETED", "Kerguelen Plateau · 49°S"],
] as const;

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const started = performance.now();
    const duration = 1450;
    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{new Intl.NumberFormat("en-US").format(display)}</>;
}

function NavLink({ href, children, onSelect }: { href: string; children: string; onSelect?: () => void }) {
  return (
    <a href={href} onClick={onSelect} className="nav-link">
      {children}
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedPole, setSelectedPole] = useState<"Arctic" | "Antarctica">("Arctic");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const notify = (feature: string) =>
    toast.info(`${feature} is ready to connect in the complete POLARIS portal.`);

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <a href="#top" className="brand" aria-label="POLARIS home">
          <NorthStarMark className="brand-mark" />
          <span>POLARIS</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <NavLink href={href} key={label}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="text-button" onClick={() => notify("Sign in")}>Sign in</button>
          <a className="nav-cta" href="/choose">
            Explore platform <ArrowUpRight size={15} />
          </a>
          <button
            className="menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={21} />}
          </button>
        </div>

        <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
          {navigation.map(([label, href]) => (
            <NavLink href={href} key={label} onSelect={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
          <button className="mobile-signin" onClick={() => notify("Sign in")}>Sign in to your workspace</button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-image" style={{ backgroundImage: `url(${heroImage})` }} />
            <div className="hero-shade" />
            <div className="hero-grain" />
            <span className="star star--one" />
            <span className="star star--two" />
            <span className="star star--three" />
            <span className="orbit-thread orbit-thread--one" />
            <span className="orbit-thread orbit-thread--two" />
            <span className="orbit-signal orbit-signal--one" />
            <span className="orbit-signal orbit-signal--two" />
          </div>

          <div className="hero-layout">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="eyebrow"><Satellite size={14} /> Space technology × polar science</p>
              <h1 id="hero-title">One gateway<br />to <em>polar</em> science.</h1>
              <p className="hero-lede">
                Explore research, expeditions, discoveries and educational knowledge from the Arctic and Antarctic — connected in one intelligent platform.
              </p>
              <div className="hero-actions">
                <a href="/choose" className="primary-action">Explore POLARIS <ArrowRight size={18} /></a>
                <a href="#expeditions" className="secondary-action"><Play size={14} fill="currentColor" /> Explore expeditions</a>
              </div>
            </motion.div>

            <motion.aside
              className="hero-telemetry"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.34, ease: [0.23, 1, 0.32, 1] }}
              aria-label="Polar orbital telemetry"
            >
              <div className="telemetry-top"><span className="live-dot" /> Live observation feed</div>
              <div className="telemetry-rule" />
              <p>ORBIT / 716 KM</p><strong>POLAR PASS</strong>
              <div className="telemetry-row"><span>LAT</span><b>72.41° N</b></div>
              <div className="telemetry-row"><span>ICE EXTENT</span><b>13.47 M km²</b></div>
              <div className="telemetry-row"><span>DATA LINK</span><b>Nominal</b></div>
            </motion.aside>
          </div>

          <a className="scroll-cue" href="#signal" aria-label="Scroll to platform signals">
            <span>Scroll to trace</span><ArrowDown size={16} />
          </a>
          <div className="hero-coordinate">POLARIS / EARTH OBSERVATION NETWORK / 2026</div>
        </section>

        <section id="signal" className="signal-strip" aria-label="POLARIS collection statistics">
          <p className="signal-intro"><Radio size={14} /> Platform signal</p>
          {[
            [1250, "Research resources"],
            [85, "Expeditions"],
            [3400, "Media assets"],
            [120, "Learning resources"],
          ].map(([value, label], index) => (
            <motion.div
              className="signal-stat"
              key={label as string}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.42, delay: index * 0.065 }}
            >
              <strong><AnimatedNumber value={value as number} />+</strong>
              <span>{label as string}</span>
            </motion.div>
          ))}
        </section>

        <section id="explore" className="poles-section section-shell" aria-labelledby="poles-title">
          <div className="section-heading heading-split">
            <div>
              <p className="eyebrow eyebrow--dark"><Compass size={14} /> Choose a latitude</p>
              <h2 id="poles-title">Explore the poles<br />at their own scale.</h2>
            </div>
            <p>Begin with the region, then follow the evidence across fieldwork, imagery, publication and explanation.</p>
          </div>
          <div className="light-coordinate light-coordinate--poles"><NorthStarMark /> GRID / POLAR LATITUDES / 66° 33′ / 90°</div>

          <div className="pole-spreads">
            <button
              className={`pole-spread pole-spread--arctic ${selectedPole === "Arctic" ? "pole-spread--selected" : ""}`}
              onClick={() => setSelectedPole("Arctic")}
            >
              <img src={arcticImage} alt="Aerial view of fractured Arctic sea ice" />
              <span className="pole-overlay" />
              <span className="pole-index">01 / Northern latitude</span>
              <span className="pole-content"><span className="pole-name">Arctic</span><span className="pole-tags">Sea ice · Climate · Ocean · Wildlife</span></span>
              <ArrowUpRight className="pole-arrow" size={22} />
            </button>
            <button
              className={`pole-spread pole-spread--antarctica ${selectedPole === "Antarctica" ? "pole-spread--selected" : ""}`}
              onClick={() => setSelectedPole("Antarctica")}
            >
              <img src={antarcticaImage} alt="Antarctic ice ridge above the Southern Ocean" />
              <span className="pole-overlay" />
              <span className="pole-index">02 / Southern latitude</span>
              <span className="pole-content"><span className="pole-name">Antarctica</span><span className="pole-tags">Ice sheets · Climate · Southern Ocean · Stations</span></span>
              <ArrowUpRight className="pole-arrow" size={22} />
            </button>
          </div>
          <p className="pole-selection" aria-live="polite"><span className="selection-bar" /> <b>{selectedPole}</b> observation route selected — explore the full regional portal.</p>
        </section>

        <section className="knowledge-section" aria-labelledby="knowledge-title">
          <div className="knowledge-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="section-shell knowledge-layout">
            <div className="knowledge-copy">
              <p className="eyebrow"><Orbit size={14} /> Connected knowledge</p>
              <h2 id="knowledge-title">From fragmented information to connected knowledge.</h2>
              <p>POLARIS moves naturally from evidence in the field to context in the classroom, making polar change understandable from every entry point.</p>
            </div>
            <div className="knowledge-path" role="list" aria-label="Knowledge path">
              {["Research", "Expedition", "Media", "Education", "Understanding"].map((item, index) => (
                <motion.div
                  className="knowledge-step"
                  key={item}
                  role="listitem"
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span><b>{item}</b>{index < 4 && <ArrowDown size={16} className="knowledge-arrow" />}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="research" className="research-section section-shell" aria-labelledby="research-title">
          <div className="section-heading research-heading">
            <div>
              <p className="eyebrow eyebrow--dark"><Sparkles size={14} /> Selected evidence</p>
              <h2 id="research-title">Featured research.</h2>
            </div>
            <div className="research-heading-side"><span className="record-seal"><NorthStarMark /> ARC / 03 RECORDS</span><a href="#research" onClick={(event) => { event.preventDefault(); notify("Research library"); }} className="editorial-link">Trace the archive <ArrowRight size={17} /></a></div>
          </div>
          <div className="research-list">
            {research.map((item, index) => (
              <motion.article
                className={`research-entry research-entry--${index + 1}`}
                key={item.code}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.52, delay: index * 0.07 }}
              >
                <div className="research-meta"><span>{item.code}</span><span>{item.year}</span></div>
                <div className="research-main">
                  <p>{item.region} <i /> {item.topic}</p>
                  <h3>{item.title}</h3>
                  <p className="research-description">{item.text}</p>
                </div>
                <div className="research-foot"><span>{item.institution}</span><button aria-label={`Open ${item.title}`} onClick={() => notify("Research record")}><ArrowUpRight size={18} /></button></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="expeditions" className="expedition-section" aria-labelledby="expedition-title">
          <div className="section-shell">
            <div className="section-heading expedition-heading">
              <div>
                <p className="eyebrow"><Satellite size={14} /> Route intelligence</p>
                <h2 id="expedition-title">Follow polar expeditions.</h2>
              </div>
              <p>Observe where research moves next through active, upcoming, and completed missions across both poles.</p>
            </div>
            <div className="mission-map">
              <img src={mapImage} alt="Antarctic topographic observation map" />
              <span className="map-vignette" />
              <span className="map-marker map-marker--one"><i /> <b>01</b></span>
              <span className="map-marker map-marker--two"><i /> <b>02</b></span>
              <span className="map-marker map-marker--three"><i /> <b>03</b></span>
              <div className="map-legend"><span><i className="legend-dot legend-dot--active" /> Active</span><span><i className="legend-dot legend-dot--upcoming" /> Upcoming</span><span><i className="legend-dot legend-dot--complete" /> Completed</span></div>
              <p className="map-caption">SOUTHERN POLAR FIELD / LIVE ROUTE INDEX</p>
            </div>
            <div className="expedition-list">
              {expeditions.map(([title, status, location], index) => (
                <button key={title} className="expedition-row" onClick={() => notify(title)}>
                  <span className="row-number">0{index + 1}</span>
                  <span className="row-title">{title}</span>
                  <span className={`status status--${status.toLowerCase()}`}>{status}</span>
                  <span className="row-location">{location}</span>
                  <ArrowUpRight size={18} />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="learn" className="learn-section section-shell" aria-labelledby="learn-title">
          <div className="learn-kicker"><span>COMPLEX RESEARCH</span><ArrowDown size={15} /><span>SIMPLE EXPLANATION</span><ArrowDown size={15} /><span>PUBLIC UNDERSTANDING</span></div>
          <div className="learn-layout">
            <div>
              <p className="eyebrow eyebrow--dark"><BookOpen size={14} /> Science outreach</p>
              <h2 id="learn-title">Science, explained<br />for everyone.</h2>
              <a href="#learn" onClick={(event) => { event.preventDefault(); notify("Learning pathway"); }} className="primary-action primary-action--dark">Start learning <ArrowRight size={18} /></a>
              <p className="learn-coordinate"><NorthStarMark /> FIELD NOTE / 03 ENTRY PATHWAYS / OPEN ACCESS</p>
            </div>
            <div className="learning-topics">
              {[
                "Why is Antarctica important?",
                "How does ice loss affect sea level?",
                "How do satellites monitor polar regions?",
              ].map((topic, index) => (
                <button onClick={() => notify(topic)} key={topic}><span>0{index + 1}</span>{topic}<ArrowUpRight size={17} /></button>
              ))}
            </div>
          </div>
        </section>

        <section id="outreach" className="closing-section">
          <div className="closing-bg" aria-hidden="true"><span className="closing-orbit closing-orbit--one" /><span className="closing-orbit closing-orbit--two" /></div>
          <div className="section-shell closing-content">
            <p className="eyebrow"><Radio size={14} /> Open a clearer horizon</p>
            <h2>The poles are changing.<br /><em>Understanding</em> them starts here.</h2>
            <a className="closing-action" href="/choose">Enter POLARIS <ArrowRight size={19} /></a>
            <p className="closing-coordinate"><NorthStarMark /> NORTH STAR LOCK / POLARIS NETWORK / CONTINUE THE TRACE</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><NorthStarMark /><div><b>POLARIS</b><span>One Gateway to Polar Science</span></div></div>
        <div className="footer-links">
          {navigation.slice(1).map(([label, href]) => <a href={href} key={label}>{label}</a>)}
          <button onClick={() => notify("About POLARIS")}>About</button>
          <button onClick={() => notify("Contact")}>Contact</button>
        </div>
        <p>Smart India Hackathon 2026</p>
      </footer>
    </div>
  );
}
