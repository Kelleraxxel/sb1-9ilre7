import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes, FaCapsules, FaVial, FaWind } from 'react-icons/fa';
import SupplementModal from './SupplementModal';
import CreateNewSupplement from './CreateNewSupplement';
import AddSupplementMenu from './AddSupplementMenu';
import ChooseRoutineMenu from './ChooseRoutineMenu';

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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 100%);
  padding: 20px;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #4052B5;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 500;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.5rem;
  color: #4052B5;
  font-weight: 500;
  border-bottom: 2px solid rgba(64, 82, 181, 0.2);
`;

const Td = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid rgba(64, 82, 181, 0.1);
  vertical-align: top;
`;

const ServingSizeInput = styled.input`
  width: 50px;
  padding: 4px;
  border: 1px solid rgba(64, 82, 181, 0.2);
  border-radius: 4px;
  text-align: center;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #4052B5;
  }
`;

const SupplementLink = styled.a`
  color: #4052B5;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const FormIcon = styled.span`
  color: #4052B5;
  margin-left: 0.5rem;
  font-size: 0.9rem;
`;

const IngredientsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;
`;

const IngredientTag = styled.div`
  background: rgba(64, 82, 181, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  color: #4052B5;
  cursor: pointer;
`;

const MoreIngredientsIndicator = styled.div`
  color: #4052B5;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const IngredientsPopover = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #4052B5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(64, 82, 181, 0.1);
  }
`;

const AddButton = styled.button`
  display: block;
  margin: 1rem auto 0;
  padding: 0.5rem 1rem;
  background: #4052B5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3544a5;
  }
`;

const formatNumber = (num) => {
  return Number.isInteger(num) ? num.toString() : num.toFixed(1);
};

function getFormIcon(form) {
  switch (form) {
    case 'capsule':
      return <FaCapsules />;
    case 'liquid':
      return <FaVial />;
    case 'powder':
      return <FaWind />;
    default:
      return null;
  }
}

