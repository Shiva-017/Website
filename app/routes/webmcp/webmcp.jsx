import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Button } from '~/components/button';
import { Transition } from '~/components/transition';
import { Footer } from '~/components/footer';
import { useTheme } from '~/components/theme-provider';
import { baseMeta } from '~/utils/meta';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  getRegisteredTools,
  getEventLog,
  onWebMCPEvent,
  registerWebMCPTools,
  TOOLS,
} from '~/utils/webmcp-tools';
import styles from './webmcp.module.css';

export const meta = () => {
  return baseMeta({
    title: 'WebMCP — AI Agent Tools',
    description:
      'Live WebMCP integration showcase. This portfolio exposes structured tools via the W3C WebMCP API for AI agents, browser assistants, and assistive technologies.',
  });
};

const SAMPLE_QUERIES = [
  { tool: 'ask_about_shiva', input: { question: 'What AI projects has Shiva built?' }, label: 'Ask about AI projects' },
  { tool: 'filter_projects', input: { criteria: 'cloud infrastructure devops' }, label: 'Filter cloud projects' },
  { tool: 'get_skills', input: { category: 'Cloud & DevOps' }, label: 'Get DevOps skills' },
  { tool: 'ask_about_shiva', input: { question: 'How can I contact Shiva?' }, label: 'Get contact info' },
  { tool: 'filter_projects', input: { criteria: 'machine learning deep learning AI' }, label: 'Find ML projects' },
  { tool: 'get_project_details', input: { projectId: 'mail-master' }, label: 'Mail Master details' },
];

const CHAT_SUGGESTIONS = [
  'What AI projects has Shiva built?',
  'What is his tech stack?',
  'Tell me about his cloud experience',
  'Does Shiva know MCP?',
  'How can I contact Shiva?',
  'What makes his portfolio special?',
];

