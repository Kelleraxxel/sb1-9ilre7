import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

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
  font-size: 24px;
  margin-bottom: 20px;
  color: #3a4374;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #f0f4f8;
  color: #3a4374;
  font-weight: bold;
`;

const Td = styled.td`
  padding: 12px;
  background-color: #ffffff;
  border-top: 1px solid #e4e7eb;
  border-bottom: 1px solid #e4e7eb;

  &:first-child {
    border-left: 1px solid #e4e7eb;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  &:last-child {
    border-right: 1px solid #e4e7eb;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
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
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
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

function ChooseRoutineMenu({ onClose, onChooseRoutine, routines }) {
  const handleChooseRoutine = (routine) => {
    onChooseRoutine(routine.supplements);
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleBackgroundClick}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}><FaTimes /></CloseButton>
        <Title>Choose Routine</Title>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {routines.map((routine) => (
              <tr key={routine.id}>
                <Td>{routine.name}</Td>
                <Td>
                  <Button onClick={() => handleChooseRoutine(routine)}>Add</Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ChooseRoutineMenu;