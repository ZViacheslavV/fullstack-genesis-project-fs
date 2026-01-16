import { API_ENDPOINTS } from '@/lib/api/api';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { logErrorResponse } from '../../_utils/utils';
import { api } from '../../api';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ entryId: string }>;
};

async function serializeCookies() {
  const store = await cookies();
  return store
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join('; ');
}

// === PATCH (Редагування) ===
export async function PATCH(request: Request, { params }: Props) {
  const { entryId } = await params;
  const body = await request.json();

  try {
    const cookieHeader = await serializeCookies();

    const res = await api.patch(
      `${API_ENDPOINTS.DIARIES_PATCH_ID}${entryId}`,
      body,
      {
        headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
      }
    );

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
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// === DELETE (Видалення) ===
export async function DELETE(_: Request, { params }: Props) {
  const { entryId } = await params;

  try {
    const cookieHeader = await serializeCookies();

    await api.delete(
      `${API_ENDPOINTS.DIARIES_DELETE_ID}${entryId}`,
      {
        headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
      }
    );

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}