import { AnimatePresence } from "motion/react";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContentWithoutAnimation,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { ExpandIcon, LinkIcon, ShrinkIcon, XIcon } from "lucide-react";

export function ProjectCards() {
  const [activeId, setActiveId] = useState<number | undefined>();
  return (
    <>
      <AnimatePresence mode="popLayout">
        <div className="flex flex-wrap flex-col sm:flex-row">
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
      className={`rounded-lg relative overflow-hidden p-2 w-full ${["flex-1 sm:flex-1/3", "flex-1 sm:flex-1/2", "flex-1 sm:flex-1/3"][id]}`}
      onClick={() => setActiveId(id)}
    >
      <div className="w-full h-100 sm:h-80 md:h-120 relative block pointer-events-none">
        <motion.div
          className="relative w-full h-full mx-auto rounded-lg bg-flexoki-base-50 overflow-hidden pointer-events-auto"
          layoutId={`card-container-${id}`}
        >
          <motion.div
            className="absolute top-0 left-0 inset-0 overflow-hidden"
            layoutId={`card-image-container-${id}`}
          >
            <img
              className="w-full h-full object-cover object-top-left z-50"
              src={project.photo}
              alt=""
            />
          </motion.div>
          {/* <motion.div */}
          {/*   className="absolute top-[15px] left-[15px] max-w-[300px]" */}
          {/*   layoutId={`title-container-${id}`} */}
          {/* > */}
          {/*   <h2 className="text-flexoki-base-900 my-2">{project.title}</h2> */}
          {/* </motion.div> */}
        </motion.div>
      </div>
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
  const [scaleImage, setScaleImage] = useState(false);
  const activeProject = projects[activeId];
  return (
    <Dialog open onOpenChange={() => setActiveId(undefined)}>
      <DialogContentWithoutAnimation className="w-full min-h-160 p-0 bg-transparent border-none focus-visible:outline-none text-black rounded-lg overflow-hidden">
        <motion.div
          layout
          className="absolute top-3 right-3 h-12 z-50 flex gap-2 justify-end"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          <Button size={"icon"} onClick={() => setScaleImage(!scaleImage)}>
            {!scaleImage ? (
              <ExpandIcon className="size-4 text-flexoki-base-50" />
            ) : (
              <ShrinkIcon className="size-4 text-flexoki-base-50" />
            )}
          </Button>
          {activeProject.url && (
            <Button size={"icon"} asChild>
              <a href={activeProject.url} target="_blank">
                <LinkIcon className="size-4 text-flexoki-base-50" />
              </a>
            </Button>
          )}
          <Button size={"icon"} onClick={() => setActiveId(undefined)}>
            <XIcon className="size-5 text-flexoki-base-50" />
          </Button>
        </motion.div>
        <ScrollArea className="max-h-[calc(100vh-128px)]">
          <DialogTitle hidden>{activeProject.title}</DialogTitle>
          <motion.div
            className="relative w-full h-full mx-auto rounded-lg bg-flexoki-base-50 overflow-hidden pointer-events-auto"
            layoutId={`card-container-${activeId}`}
          >
            <motion.div
              className={`w-full ${!scaleImage ? "h-145" : "h-fit"} overflow-hidden`}
              layoutId={`card-image-container-${activeId}`}
            >
              <img
                className="w-full h-full object-cover object-top-left"
                src={activeProject.photo}
                alt=""
              />
            </motion.div>

            {/* <motion.div */}
            {/*   className="absolute top-[15px] left-[15px] max-w-[300px]" */}
            {/*   layoutId={`title-container-${activeId}`} */}
            {/* > */}
            {/*   <h2 className="text-white my-2">{activeProject.title}</h2> */}
            {/* </motion.div> */}

            <motion.div className="pt-2 px-[35px] pb-[35px] max-w-[700px] w-[90vw] space-y-4">
              <h3 className="font-semibold text-2xl">{activeProject.title}</h3>
              <activeProject.content />
            </motion.div>
          </motion.div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DialogContentWithoutAnimation>
    </Dialog>
  );
}

const projects = [
  {
    title: "Kullanışlı Bir Admin Paneli",
    photo: "/images/admin-panel-generic.png",
    content: () => {
      return (
        <div>
          Pek çok amaç için kullanılabilecek bir internal-tool, backoffice,
          admin paneli örneği
        </div>
      );
    },
  },
  {
    title: "Hızlı Video Çözüm",
    url: "https://video.taylan.co",
    photo: "/images/hizli-cozum.png",
    content: () => {
      return (
        <div>
          Türkiye sınav hazırlık içeriği tüketen çoğu kişinin karşılaştığı
          FRNS.IN sayfasının bir yorumu. Eksik olduğunu düşündüğüm pek çok
          özelliğin eklenmiş versiyonu
        </div>
      );
    },
  },
  {
    title: "PDF-Anki",
    url: "https://anki.taylan.co",
    photo: "/images/pdf-anki.png",
    content: () => {
      return (
        <div>
          Elinizde bulunan PDF dosyaları üzerinden hızlıca yapay zeka desteğiyle
          anki kartları oluşturmanız için bir araç
        </div>
      );
    },
  },
];
