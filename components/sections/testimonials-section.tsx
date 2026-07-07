'use client'

import { useState, useEffect } from 'react'
import { testimonials } from '@/lib/mock-data'
import { Card, CardContent } from '@/components/ds/card'
import { FadeIn } from '@/components/ds/animations'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoPlay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoPlay(false)
  }

  return (
    <section className="py-20 sm:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Loved by Auditors & Protocols</h2>
          <p className="text-lg text-muted-foreground">
            See what industry leaders say about our platform
          </p>
        </div>

        <FadeIn>
          <div className="relative">
            {/* Carousel */}
            <div className="overflow-hidden">
              <div
                className="transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                <div className="flex">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <Card variant="glass" className="h-full">
                        <CardContent className="p-8">
                          {/* Stars */}
                          <div className="flex gap-1 mb-4">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>

                          {/* Quote */}
                          <p className="text-lg mb-6 text-foreground leading-relaxed">
                            &quot;{testimonial.content}&quot;
                          </p>

                          {/* Author */}
                          <div className="flex items-center gap-3">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src =
                                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Ccircle cx="12" cy="12" r="12" fill="%23334155"/%3E%3C/svg%3E'
                              }}
                            />
                            <div>
                              <p className="font-semibold text-foreground">
                                {testimonial.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {testimonial.role} at {testimonial.company}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="p-2 hover:bg-card rounded-lg transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrent(index)
                      setAutoPlay(false)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === current ? 'bg-cyan w-8' : 'bg-muted'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-2 hover:bg-card rounded-lg transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
