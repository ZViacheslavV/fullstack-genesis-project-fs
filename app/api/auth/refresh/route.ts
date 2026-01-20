import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { API_ENDPOINTS } from '@/lib/api/api';

export async function POST() {
  const cookieData = await cookies();
  const accessToken = cookieData.get('accessToken')?.value;
  const refreshToken = cookieData.get('refreshToken')?.value;

  if (accessToken) {
    return NextResponse.json({ success: true });
  }

  if (refreshToken) {
    try {
      const response = await api.post(
        API_ENDPOINTS.REFRESH,
        {},
        {
          headers: { Cookie: cookieData.toString() },
        }
      );

      const setCookies = response.headers['set-cookie'];

      if (setCookies) {
        const cookiesArray = Array.isArray(setCookies)
          ? setCookies
          : [setCookies];

        for (const newCookieString of cookiesArray) {
          const parsedCookie = parse(newCookieString);
          const options = {
            path: parsedCookie.Path,
            maxAge: Number(parsedCookie['Max-Age']),
            expires: parsedCookie.Expires
              ? new Date(parsedCookie.Expires)
              : undefined,
            httpOnly: true,
            secure: true,
          };

          if (parsedCookie.accessToken) {
            cookieData.set('accessToken', parsedCookie.accessToken, options);
          }

          if (parsedCookie.refreshToken) {
            cookieData.set('refreshToken', parsedCookie.refreshToken, options);
          }
        }

        return NextResponse.json({ success: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return NextResponse.json({ success: false });
}

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

    const apiRes = await api.post(API_ENDPOINTS.REFRESH, {
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

//LAST one
/* import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { api } from '../../api';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';
import { API_ENDPOINTS } from '@/lib/api/api';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (accessToken) {
      return NextResponse.json({ success: true });
    }

    if (refreshToken) {
      const apiRes = await api.post(API_ENDPOINTS.REFRESH, null, {
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
 */
