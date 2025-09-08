import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#D8C4B6] via-[#3E5879] to-[#213555] py-16 px-6">
      <div className="max-w-7xl mx-auto">
     
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          {/* Left Side - Company Info & Newsletter */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Sajre Edutech</h2>
              <p className="text-base text-white/80 leading-relaxed max-w-sm">
                From upskilling professionals to nurturing fresh talent, we deliver
                future-ready learning experiences that keep pace with global trends.
              </p>
            </div>
            
            {/* Newsletter */}
            <div>
              <p className="text-base  text-white/90 mb-3">Join our newsletter</p>
              <form className="flex items-center bg-white/20 rounded-lg overflow-hidden backdrop-blur-sm">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/60 text-base focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] px-4 py-3 text-[#213555] hover:opacity-90 transition"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Links</h3>
            <ul className="space-y-3 text-base">
              <li><a href="/services" className="text-white/80 hover:text-white transition">Services</a></li>
              <li><a href="/process" className="text-white/80 hover:text-white transition">Process</a></li>
              <li><a href="/case-studies" className="text-white/80 hover:text-white transition">Case studies</a></li>
              <li><a href="/benefits" className="text-white/80 hover:text-white transition">Benefits</a></li>
              <li><a href="/pricing" className="text-white/80 hover:text-white transition">Pricing</a></li>
            </ul>
          </div>

          {/* Pages Column */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Pages</h3>
            <ul className="space-y-3 text-base">
              <li><a href="/" className="text-white/80 hover:text-white transition">Home</a></li>
              <li><a href="/about" className="text-white/80 hover:text-white transition">About</a></li>
              <li><a href="/blog" className="text-white/80 hover:text-white transition">Blog</a></li>
              <li><a href="/contact" className="text-white/80 hover:text-white transition">Contact</a></li>
              <li><a href="/404" className="text-white/80 hover:text-white transition">404</a></li>
            </ul>
          </div>

          {/* Right Side - Contact & CTA */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact</h3>
              <ul className="space-y-4 text-base">
                <li className="flex items-start gap-3">
                  <Phone size={16} className="text-white/80 mt-1" />
                  <a href="tel:+919226492274" className="text-white/80 hover:text-white transition">
                    +91 9226492274
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={16} className="text-white/80 mt-1" />
                  <a href="mailto:support@sajreedutech.in" className="text-white/80 hover:text-white transition">
                    support@sajreedutech.in
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-white/80 mt-1" />
                  <span className="text-white/80">Bengaluru, India</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-[#D8C4B6] to-[#F5EFE7] text-[#213555] px-4 py-3 rounded-lg text-base font-semibold hover:from-[#F5EFE7] hover:to-[#D8C4B6] transition-all duration-300 shadow-lg">
                Start Learning →
              </button>
              <button className="w-full border border-white/30 text-white px-4 py-3 rounded-lg text-base font-medium hover:bg-white/10 transition">
                Explore Courses →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>© {new Date().getFullYear()} Sajre Edutech. All Rights Reserved.</p>
          <p>Designed & Crafted by the Sajre Team</p>
        </div>
      </div>
    </footer>
  );
}