import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrash, FaChevronDown, FaChevronUp, FaPlus, FaMinus, FaTimes } from 'react-icons/fa';

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RoutineItem = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: hidden;
`;

const RoutineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  cursor: pointer;
`;

const RoutineContent = styled.div`
  padding: 0 15px 15px;
`;

const SupplementList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SupplementItem = styled.li`
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
  margin-right: 10px;
`;

const ActionIcon = styled.span`
  cursor: pointer;
  margin-left: 12px;
  font-size: 18px;
  color: #e74c3c;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
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

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
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

function SupplementRoutinesPage({ allSupplements }) {
  const [routines, setRoutines] = useState([
    { id: 1, name: 'Morning Routine', supplements: [1, 2] },
    { id: 2, name: 'Evening Routine', supplements: [3] },
  ]);
  const [expandedRoutine, setExpandedRoutine] = useState(null);
  const [showAddExisting, setShowAddExisting] = useState(false);
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [newRoutineName, setNewRoutineName] = useState('');
  const [selectedSupplements, setSelectedSupplements] = useState([]);

  const handleToggleRoutine = (routineId) => {
    setExpandedRoutine(expandedRoutine === routineId ? null : routineId);
  };

  const handleAddExisting = (routineId) => {
    setSelectedRoutine(routineId);
    setShowAddExisting(true);
    setSelectedSupplements([]);
  };

  const handleCreateNew = () => {
    setShowCreateNew(true);
    setNewRoutineName('');
    setSelectedSupplements([]);
  };

  const handleRemoveSupplement = (routineId, supplementId) => {
    setRoutines(routines.map(routine => 
      routine.id === routineId
        ? { ...routine, supplements: routine.supplements.filter(id => id !== supplementId) }
        : routine
    ));
  };

  const handleAddSelectedSupplements = () => {
    if (selectedRoutine) {
      setRoutines(routines.map(routine => 
        routine.id === selectedRoutine
          ? { ...routine, supplements: [...new Set([...routine.supplements, ...selectedSupplements])] }
          : routine
      ));
    } else {
      const newRoutine = {
        id: Date.now(),
        name: newRoutineName,
        supplements: selectedSupplements,
      };
      setRoutines([...routines, newRoutine]);
    }
    setShowAddExisting(false);
    setShowCreateNew(false);
    setSelectedSupplements([]);
  };

  const handleSupplementSelection = (supplementId) => {
    setSelectedSupplements(prev => 
      prev.includes(supplementId)
        ? prev.filter(id => id !== supplementId)
        : [...prev, supplementId]
    );
  };

  const handleCloseModal = () => {
    setShowAddExisting(false);
    setShowCreateNew(false);
  };

  return (
    <>
      <Title>
        Supplement Routines
        <Button onClick={handleCreateNew}>+ Create New Routine</Button>
      </Title>
      {routines.map((routine) => (
        <RoutineItem key={routine.id}>
          <RoutineHeader onClick={() => handleToggleRoutine(routine.id)}>
            <span>{routine.name}</span>
            {expandedRoutine === routine.id ? <FaChevronUp /> : <FaChevronDown />}
          </RoutineHeader>
          {expandedRoutine === routine.id && (
            <RoutineContent>
              <SupplementList>
                {routine.supplements.map((supplementId) => {
                  const supplement = allSupplements.find(s => s.id === supplementId);
                  return (
                    <SupplementItem key={supplementId}>
                      <span>{supplement.name}</span>
                      <ActionIcon onClick={() => handleRemoveSupplement(routine.id, supplementId)}>
                        <FaMinus />
                      </ActionIcon>
                    </SupplementItem>
                  );
                })}
              </SupplementList>
              <Button onClick={() => handleAddExisting(routine.id)}>Add Existing</Button>
            </RoutineContent>
          )}
        </RoutineItem>
      ))}

      {(showAddExisting || showCreateNew) && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}><FaTimes /></CloseButton>
            <h3>{showCreateNew ? 'Create New Routine' : 'Add Existing Supplements'}</h3>
            {showCreateNew && (
              <Input
                type="text"
                placeholder="Routine Name"
                value={newRoutineName}
                onChange={(e) => setNewRoutineName(e.target.value)}
              />
            )}
            <Table>
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Ingredients</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {allSupplements.map((supplement) => (
                  <tr key={supplement.id}>
                    <Td>{supplement.name}</Td>
                    <Td>{supplement.ingredients.map(i => i.name).join(', ')}</Td>
                    <Td>
                      <Button
                        onClick={() => handleSupplementSelection(supplement.id)}
                        style={{ backgroundColor: selectedSupplements.includes(supplement.id) ? '#e74c3c' : '#2ecc71' }}
                      >
                        {selectedSupplements.includes(supplement.id) ? 'Remove' : 'Add'}
                      </Button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button onClick={handleAddSelectedSupplements} style={{ marginTop: '20px' }}>
              {showCreateNew ? 'Create Routine' : 'Add Selected'}
            </Button>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default SupplementRoutinesPage;