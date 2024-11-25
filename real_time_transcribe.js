const { io } = require("socket.io-client");
const mic = require("mic");
require("dotenv").config();

const API_KEY = process.env.ASSEMBLYAI_API_KEY; 
const ASSEMBLYAI_STREAM_URL = "wss://api.assemblyai.com/v2/realtime/ws";

const micInstance = mic({
  rate: "16000",
  channels: "1",
  debug: false,
  exitOnSilence: 6,
});
const micInputStream = micInstance.getAudioStream();

async function startRealTimeTranscription() {
  try {
    console.log("Connecting to AssemblyAI real-time streaming API...");

   
    const socket = io(ASSEMBLYAI_STREAM_URL, {
      transports: ["websocket"],
      auth: { authorization: API_KEY },
    });

    socket.on("connect", () => {
      console.log("Connected to AssemblyAI real-time streaming API!");
      micInstance.start();
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err);
      micInstance.stop();
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
      micInstance.stop();
    });

   
    socket.on("transcript", (data) => {
      if (data && data.text) {
        console.log("Transcription:", data.text);
      }
    });

    
    micInputStream.on("data", (data) => {
      if (socket.connected) {
        socket.emit("audio", data);
      }
    });

    micInputStream.on("error", (err) => {
      console.error("Microphone error:", err);
      micInstance.stop();
    });

    process.on("SIGINT", () => {
      console.log("Stopping transcription...");
      micInstance.stop();
      socket.disconnect();
      process.exit();
    });
  } catch (error) {
    console.error("Error setting up real-time transcription:", error);
  }
}

startRealTimeTranscription();
