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

const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  position: relative;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #3a4374;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
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

const SupplementModal = ({ onClose, onChooseExisting, onChooseFromRoutine, onCreateNew }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleBackgroundClick}>
      <Modal onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}><FaTimes /></CloseButton>
        <Title>Add Supplement</Title>
        <Button style={{ backgroundColor: '#4a90e2', color: 'white' }} onClick={onChooseExisting}>
          Choose Existing
        </Button>
        <Button style={{ backgroundColor: '#9b59b6', color: 'white' }} onClick={onChooseFromRoutine}>
          Choose from Routine
        </Button>
        <Button style={{ backgroundColor: '#2ecc71', color: 'white' }} onClick={onCreateNew}>
          Create New
        </Button>
      </Modal>
    </ModalOverlay>
  );
};

export default SupplementModal;