import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import SideBar from "./components/Sidebar/SideBar";
import { TicketProperties } from "./interfaces/ticket";
import axios from "axios";
import apiBackend from "./config";

const App = () => {
  const [tickets, setTickets] = useState<TicketProperties[]>([]);

  const fetchTickets = async () => {
    console.log("Fetch Token !!");
    try {
      const response = await axios.get(`${apiBackend}/api/tickets`);
      console.log(response.data);
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const filterStatus = (statusFilter: string) => {
    const dataFilter = tickets.filter(
      (ticket) => ticket.status === statusFilter
    );
    // console.log("Filtered Data:", dataFilter);
    return dataFilter;
  };

  const handleTicketChange = (id: string, name: string, value: string) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, [name]: value } : ticket
      )
    );
  };

  useEffect(() => {
    fetchTickets();
    filterStatus("pending");
  }, []);

  return (
    <div className="flex w-screen flex-row py-4 px-8">
      <SideBar tickets={tickets} refreshTickets={fetchTickets} />

      <div className="flex flex-col w-4/5 bg-gradient-to-b from-blue-800 to-teal-600  p-6 rounded-xl shadow-lg overflow-y-auto">
        <div className="flex flex-row overflow-y-auto space-x-6  ">
          <Card
            title="accepted"
            color="bg-green-400"
            tickets={filterStatus("accepted")}
            onTicketChange={handleTicketChange}
          />
          <Card
            title="pending"
            color="bg-yellow-400"
            tickets={filterStatus("pending")}
            onTicketChange={handleTicketChange}
          />
          <Card
            title="resolved"
            color="bg-blue-400"
            tickets={filterStatus("resolved")}
            onTicketChange={handleTicketChange}
          />
          <Card
            title="rejected"
            color="bg-red-400"
            tickets={filterStatus("rejected")}
            onTicketChange={handleTicketChange}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
