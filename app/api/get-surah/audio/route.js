import { NextResponse } from 'next/server';
import { dataFetcher } from '../../dataFetcher';
import endpoints from '../../endpoints';

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const number = searchParams.get('number')
  const edition = searchParams.get('edition')

  try {
    const data = await dataFetcher(
      `${endpoints.surahList}/${number}/${edition}`
    )

    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch surah data' }, { status: 500 })
  }
}