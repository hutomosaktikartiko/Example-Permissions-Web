'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

interface ContactProperty {
  name: string[]
  tel: string[]
}

interface ContactsAPI extends Navigator {
  contacts: {
    select: (properties: string[]) => Promise<ContactProperty[]>
  }
}

export default function PermissionDetail() {
  const { id } = useParams()
  const [status, setStatus] = useState<string>('')
  const [error, setError] = useState<string>('')

  const requestPermission = async () => {
    try {
      switch (id) {
        case 'camera':
          const stream = await navigator.mediaDevices.getUserMedia({ video: true })
          setStatus('Kamera diizinkan!')
          // Hentikan stream setelah mendapat akses
          stream.getTracks().forEach(track => track.stop())
          break

        case 'file':
          // Tambahkan handling file yang dipilih
          const [fileHandle] = await window.showOpenFilePicker()
          const file = await fileHandle.getFile()
          setStatus(`File dipilih: ${file.name}`)
          break

        case 'location':
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          })
          setStatus(`Lokasi: ${position.coords.latitude}, ${position.coords.longitude}`)
          break

        case 'contacts':
          // Contacts API masih experimental
          if ('contacts' in navigator) {
            const contacts = await (navigator as ContactsAPI).contacts.select(['name', 'tel'])
            setStatus(`${contacts.length} kontak dipilih`)
          } else {
            throw new Error('Contacts API tidak didukung di browser ini')
          }
          break
      }
      setError('')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan'
      setError(`Error: ${errorMessage}`)
      setStatus('')
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Permission: {id}
      </h1>
      
      <button 
        onClick={requestPermission}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Minta Izin
      </button>

      {status && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          {status}
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  )
} 