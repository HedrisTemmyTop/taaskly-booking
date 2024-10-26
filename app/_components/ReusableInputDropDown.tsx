import { useEffect, useState } from "react";

export default function ReusableInputDropDown({
  label,
  name,
  placeholder,
  type = "text",
  onSelect,
  data,
}) {
  const [filteredData, setFilteredData] = useState(data || []);
  const [query, setQuery] = useState("");
  const [dropdown, setShowDropdown] = useState(false);
  // console.log(va)
  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (!dropdown) setShowDropdown(true);
  };

  const handleSelect = (d) => {
    setQuery(d.name);
    setShowDropdown(false);
    onSelect(d);
  };

  useEffect(() => {
    if (!query) {
      setFilteredData(data); // Reset to original data if query is empty
    } else {
      const filter = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filter);
    }
  }, [query, data]);

  return (
    <div className="flex flex-col gap-1 w-full relative">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="border-[1.5px] outline-0 py-1 px-4 border-primary-400 rounded-lg text-inherit w-full h-12"
        value={query}
        onChange={handleChange}
      />

      {dropdown && ( // Show dropdown only if there are filtered items
        <div className="rounded-lg absolute top-[105%] py-4 border border-primary-400 bg-secondary-400 w-full max-h-[300px] overflow-auto flex flex-col gap-1">
          {filteredData.length > 0 ? (
            filteredData.map((item) => {
              return (
                <div
                  className="text-red-600 px-4 py-2 hover:bg-primary-400 hover:text-secondary-400 duration-100 cursor-pointer"
                  key={item.value}
                  onClick={() => handleSelect(item)}
                >
                  {item.name}
                </div>
              );
            })
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
