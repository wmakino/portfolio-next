"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { ProjectMark } from "@/components/project-marks";
import {
  certificationItems,
  navItems,
  profile,
  type CertificationItem,
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

/** Interactive HTML demos use a widescreen viewer; PDFs/slides/notebooks stay tall. */
function isWebDemoFile(file: { href: string; icon?: string }) {
  if (file.icon === "window") return true;
  return (
    /\.html?$/i.test(file.href) &&
    /(lending_form|sign-in|ai-grading-system|ticket_labeller)/i.test(file.href)
  );
}

function readThemeSnapshot(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(themeStorageKey);
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
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

function broadcastThemeToFrames(next: "light" | "dark") {
  document.querySelectorAll("iframe").forEach((frame) => {
    try {
      frame.contentWindow?.postMessage(
        { type: "portfolio-theme", theme: next },
        window.location.origin,
      );
    } catch {
      /* cross-origin or unloaded frame */
    }
  });
}

function setTheme(next: "light" | "dark") {
  try {
    window.localStorage.setItem(themeStorageKey, next);
    window.dispatchEvent(new Event("portfolio-theme-change"));
    broadcastThemeToFrames(next);
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
  if (
    /^(Problem|Approach|Results|Outcome|Stack|Notes|Context|Deliverables|Method|Build|Team|Ethics)$/i.test(
      label,
    )
  ) {
    return true;
  }

  if (/\b(the|and|with|for|from|that|this|cover|courses|program|needed|is an|clients)\b/i.test(label)) {
    return false;
  }

  if (/^[A-Z0-9][^:]{0,40}\([^)]+\)$/.test(label)) return true;
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
  const gridable = (label: string | null) =>
    modalType === "timeline" && label && label.toLowerCase() !== "overview";
  const nodes: React.ReactNode[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const next = blocks[i + 1];

    if (gridable(block.label) && gridable(next?.label ?? null)) {
      nodes.push(
        <div key={`g-${block.id}`} className="mb-6 grid grid-cols-1 gap-6 sm:mb-8 sm:grid-cols-2 sm:gap-8">
          {[block, next as (typeof blocks)[0]].map((b) => (
            <div key={b.id} className="space-y-2 sm:space-y-3">
              <span className="detail-label">{b.label}</span>
              <div className="space-y-0.5 text-left">
                {b.value ? <p>{b.value}</p> : null}
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
        {block.label && <span className="detail-label">{block.label}</span>}
        <div className="space-y-3 text-left sm:space-y-4">
          {block.value && <p className={!block.label ? "leading-relaxed" : "mt-1"}>{block.value}</p>}
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
    <div className="relative h-[18px] w-[24px] shrink-0 overflow-hidden">
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

function AccoladeBadge({
  label,
  variant = "honours",
}: {
  label: string;
  variant?: "honours" | "in-progress";
}) {
  const inProgress = variant === "in-progress";
  return (
    <span className={`accolade ${inProgress ? "accolade--progress" : ""}`}>
      {inProgress ? ` (${label})` : ` with ${label}`}
    </span>
  );
}

function CertificationRow({ item, index }: { item: CertificationItem; index: number }) {
  return (
    <article className="cert-row">
      <span className="index-row__num">{String(index + 1).padStart(2, "0")}</span>
      <div className="cert-row__logo">
        <Image
          src={item.logo}
          alt={`${item.issuer} logo`}
          width={56}
          height={56}
          unoptimized
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="cert-row__body">
        <div className="cert-row__meta">
          <p className="cert-row__issued">Issued {item.issued}</p>
          {item.credentialUrl ? (
            <a
              href={item.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-row__link link-underline"
            >
              View credential
            </a>
          ) : null}
        </div>
        <h3 className="cert-row__title">{item.title}</h3>
        <p className="cert-row__issuer">{item.issuer}</p>
      </div>
    </article>
  );
}

function TimelineRow({
  item,
  theme,
  index,
  onOpen,
}: {
  item: TimelineItem;
  theme: "light" | "dark";
  index: number;
  onOpen: () => void;
}) {
  const showLogo = item.type === "education" && item.logo;

  return (
    <button type="button" onClick={onOpen} className="index-row">
      <span className="index-row__num">{String(index + 1).padStart(2, "0")}</span>
      <div className="min-w-0">
        <div className="flex items-start gap-3">
          {showLogo && item.logo ? (
            <div className="relative mt-0.5 hidden h-11 w-11 shrink-0 sm:block">
              <Image
                src={theme === "dark" ? item.logo.dark : item.logo.light}
                alt={item.institution ?? item.title}
                fill
                sizes="44px"
                className="object-contain"
              />
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            <div className="index-row__top">
              <h3 className="index-row__title">
                {item.title}
                {item.accolade ? (
                  <AccoladeBadge label={item.accolade} variant={item.accoladeVariant} />
                ) : null}
              </h3>
              {item.type === "education" ? (
                <span className="index-row__place">
                  <span className="truncate">{item.location}</span>
                  {item.country ? <Flag code={item.country} /> : null}
                </span>
              ) : (
                <span className="index-row__place">{item.period}</span>
              )}
            </div>
            {(item.institution || (item.type === "work" && item.location)) && (
              <p className="index-row__meta">
                {item.type === "education" ? item.period : null}
                {item.type === "education" && item.institution ? " · " : null}
                {item.institution ?? item.location}
              </p>
            )}
            <p className="index-row__summary">{item.summary}</p>
            <ul className="index-row__tags">
              {item.tags.slice(0, 4).map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <span className="index-row__open">Open →</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export function PortfolioShell() {
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();
  const theme = useSyncExternalStore(subscribeToTheme, readThemeSnapshot, () => "dark" as const);

  const [activeModal, setActiveModal] = useState<SelectedItem>(() => modalFromSearchParams(searchParams));
  const [activeFileViewer, setActiveFileViewer] = useState<{
    title: string;
    href: string;
    wide?: boolean;
  } | null>(null);

  const modalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (activeModal && modalScrollRef.current) modalScrollRef.current.scrollTop = 0;
  }, [activeModal]);

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

    const isInsideScrollableModal = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest(".modal-body, .modal-panel--file, .modal-panel--file-wide, .modal-panel--image"),
      );
    };

    const blockPageScroll = (e: Event) => {
      if (isInsideScrollableModal(e.target)) return;
      e.preventDefault();
    };

    const blockPageKeys = (e: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (!keys.includes(e.key)) return;
      if (isInsideScrollableModal(e.target)) return;
      const tag = e.target instanceof HTMLElement ? e.target.tagName : "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      e.preventDefault();
    };

    const lockScrollY = window.scrollY;
    const keepScrollPosition = () => {
      if (window.scrollY !== lockScrollY) window.scrollTo(0, lockScrollY);
    };

    document.documentElement.classList.add("modal-scroll-lock");
    window.addEventListener("wheel", blockPageScroll, { passive: false });
    window.addEventListener("touchmove", blockPageScroll, { passive: false });
    window.addEventListener("keydown", blockPageKeys);
    window.addEventListener("scroll", keepScrollPosition, { passive: true });

    return () => {
      document.documentElement.classList.remove("modal-scroll-lock");
      window.removeEventListener("wheel", blockPageScroll);
      window.removeEventListener("touchmove", blockPageScroll);
      window.removeEventListener("keydown", blockPageKeys);
      window.removeEventListener("scroll", keepScrollPosition);
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

  const openFile = (href: string, title: string, wide = false) => {
    setActiveFileViewer({ title, href, wide });
  };

  const education = timelineItems.filter((item) => item.type === "education");
  const work = timelineItems.filter((item) => item.type === "work");
  const year = new Date().getFullYear();

  const tocHints: Record<string, string> = {
    skills: `${skillGroups.length} groups`,
    education: `${education.length} entries`,
    certifications: `${certificationItems.length} credentials`,
    projects: `${projectItems.length} selected`,
    work: `${work.length} roles`,
    contact: profile.location,
  };

  const modalMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="page-shell">
      <nav className="nav-rail" aria-label="Section navigation">
        <a href="#top" className="nav-rail__wordmark">
          {profile.name}
        </a>
        <ul className="nav-rail__dots">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} aria-label={item.label} title={item.label} />
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="nav-rail__theme"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </nav>

      <div className="page-frame">
        <header className="nav-mobile">
          <a href="#top" className="nav-mobile__wordmark">
            {profile.name}
          </a>
          <div className="nav-mobile__actions">
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="btn btn--text"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <a href="#contact" className="btn btn--primary">
              Contact
            </a>
          </div>
        </header>

        <main id="top">
          <section className="index-intro" aria-label="Introduction">
            <div>
              <h1 className="index-intro__name">{profile.name}</h1>
              <p className="index-intro__eyebrow">{profile.location}</p>
              <p className="index-intro__lede">
                {profile.role}. Skills, education, credentials, and selected projects below. Open any
                row for the full write-up.
              </p>
              <div className="index-intro__meta">
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <figure className="index-intro__portrait">
              <Image
                src={profile.imageSrc}
                alt={`${profile.name} portrait`}
                fill
                priority
                sizes="220px"
                className="object-cover object-center"
              />
            </figure>
          </section>

          <nav className="index-toc" aria-label="Page index">
            {navItems.map((item, index) => (
              <a key={item.id} href={`#${item.id}`} className="index-toc__row">
                <span className="index-toc__num">{String(index + 1).padStart(2, "0")}</span>
                <span className="index-toc__label">{item.label}</span>
                <span className="index-toc__hint">{tocHints[item.id] ?? ""}</span>
              </a>
            ))}
          </nav>

          <section id="skills" className="section-block">
            <header className="section-head">
              <span className="section-head__num">01</span>
              <h2>Skills</h2>
              <p>Modeling, analytics, shipping, and the ops after launch.</p>
            </header>
            <div className="index-stack">
              {skillGroups.map((group, index) => (
                <div key={group.title} className="index-row index-row--static">
                  <span className="index-row__num">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="index-row__title">{group.title}</h3>
                    <p className="index-row__summary">{group.description}</p>
                    <ul className="skill-items">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="education" className="section-block">
            <header className="section-head">
              <span className="section-head__num">02</span>
              <h2>Education</h2>
            </header>
            <div className="index-stack">
              {education.map((item, index) => (
                <TimelineRow
                  key={item.slug}
                  item={item}
                  theme={theme}
                  index={index}
                  onOpen={() => openItem("timeline", item.slug)}
                />
              ))}
            </div>
          </section>

          <section id="certifications" className="section-block">
            <header className="section-head">
              <span className="section-head__num">03</span>
              <h2>Certifications</h2>
            </header>
            <div className="index-stack">
              {certificationItems.map((item, index) => (
                <CertificationRow key={item.slug} item={item} index={index} />
              ))}
            </div>
          </section>

          <section id="projects" className="section-block">
            <header className="section-head">
              <span className="section-head__num">04</span>
              <h2>Projects</h2>
              <p>Open any row for write-up and files.</p>
            </header>
            <div className="index-stack">
              {projectItems.map((project, index) => (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => openItem("project", project.slug)}
                  className="index-row index-row--project"
                >
                  <span className="index-row__num">{String(index + 1).padStart(2, "0")}</span>
                  <figure className="index-row__thumb" aria-hidden="true">
                    <ProjectMark slug={project.slug} className="index-row__mark" />
                  </figure>
                  <div className="min-w-0">
                    <p className="index-row__meta">{project.category}</p>
                    <h3 className="index-row__title">{project.title}</h3>
                    <p className="index-row__summary">{project.summary}</p>
                    <ul className="index-row__tags">
                      {project.tags.slice(0, 4).map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <span className="index-row__open">Open project →</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section id="work" className="section-block">
            <header className="section-head">
              <span className="section-head__num">05</span>
              <h2>Work</h2>
            </header>
            <div className="index-stack">
              {work.map((item, index) => (
                <TimelineRow
                  key={item.slug}
                  item={item}
                  theme={theme}
                  index={index}
                  onOpen={() => openItem("timeline", item.slug)}
                />
              ))}
            </div>
          </section>

          <section id="contact" className="section-block">
            <header className="section-head">
              <span className="section-head__num">06</span>
              <h2>Contact</h2>
            </header>
            <div className="contact-block">
              <p>
                Open to new work, collaborations, or a chat about data, AI, and economics.
              </p>
              <div className="contact-links">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <p className="contact-place">
                Location
                <strong>{profile.location}</strong>
                From Campinas, Brazil. Living in Calgary, Alberta.
              </p>
            </div>
          </section>
        </main>

        <footer className="foot-stmt">
          <p className="foot-stmt__line">Build something they can trust the numbers on.</p>
          <div className="foot-stmt__meta">
            <span className="wordmark">{profile.name}</span>
            <div className="foot-stmt__links">
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
              <span>© {year}</span>
            </div>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {currentItem ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.18 }}
            className="modal-overlay"
            onClick={closeModal}
          >
            <motion.div
              {...modalMotion}
              transition={{ duration: reduceMotion ? 0.12 : 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="modal-panel"
              role="dialog"
              aria-modal="true"
              aria-label={currentItem.title}
            >
              <div className="modal-head">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  {currentTimeline?.logo ? (
                    <div className="relative hidden h-16 w-16 shrink-0 sm:block">
                      <Image
                        src={theme === "dark" ? currentTimeline.logo.dark : currentTimeline.logo.light}
                        alt={currentTimeline.institution ?? ""}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>
                  ) : null}
                  {currentProject ? (
                    <div className="index-row__thumb index-row__thumb--modal" aria-hidden="true">
                      <ProjectMark slug={currentProject.slug} className="index-row__mark" />
                    </div>
                  ) : null}
                  <div className="min-w-0">
                    <p className="cert-row__issued">
                      {currentProject?.category ?? currentTimeline?.location}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                      {currentItem.title}
                      {currentTimeline?.accolade ? (
                        <AccoladeBadge
                          label={currentTimeline.accolade}
                          variant={currentTimeline.accoladeVariant}
                        />
                      ) : null}
                    </h3>
                    {currentTimeline?.institution ? (
                      <p className="timeline-row__meta">{currentTimeline.institution}</p>
                    ) : null}
                    {currentTimeline ? (
                      <p className="timeline-row__summary hidden sm:block">{currentItem.summary}</p>
                    ) : null}
                  </div>
                </div>
                <button type="button" onClick={closeModal} className="btn btn--ghost shrink-0">
                  Close
                </button>
              </div>

              <div ref={modalScrollRef} className="modal-body">
                {currentTimeline ? (
                  <p className="mb-4 sm:hidden">{currentItem.summary}</p>
                ) : null}
                <ul className="timeline-row__tags mb-4">
                  {currentItem.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="border-t border-[var(--color-rule)] pt-5">
                  <DetailBlocks details={currentItem.details} modalType={activeModal?.type ?? null} />
                </div>
                {currentProject?.files?.length ? (
                  <div className="border-t border-[var(--color-rule)] pt-5">
                    <p className="detail-label mb-3">Project files</p>
                    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                      {currentProject.files.map((file) => (
                        <button
                          key={file.href}
                          type="button"
                          onClick={() =>
                            openFile(file.href, file.label, isWebDemoFile(file))
                          }
                          className="btn btn--ghost"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.15 }}
            className="modal-overlay modal-overlay--viewer"
            style={{ zIndex: 60 }}
            onClick={() => setActiveFileViewer(null)}
          >
            <motion.div
              {...modalMotion}
              transition={{ duration: reduceMotion ? 0.12 : 0.15, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={`modal-panel ${
                isImageHref(activeFileViewer.href)
                  ? "modal-panel--image"
                  : activeFileViewer.wide
                    ? "modal-panel--file-wide"
                    : "modal-panel--file"
              }`}
              data-viewer={
                isImageHref(activeFileViewer.href)
                  ? "image"
                  : activeFileViewer.wide
                    ? "wide"
                    : "document"
              }
              role="dialog"
              aria-modal="true"
              aria-label={activeFileViewer.title}
            >
              <div className="modal-head flex-col gap-3 sm:flex-row sm:items-center">
                <div className="min-w-0">
                  <p className="cert-row__issued">Original file</p>
                  <h3 className="mt-1 truncate text-lg font-semibold">{activeFileViewer.title}</h3>
                </div>
                <div className="flex gap-2">
                  <a
                    href={activeFileViewer.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost flex-1 sm:flex-none"
                  >
                    Open tab
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveFileViewer(null)}
                    className="btn btn--ghost flex-1 sm:flex-none"
                  >
                    Close
                  </button>
                </div>
              </div>
              {isImageHref(activeFileViewer.href) ? (
                <div className="flex flex-1 items-center justify-center overflow-auto overscroll-contain bg-[var(--color-paper-2)] p-4">
                  <img
                    src={activeFileViewer.href}
                    alt={activeFileViewer.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : (
                <iframe
                  title={activeFileViewer.title}
                  src={
                    activeFileViewer.href.toLowerCase().endsWith(".pdf")
                      ? `${activeFileViewer.href}#view=FitH`
                      : activeFileViewer.href
                  }
                  className="min-h-0 flex-1 border-0 bg-[var(--color-paper)]"
                  onLoad={(event) => {
                    try {
                      event.currentTarget.contentWindow?.postMessage(
                        { type: "portfolio-theme", theme },
                        window.location.origin,
                      );
                    } catch {
                      /* ignore */
                    }
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
