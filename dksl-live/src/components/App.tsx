import React from "react";
import Router from "./Router";
import GlobalStyle from "./GlobalStyle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App: React.FC<{}> = () => {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
};

export default App;
