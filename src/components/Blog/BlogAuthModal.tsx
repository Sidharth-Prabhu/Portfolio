import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, KeyRound, Server, CheckCircle2, AlertCircle, X, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { verifyPin, getStoredPin, getApiBaseUrl, setApiBaseUrl, checkBackendHealth } from '../../services/blogApi';

interface BlogAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (pin: string) => void;
}

export const BlogAuthModal: React.FC<BlogAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  // Server settings toggle
  const [showServerConfig, setShowServerConfig] = useState(false);
  const [apiUrl, setApiUrl] = useState('');
  const [healthStatus, setHealthStatus] = useState<{ checked: boolean; online: boolean; message: string }>({
    checked: false,
    online: false,
    message: '',
  });
  const [checkingHealth, setCheckingHealth] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setApiUrl(getApiBaseUrl());
      setError(null);
      // Auto-fill stored pin if already in session
      const stored = getStoredPin();
      if (stored && /^\d{6}$/.test(stored)) {
        setDigits(stored.split(''));
      } else {
        setDigits(['', '', '', '', '', '']);
      }
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
      runHealthCheck();
    }
  }, [isOpen]);

  const runHealthCheck = async () => {
    setCheckingHealth(true);
    const res = await checkBackendHealth();
    setCheckingHealth(false);
    setHealthStatus({
      checked: true,
      online: res.online,
      message: res.online
        ? `Server Online (${res.postCount ?? 0} posts loaded)`
        : `Blog server is currently down: ${res.detail || 'Connection refused'}`,
    });
  };

  const handleSaveApiUrl = async () => {
    setApiBaseUrl(apiUrl);
    await runHealthCheck();
  };

  const handleChange = (index: number, val: string) => {
    setError(null);
    // Allow only numeric input
    const clean = val.replace(/\D/g, '');
    if (!clean) {
      const next = [...digits];
      next[index] = '';
      setDigits(next);
      return;
    }

    // Single digit or paste
    if (clean.length === 1) {
      const next = [...digits];
      next[index] = clean;
      setDigits(next);
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
      // If 6th digit filled, auto submit
      if (index === 5 && next.every(d => d !== '')) {
        handleSubmitPin(next.join(''));
      }
    } else if (clean.length === 6) {
      const splitted = clean.split('');
      setDigits(splitted);
      inputRefs.current[5]?.focus();
      handleSubmitPin(clean);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') {
      const fullPin = digits.join('');
      if (fullPin.length === 6) {
        handleSubmitPin(fullPin);
      }
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(''));
      inputRefs.current[5]?.focus();
      handleSubmitPin(pasted);
    }
  };

  const handleSubmitPin = async (pinToVerify?: string) => {
    const fullPin = pinToVerify || digits.join('');
    if (fullPin.length !== 6) {
      setError('Please enter all 6 digits');
      triggerShake();
      return;
    }

    setLoading(true);
    setError(null);

    const valid = await verifyPin(fullPin);
    setLoading(false);

    if (valid) {
      onSuccess(fullPin);
      onClose();
    } else {
      setError('Invalid security key. Please check and try again.');
      triggerShake();
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className={`relative w-full max-w-md bg-surface border-2 border-primary/20 rounded-3xl p-7 md:p-8 shadow-2xl text-text-main overflow-hidden ${
            shake ? 'animate-shake' : ''
          }`}
          style={{
            animation: shake ? 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both' : 'none',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-text-main/10 transition-colors text-text-muted hover:text-text-main"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center text-center space-y-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <Lock size={26} />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-accent">
                AUTHENTICATION
              </p>
              <h3 className="text-2xl font-black uppercase tracking-tight text-text-main mt-1">
                Security Key
              </h3>
            </div>
            <p className="text-xs text-text-muted max-w-xs leading-relaxed">
              Enter your 6-digit security key to manage and publish blog posts.
            </p>
          </div>

          {/* 6 Digit Inputs */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-center gap-2.5 sm:gap-3" onPaste={handlePaste}>
              {digits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type={showPin ? 'text' : 'password'}
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  disabled={loading}
                  className="w-11 h-14 sm:w-12 sm:h-16 text-center text-2xl font-mono font-black rounded-xl border-2 border-text-main/20 bg-background text-text-main focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all select-none"
                />
              ))}
            </div>

            <div className="flex justify-between items-center px-1 text-xs text-text-muted">
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="flex items-center gap-1.5 hover:text-text-main transition-colors font-mono text-[11px]"
              >
                {showPin ? <EyeOff size={13} /> : <Eye size={13} />}
                <span>{showPin ? 'Hide PIN' : 'Show PIN'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowServerConfig(!showServerConfig)}
                className="flex items-center gap-1.5 text-accent hover:underline font-mono text-[11px]"
              >
                <Server size={13} />
                <span>Server Settings</span>
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-xs font-mono text-red-500 bg-red-500/10 border border-red-500/20 py-2 px-3 rounded-lg"
              >
                <AlertCircle size={14} />
                <span>{error}</span>
              </motion.div>
            )}
          </div>

          {/* Server Settings Drawer */}
          <AnimatePresence>
            {showServerConfig && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6 pt-3 border-t border-text-main/10"
              >
                <div className="space-y-3 p-3 bg-background/50 rounded-xl border border-text-main/10">
                  <div className="flex justify-between items-center text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                    <span>Server Endpoint</span>
                    <button
                      onClick={runHealthCheck}
                      disabled={checkingHealth}
                      className="flex items-center gap-1 text-[10px] text-accent hover:opacity-80 disabled:opacity-50"
                    >
                      <RefreshCw size={10} className={checkingHealth ? 'animate-spin' : ''} />
                      <span>Ping</span>
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={apiUrl}
                      onChange={(e) => setApiUrl(e.target.value)}
                      placeholder="http://192.168.1.50:8000"
                      className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-text-main/20 bg-surface text-text-main focus:outline-none focus:border-accent"
                    />
                    <button
                      onClick={handleSaveApiUrl}
                      className="px-3 py-2 text-xs font-mono font-bold bg-accent text-black rounded-lg hover:opacity-90"
                    >
                      Save
                    </button>
                  </div>

                  {healthStatus.checked && (
                    <div
                      className={`text-[11px] font-mono flex items-center gap-1.5 ${
                        healthStatus.online ? 'text-green-500' : 'text-amber-500'
                      }`}
                    >
                      {healthStatus.online ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                      <span className="truncate">{healthStatus.message}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-text-main/20 text-xs font-mono font-bold uppercase tracking-wider hover:bg-text-main/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSubmitPin()}
              disabled={loading || digits.some((d) => d === '')}
              className="flex-1 py-3 px-4 rounded-xl bg-text-main text-background text-xs font-mono font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <KeyRound size={14} />
                  <span>Unlock</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default BlogAuthModal;
