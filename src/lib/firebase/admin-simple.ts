import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth, type Auth } from 'firebase-admin/auth'

let adminDb: any = null
let adminAuth: Auth | null = null

export function getAdminFirestore() {
  if (adminDb) {
    return adminDb
  }

  try {
    const existingApps = getApps()
    if (existingApps.length > 0) {
      adminDb = getFirestore(existingApps[0])
      return adminDb
    }

    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
    
    if (!serviceAccountJson) {
      console.error('❌ FIREBASE_SERVICE_ACCOUNT_JSON not found in environment variables')
      return null
    }

    const serviceAccount = JSON.parse(serviceAccountJson)
    
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n')
    }
    
    const app = initializeApp({
      credential: cert(serviceAccount),
    })

    adminDb = getFirestore(app)
    console.log('✅ Firebase Admin SDK initialized successfully')
    return adminDb
  } catch (error: any) {
    console.error('❌ Failed to initialize Firebase Admin SDK:', error.message)
    return null
  }
}

export function isAdminAvailable(): boolean {
  return getAdminFirestore() !== null
}

export function getAdminAuth(): Auth | null {
  if (adminAuth) {
    return adminAuth
  }

  try {
    const existingApps = getApps()
    if (existingApps.length > 0) {
      adminAuth = getAuth(existingApps[0])
      return adminAuth
    }

    getAdminFirestore()
    const apps = getApps()
    if (apps.length > 0) {
      adminAuth = getAuth(apps[0])
      return adminAuth
    }

    return null
  } catch (error: any) {
    console.error('Failed to get Admin Auth:', error.message)
    return null
  }
}
