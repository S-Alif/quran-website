import { NextResponse } from 'next/server';
import { dataFetcher } from '../dataFetcher';
import endpoints from '../endpoints';

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const number = searchParams.get('number')
  const lang = searchParams.get('lang') || 'en.asad'

  try {
    const data = await dataFetcher(
      `${endpoints.juzList}/${number}/${lang}`
    )

    return NextResponse.json({
      ayahs: data.ayahs,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch juz translation data' }, { status: 500 })
  }
}