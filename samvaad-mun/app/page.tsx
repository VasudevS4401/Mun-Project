"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";


const HomePage: React.FC = () => {
  const [showSecretariat, setShowSecretariat] = useState(false);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <section className="h-screen relative">
        <Image
          src="/hero.jpg"
          alt="Conference Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white text-5xl md:text-7xl font-bold"
          >
            MUN Conference 2025
          </motion.h1>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen flex items-center px-10 md:px-20 py-20 bg-gray-50">
        <div className="flex flex-col md:flex-row items-center gap-10 w-full">
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/Samvaad.png"
              alt="Logo"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
          <div className="md:w-1/2 bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to the MUN Conference 2025. Delegates from across the
              world come together to discuss pressing global issues and develop
              innovative solutions through diplomacy.
            </p>
          </div>
        </div>
      </section>

      {/* Committees Section */}
      <section className="min-h-screen bg-white py-20 px-10 md:px-20">
        <h2 className="text-4xl font-bold text-center mb-12">Committees</h2>
        <Slider {...carouselSettings}>
          {committees.map((c, i) => (
            <div key={i} className="px-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src={c.img}
                  alt={c.name}
                  width={400}
                  height={250}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 hover:opacity-100 transition flex flex-col justify-center items-center text-white p-6 text-center">
                  <h3 className="text-2xl font-semibold mb-2">{c.name}</h3>
                  <p>{c.desc}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Secretariat Section */}
      <section className="min-h-[40vh] py-20 px-10 md:px-20 bg-gray-100">
        <div className="text-center mb-8">
          <button
            onClick={() => setShowSecretariat(!showSecretariat)}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center mx-auto gap-2"
          >
            {showSecretariat ? "Hide Secretariat" : "Meet the Secretariat"}
            {showSecretariat ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>

        {showSecretariat && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {secretariat.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center"
              >
                <Image
                  src={s.img}
                  alt={s.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover mb-4"
                />
                <h4 className="font-bold text-lg">{s.name}</h4>
                <p className="text-sm text-gray-600">{s.position}</p>
              </div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

// Example data
const committees = [
  { name: "UNSC", desc: "Security Council discussions", img: "/committee1.jpg" },
  { name: "UNHRC", desc: "Human Rights Council", img: "/committee2.jpg" },
  { name: "WHO", desc: "World Health Organization", img: "/committee3.jpg" },
];

const secretariat = [
  { name: "Alice", position: "Secretary-General", img: "/alice.jpg" },
  { name: "Bob", position: "Deputy SG", img: "/bob.jpg" },
  { name: "Clara", position: "USG PR", img: "/clara.jpg" },
  { name: "David", position: "USG Media", img: "/david.jpg" },
];


export default HomePage;
