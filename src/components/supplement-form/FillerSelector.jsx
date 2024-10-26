import React from 'react';
import styled from 'styled-components';

const FillerContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
`;

const FillerList = styled.div`
  flex: 1;
  border: 2px solid rgba(64, 82, 181, 0.2);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 8px;
  min-height: 120px;
  max-height: 200px;
  overflow-y: auto;

  &.drag-over {
    border-color: #4052B5;
    background-color: rgba(64, 82, 181, 0.05);
  }
`;

const FillerItem = styled.div`
  padding: 8px;
  margin: 4px 0;
  background-color: white;
  border: 1px solid rgba(64, 82, 181, 0.1);
  border-radius: 4px;
  cursor: move;
  user-select: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(64, 82, 181, 0.05);
  }

  &.dragging {
    opacity: 0.5;
  }
`;

const FillerSection = styled.div`
  flex: 1;
`;

const FillerTitle = styled.div`
  font-size: 14px;
  color: #4052B5;
  margin-bottom: 8px;
`;

export const fillerOptions = [
  'Silica',
  'Magnesium Stearate',
  'Titanium Dioxide',
  'Microcrystalline Cellulose',
  'Stearic Acid',
  'Calcium Carbonate',
  'Croscarmellose Sodium',
  'Gelatin',
  'Hydroxypropyl Methylcellulose'
];

const FillerSelector = ({ availableFillers, selectedFillers, onUpdateFillers, visible }) => {
  const [draggedItem, setDraggedItem] = React.useState(null);

  const handleDragStart = (e, item, source) => {
    setDraggedItem({ item, source });
    e.target.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    const list = e.currentTarget;
    list.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e, targetList) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    if (!draggedItem) return;
    
    const { item, source } = draggedItem;
    
    if (source === targetList) return;
    
    if (targetList === 'selected') {
      onUpdateFillers(
        availableFillers.filter(f => f !== item),
        [...selectedFillers, item]
      );
    } else {
      onUpdateFillers(
        [...availableFillers, item],
        selectedFillers.filter(f => f !== item)
      );
    }
  };

  if (!visible) return null;

  return (
    <FillerContainer>
      <FillerSection>
        <FillerTitle>Available Fillers</FillerTitle>
        <FillerList
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'available')}
        >
          {availableFillers.map((filler) => (
            <FillerItem
              key={filler}
              draggable
              onDragStart={(e) => handleDragStart(e, filler, 'available')}
              onDragEnd={handleDragEnd}
            >
              {filler}
            </FillerItem>
          ))}
        </FillerList>
      </FillerSection>
      
      <FillerSection>
        <FillerTitle>Selected Fillers</FillerTitle>
        <FillerList
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'selected')}
        >
          {selectedFillers.map((filler) => (
            <FillerItem
              key={filler}
              draggable
              onDragStart={(e) => handleDragStart(e, filler, 'selected')}
              onDragEnd={handleDragEnd}
            >
              {filler}
            </FillerItem>
          ))}
        </FillerList>
      </FillerSection>
    </FillerContainer>
  );
};

export default FillerSelector;