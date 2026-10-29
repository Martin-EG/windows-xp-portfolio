"use client"
import { links } from "@/data"

import { Title, Paragraph, List, Link } from "./Documents.styles"

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
            <Link href={links.email}>
              martin.m.espericueta@gmail.com
            </Link>
          </li>
          <li>
            LinkedIn:{" "}
            <Link href={links.linkedIn} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/martin-espericueta
            </Link>
          </li>
          <li>
            GitHub:{" "}
            <Link href={links.gitHub} target="_blank" rel="noopener noreferrer">
              github.com/Martin-EG
            </Link>
          </li>
          <li>
            CV:{" "}
            <Link href={links.cv} target="_blank" rel="noopener noreferrer">
              Download PDF
            </Link>
          </li>
        </List>
      </Paragraph>
    </div>
  )
}
