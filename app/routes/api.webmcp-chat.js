import { json } from '@remix-run/cloudflare';

/**
 * Server-side API route: POST /api/webmcp-chat
 *
 * Calls Claude Sonnet with Shiva's portfolio context to answer
 * natural language questions. Used by the WebMCP ask_about_shiva tool.
 */

const PORTFOLIO_CONTEXT = `
You are an AI assistant embedded in Shiva Teja Dasi's portfolio website. Answer questions about Shiva accurately and helpfully using ONLY the information below. Be concise, warm, and professional. If a question is unrelated to Shiva or his work, politely redirect.

=== ABOUT ===
Name: Shiva Teja Dasi
Role: Software Engineer
Summary: Software Engineer with 3+ years of experience building scalable full-stack and distributed systems across manufacturing and edtech platforms. Delivered 10x performance improvements, 60% latency reductions, and 12% margin growth. Specializes in high-throughput APIs, event-driven architectures, and production-grade AI integrations.
Education: Master of Science, Computer Software Engineering, Northeastern University (Sep 2023 - May 2025)
Website: https://shivadasi.me
LinkedIn: https://www.linkedin.com/in/shiva-teja-dasi
GitHub: https://github.com/Shiva-017
Email: shivatejadasi@gmail.com

=== PROFESSIONAL EXPERIENCE ===

1. Rebecca Everlene Trust Company — Software Engineer (Aug 2025 - Present)
   - Reduced admin tickets 45% by deploying RAG chatbot using LangChain and Pinecone, automating enrollment FAQs across 5K+ queries
   - Minimized scheduling overhead 70% by architecting MCP agent with Claude and 6 tool servers, auto-pairing mentors at 94% resolution
   - Increased engagement 40% by building AI recommendation engine using OpenAI embeddings and FAISS, serving 10K+ personalized paths

2. Cimpress / Vistaprint — Software Engineer (Jan 2023 - Aug 2023)
   - Eliminated print complaints 35% with WebAssembly DPI validation and AI upscaling for 50K+ AWS uploads monthly
   - Accelerated enterprise onboarding from 3 weeks to 4 days with modular React/TypeScript microfrontends
   - Boosted profit margins 12% by developing Node.js pricing services with Kafka and Elasticsearch
   - Decreased frontend regressions 70% with TDD using Jest, React Testing Library, and CI pipelines at 85%+ coverage

3. The 10X Academy — Full Stack Developer (Aug 2020 - Dec 2022)
   - Improved page load times 60% by migrating React to Next.js with SSR and Apollo caching for 10M+ users
   - Built Go-based GraphQL gateway with goroutines and DataLoader over Node.js microservices
   - Designed event-driven architecture using Kafka and SQS for real-time learner tracking
   - Reduced MTTR by 60% with distributed tracing via Datadog across 20+ microservices
   - Enabled daily deployments from weekly releases with CI/CD pipelines using GitHub Actions, Docker, and Terraform

=== SKILLS ===
Languages: Python, JavaScript (ES6), TypeScript, Go, Java, C#, PHP, SQL, HTML5, CSS3
Front End: React, Next.js, Angular, Vue.js, Flutter, Apollo Client, Tailwind CSS, Material-UI, WebGL, Webpack
Back End: Node.js, Express, FastAPI, Django, Spring Boot, Kafka, RabbitMQ, GraphQL
Cloud & DevOps: AWS (Lambda, S3, SQS, SNS), GCP, Azure, Docker, Kubernetes, Terraform, Packer, Jenkins, GitHub Actions
Database: PostgreSQL, MySQL, MongoDB, DynamoDB, Neo4j, Pinecone, Snowflake, Airflow
AI/ML & Agents: PyTorch, TensorFlow, LangChain, LangGraph, HuggingFace, AutoGen, Claude, Gemini, MCP, A2A

=== PROJECTS ===

1. Sidekick — AI-Powered Indoor Navigation for Visually Impaired (Dec 2025 - Feb 2026)
   Real-time indoor navigation using React Native + Gemini AI, 1-3m accuracy without GPS, voice-guided with TTS and WebSocket streaming

2. ResearchGPT Pro (Nov 2025 - Jan 2026)
   LangGraph-based multi-agent retrieval system indexing 25K+ papers with 7-stage hybrid RAG pipeline, Neo4j citation graph

3. Mail Master — AI Gmail Assistant
   AI Gmail assistant powered by LLMs and a custom MCP server

4. GCP Cloud Infrastructure Suite
   Automated GCP deployment with Terraform, Packer, CI/CD, Pub/Sub, CMEK encryption

5. Image Captioning with multi-GPU Training
   CNN-RNN image captioning with attention and multi-GPU training

6. Go-VCS — Version Control System
   Git-like VCS built in Go with Merkle tree and AI-generated commit messages

=== WEBMCP INTEGRATION ===
This portfolio itself is a WebMCP-enabled site. It exposes 5 tools via the W3C WebMCP API (navigator.modelContext) that allow AI agents to query projects, search skills, and interact with the site programmatically.
`;

