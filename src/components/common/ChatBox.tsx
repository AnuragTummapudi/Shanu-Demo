import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  MessageSquare, 
  Send, 
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Smile,
  X,
  CheckCheck,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: number;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
}

interface ChatUser {
  id: string;
  name: string;
  role: string;
  email: string;
  status: 'online' | 'offline' | 'busy';
  avatar?: string;
}

interface ChatBoxProps {
  currentUser: ChatUser;
  allowedRoles: string[];
  title?: string;
}

const mockChatUsers: ChatUser[] = [
  {
    id: 'ops1',
    name: 'Ravi Shankar',
    role: 'operations',
    email: 'ravi.shankar@university.edu.in',
    status: 'online'
  },
  {
    id: 'admin1',
    name: 'Dr. Ashok Kumar',
    role: 'admin',
    email: 'ashok.kumar@university.edu.in',
    status: 'online'
  },
  {
    id: 'outreach1',
    name: 'Kavitha Reddy',
    role: 'outreach',
    email: 'kavitha.reddy@university.edu.in',
    status: 'busy'
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    senderId: 'ops1',
    senderName: 'Ravi Shankar',
    senderRole: 'operations',
    content: 'Hi! I need to discuss the upcoming placement drive schedule.',
    timestamp: '10:30 AM',
    status: 'read',
    type: 'text'
  },
  {
    id: 2,
    senderId: 'current',
    senderName: 'You',
    senderRole: 'current',
    content: 'Sure! What specific details do you need help with?',
    timestamp: '10:32 AM',
    status: 'delivered',
    type: 'text'
  },
  {
    id: 3,
    senderId: 'ops1',
    senderName: 'Ravi Shankar',
    senderRole: 'operations',
    content: 'We need to coordinate the interview room allocations for next week.',
    timestamp: '10:35 AM',
    status: 'read',
    type: 'text'
  }
];

export const ChatBox: React.FC<ChatBoxProps> = ({ 
  currentUser, 
  allowedRoles, 
  title = "Messages" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const availableUsers = mockChatUsers.filter(user => 
    allowedRoles.includes(user.role) && user.id !== currentUser.id
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: messages.length + 1,
      senderId: 'current',
      senderName: 'You',
      senderRole: currentUser.role,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Clock className="w-3 h-3 text-slate-400" />;
      case 'delivered': return <CheckCheck className="w-3 h-3 text-slate-400" />;
      case 'read': return <CheckCheck className="w-3 h-3 text-primary" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'busy': return 'bg-warning';
      case 'offline': return 'bg-slate-400';
      default: return 'bg-slate-400';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
          <MessageSquare className="w-4 h-4 mr-2" />
          {title}
          {availableUsers.filter(u => u.status === 'online').length > 0 && (
            <div className="w-2 h-2 bg-success rounded-full ml-2 animate-pulse" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl h-[600px] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-primary" />
            {title}
          </DialogTitle>
          <DialogDescription>
            Communicate with team members in real-time
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-1 min-h-0">
          {/* Chat List */}
          <div className="w-1/3 border-r bg-slate-50">
            <div className="p-4">
              <h3 className="font-medium text-slate-800 mb-3">Available Team Members</h3>
              <div className="space-y-2">
                {availableUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedChat(user)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedChat?.id === user.id 
                        ? 'bg-primary/10 border border-primary/20' 
                        : 'bg-white hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="/api/placeholder/40/40" />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-white`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-800 text-sm truncate">{user.name}</div>
                        <div className="text-xs text-slate-600 capitalize">{user.role}</div>
                        <div className="text-xs text-slate-500 capitalize">{user.status}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="/api/placeholder/40/40" />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {selectedChat.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(selectedChat.status)} rounded-full border-2 border-white`} />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">{selectedChat.name}</div>
                        <div className="text-sm text-slate-600 capitalize">{selectedChat.role} • {selectedChat.status}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 'current' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.senderId === 'current'
                          ? 'bg-primary text-white'
                          : 'bg-white text-slate-800 border'
                      }`}>
                        <div className="text-sm">{message.content}</div>
                        <div className={`flex items-center justify-end mt-1 space-x-1 text-xs ${
                          message.senderId === 'current' ? 'text-white/70' : 'text-slate-500'
                        }`}>
                          <span>{message.timestamp}</span>
                          {message.senderId === 'current' && getStatusIcon(message.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="pr-12"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 text-slate-400"
                      >
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-slate-50">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                  <div className="text-slate-600 mb-2">Select a team member to start chatting</div>
                  <div className="text-sm text-slate-500">
                    {availableUsers.filter(u => u.status === 'online').length} member(s) online
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};