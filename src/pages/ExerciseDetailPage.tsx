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
      <div className="grid place-items-center  mt-18">
        <div className="card w-full max-w-md  shadow-[0_10px_50px_rgba(0,0,0,0.15)]
 rounded-2xl">
          <div className="card-body">
            <h2 className="card-title">Exercise not found!!!</h2>
            <p>The exercise id “{id}” does not exist.</p>
            <Link to="/exercises" className="btn btn-primary btn-sm">
              Back to Exercises
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid place-items-center  mt-16">
      <div className=" w-full max-w-md  shadow-[0_10px_50px_rgba(0,0,0,0.15)]
 rounded-2xl">
        <div className="card-body">
          <h1 className="text-2xl font-semibold">{exercise.name}</h1>
          <p className="opacity-70">{formatDate(exercise.date)}</p>

          <h2 className="font-semibold">Notes</h2>
          <p className="opacity-80">{exercise.notes}</p>

          <h2 className="font-semibold">Categories</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {exercise.categories.map((c) => (
              <CategoryBadge key={c.id} category={c} />
            ))}
          </div>

          <h2 className="font-semibold ">Fields</h2>
          <div className="mt-2 ">
            <ExerciseFieldList fields={exercise.fields} />
          </div>

          <Link to="/exercises" className="btn btn-primary btn-sm">
            Back
          </Link>
        </div>
      </div>

      
    </div>
  );
}
