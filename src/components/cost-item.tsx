interface CostItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

const CostItem = ({ icon, label, value }: CostItemProps) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-2 text-gray-700">
      {icon}
      <span>{label}</span>
    </div>
    <span className="font-semibold text-gray-900">£{value.toFixed(2)}</span>
  </div>
);

export default CostItem;
