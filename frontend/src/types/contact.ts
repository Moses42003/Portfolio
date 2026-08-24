import type { ID, ISODateString, MessageStatus } from "./common";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessage extends ContactPayload {
  id: ID;
  status: MessageStatus;
  received_at: ISODateString;
}
