import { setup } from "xstate";
import { Context, EventNames, Events, Guards, MachineStates } from "./types";

export const machine = setup({
  // SAFETY: This is the recommended practice in the xstate docs
  types: {} as {
    context: Context;
    events: Events;
    guards: Guards;
  },
  guards: {
    isReadyForDecision: ({ context }: { context: Context }): boolean =>
      context.status === MachineStates.READY_FOR_DECISION,
    isApproved: ({ context }: { context: Context }): boolean =>
      context.status === MachineStates.APPROVED,
    isRejected: ({ context }: { context: Context }): boolean =>
      context.status === MachineStates.REJECTED,
    isClosed: ({ context }: { context: Context }): boolean =>
      context.status === MachineStates.CLOSED,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5RgB4GMwAcAuBLA9gHYBKYAjgK5zYB0EY2YATgLa6FgDK2AhowMQBtAAwBdRKEz5YuPEQkgUiAEzKAHDQDsagIzKAbDs3aAnAFZDZgDQgAniuEb9z52pPLhyzWZ0BmAL7+NqgYOAQk5FSwtPSMrOxcvAKCOuJIIFIycoQKSgiqGtp6hsZuFjrWdoi6NAAsJg0mjjqOwr76ZoHB6FjZpJTUdAzMbBzcfGBCymmS0rLhuSrqWroGRqbllfYIvpq+dY3mwjq1Zr4mtV3gPWFE-VExw-FjSZOCvjMZc9mL+ctFa1K5ksNm29VqNEOZhMvjMul8tWEnSC11CfUigyYYB4EFsADF8EwACJgNC4GREfgAQQACjTiAB5ABqAFERJ9MvN5Ok8vplsIimZhG1lCYdCZQYhxSZIYdavo9npfH4riFeuF7pjsbiCcTSeTwvxiCyAFIsgDCABV2QpOT8eYg+RoBbohSKxRKqvkhQdGgrNPUxZ5AijCPh6PB0mrbhEBtFbd8Fg6EABafSS1P6VU3dFxx5xUaJCYJrJJ0B5WrKDNimiixqVsxeepmS4o6O5h40LE4-GEklkik5dJ2suKRC1eU0NTeY7yytqOuaDMefSQnTOWrr4T6Ey6czZtEajHRGg8TCYJj4ABukBLXKH5cQmj5NDaxTOFl2jgzalX6+cLa7vowi1GoB7qncx60FiABWpKMBAd72o+CDPsor7KgYH76F+ajLmYmh1P+cJ+Goaj1GBbY5keeY0GgAA20i3sOibcihE6rtOQonPo86Lhm9Q6LKjRkc+ahwuJIb+EAA */
  id: "exceptionRequest",
  initial: MachineStates.DETERMINE_STATE,
  // eslint-disable-next-line rulesdir/require-safety-comment
  context: {} as Context,
  states: {
    [MachineStates.DETERMINE_STATE]: {
      always: [
        {
          guard: "isReadyForDecision",
          target: MachineStates.READY_FOR_DECISION,
        },
        {
          target: MachineStates.APPROVED,
          guard: "isApproved",
        },
        {
          target: MachineStates.REJECTED,
          guard: "isRejected",
        },
        {
          target: MachineStates.CLOSED,
          guard: "isClosed",
        },
      ],
    },
    [MachineStates.READY_FOR_DECISION]: {
      on: {
        [EventNames.APPROVE]: MachineStates.APPROVED,
        [EventNames.REJECT]: MachineStates.REJECTED,
      },
    },
    [MachineStates.APPROVED]: {
      type: "final",
    },
    [MachineStates.REJECTED]: {
      type: "final",
    },
    [MachineStates.CLOSED]: {
      type: "final",
    },
  },
});
