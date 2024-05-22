"use client";
import LastestItem from "./lastest-item";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

export default function LastestPanel() {
  const [carouselRef] = useEmblaCarousel({ loop: false, dragFree: true }, [
    WheelGesturesPlugin(),
  ]);

  return (
    <div className="flex flex-col">
      <div className="text-black font-bold">ล่าสุด</div>
      <div
        className="bg-[#D9D9D9] bg-opacity-20 p-5 rounded-lg overflow-hidden w-[55vw]"
        ref={carouselRef}
      >
        <div className="flex space-x-10">
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
