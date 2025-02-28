import Link from 'next/link'

const permissions = [
  {
    id: 'camera',
    name: 'Kamera',
    description: 'Akses kamera device'
  },
  {
    id: 'file',
    name: 'File',
    description: 'Akses file system'
  },
  {
    id: 'location',
    name: 'Lokasi',
    description: 'Akses lokasi device'
  },
  {
    id: 'contacts',
    name: 'Kontak',
    description: 'Akses daftar kontak'
  }
]

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Permission</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {permissions.map((permission) => (
          <Link 
            key={permission.id}
            href={`/permission/${permission.id}`}
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <h2 className="font-semibold">{permission.name}</h2>
            <p className="text-gray-600">{permission.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
} 