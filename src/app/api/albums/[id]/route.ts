export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const imgurUrl = `https://api.imgur.com/3/album/${id}`

  const response = await fetch(imgurUrl, {
    method: 'GET',
    headers: {
      Authorization: 'Client-ID 2d086962f60c89e',
    },
  })
  const json = await response.json()
  return new Response(JSON.stringify(json), { status: 200 })
}
