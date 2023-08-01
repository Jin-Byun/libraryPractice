import { z } from "zod";
import { EventsConfigToDiscriminatedUnion } from "./types";

export const createMessageProtocol = <
  T extends Record<string, z.ZodRawShape>,
  EventsAsDiscoUnion = EventsConfigToDiscriminatedUnion<T>
>(_opts: {
  events: T;
}) => {
  return {
    createSender: (func: (event: EventsAsDiscoUnion) => void) => {
      return func;
    },
    createReceiver: (func: (event: EventsAsDiscoUnion) => void) => {
      return func;
    },
  };
};
