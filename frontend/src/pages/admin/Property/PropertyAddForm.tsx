import React, { FormEvent } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  FormInput,
  FormLabel,
  SelectInput,
} from "../../../components/Admin/Form";
import { useFormChange } from "../../../components/utils/hook";

const PropertyAddForm = () => {
  const navigateTo = useNavigate();

  const { values, handleChange } = useFormChange({
    name: "",
    location: "",
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    photos: [""],
    type: "CITY",
    agentId: "",
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="bg-brown-200 min-h-screen py-12 px-10">
      <div className="bg-white rounded-lg p-5 pb-20">
        <h1 className="text-xl font-medium uppercase">Add new property</h1>
        <button
          onClick={() => navigateTo("/admin/property")}
          className="uppercase text-sm flex gap-2 items-center mt-3">
          <FaArrowLeft />
          Back to property list
        </button>
        <form
          onSubmit={handleFormSubmit}
          className="mt-7 mx-auto w-[30rem] flex flex-col gap-3">
          <div>
            <FormLabel htmlFor="name" label="name" id="name-label" />
            <FormInput
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <FormLabel
              htmlFor="location"
              label="location"
              id="location-label"
            />
            <FormInput
              id="location"
              name="location"
              type="text"
              autoComplete="off"
              value={values.location}
              onChange={handleChange}
            />
          </div>
          <div>
            <FormLabel htmlFor="price" label="price" id="price-label" />
            <FormInput
              id="price"
              name="price"
              type="number"
              min={0}
              autoComplete="off"
              value={values.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <FormLabel
              htmlFor="bedrooms"
              label="bedrooms"
              id="bedrooms-label"
            />
            <FormInput
              id="bedrooms"
              name="bedrooms"
              type="number"
              min={0}
              autoComplete="off"
              value={values.bedrooms}
              onChange={handleChange}
            />
          </div>
          <div>
            <FormLabel
              htmlFor="bathrooms"
              label="bathrooms"
              id="bathrooms-label"
            />
            <FormInput
              id="bathrooms"
              name="bathrooms"
              type="number"
              min={0}
              autoComplete="off"
              value={values.bathrooms}
              onChange={handleChange}
            />
          </div>
          <div>
            <FormLabel htmlFor="photos" label="photos" id="photos" />
            <FormInput
              id="photos"
              name="photos"
              type="text"
              autoComplete="off"
              placeholder="['image_url','image_url']"
              value={values.photos}
              onChange={handleChange}
            />
          </div>
          <div>
            <FormLabel htmlFor="type" label="type" id="type" />
            <SelectInput
              id="type"
              name="type"
              options={["CITY", "RURAL", "MOUNTAIN", "TROPICAL"]}
              defaultValue="CITY"
              value={values.type}
              onChange={handleChange}
            />
          </div>
          <div>
            <FormLabel htmlFor="agentId" label="agentId" id="agentId" />
            <FormInput
              id="agentId"
              name="agentId"
              type="text"
              autoComplete="off"
              value={values.agentId}
              onChange={handleChange}
            />
          </div>

          <p className=" text-red-500 p-2 rounded-md text-base font-medium text-center mt-3"></p>
          <button
            className="bg-black text-white p-2 mt-5 rounded-lg flex justify-center w-full"
            type="submit">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default PropertyAddForm;
