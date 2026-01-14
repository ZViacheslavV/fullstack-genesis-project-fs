import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

import { api } from '../api';
import { API_ENDPOINTS } from '@/lib/api/api';
import { logErrorResponse } from '../_utils/utils';

function serializeCookies() {
  // Next 15: cookies() async
  // Header Cookie: "a=1; b=2"
  // Беремо всі cookie і склеюємо
  return cookies().then((store) =>
    store
      .getAll()
      .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
      .join('; ')
  );
}

export async function GET() {
  try {
    const cookieHeader = await serializeCookies();

    const res = await api.get(API_ENDPOINTS.DIARIES_GET, {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
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

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const cookieHeader = await serializeCookies();

    const res = await api.post(API_ENDPOINTS.DIARIES_POST, body, {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
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
//=====================DELETE====================///

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: 'Diary id is required' },
        { status: 400 }
      );
    }

    const cookieHeader = await serializeCookies();

    const res = await api.delete(
      `${API_ENDPOINTS.DIARIES_DELETE_ID}${id}`,
      {
        headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
      }
    );

    // 🔥 ВАЖЛИВО
    if (res.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
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