export const WebMCPShowcase = () => {
  const [events, setEvents] = useState([]);
  const [tools] = useState(() => getRegisteredTools());
  const [selectedTool, setSelectedTool] = useState(null);
  const [queryInput, setQueryInput] = useState('');
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const logEndRef = useRef(null);
  const { theme } = useTheme();

  // Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm the AI assistant powering Shiva's portfolio. This conversation is powered by GPT-4o-mini via the WebMCP `ask_about_shiva` tool. Ask me anything about Shiva's projects, skills, or experience!",
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);
  const chatInputRef = useRef(null);

  useEffect(() => {
    registerWebMCPTools();
    setEvents(getEventLog());
    const unsubscribe = onWebMCPEvent((event) => {
      setEvents(prev => [...prev, event]);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [events]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // ─── Chat handler (calls Claude via /api/webmcp-chat) ───────────────
  const sendChatMessage = useCallback(async (messageText) => {
    const text = messageText || chatInput.trim();
    if (!text || chatLoading) return;

    const userMsg = { role: 'user', content: text };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setChatLoading(true);

    try {
      const history = chatMessages
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch('/api/webmcp-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, history }),
      });

      const data = await response.json();

      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.answer || 'Sorry, I could not process that question.',
          source: data.source,
        },
      ]);
    } catch (err) {
      setChatMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again.', source: 'error' },
      ]);
    } finally {
      setChatLoading(false);
      chatInputRef.current?.focus();
    }
  }, [chatInput, chatLoading, chatMessages]);

  const handleChatKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  // ─── Playground tool executor ───────────────────────────────────────
  const executeTool = useCallback(async (toolName, input) => {
    setIsRunning(true);
    setResult(null);
    try {
      const toolMap = window.__webmcpTools || {};
      const tool = toolMap[toolName] || TOOLS.find(t => t.name === toolName);
      if (!tool) {
        setResult({ error: `Tool "${toolName}" not found` });
        return;
      }
      const res = await tool.execute(input);
      setResult(res);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setIsRunning(false);
    }
  }, []);

  const handleSampleQuery = useCallback((sample) => {
    setSelectedTool(sample.tool);
    setQueryInput(JSON.stringify(sample.input, null, 2));
    executeTool(sample.tool, sample.input);
  }, [executeTool]);

  const handleCustomExecute = useCallback(() => {
    if (!selectedTool || !queryInput) return;
    try {
      const parsed = JSON.parse(queryInput);
      executeTool(selectedTool, parsed);
    } catch {
      setResult({ error: 'Invalid JSON input' });
    }
  }, [selectedTool, queryInput, executeTool]);

  const supportsNative = typeof navigator !== 'undefined' && !!navigator.modelContext;

  return (
    <div className={styles.page}>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <Section className={styles.hero}>
        <Transition in timeout={0}>
          {({ visible }) => (
            <div className={styles.heroContent}>
              <div className={styles.heroTag}>
                <span className={styles.tagDot} data-active={true} />
                <span className={styles.tagText}>
                  {supportsNative ? 'WebMCP Active — Native API' : 'WebMCP Active — Polyfill + Claude API'}
                </span>
              </div>
              <Heading className={styles.heroTitle} level={2} as="h1" data-visible={visible}>
                <DecoderText text="WebMCP Integration" start={visible} delay={300} />
              </Heading>
              <Text className={styles.heroDescription} size="l" as="p" data-visible={visible}>
                This portfolio is a live MCP server. It exposes{' '}
                <strong>{tools.length} structured tools</strong> via the{' '}
                <a
                  href="https://webmachinelearning.github.io/webmcp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.specLink}
                >
                  W3C WebMCP API
                </a>{' '}
                — powered by <strong>GPT-4o-mini</strong> for intelligent Q&A. AI agents, browser
                assistants, and assistive technologies can query projects, search skills, and
                interact with this site programmatically.
              </Text>
              <div className={styles.heroCta}>
                <Button href="https://github.com/webmachinelearning/webmcp" secondary iconHoverShift icon="github">
                  WebMCP Spec
                </Button>
                <Button href="#chat" iconHoverShift icon="arrow-right">
                  Chat with my portfolio
                </Button>
              </div>
            </div>
          )}
        </Transition>
      </Section>

      {/* ─── Architecture ─────────────────────────────────────────────── */}
      <Section className={styles.architecture}>
        <Heading className={styles.sectionTitle} level={3} as="h2">
          How it works
        </Heading>
        <div className={styles.flowDiagram}>
          <div className={styles.flowStep}>
            <div className={styles.flowIcon}>🌐</div>
            <div className={styles.flowLabel}>Portfolio loads</div>
            <div className={styles.flowDetail}>Remix SSR + React hydration</div>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.flowIcon}>⚙️</div>
            <div className={styles.flowLabel}>Tools registered</div>
            <div className={styles.flowDetail}>navigator.modelContext.provideContext()</div>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.flowIcon}>🤖</div>
            <div className={styles.flowLabel}>Agent calls tool</div>
            <div className={styles.flowDetail}>ask_about_shiva(question)</div>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.flowIcon}>🧠</div>
            <div className={styles.flowLabel}>Claude responds</div>
            <div className={styles.flowDetail}>Portfolio context + Claude Sonnet</div>
          </div>
        </div>
      </Section>

      {/* ─── Tab Switcher ─────────────────────────────────────────────── */}
      <Section className={styles.tabSection}>
        <div className={styles.tabs}>
          <button
            className={styles.tab}
            data-active={activeTab === 'chat'}
            onClick={() => setActiveTab('chat')}
          >
            💬 Chat with Portfolio
          </button>
          <button
            className={styles.tab}
            data-active={activeTab === 'tools'}
            onClick={() => setActiveTab('tools')}
          >
            🔧 Tool Explorer
          </button>
          <button
            className={styles.tab}
            data-active={activeTab === 'log'}
            onClick={() => setActiveTab('log')}
          >
            📋 Event Log
          </button>
        </div>
      </Section>

      {/* ─── Chat Panel ───────────────────────────────────────────────── */}
      {activeTab === 'chat' && (
        <Section className={styles.chatSection} id="chat">
          <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderLeft}>
                <span className={styles.chatDot} />
                <span>Portfolio AI — powered by GPT-4o-mini via WebMCP</span>
              </div>
              <span className={styles.chatBadge}>
                {chatMessages.length - 1} messages
              </span>
            </div>

            <div className={styles.chatMessages}>
              {chatMessages.map((msg, i) => (
                <div key={i} className={styles.chatMessage} data-role={msg.role}>
                  <div className={styles.chatBubble} data-role={msg.role}>
                    {msg.content}
                    {msg.source === 'gpt-4o-mini' && (
                      <span className={styles.chatSource}>via GPT-4o-mini</span>
                    )}
                    {msg.source === 'fallback' && (
                      <span className={styles.chatSource}>keyword match</span>
                    )}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className={styles.chatMessage} data-role="assistant">
                  <div className={styles.chatBubble} data-role="assistant">
                    <span className={styles.typingDots}>
                      <span>.</span><span>.</span><span>.</span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className={styles.chatSuggestions}>
              {chatMessages.length <= 2 && CHAT_SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  className={styles.suggestionChip}
                  onClick={() => sendChatMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className={styles.chatInputArea}>
              <input
                ref={chatInputRef}
                className={styles.chatInput}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleChatKeyDown}
                placeholder="Ask anything about Shiva..."
                disabled={chatLoading}
              />
              <button
                className={styles.chatSend}
                onClick={() => sendChatMessage()}
                disabled={!chatInput.trim() || chatLoading}
              >
                ↑
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ─── Tool Explorer ────────────────────────────────────────────── */}
      {activeTab === 'tools' && (
        <>
          <Section className={styles.toolsSection}>
            <Heading className={styles.sectionTitle} level={3} as="h2">
              Registered Tools
            </Heading>
            <Text className={styles.sectionDescription} size="l" as="p">
              These tools are live and available to any WebMCP-compatible agent visiting this page.
            </Text>
            <div className={styles.toolGrid}>
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className={styles.toolCard}
                  data-selected={selectedTool === tool.name}
                  onClick={() => {
                    setSelectedTool(tool.name);
                    setQueryInput('');
                    setResult(null);
                  }}
                >
                  <div className={styles.toolHeader}>
                    <code className={styles.toolName}>{tool.name}</code>
                    {tool.annotations?.readOnlyHint && (
                      <span className={styles.toolBadge}>read-only</span>
                    )}
                  </div>
                  <p className={styles.toolDescription}>{tool.description}</p>
                  <div className={styles.toolSchema}>
                    <span className={styles.schemaLabel}>Input</span>
                    <code className={styles.schemaPreview}>
                      {tool.inputSchema?.properties
                        ? Object.entries(tool.inputSchema.properties)
                            .map(([k, v]) => `${k}: ${v.type}`)
                            .join(', ')
                        : 'none'}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Playground */}
          <Section className={styles.playground} id="playground">
            <Heading className={styles.sectionTitle} level={3} as="h2">
              Live Playground
            </Heading>
            <Text className={styles.sectionDescription} size="l" as="p">
              Try calling tools directly — this is exactly what an AI agent does when it visits this page.
            </Text>

            <div className={styles.sampleQueries}>
              {SAMPLE_QUERIES.map((sample, i) => (
                <button
                  key={i}
                  className={styles.sampleButton}
                  onClick={() => handleSampleQuery(sample)}
                >
                  {sample.label}
                </button>
              ))}
            </div>

            <div className={styles.playgroundPanels}>
              <div className={styles.inputPanel}>
                <div className={styles.panelHeader}>
                  <span>Tool Call</span>
                  {selectedTool && <code className={styles.selectedToolName}>{selectedTool}</code>}
                </div>
                <div className={styles.toolSelect}>
                  <select
                    value={selectedTool || ''}
                    onChange={(e) => {
                      setSelectedTool(e.target.value);
                      setQueryInput('');
                      setResult(null);
                    }}
                    className={styles.select}
                  >
                    <option value="">Select a tool...</option>
                    {tools.map((t) => (
                      <option key={t.name} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <textarea
                  className={styles.inputArea}
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder={selectedTool ? `Enter JSON input for ${selectedTool}...` : 'Select a tool first'}
                  spellCheck={false}
                />
                <button
                  className={styles.executeButton}
                  onClick={handleCustomExecute}
                  disabled={!selectedTool || !queryInput || isRunning}
                >
                  {isRunning ? 'Executing...' : 'Execute Tool'}
                </button>
              </div>

              <div className={styles.outputPanel}>
                <div className={styles.panelHeader}>
                  <span>Response</span>
                  {result && (
                    <span className={styles.resultBadge}>
                      {result.error ? '✕ Error' : '✓ Success'}
                    </span>
                  )}
                </div>
                <pre className={styles.outputArea}>
                  {result
                    ? JSON.stringify(result, null, 2)
                    : '// Tool response will appear here...'}
                </pre>
              </div>
            </div>
          </Section>
        </>
      )}

      {/* ─── Event Log ────────────────────────────────────────────────── */}
      {activeTab === 'log' && (
        <Section className={styles.logSection}>
          <Heading className={styles.sectionTitle} level={3} as="h2">
            Event Log
          </Heading>
          <Text className={styles.sectionDescription} size="l" as="p">
            Real-time log of all WebMCP activity on this page — tool registrations, agent calls, and responses.
          </Text>
          <div className={styles.eventLog}>
            {events.length === 0 ? (
              <div className={styles.logEmpty}>No events yet. Try calling a tool in the Tool Explorer.</div>
            ) : (
              events.map((event, i) => (
                <div key={i} className={styles.logEntry} data-type={event.type}>
                  <span className={styles.logTime}>
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                  <span className={styles.logType}>{event.type}</span>
                  <span className={styles.logDetail}>
                    {event.type === 'registration'
                      ? `${event.detail.toolCount} tools (${event.detail.status})`
                      : event.type === 'tool_call'
                      ? `${event.detail.tool}(${JSON.stringify(event.detail.input).slice(0, 60)}...)`
                      : event.type === 'tool_result'
                      ? `${event.detail.tool} → response`
                      : JSON.stringify(event.detail).slice(0, 80)}
                  </span>
                </div>
              ))
            )}
            <div ref={logEndRef} />
          </div>
        </Section>
      )}

      {/* ─── Code Example ─────────────────────────────────────────────── */}
      <Section className={styles.codeSection}>
        <Heading className={styles.sectionTitle} level={3} as="h2">
          Integration Code
        </Heading>
        <Text className={styles.sectionDescription} size="l" as="p">
          WebMCP tools registered via the W3C spec, with GPT-4o-mini as the AI backend.
        </Text>
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span>webmcp-tools.js</span>
            <span className={styles.codeLang}>JavaScript</span>
          </div>
          <pre className={styles.code}>{`// Register tools via W3C WebMCP API
// Spec: https://webmachinelearning.github.io/webmcp/

navigator.modelContext.provideContext({
  tools: [
    {
      name: 'ask_about_shiva',
      description: 'Ask any question about Shiva Teja...',
      inputSchema: {
        type: 'object',
        properties: {
          question: { type: 'string' }
        },
        required: ['question']
      },
      async execute({ question }) {
        // Calls GPT-4o-mini with portfolio context
        const res = await fetch('/api/webmcp-chat', {
          method: 'POST',
          body: JSON.stringify({ question })
        });
        const { answer } = await res.json();
        return {
          content: [{ type: 'text', text: answer }]
        };
      },
      annotations: { readOnlyHint: true }
    },
    // ... filter_projects, get_skills, etc.
  ]
});`}</pre>
        </div>
      </Section>

      <Footer />
    </div>
  );
};
