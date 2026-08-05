import React from 'react'

const Avatar: React.FC<{ src?: string; name?: string; size?: number }> = ({ src, name = '', size = 40 }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={name} style={{ width: size, height: size, borderRadius: '9999px' }} />
  ) : (
    <div style={{ width: size, height: size, borderRadius: '9999px', background: '#c7d2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e293b', fontWeight: 600 }}>
      {initials}
    </div>
  )
}

export default Avatar
