"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Link as LinkIcon, QrCode, Plus, Trash2, Copy, Check, Zap } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { track } from "@vercel/analytics";

const getIcon = (url: string) => {
  if (url.includes("github.com")) return <Github size={24} />;
  if (url.includes("twitter.com") || url.includes("x.com")) return <Twitter size={24} />;
  if (url.includes("linkedin.com")) return <Linkedin size={24} />;
  return <LinkIcon size={24} />;
};

const getDomain = (url: string) => {
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    const path = new URL(url).pathname !== '/' ? new URL(url).pathname : '';
    return domain + path;
  } catch {
    return url;
  }
};

export default function LinkBuilder() {
  const [isViewing, setIsViewing] = useState(false);
  const [profile, setProfile] = useState({ name: "", bio: "", links: [{ title: "", url: "" }] });
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" && profile.name
    ? `${window.location.origin}?d=${btoa(JSON.stringify(profile))}`
    : "";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("d");
    if (data) {
      // Defer state update to bypass the synchronous setState warning
      setTimeout(() => {
        try {
          setProfile(JSON.parse(atob(data)));
          setIsViewing(true);
        } catch {
          console.error("Invalid data in URL");
        }
      }, 0);
    }
  }, []);

  const addLink = () => setProfile({ ...profile, links: [...profile.links, { title: "", url: "" }] });
  
  const updateLink = (index: number, field: "title" | "url", value: string) => {
    const newLinks = [...profile.links];
    newLinks[index][field] = value;
    setProfile({ ...profile, links: newLinks });
  };

  const removeLink = (index: number) => {
    setProfile({ ...profile, links: profile.links.filter((_, i) => i !== index) });
  };

  const copyToClipboard = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy URL");
    }
  };

  if (isViewing) {
    return (
      <main className="relative min-h-screen bg-[#0a0a0a] flex flex-col items-center pt-16 pb-8 px-4 sm:justify-center sm:py-6 font-sans text-white overflow-hidden">
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md flex flex-col items-center relative z-10"
        >
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 sm:w-24 sm:h-24 bg-[#ccff00] rounded-full flex items-center justify-center text-black text-3xl sm:text-4xl font-black mb-4 shadow-[0_0_40px_rgba(204,255,0,0.2)]"
          >
            {profile.name.charAt(0).toUpperCase()}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-3xl sm:text-4xl font-black tracking-tight mb-1 text-white text-center"
          >
            {profile.name}
          </motion.h1>

          {profile.bio && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-center mb-8 px-4 font-medium"
            >
              {profile.bio}
            </motion.p>
          )}
          
          <div className="w-full space-y-3 sm:space-y-4 mb-12">
            {profile.links.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("link_clicked", { url: link.url, title: link.title })}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.02, rotate: -1, boxShadow: "6px 6px 0px 0px #ccff00" }}
                whileTap={{ scale: 0.98, boxShadow: "0px 0px 0px 0px #ccff00" }}
                className="flex items-center gap-4 w-full bg-[#1a1a1a]/90 backdrop-blur-md border-2 border-[#333] p-3 sm:p-4 rounded-2xl font-bold transition-colors hover:border-[#ccff00] hover:bg-[#1a1a1a] group"
              >
                <div className="p-2 sm:p-3 bg-[#333] rounded-xl group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                  {getIcon(link.url)}
                </div>
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="text-base sm:text-lg text-white group-hover:text-[#ccff00] transition-colors truncate">{link.title}</span>
                  <span className="text-xs sm:text-sm text-gray-500 truncate mt-0.5">
                    {getDomain(link.url)}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.a
            href="/"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#ccff00] transition-colors font-bold"
          >
            <Zap size={16} /> Build your own hub
          </motion.a>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 flex flex-col md:flex-row gap-12 justify-center items-start pt-12 md:pt-20">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-3xl font-black text-[#ccff00] mb-6">Build Your Hub</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-[#1a1a1a] border-2 border-[#333] rounded-xl p-4 font-bold focus:outline-none focus:border-[#ccff00] transition-colors"
            />
            <textarea
              placeholder="Short Bio or Headline"
              value={profile.bio}
              maxLength={100}
              rows={2}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full bg-[#1a1a1a] border-2 border-[#333] rounded-xl p-4 font-bold focus:outline-none focus:border-[#ccff00] transition-colors resize-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          {profile.links.map((link, i) => (
            <motion.div layout key={i} className="flex gap-2">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  placeholder="Link Title (e.g., GitHub)"
                  value={link.title}
                  onChange={(e) => updateLink(i, "title", e.target.value)}
                  className="w-full bg-[#1a1a1a] border-2 border-[#333] rounded-lg p-3 focus:outline-none focus:border-[#ccff00]"
                />
                <input
                  type="url"
                  placeholder="URL (https://...)"
                  value={link.url}
                  onChange={(e) => updateLink(i, "url", e.target.value)}
                  className="w-full bg-[#1a1a1a] border-2 border-[#333] rounded-lg p-3 focus:outline-none focus:border-[#ccff00]"
                />
              </div>
              <button 
                onClick={() => removeLink(i)}
                className="bg-red-500/10 text-red-500 p-3 rounded-lg border-2 border-red-500/20 hover:bg-red-500 hover:text-black transition-colors"
              >
                <Trash2 size={24} />
              </button>
            </motion.div>
          ))}
          
          <button 
            onClick={addLink}
            className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] border-2 border-dashed border-[#555] p-4 rounded-xl font-bold hover:border-[#ccff00] hover:text-[#ccff00] transition-colors"
          >
            <Plus size={20} /> Add Another Link
          </button>
        </div>
      </div>

      <div className="w-full max-w-sm bg-[#1a1a1a] border-2 border-[#333] p-8 rounded-3xl flex flex-col items-center text-center sticky top-20">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <QrCode className="text-[#ccff00]" /> Your QR Code
        </h3>
        
        <div className="bg-white p-4 rounded-xl mb-6">
          <QRCodeSVG value={shareUrl || "https://localhost:3000"} size={200} />
        </div>

        <div className="w-full space-y-3">
          <button 
            onClick={copyToClipboard}
            disabled={!shareUrl}
            className="w-full flex items-center justify-center gap-2 bg-[#333] text-white font-bold py-4 rounded-xl hover:bg-[#444] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copied ? <Check size={20} className="text-[#ccff00]" /> : <Copy size={20} />}
            {copied ? "Copied to Clipboard!" : "Copy URL"}
          </button>

          <a 
            href={shareUrl || "#"} 
            target={shareUrl ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={`block w-full text-black font-black py-4 rounded-xl transition-transform ${
              shareUrl ? "bg-[#ccff00] hover:bg-[#e6ff66] active:scale-95" : "bg-[#ccff00]/50 cursor-not-allowed"
            }`}
          >
            Test Live Page
          </a>
        </div>
      </div>
    </main>
  );
}