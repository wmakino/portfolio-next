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

type SelectedItem = {
  type: ModalType;
  slug: string;
} | null;

const pageVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const themeStorageKey = "portfolio-theme";

function getFileIcon(href: string) {
  const h = href.toLowerCase();
  if (h.includes("poster")) return "/images/icons/image.svg";
  if (h.includes("presentation") || h.includes("slides")) return "/images/icons/presentation.svg";
  if (h.includes("code") || h.endsWith(".html")) return "/images/icons/code.svg";
  if (h.endsWith(".pdf")) return "/images/icons/file.svg";
  return "/images/icons/globe.svg";
}

const isImageHref = (href: string) =>
  /\.(png|jpg|jpeg|svg|webp|gif|avif)$/i.test(href);

const Flag = ({ code }: { code: "CA" | "BR" }) => {
  const src = code === "CA" ? "/images/flags/canada.png" : "/images/flags/brazil.png";
  const alt = code === "CA" ? "Canada flag" : "Brazil flag";
  
  return (
    <div className="relative h-[24px] w-[31px] shrink-0 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="32px"
        className="object-contain object-left"
      />
    </div>
  );
};

function readThemeSnapshot() {
  if (typeof window === "undefined") {
    return "light" as const;
  }

  const storedTheme = window.localStorage.getItem(themeStorageKey);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return "light" as const;
}

function subscribeToThemeChange(callback: () => void) {
  const handleStorage = () => callback();
  window.addEventListener("storage", handleStorage);
  window.addEventListener("portfolio-theme-change", handleStorage);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("portfolio-theme-change", handleStorage);
  };
}

