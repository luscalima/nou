import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Contacts {
  created_at: Generated<Timestamp>;
  email: string;
  id: Generated<string>;
  name: string;
  updated_at: Generated<Timestamp>;
}

export interface Monitors {
  created_at: Generated<Timestamp>;
  id: Generated<string>;
  interval: Generated<number>;
  name: string;
  updated_at: Generated<Timestamp>;
  url: string;
}

export interface Notifications {
  contact_id: string;
  created_at: Generated<Timestamp>;
  id: Generated<string>;
  monitor_id: string;
  updated_at: Generated<Timestamp>;
}

export interface DB {
  contacts: Contacts;
  monitors: Monitors;
  notifications: Notifications;
}
