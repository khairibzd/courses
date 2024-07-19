import React from "react";

type Props = {};

const Heading = (props: Props) => {
  return (
    <main>
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-5xl pt-16 sm:pt-40 sm:pb-24">
          <div className="text-center">
            <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-75px md:4px">
              Elevate your tech journey <br /> with expert-led lessons
            </h1>
            <p className="mt-6 text-lg leading-8 text-black">
              Gain expertise through our courses and guidance from industry
              leaders.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Heading;
