import { useEffect, useMemo, useState } from "react";
import type { CategoryDto, ExerciseListItemDto } from "../types";
import { getCategories, getExercises } from "../services/dataService";
import { ExerciseCard } from "../components/ExerciseCard";

type DateFilter = "all" | "today" | "week" | "month";

function isInRange(dateStr: string, filter: DateFilter): boolean {
  if (filter === "all") return true;

  const d = new Date(dateStr);
  const now = new Date();

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrowStart = new Date(todayStart.getTime() + 86400000);

  const weekAgo = new Date(todayStart);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const monthAgo = new Date(todayStart);
  monthAgo.setMonth(monthAgo.getMonth() - 1);

  if (filter === "today") return d >= todayStart && d < tomorrowStart;
  if (filter === "week") return d >= weekAgo;
  if (filter === "month") return d >= monthAgo;

  return true;
}

export function ExerciseListPage() {
  const [exercises, setExercises] = useState<ExerciseListItemDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [exList, catList] = await Promise.all([getExercises(), getCategories()]);
      setExercises(exList);
      setCategories(catList);
      setLoading(false);
    }
    load();
  }, []);

  const toggleCategory = (id: number) => {
    setCategoryFilter((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      if (!isInRange(ex.date, dateFilter)) return false;
      if (categoryFilter.length === 0) return true;
      const exCategoryIds = ex.categories.map((c) => c.id);
      return categoryFilter.some((id) => exCategoryIds.includes(id));
    });
  }, [exercises, dateFilter, categoryFilter]);

  return (
    <>
    <div className="space-y-4">
      {/* <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">Exercises</h1>
      </div> */}

      {/* Filters */}
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex flex-wrap gap-6">
            <div>
              <label className="label">
                <span className="label-text font-medium">Date</span>
              </label>
              <select
                className="select select-bordered select-sm"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as DateFilter)}
              >
                <option value="all">All</option>
                <option value="today">Today</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Category</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <label key={cat.id} className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={categoryFilter.includes(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                    />
                    <span className="label-text">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="ml-auto flex items-end">
              <button
                className="btn btn-sm"
                onClick={() => {
                  setDateFilter("all");
                  setCategoryFilter([]);
                }}
              >
                Clear filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center gap-3">
          <span className="loading loading-spinner"></span>
          <span>Loading exercises...</span>
        </div>
      ) : filteredExercises.length === 0 ? (
        <p className="opacity-70">No exercises match the filters.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredExercises.map((ex) => (
            <ExerciseCard key={ex.id} exercise={ex} />
          ))}
        </div>
      )}
    </div>
    </>
  );
}
