import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AccessToken } from "livekit-server-sdk";

dotenv.config();

const app = express();
app.use(cors());

app.get("/token", async (req: any, res: any) => {
  const { room, identity, name } = req.query;

  if (!room || !identity || !name) {
    return res.status(400).json({ error: "room and identity are required" });
  }

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: identity as string,
      name: name as string,
    }
  );

  token.addGrant({
    room: room as string,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
  });

  res.json({ token: await token.toJwt() });
});

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`LiveKit auth server listening on port ${PORT}`);
});
