import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../../../api';
import { cookies } from 'next/headers';
import { API_ENDPOINTS } from '@/lib/api/api';

type Props = { params: Promise<{ weekNumber: string }> };

export async function GET(request: NextRequest, { params }: Props) {
  const { weekNumber } = await params;

  try {
    const cookieStore = await cookies();
    const { data } = await api(
      `${API_ENDPOINTS.WEEKS_MOM_WEEK_NUMB}${weekNumber}`,
      {
        headers: { Cookie: cookieStore.toString() },
      }
    );

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
