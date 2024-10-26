import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';

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
`;

const ModalContent = styled.div`
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
  font-size: 18px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RoutineItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
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
  margin-left: 8px;
  color: #ff0000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

function SupplementRoutines({ onClose, onCreateNew }) {
  const [routines, setRoutines] = useState([
    { name: 'Morning Routine', isCurrent: true },
    { name: 'Evening Routine', isCurrent: false },
  ]);

  const handleCheckboxChange = (index) => {
    const updatedRoutines = routines.map((routine, i) => ({
      ...routine,
      isCurrent: i === index,
    }));
    setRoutines(updatedRoutines);
  };

  const handleDeleteRoutine = (index) => {
    const updatedRoutines = routines.filter((_, i) => i !== index);
    setRoutines(updatedRoutines);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>
          Supplement Routines
          <Button onClick={onCreateNew}>+ Create New</Button>
        </Title>
        {routines.map((routine, index) => (
          <RoutineItem key={index}>
            <div>
              <Checkbox
                type="checkbox"
                checked={routine.isCurrent}
                onChange={() => handleCheckboxChange(index)}
              />
              {routine.name}
            </div>
            <div>
              <span>{routine.isCurrent ? 'Current Routine' : ''}</span>
              <ActionIcon onClick={() => handleDeleteRoutine(index)}><FaTrash /></ActionIcon>
            </div>
          </RoutineItem>
        ))}
      </ModalContent>
    </ModalOverlay>
  );
}

export default SupplementRoutines;