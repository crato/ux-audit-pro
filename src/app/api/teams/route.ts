import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { createTeam, getUserTeams, updateTeam } from '@/lib/db-utils';
import { validateTeamData } from '@/lib/validation-utils';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    validateTeamData(data);

    const team = await createTeam({
      ...data,
      owner: session.user.sub,
      members: [
        {
          userId: session.user.sub,
          role: 'owner',
          joinedAt: new Date()
        }
      ]
    });

    return NextResponse.json(team);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const teams = await getUserTeams(session.user.sub);
    return NextResponse.json(teams);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to get teams' }, { status: 500 });
  }
}