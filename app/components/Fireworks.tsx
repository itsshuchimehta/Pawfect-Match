"use client"

import { useEffect, useRef } from "react"

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.size > 0.1) this.size -= 0.1
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particleArray: Particle[] = []

    function createParticles() {
    const safeCanvas = canvas as HTMLCanvasElement
      for (let i = 0; i < 50; i++) {
        particleArray.push(new Particle(safeCanvas.width, safeCanvas.height))
      }
    }

    let animationFrameId: number

    function animateParticles() {
      const safeCtx = ctx as CanvasRenderingContext2D
      const safeCanvas = canvas as HTMLCanvasElement

      safeCtx.clearRect(0, 0, safeCanvas.width, safeCanvas.height)
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update()
        particleArray[i].draw(safeCtx)
        if (particleArray[i].size <= 0.1) {
          particleArray.splice(i, 1)
          i--
        }
      }
      animationFrameId = requestAnimationFrame(animateParticles)
    }

    createParticles()
    animateParticles()

    const interval = setInterval(createParticles, 500)

    return () => {
      clearInterval(interval)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
}

