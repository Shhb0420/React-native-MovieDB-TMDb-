import React from 'react';
import {Text} from 'react-native';

import {colors, sizes} from '../../utils';

function CustomText({style, children, color, size, align, ...otherProps}) {
  const colorStyle = {
    color: color && color.includes('#') ? color : colors[color || 'black'],
  };
  const fontSizeStyle = {
    fontSize: Number.isInteger(size) ? size : sizes[size || 's'],
  };
  const textAlignment = {textAlign: align || 'left'};

  return (
    <Text
      style={[colorStyle, fontSizeStyle, textAlignment, style]}
      {...otherProps}>
      {children}
    </Text>
  );
}

export default CustomText;
