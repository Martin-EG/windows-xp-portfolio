"use client"
import { links } from "@/data"

import { Title, Paragraph, List } from "./Documents.styles"

export const ContactDocument = () => {
  return (
    <div>
      <Title>
        Let’s get in touch
      </Title>

      <Paragraph>
        I’m always happy to talk about new opportunities, frontend architecture, or interesting projects. The best way to reach me is by email.
      </Paragraph>

      <Paragraph>
        <List>
          <li>
            Email:{" "}
            <a href={links.email} style={{ textDecoration: 'underline' }}>
              martin.m.espericueta@gmail.com
            </a>
          </li>
          <li>
            LinkedIn:{" "}
            <a href={links.linkedIn} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
              linkedin.com/in/martin-espericueta
            </a>
          </li>
          <li>
            GitHub:{" "}
            <a href={links.gitHub} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
              github.com/Martin-EG
            </a>
          </li>
          <li>
            CV:{" "}
            <a href={links.cv} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
              Download PDF
            </a>
          </li>
        </List>
      </Paragraph>
    </div>
  )
}
