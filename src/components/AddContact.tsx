import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Contact } from "../types/Contact";

interface ContactFormInputs {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface AddContactProps {
  onAddContact: (contact: Omit<Contact, "id">) => void;
  editingContact: Contact | null;
}

const AddContact: React.FC<AddContactProps> = ({ onAddContact, editingContact }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const watchedName = watch("name");
  const watchedEmail = watch("email");
  const watchedPhone = watch("phone");
  const watchedAddress = watch("address");

  useEffect(() => {
    if (editingContact) {
      setValue("name", editingContact.name);
      setValue("email", editingContact.email);
      setValue("phone", editingContact.phone || "");
      setValue("address", editingContact.address || "");
    }
  }, [editingContact, setValue]);

  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
    onAddContact(data);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2, my: 4 }}>
      <Typography variant="h5" gutterBottom>
        {editingContact ? "Edit Contact" : "Add New Contact"}
      </Typography>

      <TextField
        label="Name"
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ""}
        slotProps={{
          inputLabel: { shrink: Boolean(watchedName) },
        }}
      />

      <TextField
        label="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Enter a valid email",
          },
        })}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
        slotProps={{
          inputLabel: { shrink: Boolean(watchedEmail) },
        }}
      />

      <TextField
        label="Phone"
        {...register("phone")}
        error={!!errors.phone}
        helperText={errors.phone ? errors.phone.message : ""}
        slotProps={{
          inputLabel: { shrink: Boolean(watchedPhone) },
        }}
      />

      <TextField
        label="Address"
        {...register("address")}
        slotProps={{
          inputLabel: { shrink: Boolean(watchedAddress) },
        }}
      />

      <Button type="submit" variant="contained" color="primary">
        {editingContact ? "Update Contact" : "Add Contact"}
      </Button>
    </Box>
  );
};

export default AddContact;
