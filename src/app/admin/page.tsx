'use client'

import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import content from '@/data/content.json'
import rooms from '@/data/rooms.json'

type ContentData = typeof content
type RoomsData = typeof rooms

export default function AdminPage() {
  const { data: session, status } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState<'content' | 'rooms'>('content')
  const [contentData, setContentData] = useState<ContentData>(content)
  const [roomsData, setRoomsData] = useState<RoomsData>(rooms)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    if (result?.error) {
      setLoginError('Invalid email or password.')
    }
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

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center pt-16">
        <div className="text-jungle">Loading...</div>
      </div>
    )
  }

  if (!session) {
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
            <p className="text-gray-600 text-sm mt-1">Logged in as {session.user?.email}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="text-sm text-gray-600 hover:text-jungle border border-gray-300 px-4 py-2 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['content', 'rooms'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-jungle text-sand'
                  : 'bg-white text-gray-600 hover:bg-sand border border-gray-200'
              }`}
            >
              {tab === 'content' ? 'Page Content' : 'Rooms & Pricing'}
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
      </div>
    </div>
  )
}
