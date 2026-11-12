import ClassicTemplate from './classic';
import ElegantMonoTemplate from './elegant-mono';
import ExampleTemplate from './example';
import Example2Template from './example2';
import Example3Template from './example3';
import KlasikTerangTemplate from './klasik-terang';
import BohoTerracottaTemplate from './boho-terracotta';
import ElegantBrownTemplate from './elegant-brown';
import MonochromeLineartTemplate from './monochrome-lineart';
import DewanaklUlemsTemplate from './dewanakl-ulems';
import Floral3DTemplate from './floral-3d';

export const TEMPLATE_REGISTRY = {
  'floral-3d': Floral3DTemplate,
  'rose-jardin-3d': Floral3DTemplate,
  'dewanakl-undangan': DewanaklUlemsTemplate,
  'dewanakl-ulems': DewanaklUlemsTemplate,
  ulems: DewanaklUlemsTemplate,
  'ulems-dewanakl': DewanaklUlemsTemplate,
  'monochrome-lineart': MonochromeLineartTemplate,
  'minimal-monochrome': MonochromeLineartTemplate,
  'nor-yusuf-monochrome': MonochromeLineartTemplate,
  'white-minimal': MonochromeLineartTemplate,
  'monochrome-sketch': MonochromeLineartTemplate,
  'elegant-brown': ElegantBrownTemplate,
  classic: ClassicTemplate,
  'elegant-mono': ElegantMonoTemplate,
  example: ExampleTemplate,
  example2: Example2Template,
  example3: Example3Template,
  'klasik-terang': KlasikTerangTemplate,
  'boho-terracotta': BohoTerracottaTemplate,

  // Legacy aliases fallback safely to universal templates
  'jawa-elegan': ElegantBrownTemplate,
  'ethereal-garden': KlasikTerangTemplate,
  'royal-gold-velvet': ElegantBrownTemplate,
  'rustic-earthy-leaves': ClassicTemplate,
  'monochrome-glass': ElegantMonoTemplate,
};

export const DEFAULT_TEMPLATE_KEY = 'monochrome-lineart';
