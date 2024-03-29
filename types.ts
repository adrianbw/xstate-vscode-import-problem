export enum MachineStates {
  DETERMINE_STATE = "determineState",
  READY_FOR_DECISION = "readyForDecision",
  APPROVED = "approved",
  REJECTED = "rejected",
  CLOSED = "closed",
}

export enum EventNames {
  APPROVE = "APPROVE",
  REJECT = "REJECT",
}

export type Events =
  | {
      type: EventNames.APPROVE;
    }
  | {
      type: EventNames.REJECT;
    };

export type Context = {
  status: MachineStates;
};

export type Guards =
  | {
      type: "isReadyForDecision";
    }
  | {
      type: "isApproved";
    }
  | {
      type: "isRejected";
    }
  | {
      type: "isClosed";
    };
