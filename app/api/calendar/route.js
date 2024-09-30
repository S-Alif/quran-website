import { NextResponse } from 'next/server';
import { dataFetcher } from '../dataFetcher';
import endpoints from '../endpoints';

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')
  const city = searchParams.get('city')
  const country = searchParams.get('country')

  try {
    const data = await dataFetcher(
      `${endpoints.prayerTime}/${date}?city=${city}&country=${country}&method=2`
    )

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch surah data' }, { status: 500 })
  }
}