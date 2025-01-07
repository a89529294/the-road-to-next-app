import { ZodError } from "zod";

// TODO: timeStamp may not be needed, remove in the future

export type ActionState = {
  message: string;
  timeStamp: number;
  status?: "SUCCESS" | "ERROR";
  fieldErrors?: Record<string, string[] | undefined>;
  payload?: FormData;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  timeStamp: Date.now(),
};

export function fromErrorToActionState(
  error: unknown,
  formData: FormData,
): ActionState {
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      message: "",
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
      timeStamp: Date.now(),
    };
  }

  if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      payload: formData,
      timeStamp: Date.now(),
    };
  }

  return {
    status: "ERROR",
    message: "an unknown error occurred",
    payload: formData,
    timeStamp: Date.now(),
  };
}

export function toActionState(
  status: ActionState["status"],
  message: string,
): ActionState {
  return { message, status, timeStamp: Date.now() };
}
