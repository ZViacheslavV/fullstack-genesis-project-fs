import { cookies } from 'next/headers';
import FormData from 'form-data';
import { API_ENDPOINTS } from '@/lib/api/api';
import { NextResponse } from 'next/server';
import { api } from '../../api';

export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    const formData = await req.formData();
    const file = formData.get('avatar') as File;

    const backendFormData = new FormData();
    backendFormData.append(
      'avatar',
      Buffer.from(await file.arrayBuffer()),
      file.name
    );

    const { data } = await api.patch(
      API_ENDPOINTS.USER_CURRENT_PATCH_AVA,
      backendFormData,
      {
        headers: {
          ...backendFormData.getHeaders(),
          Cookie: cookieStore.toString(),
        },
      }
    );

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
