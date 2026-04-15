import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ExperienceCard3D } from '~/components/experience-card';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

import home from '~/assets/home.png';
import rideeasy from '~/assets/RE1.png';
import login from '~/assets/login.png';
import wequiz from '~/assets/home.jpg';
import page1 from '~/assets/wequiz3.jpg';
import gcp from '~/assets/gcp.jpg';
import cao from '~/assets/cao.webp';
import govcs from '~/assets/govcs.jpg';
import kvstore from '~/assets/cover.webp';
import mailmaster from '~/assets/mm.png';
import sidekickImg from '~/assets/sidekick.webp';
import researchgptImg from '~/assets/ResearchGPT.png';

export const links = () => [
  { rel: 'prefetch', href: '/draco/draco_wasm_wrapper.js', as: 'script', type: 'text/javascript', importance: 'low' },
  { rel: 'prefetch', href: '/draco/draco_decoder.wasm', as: 'fetch', type: 'application/wasm', importance: 'low' },
];

export const meta = () => baseMeta({
  title: 'Software Engineer',
  description: `Portfolio of ${config.name} — a Software Engineer with 3+ years building scalable systems, AI integrations, and cloud infrastructure.`,
});

const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const projectsData = [
  { id: 'sidekick', title: 'Sidekick', description: 'AI-powered indoor navigation for visually impaired — 1-3m accuracy without GPS, voice-guided with Gemini AI.', image: sidekickImg, category: 'AI & ML', tags: ['React Native', 'Gemini AI', 'WebSocket'], link: 'https://github.com/shivateja-ab/sidekick-brain' },
  { id: 'researchgpt', title: 'ResearchGPT Pro', description: 'Multi-agent retrieval system indexing 25K+ papers with 7-stage hybrid RAG pipeline and 102K-node citation graph.', image: researchgptImg, category: 'AI & ML', tags: ['LangGraph', 'Neo4j', 'FastAPI'], link: 'http://3.148.70.244/', repoLink: 'https://github.com/Shiva-017/ResearchGPT-Pro' },
  { id: 'college-compare', title: 'College Compare', description: 'Platform to discover, compare, and choose colleges worldwide.', image: home, category: 'Full Stack', tags: ['React', 'Node.js', 'Education'], link: '/projects/smart-sparrow' },
  { id: 'mail-master', title: 'Mail Master', description: 'AI Gmail Assistant powered by LLMs and a custom MCP server.', image: mailmaster, category: 'AI & ML', tags: ['MCP', 'LLM', 'Python'], link: 'https://github.com/Shiva-017/Mail_Master' },
  { id: 'gcp-infra', title: 'GCP Cloud Suite', description: 'Automated cloud infrastructure with Terraform, Packer, and serverless.', image: gcp, category: 'Cloud & DevOps', tags: ['GCP', 'Terraform', 'Packer'], link: 'https://github.com/Shiva-017/webapp/' },
  { id: 'image-captioning', title: 'Image Captioning', description: 'CNN-RNN captioning with attention and multi-GPU training.', image: cao, category: 'AI & ML', tags: ['PyTorch', 'CNN', 'Attention'], link: 'https://github.com/Shiva-017/Caption-Generation-Model' },
  { id: 'go-vcs', title: 'Go-VCS', description: 'Git-like VCS built in Go with Merkle tree and AI commit messages.', image: govcs, category: 'Systems', tags: ['Go', 'AI', 'Merkle Tree'], link: 'https://github.com/Shiva-017/Go-VCS' },
  { id: 'rideeasy', title: 'RideEasy', description: 'UI/UX design and prototyping for a carpooling app.', image: rideeasy, category: 'Apps & Design', tags: ['Figma', 'UI/UX', 'Mobile'], link: 'https://www.figma.com/proto/Z4KTFvaMru2J0L7lKyISjF/RideEasy' },
  { id: 'wequiz', title: 'WeQuiz', description: 'Location-based trivia app built with Flutter and Firebase.', image: page1, category: 'Apps & Design', tags: ['Flutter', 'Firebase', 'Mobile'], link: 'https://github.com/Shiva-017/WeQuiz' },
  { id: 'taskmaster', title: 'TaskMaster', description: 'JavaFX task management app with MVC architecture.', image: login, category: 'Apps & Design', tags: ['Java', 'JavaFX', 'MVC'], link: '/projects/slice' },
  { id: 'kv-store', title: 'B+ Tree KV Store', description: 'High-performance key-value store focused on concurrency.', image: kvstore, category: 'Systems', tags: ['Python', 'B+ Tree', 'Concurrency'], link: 'https://github.com/Shiva-017/Go-VCS' },
];

const PROJECT_CATEGORIES = ['All', 'AI & ML', 'Cloud & DevOps', 'Full Stack', 'Systems', 'Apps & Design'];

