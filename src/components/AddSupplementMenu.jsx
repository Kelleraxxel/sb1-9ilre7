import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCheck, FaTimes } from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
`;

const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #3a4374;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const Th = styled.th`
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #3a4374;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  color: white;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const AddSelectedButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
  background-color: #3498db;
`;

const HighlightedRow = styled.tr`
  animation: highlight 2s ease-out;
  
  @keyframes highlight {
    0% {
      background-color: rgba(52, 152, 219, 0.2);
    }
    100% {
      background-color: transparent;
    }
  }
`;

function AddSupplementMenu({ onClose, onAddMultipleSupplements, allSupplements = [], dailySupplements = [] }) {
  const [selectedSupplements, setSelectedSupplements] = useState([]);
  const [highlightedIds, setHighlightedIds] = useState(new Set());

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isDuplicate = (supplement) => {
    return dailySupplements.some(ds => ds.id === supplement.id);
  };

  const handleSupplementSelection = (supplement) => {
    if (isDuplicate(supplement)) {
      setHighlightedIds(prev => new Set([...prev, supplement.id]));
      setTimeout(() => {
        setHighlightedIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(supplement.id);
          return newSet;
        });
      }, 2000);
    }
    
    setSelectedSupplements(prev => 
      prev.some(s => s.id === supplement.id)
        ? prev.filter(s => s.id !== supplement.id)
        : [...prev, supplement]
    );
  };

  const handleAddSelectedSupplements = () => {
    // Add all selected supplements, including duplicates
    onAddMultipleSupplements(selectedSupplements);

    // Highlight duplicates for visual feedback
    const duplicates = selectedSupplements.filter(isDuplicate);
    if (duplicates.length > 0) {
      setHighlightedIds(new Set(duplicates.map(d => d.id)));
      setTimeout(() => {
        setHighlightedIds(new Set());
      }, 2000);
    }
  };

  return (
    <ModalOverlay onClick={handleBackgroundClick}>
      <Modal onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}><FaTimes /></CloseButton>
        <Title>Add Existing Supplements</Title>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Ingredients</Th>
              <Th>Unit</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {allSupplements.map((supplement) => {
              const isSelected = selectedSupplements.some(s => s.id === supplement.id);
              const isDuplicateItem = isDuplicate(supplement);
              const isHighlighted = highlightedIds.has(supplement.id);
              const RowComponent = (isDuplicateItem && isHighlighted) ? HighlightedRow : 'tr';

              return (
                <RowComponent key={supplement.id}>
                  <Td>{supplement.name}</Td>
                  <Td>{supplement.ingredients.map(i => i.name).join(', ')}</Td>
                  <Td>{supplement.ingredients[0]?.unit}</Td>
                  <Td>
                    <Button
                      onClick={() => handleSupplementSelection(supplement)}
                      style={{ 
                        backgroundColor: isSelected 
                          ? '#e74c3c' 
                          : '#2ecc71'
                      }}
                    >
                      {isSelected 
                        ? <><FaCheck /> Selected</> 
                        : 'Select'
                      }
                    </Button>
                  </Td>
                </RowComponent>
              );
            })}
          </tbody>
        </Table>
        {selectedSupplements.length > 0 && (
          <AddSelectedButton onClick={handleAddSelectedSupplements}>
            Add Selected Supplements ({selectedSupplements.length})
          </AddSelectedButton>
        )}
      </Modal>
    </ModalOverlay>
  );
}

export default AddSupplementMenu;