import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-evergreen)] text-white/80 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <Image 
                src="/brand/logo-white.png" 
                alt="YEIB Investment Fund" 
                width={160} 
                height={40}
                style={{ width: "auto" }}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="max-w-sm mb-8 leading-relaxed">
              The institutional bridge between capital and ambition, empowering youth-led and women-led MSMEs across Nigeria.
            </p>
            <div className="flex gap-4">
              <Link href="/contact">
                <Button variant="secondary" className="bg-white/10 text-white border-none hover:bg-white/20">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide capitalize text-sm">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="hover:text-white transition-colors">What We Do</Link></li>
              <li><Link href="/entrepreneurs" className="hover:text-white transition-colors">Who We Serve</Link></li>
              <li><Link href="/impact" className="hover:text-white transition-colors">Impact</Link></li>
              <li><Link href="/investors" className="hover:text-white transition-colors">Partners</Link></li>
              <li><Link href="/esg" className="hover:text-white transition-colors">ESG</Link></li>
              <li><Link href="/apply" className="hover:text-white transition-colors">Apply for Funding</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide capitalize text-sm">Legal & Connect</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>&copy; {currentYear} N-YEIB Investment Funds. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Anchored by AfDB</p>
        </div>
      </div>
    </footer>
  );
}
