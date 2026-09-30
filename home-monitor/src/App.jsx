import { useState } from 'react'
import { types, roomIcons, initialDevices, events, notifications, timeline } from './data'

const I = ({ n }) => <i className={`bi bi-${n}`} />
const Dot = ({ s }) => <span className={`dot ${s}`} />
const Status = ({ s }) => <span className={`st ${s}`}><Dot s={s} />{s === 'online' ? 'Online' : 'Offline'}</span>
const Ico = ({ t }) => <span className="ico" style={{ background: types[t].bg, color: types[t].fg }}><I n={types[t].icon} /></span>
const Tone = ({ icon, tone }) => <span className={`ico sm tone-${tone}`}><I n={icon} /></span>
const Chev = () => <span className="text-secondary"><I n="chevron-right" /></span>

const counts = (list) => {
  const on = list.filter((d) => d.status === 'online').length, off = list.length - on
  return (
    <span className="sub">
      {on > 0 && <><Dot s="online" />{on} online</>}
      {off > 0 && <>{on > 0 && ' · '}<span className="text-danger">{off} offline</span></>}
    </span>
  )
}

const Top = ({ title, nav, right }) => (
  <div className="topbar">
    <button onClick={nav.back} aria-label="Back"><I n="chevron-left" /></button>
    <h1>{title}</h1>{right}
  </div>
)

