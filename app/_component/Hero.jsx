import React from "react";

const Hero = () => {
  return (
    <div>
      <section className="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-[80vh] lg:items-center lg:px-8">
          <div className="max-w-xl text-center  mx-auto  ">
            <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
              Radiate with Natural Diamonds
              <strong className="block font-extrabold text-rose-500">
                Timeless Beauty, Crafted for You
              </strong>
            </h1>

            <div className="mt-8 flex flex-wrap gap-4 text-center justify-center">
              <a
                href="/products"
                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Explore Our Collection
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
