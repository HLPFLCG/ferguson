'use client'

import { useState, useEffect } from 'react'
import content from '@/data/content.json'
import rooms from '@/data/rooms.json'

type ContentData = typeof content
type RoomsData = typeof rooms

type HotelBooking = {
  id: string
  checkIn: string
  checkOut: string
  nights: number
  rooms: number
  guestName: string
  guestEmail: string
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
  notes?: string
}

export default function AdminPage() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState<'content' | 'rooms' | 'hotel'>('content')
  const [contentData, setContentData] = useState<ContentData>(content)
  const [roomsData, setRoomsData] = useState<RoomsData>(rooms)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [hotelBookings, setHotelBookings] = useState<HotelBooking[]>([])
  const [hotelLoading, setHotelLoading] = useState(false)
  const [hotelError, setHotelError] = useState('')
  const [updatingHotelId, setUpdatingHotelId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user)
          setAuthStatus('authenticated')
        } else {
          setAuthStatus('unauthenticated')
        }
      })
      .catch(() => setAuthStatus('unauthenticated'))
  }, [])

  const fetchHotelBookings = async () => {
    setHotelLoading(true)
    setHotelError('')
    try {
      const res = await fetch('/api/hotel-bookings/list')
      const data = await res.json()
      if (!res.ok) {
        setHotelError(data.error || 'Failed to load hotel bookings.')
      } else if (data.unavailable) {
        setHotelError('Storage not configured — hotel bookings unavailable.')
      } else {
        setHotelBookings(data.bookings)
      }
    } catch {
      setHotelError('Network error loading hotel bookings.')
    } finally {
      setHotelLoading(false)
    }
  }

  const updateHotelBookingStatus = async (id: string, status: string) => {
    setUpdatingHotelId(id)
    setHotelError('')
    try {
      const res = await fetch(`/api/hotel-bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const data = await res.json()
      if (res.ok && data.booking) {
        setHotelBookings((prev: HotelBooking[]) =>
          prev.map((b: HotelBooking) => (b.id === id ? data.booking : b))
        )
      } else {
        setHotelError(data.error || 'Failed to update booking status.')
      }
    } catch {
      setHotelError('Network error updating booking status.')
    } finally {
      setUpdatingHotelId(null)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      const data = await res.json()
      setUser({ email: data.email })
      setAuthStatus('authenticated')
    } else {
      setLoginError('Invalid email or password.')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    setAuthStatus('unauthenticated')
  }

  const handleSave = async (file: 'content' | 'rooms') => {
    setSaving(true)
    setSaveMsg('')
    try {
      const data = file === 'content' ? contentData : roomsData
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file, data }),
      })
      if (res.ok) {
        setSaveMsg('Saved successfully!')
      } else {
        setSaveMsg('Error saving. Please try again.')
      }
    } catch {
      setSaveMsg('Error saving. Please try again.')
    } finally {
      setSaving(false)
      setTimeout(() => setSaveMsg(''), 3000)
    }
  }

  if (authStatus === 'loading') {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center pt-16">
        <div className="text-jungle">Loading...</div>
      </div>
    )
  }

  if (authStatus === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center pt-16 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h1 className="font-heading text-3xl text-jungle mb-2">Admin Login</h1>
          <p className="text-gray-600 text-sm mb-8">Hotel Manzanillo Content Management</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-jungle/20 focus:border-jungle"
                placeholder="admin@manzanillo.lat"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-jungle/20 focus:border-jungle"
                required
              />
            </div>
            {loginError && (
              <p className="text-coral text-sm">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-jungle hover:bg-jungle/90 text-sand font-semibold py-3 rounded-xl transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sand pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl text-jungle">Content Dashboard</h1>
            <p className="text-gray-600 text-sm mt-1">Logged in as {user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-jungle border border-gray-300 px-4 py-2 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['content', 'rooms', 'hotel'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                if (tab === 'hotel' && hotelBookings.length === 0 && !hotelLoading) {
                  fetchHotelBookings()
                }
              }}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-jungle text-sand'
                  : 'bg-white text-gray-600 hover:bg-sand border border-gray-200'
              }`}
            >
              {tab === 'content' ? 'Page Content' : tab === 'rooms' ? 'Rooms & Pricing' : 'Hotel Bookings'}
            </button>
          ))}
        </div>

        {/* Content editor */}
        {activeTab === 'content' && (
          <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
            <h2 className="font-heading text-2xl text-jungle">Page Content</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Home Tagline</label>
              <input
                type="text"
                value={contentData.home.tagline}
                onChange={(e) =>
                  setContentData((prev) => ({
                    ...prev,
                    home: { ...prev.home, tagline: e.target.value },
                  }))
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-jungle/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Home Subheading</label>
              <textarea
                value={contentData.home.subhead}
                onChange={(e) =>
                  setContentData((prev) => ({
                    ...prev,
                    home: { ...prev.home, subhead: e.target.value },
                  }))
                }
                rows={3}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-jungle/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">About Page Content</label>
              <textarea
                value={contentData.about.content}
                onChange={(e) =>
                  setContentData((prev) => ({
                    ...prev,
                    about: { ...prev.about, content: e.target.value },
                  }))
                }
                rows={12}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-jungle/20 font-mono"
              />
              <p className="text-xs text-gray-500 mt-1">Separate paragraphs with a blank line (\n\n)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Philosophy Content</label>
              <textarea
                value={contentData.pricing.content}
                onChange={(e) =>
                  setContentData((prev) => ({
                    ...prev,
                    pricing: { ...prev.pricing, content: e.target.value },
                  }))
                }
                rows={10}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-jungle/20 font-mono"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => handleSave('content')}
                disabled={saving}
                className="bg-jungle hover:bg-jungle/90 text-sand font-semibold px-8 py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              {saveMsg && (
                <p className={`text-sm ${saveMsg.includes('Error') ? 'text-coral' : 'text-teal'}`}>
                  {saveMsg}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Rooms editor */}
        {activeTab === 'rooms' && (
          <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
            <h2 className="font-heading text-2xl text-jungle">Rooms &amp; Pricing</h2>
            {roomsData.map((room, i) => (
              <div key={room.id} className="border border-sand rounded-xl p-6">
                <h3 className="font-heading text-lg text-jungle mb-4">{room.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={room.description}
                      onChange={(e) => {
                        const updated = [...roomsData]
                        updated[i] = { ...updated[i], description: e.target.value }
                        setRoomsData(updated)
                      }}
                      rows={3}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-jungle/20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Local Rate ($)</label>
                      <input
                        type="number"
                        value={room.localRate}
                        onChange={(e) => {
                          const updated = [...roomsData]
                          updated[i] = { ...updated[i], localRate: Number(e.target.value) }
                          setRoomsData(updated)
                        }}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-jungle/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Visitor Rate ($)</label>
                      <input
                        type="number"
                        value={room.visitorRate}
                        onChange={(e) => {
                          const updated = [...roomsData]
                          updated[i] = { ...updated[i], visitorRate: Number(e.target.value) }
                          setRoomsData(updated)
                        }}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-jungle/20"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => handleSave('rooms')}
                disabled={saving}
                className="bg-jungle hover:bg-jungle/90 text-sand font-semibold px-8 py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              {saveMsg && (
                <p className={`text-sm ${saveMsg.includes('Error') ? 'text-coral' : 'text-teal'}`}>
                  {saveMsg}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Hotel bookings */}
        {activeTab === 'hotel' && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl text-jungle">Hotel Bookings</h2>
              <button
                onClick={fetchHotelBookings}
                disabled={hotelLoading}
                className="text-sm text-jungle border border-jungle px-4 py-2 rounded-lg hover:bg-sand transition-colors disabled:opacity-50"
              >
                {hotelLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            {hotelError && (
              <p className="text-coral text-sm mb-4">{hotelError}</p>
            )}

            {!hotelLoading && !hotelError && hotelBookings.length === 0 && (
              <p className="text-gray-500 text-sm">No hotel bookings yet.</p>
            )}

            {hotelBookings.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-sand text-left text-gray-500 text-xs uppercase tracking-wider">
                      <th className="pb-3 pr-4">Guest</th>
                      <th className="pb-3 pr-4">Check-in</th>
                      <th className="pb-3 pr-4">Check-out</th>
                      <th className="pb-3 pr-4">Nights</th>
                      <th className="pb-3 pr-4">Rooms</th>
                      <th className="pb-3 pr-4">Total</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand">
                    {hotelBookings.map((b) => (
                      <tr key={b.id}>
                        <td className="py-3 pr-4">
                          <div className="font-medium text-jungle">{b.guestName}</div>
                          <div className="text-gray-400 text-xs">{b.guestEmail}</div>
                        </td>
                        <td className="py-3 pr-4 text-gray-700">{b.checkIn}</td>
                        <td className="py-3 pr-4 text-gray-700">{b.checkOut}</td>
                        <td className="py-3 pr-4 text-gray-700">{b.nights}</td>
                        <td className="py-3 pr-4 text-gray-700">{b.rooms}</td>
                        <td className="py-3 pr-4 font-medium text-jungle">
                          ${b.totalPrice.toLocaleString()}
                        </td>
                        <td className="py-3 pr-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                              b.status === 'confirmed'
                                ? 'bg-teal/15 text-teal'
                                : b.status === 'cancelled'
                                ? 'bg-coral/15 text-coral'
                                : 'bg-sand text-gray-600'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            {b.status !== 'confirmed' && (
                              <button
                                onClick={() => updateHotelBookingStatus(b.id, 'confirmed')}
                                disabled={updatingHotelId === b.id}
                                className="text-xs bg-teal/10 text-teal px-3 py-1 rounded-lg hover:bg-teal/20 transition-colors disabled:opacity-50"
                              >
                                Confirm
                              </button>
                            )}
                            {b.status !== 'cancelled' && (
                              <button
                                onClick={() => updateHotelBookingStatus(b.id, 'cancelled')}
                                disabled={updatingHotelId === b.id}
                                className="text-xs bg-coral/10 text-coral px-3 py-1 rounded-lg hover:bg-coral/20 transition-colors disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            )}
                            {b.status === 'cancelled' && (
                              <button
                                onClick={() => updateHotelBookingStatus(b.id, 'pending')}
                                disabled={updatingHotelId === b.id}
                                className="text-xs bg-sand text-gray-600 px-3 py-1 rounded-lg hover:bg-sand/80 transition-colors disabled:opacity-50"
                              >
                                Restore
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
