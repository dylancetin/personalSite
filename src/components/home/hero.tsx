import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const PixelartHero = () => (
  <Tooltip delayDuration={100}>
    <TooltipTrigger>
      <div className="mx-auto max-w-[750px] w-full sm:w-2/3 rounded-3xl overflow-hidden">
        <img
          id="pixelart"
          src="/pixelartme.webp"
          className="w-full rounded-3xl overflow-hidden"
        />
      </div>
    </TooltipTrigger>
    <TooltipContent className="bg-card border text-black" sideOffset={15}>
      <div className="flex flex-col items-center justify-center">
        this is an ai generated image
      </div>
    </TooltipContent>
  </Tooltip>
);
