import { useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import { gsap, Power2 } from "gsap";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const PALETTES = [
  { background: "#3c3d47", cardColor: "#f9d5bb", textColor: "#f66767" },
  { background: "#80BD9E", cardColor: "#F98866", textColor: "#3c3d47" },
  { background: "#CACFD6", cardColor: "#424874", textColor: "#DCD6F7" },
  { background: "#212b35", cardColor: "#E1DCD9", textColor: "#3E3C3C" },
  { background: "#C4DFE6", cardColor: "#90AFC5", textColor: "#3E363F" },
  { background: "#FE7773", cardColor: "#FFC2C3", textColor: "#250c41" },
  { background: "#BCF4F5", cardColor: "#64c5dd", textColor: "#F6E278" },
  { background: "#FFE0AC", cardColor: "#fdc56b", textColor: "#FF8C8C" },
  { background: "#87CEEB", cardColor: "#194049", textColor: "#FFD8D8" },
  { background: "#2c2d30", cardColor: "#e1e1e1", textColor: "#f0bf02" },
  { background: "#FE4A49", cardColor: "#001730", textColor: "#4AD7D1" },
  { background: "#031927", cardColor: "#BA1200", textColor: "#031927" },
  { background: "#F92C85", cardColor: "#FDF5DF", textColor: "#5EBEC4" },
  { background: "#FECD45", cardColor: "#2568FB", textColor: "#FDF5DF" },
  { background: "#6E6E6E", cardColor: "#BCFD4C", textColor: "#212121" },
  { background: "#00ABE1", cardColor: "#161F6D", textColor: "#f5f5f5" },
  { background: "#E8EAE3", cardColor: "#FA2742", textColor: "#373833" },
  { background: "#000000", cardColor: "#74F0ED", textColor: "#EA445A" },
  { background: "#1BA098", cardColor: "#051622", textColor: "#DEB992" },
  { background: "#B4D0E7", cardColor: "#61082B", textColor: "#B4D0E7" },
];

const ANNIVERSARY_DATE = new Date(2021, 7, 5);

function App() {
  const isCurrentYearAnniversaryPassed = Boolean(
    dayjs().isAfter(
      dayjs(
        new Date(
          dayjs().year(),
          ANNIVERSARY_DATE.getMonth(),
          ANNIVERSARY_DATE.getDate()
        )
      )
    )
  );

  const [currentPalette, setCurrentPalette] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    const { background, cardColor, textColor } = PALETTES[currentPalette];
    const tl = gsap.timeline({ defaults: { ease: Power2.easeInOut } });

    tl.to(cardRef.current, { background: cardColor, color: textColor }).to(
      "body",
      { background },
      ">-0.5"
    );

    setCurrentPalette((prev) => (prev >= PALETTES.length - 1 ? 0 : prev + 1));

    return () => tl.revert();
  };

  const handleMouseLeave = () => {
    const tl = gsap.timeline({ defaults: { ease: Power2.easeInOut } });

    tl.to(cardRef.current, { background: "#E41C00", color: "#c8d2dc" }).to(
      "body",
      { background: "#020617" },
      ">-0.5"
    );

    return () => tl.revert();
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Tilt
        tiltReverse
        gyroscope
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        trackOnWindow
        className="h-screen w-full flex items-center justify-center"
      >
        <div
          className="max-h-96 w-72 sm:w-96 bg-[#E41C00] p-4 rounded-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={cardRef}
        >
          <h1 className="text-5xl mb-8">Ottr</h1>

          <div className="flex flex-col gap-1">
            <p>
              <span className="font-semibold">Established Date:</span>{" "}
              {dayjs(ANNIVERSARY_DATE).format("YYYY-MMM-DD")} (official date)
            </p>

            <p>
              <span className="font-semibold">Next Anniversary:</span> in{" "}
              {dayjs(
                new Date(
                  isCurrentYearAnniversaryPassed
                    ? dayjs().add(1, "year").year()
                    : dayjs().year(),
                  ANNIVERSARY_DATE.getMonth(),
                  ANNIVERSARY_DATE.getDate()
                )
              ).diff(dayjs(), "days")}{" "}
              days
            </p>

            <p>
              <span className="font-semibold">Last Anniversary:</span>{" "}
              {dayjs().diff(
                new Date(
                  isCurrentYearAnniversaryPassed
                    ? dayjs().year()
                    : dayjs().subtract(1, "year").year(),
                  ANNIVERSARY_DATE.getMonth(),
                  ANNIVERSARY_DATE.getDate()
                ),
                "days"
              )}{" "}
              days ago
            </p>
          </div>
        </div>
      </Tilt>
    </div>
  );
}

export default App;
