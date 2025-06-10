import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "@/redux/hooks";
import { fetchSkipData } from "@/redux/skips/action";
import SkipCard from "@/components/skip-card";
import FilterBar from "@/components/filter-bar";
import Loading from "@/components/loading";
import Error from "@/components/error";
import NotFound from "@/components/not-found";
import type { Skip } from "@/types";

function App() {
  const dispatch = useDispatch();
  const { skips, loading, error, filters } = useSelector(
    (state) => state.skips
  );

  useEffect(() => {
    dispatch(fetchSkipData());
  }, [dispatch]);

  const filteredSkips = useMemo(() => {
    if (!skips.length) return [];

    return skips.filter((skip: Skip) => {
      if (filters.search) {
        const skipTitle = `${skip.size} Yard Skip`;
        if (!skipTitle.toLowerCase().includes(filters.search.toLowerCase()))
          return false;
      }

      if (filters.size !== null && skip.size !== filters.size) return false;
      if (
        filters.allowed_on_road !== null &&
        skip.allowed_on_road !== filters.allowed_on_road
      )
        return false;
      if (
        filters.allows_heavy_waste !== null &&
        skip.allows_heavy_waste !== filters.allows_heavy_waste
      )
        return false;

      return true;
    });
  }, [skips, filters]);

  if (loading) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Choose your skip size
          </h1>
          <p className="text-lg text-gray-600">
            Select the skip size that best suits your needs
          </p>
        </div>
        <FilterBar skips={skips} />
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredSkips.length} of {skips.length} skips
          </p>
        </div>
        {filteredSkips.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSkips.map((skip) => (
              <SkipCard key={skip.id} skip={skip} />
            ))}
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
}

export default App;
