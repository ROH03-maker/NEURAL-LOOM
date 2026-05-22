import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sound } from "./SoundEngine";
import { Mail, Github, Linkedin, Instagram, Send, CheckCircle2, ShieldCheck, Terminal, RefreshCw } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "creative_design_collaboration",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.triggerWarp();
    setIsSubmitting(true);

    // Simulate cryptographic dispatch protocol
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      sound.triggerSuccessPulse();
      
      // Clear after visual delay
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: "",
          email: "",
          subject: "creative_design_collaboration",
          message: ""
        });
      }, 5000);
    }, 2200);
  };

  const handleSocialClick = () => {
    sound.triggerInteractionClick();
  };

  const socialLinks = [
    { 
      name: "Email", 
      icon: <Mail size={16} />, 
      href: "mailto:rohitsarkarwork03@gmail.com", 
      detail: "rohitsarkarwork03@gmail.com", 
      hoverBoxClass: "hover:border-red-500/20 hover:bg-gradient-to-r hover:from-rose-500/[0.04] hover:via-emerald-500/[0.04] hover:via-blue-500/[0.04] hover:via-yellow-500/[0.04] hover:to-white/[0.04] hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]",
      hoverIconClass: "group-hover:text-white group-hover:border-red-500 group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:via-green-500 group-hover:via-blue-500 group-hover:via-yellow-500 group-hover:to-white",
      hoverTextClass: "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-400 group-hover:via-emerald-300 group-hover:via-blue-400 group-hover:via-yellow-300 group-hover:to-white font-bold"
    },
    { 
      name: "WhatsApp", 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ), 
      href: "https://wa.me/918927598500", 
      detail: "+91 8927598500", 
      hoverBoxClass: "hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]",
      hoverIconClass: "group-hover:text-white group-hover:bg-emerald-500 group-hover:border-emerald-400",
      hoverTextClass: "group-hover:text-emerald-400"
    },
    { 
      name: "Instagram", 
      icon: <Instagram size={16} />, 
      href: "https://www.instagram.com/rrrohittt_3", 
      detail: "@rrrohittt_3", 
      hoverBoxClass: "hover:border-pink-500/30 hover:bg-gradient-to-r hover:from-rose-600/10 hover:to-pink-500/10 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]",
      hoverIconClass: "group-hover:text-white group-hover:bg-gradient-to-tr group-hover:from-rose-600 group-hover:to-pink-500 group-hover:border-rose-400",
      hoverTextClass: "group-hover:text-pink-400"
    },
    { 
      name: "GitHub", 
      icon: <Github size={16} />, 
      href: "https://github.com/roh03-maker", 
      detail: "github.com/roh03-maker", 
      hoverBoxClass: "hover:border-white/30 hover:bg-white/5 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
      hoverIconClass: "group-hover:text-black group-hover:bg-white group-hover:border-white",
      hoverTextClass: "group-hover:text-white"
    },
    { 
      name: "LinkedIn", 
      icon: <Linkedin size={16} />, 
      href: "https://www.linkedin.com/in/rohit-sarkar-3a91423b8", 
      detail: "linkedin.com/in/rohit-sarkar-3a91423b8", 
      hoverBoxClass: "hover:border-neon-cyan/30 hover:bg-[#06b6d4]/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]",
      hoverIconClass: "group-hover:text-black group-hover:bg-neon-cyan group-hover:border-neon-cyan",
      hoverTextClass: "group-hover:text-neon-cyan"
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-space-black grid-lines">
      {/* Dynamic ambient pulse */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Title Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-neon-cyan">SECURE DISPATCH TERMINAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase">
            Interconnect
          </h2>
          <p className="mt-4 text-sm text-gray-400 max-w-xl mx-auto font-sans">
            Transmit custom semantic project intents or establish strategic links with our digital creative lab.
          </p>
        </div>

        {/* Form Container Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Column A: Contact Info & Link Nodes (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-white/5 bg-cyber-dark/65 backdrop-blur-md relative overflow-hidden">
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <ShieldCheck size={16} className="text-neon-cyan animate-pulse" />
                <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">
                  Secure Identity nodes
                </span>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed font-sans mb-8">
                Neural-Loom represents an exclusive digital guild focusing on cinematic and interactive design logic. Initiate contact via email or through encrypted instant messenger nodes.
              </p>

              {/* Dynamic list nodes */}
              <div className="flex flex-col gap-4">
                {socialLinks.map((node, nIdx) => (
                  <motion.a
                    key={node.name}
                    href={node.href}
                    onClick={handleSocialClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 6 }}
                    onMouseEnter={() => sound.triggerHover()}
                    className={`flex items-center gap-4 p-4 border border-white/5 bg-white/[0.01] rounded-xl transition-all duration-300 group ${node.hoverBoxClass}`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 ${node.hoverIconClass}`}>
                      {node.icon}
                    </div>
                    <div>
                      {node.name === "Email" ? (
                        <span className={`text-white text-xs font-mono tracking-wide block select-all lowercase transition-all duration-300 ${node.hoverTextClass}`}>
                          {node.detail}
                        </span>
                      ) : (
                        <>
                          <span className={`text-white text-xs font-display font-bold tracking-widest block uppercase transition-all duration-300 ${node.hoverTextClass}`}>
                            {node.name} Node
                          </span>
                          <span className="text-[9px] font-mono text-gray-500 uppercase block select-all group-hover:text-white/50 transition-all duration-300">
                            {node.detail}
                          </span>
                        </>
                      )}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Bottom active certificate socket */}
            <div className="mt-8 border-t border-white/5 pt-4 text-[9px] font-mono text-gray-500 flex justify-between items-center">
              <span>CERTIFICATE: SSL_AES_256</span>
              <span className="flex items-center gap-1"><Terminal size={10} /> 200_OK</span>
            </div>
          </div>

          {/* Column B: Encryption Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 relative h-full">
              
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  /* Success Screen Overlay */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-2xl rounded-2xl flex flex-col items-center justify-center p-8 text-center z-20"
                  >
                    <CheckCircle2 size={48} className="text-green-400 mb-4 animate-bounce" />
                    <h3 className="text-lg font-display font-black text-white uppercase tracking-widest">
                      Transmission Dispatched
                    </h3>
                    <p className="text-[10px] font-mono text-neon-cyan mt-1 uppercase tracking-widest">
                      Encrypted Package ID: NL-{(Math.random() * 100000).toFixed(0)}
                    </p>
                    <p className="text-xs text-gray-400 mt-4 max-w-xs leading-relaxed">
                      Your semantic query has been coupled securely into the Neural-Loom vector registry. The system will sync responses within 2.4 cycles.
                    </p>
                    <div className="w-[150px] bg-white/5 h-1 rounded-full mt-8 overflow-hidden">
                      <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="h-full bg-neon-cyan w-1/3"
                      />
                    </div>
                  </motion.div>
                ) : (
                  /* Form */
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    
                    {/* Top subheader metadata */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 pb-2 border-b border-white/5">
                      <span>FORM_SECURE_SYNC_v19</span>
                      <span>* ALL FIELD INPUT CODES MANDATORY</span>
                    </div>

                    {/* Form Layout Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-[9px] font-mono text-gray-400 uppercase mb-1.5 tracking-wider">
                          Identity Code (Name)
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. CORE ENGINEER"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-space-black border border-white/5 hover:border-white/10 focus:border-neon-cyan focus:outline-none rounded-xl p-3.5 text-xs text-white uppercase font-mono tracking-wide placeholder-gray-600 transition-all"
                        />
                      </div>

                      {/* Email input */}
                      <div>
                        <label className="block text-[9px] font-mono text-gray-400 uppercase mb-1.5 tracking-wider">
                          Synchronize Address (Email)
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="e.g. USER@DOMAIN.COM"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-space-black border border-white/5 hover:border-white/10 focus:border-neon-cyan focus:outline-none rounded-xl p-3.5 text-xs text-white font-mono placeholder-gray-600 transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject input selectors */}
                    <div>
                      <label className="block text-[9px] font-mono text-gray-400 uppercase mb-1.5 tracking-wider">
                        Transmission Intent
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full bg-space-black border border-white/5 hover:border-white/10 focus:border-neon-cyan focus:outline-none rounded-xl p-3.5 text-xs text-white uppercase font-mono tracking-wide transition-all"
                      >
                        <option value="creative_design_collaboration">Creative Design & Artistry Dev</option>
                        <option value="machine_learning_ai_integration">Cognitive AI Core Integration</option>
                        <option value="futuristic_operative_dashboard">Operative Dashboard Specs</option>
                        <option value="general_technical_query">General Laboratory Inquest</option>
                      </select>
                    </div>

                    {/* Message body input */}
                    <div>
                      <label className="block text-[9px] font-mono text-gray-400 uppercase mb-1.5 tracking-wider">
                        Semantic Message Packet
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="INPUT DETAILED PROJECT INTENT PACKAGE CODES OR COLLABORATION DISPATCH OUTLINE HERE..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-space-black border border-white/5 hover:border-white/10 focus:border-neon-cyan focus:outline-none rounded-xl p-3.5 text-xs text-white font-mono placeholder-gray-600 transition-all uppercase leading-relaxed resize-none"
                      />
                    </div>

                    {/* Trigger Button dispatcher */}
                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={() => sound.triggerInteractionClick()}
                        className="w-full py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-xs font-display font-extrabold text-white uppercase tracking-widest rounded-xl shadow-lg border border-white/10 shadow-neon-blue/20 hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw size={13} className="animate-spin text-white" />
                            <span>ENCRYPTING_DISPATCH_PROTOCOL...</span>
                          </>
                        ) : (
                          <>
                            <Send size={13} />
                            <span>TRANSMIT ENCRYPTED QUERY</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
