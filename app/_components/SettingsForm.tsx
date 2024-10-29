"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import Image from "next/image";
import ReusableInput from "./ReusableInput";
import convertToBase64 from "../_utils/convertToBase64";
import { GreySpinner } from "./Spinner";
import { updateUser } from "../_lib/data-service";
import Modal from "./Modal";
export default function SettingsForm({ user }) {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFile] = useState("");

  const handleSubmit = async function (base64) {
    setLoading(true);
    try {
      const data = {
        image: base64,
        name: fullName,
        phoneNumber: Number(phoneNumber),
        bio,
      };
      const response = await updateUser(user.id, data);
      if (response[0]) {
        setSuccess("Profile updated successfully");
      } else {
        setErr("Something went wrong");
      }
    } catch (error) {
      setErr(error.message || "Something went wrong, could not update profile");
    } finally {
      setLoading(false);
    }
  };
  const handleIsEdit = async function () {
    if (isEdit) {
      await handleSubmit(image);
    }
    setIsEdit((prev) => !prev);
  };
  const handleFileChange = async function (event) {
    const { files } = event.target;
    const base64 = await convertToBase64(files[0]);
    setImage(base64 as string);
    await handleSubmit(base64);
    setFile(files[0]);
    // setFile(event.target.files[0]);
  };
  const handlePhoneNumber = function (event) {
    const { value } = event.target;
    if (!isNaN(Number(value))) {
      if (value.length > 11) return;
      setPhoneNumber(value);
    }
  };

  useEffect(() => {
    if (!user) return;
    if (!phoneNumber && user.phoneNumber)
      setPhoneNumber(`0${user.phoneNumber}`);
    if (!bio && user.bio) setBio(user.bio);
    if (!fullName && user.name) setFullName(user.name);
    if (!image && user.image) setImage(user.image);
    if (!email && user.email) setEmail(user.email);
  }, [user]);

  return (
    <>
      {" "}
      {err && (
        <Modal type="fail" message={err} handleCancel={() => setErr("")} />
      )}
      {success && (
        <Modal
          type="success"
          message={success}
          handleCancel={() => setSuccess("")}
        />
      )}
      <div className="flex gap-6 items-center">
        <div className="w-[150px] h-[150px] border border-[#e5e7eb] rounded-lg">
          <Image
            src={image || "/filler.svg"}
            alt="filler"
            className="w-full h-full object-cover rounded-lg"
            width={100}
            height={100}
          />
        </div>
        <div className="relative">
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0"
            name="image"
            onChange={handleFileChange}
            value={files}
            readOnly={loading}
          />
          <Button
            disabled={loading}
            style="bg-transparent disabled:bg-grey-400 rounded-lg border px-5 h-[50px] py-2 duration-300 hover:shadow-custom border-primary-400"
          >
            {loading ? <GreySpinner /> : "Change Photo"}
          </Button>
        </div>
      </div>
      <div className="flex mt-12  mb-8 justify-between items-center">
        <span className="text-2xl font-bold">Personalize</span>
        <Button
          onClick={handleIsEdit}
          disabled={loading}
          style="bg-transparent disabled:bg-grey-400  rounded-lg border px-5 h-[50px] py-2 duration-300 hover:shadow-custom border-primary-400"
        >
          {loading ? <GreySpinner /> : isEdit ? "Save changes" : "Edit profile"}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <ReusableInput
          name="fullName"
          readOnly={!isEdit}
          value={fullName}
          label="Full Name"
          onChange={(e) => setFullName(e.target.value)}
        />
        <ReusableInput
          name="email"
          readOnly={user.email}
          value={user.email}
          label="Email"
        />
        <ReusableInput
          label="Phone Number"
          readOnly={!isEdit}
          value={phoneNumber}
          name="phoneNumber"
          onChange={handlePhoneNumber}
        />
        <ReusableInput
          name="dateJoined"
          readOnly={true}
          value={"OCt, 06, 2024"}
          label="Date Joined"
        />
        <ReusableInput
          name="bio"
          placeholder="A short intro about yourself"
          label="Bio"
          inputType="textarea"
          readOnly={!isEdit}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
    </>
  );
}
