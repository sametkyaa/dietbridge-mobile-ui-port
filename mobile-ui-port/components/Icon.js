import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme';

/**
 * Semantic icon adapter — DietBridge UI'sının kullandığı soyut ikon adlarını
 * @expo/vector-icons (MaterialCommunityIcons) glyph adlarına eşler.
 *
 * Host uygulama entegrasyonunda farklı bir ikon seti kullanılacaksa yalnızca
 * bu dosya değiştirilir; feature bileşenlerindeki `name` değerleri aynı kalır.
 */
const ICON_MAP = {
  back: 'arrow-left',
  forward: 'arrow-right',
  up: 'arrow-up',
  down: 'arrow-down',
  check: 'check',
  checkDouble: 'check-all',
  close: 'close',
  plus: 'plus',
  minus: 'minus',
  clock: 'clock-outline',
  hourglass: 'timer-sand',
  alert: 'alert-circle-outline',
  info: 'information-outline',
  home: 'home-outline',
  search: 'magnify',
  chevronDown: 'chevron-down',
  chevronUp: 'chevron-up',
  chevronRight: 'chevron-right',
  send: 'send',
  calendar: 'calendar-outline',
  message: 'message-text-outline',
  person: 'account-outline',
  dot: 'circle-small',
  edit: 'pencil-outline',
  camera: 'camera-outline',
  image: 'image-outline',
  settings: 'cog-outline',
  bell: 'bell-outline',
  undo: 'undo',
  wifiOff: 'wifi-off',
  droplet: 'water-outline',
  footprints: 'shoe-print',
  drumstick: 'food-drumstick-outline',
  wheat: 'barley',
  target: 'target',
  leaf: 'leaf',
  meal: 'silverware-fork-knife',
  sprout: 'sprout',
  heartPulse: 'heart-pulse',
  shield: 'shield-outline',
  logout: 'logout',
  key: 'key-outline',
  devices: 'devices',
  download: 'download-outline',
  trash: 'delete-outline',
};

const FALLBACK_ICON = 'help-circle-outline';

/**
 * Icon — merkezi semantic ikon bileşeni.
 * Dekoratif kullanım: accessible={false} (varsayılan) bırakılır; ekran okuyucu
 * ikonu atlar. Anlamlı kullanımda accessible={true} ve erişilebilirlik etiketi
 * taşıyan bir üst bileşenle kullanılmalıdır.
 */
export function Icon({ name, size = 20, color = colors.textPrimary, style, accessible = false }) {
  const glyph = ICON_MAP[name] || FALLBACK_ICON;
  return (
    <MaterialCommunityIcons
      name={glyph}
      size={size}
      color={color}
      style={style}
      accessible={accessible}
      importantForAccessibility={accessible ? 'yes' : 'no'}
    />
  );
}

export default Icon;
