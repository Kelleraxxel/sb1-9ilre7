import React from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
  background-color: #ff7f50;
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

const NutrientBar = styled.div`
  background-color: #e0e0e0;
  height: 10px;
  width: 100px;
  border-radius: 5px;
  overflow: hidden;
`;

const NutrientFill = styled.div`
  background-color: #4caf50;
  height: 100%;
  width: ${props => props.percentage}%;
`;

function FoodItems({ onClose, onEdit }) {
  const foodItems = [
    { 
      name: 'Apple', 
      store: 'Local Market', 
      organic: 'Yes',
      nutrients: {
        calories: 52,
        fat: 0.2,
        protein: 0.3,
        carbohydrates: 14,
        fibre: 2.4,
        vitaminA: 50,
        bVitamins: 30,
        otherVitamins: 20,
        minerals: 40,
        traceMinerals: 10
      }
    },
  ];

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>
          Food Items
          <Button>+ Create New</Button>
        </Title>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Store</Th>
              <Th>Organic</Th>
              <Th>Nutrients</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map((item, index) => (
              <tr key={index}>
                <Td>{item.name}</Td>
                <Td>{item.store}</Td>
                <Td>{item.organic}</Td>
                <Td>
                  {Object.entries(item.nutrients).map(([nutrient, value]) => (
                    <div key={nutrient}>
                      {nutrient}: <NutrientBar><NutrientFill percentage={value} /></NutrientBar>
                    </div>
                  ))}
                </Td>
                <Td>
                  <ActionIcon onClick={onEdit}><FaEdit /></ActionIcon>
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

export default FoodItems;