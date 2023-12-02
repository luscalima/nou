import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Contacts {
  createdAt: Generated<Timestamp>;
  email: string;
  id: Generated<string>;
  name: string;
  updatedAt: Generated<Timestamp>;
}

export interface Monitors {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  interval: Generated<number>;
  name: string;
  updatedAt: Generated<Timestamp>;
  url: string;
}

export interface Notifications {
  contactId: string;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  monitorId: string;
  updatedAt: Generated<Timestamp>;
}

export interface DB {
  contacts: Contacts;
  monitors: Monitors;
  notifications: Notifications;
}
