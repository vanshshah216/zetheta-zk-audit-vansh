'use client'

import { useState } from 'react'
import { auditCases } from '@/lib/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Badge } from '@/components/ds/badge'
import { Button } from '@/components/ds/button'
import { StaggerContainer, StaggerItem } from '@/components/ds/animations'
import { Users, Zap } from 'lucide-react'

const categories = ['All', 'DeFi', 'NFT', 'Governance', 'Infrastructure']
const difficulties = { easy: 'text-emerald', medium: 'text-yellow-400', hard: 'text-destructive' }

export function MarketplaceSection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all')

  const filteredCases = auditCases.filter((audit) => {
    const categoryMatch = selectedCategory === 'All' || audit.category === selectedCategory
    const difficultyMatch = selectedDifficulty === 'all' || audit.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  return (
    <section id="marketplace" className="py-20 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Active Audits</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse and bid on smart contracts ready for security review
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-4">
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-3">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan text-background'
                      : 'bg-card/50 text-foreground hover:bg-card'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-3">Difficulty</p>
            <div className="flex flex-wrap gap-2">
              {['all', 'easy', 'medium', 'hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff as any)}
                  className={`px-4 py-2 rounded-lg transition-all capitalize ${
                    selectedDifficulty === diff
                      ? 'bg-blue text-background'
                      : 'bg-card/50 text-foreground hover:bg-card'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Cards Grid */}
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((audit) => (
              <StaggerItem key={audit.id}>
                <Card variant="default" className="flex flex-col h-full overflow-hidden hover:border-cyan/50 transition-all">
                  {/* Image */}
                  <div className="h-40 bg-gradient-to-br from-cyan/20 to-blue/20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-50">
                      <img
                        src={audit.image}
                        alt={audit.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  </div>

                  <CardHeader className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="cyan">{audit.category}</Badge>
                      <Badge
                        variant={
                          audit.difficulty === 'easy'
                            ? 'success'
                            : audit.difficulty === 'medium'
                              ? 'warning'
                              : 'destructive'
                        }
                      >
                        {audit.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{audit.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">
                      {audit.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-4">
                    {/* Reward and Auditors */}
                    <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Reward</p>
                        <p className="font-semibold text-cyan text-lg">${(audit.reward / 1000).toFixed(0)}k</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <Users className="w-3 h-3" /> Auditors
                        </p>
                        <p className="font-semibold text-blue text-lg">{audit.auditors}</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      View Audit
                      <Zap className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No audits match your filters. Try adjusting your selection.</p>
          </div>
        )}
      </div>
    </section>
  )
}
