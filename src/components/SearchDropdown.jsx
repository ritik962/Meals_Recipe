const SearchDropdown = ({ items, onSelect, onClose }) => {
  return (
    <ul className="bg-white rounded-xl shadow-lg overflow-hidden mb-2 mt-1 max-h-60 overflow-y-auto">
      {items.map((item) => (
        <li
          onClick={() => {
            onSelect(item);
            onClose();
          }}
          className="p-3 text-lg text-gray-700 cursor-pointer hover:bg-sky-50 transition-all duration-300
                       border-b last:border-b-0 border-gray-100"
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default SearchDropdown;
