export default function isResource(resource: string): boolean {
  return Boolean(URL.parse(resource))
}
