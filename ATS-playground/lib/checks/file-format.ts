/**
 * File Format & Size Check
 * Evaluates file type and size for ATS compatibility
 */

import type { ATSInput, FileFormatSizeSection } from '../types'
import { scoreToStatus } from '../ats-scorer'
import { getStrings } from '../utils/language'
import { getFAQs } from '../utils/ui-texts'

const PREFERRED_FORMATS = ['pdf', 'docx', 'doc']
const IMAGE_FORMATS = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff']
const MAX_SIZE_KB = 2000 // 2MB

export function checkFileFormat(input: ATSInput): FileFormatSizeSection {
  const strings = getStrings()
  
  const fileType = input.file_type.toLowerCase()
  const fileSizeKb = input.file_size_kb
  
  const fileTypeOk = PREFERRED_FORMATS.includes(fileType)
  const fileSizeOk = fileSizeKb <= MAX_SIZE_KB
  const isImage = IMAGE_FORMATS.includes(fileType)
  
  // Calculate score
  let score = 100
  
  if (!fileTypeOk) {
    if (isImage) {
      score -= 40 // Severe penalty for image formats
    } else {
      score -= 20 // Moderate penalty for other formats
    }
  }
  
  if (!fileSizeOk) {
    score -= 15
  }
  
  // Generate suggestions
  const suggestions: string[] = []
  
  if (isImage) {
    suggestions.push(
      false
        ? `⚠️ Format image détecté (${fileType.toUpperCase()}). Les ATS ne peuvent pas lire les images. Créez un CV au format PDF ou DOCX avec du texte sélectionnable.`
        : `⚠️ Image format detected (${fileType.toUpperCase()}). ATS systems cannot read images. Create a PDF or DOCX resume with selectable text.`
    )
  } else if (!fileTypeOk) {
    suggestions.push(
      false
        ? `Format ${fileType.toUpperCase()} non optimal. Préférez PDF ou DOCX pour une compatibilité maximale.`
        : `${fileType.toUpperCase()} format not optimal. Prefer PDF or DOCX for maximum compatibility.`
    )
  }
  
  if (!fileSizeOk) {
    suggestions.push(
      false
        ? `Taille de fichier trop élevée (${Math.round(fileSizeKb / 1024)}MB). Réduisez à moins de 2MB en compressant les images ou simplifiant le design.`
        : `File size too large (${Math.round(fileSizeKb / 1024)}MB). Reduce to under 2MB by compressing images or simplifying design.`
    )
  }
  
  if (fileTypeOk && fileSizeOk) {
    suggestions.push(
      false
        ? `Format ${fileType.toUpperCase()} et taille (${Math.round(fileSizeKb)}KB) sont parfaits pour les ATS !`
        : `${fileType.toUpperCase()} format and size (${Math.round(fileSizeKb)}KB) are perfect for ATS!`
    )
  }
  
  if (fileType === 'pdf') {
    suggestions.push(
      "Make sure your PDF contains selectable text, not just a scanned image."
    )
  }
  
  const explanation = false
    ? `Les ATS préfèrent les formats PDF ou DOCX avec du texte sélectionnable. Votre fichier est en ${fileType.toUpperCase()} (${Math.round(fileSizeKb)}KB). ${fileTypeOk ? 'Format compatible ✓' : 'Format non optimal ✗'}. ${fileSizeOk ? 'Taille acceptable ✓' : 'Taille trop élevée ✗'}.`
    : `ATS systems prefer PDF or DOCX formats with selectable text. Your file is ${fileType.toUpperCase()} (${Math.round(fileSizeKb)}KB). ${fileTypeOk ? 'Compatible format ✓' : 'Non-optimal format ✗'}. ${fileSizeOk ? 'Acceptable size ✓' : 'Size too large ✗'}.`
  
  return {
    score: Math.max(0, score),
    status: scoreToStatus(score),
    file_type: fileType,
    file_type_ok: fileTypeOk,
    file_size_kb: fileSizeKb,
    file_size_ok: fileSizeOk,
    explanation,
    suggestions,
    faqs: getFAQs('file_format_size', 'en')
  }
}
