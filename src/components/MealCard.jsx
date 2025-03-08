const MealCard = ({ meal }) => {
  return (
    <article
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all 
                   hover:shadow-xl hover:-translate-y-2 group"
    >
      <div className="relative overflow-hidden">
        <img
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          src={meal.strMealThumb}
          alt={meal.strMeal}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {meal.strMeal}
        </h3>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="w-full bg-sky-500 text-white py-2 px-4 rounded-md
                        hover:bg-sky-600 transition-colors"
          >
            View Recipe
          </button>
        </div>
      </div>
    </article>
  );
};

export default MealCard;
