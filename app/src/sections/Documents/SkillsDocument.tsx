"use client"

import { Title, Paragraph, SectionTitle } from "./Documents.styles"

const skills = [
  {
    title: 'Frontend',
    description: 'React / NextJs, TypeScript, JavaScript (ES6+), HTML, CSS, Redux, Angular, A11y, Responsive Design'
  },
  {
    title: 'Architecture & Tooling',
    description: 'Component Libraries, Design Systems, Frontend Architecture, Web Performance, GraphQL, REST APIs, CI/ CD, Gi'
  },
  {
    title: 'Testing',
    description: 'Jest, React Testing Library'
  },
  {
    title: 'Backend',
    description: 'NodeJs, Express, NestJs, PHP'
  },
  {
    title: 'Databases',
    description: 'MongoDB, MySQL, PostgreSQL, GraphQL'
  },
  {
    title: 'Languages',
    description: ' Spanish (Native), English (Professional Working), French (Basic Conversational)'
  }
]

export const SkillsDocument = () => {
  return (
    <div>
      <Title>
        My skills
      </Title>

      {skills.map((skill, index) => (
        <Paragraph key={index}>
          <SectionTitle>{skill.title}</SectionTitle>
          {skill.description}
        </Paragraph>
      ))}
    </div>
  )
}
