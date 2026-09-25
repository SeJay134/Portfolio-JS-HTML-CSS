import React from "react";
import { containModalFocus } from "../lib/dialog";
import { useEffect, useRef } from "react";
import { Icon } from "./Icon";

export const sections = [
  ["Home", "Home"],
  ["Projects", "Projects"],
  ["Skills", "Skills"],
  ["Experience", "Experience"],
  ["About", "About"],
  ["Connect", "Contact"],
] as const;

export type SectionId = (typeof sections)[number][0];

export function Drawer({
  open,
  onClose,
  onNavigate,
  active,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: SectionId) => void;
  active: SectionId;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const pendingSectionFocus = useRef<SectionId | null>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function navigate(
    id: SectionId,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) {
    event.preventDefault();
    pendingSectionFocus.current = id;
    onClose();
  }

  function handleDialogClose() {
    onClose();
    const id = pendingSectionFocus.current;
    pendingSectionFocus.current = null;
    if (!id) return;

    window.setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      const hash = `#${id}`;
      if (window.location.hash !== hash) {
        const url = new URL(window.location.href);
        url.hash = id;
        window.history.pushState(null, "", url);
      }
      target.scrollIntoView({ block: "start", behavior: "auto" });
      onNavigate(id);
      requestAnimationFrame(() => target.focus({ preventScroll: true }));
    }, 0);
  }
  return (
    <dialog
      ref={ref}
      id="navigation-drawer"
      onKeyDown={containModalFocus}
      className="drawer"
      aria-labelledby="navigation-title"
      onCancel={onClose}
      onClose={handleDialogClose}
      onClick={(e) => {
        if (e.target === ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (e.clientX > rect.right || e.clientY > rect.bottom) onClose();
        }
      }}
    >
      <div className="drawer-top">
        <a href="#Home" className="wordmark" onClick={(event) => navigate("Home", event)}>
          SP<span>.</span>
        </a>
        <button
          className="icon-button"
          aria-label="Close menu"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
      </div>
      <p className="eyebrow" id="navigation-title">
        Explore the portfolio
      </p>
      <nav aria-label="Main navigation">
        <ol className="drawer-links">
          {sections.map(([id, label], i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                onClick={(event) => navigate(id, event)}
              >
                <span className="nav-number">0{i + 1}</span>
                {label}
                <Icon name="arrow" />
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="drawer-bottom">
        <p>Software. Data. Possibilities.</p>
        <a href="https://github.com/SeJay134" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a
          href="https://www.linkedin.com/in/sergei_patrushev"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn ↗
        </a>
      </div>
    </dialog>
  );
}
