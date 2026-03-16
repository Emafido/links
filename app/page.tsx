"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Link as LinkIcon, QrCode, Plus, Trash2, Copy, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const getIcon = (url: string) => {
  if (url.includes("github.com")) return <Github size={20} />;
  if (url.includes("twitter.com") || url.includes("x.com")) return <Twitter size={20} />;
  if (url.includes("linkedin.com")) return <Linkedin size={20} />;
  return <LinkIcon size={20} />;
};

export default function LinkBuilder() {
  const [isViewing, setIsViewing] = useState(false);
  const [profile, setProfile] = useState({ name: "", links: [{ title: "", url: "" }] });
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if we are viewing a generated profile via the URL parameter
    const params = new URLSearchParams(window.location.search);
    const data = params.get("d");
    if (data) {
      try {
        setProfile(JSON.parse(atob(data)));
        setIsViewing(true);
      } catch (e) {
        console.error("Invalid data in URL");
      }
    }
  }, []);

  useEffect(() => {
    // Generate the shareable URL whenever the profile changes
    if (typeof window !== "undefined" && profile.name) {
      const encoded = btoa(JSON.stringify(profile));
      setShareUrl(`${window.location.origin}?d=${encoded}`);
    } else {
      setShareUrl("");
    }
  }, [profile]);

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
    } catch (err) {
      console.error("Failed to copy URL");
    }
  };

  // --- VIEW MODE: What users see when they scan the QR or click the link ---
  if (isViewing) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-sans text-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md flex flex-col items-center"
        >
          <motion.h1 
            initial={{ y: -20 }} animate={{ y: 0 }} 
            className="text-4xl font-extrabold tracking-tight mb-8 text-[#ccff00]"
          >
            {profile.name}
          </motion.h1>
          
          <div className="w-full space-y-4">
            {profile.links.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4, boxShadow: "4px 4px 0px 0px #ccff00" }}
                whileTap={{ scale: 0.98, y: 0, boxShadow: "0px 0px 0px 0px #ccff00" }}
                className="flex items-center justify-between w-full bg-[#1a1a1a] border-2 border-[#333] p-4 rounded-xl font-bold transition-colors hover:border-[#ccff00]"
              >
                <span className="flex items-center gap-3">
                  {getIcon(link.url)} {link.title}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </main>
    );
  }

  // --- EDIT MODE: Where the user builds their profile ---
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 flex flex-col md:flex-row gap-12 justify-center items-start pt-20">
      
      {/* Editor Form */}
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-3xl font-black text-[#ccff00] mb-2">Build Your Hub</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full bg-[#1a1a1a] border-2 border-[#333] rounded-xl p-4 font-bold focus:outline-none focus:border-[#ccff00] transition-colors"
          />
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

      {/* Output / QR Code & Actions */}
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