"use client"

import { Title, Paragraph, SectionTitle, List } from "./Documents.styles"

const experiences = [
  {
    company: "Microsoft",
    position: "Software Engineer II",
    date: "January 2022 - October 2025",
    description: [
      "Delivered Storyline features adopted by 5.7M+ MAUs, contributing to one of Viva’s most successful launches.",
      "Led development of Storyline Announcements, achieving 245K MAU and 98% retention",
      "Boosted Viva Answers engagement by 38% MAU through translation, topic discovery & content filtering",
      "Stack: React, TypeScript, GraphQL, Relay, Redux, Jest, REST APIs, Accessibility (WCAG 2.1)"
    ]
  },
  {
    company: "Commscope",
    position: "Sr Software Engineer",
    date: "November 2021 - January 2022",
    description: [
      "Migrated legacy Java system to an Angular web platform.",
      "Built reusable UI components & responsive layouts aligned with UX standards.",
      "Improved reliability through QA collaboration and consistent API integration.",
      "Stack: Angular, Typescript, RxJS, Jest."
    ]
  },
  {
    company: "Martech Medical Products",
    position: "Software Development Engineer",
    date: "May 2021 - November 2021",
    description: [
      "Built internal tools automating manual workflows across departments.",
      "Delivered a Cost Request System reducing engineering-to-cost communication time by 40%",
      "Developed and maintained Scientific Molding Calculator used for manufacturing optimization.",
      "Stack: JavaScript, PHP, React, NodeJS"
    ]
  }
]

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
