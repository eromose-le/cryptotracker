import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const FilterComponent = (props) => {
  const { filterDay, filterText, selectedRange, setSelectedRange } = props;
  const isFilterSelected = (filter) => filter === selectedRange;

  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: isFilterSelected(filterDay) ? '#1e1e1e' : 'transparent'
      }}
      onPress={() => setSelectedRange(filterDay)}
    >
      <Text style={{ color: isFilterSelected(filterDay) ? 'white' : 'grey' }}>
        {filterText}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(FilterComponent);
