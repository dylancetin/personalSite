import { AnimatePresence } from "motion/react";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContentWithoutAnimation,
  DialogTitle,
} from "../ui/dialog";

export function ProjectCards() {
  const [activeId, setActiveId] = useState<number | undefined>();
  return (
    <>
      <AnimatePresence>
        <div className="grid grid-cols-7 gap-2">
          {projects.map((e, i) => (
            <Card
              key={`card-${i}`}
              id={i}
              setActiveId={setActiveId}
              project={e}
            />
          ))}
        </div>
        {activeId !== undefined ? (
          <CardDialog activeId={activeId} setActiveId={setActiveId} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Card({
  project,
  id,
  setActiveId,
}: {
  project: (typeof projects)[number];
  id: number;
  setActiveId: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  return (
    <div
      className={`rounded-lg relative overflow-hidden ${["col-span-4", "col-span-3", "col-start-3 col-span-3"][id]}`}
    >
      <div className="w-full h-80 relative block pointer-events-none">
        <motion.div
          className="relative w-full h-full mx-auto pointer-events-auto"
          layoutId={`card-container-${id}`}
        >
          <motion.div
            className="absolute top-0 left-0 overflow-hidden"
            layoutId={`card-image-container-${id}`}
          >
            <img
              className="w-full h-full object-cover object-top-left"
              src={project.photo}
              alt=""
            />
          </motion.div>
          <motion.div
            className="absolute top-[15px] left-[15px] max-w-[300px]"
            layoutId={`title-container-${id}`}
          >
            <h2 className="text-white my-2">{project.title}</h2>
          </motion.div>
        </motion.div>
      </div>
      <div onClick={() => setActiveId(id)} className="absolute inset-0" />
    </div>
  );
}

export function CardDialog({
  activeId,
  setActiveId,
}: {
  activeId: number;
  setActiveId: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  const activeProject = projects[activeId];
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        style={{ pointerEvents: "auto" }}
        className="fixed inset-0 z-10 w-full max-w-[990px] -translate-x-1/2 bg-black/80 will-change-opacity md:left-1/2"
        onClick={() => setActiveId(undefined)}
      ></motion.div>
      <div className="fixed inset-x-0 top-0 z-10 overflow-hidden py-10 text-black">
        <motion.div
          className="relative w-full h-full mx-auto rounded-[20px] bg-[#1c1c1e] overflow-hidden pointer-events-auto"
          layoutId={`card-container-${activeId}`}
        >
          <motion.div
            className="absolute top-0 left-0 w-screen h-[420px] overflow-hidden"
            layoutId={`card-image-container-${activeId}`}
          >
            <img
              className="w-full h-full object-cover"
              src={activeProject.photo}
              alt=""
            />
          </motion.div>

          <motion.div
            className="absolute top-[15px] left-[15px] max-w-[300px]"
            layoutId={`title-container-${activeId}`}
          >
            <h2 className="text-white my-2">{activeProject.title}</h2>
          </motion.div>

          <motion.div className="pt-[460px] px-[35px] pb-[35px] max-w-[700px] w-[90vw] bg-flexoki-base-50">
            <activeProject.content />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

const projects = [
  {
    title: "Kullanışlı Admin Paneli",
    photo: "/images/admin-panel-generic.png",
    content: () => {
      return <div>hi</div>;
    },
  },
  {
    title: "Video Çözüm",
    photo: "/images/hizli-cozum.png",
    content: () => {
      return <div>hi</div>;
    },
  },
  {
    title: "PDF-Anki",
    photo: "/images/pdf-anki.png",
    content: () => {
      return <div>hi</div>;
    },
  },
];
