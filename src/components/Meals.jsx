import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import SearchDropdown from "./SearchDropdown";
import CategoryList from "./CategoryList";
import MealCard from "./MealCard";

const Meals = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("Chicken");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);

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
    if (query.trim()) {
      fetchData(query);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchData(query);
    setShowDropdown(false);
  };

  const handleCategoryClick = (category) => {
    setQuery(category);
    fetchData(category);
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    const inputQuery = value.toLowerCase();

    if (inputQuery.length > 1) {
      const filteredData = categories.filter((category) =>
        category.toLowerCase().includes(inputQuery)
      );
      setFilteredCategories(filteredData);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

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
        <div className="relative">
          <div className="flex gap-2 shadow-lg rounded-full bg-white p-2">
            <input
              className="w-full px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500"
              type="text"
              value={query}
              placeholder="Search categories..."
              onChange={handleChange}
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

          {showDropdown && (
            <SearchDropdown
              items={filteredCategories}
              onSelect={setQuery}
              onClose={() => setShowDropdown(false)}
            />
          )}
        </div>
      </form>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Popular Categories
        </h2>
        <CategoryList
          categories={categories}
          onCategoryClick={handleCategoryClick}
        />
      </section>

      {/* Meal Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {data.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
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
