/**
 * WebMCP Tools Registration for Shiva Teja's Portfolio
 *
 * This module registers tools via the W3C WebMCP API (navigator.modelContext)
 * enabling AI agents, browser assistants, and assistive technologies to
 * interact with the portfolio programmatically.
 *
 * Spec: https://webmachinelearning.github.io/webmcp/
 * Repo: https://github.com/webmachinelearning/webmcp
 */

// ─── Portfolio Data ─────────────────────────────────────────────────────────

const PORTFOLIO_DATA = {
  owner: {
    name: 'Shiva Teja Dasi',
    role: 'Software Engineer',
    summary: 'Software Engineer with 3+ years of experience building scalable full-stack and distributed systems.',
    education: 'Master of Science, Computer Software Engineering, Northeastern University (Sep 2023 - May 2025)',
    disciplines: ['Full Stack Developer', 'AI Engineer', 'Cloud Architect', 'Systems Builder'],
    website: 'https://shivadasi.me',
    linkedin: 'https://www.linkedin.com/in/shiva-teja-dasi',
    github: 'https://github.com/Shiva-017',
    figma: 'https://www.figma.com/@shiva017',
    email: 'dasi.s@northeastern.edu',
  },

  skills: {
    Languages: ['Python', 'Java', 'JavaScript', 'TypeScript', 'Golang', 'C#', 'SQL'],
    'Front End': ['HTML', 'CSS', 'Angular', 'React', 'Next.js', 'Flutter', 'Redux', 'WebSocket', 'PWA'],
    'Back End': ['Node.js', 'Express', '.NET', 'JWT', 'OAuth 2.0', 'RESTful API'],
    'Cloud & DevOps': ['AWS', 'Google Cloud', 'Jenkins', 'Linux', 'Kubernetes', 'Docker', 'Terraform', 'Shell Scripting', 'Git'],
    Database: ['MySQL', 'Elasticsearch', 'MongoDB', 'Postgres', 'Redis'],
    'Tools & Technologies': ['VS Code', 'Android Studio', 'Postman', 'GitLab', 'Swagger', 'JIRA', 'MIRO', 'Figma', 'Excel', 'Fusion 360'],
  },

  projects: [
    {
      id: 'sidekick',
      title: 'Sidekick - AI Indoor Navigation',
      description: 'Real-time indoor navigation for visually impaired using React Native + Gemini AI, 1-3m accuracy without GPS, voice-guided with TTS and WebSocket streaming.',
      tags: ['ai', 'react-native', 'gemini', 'accessibility', 'websocket'],
      link: 'https://github.com/shivateja-ab/sidekick-brain',
      type: 'ai',
    },
    {
      id: 'researchgpt',
      title: 'ResearchGPT Pro',
      description: 'LangGraph-based multi-agent retrieval system indexing 25K+ papers with 7-stage hybrid RAG pipeline, 102K-node Neo4j citation graph, sub-1.2s inference.',
      tags: ['ai', 'langgraph', 'rag', 'neo4j', 'fastapi'],
      link: 'https://github.com/Shiva-017/ResearchGPT-Pro',
      type: 'ai',
    },
    {
      id: 'college-compare',
      title: 'Empowering Global Education Journeys',
      description: 'Building a platform to help students discover, compare, and choose their ideal college worldwide.',
      tags: ['full-stack', 'web', 'react', 'education'],
      link: '/projects/smart-sparrow',
      type: 'web',
    },
    {
      id: 'rideeasy',
      title: 'Carpooling App Design',
      description: 'UI/UX design and prototyping for a carpooling app, created in Figma.',
      tags: ['ui-ux', 'design', 'figma', 'mobile'],
      link: 'https://www.figma.com/proto/Z4KTFvaMru2J0L7lKyISjF/RideEasy',
      type: 'design',
    },
    {
      id: 'wequiz',
      title: 'We Quiz - A Location-Based Trivia App',
      description: 'An interactive quiz game that turns your travels into a fun journey of discovery. Powered by Flutter and Firebase.',
      tags: ['mobile', 'flutter', 'firebase', 'game', 'location'],
      link: 'https://github.com/Shiva-017/WeQuiz.git',
      type: 'mobile',
    },
    {
      id: 'taskmaster',
      title: 'Task Management Application',
      description: 'TaskMaster is a JavaFX-based app for creating, managing, and tracking tasks with an MVC architecture.',
      tags: ['java', 'javafx', 'desktop', 'mvc'],
      link: '/projects/slice',
      type: 'desktop',
    },
    {
      id: 'mail-master',
      title: 'Mail Master - AI Gmail Assistant',
      description: 'Your AI Gmail Assistant. Powered by LLMs and a custom MCP server — fetch interviews, summarize threads, and reply to recruiters with natural language.',
      tags: ['ai', 'mcp', 'llm', 'gmail', 'automation', 'python'],
      link: 'https://github.com/Shiva-017/Mail_Master.git',
      type: 'ai',
    },
    {
      id: 'gcp-infra',
      title: 'GCP Cloud Infrastructure Suite',
      description: 'Leverages GCP Cloud as the backbone to architect a web application optimized for scalability, robust security, and seamless availability.',
      tags: ['cloud', 'gcp', 'terraform', 'packer', 'devops', 'serverless'],
      link: 'https://github.com/Shiva-017/webapp/',
      type: 'cloud',
    },
    {
      id: 'image-captioning',
      title: 'Image Captioning with multi-GPU Training',
      description: 'Optimized CNN-RNN image captioning with attention and multi-GPU training.',
      tags: ['ai', 'ml', 'deep-learning', 'cnn', 'rnn', 'attention', 'python'],
      link: 'https://github.com/Shiva-017/Caption-Generation-Model',
      type: 'ai',
    },
    {
      id: 'go-vcs',
      title: 'Go-VCS - Version Control System',
      description: 'A Git-like versioning system built in Go using Merkle tree, with AI-generated commit messages.',
      tags: ['golang', 'ai', 'git', 'systems', 'merkle-tree'],
      link: 'https://github.com/Shiva-017/Go-VCS',
      type: 'systems',
    },
    {
      id: 'kv-store',
      title: 'B+ Tree Key Value Store',
      description: 'A B+ tree key-value store with a focus on concurrency and performance, built in Python.',
      tags: ['python', 'data-structures', 'systems', 'concurrency'],
      link: 'https://github.com/Shiva-017/Go-VCS',
      type: 'systems',
    },
  ],
};

