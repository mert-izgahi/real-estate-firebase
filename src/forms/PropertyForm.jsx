import {
  Button,
  FileInput,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import toast from "react-hot-toast";
import configs from "../../configs";
import { useAppContext } from "../AppContext";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { db, storage } from "../firebase";
import { getGeoLocation } from "../helpers/getGroLocation";
import { uploadImage } from "../helpers/uploadImage";
import { addDoc, collection } from "firebase/firestore";
// import { storage } from "../firebase";
const PropertyForm = () => {
  const [isPending, setIsPending] = useState(false);
  const { user } = useAppContext();
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      state: "",
      address: "",
      price: 0,
      propertyType: "",
      rooms: 0,
      bathrooms: 0,
      area: 0,
      images: [],
    },

    validate: {
      title: (value) =>
        value.length < 3 ? "Title should include at least 3 characters" : null,
      description: (value) =>
        value.length < 3
          ? "Description should include at least 3 characters"
          : null,
      state: (value) =>
        value.length < 3 ? "State should include at least 3 characters" : null,
      address: (value) =>
        value.length < 3
          ? "Address should include at least 3 characters"
          : null,
      price: (value) => (value < 0 ? "Price should be greater than 0" : null),
      propertyType: (value) =>
        value.length < 3
          ? "Property type should include at least 3 characters"
          : null,
      rooms: (value) => (value < 0 ? "Rooms should be greater than 0" : null),
      bathrooms: (value) =>
        value < 0 ? "Bathrooms should be greater than 0" : null,

      area: (value) => (value < 0 ? "Area should be greater than 0" : null),

      images: (value) =>
        value.length < 1 ? "Images should include at least 1 images" : null,
    },
  });

  const handleSubmit = async (values) => {
    try {
      setIsPending(true);
      const {
        title,
        description,
        state,
        address,
        price,
        propertyType,
        rooms,
        bathrooms,
        area,
        images,
      } = values;
      const args = {
        title,
        description,
        state,
        address,
        price,
        propertyType,
        rooms,
        bathrooms,
        area,
        images,
      };

      // get location
      const location = await getGeoLocation(address);
      if (!location) {
        setIsPending(false);
        throw new Error("Address not found");
      }
      const { coords, formatted_address } = location;
      delete args.address;
      args.coords = coords;
      args.formatted_address = formatted_address;

      // Upload images
      const imgUrls = await Promise.all(
        images.map(async (image) => {
          return await uploadImage(image);
        })
      );
      delete args.images;
      args.imgUrls = imgUrls;
      // asign user to args
      args.user = user.id;
      // save to db
      await addDoc(collection(db, "properties"), args);
      toast.success("Property added successfully");
      setIsPending(false);
      form.reset();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <TextInput
        label="Title"
        placeholder="Title"
        description="Title of the property"
        withAsterisk
        mb="md"
        {...form.getInputProps("title")}
      />

      <Textarea
        label="Description"
        placeholder="Description"
        description="Description of the property"
        withAsterisk
        mb="md"
        rows={4}
        {...form.getInputProps("description")}
      />

      <Select
        label="State"
        withAsterisk
        mb="md"
        placeholder="State"
        data={[
          { label: "For Sale", value: "sale" },
          { label: "For Rent", value: "rent" },
        ]}
        {...form.getInputProps("state")}
        allowDeselect={false}
      />

      <TextInput
        label="Address"
        description="Address of the property"
        withAsterisk
        placeholder="Address"
        mb="md"
        {...form.getInputProps("address")}
      />

      <NumberInput
        label="Price"
        withAsterisk
        mb="md"
        min={0}
        decimalScale={2}
        precision={2}
        prefix="$"
        {...form.getInputProps("price")}
      />

      <Select
        label="Property Type"
        withAsterisk
        mb="md"
        {...form.getInputProps("propertyType")}
        data={[
          { label: "House", value: "house" },
          { label: "Apartment", value: "apartment" },
          { label: "Office", value: "office" },
          { label: "Warehouse", value: "warehouse" },
          { label: "Shop", value: "shop" },
        ]}
        allowDeselect={false}
      />
      <NumberInput
        label="Rooms"
        withAsterisk
        mb="md"
        {...form.getInputProps("rooms")}
        allowNegative={false}
      />

      <NumberInput
        label="Bathrooms"
        withAsterisk
        mb="md"
        {...form.getInputProps("bathrooms")}
        allowNegative={false}
      />

      <NumberInput
        label="Area"
        withAsterisk
        mb="md"
        {...form.getInputProps("area")}
        allowNegative={false}
      />

      <FileInput
        label="Images"
        withAsterisk
        mb="md"
        multiple
        accept="image/png,image/jpeg"
        clearable
        {...form.getInputProps("images")}
      />

      <Button loading={isPending} type="submit" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default PropertyForm;
