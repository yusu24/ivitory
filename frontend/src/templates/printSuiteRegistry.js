import ClassicPrintSuite from './classic/PhysicalPrintSuite';
import BohoTerracottaPrintSuite from './boho-terracotta/PhysicalPrintSuite';
import DewanaklUlemsPrintSuite from './dewanakl-ulems/PhysicalPrintSuite';
import ElegantBrownPrintSuite from './elegant-brown/PhysicalPrintSuite';
import MonochromePrintSuite from './monochrome-lineart/PhysicalPrintSuite';

/**
 * Registry of physical print suites for all supported universal invitation templates.
 */
export const PRINT_SUITE_REGISTRY = {
  // Atelier Line-Art
  'monochrome-lineart': MonochromePrintSuite,
  'minimal-monochrome': MonochromePrintSuite,
  'nor-yusuf-monochrome': MonochromePrintSuite,
  'white-minimal': MonochromePrintSuite,
  'monochrome-sketch': MonochromePrintSuite,

  // Ivory Garden
  classic: ClassicPrintSuite,
  'rustic-earthy-leaves': ClassicPrintSuite,

  // Terra Botanica
  'boho-terracotta': BohoTerracottaPrintSuite,

  // Lumina Glass
  'dewanakl-ulems': DewanaklUlemsPrintSuite,
  'dewanakl-undangan': DewanaklUlemsPrintSuite,
  ulems: DewanaklUlemsPrintSuite,
  'ulems-dewanakl': DewanaklUlemsPrintSuite,

  // Royal Mocha
  'elegant-brown': ElegantBrownPrintSuite,
  'royal-gold-velvet': ElegantBrownPrintSuite,

  // Additional aliases / fallbacks
  'klasik-terang': ClassicPrintSuite,
  'ethereal-garden': ClassicPrintSuite,
  'elegant-mono': MonochromePrintSuite,
  'monochrome-glass': DewanaklUlemsPrintSuite,
};

export function getPrintSuiteForTemplate(templateSlug) {
  if (!templateSlug) return null;
  return PRINT_SUITE_REGISTRY[templateSlug] || null;
}

export function hasPhysicalPrintSuite(templateSlug) {
  return Boolean(getPrintSuiteForTemplate(templateSlug));
}
