/* import { cookies } from 'next/headers';
import { api } from '../api';
import { NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/lib/api/api';

export async function GET() {
  const cookieStore = await cookies();

  try {
    const { data } = await api.get(`${API_ENDPOINTS.EMOTIONS}`, {
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'application/json',
      },
    });

    if (data) {
      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {
    console.error('Failed to fetch emotions:', error);
  }

  return NextResponse.json(
    { error: 'Failed to fetch emotions' },
    { status: 500 }
  );
} */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { API_ENDPOINTS } from '@/lib/api/api';
import { api, ApiError } from '../api';

// type Props = { params: Promise<{ weekNumber: string }> };

export async function GET() {
  try {
    const cookieStore = await cookies();
    const { data } = await api(`${API_ENDPOINTS.EMOTIONS}`, {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      {
        status: (error as ApiError).status,
      }
    );
  }
}
