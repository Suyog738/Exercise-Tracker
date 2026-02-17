import type { CategoryDto } from "../types";

export function CategoryBadge({ category }: { category: CategoryDto }) {
  return (
    <span className="badge text-sky-600  badge-outline">
      {category.name}
    </span>
  );
}
