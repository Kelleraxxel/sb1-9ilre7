import React from 'react';
import styled from 'styled-components';

const SymptomsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
`;

const SymptomsList = styled.div`
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

const SymptomItem = styled.div`
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

const SymptomSection = styled.div`
  flex: 1;
`;

const SymptomTitle = styled.div`
  font-size: 14px;
  color: #4052B5;
  margin-bottom: 8px;
`;

export const symptomOptions = [
  'Headache',
  'Fatigue',
  'Nausea',
  'Dizziness',
  'Joint Pain',
  'Muscle Pain',
  'Anxiety',
  'Depression',
  'Insomnia',
  'Digestive Issues',
  'Bloating',
  'Brain Fog',
  'Low Energy',
  'Mood Swings',
  'Skin Issues'
];

const SymptomSelector = ({ availableSymptoms, selectedSymptoms, onUpdateSymptoms, visible, title }) => {
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
      onUpdateSymptoms(
        availableSymptoms.filter(s => s !== item),
        [...selectedSymptoms, item]
      );
    } else {
      onUpdateSymptoms(
        [...availableSymptoms, item],
        selectedSymptoms.filter(s => s !== item)
      );
    }
  };

  if (!visible) return null;

  return (
    <SymptomsContainer>
      <SymptomSection>
        <SymptomTitle>Available {title}</SymptomTitle>
        <SymptomsList
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'available')}
        >
          {availableSymptoms.map((symptom) => (
            <SymptomItem
              key={symptom}
              draggable
              onDragStart={(e) => handleDragStart(e, symptom, 'available')}
              onDragEnd={handleDragEnd}
            >
              {symptom}
            </SymptomItem>
          ))}
        </SymptomsList>
      </SymptomSection>
      
      <SymptomSection>
        <SymptomTitle>Selected {title}</SymptomTitle>
        <SymptomsList
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'selected')}
        >
          {selectedSymptoms.map((symptom) => (
            <SymptomItem
              key={symptom}
              draggable
              onDragStart={(e) => handleDragStart(e, symptom, 'selected')}
              onDragEnd={handleDragEnd}
            >
              {symptom}
            </SymptomItem>
          ))}
        </SymptomsList>
      </SymptomSection>
    </SymptomsContainer>
  );
};

export default SymptomSelector;