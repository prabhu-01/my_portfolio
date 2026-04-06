import { useEffect, useRef } from 'react'

interface Node {
  id: number; x: number; y: number; vx: number; vy: number
  label: string; size: number; color: string; phase: number
}

const LABELS = ['SYSTEMS','SCALE','PRODUCTS','BUILDER','FOUNDER','IDEAS','EXECUTE','IMPACT','UX','GROWTH','AUTOMATE','THINK']
const COLORS  = ['#A78BFA','#22D3EE','#7C3AED','#818CF8','#34D399','#F472B6','#FBBF24','#A78BFA']

function makeNodes(w: number, h: number): Node[] {
  return LABELS.map((label, i) => ({
    id: i, label,
    x: 60 + Math.random() * (w - 120),
    y: 60 + Math.random() * (h - 120),
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    size:  6 + Math.random() * 8,
    color: COLORS[i % COLORS.length],
    phase: Math.random() * Math.PI * 2,
  }))
}

export default function SystemVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let nodes: Node[] = []
    let raf = 0
    let t = 0
    const mouse = { x: -999, y: -999 }

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      nodes = makeNodes(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    canvas.addEventListener('mousemove', onMouse)

    const draw = () => {
      const { width: w, height: h } = canvas
      t += 0.008
      ctx.clearRect(0, 0, w, h)

      // Update nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 50 || n.x > w - 50) n.vx *= -1
        if (n.y < 50 || n.y > h - 50) n.vy *= -1
        const dx = n.x - mouse.x, dy = n.y - mouse.y
        const d = Math.hypot(dx, dy)
        if (d < 100) { n.vx += (dx / d) * 0.25; n.vy += (dy / d) * 0.25 }
        const speed = Math.hypot(n.vx, n.vy)
        if (speed > 1.2) { n.vx = (n.vx / speed) * 1.2; n.vy = (n.vy / speed) * 1.2 }
      })

      // Draw edges
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b, j) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist > 220) return
          const alpha = (1 - dist / 220) * 0.35 * (0.5 + 0.5 * Math.sin(t * 1.5 + i * 0.5))
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
          grad.addColorStop(0, `${a.color}${Math.round(alpha * 255).toString(16).padStart(2,'0')}`)
          grad.addColorStop(1, `${b.color}00`)
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = grad; ctx.lineWidth = 1; ctx.stroke()

          // Traveling particle
          const p = ((t * 0.4 + j * 0.3) % 1)
          const px = a.x + (b.x - a.x) * p, py = a.y + (b.y - a.y) * p
          ctx.beginPath(); ctx.arc(px, py, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = a.color + 'BB'; ctx.fill()
        })
      })

      // Draw nodes
      nodes.forEach(n => {
        const pulse = 1 + 0.15 * Math.sin(t * 2 + n.phase)
        const r = n.size * pulse

        // Glow
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4)
        glow.addColorStop(0, `${n.color}40`); glow.addColorStop(1, 'transparent')
        ctx.beginPath(); ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2)
        ctx.fillStyle = glow; ctx.fill()

        // Core
        const core = ctx.createRadialGradient(n.x - r * 0.3, n.y - r * 0.3, 0, n.x, n.y, r)
        core.addColorStop(0, '#FFFFFF99'); core.addColorStop(0.4, n.color + 'DD'); core.addColorStop(1, n.color + '88')
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = core; ctx.fill()

        // Label
        ctx.font = 'bold 9px "Space Grotesk", sans-serif'
        ctx.fillStyle = 'rgba(255,255,255,0.65)'
        ctx.textAlign = 'center'
        ctx.fillText(n.label, n.x, n.y + r + 13)
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-4 left-4">
        <p className="text-[10px] font-mono text-[#4B5563] tracking-widest mb-1">SYSTEM.ACTIVE</p>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
          <span className="text-[10px] font-mono text-[#22D3EE]">12 nodes connected</span>
        </div>
      </div>
    </div>
  )
}
