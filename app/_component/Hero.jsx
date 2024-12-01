import React from "react";

const Hero = () => {
  return (
    <div>
      <section className="relative bg-[url('https://www.lotuscolors.net/content/images/slider.jpg')] bg-no-repeat bg-cover bg-center  ">
        <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-[80vh] lg:items-center lg:px-8">
          <div className="max-w-xl text-center  mx-auto  ">
            {/* <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
              Radiate with Natural Diamonds
              <strong className="block font-extrabold text-rose-500">
                Timeless Beauty, Crafted for You
              </strong>
            </h1> */}

            {/* <div className="mt-8 flex flex-wrap gap-4 text-center justify-center">
              <a
                href="/jewelry"
                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Explore Our Collection
              </a>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
