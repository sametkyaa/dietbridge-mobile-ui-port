// PLACEHOLDER — replace with the host app's icon library (e.g. @expo/vector-icons or lucide-react-native) during integration.
import React from 'react';
import { Text } from 'react-native';
import { colors } from '../theme';

const GLYPHS = {
  back: '←',
  forward: '→',
  up: '↑',
  down: '↓',
  check: '✓',
  checkDouble: '✓✓',
  close: '✕',
  plus: '+',
  minus: '−',
  clock: '◷',
  hourglass: '◌',
  alert: '!',
  info: 'i',
  home: '⌂',
  search: '⌕',
  chevronDown: '⌄',
  chevronUp: '⌃',
  send: '➤',
  calendar: '▦',
  message: '✉',
  person: '◯',
  dot: '•',
  edit: '✎',
  camera: '◉',
  image: '▣',
  settings: '⚙',
  bell: '🔔',
  undo: '↩',
  wifiOff: '⊘',
  droplet: '💧',
  footprints: '👣',
  drumstick: '🍗',
  wheat: '🌾',
  chevronRight: '›',
  target: '🎯',
  leaf: '🌿',
  heartPulse: '♥',
  shield: '🛡',
  logout: '↪',
  key: '🔑',
  devices: '📱',
  download: '⬇',
  trash: '🗑',
};

/**
 * Placeholder icon component. Renders a unicode glyph as Text.
 * Decorative usage: pass accessible={false} (default) so screen readers skip it.
 */
export function Icon({ name, size = 20, color = colors.textPrimary, style, accessible = false }) {
  const glyph = GLYPHS[name] || '□';
  return (
    <Text
      accessible={accessible}
      importantForAccessibility={accessible ? 'yes' : 'no'}
      style={[
        {
          fontSize: size,
          lineHeight: size * 1.2,
          color,
          includeFontPadding: false,
          textAlign: 'center',
        },
        style,
      ]}
    >
      {glyph}
    </Text>
  );
}

export default Icon;
