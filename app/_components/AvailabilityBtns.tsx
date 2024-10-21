"use client";

import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import BackDrop from "./BackDrop";
import Modal from "./Modal";
import { deleteAvailability } from "../_lib/availability";

export default function AvailabilityBtns({
  slug,
  name,
}: {
  name: string;
  slug: string;
}) {
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteAvailability(slug);
    if (result.success) {
      setSuccess(result.message);
    } else {
      setErr("Something went wrong, try again");
    }
    setIsDeleting(false);
    setShowBackDrop(false);
  };

  return (
    <div className="flex items-start">
      {success && (
        <Modal
          type="success"
          message={success}
          handleCancel={() => setSuccess("")}
        />
      )}

      {err && (
        <Modal type="fail" message={err} handleCancel={() => setErr("")} />
      )}
      <Link href={`/dashboard/availability/${slug}`}>
        {" "}
        <FiEdit className="text-2xl" />
      </Link>
      <button onClick={() => setShowBackDrop(true)}>
        {" "}
        <AiOutlineDelete className="text-2xl text-red-500 ml-2" />
      </button>

      <BackDrop
        onClose={() => setShowBackDrop(false)}
        isOpen={showBackDrop}
        message={`Are you sure you want to delete ${name}`}
        onConfirm={handleDelete}
        loading={isDeleting}
      />
    </div>
  );
}
