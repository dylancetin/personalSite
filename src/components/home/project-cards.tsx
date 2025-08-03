import { AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { motion, MotionConfig } from "motion/react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { ExpandIcon, LinkIcon, ShrinkIcon, XIcon } from "lucide-react";
import {
  Dialog,
  DialogContentWithoutAnimation,
  DialogTitle,
} from "../ui/dialog";

export function ProjectCards() {
  const [activeId, setActiveId] = useState<number | undefined>();
  return (
    <MotionConfig
      transition={{
        type: "tween",
        duration: 0.4,
        // duration: 50,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <AnimatePresence>
        <div className="flex flex-wrap flex-col sm:flex-row">
          {projects.map((e, i) => (
            <Card
              key={`card-${i}`}
              id={i}
              activeId={activeId}
              setActiveId={setActiveId}
              project={e}
            />
          ))}
        </div>
        {activeId !== undefined ? (
          <CardDialog activeId={activeId} setActiveId={setActiveId} />
        ) : null}
      </AnimatePresence>
    </MotionConfig>
  );
}

function Card({
  project,
  id,
  activeId,
  setActiveId,
}: {
  project: (typeof projects)[number];
  id: number;
  activeId?: number;
  setActiveId: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  return (
    <div
      className={`rounded-lg relative overflow-hidden p-2 w-full ${
        ["flex-1 sm:flex-1/3", "flex-1 sm:flex-1/2", "flex-1 sm:flex-1/3"][id]
      }`}
      onClick={() => setActiveId(id)}
    >
      <div className="w-full h-100 sm:h-80 md:h-120 relative block pointer-events-none">
        <motion.div
          className="relative w-full h-full mx-auto rounded-lg overflow-hidden pointer-events-auto"
          layoutId={`card-container-${id}`}
        >
          <motion.div
            className="absolute top-0 left-0 max-w-none w-[calc(100vw-2rem)]"
            layoutId={`card-image-container-${id}`}
          >
            <img
              className="object-cover object-top-left z-50 max-w-none w-[calc(100vw-2rem)] h-100 sm:h-80 md:h-120"
              src={project.photo}
              alt=""
            />
          </motion.div>
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
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Button
            size={"icon"}
            onClick={() => setScaleImage(!scaleImage)}
            asChild
          >
            <motion.button
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{ delay: 0.3 }}
            >
              {!scaleImage ? (
                <ExpandIcon className="size-4 text-flexoki-base-50" />
              ) : (
                <ShrinkIcon className="size-4 text-flexoki-base-50" />
              )}
            </motion.button>
          </Button>
          <Button size={"icon"} onClick={() => setActiveId(undefined)} asChild>
            <motion.button
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{ delay: 0.35 }}
            >
              <XIcon className="size-5 text-flexoki-base-50" />
            </motion.button>
          </Button>
          {activeProject.url && (
            <Button size={"icon"} asChild>
              <motion.a
                href={activeProject.url}
                target="_blank"
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                transition={{ delay: 0.4 }}
              >
                <LinkIcon className="size-4 text-flexoki-base-50" />
              </motion.a>
            </Button>
          )}
        </motion.div>
        <motion.div
          className="relative w-full h-full mx-auto rounded-lg bg-flexoki-base-50 overflow-hidden pointer-events-auto"
          layoutId={`card-container-${activeId}`}
        >
          <ScrollArea className="max-h-[calc(100vh-128px)]">
            <DialogTitle hidden>{activeProject.title}</DialogTitle>
            <motion.div
              className={`w-full ${
                !scaleImage ? "h-100 sm:h-80 md:h-120" : "h-fit"
              } overflow-hidden`}
              layoutId={`card-image-container-${activeId}`}
            >
              <img
                className="object-cover object-top-left z-50 max-w-none w-[calc(100vw-2rem)] h-100 sm:h-80 md:h-120"
                src={activeProject.photo}
                alt=""
              />
            </motion.div>
            <motion.div className="pt-2 px-[35px] pb-[35px] max-w-[700px] w-[90vw] space-y-4">
              <h3 className="font-semibold text-2xl">{activeProject.title}</h3>
              <activeProject.content />
            </motion.div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </motion.div>
      </DialogContentWithoutAnimation>
    </Dialog>
  );
}

const projects = [
  {
    title: "Kullanışlı Bir Admin Paneli",
    photo: "/images/admin-panel-generic.webp",
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
    photo: "/images/hizli-cozum.webp",
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
    photo: "/images/pdf-anki.webp",
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