const experienceData = [
  { company: 'Rebecca Everlene Trust Company', role: 'Software Engineer', duration: 'Aug 2025 - Present', current: true, tags: ['LangChain', 'MCP', 'Claude', 'Pinecone', 'FAISS'], highlights: ['Reduced admin tickets 45% by deploying RAG chatbot using LangChain and Pinecone across 5K+ queries', 'Architected MCP agent with Claude and 6 tool servers, auto-pairing mentors at 94% resolution', 'Increased engagement 40% by building AI recommendation engine using OpenAI embeddings and FAISS'], gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0ea5e9 150%)', accentColor: '#0ea5e9' },
  { company: 'Cimpress / Vistaprint', role: 'Software Engineer', duration: 'Jan 2022 - Aug 2023', current: false, tags: ['React', 'TypeScript', 'Kafka', 'WebAssembly', 'AWS'], highlights: ['Eliminated print complaints 35% with WebAssembly DPI validation and AI upscaling for 50K+ uploads/month', 'Accelerated enterprise onboarding from 3 weeks to 4 days with modular React/TypeScript microfrontends', 'Boosted profit margins 12% by developing Node.js pricing services with Kafka and Elasticsearch'], gradient: 'linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #8b5cf6 150%)', accentColor: '#8b5cf6' },
  { company: 'The 10X Academy', role: 'Full Stack Developer', duration: 'Aug 2019 - Dec 2021', current: false, tags: ['Next.js', 'Go', 'GraphQL', 'Kafka', 'Datadog'], highlights: ['Improved page load times 60% by migrating React to Next.js with SSR and Apollo caching for 10M+ users', 'Built Go-based GraphQL gateway with goroutines and DataLoader over Node.js microservices', 'Designed event-driven architecture using Kafka and SQS for real-time learner tracking', 'Reduced MTTR by 60% with distributed tracing via Datadog across 20+ microservices'], gradient: 'linear-gradient(135deg, #0a1628 0%, #1a2332 50%, #10b981 150%)', accentColor: '#10b981' },
];

