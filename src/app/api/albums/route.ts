export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Missing query parameter',
      }),
      { status: 400 },
    )
  }

  const imgurUrl = `https://api.imgur.com/3/gallery/search/top?q_all=${encodeURIComponent(
    query,
  )}&q_type=album`

  const response = await fetch(imgurUrl, {
    method: 'GET',
    headers: {
      Authorization: 'Client-ID 2d086962f60c89e',
    },
  })
  const json = await response.json()
  return new Response(
    JSON.stringify({
      // filter albums with no images
      data: json.data.filter(
        (album: { images_count: number }) => album.images_count > 0,
      ),
    }),
    { status: 200 },
  )
}
