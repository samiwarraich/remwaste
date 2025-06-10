import React from "react";
import { Calendar, Truck, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "@/redux/hooks";
import { selectSkip } from "@/redux/skips/slice";
import FeatureItem from "@/components/feature-item";
import CostItem from "@/components/cost-item";
import { DEFAULT_SKIP_IMG } from "@/constants";
import type { Skip } from "@/types";

const SkipCard = ({ skip }: { skip: Skip }) => {
  const dispatch = useDispatch();
  const selectedSkipId = useSelector((state) => state.skips.selectedSkipId);
  const isSelected = selectedSkipId === skip.id;

  const totalPrice = skip.price_before_vat + skip.vat;

  const additionalCosts = [
    skip.transport_cost && {
      icon: <Truck className="w-4 h-4 text-blue-600" />,
      label: "Transport",
      value: skip.transport_cost,
    },
    skip.per_tonne_cost && {
      icon: <Scale className="w-4 h-4 text-blue-600" />,
      label: "Per tonne",
      value: skip.per_tonne_cost,
    },
  ].filter(Boolean) as {
    icon: React.JSX.Element;
    label: string;
    value: number;
  }[];

  const handleSelectSkip = () => {
    if (!skip.forbidden) {
      dispatch(selectSkip(isSelected ? null : skip.id));
    }
  };

  return (
    <Card
      className={`group border-0 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col pt-0 ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={DEFAULT_SKIP_IMG}
          alt={`${skip.size} yard skip`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <CardContent className="px-6 flex flex-col flex-1">
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-base font-bold mb-1">
                  {skip.size} Yard Skip
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{skip.hire_period_days} day hire</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  £{totalPrice.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">inc. VAT</div>
              </div>
            </div>
            <div className="space-y-1">
              <FeatureItem
                label="Road placement"
                available={skip.allowed_on_road}
              />
              <FeatureItem
                label="Heavy waste"
                available={skip.allows_heavy_waste}
              />
            </div>
          </div>
          <div className="pt-2 border-t mt-2 space-y-2">
            <h4 className="text-sm font-medium text-gray-700">
              Additional Costs
            </h4>
            {additionalCosts.length > 0 ? (
              additionalCosts.map((cost, index) => (
                <CostItem
                  key={index}
                  icon={cost.icon}
                  label={cost.label}
                  value={cost.value}
                />
              ))
            ) : (
              <div className="text-sm text-gray-400">None</div>
            )}
          </div>
        </div>
        <Button
          className="mt-6 cursor-pointer"
          disabled={skip.forbidden}
          variant={isSelected ? "secondary" : "default"}
          onClick={handleSelectSkip}
        >
          {isSelected ? "Selected" : "Select Skip"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SkipCard;
