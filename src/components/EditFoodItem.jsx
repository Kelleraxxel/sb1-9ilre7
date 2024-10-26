import React, { useState } from 'react';
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

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  color: white;
  background-color: #ff7f50;
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

function EditFoodItem({ onClose }) {
  const [name, setName] = useState('Apple');
  const [store, setStore] = useState('Local Market');
  const [isOrganic, setIsOrganic] = useState(true);
  const [amount, setAmount] = useState(100);
  const [unit, setUnit] = useState('g');
  const [calories, setCalories] = useState(52);
  const [fat, setFat] = useState(0.2);
  const [protein, setProtein] = useState(0.3);
  const [carbohydrates, setCarbohydrates] = useState(14);
  const [fibre, setFibre] = useState(2.4);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Edit Food Item</Title>
        <Form onSubmit={handleSubmit}>
          <Label>Name</Label>
          <Select value={name} onChange={(e) => setName(e.target.value)}>
            <option>Apple</option>
          </Select>

          <Label>Store</Label>
          <Select value={store} onChange={(e) => setStore(e.target.value)}>
            <option>Local Market</option>
          </Select>

          <Label>
            <Input
              type="checkbox"
              checked={isOrganic}
              onChange={(e) => setIsOrganic(e.target.checked)}
            />
            Organic
          </Label>

          <Label>Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <Label>Unit</Label>
          <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option>g</option>
          </Select>

          <Label>Nutrients</Label>
          <Label>Calories</Label>
          <Input
            type="number"
            value={calories}
            onChange={(e) => setCalories(Number(e.target.value))}
          />

          <Label>Fat (g)</Label>
          <Input
            type="number"
            value={fat}
            step="0.1"
            onChange={(e) => setFat(Number(e.target.value))}
          />

          <Label>Protein (g)</Label>
          <Input
            type="number"
            value={protein}
            step="0.1"
            onChange={(e) => setProtein(Number(e.target.value))}
          />

          <Label>Carbohydrates (g)</Label>
          <Input
            type="number"
            value={carbohydrates}
            onChange={(e) => setCarbohydrates(Number(e.target.value))}
          />

          <Label>Fibre (g)</Label>
          <Input
            type="number"
            value={fibre}
            step="0.1"
            onChange={(e) => setFibre(Number(e.target.value))}
          />

          <Button type="submit">Save Changes</Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default EditFoodItem;