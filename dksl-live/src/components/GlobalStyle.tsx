import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    * {
        box-sizing: border-box;
        font-family: 'Noto Sans KR', sans-serif !important;
        overflow-x: hidden;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    button {
        &:focus {
          outline: none; 
        }
    }
`;

export default GlobalStyle;
