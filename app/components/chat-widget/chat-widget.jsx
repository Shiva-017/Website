import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from '@remix-run/react';
import { useHydrated } from '~/hooks/useHydrated';
import { NeuralBackground } from './neural-background';
import { SiriOrb } from './siri-orb';
import styles from './chat-widget.module.css';

const SUGGESTIONS = [
  'What AI projects has Shiva built?',
  'Show me his frontend skills',
  'Navigate to the skills section',
  'Tell me about Mail Master',
  'How can I contact Shiva?',
];

export const ChatWidget = () => {
  const isHydrated = useHydrated();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Shiva's WebMCP-powered portfolio agent. I use structured tools to look up real data — projects, skills, experience — just like a browser AI agent would. Try asking me something!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
      setHasNewMessage(false);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text) => {
    const msgText = text || input.trim();
    if (!msgText || loading) return;

    setMessages(prev => [...prev, { role: 'user', content: msgText }]);
    setInput('');
    setLoading(true);

    try {
      const history = messages
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch('/api/webmcp-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msgText, history }),
      });

      const data = await response.json();

      if (data.navigateRoute) {
        navigate(data.navigateRoute);
      } else if (data.navigate) {
        const el = document.getElementById(data.navigate)
          || document.querySelector(`[id*="${data.navigate}"]`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate(`/#${data.navigate}`);
          setTimeout(() => {
            const target = document.getElementById(data.navigate)
              || document.querySelector(`[id*="${data.navigate}"]`);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }, 500);
        }
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.answer || "Sorry, I couldn't process that.",
        toolsUsed: data.toolsUsed || [],
        source: data.source,
      }]);

      if (!isOpen) setHasNewMessage(true);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again.', toolsUsed: [] },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [input, loading, messages, isOpen, navigate]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  if (!isHydrated) return null;

  return (
    <div className={styles.widget}>
      {/* ─── Chat Panel ─────────────────────────────────────────── */}
      <div className={styles.panel} data-open={isOpen}>
        {isOpen && <NeuralBackground isActive={loading} className={styles.neuralBg} />}

        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerDot} />
            <span className={styles.headerTitle}>WebMCP Agent</span>
          </div>
          <button className={styles.closeButton} onClick={() => setIsOpen(false)} aria-label="Close chat">
            ✕
          </button>
        </div>

        <div className={styles.messages}>
          {messages.map((msg, i) => (
            <div key={i} className={styles.message} data-role={msg.role}>
              <div className={styles.bubble} data-role={msg.role}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className={styles.message} data-role="assistant">
              <div className={styles.bubble} data-role="assistant">
                <span className={styles.dots}><span /><span /><span /></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length <= 2 && (
          <div className={styles.suggestions}>
            {SUGGESTIONS.map((s, i) => (
              <button key={i} className={styles.chip} onClick={() => sendMessage(s)}>{s}</button>
            ))}
          </div>
        )}

        <div className={styles.inputArea}>
          <input
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Shiva..."
            disabled={loading}
            maxLength={500}
          />
          <button
            className={styles.sendBtn}
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>

        <div className={styles.footer}>
          Powered by <a href="/webmcp" className={styles.footerLink}>WebMCP tools</a> → GPT-4o-mini
        </div>
      </div>

      {/* ─── Siri Orb ───────────────────────────────────────────── */}
      <div className={styles.orbArea}>
        {!isOpen && (
          <div className={styles.orbLabel}>
            <span className={styles.orbLabelTitle}>MCP Agent</span>
            <span className={styles.orbLabelDesc}>Ask me anything</span>
          </div>
        )}
        <SiriOrb
          className={styles.orb}
          isActive={loading || hasNewMessage}
          onClick={() => setIsOpen(prev => !prev)}
          size={70}
        />
      </div>
    </div>
  );
};
