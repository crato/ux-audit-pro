import { NextResponse } from 'next/server';
import { createAudit, listAudits } from '@/lib/db-utils';
import { validateAuditData } from '@/lib/validation-utils';
import { getSession } from '@auth0/nextjs-auth0';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    validateAuditData(data);

    const audit = await createAudit({
      ...data,
      createdBy: session.user.sub
    });

    return NextResponse.json(audit);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create audit' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') as any;
    const clientName = searchParams.get('clientName') || undefined;
    const projectName = searchParams.get('projectName') || undefined;

    const results = await listAudits({
      createdBy: session.user.sub,
      status,
      clientName,
      projectName,
      page,
      limit
    });

    return NextResponse.json(results);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to list audits' }, { status: 500 });
  }
}