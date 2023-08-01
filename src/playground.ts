import { createMessageProtocol } from "./createMessageProtocol";
import { z } from "zod";

const msgBus = createMessageProtocol({
  events: {
    LOG_IN: {
      username: z.string(),
      password: z.string(),
    },
    LOG_OUT: {},
  },
});

const send = msgBus.createHandler(window.postMessage);

send({
  type: "LOG_IN",
  password: "123",
  username: "foo",
});

send({ type: "LOG_OUT" });
// const handler = msgBus.createHandler((e) => {});

// window.addEventListener("message", handler);

// send("LOG_IN", { username: "foo", password: "bar" });
