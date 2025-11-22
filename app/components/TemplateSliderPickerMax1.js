import { useState } from "react";
import Image from "next/image";

// kalau kamu mau absolute URL buat dikirim ke fal/video service:
const BASE_URL = "https://ai.zirolu.id"; 
const toAbs = (p) => `${BASE_URL}${p}`;

export default function TemplateSliderPickerMax1({ items, onChange }) {
  const [selectedId, setSelectedId] = useState(null);

  const emit = (idOrNull) => {
    if (!idOrNull) {
      onChange?.(null);
      return;
    }

    const it = items.find((x) => x.id === idOrNull);
    if (!it) return;

    onChange?.({
      id: it.id,
      prompt: it.label,                 // ✅ label = prompt buat generation
      image: toAbs(it.img),             // ✅ image absolute (kalau gak mau abs, pakai it.img aja)
      title: it.title,                  // optional (judul pendek untuk UI)
    });
  };

  const togglePick = (item) => {
    setSelectedId((prev) => {
      const next = prev === item.id ? null : item.id; // click lagi = unselect
      emit(next);
      return next;
    });
  };

  return (
    <div className="w-full">
      <div
        className="
          flex gap-3 overflow-x-auto pb-2
          snap-x snap-mandatory scroll-smooth
          [-webkit-overflow-scrolling:touch]
        "
      >
        {items.map((item) => {
          const active = selectedId === item.id;

          return (
            <div
              key={item.id}
              className={`
                relative shrink-0 snap-center p-3
                w-[160px] sm:w-[200px] md:w-[220px]
                rounded-2xl border-2 transition bg-white
                ${active ? "border-red-500" : "border-transparent"}
              `}
            >
              <button
                type="button"
                onClick={() => togglePick(item)}
                className="relative w-full"
                aria-pressed={active}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-xl"
                  priority
                />

                {/* checklist saat active */}
                {active && (
                  <div className="absolute top-2 right-2">
                    <div className="w-7 h-7 rounded-md bg-red-500 grid place-items-center shadow">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                        <path d="M9.2 16.2 4.9 11.9l1.4-1.4 2.9 2.9 8.5-8.5 1.4 1.4z" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>

              {/* judul pendek (UI only) */}
              <p className="mt-2 text-center text-black text-xs font-medium">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
