import gamestackTexture2Large from '~/assets/gamestack-list-large.jpg';
import gamestackTexture2Placeholder from '~/assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from '~/assets/gamestack-list.jpg';
import gamestackTextureLarge from '~/assets/gamestack-login-large.jpg';
import gamestackTexturePlaceholder from '~/assets/gamestack-login-placeholder.jpg';
import gamestackTexture from '~/assets/gamestack-login.jpg';
import sliceTextureLarge from '~/assets/slice-app-large.jpg';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import sliceTexture from '~/assets/slice-app.jpg';
import sprTextureLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
import sprTexturePlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from '~/assets/spr-lesson-builder-dark.jpg';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';
import home from '~/assets/home.png';
import rideeasy from '~/assets/RE1.png';
import rideeasy2 from '~/assets/RE2.png';
import login from '~/assets/login.png';
import wequiz from "~/assets/home.jpg";
import logo from "~/assets/wequizlogo.png"
import page1 from "~/assets/wequiz3.jpg";
import gcp from "~/assets/gcp.jpg";
import cao from "~/assets/cao.webp";
import govcs from "~/assets/govcs.jpg";
import kvstore from "~/assets/cover.webp";


// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Designer + Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const projectFive = useRef();
  const projectSix = useRef();
  const projectSeven = useRef();
  const projectEight = useRef();
  const projectNine = useRef();
  const details = useRef();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const skillData = {
    Languages: ["Python", "Java", "JavaScript", "TypeScript", "Golang", "C#", "SQL"],
    "Front End": ["HTML", "CSS", "Angular", "React", "Next.js", "Flutter", "Redux", "WebSocket", "PWA"],
    "Back End": ["Node.js", "Express", ".NET", "JWT", "OAuth 2.0", "RESTful API"],
    "Cloud & DevOps": ["AWS", "Google Cloud", "Jenkins", "Linux", "Kubernetes", "Docker", "Terraform", "Shell Scripting", "Git"],
    Database: ["MySQL", "Elasticsearch", "MongoDB", "Postgres", "Redis"],
    "Tools & Technologies": ["VS Code", "Android Studio", "Postman", "GitLab", "Swagger", "JIRA", "MIRO", "Figma", "Excel", "Fusion 360"],
  };


  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, projectFour, projectFive, projectSix, projectSeven, projectEight, projectNine, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections((prevSections) => [...prevSections, section]);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: "-100% 0px 0px 0px" }
    );

    sections.forEach((section) => {
      if (section.current) {
        sectionObserver.observe(section.current);
      }
    });

    if (intro.current) {
      indicatorObserver.observe(intro.current);
    }

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Empowering Global Education Journeys"
        description="Building a platform to help students discover, compare, and choose their ideal college worldwide."
        buttonText="View project"
        buttonLink="/projects/smart-sparrow"
        model={{
          type: 'laptop',
          alt: 'Building a platform to help students discover, compare, and choose their ideal college worldwide.',
          textures: [
            {
              srcSet: `${home} 1280w, ${home} 2560w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Carpooling App Design"
        description="UI/UX design and prototyping for a carpooling app, created in Figma."
        buttonText="View website"
        buttonLink="https://www.figma.com/proto/Z4KTFvaMru2J0L7lKyISjF/RideEasy?node-id=8-37&t=LW8v8sQY64zcrQGF-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2&show-proto-sidebar=1"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: `${rideeasy} 375w, ${rideeasy} 750w`,
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: `${rideeasy2} 375w, ${rideeasy2} 750w`,
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        alternate
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="We Quiz - A Multiplayer Mobile App"
        description="We Quiz is a multiplayer trivia app where players compete in real-time, track progress on leaderboards, and enjoy personalized quizzes. Built with Flutter and Firebase, it delivers a fast, secure, and engaging experience."
        buttonText="View Repository"
        buttonLink="https://github.com/Shiva-017/WeQuiz.git"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: `${page1} 375w, ${page1} 750w`,
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: `${wequiz} 375w, ${wequiz} 750w`,
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title="Task Management Application"
        description="TaskMaster is a JavaFX-based app for creating, managing, and tracking tasks with an MVC architecture."
        buttonText="View project"
        buttonLink="/projects/slice"
        model={{
          type: 'laptop',
          alt: 'TaskMaster is a JavaFX-based app for creating, managing, and tracking tasks with an MVC architecture.',
          textures: [
            {
              srcSet: `${login} 800w, ${login} 1920w`,
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />

      <ProjectSummary
        id="project-5"
        sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)}
        index={5}
        title="GCP Cloud Infrastructure Suite"
        description="This project leverages GCP Cloud as the backbone to architect a web application optimized for scalability, robust security, and seamless availability."
        buttonText="Web App Machine Image (Packer)"
        buttonLink="https://github.com/Shiva-017/webapp/"
        secondButtonText="Infrastructure code (Terraform)"
        secondButtonLink="https://github.com/Shiva-017/tf-gcp-infra"
        ThirdButtonText="Email verification (Serverless)"
        ThirdButtonLink="https://github.com/Shiva-017/serverless"
        model={{
          type: 'laptop',
          alt: 'This project leverages GCP Cloud as the backbone to architect a web application optimized for scalability, robust security, and seamless availability.',
          textures: [
            {
              srcSet: `${gcp} 800w, ${gcp} 1920w`,
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />

      <ProjectSummary
        id="project-6"
        sectionRef={projectSix}
        visible={visibleSections.includes(projectSix.current)}
        index={6}
        title="Image Captioning with multi-GPU Training"
        description="Optimized CNN-RNN image captioning with attention and multi-GPU training."
        buttonText="View project"
        buttonLink="https://github.com/Shiva-017/Caption-Generation-Model"
        model={{
          type: 'laptop',
          alt: 'Optimized CNN-RNN image captioning with attention and multi-GPU training.',
          textures: [
            {
              srcSet: `${cao} 800w, ${cao} 1920w`,
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-7"
        sectionRef={projectSeven}
        visible={visibleSections.includes(projectSeven.current)}
        index={7}
        title="Go-VCS - Version Control System"
        description="A Git like versioning system built in Go using Merkle tree, with AI generated commit messages"
        buttonText="View project"
        buttonLink="https://github.com/Shiva-017/Go-VCS"
        model={{
          type: 'laptop',
          alt: 'A Git like versioning system built in Go, with AI generated commit messages',
          textures: [
            {
              srcSet: `${govcs} 800w, ${govcs} 1920w`,
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />

      <ProjectSummary
        id="project-7"
        sectionRef={projectEight}
        visible={visibleSections.includes(projectEight.current)}
        index={8}
        title="B+ Tree Key Value Store"
        description="A B+ tree key-value store with a focus on concurrency and performance, built in Python."
        buttonText="View project"
        buttonLink="https://github.com/Shiva-017/Go-VCS"
        model={{
          type: 'laptop',
          alt: 'B+ tree key-value store with a focus on concurrency and performance, built in Python.',
          textures: [
            {
              srcSet: `${kvstore} 800w, ${kvstore} 1920w`,
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      {/* <WorkExperience /> */}
      <div className={styles.skillsSection}>
        <h2 className={styles.skillsTitle}>Skills</h2>
        <div className={styles.categories}>
          {Object.keys(skillData).map((category) => (
            <button
              key={category}
              className={styles.categoryButton}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.skillsList}>
          {selectedCategory &&
            skillData[selectedCategory].map((skill, index) => (
              <div
                key={skill}
                className={`${styles.skillItem} ${selectedCategory ? styles.animateSkill : ""
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {skill}
              </div>
            ))}
        </div>
      </div>
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
