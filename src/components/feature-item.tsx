import { X, Check } from "lucide-react";

interface FeatureItemProps {
  label: string;
  available: boolean;
}

const FeatureItem = ({ label, available }: FeatureItemProps) => (
  <div
    className={`flex items-center gap-2 text-sm ${
      available ? "text-green-700" : "text-red-700"
    }`}
  >
    {available ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
    <span>{label}</span>
  </div>
);

export default FeatureItem;
