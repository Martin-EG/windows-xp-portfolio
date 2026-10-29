"use client"

import styled, { css } from "styled-components";

export const ShortcutBody = styled.div`
  width: 135px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  flex-direction: column;
  color: white;
  font-size: 14px;
`

interface SelectableProps {
  readonly $isSelected: boolean;
}

export const ShortcutIcon = styled.span<SelectableProps>`
  display: flex;

  /* XP tints a selected icon blue */
  ${props => props.$isSelected && css`
    filter: brightness(0.75) sepia(1) hue-rotate(185deg) saturate(4);
  `}
`

export const ShortcutLabel = styled.span<SelectableProps>`
  padding: 0 3px;
  text-shadow: ${props => props.$isSelected ? "none" : "1px 1px 1px rgba(0, 0, 0, 0.9)"};
  background-color: ${props => props.$isSelected ? "#0B61FF" : "transparent"};
`

const shortcutTarget = css`
  width: 135px;
  height: 75px;
  user-select: none;
`

export const ShortcutButton = styled.button`
  ${shortcutTarget}
`

export const ShortcutLink = styled.a`
  ${shortcutTarget}
`
