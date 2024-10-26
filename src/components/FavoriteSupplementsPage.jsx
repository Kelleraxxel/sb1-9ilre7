import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar, FaEdit, FaTrash, FaGripVertical } from 'react-icons/fa';

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  overflow: hidden;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #4a90e2;
  color: white;
  
  &:first-child {
    width: 40px;
    padding: 12px 8px;
  }
`;

const Tr = styled.tr`
  background-color: ${props => props.isDragging ? 'rgba(74, 144, 226, 0.1)' : 'transparent'};
  transition: background-color 0.2s ease;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  background-color: ${props => props.isDragging ? 'rgba(74, 144, 226, 0.1)' : 'transparent'};

  &:first-child {
    padding: 12px 8px;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  color: white;
  background-color: #4a90e2;
`;

const ActionIcon = styled.span`
  cursor: pointer;
  margin-left: 12px;
  font-size: 18px;
`;

const DragHandle = styled(FaGripVertical)`
  cursor: grab;
  color: #999;
  
  &:hover {
    color: #666;
  }
`;

const SupplementName = styled.span`
  cursor: pointer;
  color: #4052B5;
  
  &:hover {
    text-decoration: underline;
  }
`;

function FavoriteSupplementsPage({ onCreateNew, supplements, onToggleFavorite, onEdit, onDelete, onReorder }) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  const handleDragStart = (e, supplement) => {
    setDraggedItem(supplement);
    e.dataTransfer.effectAllowed = 'move';
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    setDraggedItem(null);
    setDraggedOverItem(null);
    e.target.style.opacity = '1';
  };

  const handleDragOver = (e, supplement) => {
    e.preventDefault();
    if (draggedItem === supplement) return;
    setDraggedOverItem(supplement);
  };

  const handleDrop = (e, targetSupplement) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetSupplement) return;

    const reorderedSupplements = [...supplements];
    const draggedIndex = supplements.findIndex(s => s.id === draggedItem.id);
    const targetIndex = supplements.findIndex(s => s.id === targetSupplement.id);

    reorderedSupplements.splice(draggedIndex, 1);
    reorderedSupplements.splice(targetIndex, 0, draggedItem);

    onReorder(reorderedSupplements);
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  return (
    <>
      <Title>
        Favorite Supplements
        <Button onClick={onCreateNew}>+ Create New</Button>
      </Title>
      <Table>
        <thead>
          <tr>
            <Th></Th>
            <Th>Name</Th>
            <Th>Ingredients</Th>
            <Th>Unit</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {supplements.map((supplement) => (
            <Tr
              key={supplement.id}
              draggable
              onDragStart={(e) => handleDragStart(e, supplement)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, supplement)}
              onDrop={(e) => handleDrop(e, supplement)}
              isDragging={draggedItem === supplement}
            >
              <Td isDragging={draggedItem === supplement}>
                <DragHandle />
              </Td>
              <Td isDragging={draggedItem === supplement}>
                <SupplementName onClick={() => onEdit(supplement)}>
                  {supplement.name}
                </SupplementName>
              </Td>
              <Td isDragging={draggedItem === supplement}>
                {supplement.ingredients.map(i => i.name).join(', ')}
              </Td>
              <Td isDragging={draggedItem === supplement}>
                {supplement.ingredients[0]?.unit}
              </Td>
              <Td isDragging={draggedItem === supplement}>
                <ActionIcon onClick={() => onToggleFavorite(supplement.id)}>
                  <FaStar style={{ color: '#f1c40f' }} />
                </ActionIcon>
                <ActionIcon onClick={() => onEdit(supplement)}>
                  <FaEdit style={{ color: '#3498db' }} />
                </ActionIcon>
                <ActionIcon onClick={() => onDelete(supplement.id)}>
                  <FaTrash style={{ color: '#e74c3c' }} />
                </ActionIcon>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default FavoriteSupplementsPage;