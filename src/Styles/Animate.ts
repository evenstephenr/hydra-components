import { keyframes } from "styled-components";

export const example_color_transition = (
  from: string = "red",
  to: string = "blue"
) => keyframes`
  from {background-color: ${from};}
  to {background-color: ${to};}
`;

export const slideLeft = (translateX: number) =>
  keyframes`
  to { 
    transform: translateX(${translateX}px);
  }
`;
