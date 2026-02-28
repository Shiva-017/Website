import usesBackgroundPlaceholder from '~/assets/uses-background-placeholder.jpg';
import usesBackground from '~/assets/uses-background.mp4';
import { Footer } from '~/components/footer';
import { Link } from '~/components/link';
import { List, ListItem } from '~/components/list';
import { Table, TableBody, TableCell, TableHeadCell, TableRow } from '~/components/table';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import styles from './uses.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Uses',
    description: 'A list of tools, software, and hardware I use to build things',
  });
};

export const Uses = () => {
  return (
    <>
      <ProjectContainer className={styles.uses}>
        <ProjectBackground
          src={usesBackground}
          placeholder={usesBackgroundPlaceholder}
          opacity={0.7}
        />
        <ProjectHeader
          title="Uses"
          description="The tools, software, and hardware I use day-to-day to design, code, and ship products. Always evolving."
        />
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Development</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  <ListItem>
                    <Link href="https://code.visualstudio.com/">VS Code</Link> is my
                    primary editor, with GitHub Copilot and the Tokyo Night theme.
                    I also use <Link href="https://cursor.sh/">Cursor</Link> for
                    AI-assisted development workflows.
                  </ListItem>
                  <ListItem>
                    <Link href="https://reactjs.org/">React</Link> and{' '}
                    <Link href="https://nextjs.org/">Next.js</Link> are my go-to
                    for frontend. For backend services I reach for Node.js,{' '}
                    <Link href="https://fastapi.tiangolo.com/">FastAPI</Link>, or
                    Go depending on the requirements.
                  </ListItem>
                  <ListItem>
                    For cloud infrastructure I use{' '}
                    <Link href="https://www.terraform.io/">Terraform</Link> and
                    Docker/Kubernetes, deploying primarily on AWS and GCP.
                    CI/CD pipelines run on GitHub Actions.
                  </ListItem>
                  <ListItem>
                    AI/ML work happens in Python with PyTorch, LangChain, and
                    LangGraph. For vector stores I use Pinecone and FAISS.
                    Graph databases with Neo4j.
                  </ListItem>
                  <ListItem>
                    <Link href="https://www.postman.com/">Postman</Link> for API
                    testing, <Link href="https://www.figma.com/">Figma</Link> for
                    design, and <Link href="https://www.atlassian.com/software/jira">JIRA</Link> for
                    project management.
                  </ListItem>
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>AI & Agent Tools</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  <ListItem>
                    <Link href="https://www.anthropic.com/">Claude</Link> and{' '}
                    <Link href="https://openai.com/">GPT-4</Link> for coding
                    assistance, code review, and brainstorming. I also build with
                    their APIs for production AI features.
                  </ListItem>
                  <ListItem>
                    <Link href="https://modelcontextprotocol.io/">MCP (Model Context Protocol)</Link>{' '}
                    for building AI agent systems. I've architected multi-tool MCP
                    servers and this portfolio itself uses the{' '}
                    <Link href="https://webmachinelearning.github.io/webmcp/">W3C WebMCP API</Link>.
                  </ListItem>
                  <ListItem>
                    <Link href="https://www.langchain.com/">LangChain</Link> and{' '}
                    <Link href="https://langchain-ai.github.io/langgraph/">LangGraph</Link>{' '}
                    for building RAG pipelines, multi-agent systems, and agentic workflows.
                  </ListItem>
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow stretch width="m">
              <ProjectSectionHeading>Hardware</ProjectSectionHeading>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHeadCell>Laptop</TableHeadCell>
                    <TableCell>MacBook Pro 14″</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Operating System</TableHeadCell>
                    <TableCell>macOS / Ubuntu (dual)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Terminal</TableHeadCell>
                    <TableCell>iTerm2 + zsh</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Browser</TableHeadCell>
                    <TableCell>Chrome (dev) / Arc (daily)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
