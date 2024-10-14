import React from "react";
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
}

const AddContact: React.FC<AddContactProps> = ({ onAddContact }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
    onAddContact(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4, mb: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Add New Contact
      </Typography>

      <TextField
        label="Name"
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ""}
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
      />

      <TextField label="Phone" {...register("phone")} />

      <TextField label="Address" {...register("address")} />

      <Button type="submit" variant="contained" color="primary">
        Add Contact
      </Button>
    </Box>
  );
};

export default AddContact;
