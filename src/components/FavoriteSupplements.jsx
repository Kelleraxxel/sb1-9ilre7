import React from 'react';
import styled from 'styled-components';
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa';

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
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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

function FavoriteSupplements({ onClose, onCreateNew }) {
  const supplements = [
    { name: 'Vitamin C', ingredients: 'Ascorbic Acid', unit: 'mg' },
    { name: 'Fish Oil', ingredients: 'Omega-3 Fatty Acids', unit: 'mg' },
  ];

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>
          Favorite Supplements
          <Button onClick={onCreateNew}>+ Create New</Button>
        </Title>
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
            {supplements.map((supplement, index) => (
              <tr key={index}>
                <Td>{supplement.name}</Td>
                <Td>{supplement.ingredients}</Td>
                <Td>{supplement.unit}</Td>
                <Td>
                  <ActionIcon><FaStar /></ActionIcon>
                  <ActionIcon><FaEdit /></ActionIcon>
                  <ActionIcon><FaTrash /></ActionIcon>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ModalContent>
    </ModalOverlay>
  );
}

export default FavoriteSupplements;