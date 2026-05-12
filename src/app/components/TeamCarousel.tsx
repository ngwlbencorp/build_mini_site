import { useCallback, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

const NAVY = "#1e3a5f";
const TEAL = "#2ca2a4";
const GOLD = "#e8a83a";

// To replace placeholders: drop each member's photo into `public/team/`
// using the exact filename below. Missing files fall back to initials.
interface Member {
  name: string;
  image: string;
  initials: string;
}

const TEAM: Member[] = [
  { name: "Jiew Peng LIM",   image: "/team/jiew-peng-lim.jpg",   initials: "JP" },
  { name: "Emmanuel SOON",   image: "/team/emmanuel-soon.jpg",   initials: "ES" },
  { name: "Benedict NG",     image: "/team/benedict-ng.jpg",     initials: "BN" },
  { name: "Zhan Siang LAU",  image: "/team/zhan-siang-lau.jpg",  initials: "ZS" },
];

export function TeamCarousel() {
  // Random starting slide so there's no implied ordering
  const startIndex = useMemo(() => Math.floor(Math.random() * TEAM.length), []);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", startIndex });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {TEAM.map((m) => (
            <div key={m.name} className="shrink-0 grow-0 basis-1/2 px-2 flex justify-center">
              <Avatar member={m} />
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next controls */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center active:scale-95 transition"
        style={{ border: `1px solid ${NAVY}1f`, color: NAVY }}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center active:scale-95 transition"
        style={{ border: `1px solid ${NAVY}1f`, color: NAVY }}
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <p className="text-center text-[11px] mt-3" style={{ color: "#64748b" }}>
        Swipe or tap the arrows
      </p>
    </div>
  );
}

function Avatar({ member }: { member: Member }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center shadow-md"
        style={{ background: `linear-gradient(135deg, ${NAVY}, ${TEAL})`, border: `3px solid ${GOLD}` }}
      >
        {!errored ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
            onError={() => setErrored(true)}
          />
        ) : (
          <div className="flex flex-col items-center text-white">
            <User className="w-7 h-7 opacity-80" />
            <span className="text-xs mt-0.5" style={{ fontWeight: 700, letterSpacing: "0.05em" }}>
              {member.initials}
            </span>
          </div>
        )}
      </div>
      <p
        className="mt-3 text-center"
        style={{ color: NAVY, fontWeight: 600, fontSize: "0.78rem", lineHeight: 1.2 }}
      >
        {member.name}
      </p>
    </div>
  );
}
