import { /* NextRequest, */ NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { API_ENDPOINTS } from '@/lib/api/api';
import { api, ApiError } from '../api';

// type Props = { params: Promise<{ weekNumber: string }> };

export async function GET(/* request:  NextRequest*/) {
  try {
    const cookieStore = await cookies();
    const { data } = await api(`${API_ENDPOINTS.WEEKS}`, {
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
