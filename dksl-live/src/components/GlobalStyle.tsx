import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    * {
        box-sizing: border-box;
        font-family: 'Noto Sans KR', sans-serif !important;
    }
    button {
        &:focus {
          outline: none; 
        }
    }
`;

export default GlobalStyle;
