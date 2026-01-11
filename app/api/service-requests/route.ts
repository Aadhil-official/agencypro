import { NextResponse } from 'next/server';
import { getServerSession } from 'cosmic-authentication';
import { isAdminEmail } from '@/lib/utils';

async function getDb() {
  const { db } = await import('cosmic-database');
  return db;
}

// GET - Fetch service requests (ADMIN ONLY)
export async function GET(request: Request) {
  try {
    const db = await getDb();
    const user = await getServerSession();
    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      // Get specific service request
      const doc = await db.collection('serviceRequests').doc(id).get();
      if (!doc.exists) {
        return NextResponse.json({ error: 'Service request not found' }, { status: 404 });
      }
      return NextResponse.json({ id: doc.id, ...doc.data() });
    } else {
      // Get all service requests
      const snapshot = await db.collection('serviceRequests')
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get();
      
      const serviceRequests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null
      }));
      
      return NextResponse.json({ serviceRequests });
    }
  } catch (error) {
    console.error('Error fetching service requests:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new service request (PUBLIC)
export async function POST(request: Request) {
  try {
    const db = await getDb();
    const data = await request.json();
    const { name, email, serviceType, details } = data;
    
    if (!name || !email || !serviceType || !details) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const serviceRequestData = {
      name,
      email,
      serviceType,
      details,
      status: 'pending',
      createdAt: db.FieldValue.serverTimestamp(),
      updatedAt: db.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection('serviceRequests').add(serviceRequestData);
    
    return NextResponse.json({ 
      success: true, 
      id: docRef.id,
      message: 'Service request submitted successfully' 
    });
  } catch (error) {
    console.error('Error creating service request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update service request status (ADMIN ONLY)
export async function PUT(request: Request) {
  try {
    const db = await getDb();
    const user = await getServerSession();
    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();
    const { id, status } = data;
    
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    await db.collection('serviceRequests').doc(id).update({
      status,
      updatedAt: db.FieldValue.serverTimestamp()
    });
    
    return NextResponse.json({ success: true, message: 'Service request updated successfully' });
  } catch (error) {
    console.error('Error updating service request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete service request (ADMIN ONLY)
export async function DELETE(request: Request) {
  try {
    const db = await getDb();
    const user = await getServerSession();
    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing service request ID' }, { status: 400 });
    }
    
    await db.collection('serviceRequests').doc(id).delete();
    
    return NextResponse.json({ success: true, message: 'Service request deleted successfully' });
  } catch (error) {
    console.error('Error deleting service request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