export async function action({ request, context }) {
  // Only allow POST
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { question, history = [] } = await request.json();

    if (!question || typeof question !== 'string' || question.length > 1000) {
      return json({ error: 'Invalid question' }, { status: 400 });
    }

    // Get API key from environment (try multiple paths)
    const apiKey = context?.cloudflare?.env?.OPENAI_API_KEY
      || context?.env?.OPENAI_API_KEY
      || (typeof process !== 'undefined' && process.env?.OPENAI_API_KEY);

    if (!apiKey) {
      return json({
        answer: getFallbackAnswer(question),
        source: 'fallback',
      });
    }

    // Build conversation messages with system prompt
    const messages = [
      { role: 'system', content: PORTFOLIO_CONTEXT },
    ];

    // Include recent history for multi-turn conversation (last 6 messages)
    const recentHistory = history.slice(-6);
    for (const msg of recentHistory) {
      messages.push({ role: msg.role, content: msg.content });
    }

    // Add the current question
    messages.push({ role: 'user', content: question });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 500,
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[WebMCP Chat] OpenAI API error:', response.status, errText);
      return json({
        answer: getFallbackAnswer(question),
        source: 'fallback',
      });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || getFallbackAnswer(question);

    return json({ answer, source: 'gpt-4o-mini' });
  } catch (err) {
    console.error('[WebMCP Chat] Error:', err);
    return json({
      answer: getFallbackAnswer(''),
      source: 'fallback',
    });
  }
}

/**
 * Keyword-based fallback when API key is not configured
 */
function getFallbackAnswer(question) {
  const q = question.toLowerCase();

  if (['ai', 'machine learning', 'ml', 'llm', 'mcp'].some(k => q.includes(k))) {
    return "Shiva has strong AI/ML experience — he built Mail Master (an MCP-powered AI Gmail assistant), an image captioning model with CNN-RNN attention and multi-GPU training, and Go-VCS which uses AI for commit message generation. This portfolio itself uses the W3C WebMCP API to expose tools to AI agents.";
  }

  if (['cloud', 'devops', 'aws', 'gcp', 'terraform', 'docker', 'kubernetes'].some(k => q.includes(k))) {
    return "Shiva has deep cloud & DevOps skills including AWS, Google Cloud, Terraform, Docker, Kubernetes, Jenkins, and shell scripting. His GCP Cloud Infrastructure Suite project demonstrates end-to-end cloud architecture with Terraform IaC, Packer machine images, and serverless functions.";
  }

  if (['contact', 'email', 'reach', 'hire', 'connect'].some(k => q.includes(k))) {
    return "You can reach Shiva at dasi.s@northeastern.edu, connect on LinkedIn at linkedin.com/in/shiva-teja-dasi, or check out his GitHub at github.com/Shiva-017. There's also a contact form on this site at /contact.";
  }

  if (['skill', 'tech', 'stack', 'language', 'framework'].some(k => q.includes(k))) {
    return "Shiva's tech stack spans Python, Java, JavaScript, TypeScript, Golang, C#, and SQL. On the frontend he works with React, Angular, Next.js, and Flutter. Backend includes Node.js, Express, and .NET. He's also proficient in cloud/DevOps (AWS, GCP, Docker, K8s, Terraform) and databases (MySQL, MongoDB, Postgres, Redis, Elasticsearch).";
  }

  if (['project', 'portfolio', 'work', 'built', 'build'].some(k => q.includes(k))) {
    return "Shiva has 9 portfolio projects spanning AI (Mail Master, Image Captioning), cloud infrastructure (GCP suite), systems programming (Go-VCS, B+ Tree KV Store), mobile apps (WeQuiz with Flutter), full-stack web (College Compare), desktop (TaskMaster in JavaFX), and UI/UX design (RideEasy in Figma). Ask me about any specific one!";
  }

  if (['who', 'about', 'shiva', 'background', 'education'].some(k => q.includes(k))) {
    return "Shiva Teja Dasi is a Software Developer pursuing a Master's in Software Engineering Systems at Northeastern University. He specializes in full-stack development, cloud computing, AI/ML, and UX design. His work spans from building MCP-powered AI assistants to cloud infrastructure with Terraform to mobile apps with Flutter.";
  }

  return "I'm the AI assistant for Shiva Teja Dasi's portfolio. I can answer questions about his projects, skills, experience, and contact info. Try asking something like 'What AI projects has Shiva built?' or 'What's his tech stack?'";
}