// ─── Tool Handlers ──────────────────────────────────────────────────────────

async function handleAskPortfolio({ question }) {
  // Call the server-side Claude API endpoint for intelligent answers
  try {
    const response = await fetch('/api/webmcp-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) throw new Error(`API returned ${response.status}`);

    const data = await response.json();
    return {
      content: [{
        type: 'text',
        text: data.answer,
      }],
      meta: { source: data.source },
    };
  } catch (err) {
    // Fallback to keyword-based search if API fails
    return handleAskPortfolioFallback(question);
  }
}

function handleAskPortfolioFallback(question) {
  const q = question.toLowerCase();
  const results = {};

  // Check for project-related queries
  const projectMatches = PORTFOLIO_DATA.projects.filter(p => {
    const searchText = `${p.title} ${p.description} ${p.tags.join(' ')} ${p.type}`.toLowerCase();
    const words = q.split(/\s+/);
    return words.some(w => w.length > 2 && searchText.includes(w));
  });

  if (projectMatches.length > 0) {
    results.matchedProjects = projectMatches;
  }

  // Check for skill-related queries
  const skillMatches = {};
  for (const [category, skills] of Object.entries(PORTFOLIO_DATA.skills)) {
    const matched = skills.filter(s => q.includes(s.toLowerCase()));
    if (matched.length > 0) skillMatches[category] = matched;
  }

  for (const category of Object.keys(PORTFOLIO_DATA.skills)) {
    if (q.includes(category.toLowerCase())) {
      skillMatches[category] = PORTFOLIO_DATA.skills[category];
    }
  }

  if (Object.keys(skillMatches).length > 0) {
    results.matchedSkills = skillMatches;
  }

  const contactKeywords = ['contact', 'email', 'reach', 'hire', 'linkedin', 'github', 'social'];
  if (contactKeywords.some(k => q.includes(k))) {
    results.contact = {
      email: PORTFOLIO_DATA.owner.email,
      linkedin: PORTFOLIO_DATA.owner.linkedin,
      github: PORTFOLIO_DATA.owner.github,
      website: PORTFOLIO_DATA.owner.website,
    };
  }

  const bioKeywords = ['who', 'about', 'background', 'education', 'bio', 'introduction', 'shiva'];
  if (bioKeywords.some(k => q.includes(k))) {
    results.about = PORTFOLIO_DATA.owner;
  }

  const domainKeywords = {
    ai: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', 'llm', 'mcp'],
    cloud: ['cloud', 'devops', 'aws', 'gcp', 'infrastructure', 'terraform', 'docker', 'kubernetes'],
    frontend: ['frontend', 'front-end', 'react', 'ui', 'ux', 'design', 'css'],
    backend: ['backend', 'back-end', 'api', 'server', 'node', 'express'],
    mobile: ['mobile', 'flutter', 'app'],
    systems: ['systems', 'golang', 'go', 'data structures', 'concurrency'],
  };

  for (const [domain, keywords] of Object.entries(domainKeywords)) {
    if (keywords.some(k => q.includes(k))) {
      const domainProjects = PORTFOLIO_DATA.projects.filter(p =>
        p.type === domain || p.tags.some(t => keywords.includes(t))
      );
      if (domainProjects.length > 0 && !results.matchedProjects) {
        results.matchedProjects = domainProjects;
      }
    }
  }

  if (Object.keys(results).length === 0) {
    results.summary = {
      name: PORTFOLIO_DATA.owner.name,
      role: PORTFOLIO_DATA.owner.role,
      education: PORTFOLIO_DATA.owner.education,
      totalProjects: PORTFOLIO_DATA.projects.length,
      projectCategories: [...new Set(PORTFOLIO_DATA.projects.map(p => p.type))],
      skillCategories: Object.keys(PORTFOLIO_DATA.skills),
      hint: 'Try asking about specific topics like "AI projects", "cloud experience", "skills in Python", or "how to contact Shiva".',
    };
  }

  return { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] };
}

