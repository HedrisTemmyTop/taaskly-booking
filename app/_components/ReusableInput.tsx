import React from "react";
interface IReusableInput {
  label: string;
  name: string;
  placeholder?: string;
  inputType?: string;
  type?: string;
  option?: string[] | { name: string; id: string }[];
  value?: string | number | null;
  tag?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void; // Correct type
}

export default function ReusableInput({
  label,
  name,
  placeholder,
  inputType = "input",
  type = "text",
  option,
  onChange,
  value,
  tag = "obj",
}: IReusableInput) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={label} className="font-medium">
        {label}
      </label>
      {inputType === "textarea" && (
        <textarea
          rows={3}
          name={name}
          placeholder={placeholder}
          className="border-[1.5px]  outline-0  p-4 border-primary-400
rounded-lg text-inherit w-[100%] "
          onChange={onChange}
          value={value || ""}
        />
      )}
      {inputType === "input" && (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="border-[1.5px]  outline-0 py-1 px-4 border-primary-400
    rounded-lg text-inherit w-[100%] h-12"
          value={value !== null ? value : ""}
          onChange={onChange}
        />
      )}
      {inputType === "select" && (
        <select
          name={name}
          className="border-[1.5px]  outline-0 py-1 px-4 border-primary-400
    rounded-lg text-inherit w-[100%] h-12"
          value={value || ""}
          onChange={onChange}
        >
          {/* <option value="" disabled></option> */}
          <option value="" disabled>
            {" "}
            Select {name}
          </option>
          {tag === "obj" &&
            option?.map((op) => (
              <option value={op.id} key={op.id} id={op.id}>
                {op.name}
              </option>
            ))}
          {tag !== "obj" &&
            option?.map((op) => (
              <option value={op} key={op}>
                {op}
              </option>
            ))}
        </select>
      )}
    </div>
  );
}
