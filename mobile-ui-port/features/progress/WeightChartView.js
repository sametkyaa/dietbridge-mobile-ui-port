// Dependency-free line chart (pure View/Text rendering).
// Bilinçli olarak grafik paketi KULLANILMAZ; entegrasyonda host app'in grafik
// kütüphanesiyle (örn. react-native-svg, victory-native) değiştirilebilir.
// Çizgi, komşu noktalar arasındaki orta noktaya yerleştirilen döndürülmüş
// ince View'larla çizilir; eksen etiketleri Text'tir.
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';

const PAD_L = 34;
const PAD_R = 14;
const PAD_T = 20;
const PAD_B = 8;
const MAX_X_LABELS = 5;

function formatValue(v) {
  return String(v).replace('.', ',');
}

/**
 * WeightChartView — haftalık kilo çizgi grafiği (sıfırdan başlamayan eksen).
 *
 * data: [{ id, dateLabel, value }] — kronolojik (eski → yeni).
 * En az 2 nokta gerekir; aksi halde çağıran taraf empty state göstermelidir
 * (bu bileşen tek noktada düz çizgi çizer, 0 noktada hiçbir şey çizmez).
 *
 * accessibilityLabel: grafik özetini ekran okuyucuya aktarmak için verin.
 */
export function WeightChartView({
  data = [],
  unit = 'kg',
  height = 170,
  lineColor = colors.teal,
  accessibilityLabel,
  style,
}) {
  const [width, setWidth] = useState(0);
  const n = data.length;

  const innerW = Math.max(0, width - PAD_L - PAD_R);
  const innerH = height - PAD_T - PAD_B;

  let content = null;
  if (width > 0 && n > 0) {
    const values = data.map((p) => p.value);
    const vMin = Math.min(...values);
    const vMax = Math.max(...values);
    const pad = Math.max((vMax - vMin) * 0.15, 0.4);
    const lo = vMin - pad;
    const hi = vMax + pad;

    const x = (i) => PAD_L + (n === 1 ? innerW / 2 : (i * innerW) / (n - 1));
    const y = (v) => PAD_T + ((hi - v) / (hi - lo)) * innerH;

    const gridValues = [vMax, (vMax + vMin) / 2, vMin];

    const segments = [];
    for (let i = 0; i < n - 1; i += 1) {
      const x1 = x(i);
      const y1 = y(data[i].value);
      const x2 = x(i + 1);
      const y2 = y(data[i + 1].value);
      const len = Math.hypot(x2 - x1, y2 - y1);
      const angle = Math.atan2(y2 - y1, x2 - x1);
      segments.push(
        <View
          key={`seg-${data[i].id}`}
          style={[
            styles.segment,
            {
              left: (x1 + x2) / 2 - len / 2,
              top: (y1 + y2) / 2 - 1.25,
              width: len,
              backgroundColor: lineColor,
              transform: [{ rotate: `${angle}rad` }],
            },
          ]}
        />,
      );
    }

    const last = data[n - 1];
    const labelStep = Math.max(1, Math.ceil(n / MAX_X_LABELS));

    content = (
      <>
        {gridValues.map((g) => (
          <React.Fragment key={`grid-${g}`}>
            <View style={[styles.gridLine, { top: y(g) }]} />
            <Text style={[styles.gridLabel, { top: y(g) - 7 }]}>{formatValue(g.toFixed(1))}</Text>
          </React.Fragment>
        ))}
        {segments}
        {data.map((p, i) => {
          const isLast = i === n - 1;
          const size = isLast ? 11 : 9;
          return (
            <View
              key={`pt-${p.id}`}
              style={[
                styles.point,
                {
                  left: x(i) - size / 2,
                  top: y(p.value) - size / 2,
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  borderColor: lineColor,
                  backgroundColor: isLast ? lineColor : colors.white,
                },
              ]}
            />
          );
        })}
        {n > 1 ? (
          <Text
            style={[
              styles.lastValue,
              {
                left: Math.max(PAD_L, x(n - 1) - 44),
                top: Math.max(0, y(last.value) - 24),
              },
            ]}
          >
            {formatValue(last.value)}
          </Text>
        ) : null}
        <View style={[styles.xLabels, { left: PAD_L, width: innerW, top: height - PAD_B + 2 }]}>
          {data.map((p, i) => {
            const visible = i === 0 || i === n - 1 || i % labelStep === 0;
            return (
              <Text key={`xl-${p.id}`} style={[styles.xLabel, !visible && styles.xLabelHidden]}>
                {p.dateLabel}
              </Text>
            );
          })}
        </View>
      </>
    );
  }

  return (
    <View
      style={[styles.root, { height: height + 18 }, style]}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel || `Kilo grafiği, ${n} ölçüm, birim ${unit}`}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: '100%' },
  gridLine: {
    position: 'absolute',
    left: PAD_L,
    right: PAD_R,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.borderSoft,
  },
  gridLabel: {
    position: 'absolute',
    left: 0,
    width: PAD_L - 6,
    textAlign: 'right',
    ...typography.caption,
    fontSize: 9.5,
    fontWeight: '400',
    color: colors.textTertiary,
  },
  segment: { position: 'absolute', height: 2.5, borderRadius: 2 },
  point: { position: 'absolute', borderWidth: 2.5 },
  lastValue: {
    position: 'absolute',
    width: 44,
    textAlign: 'right',
    ...typography.caption,
    fontSize: 11,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  xLabels: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xLabel: {
    ...typography.caption,
    fontSize: 9.5,
    fontWeight: '400',
    color: colors.textTertiary,
  },
  xLabelHidden: { opacity: 0 },
});

export default WeightChartView;
