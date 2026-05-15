import type { Project } from '../../data/projects'
import { MediaGalleryModal } from './MediaGalleryModal'

interface ProjectGalleryModalProps {
  project: Project | null
  images: string[]
  index: number
  onClose: () => void
  onIndexChange: (index: number) => void
}

export function ProjectGalleryModal({
  project,
  images,
  index,
  onClose,
}: ProjectGalleryModalProps) {
  return (
    <MediaGalleryModal
      open={Boolean(project && images.length > 0)}
      title={project?.name ?? ''}
      subtitle={project?.category}
      images={images}
      initialIndex={index}
      onClose={onClose}
    />
  )
}
