import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { Field, Label, Input, Select } from './styles';

const IngredientRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(64, 82, 181, 0.1);
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #E74C3C;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(231, 76, 60, 0.1);
  }
`;

const IngredientFields = ({ ingredients, onIngredientChange, onRemoveIngredient }) => {
  return ingredients.map((ingredient, index) => (
    <IngredientRow key={index}>
      <Field>
        <Label>Ingredient Name</Label>
        <Input
          type="text"
          value={ingredient.name}
          onChange={(e) => onIngredientChange(index, 'name', e.target.value)}
          required
        />
      </Field>
      <Field>
        <Label>Amount</Label>
        <Input
          type="number"
          value={ingredient.amount}
          onChange={(e) => onIngredientChange(index, 'amount', e.target.value)}
          min="0"
          step="0.1"
          required
        />
      </Field>
      <Field>
        <Label>Unit</Label>
        <Select
          value={ingredient.unit}
          onChange={(e) => onIngredientChange(index, 'unit', e.target.value)}
        >
          <option value="mg">mg</option>
          <option value="g">g</option>
          <option value="mcg">mcg</option>
          <option value="IU">IU</option>
        </Select>
      </Field>
      {ingredients.length > 1 && (
        <RemoveButton type="button" onClick={() => onRemoveIngredient(index)}>
          <FaTimes />
        </RemoveButton>
      )}
    </IngredientRow>
  ));
};

export default IngredientFields;