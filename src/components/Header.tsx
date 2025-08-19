"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import {
  Play,
  Users,
  Home,
  Menu,
  X,
  ExternalLink,
  Gamepad2,
  Sparkles,
} from "lucide-react";

import Profile from "@/assets/profile.webp";

export default function HeaderHamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  const navItems = [
    { label: "Accueil", href: "/", icon: Home, isExternal: false, color: "text-cyan-400" },
    { label: "Gaming", href: "/gaming", icon: Gamepad2, isExternal: false, color: "text-purple-400" },
    { label: "YouTube", href: "https://www.youtube.com/@Este_YTB_YT", icon: Play, isExternal: true, color: "text-red-400" },
    { label: "Discord", href: "https://discord.gg/t6U4hZDrnF", icon: Users, isExternal: true, color: "text-indigo-400" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on escape or outside click
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (isOpen && e.key === "Tab") {
        // simple focus-trap behaviour: if shift+tab from first element -> focus last, or if tab from last -> back to first
        const focusable = panelRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      if (!isOpen) return;
      const target = e.target as HTMLElement;
      if (panelRef.current && !panelRef.current.contains(target) && !target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [isOpen]);

  // prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    if (isOpen) {
      setTimeout(() => firstLinkRef.current?.focus(), 120); // set focus after animation
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggle = () => setIsOpen((v) => !v);

  return (
    <>
      <m.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border border-transparent ${
          scrolled ? "bg-slate-900/90 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur opacity-60`}></div>
              <Image src={Profile} alt="Este_YTB Avatar" width={44} height={44} className="relative rounded-full bg-slate-800 p-0.5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">Este_YTB</h1>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                <p className="text-xs text-slate-400">Gaming Creator</p>
              </div>
            </div>
          </div>

          {/* HAMBURGER VISIBLE PARTOUT */}
          <div className="flex items-center gap-3">
            <m.button
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
              aria-controls="global-menu"
              onClick={toggle}
              className="menu-button p-2 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 text-white hover:bg-slate-700/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              <m.div animate={isOpen ? { rotate: 180 } : { rotate: 0 }} transition={{ duration: 0.28 }}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </m.div>
            </m.button>
          </div>
        </nav>
      </m.header>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />

            {/* Panel - responsive: full height on small screens, floating centered on large */}
            <m.div
              id="global-menu"
              role="dialog"
              aria-modal="true"
              ref={panelRef}
              initial={{ y: "10%", opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "10%", opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed z-50 top-16 right-4  text-white  left-4 mx-auto w-[min(720px,96%)] max-w-3xl rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl p-6 md:p-8 lg:top-20"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur opacity-60" />
                    <Image src={Profile} alt="Avatar" width={48} height={48} className="relative rounded-full bg-slate-800 p-0.5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Menu</h3>
                    <p className="text-sm text-slate-400">Navigation rapide</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-800/50 transition focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {navItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <m.a
                      key={item.label}
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      target={item.isExternal ? "_blank" : "_self"}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * i }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800/70 transition-colors border border-transparent hover:border-slate-700/50"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center`}> 
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.label}</span>
                          {item.isExternal && <ExternalLink className="w-3 h-3 opacity-60" />}
                        </div>
                        <p className="text-xs text-slate-500">{item.isExternal ? "Lien externe" : "Page interne"}</p>
                      </div>

                      <div className="text-slate-400 text-sm">→</div>
                    </m.a>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-700/50 pt-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Créateur de contenu gaming</span>
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>En ligne</span>
                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
