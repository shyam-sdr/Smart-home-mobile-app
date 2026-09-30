export const types = {
  camera: { label: 'Security Cameras', one: 'Security Camera', icon: 'camera-video-fill', bg: '#e8f0ff', fg: '#1a6cf0' },
  motion: { label: 'Motion Sensors', one: 'Motion Sensor', icon: 'person-walking', bg: '#e3f7ea', fg: '#1f9d55' },
  door: { label: 'Door Sensors', one: 'Door Sensor', icon: 'door-closed-fill', bg: '#ece9ff', fg: '#6c4be0' },
  env: { label: 'Environmental Sensors', one: 'Environmental Sensor', icon: 'thermometer-half', bg: '#e6ecff', fg: '#3b5bdb' },
  plug: { label: 'Smart Plugs', one: 'Smart Plug', icon: 'plug-fill', bg: '#e3f7ea', fg: '#1f9d55' },
  other: { label: 'Others', one: 'Other Device', icon: 'gear-fill', bg: '#eef0f3', fg: '#495057' },
}

export const roomIcons = {
  'Living Room': 'lamp-fill', 'Front Door': 'door-open-fill', Bedroom: 'moon-stars-fill',
  Kitchen: 'cup-hot-fill', Backyard: 'tree-fill',
}

const base = { battery: 80, signal: '-60 dBm (Good)', sync: '10:42 AM', version: '2.4.1', restart: 'Yesterday, 11:34 PM' }
const d = (id, name, type, room, status = 'online', extra = {}) => ({ id, name, type, room, status, ...base, ...extra })

export const initialDevices = [
  d(1, 'Living Room Camera', 'camera', 'Living Room', 'online', { battery: 64, signal: '-67 dBm (Good)' }),
  d(2, 'Living Room Sensor', 'motion', 'Living Room'),
  d(3, 'Living Room Plug', 'plug', 'Living Room', 'offline', { sync: '10:18 AM' }),
  d(4, 'Front Door Sensor', 'motion', 'Front Door'),
  d(5, 'Front Door Contact', 'door', 'Front Door'),
  d(6, 'Bedroom Camera', 'camera', 'Bedroom'),
  d(7, 'Bedroom Sensor', 'motion', 'Bedroom', 'offline', { sync: '8:02 AM' }),
  d(8, 'Kitchen Climate', 'env', 'Kitchen'),
  d(9, 'Backyard Hub', 'other', 'Backyard'),
]

export const events = [
  { id: 1, time: '10:42 AM', title: 'Movement detected', desc: 'Living Room Sensor', kind: 'movement', icon: 'person-walking', tone: 'green' },
  { id: 2, time: '10:18 AM – 10:30 AM', title: 'Connection interrupted', desc: 'Device was offline for 12 minutes. Recovered automatically.', kind: 'system', important: true, icon: 'wifi', tone: 'orange', detail: true },
  { id: 3, time: '10:05 AM', title: 'Movement detected', desc: 'Living Room Sensor', kind: 'movement', icon: 'person-walking', tone: 'green' },
  { id: 4, time: '9:47 AM', title: 'Movement detected', desc: 'Living Room Sensor', kind: 'movement', icon: 'person-walking', tone: 'green' },
  { id: 5, time: '9:35 AM', title: 'Software updated', desc: 'Updated to version 2.4.1.', kind: 'system', icon: 'gear-fill', tone: 'blue' },
]

export const notifications = [
  { room: 'Living Room', items: [
    { time: '10:42 AM', title: 'Movement detected', desc: 'Living Room Sensor', icon: 'person-walking', tone: 'green' },
    { time: '10:30 AM', title: 'Device reconnected', desc: 'Was offline for 12 minutes', icon: 'wifi', tone: 'orange' },
    { time: '10:18 AM', title: 'Device disconnected', desc: 'Living Room Sensor', icon: 'exclamation-triangle-fill', tone: 'red' },
  ] },
  { room: 'Front Door', items: [{ time: '9:15 AM', title: 'Motion detected', desc: 'Front Door Sensor', icon: 'person-walking', tone: 'green' }] },
  { room: 'Bedroom', items: [{ time: '8:20 AM', title: 'Software updated', desc: 'Bedroom Camera', icon: 'gear-fill', tone: 'blue' }] },
]

export const timeline = [
  { t: '10:18 AM', title: 'Connection lost', tone: 'red' },
  { t: '10:24 AM', title: 'Still unavailable', tone: 'gray' },
  { t: '10:30 AM', title: 'Connection restored', tone: 'green' },
]
