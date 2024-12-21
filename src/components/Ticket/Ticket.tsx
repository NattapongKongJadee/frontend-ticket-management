import { Chip, Modal, Box, Typography } from "@mui/material";
import { TicketProperties } from "../../interfaces/ticket";
import dayjs from "dayjs";
import { useState } from "react";
import axios from "axios";
import apiBackend from "../../config";
const Ticket: React.FC<TicketProperties> = ({
  id,
  title,
  description,
  contact,
  createdTimestamp,
  latestUpdateTimestamp,
  status,
  onTicketChange,
}) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOepnEdit] = useState(false);
  const [localData, setLocalData] = useState({
    title,
    description,
    contact,
    status,
  });
  const handleOpenEdit = () => setOepnEdit(true);
  const handleCloseEdit = () => setOepnEdit(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const tailwindColors = {
    rejected: "#F87171",
    accepted: "#4ADE80",
    pending: "#FACC15",
    resolved: "#60A5FA",
  } as const;

  const chipColor =
    tailwindColors[status as keyof typeof tailwindColors] || "#E5E7EB";
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setLocalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const updatedTicket = {
        title: localData.title,
        description: localData.description,
        contact: localData.contact,
        status: localData.status,
      };

      const response = await axios.put(
        `${apiBackend}/api/tickets/${id}`,
        updatedTicket
      );

      if (response.status === 200) {
        console.log("Ticket updated successfully:", response.data);
        onTicketChange(id, "title", localData.title);
        onTicketChange(id, "description", localData.description);
        onTicketChange(id, "contact", localData.contact);
        onTicketChange(id, "status", localData.status);
        handleCloseEdit();
      } else {
        console.error("Failed to update ticket:", response);
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  return (
    <>
      <div
        key={id}
        className="relative bg-gray-200 rounded-xl h-36 shadow-lg p-4 hover:cursor-pointer"
        onClick={handleOpen}
      >
        <div className="absolute -top-2 right-0">
          {" "}
          <Chip
            label={status}
            size="small"
            sx={{
              backgroundColor: chipColor,
              color: "#FFFFFF", // White text
            }}
          />
        </div>
        <div className="flex flex-col">
          <div className="font-medium text-md">{title}</div>
          <div className="font-thin text-sm text-wrap ">
            {description.length > 70
              ? `${description.substring(0, 70)}...`
              : description}
          </div>
        </div>
        <div className="text-white text-sm md:text-xs absolute bottom-1 right-4">
          {" "}
          Updated:
          {dayjs(latestUpdateTimestamp).format("DD-MM-YYYY HH:mm")}
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#ffffff",
            boxShadow: 12,
            p: 4,
            borderRadius: 2,
            outline: "none",
          }}
        >
          <button
            className="btn btn-active btn-secondary absolute -top-5 -left-2"
            onClick={handleOpenEdit}
          >
            Update
          </button>
          <Typography variant="h6" component="h2" fontWeight="bold">
            {title}
          </Typography>
          <Typography sx={{ mt: 2 }}>{description}</Typography>

          <div
            style={{ display: "flex", alignItems: "center", marginTop: "16px" }}
          >
            <Chip
              label="Status:"
              size="small"
              sx={{ fontWeight: "bold", marginRight: 1 }}
            />
            <Chip
              label={status}
              size="small"
              sx={{
                backgroundColor: chipColor,
                color: "#FFFFFF", // White text
              }}
            />
          </div>

          <div
            style={{ display: "flex", alignItems: "center", marginTop: "16px" }}
          >
            <Chip
              label="Contact:"
              size="small"
              sx={{ fontWeight: "bold", marginRight: 1 }}
            />
            <Typography component="span">{contact}</Typography>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "16px" }}
          >
            <Chip
              label="Created:"
              size="small"
              sx={{ fontWeight: "bold", marginRight: 1 }}
            />
            <Typography component="span">
              {dayjs(createdTimestamp).format("DD-MM-YYYY HH:mm")}
            </Typography>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "16px" }}
          >
            <Chip
              label="Updated:"
              size="small"
              sx={{ fontWeight: "bold", marginRight: 1 }}
            />
            <Typography component="span">
              {dayjs(latestUpdateTimestamp).format("DD-MM-YYYY HH:mm")}
            </Typography>
          </div>
        </Box>
      </Modal>

      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "40%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "transparent", // Make the default background transparent
            backgroundImage: "linear-gradient(to right, #5B21B6, #EC4899)", // Gradient
            // boxShadow: 12,
            p: 4,
            borderRadius: 4,
          }}
        >
          <div className="flex items-center text-2xl text-white font-bold mb-4">
            UPDATE TICKET
          </div>
          <label className="input input-bordered flex items-center gap-4 my-2 font-semibold">
            Title :
            <input
              name="title"
              type="text"
              value={localData.title}
              className="grow font-normal"
              placeholder="Reserved Meeting Room"
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-4 my-2 font-semibold">
            Contact :
            <input
              type="text"
              name="contact"
              value={localData.contact}
              className="grow font-normal"
              placeholder="example@email.com"
              onChange={handleChange}
            />
          </label>
          <select
            className="select select-bordered text-lg w-full "
            value={localData.status}
            name="status"
            onChange={handleChange}
          >
            <option disabled selected>
              Status
            </option>
            <option value="accepted">Accepted 🟢</option>
            <option value="pending">Pending 🟡</option>
            <option value="rejected">Rejected 🔴 </option>
            <option value="resolved">Resolved 🔵</option>
          </select>
          <textarea
            name="description"
            value={localData.description}
            placeholder="Description"
            onChange={handleChange}
            className="textarea textarea-bordered textarea-lg font-normal textmd w-full my-2 "
          ></textarea>

          {/* <Typography sx={{ mt: 2 }}>Contact: {ticket.contact}</Typography> */}

          <div className="flex justify-end gap-4">
            <button className="btn btn-ghost" onClick={handleCloseEdit}>
              Cancel
            </button>
            <button
              className=" btn btn-active btn-secondary "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Ticket;
