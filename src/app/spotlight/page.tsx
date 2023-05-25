// Credits to BuildUI Spotlight component: https://buildui.com/recipes/spotlight
"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

export default function SpotlightPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <Spotlight />
    </main>
  );
}

export function Spotlight() {
  // Motion values track the state and velocity of animating values.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    // currentTarget refers to the HTML element that is currently handling an event
    // The getBoundingClientRect method returns a DOMRect object, which contains information about the size of an element and its position relative to the viewport.
    // The returned object includes values for left, top, right, bottom, x, y, width, and height.

    // Left and top, represent the X and Y coordinates, respectively, of the top-left corner of the currentTarget element relative to the viewport.
    const { left, top } = currentTarget.getBoundingClientRect();

    // clientX and clientY: These values represent the X and Y coordinates of the mouse cursor relative to the viewport when the mouse event was triggered.

    // By subtracting left from clientX and top from clientY, the resulting values are the X and Y coordinates of the mouse cursor relative to the top-left corner of the element, not the entire viewport. This effectively gives you the position of the mouse within the element, which is used to control the "spotlight" effect in the component's rendering.
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative max-w-md rounded-xl border border-white/10 bg-gray-900 px-8 py-16 shadow-2xl"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(141, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div>
        <h3 className="text-base font-semibold leading-7 text-sky-500">
          Byline
        </h3>
        <div className="mt-2 flex items-center gap-x-2">
          <span className="text-5xl font-bold tracking-tight text-white">
            Hero
          </span>
        </div>
        <p className="mt-6 text-base leading-7 text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis illum
          eum ullam nostrum atque quam.
        </p>
      </div>
    </div>
  );
}