function handleFilterProjects({ criteria }) {
  const c = criteria.toLowerCase();
  const scored = PORTFOLIO_DATA.projects.map(p => {
    const searchText = `${p.title} ${p.description} ${p.tags.join(' ')} ${p.type}`.toLowerCase();
    const words = c.split(/\s+/).filter(w => w.length > 2);
    const score = words.reduce((acc, w) => acc + (searchText.includes(w) ? 1 : 0), 0);
    return { ...p, relevanceScore: score };
  });

  const matches = scored
    .filter(p => p.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);

  const scrollTargets = matches.map((p, i) => ({
    ...p,
    domSectionId: `project-${PORTFOLIO_DATA.projects.indexOf(
      PORTFOLIO_DATA.projects.find(orig => orig.id === p.id)
    ) + 1}`,
  }));

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        query: criteria,
        totalResults: matches.length,
        results: scrollTargets,
        allTags: [...new Set(PORTFOLIO_DATA.projects.flatMap(p => p.tags))].sort(),
      }, null, 2),
    }],
  };
}

function handleGetSkills({ category }) {
  if (category) {
    const key = Object.keys(PORTFOLIO_DATA.skills).find(
      k => k.toLowerCase() === category.toLowerCase()
    );
    if (key) {
      return {
        content: [{ type: 'text', text: JSON.stringify({ [key]: PORTFOLIO_DATA.skills[key] }) }],
      };
    }
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          error: `Category "${category}" not found`,
          availableCategories: Object.keys(PORTFOLIO_DATA.skills),
        }),
      }],
    };
  }
  return { content: [{ type: 'text', text: JSON.stringify(PORTFOLIO_DATA.skills) }] };
}

function handleGetProjectDetails({ projectId }) {
  const project = PORTFOLIO_DATA.projects.find(
    p => p.id === projectId || p.title.toLowerCase().includes(projectId.toLowerCase())
  );
  if (!project) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          error: `Project "${projectId}" not found`,
          availableProjects: PORTFOLIO_DATA.projects.map(p => ({ id: p.id, title: p.title })),
        }),
      }],
    };
  }
  return { content: [{ type: 'text', text: JSON.stringify(project, null, 2) }] };
}

function handleNavigateToSection({ section }) {
  const sectionEl = document.getElementById(section) || document.querySelector(`[id*="${section}"]`);
  if (sectionEl) {
    sectionEl.scrollIntoView({ behavior: 'smooth' });
    return { content: [{ type: 'text', text: `Navigated to section: ${section}` }] };
  }
  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        error: `Section "${section}" not found`,
        availableSections: ['intro', 'project-1', 'project-2', 'project-3', 'project-4', 'project-5', 'project-6', 'project-7', 'project-8', 'project-9', 'project-10', 'details'],
      }),
    }],
  };
}

// ─── Tool Definitions ───────────────────────────────────────────────────────

