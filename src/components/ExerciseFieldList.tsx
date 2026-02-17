import type { ExerciseFieldDto } from "../types";

export function ExerciseFieldList({ fields }: { fields: ExerciseFieldDto[] }) {
  if (fields.length === 0) {
    return <p className="opacity-70">No fields recorded.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.id}>
              <td className="capitalize">{field.name}</td>
              <td>{field.value}</td>
              <td>{field.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
