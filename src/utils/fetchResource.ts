const responses: Record<string, Promise<Response> | Response> = {}

export default async function fetchResource(
  resource: string,
  options: RequestInit,
): Promise<Response> {
  const key = `${resource}-${JSON.stringify(options)}`

  if (!(key in responses)) {
    responses[key] = fetch(resource, options).then((response) => {
      responses[key] = response

      return response
    })
  }

  return responses[key]
}
