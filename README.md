# Janus WebRTC Demo - Nuxt Application

A comprehensive WebRTC demo application built with Nuxt 3, demonstrating real-time video streaming using Janus Gateway. This application allows users to publish their webcam streams and view streams from other publishers.

## 🚀 Features

- **Publisher Mode**: Join a Janus videoroom and publish webcam/microphone streams
- **Viewer Mode**: Browse and watch live streams from publishers
- **Real-time Communication**: WebRTC-based streaming with low latency
- **Mountpoint Management**: Automatic registration and discovery of streams
- **Responsive UI**: Clean interface built with TailwindCSS
- **TypeScript Support**: Full type safety with typed Janus integration

## 🛠 Technical Stack

### Frontend
- **Nuxt 3** - Vue.js framework
- **Vue 3** - Progressive JavaScript framework
- **TailwindCSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

### WebRTC
- **Janus Gateway** - WebRTC server
- **typed_janus_js** - TypeScript bindings for Janus
- **VideoRoom Plugin** - Multi-party video conferencing
- **Streaming Plugin** - Live stream distribution

### Backend
- **Nuxt Server API** - Built-in server functionality
- **H3** - HTTP framework
- **In-memory Storage** - Simple mountpoint management

## 📋 Prerequisites

- Node.js 18+ (recommended: 20.19.0 or higher)
- npm, yarn, or pnpm
- Access to a Janus Gateway server

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nuxt-janus-challenge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Janus server** (optional)

   The application is pre-configured to use the test server:
   ```
   wss://janus1.januscaler.com/janus/ws
   ```

   To use a local Janus server, set the environment variable:
   ```bash
   export JANUS_URL=ws://localhost:8188/janus
   ```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📖 Usage Guide

### Publisher Workflow

1. **Navigate to Publisher** (`/videoroom`)
2. **Connect to Janus** - Click "Connect to Janus" button
3. **Join Room** - Click "Join Room" to enter the videoroom
4. **Start Publishing** - Click "Start Publishing" to stream your webcam
5. **Register Mountpoint** - Click "Register Mountpoint" to make your stream available to viewers

### Viewer Workflow

1. **Navigate to Viewer** (`/streaming`)
2. **Connect to Janus** - Click "Connect to Janus" button
3. **Select Mountpoint** - Choose a stream from the dropdown
4. **Play Stream** - Click "Play Stream" to start watching

## 🏗 Project Structure

```
nuxt-janus-challenge/
├── components/
│   ├── PublisherCard.vue    # Publisher interface component
│   └── ViewerCard.vue       # Viewer interface component
├── composables/
│   ├── useJanus.ts          # Janus connection management
│   ├── useVideoroom.ts      # VideoRoom plugin integration
│   └── useStreaming.ts      # Streaming plugin integration
├── pages/
│   ├── index.vue            # Home page
│   ├── videoroom.vue        # Publisher page
│   └── streaming.vue        # Viewer page
├── server/
│   └── api/
│       └── mountpoints.ts   # Mountpoint management API
├── assets/
│   └── css/
│       └── main.css         # TailwindCSS imports
├── nuxt.config.ts           # Nuxt configuration
└── package.json             # Dependencies and scripts
```

## 🔌 API Endpoints

### Mountpoints API (`/api/mountpoints`)

- **GET** - Retrieve all registered mountpoints
- **POST** - Register a new mountpoint
- **DELETE** - Remove a mountpoint

Example mountpoint object:
```json
{
  "id": 1,
  "description": "Stream from Publisher 123",
  "roomId": 1234,
  "publisherId": 123,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## 🎯 Key Components

### Composables

- **`useJanus()`** - Manages Janus Gateway connection
- **`useVideoroom()`** - Handles videoroom publishing functionality
- **`useStreaming()`** - Manages stream viewing capabilities

### Components

- **`PublisherCard`** - Complete publisher interface with video preview and controls
- **`ViewerCard`** - Stream selection and playback interface

## 🔧 Configuration

### Environment Variables

- `JANUS_URL` - Janus Gateway WebSocket URL (default: `wss://janus1.januscaler.com/janus/ws`)

### Janus Server Requirements

The Janus server must have the following plugins enabled:
- `janus.plugin.videoroom` - For publishing streams
- `janus.plugin.streaming` - For viewing streams

## 🐛 Troubleshooting

### Common Issues

1. **Connection Failed**
   - Verify Janus server is running and accessible
   - Check WebSocket URL configuration
   - Ensure firewall allows WebSocket connections

2. **Camera/Microphone Access Denied**
   - Grant browser permissions for camera and microphone
   - Use HTTPS in production (required for getUserMedia)

3. **No Video/Audio**
   - Check browser compatibility
   - Verify media devices are available
   - Test with different browsers

### Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 🚀 Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

3. **Deploy to your preferred platform**
   - Vercel, Netlify, or any Node.js hosting service
   - Ensure WebSocket connections are supported

## 📝 Development Notes

- The application uses in-memory storage for mountpoints (resets on server restart)
- HTTPS is required in production for camera/microphone access
- WebSocket connections may require special configuration in some hosting environments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for the Januscaler coding challenge.

---

For more information about Janus Gateway, visit: https://janus.conf.meetecho.com/
