"use client"
import { skills } from "@/data"

import { Title, Paragraph, SectionTitle } from "./Documents.styles"


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
