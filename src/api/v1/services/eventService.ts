import { CreateEventInput, Event, UpdateEventInput } from "../models/eventModel";

const events: Event[] = [];
let eventCounter = 1;

const generateEventId = (): string => {
  return `evt_${String(eventCounter++).padStart(6, "0")}`;
};

const toIsoString = (value: string | Date): string => {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
};

export const createEvent = (input: CreateEventInput): Event => {
  const now = new Date().toISOString();

  const event: Event = {
    id: generateEventId(),
    name: input.name,
    date: toIsoString(input.date),
    capacity: input.capacity,
    registrationCount: input.registrationCount ?? 0,
    status: input.status ?? "active",
    category: input.category ?? "general",
    createdAt: now,
    updatedAt: now,
  };

  events.push(event);
  return event;
};

export const getAllEvents = (): Event[] => {
  return events;
};

export const getEventById = (id: string): Event | null => {
  return events.find((event) => event.id === id) ?? null;
};

export const updateEventById = (
  id: string,
  updates: UpdateEventInput
): Event | null => {
  const existingEvent = events.find((event) => event.id === id);

  if (!existingEvent) {
    return null;
  }

  const mergedCapacity = updates.capacity ?? existingEvent.capacity;
  const mergedRegistrationCount =
    updates.registrationCount ?? existingEvent.registrationCount;

  if (mergedRegistrationCount > mergedCapacity) {
    throw new Error('"registrationCount" must be less than or equal to ref:capacity');
  }

  if (updates.name !== undefined) existingEvent.name = updates.name;
  if (updates.date !== undefined) existingEvent.date = toIsoString(updates.date);
  if (updates.capacity !== undefined) existingEvent.capacity = updates.capacity;
  if (updates.registrationCount !== undefined) {
    existingEvent.registrationCount = updates.registrationCount;
  }
  if (updates.status !== undefined) existingEvent.status = updates.status;
  if (updates.category !== undefined) existingEvent.category = updates.category;

  existingEvent.updatedAt = new Date().toISOString();

  return existingEvent;
};

export const deleteEventById = (id: string): boolean => {
  const index = events.findIndex((event) => event.id === id);

  if (index === -1) {
    return false;
  }

  events.splice(index, 1);
  return true;
};