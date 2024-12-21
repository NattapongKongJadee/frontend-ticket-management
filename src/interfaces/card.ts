import { TicketProperties } from "./ticket";
export interface CardProperties {
  title: string;
  color: string;
  tickets: TicketProperties[]; // Add this to accept filtered tickets
  onTicketChange: (id: string, name: string, value: string) => void;
}
