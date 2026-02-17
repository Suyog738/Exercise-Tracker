import type { CategoryDto } from "../types";

export function CategoryBadge({ category }: { category: CategoryDto }) {
  return (
    <span className="badge badge-outline">
      {category.name}
    </span>
  );
}
