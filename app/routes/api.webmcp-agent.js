import { json } from '@remix-run/cloudflare';

/**
 * Server-side WebMCP Agent route: POST /api/webmcp-agent
 *
 * This acts as a REAL WebMCP client/agent. It:
 * 1. Receives the user's natural language message
 * 2. Sends the message + available tool definitions to GPT-4o-mini
 * 3. GPT-4o-mini decides which tool to call (or responds directly)
 * 4. Executes the chosen tool server-side
 * 5. Sends the tool result back to GPT-4o-mini for a final answer
 *
 * This is exactly what a browser's AI agent would do with WebMCP tools.
 */

// ─── Tool definitions (mirrors webmcp-tools.js but for server-side) ─────

const PORTFOLIO_DATA = {
  owner: {
    name: 'Shiva Teja Dasi',
    role: 'Software Engineer',
    summary: 'Software Engineer with 3+ years of experience building scalable full-stack and distributed systems. Delivered 10x performance improvements, 60% latency reductions, and 12% margin growth.',
    education: "Master of Science, Computer Software Engineering, Northeastern University (Sep 2023 - May 2025)",
    website: 'https://shivadasi.me',
    linkedin: 'https://www.linkedin.com/in/shiva-teja-dasi',
    github: 'https://github.com/Shiva-017',
    email: 'dasi.s@northeastern.edu',
  },
  skills: {
    Languages: ['Python', 'JavaScript (ES6)', 'TypeScript', 'Go', 'Java', 'C#', 'PHP', 'SQL', 'HTML5', 'CSS3'],
    'Front End': ['React', 'Next.js', 'Angular', 'Vue.js', 'Flutter', 'Apollo Client', 'Tailwind CSS', 'Material-UI', 'WebGL', 'Webpack'],
    'Back End': ['Node.js', 'Express', 'FastAPI', 'Django', 'Spring Boot', 'Kafka', 'RabbitMQ', 'GraphQL'],
    'Cloud & DevOps': ['AWS (Lambda, S3, SQS, SNS)', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Packer', 'Jenkins', 'GitHub Actions', 'Linux', 'Git'],
    Database: ['PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB', 'Neo4j', 'Pinecone', 'Snowflake', 'Airflow'],
    'AI / ML & Agents': ['PyTorch', 'TensorFlow', 'LangChain', 'LangGraph', 'HuggingFace', 'AutoGen', 'Claude', 'Gemini', 'MCP', 'A2A'],
  },
  experience: [
    { company: 'Rebecca Everlene Trust Company', role: 'Software Engineer', duration: 'Aug 2025 - Present', highlights: ['Reduced admin tickets 45% with RAG chatbot (LangChain + Pinecone)', 'Architected MCP agent with Claude and 6 tool servers at 94% resolution', 'Built AI recommendation engine with OpenAI embeddings + FAISS for 10K+ users'] },
    { company: 'Cimpress / Vistaprint', role: 'Software Engineer', duration: 'Jan 2022 - Aug 2023', highlights: ['WebAssembly DPI validation + AI upscaling for 50K+ uploads/month', 'Enterprise onboarding from 3 weeks to 4 days with React/TS microfrontends', 'Boosted margins 12% with Node.js pricing + Kafka + Elasticsearch'] },
    { company: 'The 10X Academy', role: 'Full Stack Developer', duration: 'Aug 2019 - Dec 2021', highlights: ['60% page load improvement migrating to Next.js SSR for 10M+ users', 'Go-based GraphQL gateway with goroutines + DataLoader', 'Event-driven architecture with Kafka + SQS', 'Reduced MTTR 60% with Datadog tracing across 20+ microservices'] },
  ],
  projects: [
    { id: 'sidekick', title: 'Sidekick - AI Indoor Navigation', description: 'Real-time indoor navigation for visually impaired using React Native + Gemini AI, 1-3m accuracy without GPS, voice-guided with TTS and WebSocket streaming.', tags: ['ai', 'react-native', 'gemini', 'accessibility', 'websocket'], type: 'ai', link: 'https://github.com/shivateja-ab/sidekick-brain' },
    { id: 'researchgpt', title: 'ResearchGPT Pro', description: 'LangGraph-based multi-agent retrieval system indexing 25K+ papers with 7-stage hybrid RAG pipeline, 102K-node Neo4j citation graph, sub-1.2s inference.', tags: ['ai', 'langgraph', 'rag', 'neo4j', 'fastapi'], type: 'ai', link: 'https://github.com/Shiva-017/ResearchGPT-Pro' },
    { id: 'college-compare', title: 'Empowering Global Education Journeys', description: 'A platform to help students discover, compare, and choose their ideal college worldwide.', tags: ['full-stack', 'web', 'react', 'education'], type: 'web' },
    { id: 'rideeasy', title: 'Carpooling App Design', description: 'UI/UX design and prototyping for a carpooling app, created in Figma.', tags: ['ui-ux', 'design', 'figma', 'mobile'], type: 'design' },
    { id: 'wequiz', title: 'We Quiz - Location-Based Trivia App', description: 'An interactive quiz game powered by Flutter and Firebase.', tags: ['mobile', 'flutter', 'firebase', 'game'], type: 'mobile' },
    { id: 'taskmaster', title: 'Task Management Application', description: 'JavaFX-based app with MVC architecture for task management.', tags: ['java', 'javafx', 'desktop', 'mvc'], type: 'desktop' },
    { id: 'mail-master', title: 'Mail Master - AI Gmail Assistant', description: 'AI Gmail assistant powered by LLMs and a custom MCP server — fetch interviews, summarize threads, reply to recruiters.', tags: ['ai', 'mcp', 'llm', 'gmail', 'automation', 'python'], type: 'ai', link: 'https://github.com/Shiva-017/Mail_Master' },
    { id: 'gcp-infra', title: 'GCP Cloud Infrastructure Suite', description: 'GCP-based web app architecture with Terraform, Packer, and serverless functions.', tags: ['cloud', 'gcp', 'terraform', 'packer', 'devops', 'serverless'], type: 'cloud' },
    { id: 'image-captioning', title: 'Image Captioning with multi-GPU Training', description: 'CNN-RNN image captioning with attention and multi-GPU training.', tags: ['ai', 'ml', 'deep-learning', 'cnn', 'rnn', 'python'], type: 'ai' },
    { id: 'go-vcs', title: 'Go-VCS - Version Control System', description: 'Git-like VCS built in Go with Merkle tree and AI-generated commit messages.', tags: ['golang', 'ai', 'git', 'systems'], type: 'systems', link: 'https://github.com/Shiva-017/Go-VCS' },
    { id: 'kv-store', title: 'B+ Tree Key Value Store', description: 'B+ tree key-value store focused on concurrency and performance, built in Python.', tags: ['python', 'data-structures', 'systems', 'concurrency'], type: 'systems' },
  ],
};

// ─── Tool executors (server-side versions) ──────────────────────────────

function executeFilterProjects(input) {
  const c = (input.criteria || '').toLowerCase();
  const words = c.split(/\s+/).filter(w => w.length > 2);
  const scored = PORTFOLIO_DATA.projects.map(p => {
    const text = `${p.title} ${p.description} ${p.tags.join(' ')} ${p.type}`.toLowerCase();
    const score = words.reduce((acc, w) => acc + (text.includes(w) ? 1 : 0), 0);
    return { ...p, relevanceScore: score };
  });
  return scored.filter(p => p.relevanceScore > 0).sort((a, b) => b.relevanceScore - a.relevanceScore);
}

function executeGetSkills(input) {
  if (input.category) {
    const key = Object.keys(PORTFOLIO_DATA.skills).find(k => k.toLowerCase() === input.category.toLowerCase());
    if (key) return { [key]: PORTFOLIO_DATA.skills[key] };
    return { error: `Category not found`, available: Object.keys(PORTFOLIO_DATA.skills) };
  }
  return PORTFOLIO_DATA.skills;
}

function executeGetProjectDetails(input) {
  return PORTFOLIO_DATA.projects.find(
    p => p.id === input.projectId || p.title.toLowerCase().includes((input.projectId || '').toLowerCase())
  ) || { error: 'Not found', available: PORTFOLIO_DATA.projects.map(p => ({ id: p.id, title: p.title })) };
}

// Sections that are separate routes (not scroll targets on homepage)
const ROUTE_SECTIONS = {
  contact: '/contact',
  webmcp: '/webmcp',
};

function executeNavigateToSection(input) {
  const section = (input.section || '').toLowerCase().trim();
  if (ROUTE_SECTIONS[section]) {
    return { action: 'route', path: ROUTE_SECTIONS[section], section };
  }
  return { action: 'scroll', section, instruction: `Scroll to section: ${section}` };
}

const TOOL_EXECUTORS = {
  filter_projects: executeFilterProjects,
  get_skills: executeGetSkills,
  get_project_details: executeGetProjectDetails,
  navigate_to_section: executeNavigateToSection,
};

// ─── OpenAI tool definitions (function calling format) ──────────────────

const OPENAI_TOOLS = [
  {
    type: 'function',
    function: {
      name: 'ask_about_shiva',
      description: 'Answer any natural language question about Shiva Teja Dasi using portfolio context — his projects, skills, experience, education, contact info, or areas of expertise.',
      parameters: {
        type: 'object',
        properties: {
          question: { type: 'string', description: 'The question to answer about Shiva' },
        },
        required: ['question'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'filter_projects',
      description: 'Filter and search portfolio projects by criteria. Use for queries like "AI projects", "cloud work", "mobile apps", "design projects".',
      parameters: {
        type: 'object',
        properties: {
          criteria: { type: 'string', description: 'Natural language criteria to filter projects' },
        },
        required: ['criteria'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_skills',
      description: 'Get technical skills, optionally by category. Categories: Languages, Front End, Back End, Cloud & DevOps, Database, Tools & Technologies.',
      parameters: {
        type: 'object',
        properties: {
          category: { type: 'string', description: 'Skill category to filter by. Omit for all skills.' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_project_details',
      description: 'Get detailed info about a specific project by ID or name.',
      parameters: {
        type: 'object',
        properties: {
          projectId: { type: 'string', description: 'Project ID or partial name' },
        },
        required: ['projectId'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'navigate_to_section',
      description: 'Navigate the portfolio page to a specific section or page. Available targets: "intro" (hero), "project-1" through "project-10" (projects), "experience" (work experience section), "skills" (skills section), "details" (about section), "contact" (contact page at /contact), "webmcp" (WebMCP showcase at /webmcp). Use this when the user asks to go to, navigate to, scroll to, or show a section.',
      parameters: {
        type: 'object',
        properties: {
          section: { type: 'string', description: 'Section ID or page name to navigate to' },
        },
        required: ['section'],
      },
    },
  },
];

const SYSTEM_PROMPT = `You are an AI agent embedded in Shiva Teja Dasi's portfolio website. You interact with the site through WebMCP tools — structured functions that give you access to portfolio data.

IMPORTANT: You MUST use tools to answer questions. Do NOT guess or make up information. Use the available tools to look up real data, then form your answer from the tool results.

Your workflow:
1. User asks a question
2. You decide which tool(s) to call
3. You get the tool results
4. You compose a clear, concise, helpful answer from the results

For general questions about Shiva, use ask_about_shiva.
For finding specific types of projects, use filter_projects.
For skill lookups, use get_skills.
For details on one project, use get_project_details.
For navigation requests, use navigate_to_section.

Be concise, warm, and professional. Keep answers to 2-3 sentences unless the user asks for detail.`;

// ─── Main handler ───────────────────────────────────────────────────────

export async function action({ request, context }) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== 'string' || message.length > 1000) {
      return json({ error: 'Invalid message' }, { status: 400 });
    }

    // Try multiple paths to find the API key (Cloudflare Pages vs Workers vs dev)
    const apiKey = context?.cloudflare?.env?.OPENAI_API_KEY
      || context?.env?.OPENAI_API_KEY
      || (typeof process !== 'undefined' && process.env?.OPENAI_API_KEY);

    console.log('[WebMCP Agent] API key found:', !!apiKey);

    if (!apiKey) {
      console.error('[WebMCP Agent] OPENAI_API_KEY not found in context.cloudflare.env, context.env, or process.env');
      return json({
        answer: "The AI agent isn't configured yet. OPENAI_API_KEY not found in environment. Make sure it's in your .dev.vars file and restart the dev server.",
        toolsUsed: [],
        source: 'error',
      });
    }

    // Build conversation
    const messages = [{ role: 'system', content: SYSTEM_PROMPT }];
    for (const msg of history.slice(-8)) {
      messages.push({ role: msg.role, content: msg.content });
    }
    messages.push({ role: 'user', content: message });

    // ─── Step 1: Ask GPT which tool(s) to call ─────────────────

    const step1Response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 600,
        messages,
        tools: OPENAI_TOOLS,
        tool_choice: 'auto',
      }),
    });

    if (!step1Response.ok) {
      const errText = await step1Response.text();
      console.error('[WebMCP Agent] Step 1 error:', step1Response.status, errText);
      return json({ answer: 'Something went wrong with the AI agent.', toolsUsed: [], source: 'error' });
    }

    const step1Data = await step1Response.json();
    const assistantMessage = step1Data.choices?.[0]?.message;

    // If no tool calls, the model responded directly
    if (!assistantMessage?.tool_calls || assistantMessage.tool_calls.length === 0) {
      return json({
        answer: assistantMessage?.content || "I'm not sure how to help with that. Try asking about Shiva's projects, skills, or experience.",
        toolsUsed: [],
        source: 'gpt-4o-mini (direct)',
      });
    }

    // ─── Step 2: Execute each tool call ─────────────────────────

    const toolResults = [];
    const toolsUsed = [];

    for (const toolCall of assistantMessage.tool_calls) {
      const fnName = toolCall.function.name;
      const fnArgs = JSON.parse(toolCall.function.arguments || '{}');

      toolsUsed.push({ tool: fnName, input: fnArgs });

      let result;
      if (fnName === 'ask_about_shiva') {
        // For ask_about_shiva, we pass the full portfolio as context
        result = JSON.stringify({
          about: PORTFOLIO_DATA.owner,
          skills: PORTFOLIO_DATA.skills,
          projects: PORTFOLIO_DATA.projects,
        });
      } else if (TOOL_EXECUTORS[fnName]) {
        result = JSON.stringify(TOOL_EXECUTORS[fnName](fnArgs));
      } else {
        result = JSON.stringify({ error: `Unknown tool: ${fnName}` });
      }

      toolResults.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: result,
      });
    }

    // ─── Step 3: Send tool results back for final answer ────────

    const step2Messages = [
      ...messages,
      assistantMessage,
      ...toolResults,
    ];

    const step2Response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 500,
        messages: step2Messages,
      }),
    });

    if (!step2Response.ok) {
      const errText = await step2Response.text();
      console.error('[WebMCP Agent] Step 2 error:', step2Response.status, errText);
      return json({ answer: 'Failed to process tool results.', toolsUsed, source: 'error' });
    }

    const step2Data = await step2Response.json();
    const finalAnswer = step2Data.choices?.[0]?.message?.content || 'No response generated.';

    // Check if any tool was navigate_to_section
    const navAction = toolsUsed.find(t => t.tool === 'navigate_to_section');
    let navigate = null;
    let navigateRoute = null;

    if (navAction) {
      const section = (navAction.input.section || '').toLowerCase().trim();
      const routeMap = { contact: '/contact', webmcp: '/webmcp' };
      if (routeMap[section]) {
        navigateRoute = routeMap[section];
      } else {
        navigate = section;
      }
    }

    return json({
      answer: finalAnswer,
      toolsUsed,
      source: 'gpt-4o-mini (via WebMCP tools)',
      navigate,
      navigateRoute,
    });

  } catch (err) {
    console.error('[WebMCP Agent] Error:', err);
    return json({ answer: 'Something went wrong. Please try again.', toolsUsed: [], source: 'error' });
  }
}
