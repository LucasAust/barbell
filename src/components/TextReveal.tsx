'use client'

import { useRef, CSSProperties } from 'react'
import { motion, useInView } from 'framer-motion'

interface TextRevealProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  id?: string
  className?: string
  style?: CSSProperties
  delay?: number
  stagger?: number
  mode?: 'chars' | 'words' | 'lines'
  once?: boolean
}

export default function TextReveal({
  text,
  as: _Tag = 'span',
  id,
  className = '',
  style,
  delay = 0,
  stagger = 0.03,
  mode = 'chars',
  once = true,
}: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-5% 0px' })

  const chunks = mode === 'chars'
    ? text.split('')
    : mode === 'words'
    ? text.split(' ')
    : [text]

  const inner = (
    <>
      {chunks.map((chunk, i) => (
        <span
          key={i}
          className="char-wrap"
          aria-hidden="true"
          style={{ marginRight: mode === 'words' ? '0.25em' : undefined }}
        >
          <motion.span
            className="char"
            initial={{ y: '115%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0 }}
            transition={{ duration: 0.75, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {chunk === ' ' ? '\u00A0' : chunk}
          </motion.span>
        </span>
      ))}
    </>
  )

  if (_Tag === 'h1') return <h1 ref={ref} id={id} className={className} style={style} aria-label={text}>{inner}</h1>
  if (_Tag === 'h2') return <h2 ref={ref} id={id} className={className} style={style} aria-label={text}>{inner}</h2>
  if (_Tag === 'h3') return <h3 ref={ref} id={id} className={className} style={style} aria-label={text}>{inner}</h3>
  if (_Tag === 'h4') return <h4 ref={ref} id={id} className={className} style={style} aria-label={text}>{inner}</h4>
  if (_Tag === 'p')  return <p  ref={ref} id={id} className={className} style={style} aria-label={text}>{inner}</p>
  if (_Tag === 'div') return <div ref={ref} id={id} className={className} style={style} aria-label={text}>{inner}</div>
  return <span ref={ref} id={id} className={className} style={style} aria-label={text}>{inner}</span>
}
