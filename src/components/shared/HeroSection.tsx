import React from "react";
import { Button } from "../ui/button";

const HeroSection: React.FC = () => {
  return (
    <section
      className="flex items-center justify-start relative py-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(213, 122, 102, 0.9), rgba(245, 230, 211, 0.9)), 
        url("https://res.cloudinary.com/devgodfrey/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1742961439/house-chaincart_hdvbqw.jpg")`,
      }}
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="bg-white/80 backdrop-blur-sm p-6 md:p-10 rounded-lg max-w-lg shadow-lg">
          <h1 className="!text-xl md:!text-3xl lg:!text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Dream Home with Ease
          </h1>
          <Button
            variant="default"
            className="text-white px-6 py-3  lg:text-lg font-medium rounded-md bg-primary hover:bg-primary/90 transition-all duration-300"
            aria-label="Shop Now"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
