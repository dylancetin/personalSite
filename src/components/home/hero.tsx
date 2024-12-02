import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const PixelartHero = () => (
  <Tooltip openDelay={100}>
    <TooltipTrigger>
      <div class="mx-auto max-w-[750px] w-2/3 rounded-3xl overflow-hidden">
        <img
          id="pixelart"
          src="/pixelartme.webp"
          class="w-full rounded-3xl overflow-hidden"
        />
      </div>
    </TooltipTrigger>
    <TooltipContent class="bg-card border text-black">
      <div class="flex flex-col items-center justify-center">
        this is an ai generated image
      </div>
    </TooltipContent>
  </Tooltip>
);
