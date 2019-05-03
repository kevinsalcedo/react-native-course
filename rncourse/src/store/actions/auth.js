import { TRY_AUTH } from "./types";

export const tryAuth = authData => {
  return {
    type: TRY_AUTH,
    payload: authData
  };
};
