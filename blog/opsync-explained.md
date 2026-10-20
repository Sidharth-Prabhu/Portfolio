---
title: "opSync - A Collaborative Document editor built using CRDT and WebSockets"
description: "Explore how OpSync enables real-time document collaboration using CRDTs, WebSockets, and a modern tech stack. Learn the architecture behind multi-user editing, version history, and role-based access control."
date: "2026-03-18"
tags: ["React", "Real-time", "CRDT", "WebSocket", "Collaboration"]
coverImage: "./images/opsync-cover.jpg"
readTime: "15 min read"
featured: true
---

# opSync - A Collaborative Document editor built using CRDT and WebSockets

Modern teams need seamless collaboration tools. OpSync is a full-stack, real-time collaborative document editor built with modern web technologies that enables multiple users to simultaneously edit documents with live cursor tracking, instant synchronization, version history rollback, and integrated chat functionality.

## The Architecture Overview

OpSync combines several powerful technologies to deliver a smooth collaborative editing experience:

```
┌─────────────┐     WebSocket      ┌─────────────┐
│   User A    │◄──────────────────►│             │
│   (Editor)  │                    │   Server    │
└─────────────┘                    │  (Socket.io)│
                                   │             │
┌─────────────┐     WebSocket      │             │
│   User B    │◄──────────────────►│             │
│   (Editor)  │                    └──────┬──────┘
└─────────────┘                           │
                                      ┌────┴────┐
                                      │ MongoDB │
                                      └─────────┘
```

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React 19 + Vite | UI framework and build tool |
| Styling | Tailwind CSS v4 | Utility-first styling |
| State | Zustand | Lightweight state management |
| Editor | BlockNote | Rich text editing (ProseMirror-based) |
| Sync | Yjs | CRDT for conflict-free collaboration |
| Real-time | Socket.io | WebSocket communication |
| Backend | Node.js + Express | API server |
| Database | MongoDB + Mongoose | Document storage |

## Core Features

### 1. Real-Time Collaboration with CRDTs

OpSync uses **Yjs** (Conflict-free Replicated Data Type) to ensure all users see the same content, even when editing simultaneously. This eliminates merge conflicts entirely.

```javascript
// Client-side Yjs setup
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const ydoc = new Y.Doc();
const provider = new WebsocketProvider(
  'ws://localhost:3001',
  documentId,
  ydoc
);

const ytext = ydoc.getText('content');
// Changes auto-sync across all connected clients
```

### 2. Rich Text Editor Integration

Built on **BlockNote**, the editor supports formatting toolbar, slash menus, and emoji picker. Documents are stored as JSON blocks:

```javascript
// Document structure stored in MongoDB
{
  "_id": "doc_123",
  "title": "Project Proposal",
  "content": [
    {
      "type": "paragraph",
      "content": [{ "type": "text", "text": "Introduction..." }]
    },
    {
      "type": "heading",
      "attrs": { "level": 2 },
      "content": [{ "type": "text", "text": "Objectives" }]
    }
  ],
  "owner": "user_456",
  "collaborators": ["user_789", "user_101"]
}
```

### 3. Version History System

OpSync maintains a complete version history with automatic snapshots on session close and manual snapshot creation:

```javascript
// Snapshot model
const DocumentSnapshot = {
  documentId: ObjectId,
  content: Object, // JSON blocks
  contentHash: String, // Prevents duplicates
  createdAt: Date,
  createdBy: ObjectId,
  isAutomatic: Boolean
};
```

One-click rollback restores any previous version, with automatic backup creation before restoration.

### 4. Role-Based Access Control

Three roles control document permissions:

| Role | Permissions |
|------|-------------|
| **Owner** | Full control, manage collaborators, delete document |
| **Editor** | Edit content, chat, view history |
| **Viewer** | Read-only access, no editing |

### 5. Real-Time Chat

In-document chat keeps teams synchronized:

```javascript
// Message model with edit tracking
const Message = {
  documentId: ObjectId,
  sender: ObjectId,
  content: String,
  isEdited: Boolean,
  createdAt: Date,
  updatedAt: Date
};
```

### 6. Live Cursor Tracking

Users can see where collaborators are editing in real-time:

```javascript
// Awareness protocol in Yjs
provider.awareness.setLocalState({
  user: { name: 'Alice', color: '#ff6b6b' },
  cursor: { anchor: 15, head: 20 }
});
```

## Backend Architecture

### Socket.io Event Handling

The server relays CRDT updates and broadcasts presence changes:

```javascript
// Socket event handling
io.on('connection', (socket) => {
  socket.on('join-document', (docId) => {
    socket.join(docId);
    // Broadcast user presence
    io.to(docId).emit('user-joined', socket.userId);
  });

  socket.on('cursor-update', ({ docId, position }) => {
    socket.to(docId).emit('cursor-moved', {
      userId: socket.userId,
      position
    });
  });
});
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/signup` | POST | User registration |
| `/api/auth/login` | POST | User authentication |
| `/api/docs` | GET/POST | List/create documents |
| `/api/docs/:id` | GET/PUT/DELETE | Document CRUD |
| `/api/docs/:id/snapshots` | GET/POST | Version history |
| `/api/invites/invite` | POST | Invite collaborator |

## State Management with Zustand

OpSync uses Zustand for lightweight, performant state management:

```javascript
// Store setup
const useStore = create((set, get) => ({
  user: null,
  documents: [],
  currentDocument: null,
  
  setUser: (user) => set({ user }),
  
  addDocument: (doc) => set((state) => ({
    documents: [...state.documents, doc]
  })),
  
  updateDocument: (id, updates) => set((state) => ({
    documents: state.documents.map(d => 
      d._id === id ? { ...d, ...updates } : d
    )
  }))
}));
```

## Best Practices

### Do's
- Use CRDTs for conflict-free real-time sync
- Implement proper error handling for WebSocket disconnections
- Hash content to prevent duplicate snapshots
- Split contexts to optimize re-renders

### Don'ts
- Don't store large documents in WebSocket messages
- Don't skip authentication on WebSocket connections
- Don't forget to clean up socket listeners on unmount

## Performance Considerations

| Technique | Use Case |
|-----------|----------|
| `useMemo` | Expensive document parsing |
| `useCallback` | Socket event handlers |
| Context splitting | User state vs. document state |
| Debouncing | Cursor position updates |

## Conclusion

OpSync demonstrates how modern web technologies can create seamless real-time collaboration experiences. By combining CRDTs for conflict-free editing, WebSockets for instant communication, and a robust MongoDB backend, it provides a solid foundation for building collaborative applications.

The project is open-source and can be extended with features like document templates, comments, and integration with third-party services. Whether you're building a team wiki, a project documentation system, or a collaborative writing platform, OpSync provides the building blocks for real-time collaboration.