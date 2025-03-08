const CategoryList = ({ categories, onCategoryClick }) => {
  return (
    <ul className="flex flex-wrap justify-center gap-3">
      {categories.map((category, index) => (
        <li
          key={index}
          onClick={() => onCategoryClick(category)}
          className="px-5 py-2 bg-white rounded-full shadow-md cursor-pointer 
                       hover:bg-sky-500 hover:text-white transition-all duration-300
                       border border-gray-200 hover:border-transparent"
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
