import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Globe, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const payload = {
      ...formData,
      access_key: '6fd58bc2-7c19-4d56-ad83-772ae074d39d',
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Failed to connect to the server. Please check your internet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: <Mail size={24} />, label: "Email", href: "mailto:mailtosidharth.me@gmail.com" },
    { icon: <Github size={24} />, label: "GitHub", href: "https://github.com/Sidharth-Prabhu" },
    { icon: <Linkedin size={24} />, label: "LinkedIn", href: "https://linkedin.com/in/sidharth-prabhu" }
  ];

  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="text-[13px] font-black tracking-[0.4em] text-accent uppercase">
                GET IN TOUCH
              </p>
              <h2 className="text-7xl md:text-[8rem] font-black leading-none tracking-tighter uppercase whitespace-pre-line text-text-main">
                LET'S<br />WORK<br />TOGETHER
              </h2>
              <p className="text-xl md:text-2xl font-medium opacity-60 max-w-sm leading-relaxed italic text-text-muted">
                I'm always open to new opportunities, collaborations, or just a friendly chat about tech.
              </p>
            </motion.div>

            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 rounded-full border-2 border-text-main/10 flex items-center justify-center hover:bg-text-main hover:text-background transition-all"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Content / Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-surface asym-rounded p-10 md:p-20 shadow-2xl border-2 border-primary relative overflow-hidden"
          >
            {submitted ? (
              <div className="text-center py-20 space-y-10 relative z-10">
                <div className="w-24 h-24 bg-accent text-background rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <Send size={40} />
                </div>
                <h3 className="text-5xl font-black uppercase tracking-tighter text-text-main">MESSAGE SENT!</h3>
                <p className="text-xl font-medium opacity-60 text-text-muted">Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-12 py-5 bg-text-main text-background font-black uppercase tracking-widest text-sm asym-rounded hover:scale-105 transition-all"
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40 ml-1 text-text-main">YOUR NAME</label>
                    <input
                      required
                      type="text"
                      placeholder="JOHN DOE"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-text-main/20 focus:border-accent transition-all text-3xl font-black uppercase outline-none py-4 placeholder:opacity-10 text-text-main"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40 ml-1 text-text-main">YOUR EMAIL</label>
                    <input
                      required
                      type="email"
                      placeholder="JOHN@EXAMPLE.COM"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-text-main/20 focus:border-accent transition-all text-3xl font-black uppercase outline-none py-4 placeholder:opacity-10 text-text-main"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40 ml-1 text-text-main">YOUR MESSAGE</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="LET'S BUILD SOMETHING..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-text-main/20 focus:border-accent transition-all text-3xl font-black uppercase outline-none py-4 resize-none placeholder:opacity-10 text-text-main"
                  ></textarea>
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-xs font-black text-center uppercase tracking-widest">{errorMessage}</p>
                )}
                <div className="pt-10">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="group w-full h-24 bg-text-main text-background asym-rounded font-black text-2xl tracking-tighter uppercase transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-between px-12 disabled:opacity-50 border-2 border-primary"
                  >
                    <span>{isSubmitting ? "SENDING..." : "CONNECT NOW"}</span>
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-background group-hover:rotate-45 transition-transform">
                        <ArrowUpRight size={28} />
                    </div>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
