import { Request, Response } from "express";
import {
  createEvent,
  deleteEventById,
  getAllEvents,
  getEventById,
  updateEventById,
} from "../services/eventService";

export const createEventHandler = (req: Request, res: Response): void => {
  const event = createEvent(req.body);

  res.status(201).json({
    message: "Event created",
    data: event,
  });
};

export const getAllEventsHandler = (_req: Request, res: Response): void => {
  const events = getAllEvents();

  res.status(200).json({
    message: "Events retrieved",
    count: events.length,
    data: events,
  });
};

export const getEventByIdHandler = (req: Request, res: Response): void => {
  const id = String(req.params.id);
  const event = getEventById(id);

  if (!event) {
    res.status(404).json({
      message: "Event not found",
    });
    return;
  }

  res.status(200).json({
    message: "Event retrieved",
    data: event,
  });
};

export const updateEventByIdHandler = (req: Request, res: Response): void => {
  try {
    const id = String(req.params.id);
    const event = updateEventById(id, req.body);

    if (!event) {
      res.status(404).json({
        message: "Event not found",
      });
      return;
    }

    res.status(200).json({
      message: "Event updated",
      data: event,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid update request";

    res.status(400).json({
      message: `Validation error: ${message}`,
    });
  }
};

export const deleteEventByIdHandler = (req: Request, res: Response): void => {
  const id = String(req.params.id);
  const deleted = deleteEventById(id);

  if (!deleted) {
    res.status(404).json({
      message: "Event not found",
    });
    return;
  }

  res.status(200).json({
    message: "Event deleted",
  });
};