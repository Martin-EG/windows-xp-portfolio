"use client"
import { experiences, links } from "@/data"

import { Title, Paragraph, SectionTitle, List, Link, Closing } from "./Documents.styles"

export const ExperienceDocument = () => {
  return (
    <div>
      <Title>
        My professional experience
      </Title>

      {experiences.map((experience) => (
        <Paragraph key={`${experience.company}-${experience.date}`}>
          <SectionTitle>{experience.company}</SectionTitle>
          {experience.position}  • {experience.date}
          <List>
            {experience.description.map((description) => (
              <li key={description}>{description}</li>
            ))}
          </List>
        </Paragraph>
      ))}

      <Closing>
        For more information, please visit my{" "}
        <Link href={links.linkedIn} target="_blank" rel="noopener noreferrer">
          LinkedIn profile
        </Link> or{" "}
        <Link href={links.cv} target="_blank" rel="noopener noreferrer">
          CV
        </Link>
      </Closing>
    </div>
  )
}
