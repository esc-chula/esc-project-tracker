"use client";
import LastestItem from "./lastestItem";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

export default function LastestPanel() {
  const [carouselRef] = useEmblaCarousel({ loop: false, dragFree: true }, [
    WheelGesturesPlugin(),
  ]);

  return (
    <div className="flex flex-col max-w-[60vw]">
      <div className="font-sukhumvit font-bold text-lg">ล่าสุด</div>
      <div
        className="bg-[#D9D9D9] bg-opacity-20 py-4 px-8 rounded-lg overflow-hidden"
        ref={carouselRef}
      >
        <div className="flex space-x-8">
          <LastestItem projectCode="8888" projectName="โครงการอบรมเด็กยากไร้" />
          <LastestItem
            projectCode="5555"
            projectName="โครงการอบบมอิอิอิอิิอิอิอิอิ"
          />
          <LastestItem projectCode="4444" projectName="โครงการแฟหแหฟฟหแ" />
          <LastestItem projectCode="1111" projectName="cascascascasc" />
          <LastestItem projectCode="1111" projectName="cascascascasc" />
          <LastestItem projectCode="1111" projectName="cascascascasc" />
          <LastestItem projectCode="1111" projectName="cascascascasc" />
          <LastestItem projectCode="1111" projectName="cascascascasc" />
          <LastestItem projectCode="1111" projectName="cascascascasc" />
        </div>
      </div>
    </div>
  );
}
