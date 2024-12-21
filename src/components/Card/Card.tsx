import React from "react";
import Ticket from "../Ticket/Ticket";
import { CardProperties } from "../../interfaces/card";

const Card: React.FC<CardProperties> = ({
  title,
  color,
  tickets,
  onTicketChange,
}) => {
  return (
    <div className="relative w-1/4 h-screen bg-gray-100 rounded-xl shadow-md shadow-black overflow-y-auto">
      <div
        className={`flex w-full items-center justify-center ${color} text-white rounded-t-xl h-10 shadow-sm shadow-black`}
      >
        {" "}
        {title.toUpperCase()}
      </div>
      <div className="p-6 space-y-4">
        {tickets
          .sort(
            (a, b) =>
              new Date(b.latestUpdateTimestamp).getTime() -
              new Date(a.latestUpdateTimestamp).getTime()
          )
          .map((ticket) => (
            <Ticket
              key={ticket.id}
              {...ticket}
              onTicketChange={onTicketChange}
            />
          ))}
      </div>
    </div>
  );
};

export default Card;
