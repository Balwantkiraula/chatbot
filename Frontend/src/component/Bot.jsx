import axios from 'axios'
import React, { useState, useRef, useEffect } from 'react'

const Bot = () => {
    // Initialize state from localStorage using lazy initialization
    const getInitialChats = () => {
        const savedChats = localStorage.getItem('chatHistory')
        return savedChats ? JSON.parse(savedChats) : []
    }

    const getInitialState = () => {
        const savedChats = getInitialChats()
        if (savedChats.length > 0) {
            const mostRecent = savedChats[savedChats.length - 1]
            return {
                chats: savedChats,
                currentChatId: mostRecent.id,
                messages: mostRecent.messages || []
            }
        }
        return {
            chats: [],
            currentChatId: null,
            messages: []
        }
    }

    const initialState = getInitialState()
    const [messages, setMessages] = useState(initialState.messages)
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [chats, setChats] = useState(initialState.chats)
    const [currentChatId, setCurrentChatId] = useState(initialState.currentChatId)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [isListening, setIsListening] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const messagesEndRef = useRef(null)
    const recognitionRef = useRef(null)
    const speechSynthesisRef = useRef(null)

    // Save chats to localStorage whenever chats change
    useEffect(() => {
        if (chats.length > 0) {
            localStorage.setItem('chatHistory', JSON.stringify(chats))
        }
    }, [chats])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Initialize Speech Recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            const recognition = new SpeechRecognition()
            recognition.continuous = false
            recognition.interimResults = false
            recognition.lang = 'en-US'

            recognition.onstart = () => {
                setIsListening(true)
            }

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript
                setInput(prev => prev + (prev ? ' ' : '') + transcript)
                setIsListening(false)
            }

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error)
                setIsListening(false)
            }

            recognition.onend = () => {
                setIsListening(false)
            }

            recognitionRef.current = recognition
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop()
            }
        }
    }, [])

    // Cleanup speech synthesis on unmount
    useEffect(() => {
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel()
            }
        }
    }, [])

    const createNewChat = () => {
        const newChatId = Date.now().toString()
        const newChat = {
            id: newChatId,
            title: "New Chat",
            messages: [],
            createdAt: new Date().toISOString()
        }
        setChats(prev => [...prev, newChat])
        setCurrentChatId(newChatId)
        setMessages([])
        setSidebarOpen(false) // Close sidebar on mobile after selecting
    }

    const loadChat = (chatId) => {
        const chat = chats.find(c => c.id === chatId)
        if (chat) {
            setCurrentChatId(chatId)
            setMessages(chat.messages || [])
            setSidebarOpen(false) // Close sidebar on mobile after selecting
        }
    }

    const deleteChat = (chatId, e) => {
        e.stopPropagation()
        const updatedChats = chats.filter(c => c.id !== chatId)
        setChats(updatedChats)
        
        if (chatId === currentChatId) {
            if (updatedChats.length > 0) {
                const lastChat = updatedChats[updatedChats.length - 1]
                setCurrentChatId(lastChat.id)
                setMessages(lastChat.messages || [])
            } else {
                setCurrentChatId(null)
                setMessages([])
            }
        }
        
        if (updatedChats.length === 0) {
            localStorage.removeItem('chatHistory')
        }
    }

    const handleMessage = async () =>{
        setLoading(true)
        if(!input.trim()) return;
        
        const userInput = input.trim()
        setInput("")
        
        try{
          const res = await axios.post("https://chatbot-1-wj9o.onrender.com",{
            text : userInput
           })
           if(res.status === 200){
            const newMessages = [
                ...messages, 
                {text : res.data.userMessage , sender : "user"}, 
                {text : res.data.botMessage , sender : "bot"}
            ]
            setMessages(newMessages)
            
            // Create new chat if no current chat exists
            let chatId = currentChatId
            if (!chatId) {
                chatId = Date.now().toString()
                const newChat = {
                    id: chatId,
                    title: res.data.userMessage.length > 30 ? res.data.userMessage.substring(0, 30) + '...' : res.data.userMessage,
                    messages: newMessages,
                    createdAt: new Date().toISOString()
                }
                setChats(prev => [...prev, newChat])
                setCurrentChatId(chatId)
            } else {
                // Update existing chat with new messages
                setChats(prev => prev.map(chat => {
                    if (chat.id === chatId) {
                        // Update title if this is the first message
                        const title = chat.messages.length === 0 && res.data.userMessage.length > 30 
                            ? res.data.userMessage.substring(0, 30) + '...' 
                            : res.data.userMessage.length <= 30 
                            ? res.data.userMessage 
                            : chat.title
                        return {
                            ...chat,
                            title: chat.messages.length === 0 ? title : chat.title,
                            messages: newMessages
                        }
                    }
                    return chat
                }))
            }
           }
          console.log(res.data)
        }catch(err){
          console.log(err)
        }
        setLoading(false)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleMessage()
        }
    }

    // Speech-to-Text functions
    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            try {
                recognitionRef.current.start()
            } catch (error) {
                console.error('Error starting speech recognition:', error)
            }
        }
    }

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop()
            setIsListening(false)
        }
    }

    // Text-to-Speech function
    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel()
            
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.rate = 1.0
            utterance.pitch = 1.0
            utterance.volume = 1.0
            utterance.lang = 'en-US'

            utterance.onstart = () => {
                setIsSpeaking(true)
            }

            utterance.onend = () => {
                setIsSpeaking(false)
            }

            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event.error)
                setIsSpeaking(false)
            }

            window.speechSynthesis.speak(utterance)
            speechSynthesisRef.current = utterance
        }
    }

    const stopSpeaking = () => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel()
            setIsSpeaking(false)
        }
    }

    return (
        <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed sm:relative sm:translate-x-0 z-30 w-64 bg-gray-900 text-white flex flex-col transition-transform duration-300 ease-in-out h-full`}>
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                    <button
                        onClick={createNewChat}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors w-full"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Chat
                    </button>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="sm:hidden ml-2 p-2 hover:bg-gray-800 rounded-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto p-2">
                    <div className="text-xs text-gray-400 px-3 py-2 font-semibold uppercase">Recent Chats</div>
                    {chats.length === 0 ? (
                        <div className="text-gray-500 text-sm px-3 py-4 text-center">
                            No chat history yet
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {[...chats].reverse().map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => loadChat(chat.id)}
                                    className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                                        currentChatId === chat.id
                                            ? 'bg-gray-800 text-white'
                                            : 'hover:bg-gray-800 text-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        <span className="text-sm truncate flex-1">{chat.title}</span>
                                    </div>
                                    <button
                                        onClick={(e) => deleteChat(chat.id, e)}
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-opacity"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 sm:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex flex-col flex-1 h-full bg-white overflow-hidden">
                {/* Header */}
                <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 sm:p-4 shadow-md flex-shrink-0 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="sm:hidden p-2 hover:bg-blue-600 rounded-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-lg sm:text-xl font-bold">ChatBot Assistant</h1>
                            <p className="text-xs sm:text-sm text-blue-100">How can I help you today?</p>
                        </div>
                    </div>
                </header>

                {/* Messages Area */}
                <main className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                        <p className="text-base sm:text-lg">👋 Welcome! Start a conversation</p>
                        <p className="text-xs sm:text-sm mt-2">Try saying "hello" or ask me anything!</p>
                    </div>
                )}
                
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex items-start gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        {message.sender === "bot" && window.speechSynthesis && (
                            <button
                                onClick={() => {
                                    if (isSpeaking) {
                                        stopSpeaking()
                                    } else {
                                        speakText(message.text)
                                    }
                                }}
                                className={`mt-1 p-1.5 rounded-lg transition-colors flex-shrink-0 ${
                                    isSpeaking
                                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                title={isSpeaking ? 'Stop speaking' : 'Speak this message'}
                            >
                                {isSpeaking ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    </svg>
                                )}
                            </button>
                        )}
                        <div
                            className={`max-w-[85%] sm:max-w-[75%] rounded-lg px-3 py-2 sm:px-4 ${
                                message.sender === "user"
                                    ? "bg-blue-500 text-white rounded-br-none"
                                    : "bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200"
                            }`}
                        >
                            <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">
                                {message.text}
                            </p>
                        </div>
                    </div>
                ))}
                
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white text-gray-800 rounded-lg rounded-bl-none px-4 py-2 shadow-sm border border-gray-200">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                
                    <div ref={messagesEndRef} />
                </main>

                {/* Input Area */}
                <footer className="border-t border-gray-200 p-3 sm:p-4 bg-white flex-shrink-0">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 sm:px-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={loading || isListening}
                    />
                    {/* Microphone Button for Speech-to-Text */}
                    {(window.SpeechRecognition || window.webkitSpeechRecognition) && (
                        <button
                            onClick={isListening ? stopListening : startListening}
                            disabled={loading}
                            className={`px-3 py-2 sm:px-4 rounded-lg transition-colors ${
                                isListening
                                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                            title={isListening ? 'Stop listening' : 'Start voice input'}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </button>
                    )}
                    <button
                        onClick={handleMessage}
                        disabled={loading || !input.trim()}
                        className="px-4 py-2 sm:px-6 bg-blue-500 text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "Send"
                        )}
                    </button>
                </div>
                </footer>
            </div>
        </div>
    )
}

export default Bot
