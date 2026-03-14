'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown, MapPin } from 'lucide-react';
import {
  ADDRESS,
  ADDRESS_MAP_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICE_PAGES,
} from '@/lib/constants';

const mainNavItems = [
  { label: 'דף הבית', href: '/' },
  { label: 'אודות', href: '/about' },
  { label: 'גלריה', href: '/gallery' },
  { label: 'צור קשר', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const isServicesRoute = pathname?.startsWith('/services/') ?? false;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!servicesOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setServicesOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [servicesOpen]);

  function handleNavLinkClick(
    href: string,
    event?: React.MouseEvent<HTMLAnchorElement>,
  ) {
    setMobileOpen(false);
    setServicesOpen(false);

    if (href === '/' && pathname === '/' && event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/96 shadow-sm backdrop-blur-sm">
      <div
        className="from-accent-cyan to-primary absolute right-0 bottom-0 left-0 h-0.5 bg-gradient-to-l via-blue-500"
        aria-hidden
      />
      <div className="relative mx-auto flex h-[4rem] max-w-7xl items-center justify-center gap-3 px-4 sm:h-[4.05rem] sm:gap-5 sm:px-6 md:justify-between lg:h-[4.1rem] lg:px-8">
        <button
          type="button"
          className="text-foreground absolute top-1/2 right-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg transition hover:bg-blue-50 hover:text-blue-600 sm:right-6 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'סגור תפריט' : 'פתח תפריט'}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        <div className="flex shrink-0 items-center">
          <Link
            href="/"
            className="group flex shrink-0 items-center rounded-lg transition-transform duration-200 outline-none focus:ring-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:ring-offset-1 focus-visible:ring-offset-white active:scale-[0.985]"
            aria-label="סקיצה אריזות - דף הבית"
            onClick={(event) => handleNavLinkClick('/', event)}
          >
            <Image
              src="/logo.png"
              alt="סקיצה אריזות"
              width={1536}
              height={1024}
              className="h-[3.35rem] w-auto object-contain transition duration-200 group-active:scale-[0.975] sm:h-[3.4rem] lg:h-[3.6rem]"
              sizes="(max-width: 640px) 140px, (max-width: 1024px) 154px, 172px"
            />
          </Link>
        </div>

        <a
          href={ADDRESS_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-track-event="contact_click"
          data-track-placement="header_mobile"
          data-track-label="header_mobile_map"
          className="text-primary/85 absolute top-1/2 left-4 inline-flex max-w-[35%] -translate-y-1/2 items-center gap-1 text-[11px] font-semibold transition hover:text-blue-700 md:hidden"
          aria-label="פתח את כתובת העסק בגוגל מפות"
        >
          <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-700" aria-hidden />
          <span className="truncate">{ADDRESS}</span>
        </a>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 md:flex"
          aria-label="ניווט ראשי"
        >
          {mainNavItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
              data-track-event="navigation_click"
              data-track-placement="header"
              data-track-label={href}
              className={`min-h-[36px] shrink-0 rounded-xl px-3 py-1 text-[14px] font-semibold transition sm:px-4 ${
                pathname === href
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-foreground hover:text-blue-600'
              }`}
              onClick={(event) => handleNavLinkClick(href, event)}
            >
              {label}
            </Link>
          ))}
          <div className="relative flex items-center" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setServicesOpen((o) => !o)}
              className={`flex min-h-[36px] shrink-0 items-center gap-1 rounded-xl px-3 py-1 text-[14px] font-semibold transition sm:px-4 ${
                isServicesRoute
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-foreground hover:text-blue-600'
              }`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-controls="services-menu"
              aria-label="שירותים"
            >
              שירותים
              <ChevronDown
                className={`h-4 w-4 shrink-0 transition ${servicesOpen ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            <div
              id="services-menu"
              className={`absolute start-0 top-full z-10 mt-1 min-w-[200px] rounded-xl border border-blue-200 bg-white py-2 shadow-lg transition ${servicesOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
              role="menu"
              aria-label="תפריט שירותים"
            >
              {SERVICE_PAGES.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  role="menuitem"
                  data-track-event="service_navigation_click"
                  data-track-placement="header_services_menu"
                  data-track-label={href}
                  data-track-service={href.split('/').pop()}
                  className={`block px-4 py-2.5 text-sm font-medium transition hover:bg-blue-50 hover:text-blue-700 ${
                    pathname === href
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-foreground'
                  }`}
                  onClick={() => setServicesOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <a
          href={ADDRESS_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-track-event="contact_click"
          data-track-placement="header_desktop"
          data-track-label="header_desktop_map"
          className="text-foreground/70 hidden items-center gap-1.5 text-xs font-medium transition hover:text-blue-700 lg:inline-flex"
          aria-label="פתח את כתובת העסק בגוגל מפות"
        >
          <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-700" aria-hidden />
          <span>{ADDRESS}</span>
        </a>

        <a
          id="cta-call-top"
          data-track-event="click_to_call"
          data-track-placement="header_top"
          data-track-label="header_phone"
          href={`tel:${PHONE_TEL}`}
          className="bg-primary hidden min-h-[36px] shrink-0 items-center justify-center gap-2 rounded-xl px-3 py-1 text-[14px] font-semibold text-white shadow-md transition hover:opacity-90 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:px-4 sm:text-[15px] md:flex"
          aria-label="התקשר עכשיו"
        >
          <Phone className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden />
          <span className="lg:hidden">התקשר</span>
          <span dir="ltr" className="hidden lg:inline">
            <bdi>{PHONE_DISPLAY}</bdi>
          </span>
        </a>
      </div>
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-blue-100 bg-white md:hidden ${mobileOpen ? 'block' : 'hidden'}`}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col py-4" aria-label="ניווט נייד">
          {mainNavItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
              data-track-event="navigation_click"
              data-track-placement="mobile_menu"
              data-track-label={href}
              className={`min-h-[44px] px-6 py-3 text-base font-medium transition ${
                pathname === href
                  ? 'bg-primary/6 text-primary'
                  : 'text-foreground hover:bg-primary/5 hover:text-primary'
              }`}
              onClick={(e) => {
                handleNavLinkClick(href, e);
              }}
            >
              {label}
            </Link>
          ))}
          <div className="border-primary/10 border-t px-6 pt-3">
            <p className="text-primary mb-2 text-sm font-semibold">שירותים</p>
            <div className="flex flex-col gap-0">
              {SERVICE_PAGES.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={pathname === href ? 'page' : undefined}
                  data-track-event="service_navigation_click"
                  data-track-placement="mobile_menu"
                  data-track-label={href}
                  data-track-service={href.split('/').pop()}
                  className={`min-h-[44px] rounded-xl py-2.5 pr-4 text-base transition ${
                    pathname === href
                      ? 'bg-primary/6 text-primary px-4 font-semibold'
                      : 'text-foreground/90 hover:text-primary'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <a
            href={`tel:${PHONE_TEL}`}
            data-track-event="click_to_call"
            data-track-placement="mobile_menu"
            data-track-label="mobile_menu_phone"
            className="bg-primary text-primary-foreground mx-6 mt-2 flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-medium"
            onClick={() => setMobileOpen(false)}
          >
            <Phone className="h-5 w-5" />
            <span dir="ltr">
              <bdi>{PHONE_DISPLAY}</bdi>
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
