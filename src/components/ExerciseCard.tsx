import { Link } from "react-router-dom";
import type { ExerciseListItemDto } from "../types";
import { CategoryBadge } from "./categoryBadge";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString();
}

export function ExerciseCard({ exercise }: { exercise: ExerciseListItemDto }) {
  return (
    <>
    
      <div className="grid place-items-center  mt-16">
        <div className="card w-full max-w-md shadow-[0_10px_50px_rgba(0,0,0,0.15)]
 rounded-2xl">
          <div className="card-body">
            <h2 className="card-title text-lg">
              {exercise.name}
             <span className="text-sm opacity-70">
                {formatDate(exercise.date)}
              </span>
            </h2>

            <p className="text-sm opacity-80 pt-4">{exercise.notes}</p>

            <div className="flex flex-wrap gap-2 pt-4">
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
      </div>
    </>
  );
}
