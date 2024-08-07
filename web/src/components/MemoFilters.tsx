import { isEqual } from "lodash-es";
import { FilterFactor, getMemoFilterKey, MemoFilter, useMemoFilterStore } from "@/store/v1";
import Icon from "./Icon";

const MemoFilters = () => {
  const memoFilterStore = useMemoFilterStore();
  const filters = memoFilterStore.filters;

  const getFilterDisplayText = (filter: MemoFilter) => {
    if (filter.value) {
      return filter.value;
    }
    if (filter.factor.startsWith("property.")) {
      return filter.factor.replace("property.", "");
    }
    return filter.factor;
  };

  if (filters.length === 0) {
    return undefined;
  }

  return (
    <div className="w-full mb-2 flex flex-row justify-start items-start gap-2">
      <span className="flex flex-row items-center gap-0.5 text-gray-500 text-sm leading-6 border border-transparent">
        <Icon.Filter className="w-4 h-auto opacity-60 inline" />
        Filters
      </span>
      <div className="flex flex-row justify-start items-center flex-wrap gap-2 leading-6 h-6">
        {filters.map((filter) => (
          <div
            key={getMemoFilterKey(filter)}
            className="flex flex-row items-center gap-1 bg-white dark:bg-zinc-800 border dark:border-zinc-700 pl-1.5 pr-1 rounded-md hover:line-through cursor-pointer"
            onClick={() => memoFilterStore.removeFilter((f) => isEqual(f, filter))}
          >
            <FactorIcon className="w-4 h-auto text-gray-500 dark:text-gray-400 opacity-60" factor={filter.factor} />
            <span className="text-gray-500 dark:text-gray-400 text-sm max-w-32 truncate">{getFilterDisplayText(filter)}</span>
            <button className="text-gray-500 dark:text-gray-300 opacity-60 hover:opacity-100">
              <Icon.X className="w-4 h-auto" />
            </button>
          </div>
        ))}
        <div
          className="flex flex-row items-center gap-1 pl-1.5 pr-1 hover:opacity-80 cursor-pointer"
          onClick={() => memoFilterStore.setOrderByTimeAsc(!memoFilterStore.orderByTimeAsc)}
        >
          <Icon.Clock className="w-4 h-auto text-gray-500 dark:text-gray-400 opacity-60" />
          <span className="text-gray-500 dark:text-gray-400 text-sm max-w-32 truncate">
            {memoFilterStore.orderByTimeAsc ? "Asc" : "Desc"}
          </span>
        </div>
      </div>
    </div>
  );
};

const FactorIcon = ({ factor, className }: { factor: FilterFactor; className?: string }) => {
  const iconMap = {
    tagSearch: <Icon.Tag className={className} />,
    visibility: <Icon.Eye className={className} />,
    contentSearch: <Icon.Search className={className} />,
    displayTime: <Icon.Calendar className={className} />,
    "property.hasLink": <Icon.Link className={className} />,
    "property.hasTaskList": <Icon.CheckCircle className={className} />,
    "property.hasCode": <Icon.Code className={className} />,
  };
  return iconMap[factor as keyof typeof iconMap] || <></>;
};

export default MemoFilters;
