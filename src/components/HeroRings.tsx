'use client'

import { useEffect, useRef } from 'react'

// Each orbit is a circle in 3D space described by:
//   incline   — tilt from the horizontal plane (deg). 0 = face-on, 90 = edge-on line.
//   longitude — rotation of that orbital plane around the vertical axis (deg).
//   R         — radius in world units (scaled to viewport).
//   speed     — full orbits / second. Negative = counter-rotate.
//   particle  — glowing dot that travels the path with a comet tail.
const ORBITS = [
  { R: 370, incline: 68, longitude:   0, speed:  1/46, lineW: 1.4, ringColor: 'rgba(237,232,223,0.16)', particle: true,  dotColor: 'rgba(237,232,223,0.98)', dotR: 3.5, dotGlow: null },
  { R: 255, incline: 48, longitude:  72, speed: -1/30, lineW: 2.2, ringColor: 'rgba(165,0,16,0.55)',    particle: true,  dotColor: 'rgba(230,50,50,1)',      dotR: 5,   dotGlow: 'rgba(165,0,16,0.7)' },
  { R: 158, incline: 33, longitude: 140, speed:  1/18, lineW: 1.4, ringColor: 'rgba(237,232,223,0.20)', particle: true,  dotColor: 'rgba(237,232,223,0.95)', dotR: 3.2, dotGlow: null },
  { R:  95, incline: 74, longitude: 215, speed: -1/12, lineW: 1.1, ringColor: 'rgba(165,0,16,0.30)',    particle: true,  dotColor: 'rgba(200,60,60,0.9)',    dotR: 2.5, dotGlow: null },
  { R:  52, incline: 22, longitude:  48, speed:  1/8,  lineW: 1,   ringColor: 'rgba(237,232,223,0.16)', particle: false, dotColor: '',                       dotR: 0,   dotGlow: null },
]

// Project orbital angle phi on a 3D ring → 2D screen offset {x, y, z}
// z > 0 means in front of the viewer (used for particle depth fade).
function orbitPoint(phi: number, R: number, incRad: number, lonRad: number) {
  const ci = Math.cos(incRad), si = Math.sin(incRad)
  const cl = Math.cos(lonRad), sl = Math.sin(lonRad)
  const cp = Math.cos(phi),    sp = Math.sin(phi)
  return {
    x: R * (cl * cp - sl * ci * sp),
    y: R * (sl * cp + cl * ci * sp),
    z: R * si * sp,
  }
}

export default function HeroRings() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number, t = 0, last = performance.now()

    function resize() {
      if (!canvas) return
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function draw(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now; t += dt
      if (!canvas) return
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const cx = W * 0.63
      const cy = H * 0.50
      const scale = Math.min(W, 1440) / 1440

      // ── Nucleus — glowing core at the orbital center ─────────
      // Outer soft halo
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, 38 * scale)
      halo.addColorStop(0,   'rgba(165,0,16,0.22)')
      halo.addColorStop(0.5, 'rgba(165,0,16,0.08)')
      halo.addColorStop(1,   'rgba(165,0,16,0)')
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, 38 * scale, 0, Math.PI * 2)
      ctx.fillStyle = halo
      ctx.fill()
      ctx.restore()
      // Inner bright core
      ctx.save()
      ctx.shadowColor = 'rgba(200,30,30,0.9)'
      ctx.shadowBlur  = 16
      ctx.beginPath()
      ctx.arc(cx, cy, 4.5 * scale, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(237,100,80,1)'
      ctx.fill()
      ctx.restore()

      for (const orb of ORBITS) {
        const incRad = (orb.incline   * Math.PI) / 180
        const lonRad = (orb.longitude * Math.PI) / 180
        const R = orb.R * scale

        // ── Draw ring ──────────────────────────────────────────
        // The 2D projection of a tilted circle is an ellipse:
        //   semi-major = R  (always)
        //   semi-minor = R * |cos(incline)|
        //   rotation of major axis = longitude
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(lonRad)
        ctx.shadowBlur = 0
        ctx.beginPath()
        ctx.ellipse(0, 0, R, R * Math.abs(Math.cos(incRad)), 0, 0, Math.PI * 2)
        ctx.strokeStyle = orb.ringColor
        ctx.lineWidth = orb.lineW
        ctx.stroke()
        ctx.restore()

        if (!orb.particle) continue

        // ── Draw orbiting particle + comet tail ────────────────
        const phi = t * orb.speed * Math.PI * 2
        const pt  = orbitPoint(phi, R, incRad, lonRad)

        // Depth-based alpha: fades slightly when behind center
        const depthAlpha = 0.5 + 0.5 * ((pt.z / R + 1) / 2)
        const pr = orb.dotR * Math.max(scale, 0.6)

        // Comet tail — dots trailing behind the particle
        const TRAIL = 8
        for (let j = TRAIL; j >= 1; j--) {
          const tPhi = phi - j * 0.07 * Math.sign(orb.speed)
          const tp = orbitPoint(tPhi, R, incRad, lonRad)
          const tAlpha = depthAlpha * ((TRAIL - j + 1) / (TRAIL + 1)) * 0.35
          ctx.save()
          ctx.globalAlpha = tAlpha
          ctx.beginPath()
          ctx.arc(cx + tp.x, cy + tp.y, pr * (1 - (j / TRAIL) * 0.55), 0, Math.PI * 2)
          ctx.fillStyle = orb.dotColor
          ctx.fill()
          ctx.restore()
        }

        // Particle head
        ctx.save()
        ctx.globalAlpha = depthAlpha
        if (orb.dotGlow) {
          ctx.shadowColor = orb.dotGlow
          ctx.shadowBlur  = 20
        }
        ctx.beginPath()
        ctx.arc(cx + pt.x, cy + pt.y, pr, 0, Math.PI * 2)
        ctx.fillStyle = orb.dotColor
        ctx.fill()
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    raf = requestAnimationFrame((now) => { last = now; draw(now) })
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