const skillCategories = [
  { name: 'Languages', skills: [{ name: 'Python', icon: `${DI}/python/python-original.svg` }, { name: 'JavaScript', icon: `${DI}/javascript/javascript-original.svg` }, { name: 'TypeScript', icon: `${DI}/typescript/typescript-original.svg` }, { name: 'Go', icon: `${DI}/go/go-original-wordmark.svg` }, { name: 'Java', icon: `${DI}/java/java-original.svg` }, { name: 'C#', icon: `${DI}/csharp/csharp-original.svg` }, { name: 'PHP', icon: `${DI}/php/php-original.svg` }, { name: 'SQL', icon: `${DI}/azuresqldatabase/azuresqldatabase-original.svg` }, { name: 'HTML5', icon: `${DI}/html5/html5-original.svg` }, { name: 'CSS3', icon: `${DI}/css3/css3-original.svg` }] },
  { name: 'Front End', skills: [{ name: 'React', icon: `${DI}/react/react-original.svg` }, { name: 'Next.js', icon: `${DI}/nextjs/nextjs-original.svg` }, { name: 'Angular', icon: `${DI}/angularjs/angularjs-original.svg` }, { name: 'Vue.js', icon: `${DI}/vuejs/vuejs-original.svg` }, { name: 'Flutter', icon: `${DI}/flutter/flutter-original.svg` }, { name: 'Tailwind', icon: `${DI}/tailwindcss/tailwindcss-original.svg` }, { name: 'Material UI', icon: `${DI}/materialui/materialui-original.svg` }, { name: 'WebGL', icon: `${DI}/threejs/threejs-original.svg` }, { name: 'Webpack', icon: `${DI}/webpack/webpack-original.svg` }] },
  { name: 'Back End', skills: [{ name: 'Node.js', icon: `${DI}/nodejs/nodejs-original.svg` }, { name: 'Express', icon: `${DI}/express/express-original.svg` }, { name: 'FastAPI', icon: `${DI}/fastapi/fastapi-original.svg` }, { name: 'Django', icon: `${DI}/django/django-plain.svg` }, { name: 'Spring', icon: `${DI}/spring/spring-original.svg` }, { name: 'Kafka', icon: `${DI}/apachekafka/apachekafka-original.svg` }, { name: 'RabbitMQ', icon: `${DI}/rabbitmq/rabbitmq-original.svg` }, { name: 'GraphQL', icon: `${DI}/graphql/graphql-plain.svg` }] },
  { name: 'Cloud & DevOps', skills: [{ name: 'AWS', icon: `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg` }, { name: 'GCP', icon: `${DI}/googlecloud/googlecloud-original.svg` }, { name: 'Azure', icon: `${DI}/azure/azure-original.svg` }, { name: 'Docker', icon: `${DI}/docker/docker-original.svg` }, { name: 'Kubernetes', icon: `${DI}/kubernetes/kubernetes-original.svg` }, { name: 'Terraform', icon: `${DI}/terraform/terraform-original.svg` }, { name: 'Jenkins', icon: `${DI}/jenkins/jenkins-original.svg` }, { name: 'GitHub Actions', icon: `${DI}/githubactions/githubactions-original.svg` }, { name: 'Linux', icon: `${DI}/linux/linux-original.svg` }, { name: 'Git', icon: `${DI}/git/git-original.svg` }] },
  { name: 'Database', skills: [{ name: 'PostgreSQL', icon: `${DI}/postgresql/postgresql-original.svg` }, { name: 'MySQL', icon: `${DI}/mysql/mysql-original.svg` }, { name: 'MongoDB', icon: `${DI}/mongodb/mongodb-original.svg` }, { name: 'DynamoDB', icon: `${DI}/dynamodb/dynamodb-original.svg` }, { name: 'Neo4j', icon: `${DI}/neo4j/neo4j-original.svg` }, { name: 'Redis', icon: `${DI}/redis/redis-original.svg` }] },
  { name: 'AI / ML & Agents', skills: [{ name: 'PyTorch', icon: `${DI}/pytorch/pytorch-original.svg` }, { name: 'TensorFlow', icon: `${DI}/tensorflow/tensorflow-original.svg` }, { name: 'HuggingFace', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' }, { name: 'LangChain', icon: `${DI}/langchain/langchain-original.svg` }, { name: 'OpenAI', icon: `${DI}/openai/openai-original.svg` }] },
];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const details = useRef();
  const [projectFilter, setProjectFilter] = useState('All');
  const [activeSkillCat, setActiveSkillCat] = useState(0);

  const filteredProjects = projectFilter === 'All' ? projectsData : projectsData.filter(p => p.category === projectFilter);

  useEffect(() => {
    const sections = [intro, details];
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          if (visibleSections.includes(entry.target)) return;
          setVisibleSections((prev) => [...prev, entry.target]);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    const indicatorObserver = new IntersectionObserver(([entry]) => setScrollIndicatorHidden(!entry.isIntersecting), { rootMargin: '-100% 0px 0px 0px' });
    sections.forEach((s) => { if (s.current) sectionObserver.observe(s.current); });
    if (intro.current) indicatorObserver.observe(intro.current);
    return () => { sectionObserver.disconnect(); indicatorObserver.disconnect(); };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro id="intro" sectionRef={intro} scrollIndicatorHidden={scrollIndicatorHidden} />

      {/* ─── Experience (3D Cards) ──────────────────────── */}
      <section className={styles.experienceSection} id="experience">
        <h2 className={styles.sectionHeading}>Experience</h2>
        <p className={styles.sectionSubheading}>3+ years building at scale — hover to tilt, click to flip</p>
        <div className={styles.expGrid}>
          {experienceData.map((exp, i) => <ExperienceCard3D key={i} exp={exp} />)}
        </div>
      </section>

      {/* ─── Projects (filterable grid) ────────────────── */}
      <section className={styles.projectsSection} id="project-1">
        <h2 className={styles.sectionHeading}>Projects</h2>
        <p className={styles.sectionSubheading}>From AI agents to cloud infrastructure to mobile apps</p>
        <div className={styles.projectFilters}>
          {PROJECT_CATEGORIES.map(cat => (
            <button key={cat} className={styles.filterButton} data-active={projectFilter === cat} onClick={() => setProjectFilter(cat)}>
              {cat}
              {cat !== 'All' && <span className={styles.filterCount}>{projectsData.filter(p => p.category === cat).length}</span>}
            </button>
          ))}
        </div>
        <div className={styles.projectGrid}>
          {filteredProjects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <a href={project.link} className={styles.projectCardLink}
                target={project.link.startsWith('http') ? '_blank' : undefined}
                rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}>
                <div className={styles.projectImageWrap}>
                  <img src={project.image} alt={project.title} className={styles.projectImage} loading="lazy" />
                  <div className={styles.projectOverlay}>
                    <span className={styles.projectCategory}>{project.category}</span>
                  </div>
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                </div>
              </a>
              <div className={styles.projectFooter}>
                <div className={styles.projectTags}>
                  {project.tags.map(tag => <span key={tag} className={styles.projectTag}>{tag}</span>)}
                </div>
                {project.repoLink && (
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className={styles.projectRepoLink} onClick={(e) => e.stopPropagation()}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Skills (with logos) ────────────────────────── */}
      <section className={styles.skillsSection} id="skills">
        <h2 className={styles.sectionHeading}>Skills</h2>
        <div className={styles.skillCatTabs}>
          {skillCategories.map((cat, i) => (
            <button key={cat.name} className={styles.skillCatTab} data-active={activeSkillCat === i} onClick={() => setActiveSkillCat(i)}>{cat.name}</button>
          ))}
        </div>
        <div className={styles.skillLogoGrid}>
          {skillCategories[activeSkillCat].skills.map((skill, j) => (
            <div key={skill.name} className={styles.skillLogoCard} style={{ animationDelay: `${j * 0.05}s` }}>
              <div className={styles.skillLogoWrap}>
                <img src={skill.icon} alt={skill.name} className={styles.skillLogo} loading="lazy" />
              </div>
              <span className={styles.skillLogoName}>{skill.name}</span>
            </div>
          ))}
        </div>
      </section>

      <Profile sectionRef={details} visible={visibleSections.includes(details.current)} id="details" />
      <Footer />
    </div>
  );
};
