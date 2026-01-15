import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';

import { api } from '../../api';
import { API_ENDPOINTS } from '@/lib/api/api';
import { RegisterRequest } from '@/lib/api/clientApi';
import { logErrorResponse } from '../../_utils/utils';

//===========================================================================

type CookieStore = Awaited<ReturnType<typeof cookies>>;

//===========================================================================

function applySetCookie(
  cookieStore: CookieStore,
  setCookie: string | string[]
) {
  const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

  for (const cookieStr of cookieArray) {
    const parsed = parse(cookieStr);

    const maxAgeRaw = parsed['Max-Age'];
    const maxAge = maxAgeRaw ? Number(maxAgeRaw) : undefined;

    const options = {
      expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
      path: parsed.Path ?? '/',
      maxAge: Number.isFinite(maxAge) ? maxAge : undefined,
    };

    if (parsed.accessToken)
      cookieStore.set('accessToken', parsed.accessToken, options);
    if (parsed.refreshToken)
      cookieStore.set('refreshToken', parsed.refreshToken, options);
  }
}

//===========================================================================

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterRequest;
    const cookieStore = await cookies();
    const registerRes = await api.post(API_ENDPOINTS.REGISTER, body);

    const registerSetCookie = registerRes.headers['set-cookie'];
    if (registerSetCookie) {
      applySetCookie(cookieStore, registerSetCookie);
      return NextResponse.json(registerRes.data, {
        status: registerRes.status,
      });
    }

    const loginRes = await api.post(API_ENDPOINTS.LOGIN, {
      email: body.email,
      password: body.password,
    });

    const loginSetCookie = loginRes.headers['set-cookie'];
    if (loginSetCookie) {
      applySetCookie(cookieStore, loginSetCookie);
    }

    return NextResponse.json(registerRes.data, { status: registerRes.status });
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

/*
import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { AxiosError } from 'axios';
import { API_ENDPOINTS } from '@/lib/api/api';

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const response = await api.post(API_ENDPOINTS.REGISTER, body);

    const cookieData = await cookies();
    const setCookie = response.headers['set-cookie'];

    if (setCookie) {
      const cookiesArray = Array.isArray(setCookie) ? setCookie : [setCookie];

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
    }
    const { data } = response;

    if (data) {
      return NextResponse.json(
        {
          ...data.data,
        },
        { status: data.status }
      );
    }
  } catch (error) {
    const err = error as AxiosError;

    if (err.response) {
      return NextResponse.json(err.response.data, {
        status: err.response.status,
      });
    }

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
*/
