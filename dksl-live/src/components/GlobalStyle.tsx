import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    * {
        box-sizing: border-box;
        font-family: 'Noto Sans KR', sans-serif !important;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    button {
        all: unset;
        text-align: center;
        font-size: inherit;
        &:focus {
          outline: none; 
        }
    }
`;

export default GlobalStyle;
