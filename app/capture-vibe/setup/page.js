"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";

const ROOMS = ["jakarta1", "jakarta2", "bandung", "medan", "makassar", "palembang"];
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL ?? "https://minigim-socket.stg.antigravity.dev";

export default function SetupPage() {
  const router = useRouter();
  const [room, setRoom] = useState("makassar");
  const [customRoom, setCustomRoom] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [status, setStatus] = useState("Not connected");
  const [testing, setTesting] = useState(false);
  const socketRef = useRef(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("roomId");
      if (saved) {
        setRoom(saved);
        if (!ROOMS.includes(saved)) {
          setUseCustom(true);
          setCustomRoom(saved);
        }
      }
    } catch {}
    return () => {
      try { socketRef.current?.disconnect(); } catch {}
    };
  }, []);

  const selectedRoomId = useCustom ? (customRoom || "").trim() : room;

  // Save only
  function saveOnly() {
    if (!selectedRoomId) {
      alert("Pilih atau isi Room terlebih dahulu.");
      return;
    }
    localStorage.setItem("roomId", selectedRoomId);
    setStatus(`Saved: ${selectedRoomId}`);
  }

  // Test join connection
  async function testJoinOnce() {
    if (!selectedRoomId) {
      alert("Pilih atau isi Room terlebih dahulu.");
      return;
    }
    setTesting(true);
    setStatus("Connecting…");
    try {
      socketRef.current?.disconnect();
      const s = io(SOCKET_URL, { transports: ["websocket"] });
      socketRef.current = s;

      s.on("connect", () => {
        setStatus("Connected. Joining room…");
        s.emit("joinRoom_wpap", { roomId: selectedRoomId });
        localStorage.setItem("roomId", selectedRoomId);
        setStatus(`Joined room: ${selectedRoomId}`);
        // auto disconnect after short delay
        setTimeout(() => {
          try { s.disconnect(); } catch {}
          setStatus(`Saved & verified: ${selectedRoomId}`);
          setTesting(false);
        }, 600);
      });

      s.on("connect_error", (err) => {
        console.error("connect_error", err);
        setStatus("Connect error");
        setTesting(false);
      });
    } catch (e) {
      console.error(e);
      setStatus("Error");
      setTesting(false);
    }
  }

  // Continue to next page (tablet)
  function goNext() {
    if (!selectedRoomId) {
      alert("Pilih atau isi Room terlebih dahulu.");
      return;
    }
    localStorage.setItem("roomId", selectedRoomId);
    router.push("/capture-vibe");
  }

  // 🔥 NEW: clear localStorage button
  function clearStorage() {
    try {
      localStorage.clear();
      setRoom("makassar");
      setCustomRoom("");
      setUseCustom(false);
      setStatus("Storage cleared. Room reset to makassar");
      alert("✅ LocalStorage cleared");
    } catch (err) {
      console.error(err);
      alert("Gagal clear localStorage");
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={{ margin: 0 }}>Setup Kota</h1>
        <p style={styles.muted}>Pilih kota untuk dipakai saat mengirim hasil.</p>

        <div style={{ display: "grid", gap: 12 }}>
          {/* <label style={styles.label}>
            <input
              type="checkbox"
              checked={useCustom}
              onChange={(e) => setUseCustom(e.target.checked)}
              style={{ marginRight: 8 }}
            />
            Gunakan Room Custom
          </label> */}

          {!useCustom ? (
            <select value={room} onChange={(e) => setRoom(e.target.value)} style={styles.input}>
              {ROOMS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          ) : (
            <input
              placeholder="mis. special-event-01"
              value={customRoom}
              onChange={(e) => setCustomRoom(e.target.value)}
              style={styles.input}
            />
          )}

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={saveOnly} style={styles.btnGhost}>Save</button>
            <button onClick={testJoinOnce} style={styles.btn} disabled={testing}>
              {testing ? "Testing…" : "Save & Test Join"}
            </button>
            <button onClick={clearStorage} style={styles.btnWarn}>🗑 CLEAR DATA</button>
            <div style={{ flex: 1 }} />
            <button onClick={goNext} style={styles.btnPrimary}>Continue →</button>
          </div>

          <div style={{ ...styles.status, ...(status.includes("error") ? styles.bad : styles.ok) }}>
            {status}
          </div>
        </div>

        <p style={styles.hint}>
          Disimpan ke <code>localStorage["roomId"]</code>.<br/>
          Socket: <code>{SOCKET_URL}</code>
        </p>
      </section>
    </main>
  );
}

/* ---- inline styles ---- */
const styles = {
  page: {
    minHeight: "100dvh",
    display: "grid",
    placeItems: "center",
    background: "#111",
    color: "#eee",
    padding: 16,
    fontFamily: "system-ui, Arial, sans-serif",
  },
  card: {
    width: "min(720px, 100%)",
    background: "#0f0f0f",
    border: "1px solid #2a2a2a",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,.25)",
  },
  muted: { opacity: 0.8, marginTop: 6 },
  label: { fontSize: 14, opacity: 0.95 },
  input: {
    width: "100%",
    padding: "12px 14px",
    background: "#1a1a1a",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: 12,
    fontSize: 16,
  },
  btn: {
    background: "#2a2a2a",
    color: "#fff",
    border: "1px solid #333",
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
  },
  btnGhost: {
    background: "#171717",
    color: "#ddd",
    border: "1px solid #333",
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer",
  },
  btnWarn: {
    background: "#3a1414",
    color: "#f88",
    border: "1px solid #7a1e1e",
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
  },
  btnPrimary: {
    background: "#E53935",
    color: "#fff",
    border: "1px solid #E53935",
    padding: "10px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
  },
  status: {
    marginTop: 8,
    fontSize: 13,
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #333",
    background: "#161616",
  },
  ok: {},
  bad: { background: "#3a1414", borderColor: "#7a1e1e", color: "#f3a4a4" },
  hint: { opacity: 0.7, fontSize: 12, marginTop: 14 },
};