function Home({ devices, nav, restart }) {
  const offline = devices.filter((d) => d.status === 'offline')
  const important = events.filter((e) => e.important)
  const info = events.filter((e) => !e.important && e.kind === 'system')
  const moves = events.filter((e) => e.kind === 'movement').length
  const glance = [
    { n: events.length, l: 'Total events', icon: 'card-list', tone: 'blue' },
    { n: important.length, l: 'Important', icon: 'exclamation-triangle-fill', tone: 'red' },
    { n: moves, l: 'Movement events', icon: 'person-walking', tone: 'green' },
    { n: info.length, l: 'Software update', icon: 'gear-fill', tone: 'gray' },
  ]
  const EventRow = ({ e }) => (
    <button className="row-item" onClick={() => nav.go('event', { e })}>
      <Tone icon={e.icon} tone={e.tone} />
      <div className="grow"><div className="name">{e.title}</div><div className="sub">{e.time}</div><div className="sub">{e.desc}</div></div><Chev />
    </button>
  )
  return (
    <>
      <div className="d-flex justify-content-between align-items-start">
        <div><div className="text-secondary fw-medium">Good evening,</div><h1 className="big-title">Shyam 👋</h1>
          <div className="text-secondary small mt-1">Here's what happened while you were away.</div></div>
        <button className="icon-btn" onClick={() => nav.go('notifications')} aria-label="Notifications"><I n="bell" />{important.length > 0 && <span className="notif-dot" />}</button>
      </div>
      <div className={`hero ${offline.length ? 'warn' : 'ok'}`}>
        <div className="badge-ico"><I n={offline.length ? 'exclamation-triangle-fill' : 'shield-check'} /></div>
        <h2>{offline.length ? `${offline.length} device${offline.length > 1 ? 's' : ''} offline` : 'Everything looks normal'}</h2>
        <p>{offline.length ? 'Some devices lost connection. See recommended actions below.' : 'No action needed right now.'}</p>
        <span className="chip"><I n="clock" /> Last activity · 10:42 AM</span>
      </div>
      <div className="section-title">Today at a glance <a href="#" onClick={(e) => { e.preventDefault(); nav.tab('activity') }}>See all</a></div>
      <div className="glance">
        {glance.map((g) => (
          <div className="card-x" key={g.l}><Tone icon={g.icon} tone={g.tone} /><div><b>{g.n}</b><small>{g.l}</small></div></div>
        ))}
      </div>
      <div className="section-title">Important events</div>
      {important.length ? important.map((e) => <EventRow key={e.id} e={e} />) : <div className="empty">Nothing important today.</div>}
      <div className="section-title">Recommended actions</div>
      {offline.length ? offline.map((d) => (
        <div className="row-item" key={d.id}>
          <Ico t={d.type} />
          <button className="grow border-0 bg-transparent text-start p-0" onClick={() => nav.go('device', { id: d.id })}>
            <div className="name">{d.name}</div><div className="sub">Offline since {d.sync}</div></button>
          <button className="action-btn" onClick={() => restart(d.id)}>Restart</button>
        </div>
      )) : <div className="empty">You're all set. No actions needed.</div>}
      <div className="section-title">Things worth knowing</div>
      <div className="row-item"><Tone icon="person-walking" tone="green" />
        <div className="grow"><div className="name">{moves} movements in the Living Room</div><div className="sub">Normal activity for this time of day.</div></div></div>
      {info.map((e) => <EventRow key={e.id} e={e} />)}
    </>
  )
}

function Devices({ devices, nav }) {
  const [mode, setMode] = useState('location')
  const rooms = [...new Set(devices.map((d) => d.room))]
  const groups = mode === 'location'
    ? rooms.map((r) => ({ key: r, title: r, list: devices.filter((d) => d.room === r), go: () => nav.go('room', { room: r }),
        icon: <span className="ico tone-gray"><I n={roomIcons[r] || 'house-fill'} /></span> }))
    : Object.keys(types).map((t) => ({ key: t, title: types[t].label, list: devices.filter((d) => d.type === t),
        go: () => nav.go('room', { type: t }), icon: <Ico t={t} /> })).filter((g) => g.list.length)
  return (
    <>
      <div className="topbar"><h1 className="big-title">Devices</h1>
        <button onClick={() => nav.go('add')} aria-label="Add device"><i className="bi bi-plus-lg text-primary" /></button></div>
      <div className="seg">
        <button className={mode === 'location' ? 'on' : ''} onClick={() => setMode('location')}>By Location</button>
        <button className={mode === 'type' ? 'on' : ''} onClick={() => setMode('type')}>By Type</button>
      </div>
      {groups.map((g) => (
        <button key={g.key} className="row-item" onClick={g.go}>
          {g.icon}
          <div className="grow"><div className="name">{g.title}</div>
            <div className="sub">{g.list.length} device{g.list.length > 1 ? 's' : ''}</div>{counts(g.list)}</div><Chev />
        </button>
      ))}
    </>
  )
}

function Room({ devices, nav, room, type }) {
  const title = room || types[type].label
  const list = devices.filter((d) => (room ? d.room === room : d.type === type))
  return (
    <>
      <Top title={title} nav={nav} right={<I n="three-dots" />} />
      <div className="room-hero"><h2>{title}</h2><div className="small">{list.length} devices</div>{counts(list)}</div>
      <div className="fw-bold mb-2">Devices</div>
      {list.map((d) => (
        <button key={d.id} className="row-item" onClick={() => nav.go('device', { id: d.id })}>
          <Ico t={d.type} />
          <div className="grow"><div className="name">{d.name}</div><div className="sub">{types[d.type].one}</div><Status s={d.status} /></div><Chev />
        </button>
      ))}
    </>
  )
}

function Device({ devices, nav, id, setToast, restart }) {
  const d = devices.find((x) => x.id === id)
  const rows = [
    ['battery-full', 'Battery', `${d.battery}%`], ['wifi', 'Network Strength', d.signal],
    ['arrow-repeat', 'Last Sync', d.sync], ['gear-fill', 'Software Version', d.version], ['arrow-clockwise', 'Last Restart', d.restart],
  ]
  return (
    <>
      <Top title={d.name} nav={nav} right={<I n="three-dots" />} />
      <div className="d-flex align-items-center gap-3 mb-3">
        <Ico t={d.type} /><div><div className="fw-bold">{d.name}</div><div className="sub">{types[d.type].one}</div><Status s={d.status} /></div>
      </div>
      <div className="card-x p-0 overflow-hidden">
        {rows.map(([icon, k, v]) => (
          <div className="kv" key={k}><span className="text-primary"><I n={icon} /></span>
            <div className="k">{k}{k === 'Battery' && <div className="progress mt-1" style={{ height: 5 }}><div className="progress-bar bg-success" style={{ width: `${d.battery}%` }} /></div>}</div>
            <span className="small text-secondary">{v}</span></div>
        ))}
      </div>
      {d.type === 'camera' && <button className="btn-x primary" onClick={() => setToast('Opening live feed…')}><I n="camera-video" />View Live Feed</button>}
      <button className="btn-x soft" onClick={() => restart(d.id)}><I n="arrow-repeat" />Restart Device</button>
      <button className="btn-x gray" onClick={() => setToast('Device settings coming soon')}><I n="gear" />Device Settings</button>
    </>
  )
}

function Activity({ nav }) {
  const [f, setF] = useState('All')
  const list = events.filter((e) => f === 'All' || (f === 'Important' && e.important) || (f === 'Movement' && e.kind === 'movement') || (f === 'System' && e.kind === 'system'))
  return (
    <>
      <div className="topbar"><h1 className="big-title">Activity</h1><I n="funnel" /></div>
      <div className="seg">{['All', 'Important', 'Movement', 'System'].map((x) => <button key={x} className={f === x ? 'on' : ''} onClick={() => setF(x)}>{x}</button>)}</div>
      <div className="fw-bold mb-2">Today</div>
      {list.length === 0 && <p className="text-secondary">No events match this filter.</p>}
      {list.map((e) => (
        <button key={e.id} className="row-item" onClick={() => e.detail ? nav.go('event', { e }) : null}>
          <Tone icon={e.icon} tone={e.tone} />
          <div className="grow"><div className="sub">{e.time}</div><div className="name">{e.title}</div><div className="sub">{e.desc}</div></div><Chev />
        </button>
      ))}
    </>
  )
}

function EventDetail({ e, nav }) {
  return (
    <>
      <Top title="Event Details" nav={nav} />
      <div className="d-flex gap-3 mb-3">
        <span className={`ico tone-${e.tone}`} style={{ width: 64, height: 64, borderRadius: '50%', fontSize: '1.8rem' }}><I n={e.icon} /></span>
        <div><div className="fw-bold fs-5">{e.title}</div>{e.important && <span className="badge-x">Informational</span>}
          <div className="text-secondary small mt-1">{e.time}</div>
          <div className="small text-secondary">Your device lost connection for about 12 minutes.</div></div>
      </div>
      <div className="timeline">
        {timeline.map((t) => <div className="tl" key={t.t}><span className={`pt ${t.tone}`} /><div><div className="small text-secondary">{t.t}</div>{t.title}</div></div>)}
      </div>
      <div className="fw-bold">What this means</div>
      <p className="small text-secondary">Your device temporarily lost network connectivity but recovered automatically. No action is required right now.</p>
      <button className="btn-x primary" onClick={() => nav.go('device', { id: 1 })}>View Device</button>
    </>
  )
}

function Notifications({ nav }) {
  const [f, setF] = useState('All')
  return (
    <>
      <Top title="Notifications" nav={nav} />
      <div className="seg">{['All', 'Devices', 'Important'].map((x) => <button key={x} className={f === x ? 'on' : ''} onClick={() => setF(x)}>{x}</button>)}</div>
      {notifications.map((g) => {
        const items = g.items.filter((i) => f === 'All' || (f === 'Important' && i.tone === 'red') || (f === 'Devices' && i.title.startsWith('Device')))
        if (!items.length) return null
        return (
          <div key={g.room}>
            <div className="section-title">{g.room}<span className="count">{items.length}</span></div>
            {items.map((i) => (
              <div className="row-item" key={i.time + i.title}><Tone icon={i.icon} tone={i.tone} />
                <div className="grow"><div className="name">{i.title}</div><div className="sub">{i.desc}</div></div><span className="sub">{i.time}</span></div>
            ))}
          </div>
        )
      })}
    </>
  )
}

function Settings({ nav }) {
  const groups = [
    ['Home & Account', [['person', 'Home Profile'], ['person-circle', 'Account'], ['bell', 'Notifications', 'notifications']]],
    ['Device Management', [['hdd-network', 'Manage Devices', 'devices'], ['plus-lg', 'Add Device', 'add']]],
    ['Preferences', [['activity', 'Motion Sensitivity'], ['badge-hd', 'Video Quality'], ['lock', 'Privacy & Security']]],
    ['Help & Support', [['question-circle', 'Help Center'], ['chat-dots', 'Contact Support']]],
  ]
  return (
    <>
      <div className="topbar"><h1 className="big-title">Settings</h1></div>
      {groups.map(([title, rows]) => (
        <div key={title}>
          <div className="group-title">{title}</div>
          <div className="card-x p-0 overflow-hidden">
            {rows.map(([icon, label, to]) => (
              <button key={label} className="kv w-100 border-0 text-start" onClick={() => to && (to === 'devices' ? nav.tab('devices') : nav.go(to))}>
                <span className="text-secondary"><I n={icon} /></span><span className="k">{label}</span><Chev />
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

function AddDevice({ nav, add }) {
  return (
    <>
      <Top title="Add Device" nav={nav} />
      <p className="text-secondary small">Select the type of device you want to add.</p>
      <div className="grid-add">
        {Object.keys(types).map((t) => <button key={t} onClick={() => add(t)}><Ico t={t} />{types[t].one}</button>)}
      </div>
    </>
  )
}

const TABS = [['home', 'house-door-fill', 'Home'], ['activity', 'clock', 'Activity'], ['devices', 'grid-fill', 'Devices'], ['settings', 'gear-fill', 'Settings']]
const NO_TABS = ['device', 'event', 'add']

export default function App() {
  const [stack, setStack] = useState([{ name: 'home' }])
  const [devices, setDevices] = useState(initialDevices)
  const [toast, showToast] = useState('')
  const cur = stack[stack.length - 1]
  const setToast = (m) => { showToast(m); setTimeout(() => showToast(''), 2200) }
  const nav = {
    go: (name, p = {}) => setStack((s) => [...s, { name, ...p }]),
    back: () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)),
    tab: (name) => setStack([{ name }]),
  }
  const restart = (id) => { setDevices((ds) => ds.map((d) => (d.id === id ? { ...d, status: 'online', restart: 'Just now' } : d))); setToast('Device restarted') }
  const add = (type) => {
    setDevices((ds) => [...ds, { id: Date.now(), name: `New ${types[type].one}`, type, room: 'Living Room', status: 'online', battery: 100, signal: '-55 dBm (Good)', sync: 'Just now', version: '2.4.1', restart: 'Just now' }])
    setToast(`${types[type].one} added`); nav.tab('devices')
  }
  const screens = {
    home: <Home devices={devices} nav={nav} restart={restart} />, devices: <Devices devices={devices} nav={nav} />,
    room: <Room devices={devices} nav={nav} room={cur.room} type={cur.type} />,
    device: <Device devices={devices} nav={nav} id={cur.id} setToast={setToast} restart={restart} />,
    activity: <Activity nav={nav} />, event: <EventDetail e={cur.e} nav={nav} />,
    notifications: <Notifications nav={nav} />, settings: <Settings nav={nav} />, add: <AddDevice nav={nav} add={add} />,
  }
  const active = { room: 'devices', device: 'devices', event: 'activity', notifications: 'home', add: 'devices' }[cur.name] || cur.name
  return (
    <div className="phone">
      <main className="screen">{screens[cur.name]}</main>
      {toast && <div className="toast-x" role="status">{toast}</div>}
      {!NO_TABS.includes(cur.name) && (
        <nav className="tabs">
          {TABS.map(([k, icon, label]) => <button key={k} className={active === k ? 'on' : ''} onClick={() => nav.tab(k)}><I n={icon} />{label}</button>)}
        </nav>
      )}
    </div>
  )
}