function SupplementsTakenToday({ onClose, dailySupplements, onUpdateDailySupplements, allSupplements, routines, onCreateSupplement }) {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [showChooseExisting, setShowChooseExisting] = useState(false);
  const [showChooseRoutine, setShowChooseRoutine] = useState(false);
  const [selectedSupplement, setSelectedSupplement] = useState(null);
  const [showIngredientsFor, setShowIngredientsFor] = useState(null);
  const [highlightedIds, setHighlightedIds] = useState(new Set());

  const handleServingSizeChange = (uniqueId, newServingSize) => {
    const updatedSupplements = dailySupplements.map(supplement =>
      supplement.uniqueId === uniqueId ? { ...supplement, servingSize: newServingSize === '' ? '' : Number(newServingSize) } : supplement
    );
    onUpdateDailySupplements(updatedSupplements);
  };

  const handleSupplementClick = (supplement) => {
    setSelectedSupplement(supplement);
  };

  const handleRemoveSupplement = (uniqueId) => {
    const updatedSupplements = dailySupplements.filter(supplement => supplement.uniqueId !== uniqueId);
    onUpdateDailySupplements(updatedSupplements);
  };

  const handleIngredientClick = (uniqueId) => {
    setShowIngredientsFor(showIngredientsFor === uniqueId ? null : uniqueId);
  };

  const handleAddSupplement = (supplement) => {
    const existingSupplementIndex = dailySupplements.findIndex(s => s.id === supplement.id);
    
    if (existingSupplementIndex >= 0) {
      setHighlightedIds(new Set([supplement.id]));
      setTimeout(() => setHighlightedIds(new Set()), 2000);
      return;
    }

    const newDailySupplement = {
      ...supplement,
      uniqueId: Date.now() + Math.random(),
      servingSize: 1
    };
    onUpdateDailySupplements([...dailySupplements, newDailySupplement]);
  };

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}><FaTimes /></CloseButton>
        <Title>Supplements Taken Today</Title>
        <Table>
          <thead>
            <tr>
              <Th style={{ width: '80px' }}>Serving</Th>
              <Th>Supplement</Th>
              <Th>Ingredients</Th>
              <Th style={{ width: '40px' }}></Th>
            </tr>
          </thead>
          <tbody>
            {dailySupplements.map((supplement) => (
              <tr key={supplement.uniqueId}>
                <Td>
                  <ServingSizeInput
                    type="number"
                    value={supplement.servingSize || ''}
                    onChange={(e) => handleServingSizeChange(supplement.uniqueId, e.target.value)}
                    min="0"
                    step="0.5"
                  />
                </Td>
                <Td>
                  <SupplementLink onClick={() => handleSupplementClick(supplement)}>
                    {supplement.name}
                    <FormIcon>{getFormIcon(supplement.form)}</FormIcon>
                  </SupplementLink>
                </Td>
                <Td>
                  <IngredientsList>
                    {supplement.ingredients.slice(0, 2).map((ingredient, idx) => (
                      <IngredientTag 
                        key={idx}
                        onClick={() => handleIngredientClick(supplement.uniqueId)}
                      >
                        {ingredient.name}: {formatNumber(ingredient.amount * (supplement.servingSize || 0))}{ingredient.unit}
                      </IngredientTag>
                    ))}
                    {supplement.ingredients.length > 2 && (
                      <>
                        <MoreIngredientsIndicator onClick={() => handleIngredientClick(supplement.uniqueId)}>
                          +{supplement.ingredients.length - 2} more
                        </MoreIngredientsIndicator>
                        {showIngredientsFor === supplement.uniqueId && (
                          <IngredientsPopover onClick={e => e.stopPropagation()}>
                            {supplement.ingredients.map((ingredient, idx) => (
                              <IngredientTag key={idx}>
                                {ingredient.name}: {formatNumber(ingredient.amount * (supplement.servingSize || 0))}{ingredient.unit}
                              </IngredientTag>
                            ))}
                          </IngredientsPopover>
                        )}
                      </>
                    )}
                  </IngredientsList>
                </Td>
                <Td>
                  <RemoveButton onClick={() => handleRemoveSupplement(supplement.uniqueId)}>
                    <FaTimes />
                  </RemoveButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <AddButton onClick={() => setShowAddMenu(true)}>+ Add Supplement</AddButton>
      </ModalContent>

      {showAddMenu && (
        <SupplementModal
          onClose={() => setShowAddMenu(false)}
          onChooseExisting={() => {
            setShowChooseExisting(true);
            setShowAddMenu(false);
          }}
          onChooseFromRoutine={() => {
            setShowChooseRoutine(true);
            setShowAddMenu(false);
          }}
          onCreateNew={() => {
            setShowCreateNew(true);
            setShowAddMenu(false);
          }}
        />
      )}

      {showCreateNew && (
        <CreateNewSupplement
          onClose={() => {
            setShowCreateNew(false);
            setShowAddMenu(false);
          }}
          onCreateSupplement={onCreateSupplement}
        />
      )}

      {showChooseExisting && (
        <AddSupplementMenu
          onClose={() => {
            setShowChooseExisting(false);
            setShowAddMenu(true);
          }}
          onAddMultipleSupplements={(supplements) => {
            supplements.forEach(handleAddSupplement);
            setShowChooseExisting(false);
            setShowAddMenu(false);
          }}
          allSupplements={allSupplements}
          dailySupplements={dailySupplements}
        />
      )}

      {showChooseRoutine && (
        <ChooseRoutineMenu
          onClose={() => {
            setShowChooseRoutine(false);
            setShowAddMenu(true);
          }}
          onChooseRoutine={(routineSupplements) => {
            routineSupplements.forEach(handleAddSupplement);
            setShowChooseRoutine(false);
            setShowAddMenu(false);
          }}
          routines={routines}
        />
      )}

      {selectedSupplement && (
        <CreateNewSupplement
          onClose={() => setSelectedSupplement(null)}
          editingSupplement={selectedSupplement}
          onUpdateSupplement={(updated) => {
            const updatedSupplements = dailySupplements.map(s =>
              s.uniqueId === selectedSupplement.uniqueId ? { ...updated, uniqueId: s.uniqueId, servingSize: s.servingSize || 0 } : s
            );
            onUpdateDailySupplements(updatedSupplements);
            setSelectedSupplement(null);
          }}
        />
      )}
    </ModalOverlay>
  );
}

export default SupplementsTakenToday;