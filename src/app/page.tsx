"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  TrendingUp,
  Palette,
  ArrowRight,
  CheckCircle2,
  Users
} from "lucide-react";

type Role = "creator" | "affiliate" | "designer" | "customer" | null;

interface RoleData {
  id: Role;
  title: string;
  icon: React.ReactNode;
  description: string;
  image: string;
  benefits: string[];
  whatsappLink: string;
}

const ROLES: RoleData[] = [
  {
    id: "creator",
    title: "Creator / Seller",
    icon: <BookOpen className="w-6 h-6 text-purple-400" />,
    description: "Write and sell summarized books or full courses, and pay token to promote them.",
    image: "/contributor.png",
    benefits: ["Sell digital books & summarized topics", "Boost search ranks by paying minor promo tokens", "Access professional cover designers directly"],
    whatsappLink: "https://chat.whatsapp.com/F5J8Ev3hNKCB8r0s46PknO?mode=hqctswa"
  },
  {
    id: "affiliate",
    title: "Affiliate Promoter",
    icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
    description: "Promote creator books and courses to earn high-margin commission splits.",
    image: "/verifier.png",
    benefits: ["Promote e-books, summaries, and live classes", "Earn recurring commission on student registrations", "Real-time tracking of clicks, sales, and payouts"],
    whatsappLink: "https://chat.whatsapp.com/Jxa7snbLjAbF5d7UxXF61U?mode=gi_t"
  },
  {
    id: "designer",
    title: "Book Cover Designer",
    icon: <Palette className="w-6 h-6 text-pink-400" />,
    description: "Offer freelance graphic design services for premium book covers to creators.",
    image: "/designer.png",
    benefits: ["Showcase cover portfolio to all creators", "Charge custom rates starting from ₦500+", "Direct creator hiring pipeline & quick payouts"],
    whatsappLink: "https://chat.whatsapp.com/Jxa7snbLjAbF5d7UxXF61U?mode=gi_t"
  },
  {
    id: "customer",
    title: "Customer / Student",
    icon: <GraduationCap className="w-6 h-6 text-cyan-400" />,
    description: "Access summarized reading material and enroll in interactive live classes.",
    image: "/student.png",
    benefits: ["Browse books and simplified topic summaries", "Register for online live classes (Zoom & Google Meet)", "Refund protection for flagged materials"],
    whatsappLink: "https://chat.whatsapp.com/K0sgrx7oCId03e0jzoSuOh?mode=gi_t"
  }
];


export default function WaitlistPage() {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedRole) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          role: selectedRole,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to join waitlist");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Error joining waitlist:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden flex flex-col">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Navigation */}
      <nav className="w-full px-6 py-6 md:px-12 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            <Image src="/logo.png" alt="Fero E-Library Logo" fill className="object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Fero<span className="text-cyan-400">E-Library</span></span>
        </div>
        <div>
          <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Contact Us
          </button>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pb-24 z-10 flex flex-col items-center pt-8 md:pt-16">

        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Beta Opening September 2026
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              The Ultimate Digital <br className="hidden md:block" />
              <span className="text-gradient">E-Library Marketplace</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Summarized books, interactive live classes, and freelance cover design. Join the waitlist in your category to claim early access.
            </p>
          </motion.div>
        </div>

        {/* Action Section */}
        <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left Column: Form & Selection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-xl mx-auto lg:mx-0"
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-card rounded-3xl p-8 shadow-2xl shadow-indigo-900/20"
                >
                  <h2 className="text-2xl font-bold mb-2">Claim your early access</h2>
                  <p className="text-sm text-slate-400 mb-8">Select your role to get the right onboarding experience.</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      {ROLES.map((role) => (
                        <div
                          key={role.id}
                          className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer overflow-hidden ${selectedRole === role.id
                              ? 'border-indigo-500 bg-indigo-500/10'
                              : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-800/80'
                            }`}
                          onClick={() => setSelectedRole(role.id)}
                        >
                          {selectedRole === role.id && (
                            <div className="absolute top-0 right-0 p-4">
                              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                            </div>
                          )}
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${selectedRole === role.id ? 'bg-indigo-500/20' : 'glass'}`}>
                              {role.icon}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-white mb-1">{role.title}</h3>
                              <p className="text-xs text-slate-400 pr-8 leading-relaxed">{role.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-300">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="you@university.edu"
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!selectedRole || !email || isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl px-4 py-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]"
                    >
                      {isSubmitting ? (
                        <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      ) : (
                        <>
                          Join the Waitlist <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card rounded-3xl p-10 text-center flex flex-col items-center justify-center shadow-2xl shadow-indigo-900/40 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />

                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                  </div>

                  <h2 className="text-3xl font-extrabold mb-4">You're on the list!</h2>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    Thank you for joining as a <span className="text-white font-bold capitalize">{selectedRole}</span>. We will notify you when the private beta opens.
                  </p>

                  <div className="w-full p-6 rounded-2xl bg-indigo-950/50 border border-indigo-500/30 mb-8">
                    <h3 className="font-bold text-indigo-300 flex items-center justify-center gap-2 mb-3">
                      <Users className="w-4 h-4" /> Join Your Community
                    </h3>
                    <p className="text-xs text-indigo-200/70 mb-4">
                      Connect with other {selectedRole}s in our exclusive WhatsApp group.
                    </p>
                    <a
                      href={ROLES.find(r => r.id === selectedRole)?.whatsappLink || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center w-full bg-[#25D366] hover:bg-[#20BE5C] text-white font-bold rounded-xl px-4 py-3 transition-colors shadow-lg shadow-[#25D366]/20"
                    >
                      Join WhatsApp Group <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>

                  <button
                    onClick={() => { setIsSuccess(false); setSelectedRole(null); setEmail(""); }}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    Submit another response
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Visuals & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative hidden lg:flex items-center justify-center h-full min-h-[600px]"
          >
            <AnimatePresence mode="wait">
              {selectedRole ? (
                <motion.div
                  key={selectedRole}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <div className="relative w-full max-w-sm aspect-square mb-8">
                    <Image
                      src={ROLES.find(r => r.id === selectedRole)?.image || "/hero.png"}
                      alt={`${selectedRole} avatar`}
                      fill
                      className="object-contain drop-shadow-[0_0_30px_rgba(79,70,229,0.4)]"
                    />
                  </div>
                  <div className="w-full max-w-sm glass-card rounded-2xl p-6 border-indigo-500/20">
                    <h4 className="font-bold text-lg mb-4 text-white">Your Benefits</h4>
                    <ul className="space-y-3">
                      {ROLES.find(r => r.id === selectedRole)?.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-1 min-w-4">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                          </div>
                          <span className="text-sm text-slate-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative w-full max-w-lg aspect-square">
                    <Image
                      src="/hero.png"
                      alt="Fero E-Library Hero"
                      fill
                      className="object-contain drop-shadow-[0_0_50px_rgba(79,70,229,0.3)] animate-float"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-slate-600 border-t border-slate-800/50 mt-auto z-10 px-6">
        <p className="text-xs">© {new Date().getFullYear()} Fero E-Library by CloudSpark Digital. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4 text-xs font-semibold">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Contact</a>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
