import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Globe } from 'lucide-react';

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
    { icon: <Mail size={24} />, label: "Email", value: "mailtosidharth.me@gmail.com", href: "mailto:mailtosidharth.me@gmail.com" },
    { icon: <Github size={24} />, label: "GitHub", value: "Sidharth-Prabhu", href: "https://github.com/Sidharth-Prabhu" },
    { icon: <Linkedin size={24} />, label: "LinkedIn", value: "sidharth-prabhu", href: "https://linkedin.com/in/sidharth-prabhu" },
    { icon: <Globe size={24} />, label: "Website", value: "sidharthprabhu.co.in", href: "https://sidharthprabhu.co.in" }
  ];

  return (
    <section id="contact" className="py-24 px-4 bg-black/5 dark:bg-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-20 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-primary after:mt-4 after:mx-auto"
        >
          Get In <span className="text-primary dark:text-dark-primary">Touch</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12 order-2 lg:order-1"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-extrabold">Let's build something <span className="text-primary dark:text-dark-primary italic">great</span>.</h3>
              <p className="text-xl opacity-70 leading-relaxed max-w-lg">
                I'm always open to new opportunities, collaborations, or just a friendly chat about technology and innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.02, x: 5 }}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-6 rounded-3xl flex items-center gap-6 border border-black/5 dark:border-white/5 hover:bg-primary/5 transition-all group shadow-sm hover:shadow-md overflow-hidden break-words"
                >
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {link.icon}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold opacity-50 uppercase tracking-widest mb-1 truncate">{link.label}</p>
                    <p className="font-semibold text-lg break-all">{link.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 md:p-14 rounded-[3rem] border border-black/5 dark:border-white/5 shadow-2xl relative z-10 overflow-hidden order-1 lg:order-2"
          >
            <div className="absolute top-0 right-0 p-24 bg-primary/5 rounded-bl-[200px] -z-0" />
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 space-y-6 relative z-10"
              >
                <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-green-500/10">
                  <Send size={48} />
                </div>
                <h3 className="text-3xl font-extrabold">Message Sent!</h3>
                <p className="text-xl opacity-70">Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-10 py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-95 mt-10"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="space-y-3">
                  <label className="text-sm font-extrabold opacity-60 uppercase tracking-widest ml-1">Your Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-8 py-5 rounded-2xl glass border border-black/10 dark:border-white/10 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all text-lg font-medium outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-extrabold opacity-60 uppercase tracking-widest ml-1">Your Email</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-8 py-5 rounded-2xl glass border border-black/10 dark:border-white/10 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all text-lg font-medium outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-extrabold opacity-60 uppercase tracking-widest ml-1">Your Message</label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Hi Sidharth, I'd like to talk about..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-8 py-5 rounded-2xl glass border border-black/10 dark:border-white/10 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all text-lg font-medium outline-none resize-none"
                  ></textarea>
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-sm font-bold text-center">{errorMessage}</p>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 rounded-2xl bg-primary text-white font-extrabold text-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 disabled:opacity-50 transition-all flex items-center justify-center gap-4"
                >
                  {isSubmitting ? "Sending..." : (
                    <>
                      Send Message
                      <Send size={24} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
