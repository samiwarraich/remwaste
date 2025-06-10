import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectFilter from "@/components/select-filter";
import { useSkipFilters } from "@/hooks/use-skip-filters";
import type { Skip } from "@/types";

interface FilterBarProps {
  skips: Skip[];
}

const FilterBar: React.FC<FilterBarProps> = ({ skips }) => {
  const {
    filters,
    uniqueSizes,
    handleFilterChange,
    handleClearFilters,
    hasActiveFilters,
    activeFilterCount,
  } = useSkipFilters(skips);

  const sizeOptions = [
    { value: "all", label: `All Sizes (${uniqueSizes.length})` },
    ...uniqueSizes.map((size) => ({
      value: size.toString(),
      label: `${size} Yard Skip`,
    })),
  ];

  const booleanOptions = [
    { value: "all", label: "All Options" },
    { value: "true", label: "Allowed" },
    { value: "false", label: "Not Allowed" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="relative w-full md:flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search skips..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pl-10 pr-10"
          />
          {filters.search && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
              onClick={() => handleFilterChange("search", "")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap md:justify-end items-center gap-3 w-full md:w-auto">
          <SelectFilter
            label={
              filters.size
                ? `${filters.size} Yard Skip`
                : `All Sizes (${uniqueSizes.length})`
            }
            value={filters.size?.toString() || "all"}
            onValueChange={(value) =>
              handleFilterChange(
                "size",
                value === "all" ? null : parseInt(value)
              )
            }
            options={sizeOptions}
          />
          <SelectFilter
            label="Road Placement"
            value={
              filters.allowed_on_road === null
                ? "all"
                : filters.allowed_on_road.toString()
            }
            onValueChange={(value) =>
              handleFilterChange(
                "allowed_on_road",
                value === "all" ? null : value === "true"
              )
            }
            options={booleanOptions}
          />
          <SelectFilter
            label="Heavy Waste"
            value={
              filters.allows_heavy_waste === null
                ? "all"
                : filters.allows_heavy_waste.toString()
            }
            onValueChange={(value) =>
              handleFilterChange(
                "allows_heavy_waste",
                value === "all" ? null : value === "true"
              )
            }
            options={booleanOptions}
          />
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <X className="w-4 h-4" />
              Clear Filters ({activeFilterCount})
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
