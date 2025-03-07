import { useEffect, useState } from "react";

const Meals = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("Chicken");

  const categories = [
    "Beef",
    "Breakfast",
    "Chicken",
    "Dessert",
    "Goat",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian",
  ];

  const fetchData = async (category) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

      const result = await response.json();
      setData(result.meals || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(query);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchData(query);
  };

  const handleCategoryClick = (category) => {
    setQuery(category);
    fetchData(category);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-100 p-4 rounded-lg max-w-md">
          <h2 className="text-red-600 text-xl font-semibold mb-2">Error!</h2>
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen w-11/12 sm:w-5/6 mx-auto py-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {query} Specialties
        </h1>
        <p className="text-gray-600">
          Discover delicious {query.toLowerCase()} recipes
        </p>
      </header>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
        <div className="flex gap-2 shadow-lg rounded-full bg-white p-2">
          <input
            className="w-full px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500"
            type="text"
            value={query}
            placeholder="Search categories..."
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search meal categories"
          />
          <button
            type="submit"
            className="bg-sky-500 text-white px-8 py-3 rounded-full hover:bg-sky-600 transition-all 
                       focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </form>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Popular Categories
        </h2>
        <ul className="flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => handleCategoryClick(category)}
              className="px-5 py-2 bg-white rounded-full shadow-md cursor-pointer 
                         hover:bg-sky-500 hover:text-white transition-all duration-300
                         border border-gray-200 hover:border-transparent"
            >
              {category}
            </li>
          ))}
        </ul>
      </section>

      {/* Meal Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {data.map(({ idMeal, strMeal, strMealThumb }) => (
          <article
            key={idMeal}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all 
                       hover:shadow-xl hover:-translate-y-2 group"
          >
            <div className="relative overflow-hidden">
              <img
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                src={strMealThumb}
                alt={strMeal}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {strMeal}
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
        ))}
      </section>

      {/* Empty State */}
      {data.length === 0 && !loading && (
        <div className="text-center mt-16">
          <div className="text-gray-500 text-xl mb-4">
            🍳 No meals found for "{query}"
          </div>
          <p className="text-gray-600">Try searching for another category!</p>
        </div>
      )}
    </div>
  );
};

export default Meals;
