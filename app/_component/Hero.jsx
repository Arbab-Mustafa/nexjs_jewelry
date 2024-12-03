import React from "react";

const Hero = () => {
  return (
    <div>
      <section className="relative bg-[url('https://img.freepik.com/premium-photo/closeup-sparkling-diamond-surrounded-by-smaller-diamonds-black-surface-with-warm-outoffocus-lights_417479-6201.jpg')] bg-no-repeat bg-cover bg-center  ">
        <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-[80vh] lg:items-center lg:px-8">
          <div className="max-w-xl text-center  mx-auto  "></div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
