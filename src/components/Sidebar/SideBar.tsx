import AddCircleIcon from "@mui/icons-material/AddCircle";
import BadgeCustom from "../BadgeCustom/BadgeCustom";
import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import MarginIcon from "@mui/icons-material/Margin";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import CustomPieChart from "../PieChart/PieChart";
import apiBackend from "../../config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SideBar(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { tickets, refreshTickets }: { tickets: any[]; refreshTickets: () => void }
) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    contact: "",
    description: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const notifyValidateFormData = () =>
    toast.error("Please fill all information ! ");
  const notifyCreateSuccess = () =>
    toast.success("Created new ticket sucessfully ! ");
  const filterStatus = (statusFilter: string) => {
    const dataFilter = tickets.filter(
      (e: { status: string }) => e.status == statusFilter
    );
    return dataFilter;
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const createNewTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.contact == "" ||
      formData.title == "" ||
      formData.description == ""
    ) {
      return notifyValidateFormData();
    }
    try {
      await axios.post(`${apiBackend}/api/tickets`, formData);
      notifyCreateSuccess();
      handleClose();
      // Refetch tickets
      refreshTickets();
    } catch (e) {
      console.log("Error to create new tickets", e);
      handleClose();
    } finally {
      setFormData({ title: "", contact: "", description: "" });
    }
  };
  return (
    <>
      <div className="flex flex-col w-1/5 h-auto  mr-4 text-2xl font-bold text-white bg-gradient-to-r from-purple-700 to-pink-500 rounded-xl p-6 shadow-lg">
        <div className="flex flex-row items-start space-x-4">
          <div> TICKET MANAGEMENT</div>
          <div className="hover:cursor-pointer" onClick={handleOpen}>
            <AddCircleIcon fontSize="large" />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <CustomPieChart
            valueAccept={filterStatus("accepted").length}
            valuePending={filterStatus("pending").length}
            valueReject={filterStatus("rejected").length}
            valueResolve={filterStatus("resolved").length}
          />
        </div>
        <div className="my-6 space-y-1">
          <BadgeCustom
            title="ACCEPTED"
            color="bg-green-400"
            number={filterStatus("accepted").length}
          />
          <BadgeCustom
            title="PENDING"
            color="bg-yellow-400"
            number={filterStatus("pending").length}
          />
          <BadgeCustom
            title="RESOLVED"
            color="bg-blue-400"
            number={filterStatus("resolved").length}
          />
          <BadgeCustom
            title="REJECTED"
            color="bg-red-400"
            number={filterStatus("rejected").length}
          />
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "transparent",
            backgroundImage: "linear-gradient(to right, #5B21B6, #EC4899)",
            boxShadow: 12,
            p: 4,
            borderRadius: 4,
          }}
        >
          <div className="flex items-center text-2xl text-white font-bold mb-4">
            CREATE NEW TICKET
            <MarginIcon fontSize="large" sx={{ marginLeft: "4px" }} />
          </div>
          <label className="input input-bordered flex items-center gap-4 my-2 font-semibold">
            Title :
            <input
              name="title"
              type="text"
              value={formData.title}
              className="grow font-normal"
              placeholder="Reserved Meeting Room"
              onChange={handleInputChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-4 my-2 font-semibold">
            Contact :
            <input
              type="text"
              name="contact"
              value={formData.contact}
              className="grow font-normal"
              placeholder="example@email.com"
              onChange={handleInputChange}
            />
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="textarea textarea-bordered textarea-lg font-normal textmd w-full my-2 "
          ></textarea>
          <div className="flex flex-row my-2 space-x-2 justify-end">
            <button className="btn btn-ghost text-white" onClick={handleClose}>
              Cancel
            </button>
            <button
              className="btn btn-active btn-secondary"
              onClick={createNewTicket}
            >
              Create
            </button>
          </div>
        </Box>
      </Modal>
      <Toaster position="top-right" />
    </>
  );
}

export default SideBar;