export function PortfolioShell() {
  const searchParams = useSearchParams();
  const theme = useSyncExternalStore(subscribeToThemeChange, readThemeSnapshot, () => "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const [activeFileViewer, setActiveFileViewer] = useState<{
    title: string;
    href: string;
  } | null>(null);

  // Local state drives the modal UI. URL is updated silently via replaceState
  // to avoid Next.js production router scroll side-effects entirely.
  const [activeModal, setActiveModal] = useState<SelectedItem>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  // On mount (or hard reload), seed local state from URL
  useEffect(() => {
    const type = searchParams.get("type");
    const item = searchParams.get("item");
    if ((type === "project" || type === "timeline") && item) {
      setActiveModal({ type: type as ModalType, slug: item });
    }
    // Only run on mount — after that, local state is the source of truth
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset modal scroll to top whenever the item changes
  useEffect(() => {
    if (activeModal && modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }
  }, [activeModal]);

  const currentItem = useMemo(() => {
    if (!activeModal) return null;
    if (activeModal.type === "project") {
      return projectItems.find((p) => p.slug === activeModal.slug) ?? null;
    }
    return timelineItems.find((e) => e.slug === activeModal.slug) ?? null;
  }, [activeModal]);

  // Scroll-lock body when any overlay is open
  useEffect(() => {
    if (!activeFileViewer && !currentItem) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [activeFileViewer, currentItem]);

  // Silently sync URL with modal state (no router, no scroll side-effects)
  const syncUrl = (modal: SelectedItem) => {
    const url = new URL(window.location.href);
    if (modal) {
      url.searchParams.set("type", modal.type);
      url.searchParams.set("item", modal.slug);
    } else {
      url.searchParams.delete("type");
      url.searchParams.delete("item");
    }
    window.history.replaceState(window.history.state, "", url.toString());
  };

  const openItem = (type: ModalType, slug: string) => {
    const next = { type, slug };
    setActiveModal(next);
    syncUrl(next);
  };

  const closeModal = () => {
    setActiveModal(null);
    syncUrl(null);
  };

  const closeFileViewer = () => {
    setActiveFileViewer(null);
  };

  const updateTheme = (nextTheme: "light" | "dark") => {
    window.localStorage.setItem(themeStorageKey, nextTheme);
    window.dispatchEvent(new Event("portfolio-theme-change"));
  };

  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 8);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const currentProject = activeModal?.type === "project" ? (currentItem as ProjectItem | null) : null;
  const currentTimeline = activeModal?.type === "timeline" ? (currentItem as TimelineItem | null) : null;
  const currentProjectFiles = currentProject?.files ?? [];

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none absolute inset-0 bg-[var(--bg-gradient)]" />

      <div className="relative mx-auto flex w-full max-w-[1344px] flex-col px-5 pb-32 pt-5 sm:px-8 lg:px-10">
        <header
          className={`sticky top-4 z-30 mb-10 rounded-2xl border border-[var(--border)] px-4 py-3 shadow-[var(--shadow)] transition-all duration-300 ${
            isScrolled
              ? "bg-[color:var(--surface)]/72 backdrop-blur-2xl backdrop-saturate-150"
              : "bg-[color:var(--surface)]/92 backdrop-blur-xl"
          }`}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-lg font-semibold tracking-tight">{profile.name}</h1>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Portfolio</p>
            </div>

            <nav className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative rounded-full px-3 py-1.5 transition-colors duration-300 ${
                    activeSection === item.id ? "text-[var(--foreground)]" : "hover:text-[var(--foreground)]"
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full border border-[var(--border)] bg-[color:var(--surface-elevated)]"
                      transition={{ type: "spring", bounce: 0.18, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              ))}
              <button
                type="button"
                onClick={() => updateTheme(theme === "dark" ? "light" : "dark")}
                className="relative rounded-full border border-[var(--border)] px-3 py-1.5 text-[var(--foreground)] transition hover:bg-[color:var(--surface-elevated)]"
              >
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
            </nav>
          </div>
        </header>

        <main className="space-y-16">
          <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
            <motion.aside
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="w-full max-w-[216px] shrink-0 rounded-2xl border border-[var(--border)] bg-[color:var(--surface)] p-2 shadow-[var(--shadow)]"
            >
              <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[color:var(--surface-elevated)]">
                <div className="relative aspect-square">
                  <Image
                    src={profile.imageSrc}
                    alt={`${profile.name} portrait`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 216px, 216px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </motion.aside>

            <motion.div
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="space-y-5 lg:max-w-2xl"
            >
              <div className="space-y-0 lg:pt-0">
                <h2 className="max-w-3xl text-[2.7rem] font-semibold tracking-tight text-balance sm:text-[3.375rem]">
                  {profile.name}
                </h2>
                <p className="pl-1 text-lg font-medium text-[var(--muted)] sm:text-xl">
                  {profile.role}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  View projects
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-[var(--border)] px-5 py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-[color:var(--surface-elevated)]"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          </section>

          <SectionBlock id="skills" title="Skills">
            <div className="grid gap-4 md:grid-cols-3">
              {skillGroups.map((group, index) => (
                <Card key={group.title} delay={index * 0.08}>
                  <h3 className="text-xl font-semibold">{group.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{group.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2 pt-2 border-t border-[var(--border)]">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-[color:var(--surface-elevated)] border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--foreground)] transition-colors hover:bg-[var(--accent)] hover:text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock id="education" title="Education">
            <div className="space-y-3">
              {timelineItems
                .filter((item) => item.type === "education")
                .map((item) => (
                  <motion.button
                    key={item.slug}
                    type="button"
                    onClick={() => openItem("timeline", item.slug)}
                    whileHover={{ y: -3 }}
                    className="w-full rounded-xl border border-[var(--border)] bg-[color:var(--surface)] p-4 text-left shadow-[var(--shadow)] transition hover:bg-[color:var(--surface-elevated)]"
                  >
                    <div className="flex gap-4 sm:gap-6">
                      {item.logo && (
                        <div className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
                          <Image
                            src={theme === "dark" ? item.logo.dark : item.logo.light}
                            alt={item.institution || ""}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{item.period}</p>
                            <h3 className="mt-1 text-xl font-semibold">
                              {item.title}
                              {item.accolade && (
                                <span className="ml-1 font-normal whitespace-nowrap text-[var(--honours)]">
                                  with {item.accolade}
                                </span>
                              )}
                            </h3>
                            {item.institution && (
                              <p className="text-sm font-medium text-[var(--accent)] mt-0.5">{item.institution}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm font-medium text-[var(--muted)] sm:justify-end">
                            <span>{item.location}</span>
                            {item.country && <Flag code={item.country} />}
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.summary}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className="rounded-lg bg-[var(--pill-bg)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--pill-fg)]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
            </div>
          </SectionBlock>

          <SectionBlock id="projects" title="Projects">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projectItems.map((project) => (
                <motion.button
                  key={project.slug}
                  type="button"
                  onClick={() => openItem("project", project.slug)}
                  whileHover={{ y: -3 }}
                  className="group flex h-full flex-col items-start justify-start rounded-xl border border-[var(--border)] bg-[color:var(--surface)] p-5 text-left shadow-[var(--shadow)] transition hover:bg-[color:var(--surface-elevated)]"
                >
                  <div className="relative mb-5 w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[color:var(--surface-elevated)]">
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
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{project.category}</p>
                  <h3 className="mt-3 text-xl font-semibold">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.summary}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-lg bg-[var(--pill-bg)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--pill-fg)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock id="work" title="Work">
            <div className="space-y-3">
              {timelineItems
                .filter((item) => item.type === "work")
                .map((item) => (
                  <motion.button
                    key={item.slug}
                    type="button"
                    onClick={() => openItem("timeline", item.slug)}
                    whileHover={{ y: -3 }}
                    className="w-full rounded-xl border border-[var(--border)] bg-[color:var(--surface)] p-4 text-left shadow-[var(--shadow)] transition hover:bg-[color:var(--surface-elevated)]"
                  >
                    <div className="flex gap-4 sm:gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{item.period}</p>
                            <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
                            {item.location && (
                              <p className="text-sm font-medium text-[var(--accent)] mt-0.5">{item.location}</p>
                            )}
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.summary}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className="rounded-lg bg-[var(--pill-bg)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--pill-fg)]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
            </div>
          </SectionBlock>

          <SectionBlock id="contact" title="Contact">
            <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <Card>
                <h3 className="text-2xl font-semibold">Let’s connect</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  I&apos;m always open to discussing new opportunities, collaborations, or talking about data and tech. Feel free to reach out via email or connect with me on LinkedIn and GitHub.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm transition hover:bg-[color:var(--surface-elevated)]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </Card>
              <Card>
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">Location</p>
                <p className="mt-3 text-lg font-medium">{profile.location}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Originally from Campinas, Brazil, and now based in Canada.</p>
              </Card>
            </div>
          </SectionBlock>
        </main>
      </div>

      <AnimatePresence>
        {currentItem ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-4 sm:items-center"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: 28, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-[806px] rounded-xl border border-[var(--border)] bg-[color:var(--surface-elevated)] p-6 shadow-[var(--shadow)]"
            >
              <div className="flex items-start gap-5 sm:gap-6">
                {currentTimeline?.logo && (
                  <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
                    <Image
                      src={theme === "dark" ? currentTimeline.logo.dark : currentTimeline.logo.light}
                      alt={currentTimeline.institution || ""}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                        {currentProject?.category ?? currentTimeline?.location}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold">
                        {currentItem.title}
                        {currentTimeline?.accolade && (
                          <span className="ml-1 font-normal whitespace-nowrap text-[var(--honours)]">
                            with {currentTimeline.accolade}
                          </span>
                        )}
                      </h3>
                      {currentTimeline?.institution && (
                        <p className="text-sm font-medium text-[var(--accent)] mt-1">{currentTimeline.institution}</p>
                      )}
                      {currentTimeline ? (
                        <p className="mt-2 text-sm text-[var(--muted)]">{currentItem.summary}</p>
                      ) : null}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {currentItem.tags.map((tag) => (
                          <span key={tag} className="rounded-lg bg-[var(--pill-bg)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--pill-fg)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm transition hover:bg-[color:var(--surface)]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-[var(--border)]" />

              <div 
                ref={modalScrollRef}
                className="mt-6 max-h-[60vh] overflow-y-auto pr-3 text-sm leading-6 text-[var(--muted)]"
              >
                {(() => {
                  const blocks: any[] = [];
                  let currentBlock: any = null;

                  currentItem.details.forEach((detail, idx) => {
                    const isBullet = detail.trim().startsWith("•") || detail.trim().startsWith("-");
                    const parts = detail.split(": ");
                    const hasLabel = parts.length > 1 && parts[0].length < 45 && !isBullet;

                    if (hasLabel) {
                      if (currentBlock) blocks.push(currentBlock);
                      currentBlock = { label: parts[0], value: parts.slice(1).join(": "), items: [], id: idx };
                    } else if (currentBlock) {
                      currentBlock.items.push(detail);
                    } else {
                      blocks.push({ label: null, value: detail, items: [], id: idx });
                    }
                  });
                  if (currentBlock) blocks.push(currentBlock);

                  const renderedBlocks: any[] = [];
                  for (let i = 0; i < blocks.length; i++) {
                    const b = blocks[i];
                    const nextB = blocks[i + 1];

                    const isGridable = (label: string) => 
                      activeModal?.type === "timeline" && label && label.toLowerCase() !== "overview";

                    if (isGridable(b.label) && isGridable(nextB?.label)) {
                      renderedBlocks.push(
                        <div key={`grid-${b.id}`} className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 mb-8">
                          {[b, nextB].map((block) => (
                            <div key={block.id} className="space-y-3">
                              <span className="block font-bold text-[var(--foreground)] uppercase tracking-widest text-[11px] sm:text-[12px]">
                                {block.label}
                              </span>
                              <div className="space-y-0.5 text-left">
                                {block.items.map((item: string, idx: number) => (
                                  <p key={idx} className={item.trim().startsWith("•") ? "pl-5 -indent-5" : ""}>
                                    {item}
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                      i++;
                    } else {
                      renderedBlocks.push(
                        <div key={b.id} className="mb-8 space-y-4">
                          {b.label && (
                            <span className="block font-bold text-[var(--foreground)] uppercase tracking-widest text-[11px] sm:text-[12px]">
                              {b.label}
                            </span>
                          )}
                          <div className={`space-y-4 text-justify`}>
                            {b.value && (
                              <p className={!b.label ? "text-[var(--muted)] leading-relaxed" : "mt-1"}>
                                {b.value}
                              </p>
                            )}
                            <div className={(activeModal?.type === "project" || !b.label || b.label.toLowerCase() === "overview") ? "space-y-4" : "space-y-0.5"}>
                              {b.items.map((item: string, idx: number) => (
                                <p key={idx} className={item.trim().startsWith("•") ? "pl-5 -indent-5" : ""}>
                                  {item}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  }
                  return renderedBlocks;
                })()}
                {currentProjectFiles.length > 0 ? (
                  <div className="border-t border-[var(--border)] pt-6 opacity-80">
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                      Project Files
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentProjectFiles.map((file) => (
                        <button
                          key={file.href}
                          type="button"
                          onClick={() => {
                            if (window.innerWidth < 768) {
                              window.open(file.href, "_blank");
                            } else {
                              setActiveFileViewer({ title: currentItem.title, href: file.href });
                            }
                          }}
                          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[color:var(--surface)]"
                        >
                          <span
                            className="icon-minimalist"
                            style={{
                              maskImage: `url(${
                                file.icon ? `/images/icons/${file.icon}.svg` : getFileIcon(file.href)
                              })`,
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
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
            onClick={closeFileViewer}
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.1 }}
              onClick={(event) => event.stopPropagation()}
              className={`flex ${isImageHref(activeFileViewer.href) ? "h-auto max-h-[88vh]" : "h-[88vh]"} w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[color:var(--surface-elevated)] shadow-[var(--shadow)]`}
            >
              <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-4 py-3 sm:px-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Original file</p>
                  <h3 className="mt-1 text-lg font-semibold">{activeFileViewer.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={activeFileViewer.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm transition hover:bg-[color:var(--surface)]"
                  >
                    Open in new tab
                  </a>
                  <button
                    type="button"
                    onClick={closeFileViewer}
                    className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm transition hover:bg-[color:var(--surface)]"
                  >
                    Close
                  </button>
                </div>
              </div>
              {isImageHref(activeFileViewer.href) ? (
                <div className="flex-1 overflow-auto bg-black/5 p-4 flex items-center justify-center">
                  <img
                    src={activeFileViewer.href}
                    alt={activeFileViewer.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : (
                <iframe
                  title={activeFileViewer.title}
                  src={activeFileViewer.href.toLowerCase().endsWith(".pdf") ? `${activeFileViewer.href}#view=FitH` : activeFileViewer.href}
                  className="h-full w-full bg-white"
                />
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function SectionBlock({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      variants={pageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="scroll-mt-28"
    >
      <div className="mb-6">
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function Card({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className="rounded-xl border border-[var(--border)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow)]"
    >
      {children}
    </motion.div>
  );
}