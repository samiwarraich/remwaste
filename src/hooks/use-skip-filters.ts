import { useMemo } from "react";
import { useDispatch, useSelector } from "@/redux/hooks";
import { setFilter, clearFilters } from "@/redux/skips/slice";
import type { FilterKey, FilterValue, Skip } from "@/types";

export const useSkipFilters = (skips: Skip[]) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.skips);

  const uniqueSizes = useMemo(() => {
    return [...new Set(skips.map((skip) => skip.size))].sort((a, b) => a - b);
  }, [skips]);

  const handleFilterChange = (key: FilterKey, value: FilterValue) => {
    dispatch(setFilter({ key, value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== "" ||
      filters.size !== null ||
      filters.allowed_on_road !== null ||
      filters.allows_heavy_waste !== null
    );
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter(
      (value) => value !== null && value !== ""
    ).length;
  }, [filters]);

  return {
    filters,
    uniqueSizes,
    handleFilterChange,
    handleClearFilters,
    hasActiveFilters,
    activeFilterCount,
  };
};
