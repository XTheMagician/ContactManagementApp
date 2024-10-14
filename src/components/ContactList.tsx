import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";
import { Contact } from "../types/Contact";

interface ContactListProps {
  contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 150 },
    { field: "address", headerName: "Address", flex: 1, minWidth: 200 },
  ];

  const rows = contacts.map((contact) => ({
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone || "N/A",
    address: contact.address || "N/A",
  }));

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Contact List
      </Typography>

      {contacts.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No contacts available.
        </Typography>
      ) : (
        <div style={{ minHeight: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        </div>
      )}
    </Box>
  );
};

export default ContactList;
