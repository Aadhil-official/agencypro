import { NextResponse } from 'next/server';
import { getServerSession } from 'cosmic-authentication';
import { isAdminUser } from '@/lib/admin';

async function getDb() {
  const { db } = await import('cosmic-database');
  return db;
}

// GET - Fetch advertisements
export async function GET(request: Request) {
  try {
    if (!process.env.COSMIC_DATABASE_SECRET) {
      return NextResponse.json({ advertisements: [] });
    }
    const db = await getDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const placement = searchParams.get('placement');
    const activeOnly = searchParams.get('activeOnly') === 'true';

    // If not explicitly requesting only active ads for public display, require admin
    if (!activeOnly) {
      const user = await getServerSession();
      if (!user || !(await isAdminUser(user.email))) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }
    
    if (id) {
      // Get specific advertisement
      const doc = await db.collection('advertisements').doc(id).get();
      if (!doc.exists) {
        return NextResponse.json({ error: 'Advertisement not found' }, { status: 404 });
      }
      return NextResponse.json({ id: doc.id, ...doc.data() });
    } else {
      // Get all advertisements with optional filters
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let query: any = db.collection('advertisements');
      let filterActiveInMemory = false;

      if (activeOnly && placement) {
        // Avoid composite index requirement by filtering one field in memory.
        query = query.where('placement', '==', placement);
        filterActiveInMemory = true;
      } else {
        if (activeOnly) {
          query = query.where('isActive', '==', true);
        }

        if (placement) {
          query = query.where('placement', '==', placement);
        }
      }
      
      const canOrderBy = !placement;
      const snapshot = await (canOrderBy
        ? query.orderBy('updatedAt', 'desc').limit(50).get()
        : query.limit(50).get());
      
      let advertisements = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null
      }));

      if (filterActiveInMemory) {
        advertisements = advertisements.filter((ad) => ad.isActive === true);
      }
      if (!canOrderBy) {
        advertisements.sort((a, b) => {
          const aTime = a.updatedAt ? Date.parse(a.updatedAt) : 0;
          const bTime = b.updatedAt ? Date.parse(b.updatedAt) : 0;
          return bTime - aTime;
        });
      }
      
      return NextResponse.json({ advertisements });
    }
  } catch (error) {
    console.error('Error fetching advertisements:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new advertisement (ADMIN ONLY)
export async function POST(request: Request) {
  try {
    const db = await getDb();
    const user = await getServerSession();
    if (!user || !(await isAdminUser(user.email))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();
    const { imageAsset, link, placement, rotation, isActive } = data;
    
    if (!imageAsset || !placement) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const advertisementData = {
      imageAsset,
      link: link || '',
      placement,
      rotation: rotation || 1,
      isActive: isActive !== undefined ? isActive : true,
      createdAt: db.FieldValue.serverTimestamp(),
      updatedAt: db.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection('advertisements').add(advertisementData);
    
    return NextResponse.json({ 
      success: true, 
      id: docRef.id,
      message: 'Advertisement created successfully' 
    });
  } catch (error) {
    console.error('Error creating advertisement:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update advertisement (ADMIN ONLY)
export async function PUT(request: Request) {
  try {
    const db = await getDb();
    const user = await getServerSession();
    if (!user || !(await isAdminUser(user.email))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();
    const { id, ...updateData } = data;
    
    if (!id) {
      return NextResponse.json({ error: 'Missing advertisement ID' }, { status: 400 });
    }
    
    await db.collection('advertisements').doc(id).update({
      ...updateData,
      updatedAt: db.FieldValue.serverTimestamp()
    });
    
    return NextResponse.json({ success: true, message: 'Advertisement updated successfully' });
  } catch (error) {
    console.error('Error updating advertisement:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete advertisement (ADMIN ONLY)
export async function DELETE(request: Request) {
  try {
    const db = await getDb();
    const user = await getServerSession();
    if (!user || !(await isAdminUser(user.email))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing advertisement ID' }, { status: 400 });
    }
    
    await db.collection('advertisements').doc(id).delete();
    
    return NextResponse.json({ success: true, message: 'Advertisement deleted successfully' });
  } catch (error) {
    console.error('Error deleting advertisement:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
