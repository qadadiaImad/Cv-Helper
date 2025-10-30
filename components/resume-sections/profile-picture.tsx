import type { PhotoConfig } from "@/lib/schemas"
import { cn } from "@/lib/utils"

interface ProfilePictureProps {
  photo?: PhotoConfig
  alt: string
  className?: string
}

/**
 * ProfilePicture Component
 * Renders a profile photo with configurable size, border radius, and effects
 * Inspired by Reactive-Resume's Picture component
 */
export function ProfilePicture({ photo, alt, className }: ProfilePictureProps) {
  // Don't render if no photo URL or if hidden
  if (!photo?.url || photo.effects?.hidden) {
    return null
  }

  const size = photo.size || 120
  const aspectRatio = photo.aspectRatio || 1
  const borderRadius = photo.borderRadius ?? 50 // Default to circle (50%)

  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{
        width: size,
        height: size / aspectRatio,
        borderRadius: `${borderRadius}%`,
      }}
    >
      <img
        src={photo.url}
        alt={alt}
        className={cn(
          "w-full h-full object-cover",
          photo.effects?.grayscale && "grayscale",
          photo.effects?.border && "border-4 border-white"
        )}
      />
    </div>
  )
}
