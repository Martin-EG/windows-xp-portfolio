"use client"

import styled from "styled-components";

export const StyledDesktop = styled.div`
    background-image: url("/images/windows-xp-background.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    height: 95svh;
`

export const ProgramsContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 5px;
    overflow-y: hidden;
`
