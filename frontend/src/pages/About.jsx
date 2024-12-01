import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 bg-gray-50 min-h-screen">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-lg text-gray-600 mb-4">
          Welcome to <span className="font-semibold text-gray-800">ShopEase</span>, your go-to online shopping destination. 
          We are dedicated to bringing you a seamless shopping experience with the best quality products at affordable prices.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          At ShopEase, we believe in making shopping easy, enjoyable, and reliable. Our platform features a wide range of 
          categories including electronics, fashion, home decor, beauty products, and more. Whether you're looking for the 
          latest trends or everyday essentials, we've got you covered.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          We pride ourselves on our commitment to customer satisfaction. With secure payment options, fast delivery, and 
          24/7 customer support, we aim to exceed your expectations every step of the way.
        </p>
        <p className="text-lg text-gray-600">
          Thank you for choosing ShopEase. Happy Shopping!
        </p>
      </div>
    </div>
  );
};

export default About;
