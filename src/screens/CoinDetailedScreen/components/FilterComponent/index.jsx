import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const FilterComponent = (props) => {
  const { reduxTheme } = useSelector((state) => state.themeReducer);
  const { filterDay, filterText, selectedRange, setSelectedRange } = props;
  const isFilterSelected = (filter) => filter === selectedRange;

  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: isFilterSelected(filterDay)
          ? reduxTheme.inputBackground
          : 'transparent'
      }}
      onPress={() => setSelectedRange(filterDay)}
    >
      <Text
        style={{
          color: isFilterSelected(filterDay)
            ? reduxTheme.primary
            : reduxTheme.tertiary
        }}
      >
        {filterText}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(FilterComponent);
