'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Search, AlertCircle, MoreVertical } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockConversations } from '@/lib/auditor/mock-data'

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [messages, setMessages] = useState([
    { id: '1', sender: 'company', text: 'When can you start the audit?', timestamp: new Date(Date.now() - 120 * 60 * 1000) },
    { id: '2', sender: 'auditor', text: 'I can start immediately. When are the documents ready?', timestamp: new Date(Date.now() - 100 * 60 * 1000) },
    { id: '3', sender: 'company', text: 'The documents will be uploaded by tomorrow EOD', timestamp: new Date(Date.now() - 80 * 60 * 1000) },
    { id: '4', sender: 'auditor', text: 'Perfect, I will review them and start the audit process', timestamp: new Date(Date.now() - 60 * 60 * 1000) },
  ])
  const [messageInput, setMessageInput] = useState('')

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([...messages, {
        id: String(messages.length + 1),
        sender: 'auditor',
        text: messageInput,
        timestamp: new Date(),
      }])
      setMessageInput('')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full space-y-6 h-full">
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-2xl font-bold">Messages</h2>
        <p className="text-muted-foreground">Communicate with companies during audits</p>
      </motion.div>

      {/* Main Layout */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-300px)]">
        {/* Conversations List */}
        <Card className="glass border-border/30 flex flex-col lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Conversations</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-2">
            {mockConversations.map((conv) => (
              <motion.div
                key={conv.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedConversation(conv)}
                className={`p-3 rounded-lg cursor-pointer transition-all border ${
                  selectedConversation.id === conv.id
                    ? 'bg-blue-950/30 border-blue-500/30'
                    : 'bg-card/50 border-border/30 hover:border-cyan-500/30'
                }`}
              >
                <div className="flex items-start gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan to-blue rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{conv.companyName}</p>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full flex-shrink-0">{conv.unreadCount}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Chat Panel */}
        <Card className="glass border-border/30 flex flex-col lg:col-span-2">
          <CardHeader className="border-b border-border/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">{selectedConversation.companyName}</CardTitle>
                <CardDescription>Active now</CardDescription>
              </div>
              <Button size="sm" variant="ghost">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex ${msg.sender === 'auditor' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === 'auditor'
                    ? 'bg-blue-500/20 text-blue-100 border border-blue-500/30'
                    : 'bg-card/50 text-foreground border border-border/30'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </CardContent>

          {/* Input */}
          <div className="border-t border-border/30 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-card/50 border border-border/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
