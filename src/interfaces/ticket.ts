export interface TicketProperties {
  id: string;
  title: string;
  description: string;
  contact: string;
  createdTimestamp: string;
  latestUpdateTimestamp: string;
  status: string;
  onTicketChange: (id: string, name: string, value: string) => void;
}
