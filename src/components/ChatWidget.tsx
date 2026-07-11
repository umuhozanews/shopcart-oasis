import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { sendChatMessage, type ChatMessage } from '@/lib/chat-fn';

type UIMessage = ChatMessage & { id: string };

const QUICK_REPLIES = [
  "What phones do you have?",
  "How much is the iPhone 16?",
  "Do you deliver across Rwanda?",
  "How do returns work?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      if (messages.length === 0) {
        setMessages([
          {
            id: 'welcome',
            role: 'assistant',
            content:
              "Hi! I'm Hippo 🦛 your AI assistant at Hippo Technology. Ask me anything about our phones, prices, delivery, or returns!",
          },
        ]);
      }
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: UIMessage = { id: `u-${Date.now()}`, role: 'user', content: text.trim() };
    // Build history excluding the welcome message (it's UI-only, not sent to AI)
    const history: ChatMessage[] = [
      ...messages
        .filter((m) => m.id !== 'welcome')
        .map(({ role, content }) => ({ role, content })),
      { role: 'user', content: text.trim() },
    ];

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const { reply } = await sendChatMessage({ data: { messages: history } });
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: 'assistant', content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content:
            'Something went wrong. Please WhatsApp us at +250 793 051 054 and we will help you right away!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  const showQuickReplies = messages.length <= 1 && !loading;

  return (
    <>
      {/* Chat Panel */}
      {open && (
        <div
          className="fixed bottom-40 right-5 z-50 flex w-[340px] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
          style={{ maxHeight: 'min(520px, calc(100vh - 180px))' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-primary px-4 py-3.5 text-primary-foreground">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20">
              <Bot size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold leading-none">Hippo AI Assistant</div>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-primary-foreground/80">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-300" />
                Online · Always here to help
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="ml-auto grid h-7 w-7 place-items-center rounded-full text-primary-foreground/80 transition hover:bg-primary-foreground/20 hover:text-primary-foreground"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ minHeight: 0 }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Bot size={14} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-tr-sm bg-primary text-primary-foreground'
                      : 'rounded-tl-sm bg-surface-muted text-foreground'
                  }`}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot size={14} />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-surface-muted px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Quick replies */}
            {showQuickReplies && (
              <div className="pt-1">
                <p className="mb-2 text-xs text-muted-foreground">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition hover:bg-primary/10"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border px-3 py-3">
            <div className="flex items-center gap-2 rounded-full border border-border bg-surface-muted px-4 py-1.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message…"
                disabled={loading}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                aria-label="Send"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:opacity-40"
              >
                <Send size={13} />
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
              Hippo Technology · WhatsApp +250 793 051 054
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open AI chat assistant'}
        className="fixed bottom-24 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}
