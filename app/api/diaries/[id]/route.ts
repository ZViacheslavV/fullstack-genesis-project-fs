import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

import { api } from '../../api';
import { API_ENDPOINTS } from '@/lib/api/api';
import { logErrorResponse } from '../../_utils/utils';

type Props = {
  params: { id: string };
};

export async function PATCH(request: Request, { params }: Props) {
  const cookieStore = cookies();
  const body = await request.json();
  const { id } = params;

  try {
    const res = await api.patch(`${API_ENDPOINTS.DIARIES_PATCH_ID}${id}`, body, {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Props) {
  const cookieStore = cookies();
  const { id } = params;

  try {
    const res = await api.delete(`${API_ENDPOINTS.DIARIES_DELETE_ID}${id}`, {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
