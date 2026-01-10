import { API_ENDPOINTS } from '@/lib/api/api';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { logErrorResponse } from '../../_utils/utils';
import { api } from '../../api';

type Props = {
  params: Promise<{ taskId: string }>;
};

export async function PATCH(request: Request, { params }: Props) {
  const cookieStore = await cookies();
  const { taskId } = await params;
  const body = await request.json();

  try {
    const res = await api.patch(
      `${API_ENDPOINTS.TASKS_PATCH_TASK_ID}${taskId}`,
      body,
      {
        headers: { Cookie: cookieStore.toString() },
      }
    );
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
