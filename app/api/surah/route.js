import { NextResponse } from 'next/server';
import { dataFetcher } from '../dataFetcher';
import endpoints from '../endpoints';

export async function GET(req) {
  // Extracting query parameters from the request URL
  const { searchParams } = new URL(req.url)
  const number = searchParams.get('number')
  const lang = searchParams.get('lang') || 'en.asad'
  const offset = parseInt(searchParams.get('offset') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const edition = 'quran-unicode'

  try {
    const data = await dataFetcher(
      `${endpoints.surahList}/${number}/editions/${edition},${lang}?offset=${(offset - 1) * limit}&limit=${limit}`
    )

    return NextResponse.json({
      ayahs: data[0].ayahs,
      translations: data[1].ayahs,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch surah data' }, { status: 500 })
  }
}