import { describe, it, expect, vitest } from "vitest";
import { createMessageProtocol } from ".";
import { z } from "zod";

const messageProtocol = createMessageProtocol({
  events: {
    LOG_IN: {
      username: z.string(),
      password: z.string(),
    },
    LOG_OUT: {},
  },
});

describe("createMessageProtocol", () => {
  it("Should error if a sent message does not match an event", () => {
    const testSender = vitest.fn();
    const sender = messageProtocol.createHandler(testSender);
    expect(() => {
      // @ts-expect-error
      sender({
        type: "LOG_IN",
      });
    }).toThrow();

    expect(testSender).not.toHaveBeenCalled();
  });

  it("Should pass if a sent message matches an event", () => {
    const testSender = vitest.fn();
    const sender = messageProtocol.createHandler(testSender);

    sender({
      type: "LOG_IN",
      password: "pswd",
      username: "foo",
    });

    expect(testSender).toHaveBeenCalledWith({
      type: "LOG_IN",
      password: "pswd",
      username: "foo",
    });

    expect(testSender).toHaveBeenCalledOnce();
  });
});
