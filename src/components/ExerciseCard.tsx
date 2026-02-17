import { Link } from "react-router-dom";
import type { ExerciseListItemDto } from "../types";
import { CategoryBadge } from "./categoryBadge";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString();
}

export function ExerciseCard({ exercise }: { exercise: ExerciseListItemDto }) {
  return (
    <div className="card bg-base-100 shadow border">
      <div className="card-body space-y-2">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-lg">
            {exercise.name}
          </h2>
          <span className="text-sm opacity-70">
            {formatDate(exercise.date)}
          </span>
        </div>

        <p className="text-sm opacity-80">
          {exercise.notes}
        </p>

        <div className="flex flex-wrap gap-2">
          {exercise.categories.map((cat) => (
            <CategoryBadge key={cat.id} category={cat} />
          ))}
        </div>

        <div className="card-actions justify-end">
          <Link
            to={`/exercises/${exercise.id}`}
            className="btn btn-sm btn-primary"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
