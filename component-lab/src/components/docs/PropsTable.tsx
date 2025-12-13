import type { PropDefinition } from '@/lib/component-metadata'

interface PropsTableProps {
  props: PropDefinition[]
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left p-3 border-b font-semibold text-gray-700">Name</th>
            <th className="text-left p-3 border-b font-semibold text-gray-700">Type</th>
            <th className="text-left p-3 border-b font-semibold text-gray-700">Default</th>
            <th className="text-left p-3 border-b font-semibold text-gray-700">Required</th>
            <th className="text-left p-3 border-b font-semibold text-gray-700">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map(prop => (
            <tr key={prop.name} className="border-b last:border-b-0 hover:bg-gray-50">
              <td className="p-3 font-mono text-sm text-blue-600">{prop.name}</td>
              <td className="p-3 font-mono text-sm text-gray-600">{prop.type}</td>
              <td className="p-3 font-mono text-sm text-gray-600">
                {prop.defaultValue !== undefined ? (
                  <code className="bg-gray-100 px-2 py-0.5 rounded">
                    {JSON.stringify(prop.defaultValue)}
                  </code>
                ) : (
                  '-'
                )}
              </td>
              <td className="p-3">
                {prop.required ? (
                  <span className="text-red-600 font-semibold">Yes</span>
                ) : (
                  <span className="text-gray-400">No</span>
                )}
              </td>
              <td className="p-3 text-sm text-gray-600">{prop.description || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
