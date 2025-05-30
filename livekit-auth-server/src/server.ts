import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AccessToken } from "livekit-server-sdk";

dotenv.config();

const app = express();
app.use(cors());

app.get("/livekit/token", (req: any, res: any) => {
  const { room, identity } = req.query;

  if (!room || !identity) {
    return res.status(400).json({ error: "room and identity are required" });
  }

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: identity as string,
    }
  );

  token.addGrant({
    room: room as string,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
  });

  res.json({ token: token.toJwt() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`LiveKit auth server listening on port ${PORT}`);
});
