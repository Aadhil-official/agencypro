import { NextResponse } from 'next/server';
import { getServerSession } from 'cosmic-authentication';
import { isAdminEmail } from '@/lib/utils';

export async function GET() {
  const user = await getServerSession();
  if (!user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }
  const allowed = isAdminEmail(user.email);
  if (!allowed) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return NextResponse.json({ ok: true });
}
