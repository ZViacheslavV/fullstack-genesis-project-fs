/* import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { api } from '../../api';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { API_ENDPOINTS } from '@/lib/api/api';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ success: false });
    }

    const apiRes = await api.get(API_ENDPOINTS.REFRESH, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const setCookie = apiRes.headers['set-cookie'];
    if (!setCookie) {
      return NextResponse.json({ success: false });
    }

    const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

    for (const cookieStr of cookieArray) {
      const parsed = parse(cookieStr);

      const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'none' as const,
        path: '/',
        maxAge: Number(parsed['Max-Age']),
      };

      if (parsed.accessToken) {
        cookieStore.set('accessToken', parsed.accessToken, options);
      }

      if (parsed.refreshToken) {
        cookieStore.set('refreshToken', parsed.refreshToken, options);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json({ success: false });
    }
    return NextResponse.json({ success: false });
  }
} */

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { api } from '../../api';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';
import { API_ENDPOINTS } from '@/lib/api/api';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (accessToken) {
      return NextResponse.json({ success: true });
    }

    if (refreshToken) {
      const apiRes = await api.get(API_ENDPOINTS.REFRESH, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const setCookie = apiRes.headers['set-cookie'];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed['Max-Age']),
          };

          if (parsed.accessToken)
            cookieStore.set('accessToken', parsed.accessToken, options);
          if (parsed.refreshToken)
            cookieStore.set('refreshToken', parsed.refreshToken, options);
        }
        return NextResponse.json({ success: true }, { status: 200 });
      }
    }
    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json({ success: false }, { status: 200 });
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
