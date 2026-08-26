import type { ID, ISODateString } from "./common";

export interface Experience {
  id: ID;
  company: string;
  role: string;
  location: string;
  start_date: ISODateString;
  end_date?: ISODateString;
  current: boolean;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
}
