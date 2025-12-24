"use client"
import { experiences } from "@/data"

import { Title, Paragraph, SectionTitle, List } from "./Documents.styles"

export const ExperienceDocument = () => {
  return (
    <div>
      <Title>
        My profesional experience
      </Title>

      {experiences.map((experience, index) => (
        <Paragraph key={index}>
          <SectionTitle>{experience.company}</SectionTitle>
          {experience.position}  • {experience.date}
          <List>
            {experience.description.map((description, index) => (
              <li key={index}>{description}</li>
            ))}
          </List>
        </Paragraph>
      ))}

      <Paragraph style={{ fontWeight: 'bold' }}>
        For more information, please visit my LinkedIn profile or CV
      </Paragraph>
    </div>
  )
}
