"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import io from "socket.io-client";

const ROOMS = ["jakarta1", "jakarta2", "bandung", "medan", "makassar", "palembang"];
const SOCKET_URL = "https://minigim-socket.stg.antigravity.dev";

export default function TabletSenderPage() {
  const [roomId, setRoomId] = useState("makassar");
  const [status, setStatus] = useState("Disconnected");
  const [imageURL, setImageURL] = useState("");
  const [position, setPosition] = useState(1);
  const [connected, setConnected] = useState(false);

  const socketRef = useRef(null);

  // daftar 1..36 untuk preset
  const positions = useMemo(() => Array.from({ length: 36 }, (_, i) => i + 1), []);

  useEffect(() => {
    // cleanup on hot-reload/navigation
    return () => {
      try { socketRef.current?.disconnect(); } catch {}
    };
  }, []);

  const handleConnect = () => {
    try { socketRef.current?.disconnect(); } catch {}

    const socket = io(SOCKET_URL, {
      transports: ["websocket"], // langsung WS (tanpa polling)
      withCredentials: false,
      // path: "/socket.io", // uncomment jika server pakai path custom
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      setStatus("Connected");
      socket.emit("joinRoom_wpap", { roomId });
    });

    socket.on("disconnect", (reason) => {
      setConnected(false);
      setStatus(`Disconnected`);
      // console.warn("socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      setConnected(false);
      setStatus("Connect error");
      // console.error("connect_error:", err);
    });

    // optional: lihat ack join
    socket.on("on_joinRoom_wpap", (payload) => {
      // console.log("on_joinRoom_wpap", payload);
    });
  };

  const handleSend = () => {
    const socket = socketRef.current;
    if (!socket || !socket.connected) {
      alert("Belum terhubung. Klik Connect dulu.");
      return;
    }

    const pos = Number(position);
    if (!imageURL) return alert("Isi Image URL.");
    if (!pos || pos < 1 || pos > 36) return alert("Posisi harus 1–36.");

    socket.emit("submitResult_wpap", {
      roomId,
      imageURL: imageURL.trim(),
      position: pos,
    });
  };

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h2 style={{ margin: 0 }}>WPAP Sender (Tablet)</h2>
        <p style={styles.muted}>Kirim <code>imageURL</code> ke posisi 1–36 pada room terpilih.</p>

        <div style={styles.row}>
          <label style={styles.label}>City / Room</label>
          <select value={roomId} onChange={(e) => setRoomId(e.target.value)} style={styles.input}>
            {ROOMS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
          <button onClick={handleConnect} style={styles.btnPrimary}>Connect & Join</button>
          <span style={{ ...styles.pill, ...(connected ? styles.ok : styles.warn) }}>{status}</span>
        </div>

        <hr style={styles.hr} />

        <div style={styles.row}>
          <label style={styles.label}>Image URL</label>
          <input
            placeholder="https://example.com/result.png"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={styles.label}>Position (1–36)</label>
            <input
              type="number"
              min={1}
              max={36}
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Preset</label>
            <select
              value={String(position)}
              onChange={(e) => setPosition(e.target.value)}
              style={styles.input}
            >
              {positions.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={handleSend} style={{ ...styles.btnPrimary, marginTop: 14 }}>
          Kirim submitResult_wpap
        </button>

        <p style={styles.hint}>
          Event: <code>joinRoom_wpap</code>, <code>submitResult_wpap</code>. Data dikirim: {"{ roomId, imageURL, position }"}.
        </p>
      </section>
    </main>
  );
}

/* ====== styles (inline biar plug-and-play) ====== */
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
    width: "min(680px, 100%)",
    background: "#0f0f0f",
    border: "1px solid #2a2a2a",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,.25)",
  },
  muted: { opacity: 0.8, marginTop: 6 },
  row: { margin: "12px 0" },
  label: { fontSize: 13, opacity: 0.9, marginBottom: 4, display: "block" },
  input: {
    width: "100%",
    padding: "10px 12px",
    background: "#1a1a1a",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: 10,
    fontSize: 16,
  },
  btnPrimary: {
    background: "#E53935",
    color: "#fff",
    border: "1px solid #E53935",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
  },
  hr: { border: 0, borderTop: "1px solid #222", margin: "16px 0" },
  pill: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid #333",
  },
  ok: { background: "#133a21", borderColor: "#1e7a46", color: "#8ee1b0" },
  warn: { background: "#3a310f", borderColor: "#7a5f1e", color: "#f6e49a" },
  bad: { background: "#3a1414", borderColor: "#7a1e1e", color: "#f3a4a4" },
};
