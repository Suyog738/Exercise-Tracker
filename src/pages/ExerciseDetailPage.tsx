import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ExerciseDetailDto } from "../types";
import { getExerciseById } from "../services/dataService";
import { CategoryBadge } from "../components/categoryBadge";
import { ExerciseFieldList } from "../components/ExerciseFieldList";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" });
}

export function ExerciseDetailPage() {
  const { id } = useParams();
  const exerciseId = Number(id);

  const [exercise, setExercise] = useState<ExerciseDetailDto | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setNotFound(false);

      if (!Number.isFinite(exerciseId)) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const ex = await getExerciseById(exerciseId);
      if (!ex) {
        setNotFound(true);
        setExercise(null);
      } else {
        setExercise(ex);
      }
      setLoading(false);
    }
    load();
  }, [exerciseId]);

  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <span className="loading loading-spinner"></span>
        <span>Loading exercise...</span>
      </div>
    );
  }

  if (notFound || !exercise) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">Exercise not found</h1>
        <p className="opacity-70">The exercise id “{id}” does not exist.</p>
        <Link to="/exercises" className="btn btn-primary btn-sm">
          Back to Exercises
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{exercise.name}</h1>
          <p className="opacity-70">{formatDate(exercise.date)}</p>
        </div>
        <Link to="/exercises" className="btn btn-sm">
          Back
        </Link>
      </div>

      <div className="card bg-base-200">
        <div className="card-body space-y-3">
          <div>
            <h2 className="font-semibold">Notes</h2>
            <p className="opacity-80">{exercise.notes}</p>
          </div>

          <div>
            <h2 className="font-semibold">Categories</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {exercise.categories.map((c) => (
                <CategoryBadge key={c.id} category={c} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold">Fields</h2>
            <div className="mt-2">
              <ExerciseFieldList fields={exercise.fields} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
