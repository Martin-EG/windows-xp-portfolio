"use client"
import { skills } from "@/data"

import { Title, Paragraph, SectionTitle } from "./Documents.styles"


export const SkillsDocument = () => {
  return (
    <div>
      <Title>
        My skills
      </Title>

      {skills.map((skill) => (
        <Paragraph key={skill.title}>
          <SectionTitle>{skill.title}</SectionTitle>
          {skill.description}
        </Paragraph>
      ))}
    </div>
  )
}
