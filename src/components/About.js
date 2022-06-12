import { React, useEffect } from "react";

const About = () => {
  useEffect(() => {
    // a.update();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>About</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa facere
        dignissimos amet, possimus rem beatae? Doloribus, sequi, dolore
        voluptates assumenda perferendis sint fugiat voluptatibus eius,
        architecto obcaecati inventore?
      </p>
      <p>{/* Il s'applle {a.state.name}. Il a {a.state.age} ans. */}</p>
    </div>
  );
};

export default About;
