"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

const committees = [
  { name: "UNSC", desc: "Security Council discussions", img: "/UNSC.png" },
  { name: "UNHRC", desc: "Human Rights Council", img: "/UNHC.png" },
  { name: "WHO", desc: "World Health Organization", img: "/WHO.png" },
  { name: "UNDP", desc: "Development Programme", img: "/undp.png" },
  { name: "UNESCO", desc: "Education, Science, Culture", img: "/unesco.png" },
];

const secretariat = [
  { name: "Alice", position: "Secretary-General", img: "/alice.jpg" },
  { name: "Bob", position: "Deputy SG", img: "/bob.jpg" },
  { name: "Clara", position: "USG PR", img: "/clara.jpg" },
  { name: "David", position: "USG Media", img: "/david.jpg" },
];

const HomePage: React.FC = () => {
  const [showSecretariat, setShowSecretariat] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <section className="w-full h-screen relative m-0 p-0 overflow-hidden">
        <Image
          src="/hero.png"
          alt="Conference Hero"
          fill
          priority
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white text-5xl md:text-7xl font-bold text-center px-4 drop-shadow-lg"
          >
            MUN Conference 2025
          </motion.h1>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-20 gap-10"
      >
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/Samvaad.png"
            alt="Logo"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
        <div className="md:w-1/2 shadow-lg rounded-2xl p-8 text-center md:text-left bg-white">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to the MUN Conference 2025. Delegates from across the world
            come together to discuss pressing global issues and develop
            innovative solutions through diplomacy.
          </p>
        </div>
      </motion.section>

      {/* Committees Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6 md:px-20"
      >
        <h2 className="text-4xl font-bold text-center mb-12">Committees</h2>

        {isMobile ? (
          <>
            <Slider {...carouselSettings} ref={sliderRef}>
              {committees.map((c, i) => (
                <div key={i} className="flex justify-center px-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative rounded-2xl overflow-hidden shadow-lg flex flex-col items-center"
                  >
                    <div className="w-64 aspect-[3/4] relative">
                      <Image
                        src={c.img}
                        alt={c.name}
                        width={250}
                        height={400}
                        className="object-cover rounded-2xl"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/70 opacity-0 hover:opacity-100 transition flex flex-col justify-center items-center text-white p-6 text-center">
                      <h3 className="text-2xl font-semibold mb-2">{c.name}</h3>
                      <p>{c.desc}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </Slider>

            {/* Mobile Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-6 md:hidden">
              {committees.map((c, i) => (
                <button
                  key={i}
                  className="bg-indigo-100 text-indigo-800 font-semibold rounded-lg hover:bg-indigo-200 transition px-4 py-2 text-sm"
                  onClick={() => sliderRef.current?.slickGoTo(i)}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-8">
            {committees.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src={c.img}
                  alt={c.name}
                  width={250}
                  height={350}
                  className="object-cover w-full h-full rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 hover:opacity-100 transition flex flex-col justify-center items-center text-white p-6 text-center">
                  <h3 className="text-2xl font-semibold mb-2">{c.name}</h3>
                  <p>{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Secretariat Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-100">
        <div className="text-center mb-8">
          <button
            onClick={() => setShowSecretariat(!showSecretariat)}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center mx-auto gap-2 hover:bg-blue-700 transition"
          >
            {showSecretariat ? "Hide Secretariat" : "Meet the Secretariat"}
            {showSecretariat ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>

        {showSecretariat && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {secretariat.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="rounded-2xl shadow-md p-6 flex flex-col items-center text-center bg-white"
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
