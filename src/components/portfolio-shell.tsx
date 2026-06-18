"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import {
  navItems,
  profile,
  type ProjectItem,
  projectItems,
  skillGroups,
  socialLinks,
  type TimelineItem,
  timelineItems,
} from "@/data/portfolio";

type ModalType = "project" | "timeline";
type SelectedItem = { type: ModalType; slug: string } | null;

function modalFromSearchParams(params: { get: (key: string) => string | null }): SelectedItem {
  const type = params.get("type");
  const item = params.get("item");
  if ((type === "project" || type === "timeline") && item) return { type, slug: item };
  return null;
}

const overlayClass = "fixed inset-0 flex items-center justify-center bg-black/55 p-3 sm:p-4";
const modalPanelClass =
  "flex max-h-[min(88dvh,900px)] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[color:var(--surface-elevated)] shadow-[var(--shadow)]";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const tagPill =
  "rounded-md bg-[var(--pill-bg)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--pill-fg)] sm:px-3";
const btnOutline =
  "rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm transition hover:bg-[color:var(--surface-elevated)]";
const bodyText = "text-sm leading-6 text-[var(--body)]";
const metaLabel = "text-xs uppercase tracking-[0.22em] text-[var(--accent-secondary)]";

const themeStorageKey = "portfolio-theme";

function getFileIcon(href: string) {
  const h = href.toLowerCase();
  if (h.includes("poster")) return "/images/icons/image.svg";
  if (h.includes("presentation") || h.includes("slides")) return "/images/icons/presentation.svg";
  if (h.includes("code") || h.endsWith(".html")) return "/images/icons/code.svg";
  if (h.endsWith(".pdf")) return "/images/icons/file.svg";
  return "/images/icons/globe.svg";
}

const isImageHref = (href: string) => /\.(png|jpg|jpeg|svg|webp|gif|avif)$/i.test(href);

function readThemeSnapshot(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(themeStorageKey);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribeToTheme(callback: () => void) {
  const onChange = () => callback();
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener("storage", onChange);
  window.addEventListener("portfolio-theme-change", onChange);
  mq.addEventListener("change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("portfolio-theme-change", onChange);
    mq.removeEventListener("change", onChange);
  };
}

function setTheme(next: "light" | "dark") {
  try {
    window.localStorage.setItem(themeStorageKey, next);
    window.dispatchEvent(new Event("portfolio-theme-change"));
  } catch {}
}

function syncUrl(modal: SelectedItem) {
  const url = new URL(window.location.href);
  if (modal) {
    url.searchParams.set("type", modal.type);
    url.searchParams.set("item", modal.slug);
  } else {
    url.searchParams.delete("type");
    url.searchParams.delete("item");
  }
  window.history.replaceState(window.history.state, "", url.toString());
}

function isSectionLabel(prefix: string, isBullet: boolean): boolean {
  if (isBullet) return false;

  const label = prefix.trim();
  if (!label || label.length > 45) return false;

  if (/^Overview$/i.test(label)) return true;
  if (/^Semester .+$/i.test(label)) return true;
  if (/^Completed .+$/i.test(label)) return true;
  if (/^(Problem|Approach|Results|Outcome|Stack|Notes|Context|Deliverables|Method|Build|Team|Ethics)$/i.test(label)) return true;

  // Sentence-shaped lines are body copy, not headers.
  if (/\b(the|and|with|for|from|that|this|cover|courses|program|needed|is an|clients)\b/i.test(label)) {
    return false;
  }

  // Project detail headers like "Machine Learning (DATA-440)" or "Geospatial (Python & GeoPandas)".
  if (/^[A-Z0-9][^:]{0,40}\([^)]+\)$/.test(label)) return true;

  // Short title-style headers (Sorting, Dashboard, Stack, UX, etc.).
  if (label.length <= 28 && /^[A-Z]/.test(label)) return true;

  return false;
}

