import { numberFormatter } from '@/utils/numberFormatting';
import { colorClassName } from '@/utils/colorClassName';

function CbboItem({ label, value, color = "black" }) {
  const colorClass = colorClassName(color);

  return (
    <div className="flex flex-col items-start justify-center">
      <p className="font-normal text-gray-300 text-sm">{label}</p>
      <p className={`font-semibold text-sm ${colorClass}`}>
        {numberFormatter(value)}
      </p>
    </div>
  );
}

export default CbboItem;
