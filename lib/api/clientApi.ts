// import { nextServer } from './api';
// import { type AxiosResponse } from 'axios';

import { Baby, JourneyType, Momy } from '@/types/journey';
import { nextServer } from './api';

//-----------------JOURNEY------------------------------------------------------
type JourneyResponse<T extends JourneyType> = T extends 'baby' ? Baby : Momy;

export async function getJourneyData<T extends JourneyType>(
  weekNumber: number,
  type: T
): Promise<JourneyResponse<T>> {
  const { data } = await nextServer.get<JourneyResponse<T>>(
    `/journey/${weekNumber}/${type}`
  );

  return data;
}
