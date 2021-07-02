import React from "react";
import Computer from '../../images/code.jpg';

const Home = React.memo(() => {
  return (<>
    <div className="h-screen flex">
      <div className="m-auto flex flex-center">
        <img src={Computer} alt="" width="1400" />
      </div>
    </div>
    <h1 className="text-center text-4xl font-bold centered-text bg-light p-2">
    Welcome to Epistic Technologies
  </h1>
  </>);
})

export default Home;
