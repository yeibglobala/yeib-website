"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsContactOpen(false);
  };

  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-6xl">
      <div className="bg-white/70 backdrop-blur-lg rounded-full px-4 sm:px-6 md:px-8 h-14 sm:h-16 md:h-20 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/40">
        
        {/* Logo */}
        <Link href="/" className="inline-block" onClick={closeMenu}>
          <Image 
            src="/brand/logo-green.png" 
            alt="YEIB Investment Fund" 
            width={240} 
            height={64}
            unoptimized={true}
            priority
            style={{ width: "auto" }}
            className="h-6 sm:h-8 md:h-10 w-auto object-contain"
          />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/about" className="text-sm font-bold text-[var(--color-evergreen)] hover:text-[var(--color-mint-leaf)] transition-colors">
            What We Do
          </Link>
          <Link href="/entrepreneurs" className="text-sm font-bold text-[var(--color-evergreen)] hover:text-[var(--color-mint-leaf)] transition-colors">
            Who We Serve
          </Link>
          <Link href="/impact" className="text-sm font-bold text-[var(--color-evergreen)] hover:text-[var(--color-mint-leaf)] transition-colors">
            Impact
          </Link>
          <Link href="/investors" className="text-sm font-bold text-[var(--color-evergreen)] hover:text-[var(--color-mint-leaf)] transition-colors">
            Partners
          </Link>
          <Link href="/esg" className="text-sm font-bold text-[var(--color-evergreen)] hover:text-[var(--color-mint-leaf)] transition-colors">
            ESG
          </Link>
          <div className="relative group">
            <button className="text-sm font-bold text-[var(--color-evergreen)] group-hover:text-[var(--color-mint-leaf)] transition-colors">
              Contact Us
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
              <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.12)] border border-gray-100 p-2 w-[340px] flex flex-col">
                <Link href="/form" className="p-4 rounded-xl hover:bg-[var(--color-mint-cream)] transition-colors group/link text-left">
                  <h3 className="font-bold text-[var(--color-evergreen)] text-lg mb-1 group-hover/link:text-[var(--color-tiger-orange)] transition-colors">General Inquiry</h3>
                  <p className="text-[var(--color-evergreen)]/70 text-sm leading-relaxed">
                    Have a question? Send us a message and our team will get back to you.
                  </p>
                </Link>
                
                <Link href="/contact" className="p-4 rounded-xl hover:bg-[var(--color-mint-cream)] transition-colors group/link text-left">
                  <h3 className="font-bold text-[var(--color-evergreen)] text-lg mb-1 group-hover/link:text-[var(--color-tiger-orange)] transition-colors">Institutional Partnership</h3>
                  <p className="text-[var(--color-evergreen)]/70 text-sm leading-relaxed">
                    Explore investment, ESG alignment, and strategic collaboration with YEIB.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/apply">
            <Button size="sm" className="bg-[var(--color-tiger-orange)] text-white hover:bg-[var(--color-tiger-orange)]/90 hover:opacity-100">
              Apply for funding
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="lg:hidden p-2 text-[var(--color-evergreen)]"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col gap-6 lg:hidden origin-top animate-in fade-in slide-in-from-top-4">
          <nav className="flex flex-col">
            <Link href="/about" onClick={closeMenu} className="flex items-center justify-between py-4 border-b border-gray-100 text-lg font-semibold text-[var(--color-evergreen)]">
              What We Do
            </Link>
            <Link href="/entrepreneurs" onClick={closeMenu} className="flex items-center justify-between py-4 border-b border-gray-100 text-lg font-semibold text-[var(--color-evergreen)]">
              Who We Serve
            </Link>
            <Link href="/impact" onClick={closeMenu} className="flex items-center justify-between py-4 border-b border-gray-100 text-lg font-semibold text-[var(--color-evergreen)]">
              Impact
            </Link>
            <Link href="/investors" onClick={closeMenu} className="flex items-center justify-between py-4 border-b border-gray-100 text-lg font-semibold text-[var(--color-evergreen)]">
              Partners
            </Link>
            <Link href="/esg" onClick={closeMenu} className="flex items-center justify-between py-4 border-b border-gray-100 text-lg font-semibold text-[var(--color-evergreen)]">
              ESG
            </Link>
            
            {/* Contact Accordion */}
            <div className="flex flex-col border-b border-gray-100">
              <button 
                onClick={() => setIsContactOpen(!isContactOpen)}
                className="flex items-center justify-between py-4 text-lg font-semibold text-[var(--color-evergreen)] w-full text-left"
              >
                Contact Us
                {isContactOpen ? <ChevronUp size={20} className="text-[var(--color-evergreen)]" /> : <ChevronDown size={20} className="text-[var(--color-evergreen)]" />}
              </button>
              
              {isContactOpen && (
                <div className="flex flex-col gap-4 pb-4 pl-4 animate-in fade-in slide-in-from-top-2">
                  <Link href="/form" onClick={closeMenu} className="text-base text-[var(--color-evergreen)]/80 hover:text-[var(--color-tiger-orange)]">
                    General Inquiry
                  </Link>
                  <Link href="/contact" onClick={closeMenu} className="text-base text-[var(--color-evergreen)]/80 hover:text-[var(--color-tiger-orange)]">
                    Institutional Partnership
                  </Link>
                </div>
              )}
            </div>
          </nav>
          <div className="h-[1px] w-full bg-gray-200" />
          <div className="flex flex-col gap-4 text-center items-center">
            <Link href="/apply" className="w-full" onClick={closeMenu}>
              <Button size="lg" className="w-full bg-[var(--color-tiger-orange)] text-white hover:bg-[var(--color-tiger-orange)]/90 hover:opacity-100">
                Apply for funding
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
