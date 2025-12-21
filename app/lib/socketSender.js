import io from "socket.io-client";

export async function autoJoinAndSubmit({
  imageURL,
  position,
  defaultRoom = "jakarta1",
}) {
  return new Promise((resolve, reject) => {
    const SOCKET_URL = "https://sockets2.minigim.fun";
    const roomId = localStorage.getItem("roomId") || defaultRoom;

    if (!imageURL) return reject("imageURL wajib diisi");
    if (!position || position < 1 || position > 36)
      return reject("position harus 1-36");

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: false,
    });

    socket.on("connect", () => {
      console.log("✅ Connected to socket");
      socket.emit("joinRoom_wpap", { roomId });
      console.log("🚪 Joined room:", roomId);

      // langsung kirim data
      const payload = { roomId, imageURL, position };
      socket.emit("submitResult_wpap", payload);
      console.log("📤 Sent submitResult_wpap:", payload);

      resolve({ socket, roomId, payload });
    });

    socket.on("connect_error", (err) => {
      console.error("❌ connect_error:", err);
      reject(err);
    });

    socket.on("disconnect", () => {
      console.warn("⚠️ disconnected");
    });
  });
}
