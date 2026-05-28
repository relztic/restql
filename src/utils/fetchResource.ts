const responses = new Map<string, Promise<Response>>()

export default async function fetchResource(
  resource: string,
  options: RequestInit,
): Promise<Response> {
  const key = `${resource}-${JSON.stringify(options)}`

  if (!responses.has(key)) {
    const response = fetch(resource, options)
      .then((nextResponse: Response) => {
        if (!nextResponse.ok) {
          responses.delete(key)
        }

        return nextResponse
      })
      .catch((error: Error) => {
        responses.delete(key)

        throw error
      })

    responses.set(key, response)
  }

  return responses.get(key) as Promise<Response>
}
