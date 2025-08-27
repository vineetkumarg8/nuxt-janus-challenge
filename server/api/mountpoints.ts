import { defineEventHandler, readBody, getMethod, createError } from 'h3'

// In-memory storage for mountpoints
let mountpoints: any[] = []
let nextId = 1

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  if (method === 'GET') {
    // Return all mountpoints
    return mountpoints
  }

  if (method === 'POST') {
    // Create a new mountpoint
    const body = await readBody(event)
    const newMountpoint = {
      id: nextId++,
      description: body.description || `Mountpoint ${nextId}`,
      roomId: body.roomId || null, // videoroom reference
      publisherId: body.publisherId || null, // publisher reference
      createdAt: new Date().toISOString()
    }
    mountpoints.push(newMountpoint)
    return newMountpoint
  }

  if (method === 'DELETE') {
    // Delete a mountpoint by ID
    const body = await readBody(event)
    const { id } = body
    const index = mountpoints.findIndex(mp => mp.id === id)
    if (index !== -1) {
      const deleted = mountpoints.splice(index, 1)[0]
      return { success: true, deleted }
    }
    return { success: false, error: 'Mountpoint not found' }
  }

  // Method not allowed
  throw createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed'
  })
})