const TOOLS = [
  {
    name: 'ask_about_shiva',
    description:
      'Ask any question about Shiva Teja Dasi — his projects, skills, experience, education, contact info, or areas of expertise. Supports natural language queries like "What AI projects has Shiva built?" or "Does Shiva know Kubernetes?" or "How can I contact Shiva?"',
    inputSchema: {
      type: 'object',
      properties: {
        question: {
          type: 'string',
          description: 'A natural language question about Shiva Teja, his portfolio, skills, or experience.',
        },
      },
      required: ['question'],
    },
    execute: async (input) => handleAskPortfolio(input),
    annotations: { readOnlyHint: true },
  },
  {
    name: 'filter_projects',
    description:
      'Filter and search portfolio projects by natural language criteria. Examples: "AI and machine learning projects", "cloud infrastructure", "mobile apps", "UI/UX design work". Returns matching projects sorted by relevance.',
    inputSchema: {
      type: 'object',
      properties: {
        criteria: {
          type: 'string',
          description: 'Natural language description of the types of projects to filter for.',
        },
      },
      required: ['criteria'],
    },
    execute: async (input) => handleFilterProjects(input),
    annotations: { readOnlyHint: true },
  },
  {
    name: 'get_skills',
    description:
      'Get Shiva Teja\'s technical skills, optionally filtered by category. Available categories: Languages, Front End, Back End, Cloud & DevOps, Database, Tools & Technologies.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Optional skill category to filter by. Leave empty to get all skills.',
        },
      },
    },
    execute: async (input) => handleGetSkills(input),
    annotations: { readOnlyHint: true },
  },
  {
    name: 'get_project_details',
    description:
      'Get detailed information about a specific portfolio project by ID or name. Use filter_projects first to discover available projects.',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: 'Project ID (e.g., "mail-master", "go-vcs") or partial project name.',
        },
      },
      required: ['projectId'],
    },
    execute: async (input) => handleGetProjectDetails(input),
    annotations: { readOnlyHint: true },
  },
  {
    name: 'navigate_to_section',
    description:
      'Scroll the portfolio page to a specific section. Sections include: intro, project-1 through project-10, details (about section).',
    inputSchema: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          description: 'The section ID to navigate to (e.g., "intro", "project-1", "details").',
        },
      },
      required: ['section'],
    },
    execute: async (input) => handleNavigateToSection(input),
    annotations: { readOnlyHint: false },
  },
];

// ─── Event Log (for the dashboard) ─────────────────────────────────────────

const eventLog = [];
const eventListeners = new Set();

function logEvent(type, detail) {
  const entry = { type, detail, timestamp: new Date().toISOString() };
  eventLog.push(entry);
  if (eventLog.length > 100) eventLog.shift();
  eventListeners.forEach(cb => cb(entry));
}

export function onWebMCPEvent(callback) {
  eventListeners.add(callback);
  return () => eventListeners.delete(callback);
}

export function getEventLog() {
  return [...eventLog];
}

export function getRegisteredTools() {
  return TOOLS.map(({ execute, ...rest }) => rest);
}

// ─── Registration ───────────────────────────────────────────────────────────

export function registerWebMCPTools() {
  // Check for browser support
  if (typeof navigator === 'undefined' || !navigator.modelContext) {
    console.info(
      '%c[WebMCP]%c navigator.modelContext not available. Tools registered in polyfill mode for demo purposes.',
      'color: #00d4ff; font-weight: bold;',
      'color: inherit;'
    );

    // Create a lightweight polyfill for demo/showcase purposes
    if (typeof window !== 'undefined') {
      window.__webmcpTools = {};
      window.__webmcpRegistered = true;

      const wrappedTools = TOOLS.map(tool => {
        const wrappedTool = {
          ...tool,
          execute: async (input) => {
            logEvent('tool_call', { tool: tool.name, input });
            const result = await tool.execute(input);
            logEvent('tool_result', { tool: tool.name, result });
            return result;
          },
        };
        window.__webmcpTools[tool.name] = wrappedTool;
        return wrappedTool;
      });

      logEvent('registration', {
        status: 'polyfill',
        toolCount: wrappedTools.length,
        tools: wrappedTools.map(t => t.name),
      });

      console.info(
        `%c[WebMCP]%c ${wrappedTools.length} tools registered (polyfill). Try: window.__webmcpTools.ask_about_shiva.execute({question: "What AI projects has Shiva built?"})`,
        'color: #00d4ff; font-weight: bold;',
        'color: inherit;'
      );
    }

    return;
  }

  // Native WebMCP API available — register tools properly
  try {
    const wrappedTools = TOOLS.map(tool => ({
      ...tool,
      execute: async (input, client) => {
        logEvent('tool_call', { tool: tool.name, input });
        const result = await tool.execute(input, client);
        logEvent('tool_result', { tool: tool.name, result });
        return result;
      },
    }));

    navigator.modelContext.provideContext({ tools: wrappedTools });

    logEvent('registration', {
      status: 'native',
      toolCount: wrappedTools.length,
      tools: wrappedTools.map(t => t.name),
    });

    console.info(
      `%c[WebMCP]%c ${wrappedTools.length} tools registered via navigator.modelContext`,
      'color: #00d4ff; font-weight: bold;',
      'color: inherit;'
    );
  } catch (err) {
    console.error('[WebMCP] Failed to register tools:', err);
    logEvent('error', { message: err.message });
  }
}

export { PORTFOLIO_DATA, TOOLS };
