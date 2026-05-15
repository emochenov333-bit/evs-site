/** Service gallery folders under src/assets/projects/ */
export const SERVICE_GALLERY_FOLDERS = [
  'general',
  'cctv',
  'fire',
  'access',
  'ventilation',
  'automation',
  'network',
] as const

export type ServiceGalleryFolder = (typeof SERVICE_GALLERY_FOLDERS)[number]

const imageModules = import.meta.glob<string>(
  '../assets/projects/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, query: '?url', import: 'default' },
)

function parseAssetPath(path: string): { folder: string; isNested: boolean } | null {
  const normalized = path.replace(/\\/g, '/')
  const match = normalized.match(/assets\/projects\/(.+)$/)
  if (!match) return null

  const segments = match[1].split('/')
  if (segments.length === 1) {
    return { folder: segments[0].replace(/\.[^.]+$/, ''), isNested: false }
  }
  if (segments.length >= 2) {
    return { folder: segments[0], isNested: true }
  }
  return null
}

function buildImagesMap(): Record<string, string[]> {
  const map: Record<string, string[]> = {}

  for (const [path, url] of Object.entries(imageModules)) {
    const parsed = parseAssetPath(path)
    if (!parsed || !url) continue
    const { folder } = parsed
    if (!map[folder]) map[folder] = []
    map[folder].push(url)
  }

  for (const folder of Object.keys(map)) {
    map[folder].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  }

  return map
}

export const assetImagesMap = buildImagesMap()

export function isServiceGalleryFolder(id: string): id is ServiceGalleryFolder {
  return (SERVICE_GALLERY_FOLDERS as readonly string[]).includes(id)
}

export function getImagesForFolders(folders: string | string[]): string[] {
  const ids = Array.isArray(folders) ? folders : [folders]
  const images = ids.flatMap((id) => assetImagesMap[id] ?? [])
  return [...new Set(images)]
}

export function getProjectImages(projectId: string): string[] {
  if (isServiceGalleryFolder(projectId)) return []
  return assetImagesMap[projectId] ?? []
}

export function getProjectCover(projectId: string): string | undefined {
  return getProjectImages(projectId)[0]
}

export function getServiceGalleryImages(galleryId: string | string[]): string[] {
  return getImagesForFolders(galleryId)
}

export function getServiceGalleryCover(galleryId: string | string[]): string | undefined {
  return getServiceGalleryImages(galleryId)[0]
}