function parseDetails(details: string[]) {
  type Block = { label: string | null; value: string | null; items: string[]; id: number };
  const blocks: Block[] = [];
  let current: Block | null = null;

  details.forEach((detail, idx) => {
    const trimmed = detail.trim();
    const isBullet = trimmed.startsWith("•") || trimmed.startsWith("-");
    const parts = detail.split(": ");
    const hasLabel = parts.length > 1 && isSectionLabel(parts[0], isBullet);

    if (hasLabel) {
      if (current) blocks.push(current);
      current = { label: parts[0], value: parts.slice(1).join(": "), items: [], id: idx };
    } else if (current) {
      current.items.push(detail);
    } else {
      blocks.push({ label: null, value: detail, items: [], id: idx });
    }
  });
  if (current) blocks.push(current);
  return blocks;
}

function DetailBlocks({ details, modalType }: { details: string[]; modalType: ModalType | null }) {
  const blocks = parseDetails(details);
  const gridable = (label: string | null) => modalType === "timeline" && label && label.toLowerCase() !== "overview";
  const labelClass =
    "block font-bold text-[var(--accent)] uppercase tracking-widest text-[11px] sm:text-[12px]";
  const nodes: React.ReactNode[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const next = blocks[i + 1];

    if (gridable(block.label) && gridable(next?.label ?? null)) {
      nodes.push(
        <div key={`g-${block.id}`} className="mb-6 grid grid-cols-1 gap-6 sm:mb-8 sm:grid-cols-2 sm:gap-8">
          {[block, next as (typeof blocks)[0]].map((b) => (
            <div key={b.id} className="space-y-2 sm:space-y-3">
              <span className={labelClass}>{b.label}</span>
              <div className="space-y-0.5 text-left">
                {b.value ? <p className="text-[var(--body)]">{b.value}</p> : null}
                {b.items.map((item, idx) => (
                  <p key={idx} className={item.trim().startsWith("•") ? "pl-5 -indent-5" : undefined}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>,
      );
      i++;
      continue;
    }

    const spacedItems =
      modalType === "project" || !block.label || block.label.toLowerCase() === "overview";

    nodes.push(
      <div key={block.id} className="mb-6 space-y-3 sm:mb-8 sm:space-y-4">
        {block.label && <span className={labelClass}>{block.label}</span>}
        <div className="space-y-3 text-left sm:space-y-4 sm:text-justify">
          {block.value && (
            <p className={!block.label ? "leading-relaxed text-[var(--body)]" : "mt-1 text-[var(--body)]"}>
              {block.value}
            </p>
          )}
          <div className={spacedItems ? "space-y-3 sm:space-y-4" : "space-y-0.5"}>
            {block.items.map((item, idx) => (
              <p key={idx} className={item.trim().startsWith("•") ? "pl-5 -indent-5" : undefined}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>,
    );
  }

  return <>{nodes}</>;
}

function Flag({ code }: { code: "CA" | "BR" }) {
  return (
    <div className="relative h-[20px] w-[26px] shrink-0 overflow-hidden sm:h-[24px] sm:w-[31px]">
      <Image
        src={code === "CA" ? "/images/flags/canada.png" : "/images/flags/brazil.png"}
        alt={code === "CA" ? "Canada flag" : "Brazil flag"}
        fill
        sizes="32px"
        className="object-contain object-left"
      />
    </div>
  );
}

function TimelineRow({
  item,
  theme,
  onOpen,
}: {
  item: TimelineItem;
  theme: "light" | "dark";
  onOpen: () => void;
}) {
  const showLogo = item.type === "education" && item.logo;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.995 }}
      className="w-full rounded-lg border border-[var(--border)] bg-[color:var(--surface)] p-3.5 text-left shadow-[var(--shadow)] transition hover:bg-[color:var(--surface-elevated)] sm:p-4"
    >
      <div className="flex gap-3 sm:gap-6">
        {showLogo && item.logo && (
          <div className="relative h-14 w-14 shrink-0 sm:h-20 sm:w-20">
            <Image
              src={theme === "dark" ? item.logo.dark : item.logo.light}
              alt={item.institution ?? item.title}
              fill
              className="object-contain"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
            <div className="min-w-0">
              <p className={metaLabel}>{item.period}</p>
              <h3 className="mt-1 text-lg font-semibold sm:text-xl">
                {item.title}
                {item.accolade && (
                  <span className="ml-1 font-normal text-[var(--honours)]">with {item.accolade}</span>
                )}
              </h3>
              {(item.institution || (item.type === "work" && item.location)) && (
                <p className="mt-0.5 text-sm font-medium text-[var(--accent)]">
                  {item.institution ?? item.location}
                </p>
              )}
            </div>
            {item.type === "education" && (
              <div className="flex shrink-0 items-center gap-1 text-sm font-medium text-[var(--accent-secondary)]">
                <span className="truncate">{item.location}</span>
                {item.country && <Flag code={item.country} />}
              </div>
            )}
          </div>
          <p className={`mt-2 sm:mt-3 ${bodyText}`}>{item.summary}</p>
          <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className={tagPill}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export function PortfolioShell() {
  const searchParams = useSearchParams();
  const theme = useSyncExternalStore(subscribeToTheme, readThemeSnapshot, () => "light" as const);

  const [activeModal, setActiveModal] = useState<SelectedItem>(() => modalFromSearchParams(searchParams));
  const [activeFileViewer, setActiveFileViewer] = useState<{ title: string; href: string } | null>(null);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const fileViewerOverlayRef = useRef<HTMLDivElement>(null);
  const fileIframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (activeModal && modalScrollRef.current) modalScrollRef.current.scrollTop = 0;
  }, [activeModal]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);

      const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      const maxScroll = Math.max(1, docHeight - window.innerHeight);

      if (window.scrollY + window.innerHeight >= docHeight - 2) {
        setActiveSection(navItems[navItems.length - 1]?.id ?? "");
        return;
      }

      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      let best = navItems[0]?.id ?? "";
      let bestDist = Infinity;

      for (const nav of navItems) {
        const el = document.getElementById(nav.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const sectionProgress = Math.min(
          1,
          Math.max(0, (rect.top + window.scrollY + rect.height * 0.5 - window.innerHeight * 0.34) / maxScroll),
        );
        const dist = Math.abs(sectionProgress - progress);
        if (dist < bestDist) {
          bestDist = dist;
          best = nav.id;
        }
      }
      setActiveSection(best);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const currentItem = useMemo(() => {
    if (!activeModal) return null;
    const list = activeModal.type === "project" ? projectItems : timelineItems;
    return list.find((entry) => entry.slug === activeModal.slug) ?? null;
  }, [activeModal]);

  const currentProject = activeModal?.type === "project" ? (currentItem as ProjectItem | null) : null;
  const currentTimeline = activeModal?.type === "timeline" ? (currentItem as TimelineItem | null) : null;
  const overlayOpen = Boolean(activeFileViewer || currentItem);

  useEffect(() => {
    if (!overlayOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [overlayOpen]);

  useEffect(() => {
    if (!overlayOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      if (activeFileViewer) setActiveFileViewer(null);
      else {
        setActiveModal(null);
        syncUrl(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlayOpen, activeFileViewer]);

  const openItem = (type: ModalType, slug: string) => {
    const next = { type, slug };
    setActiveModal(next);
    syncUrl(next);
  };

  const closeModal = () => {
    setActiveModal(null);
    syncUrl(null);
  };

  const openFile = (href: string, title: string) => {
    setActiveFileViewer({ title, href });
  };

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none absolute inset-0 bg-[var(--bg-gradient)]" />

      <div className="relative mx-auto flex w-full max-w-[1344px] flex-col px-4 pb-[max(6rem,env(safe-area-inset-bottom))] pt-3 sm:px-8 sm:pb-32 sm:pt-5 lg:px-10">
        <header
          className={`sticky top-2 z-30 mb-8 rounded-xl border border-[var(--border)] shadow-[var(--shadow)] transition-all duration-300 sm:top-4 sm:mb-14 ${
            isScrolled
              ? "bg-[color:var(--surface)]/78 backdrop-blur-xl"
              : "bg-[color:var(--surface)]/94 backdrop-blur-md"
          }`}
        >
          <div className="flex items-start justify-between gap-3 px-3 py-3 lg:hidden">
            <div className="min-w-0 flex-1">
              <h1 className="text-sm font-semibold leading-snug sm:text-base">{profile.name}</h1>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.24em] text-[var(--accent)] sm:text-xs">
                Portfolio
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMobileNavOpen((open) => !open)}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav-panel"
              className={`${btnOutline} shrink-0 px-3 py-2`}
            >
              {mobileNavOpen ? "Close" : "Menu"}
            </button>
          </div>

          {mobileNavOpen ? (
            <nav
              id="mobile-nav-panel"
              className="border-t border-[var(--border)] px-3 py-3 lg:hidden"
            >
              <div className="flex flex-wrap gap-2 text-sm text-[var(--body)]">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileNavOpen(false)}
                    className={`rounded-lg px-3 py-2 transition-colors ${
                      activeSection === item.id
                        ? "border border-[var(--border)] bg-[color:var(--surface-elevated)] text-[var(--foreground)]"
                        : "hover:text-[var(--foreground)]"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={btnOutline}
                >
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </button>
              </div>
            </nav>
          ) : null}

          <div className="hidden items-center justify-between gap-6 px-4 py-4 lg:flex">
            <div className="shrink-0">
              <h1 className="text-lg font-semibold tracking-tight">{profile.name}</h1>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Portfolio</p>
            </div>
            <nav className="flex min-w-0 flex-wrap items-center justify-end gap-2 text-sm text-[var(--body)]">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative rounded-lg px-3 py-1.5 transition-colors ${
                    activeSection === item.id ? "text-[var(--foreground)]" : "hover:text-[var(--foreground)]"
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-lg border border-[var(--border)] bg-[color:var(--surface-elevated)]"
                      transition={{ type: "spring", bounce: 0.18, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              ))}
              <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={btnOutline}>
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
            </nav>
          </div>
        </header>

        <main className="space-y-12 sm:space-y-16">
          <section className="flex flex-col items-center gap-5 text-center sm:items-start sm:gap-6 sm:text-left lg:flex-row lg:items-center">
            <motion.aside
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
              className="w-[148px] shrink-0 rounded-xl border border-[var(--border)] bg-[color:var(--surface)] p-2 shadow-[var(--shadow)] sm:w-[180px] lg:w-[216px]"
            >
              <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[color:var(--surface-elevated)]">
                <div className="relative aspect-square">
                  <Image
                    src={profile.imageSrc}
                    alt={`${profile.name} portrait`}
                    fill
                    priority
                    sizes="(max-width: 640px) 148px, 216px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </motion.aside>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full space-y-4 sm:space-y-5 lg:max-w-2xl"
            >
              <div>
                <h2 className="text-[2rem] font-semibold tracking-tight text-balance sm:text-[2.75rem] lg:text-[3.375rem]">
                  {profile.name}
                </h2>
                <p className="mt-1 text-base font-medium text-[var(--accent-secondary)] sm:pl-1 sm:text-xl">
                  {profile.role}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2.5 sm:justify-start sm:gap-3">
                <a
                  href="#projects"
                  className="rounded-lg bg-[var(--accent-strong)] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 sm:px-5 sm:py-3"
                >
                  View projects
                </a>
                <a
                  href="#contact"
                  className={`${btnOutline} px-4 py-2.5 font-medium text-[var(--foreground)] sm:px-5 sm:py-3`}
                >
                  Contact
                </a>
              </div>
            </motion.div>
          </section>

          <Section id="skills" title="Skills">
            <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
              {skillGroups.map((group, i) => (
                <Card key={group.title} delay={i * 0.06}>
                  <h3 className="text-lg font-semibold sm:text-xl">{group.title}</h3>
                  <p className={`mt-2 ${bodyText}`}>{group.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[var(--border)] pt-4 sm:mt-5 sm:gap-2 sm:pt-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-sm border border-[color:color-mix(in_srgb,var(--accent)_28%,var(--border))] bg-[color:var(--surface-elevated)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--foreground)] sm:px-3 sm:py-1.5 sm:text-[11px]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          <Section id="education" title="Education">
            <div className="space-y-3">
              {timelineItems
                .filter((item) => item.type === "education")
                .map((item) => (
                  <TimelineRow
                    key={item.slug}
                    item={item}
                    theme={theme}
                    onOpen={() => openItem("timeline", item.slug)}
                  />
                ))}
            </div>
          </Section>

          <Section id="projects" title="Projects">
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projectItems.map((project) => (
                <motion.button
                  key={project.slug}
                  type="button"
                  onClick={() => openItem("project", project.slug)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.995 }}
                  className="group flex h-full flex-col rounded-lg border border-[var(--border)] bg-[color:var(--surface)] p-4 text-left shadow-[var(--shadow)] transition hover:bg-[color:var(--surface-elevated)] sm:p-5"
                >
                  <div className="relative mb-4 w-full overflow-hidden rounded-md border border-[var(--border)] bg-[color:var(--surface-elevated)] sm:mb-5">
                    <div className="relative aspect-[17/11] w-full">
                      <Image
                        src={project.imageSrc}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                  <p className={metaLabel}>{project.category}</p>
                  <h3 className="mt-2 text-lg font-semibold sm:mt-3 sm:text-xl">{project.title}</h3>
                  <p className={`mt-2 sm:mt-3 ${bodyText}`}>{project.summary}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-3 sm:gap-2 sm:pt-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className={tagPill}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>
          </Section>

          <Section id="work" title="Work">
            <div className="space-y-3">
              {timelineItems
                .filter((item) => item.type === "work")
                .map((item) => (
                  <TimelineRow
                    key={item.slug}
                    item={item}
                    theme={theme}
                    onOpen={() => openItem("timeline", item.slug)}
                  />
                ))}
            </div>
          </Section>

          <Section id="contact" title="Contact">
            <div className="grid gap-3 sm:gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <Card>
                <h3 className="text-xl font-semibold sm:text-2xl">Get in touch</h3>
                <p className={`mt-3 ${bodyText}`}>
                  I&apos;m open to new opportunities, collaborations, or just connecting about data, AI, and
                  economics. Feel free to reach out anytime.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:flex-wrap sm:gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-[var(--border)] px-4 py-2.5 text-center text-sm transition hover:bg-[color:var(--surface-elevated)] sm:py-2"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </Card>
              <Card>
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">Location</p>
                <p className="mt-3 text-lg font-medium">{profile.location}</p>
                <p className={`mt-3 ${bodyText}`}>From Campinas, Brazil. Living in Calgary, Alberta.</p>
              </Card>
            </div>
          </Section>
        </main>
      </div>

      <AnimatePresence>
        {currentItem ? (
          <motion.div
            ref={modalOverlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${overlayClass} z-50`}
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className={modalPanelClass}
            >
              <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[var(--border)] px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-5">
                  {currentTimeline?.logo && (
                    <div className="relative hidden h-16 w-16 shrink-0 sm:block sm:h-20 sm:w-20">
                      <Image
                        src={theme === "dark" ? currentTimeline.logo.dark : currentTimeline.logo.light}
                        alt={currentTimeline.institution ?? ""}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent-secondary)] sm:text-xs sm:tracking-[0.24em]">
                      {currentProject?.category ?? currentTimeline?.location}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold leading-snug sm:mt-2 sm:text-2xl">
                      {currentItem.title}
                      {currentTimeline?.accolade && (
                        <span className="ml-1 font-normal text-[var(--honours)]">with {currentTimeline.accolade}</span>
                      )}
                    </h3>
                    {currentTimeline?.institution && (
                      <p className="mt-1 text-sm font-medium text-[var(--accent)]">{currentTimeline.institution}</p>
                    )}
                    {currentTimeline && <p className={`mt-2 hidden sm:block ${bodyText}`}>{currentItem.summary}</p>}
                  </div>
                </div>
                <button type="button" onClick={closeModal} className={`${btnOutline} shrink-0`}>
                  Close
                </button>
              </div>

              <div
                ref={modalScrollRef}
                className={`min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-6 ${bodyText}`}
              >
                {currentTimeline && <p className={`mb-4 sm:hidden ${bodyText}`}>{currentItem.summary}</p>}
                <div className="flex flex-wrap gap-1.5 sm:mb-2 sm:gap-2">
                  {currentItem.tags.map((tag) => (
                    <span key={tag} className={tagPill}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 border-t border-[var(--border)] pt-4 sm:mt-6 sm:pt-6">
                  <DetailBlocks details={currentItem.details} modalType={activeModal?.type ?? null} />
                </div>
                {currentProject?.files?.length ? (
                  <div className="border-t border-[var(--border)] pt-5 opacity-90 sm:pt-6">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-secondary)]">
                      Project files
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                      {currentProject.files.map((file) => (
                        <button
                          key={file.href}
                          type="button"
                          onClick={() => openFile(file.href, currentItem.title)}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-medium sm:justify-start sm:py-2"
                        >
                          <span
                            className="icon-minimalist"
                            style={{
                              maskImage: `url(${file.icon ? `/images/icons/${file.icon}.svg` : getFileIcon(file.href)})`,
                            }}
                            aria-hidden="true"
                          />
                          {file.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeFileViewer ? (
          <motion.div
            ref={fileViewerOverlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${overlayClass} z-[60] bg-black/70`}
            onClick={() => setActiveFileViewer(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className={`${modalPanelClass} ${
                isImageHref(activeFileViewer.href) ? "max-h-[min(88dvh,900px)]" : "h-[min(88dvh,900px)]"
              }`}
            >
              <div className="flex shrink-0 flex-col gap-3 border-b border-[var(--border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-secondary)]">Original file</p>
                  <h3 className="mt-1 truncate text-base font-semibold sm:text-lg">{activeFileViewer.title}</h3>
                </div>
                <div className="flex gap-2">
                  <a
                    href={activeFileViewer.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${btnOutline} flex-1 text-center sm:flex-none`}
                  >
                    Open tab
                  </a>
                  <button type="button" onClick={() => setActiveFileViewer(null)} className={`${btnOutline} flex-1 sm:flex-none`}>
                    Close
                  </button>
                </div>
              </div>
              {isImageHref(activeFileViewer.href) ? (
                <div className="flex flex-1 items-center justify-center overflow-auto overscroll-contain bg-black/5 p-4">
                  <img src={activeFileViewer.href} alt={activeFileViewer.title} className="max-h-full max-w-full object-contain" />
                </div>
              ) : (
                <iframe
                  ref={fileIframeRef}
                  title={activeFileViewer.title}
                  src={
                    activeFileViewer.href.toLowerCase().endsWith(".pdf")
                      ? `${activeFileViewer.href}#view=FitH`
                      : activeFileViewer.href
                  }
                  className="min-h-0 flex-1 border-0 bg-white"
                />
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="scroll-mt-[5.5rem] sm:scroll-mt-28"
    >
      <div className="mb-4 sm:mb-6">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        <div className="mt-2 h-0.5 w-10 rounded-full bg-[var(--accent)] sm:mt-3" />
      </div>
      {children}
    </motion.section>
  );
}

function Card({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className="rounded-lg border border-[var(--border)] bg-[color:var(--surface)] p-4 shadow-[var(--shadow)] sm:p-5"
    >
      {children}
    </motion.div>
  );
}
