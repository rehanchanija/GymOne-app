import React from 'react';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {colors} from '@/theme';

type Props = {data: {x: string | number; y: number}[]};

export default function ChartLine({data}: Props) {
  const width = Dimensions.get('window').width - 32;
  const labels = data.map(d => String(d.x));
  const series = data.map(d => d.y);
  return (
    <LineChart
      data={{labels, datasets: [{data: series}]}}
      width={width}
      height={220}
      chartConfig={{
        backgroundGradientFrom: colors.card,
        backgroundGradientTo: colors.card,
        color: () => colors.accentGreen,
        labelColor: () => colors.muted,
        propsForDots: {r: '3', strokeWidth: '1', stroke: colors.accentGreen},
      }}
      bezier
      style={{borderRadius: 12}}
    />
  );
}
