import React from 'react';
import styled from 'styled-components';

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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  color: white;
  background-color: #4a90e2;
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

function CreateNewRoutine({ onClose }) {
  const supplements = [
    { name: 'Vitamin C', ingredients: 'Ascorbic Acid', unit: 'mg' },
    { name: 'Magnesium Complex', ingredients: 'Magnesium Citrate, Magnesium Glycinate', unit: 'mg' },
    { name: 'Fish Oil', ingredients: 'Omega-3 Fatty Acids', unit: 'mg' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Create New Routine</Title>
        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Routine Name" required />
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
                    <Button type="button">Select</Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button type="submit">Create Routine</Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default CreateNewRoutine;