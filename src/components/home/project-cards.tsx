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
import { getLocale } from "@/lib/utils";

export function ProjectCards() {
  const [activeId, setActiveId] = useState<number | undefined>();
  return (
    <MotionConfig
      transition={{
        type: "tween",
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <AnimatePresence>
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
    </MotionConfig>
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
      className={`p-0 py-2 sm:p-2 w-full ${
        [
          "flex-1 sm:flex-1/3",
          "flex-1 sm:flex-2/3",
          "flex-1 sm:flex-2/3",
          "flex-1 sm:flex-1/3",
          "flex-1 sm:flex-1/2",
          "flex-1 sm:flex-1/2",
        ][id]
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
              className="object-cover object-top-left z-50 max-w-none w-[calc(100vw-2rem)] h-100 sm:h-80 md:h-120 bg-white"
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
  const locale = getLocale();

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
              transition={{ delay: 0.4 }}
            >
              {!scaleImage ? (
                <ExpandIcon className="size-4 text-flexoki-base-50" />
              ) : (
                <ShrinkIcon className="size-4 text-flexoki-base-50" />
              )}
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
                transition={{ delay: 0.35 }}
              >
                <LinkIcon className="size-4 text-flexoki-base-50" />
              </motion.a>
            </Button>
          )}
          <Button size={"icon"} onClick={() => setActiveId(undefined)} asChild>
            <motion.button
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{ delay: 0.3 }}
            >
              <XIcon className="size-5 text-flexoki-base-50" />
            </motion.button>
          </Button>
        </motion.div>
        <motion.div
          className="relative w-full h-full mx-auto rounded-lg bg-flexoki-base-50 overflow-hidden pointer-events-auto"
          layoutId={`card-container-${activeId}`}
        >
          <ScrollArea className="h-full max-h-[calc(100vh-128px)]">
            <DialogTitle hidden>{activeProject[locale].title}</DialogTitle>
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
              <h3 className="font-semibold text-2xl">
                {activeProject[locale].title}
              </h3>
              {activeProject[locale].content()}
            </motion.div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </motion.div>
      </DialogContentWithoutAnimation>
    </Dialog>
  );
}

const projects: {
  en: {
    title: string;
    content: () => React.ReactNode;
  };
  tr: {
    title: string;
    content: () => React.ReactNode;
  };
  photo: string;
  url?: string;
}[] = [
  {
    en: {
      title: "Useful Admin Panel",
      content: () => {
        return (
          <div>
            An internal‑tool, back‑office, admin‑panel example that can be used
            for many purposes.
          </div>
        );
      },
    },
    tr: {
      title: "Kullanışlı Bir Admin Paneli",
      content: () => {
        return (
          <div>
            Pek çok amaç için kullanılabilecek bir internal‑tool, backoffice,
            admin paneli örneği
          </div>
        );
      },
    },
    photo: "/images/admin-panel-generic.webp",
  },
  {
    en: {
      title: "Fast Video Solution",
      content: () => {
        return (
          <div>
            My personal (kinda like an revenge of the bad UX original gives) on
            the FRNS.IN page that many users of Turkish exam preparation content
            encounter. A version that adds many features I felt were missing.
          </div>
        );
      },
    },
    tr: {
      title: "Hızlı Video Çözüm",
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
    url: "https://video.taylan.co",
    photo: "/images/hizli-cozum.webp",
  },
  {
    en: {
      title: "PDF‑Anki",
      content: () => {
        return (
          <div>
            A tool that creates Anki cards from your PDF files quickly, with AI
            assistance.
          </div>
        );
      },
    },
    tr: {
      title: "PDF-Anki",
      content: () => {
        return (
          <div>
            Elinizde bulunan PDF dosyaları üzerinden hızlıca yapay zeka
            desteğiyle anki kartları oluşturmanız için bir araç
          </div>
        );
      },
    },
    url: "https://anki.taylan.co",
    photo: "/images/pdf-anki.webp",
  },
  {
    en: {
      title: "Exam App",
      content: () => {
        return (
          <p>
            A question‑solving, tracking, level‑detection and reporting system
            designed for YKS students, together with complex PDF‑generation
            mechanisms.
            <br />
            <br />I wrote a custom layout engine (kind of an strech) for the
            usual question flow between page colunms. <br />
            <br />
            Check out an example:
            <br />
            <a href="/assets/ornek-sinav.pdf">PDF</a>
          </p>
        );
      },
    },
    tr: {
      title: "Sınav App",
      content: () => {
        return (
          <div>
            Temelde YKS öğrencileri için tasarlanmış soru çözüm, takip, seviye
            tespit ve rapor sistemi. Kompleks PDF oluşturma mekanizmaları ile
            beraber
            <br />
            <br />
            Alışık olduğumuz sütunlu sayfa düzeni için projeye özel düzen
            motorumu yazdım.
            <br />
            <br />
            Bir örneği inceleyin:
            <br />
            <a href="/assets/ornek-sinav.pdf">PDF</a>
          </div>
        );
      },
    },
    photo: "/images/sinav-app.webp",
  },
  {
    en: {
      title: "Akord Agency",
      content: () => {
        return <div>Our social‑media and web‑services agency.</div>;
      },
    },
    tr: {
      title: "Akord Agency",
      content: () => {
        return <div>Sosyal medya ve web hizmetleri ajansımız</div>;
      },
    },
    url: "https://akordagency.com",
    photo: "/images/akord-homepage.webp",
  },
  {
    en: {
      title: "MarmarİSG",
      content: () => {
        return (
          <div>Marmaris Occupational Safety Training and Consultancy.</div>
        );
      },
    },
    tr: {
      title: "MarmarİSG",
      content: () => {
        return <div>Marmaris İş Güvenliği Eğitim ve Danışmanlık</div>;
      },
    },
    url: "https://marmarisg.com",
    photo: "/images/marmarisg.webp",
  },
];
