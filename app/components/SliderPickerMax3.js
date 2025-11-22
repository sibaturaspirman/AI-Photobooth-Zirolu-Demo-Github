import { useState } from "react";
import Image from "next/image";

const BASE_URL = "https://ai.zirolu.id"; // ✅ URL GLOBAL

export default function SliderPickerMax3({ items, onChange }) {
  const MAX_PICK = 3;
  const [selectedIds, setSelectedIds] = useState([]);
  const [hint, setHint] = useState("");

  const emit = (nextIds) => {
    const selectedItems = items.filter(i => nextIds.includes(i.id));
    const nextLabels = selectedItems.map(i => i.label);

    // local image paths → ABSOLUTE URL
    const nextImages = selectedItems.map(i => `${BASE_URL}${i.img}`);

    onChange?.({
      ids: nextIds,
      labels: nextLabels,
      images: nextImages,        // ✅ absolute URLs
      selectedItems,
      text: nextLabels.join(", "),
    });
  };

  const togglePick = (item) => {
    if (item.locked) return;

    setHint("");

    setSelectedIds(prev => {
      const isActive = prev.includes(item.id);

      // remove
      if (isActive) {
        const next = prev.filter(x => x !== item.id);
        emit(next);
        return next;
      }

      // max 3 rule
      if (prev.length >= MAX_PICK) {
        setHint(`Maximum select ${MAX_PICK} options.`);
        return prev;
      }

      // type rule
      const prevItems = items.filter(i => prev.includes(i.id));
      const sameTypePicked = prevItems.find(i => i.type === item.type);

      if (sameTypePicked) {
        setHint(`You have selected ${sameTypePicked.label}. There is only one type of "${item.type}".`);
        return prev;
      }

      // normal add
      const next = [...prev, item.id];
      emit(next);
      return next;
    });
  };

  return (
    <div className="w-full">
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [-webkit-overflow-scrolling:touch]">
        {items.map((item) => {
          const active = selectedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={`
                relative shrink-0 snap-center p-4
                w-[140px] sm:w-[260px] md:w-[300px]
                rounded-2xl border-2 transition bg-white
                ${active ? "border-red-500" : "border-transparent"}
                
              `}
            >
              <button
                type="button"
                onClick={() => togglePick(item)}
                disabled={item.locked}
                className="relative w-full"
              >
                <Image
                  src={item.img}
                  alt={item.label}
                  width={720}
                  height={176}
                  className={`w-full h-auto rounded-2xl ${item.locked ? "opacity-40 grayscale" : ""}`}
                  priority
                />

                {/* checklist */}
                {active && !item.locked && (
                  <div className="absolute top-1 right-1">
                    <div className="w-7 h-7 rounded-md bg-red-500 grid place-items-center shadow">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                        <path d="M9.2 16.2 4.9 11.9l1.4-1.4 2.9 2.9 8.5-8.5 1.4 1.4z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* lock */}
                {item.locked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 rounded-lg p-2 shadow">
                      <Image src="/purina/ps-lock.png" alt="locked" width={30} height={30} />
                    </div>
                  </div>
                )}
              </button>

              <p className={`mt-2 text-center text-black text-xs ${item.locked ? "opacity-40 grayscale" : ""}`}>
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      {hint && (
        <div className="mt-2 text-xs text-red-700 bg-white px-3 py-2 rounded-lg">
          {hint}
        </div>
      )}
    </div>
  );
}
