import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCheck, FaTimes, FaUndo, FaTablets, FaUtensils, FaDumbbell } from 'react-icons/fa';

const RemindersContainer = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
  color: #3a4374;
`;

const CategoryFilters = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  overflow-x: auto;
  padding-bottom: 5px;
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  border: none;
  border-radius: 20px;
  background-color: ${props => props.active ? props.color : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#666'};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }
`;

const RemindersScrollArea = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding-right: 5px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;

const ReminderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  opacity: ${props => props.isCompleted ? 0.5 : 1};
  transform: ${props => props.isCompleted ? 'translateX(100%)' : 'translateX(0)'};
  transition: all 0.3s ease;
`;

const ReminderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Time = styled.span`
  font-weight: bold;
  color: #4a90e2;
  min-width: 60px;
`;

const SupplementInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SupplementName = styled.span`
  font-size: 14px;
  color: #333;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AmountInput = styled.input`
  width: 60px;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &.positive {
    background-color: #2ecc71;
    color: white;
    &:hover {
      background-color: #27ae60;
    }
  }

  &.negative {
    background-color: #e74c3c;
    color: white;
    &:hover {
      background-color: #c0392b;
    }
  }
`;

const UndoNotification = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 12px 20px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const UndoButton = styled.button`
  background: none;
  border: none;
  color: #4a90e2;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const formatNumber = (num) => {
  return Number.isInteger(num) ? num.toString() : num.toFixed(1);
};

const categories = [
  { id: 'supplement', icon: FaTablets, color: '#4a90e2', label: 'Supplements' },
  { id: 'food', icon: FaUtensils, color: '#f39c12', label: 'Food' },
  { id: 'workout', icon: FaDumbbell, color: '#2ecc71', label: 'Workouts' },
];

function Reminders({ onUpdateDailySupplements, dailySupplements, allSupplements }) {
  const [reminders, setReminders] = useState([
    { 
      id: 1, 
      time: '07:00', 
      supplementId: 2,
      supplementName: 'Fish Oil',
      amount: 1000,
      unit: 'mg',
      checked: false,
      remainingAmount: 1000,
      category: 'supplement'
    },
    { 
      id: 2, 
      time: '09:00', 
      supplementId: 1,
      supplementName: 'Vitamin C',
      amount: 500,
      unit: 'mg',
      checked: false,
      remainingAmount: 500,
      category: 'supplement'
    }
  ]);

  const [activeCategories, setActiveCategories] = useState(['supplement', 'food', 'workout']);
  const [partialAmounts, setPartialAmounts] = useState({});
  const [lastRemovedReminder, setLastRemovedReminder] = useState(null);
  const [showUndo, setShowUndo] = useState(false);

  const handlePartialAmountChange = (reminderId, value) => {
    const reminder = reminders.find(r => r.id === reminderId);
    const numValue = Number(value);
    
    if (numValue >= 0 && numValue <= reminder.remainingAmount) {
      setPartialAmounts(prev => ({
        ...prev,
        [reminderId]: numValue
      }));
    }
  };

  const handleReminderAction = (reminder, isPositive) => {
    if (isPositive) {
      const amountTaken = partialAmounts[reminder.id] || reminder.remainingAmount;
      
      if (reminder.category === 'supplement') {
        const existingSupplementIndex = dailySupplements.findIndex(s => 
          s.id === reminder.supplementId && s.name === reminder.supplementName
        );

        if (existingSupplementIndex >= 0) {
          const updatedSupplements = [...dailySupplements];
          updatedSupplements[existingSupplementIndex] = {
            ...updatedSupplements[existingSupplementIndex],
            amount: updatedSupplements[existingSupplementIndex].amount + Number(amountTaken)
          };
          onUpdateDailySupplements(updatedSupplements);
        } else {
          const supplementData = allSupplements.find(s => s.id === reminder.supplementId);
          if (supplementData) {
            onUpdateDailySupplements([
              ...dailySupplements,
              {
                ...supplementData,
                uniqueId: Date.now() + Math.random(),
                amount: Number(amountTaken)
              }
            ]);
          }
        }
      }

      const newRemainingAmount = reminder.remainingAmount - amountTaken;
      
      setReminders(prev => 
        prev.map(r => 
          r.id === reminder.id
            ? { 
                ...r, 
                remainingAmount: newRemainingAmount,
                checked: newRemainingAmount <= 0 
              }
            : r
        )
      );

      setPartialAmounts(prev => {
        const newPartialAmounts = { ...prev };
        delete newPartialAmounts[reminder.id];
        return newPartialAmounts;
      });

      if (newRemainingAmount <= 0) {
        setLastRemovedReminder(reminder);
        setShowUndo(true);
        setTimeout(() => setShowUndo(false), 5000);
      }
    } else {
      setReminders(prev => 
        prev.map(r => 
          r.id === reminder.id
            ? { ...r, checked: true }
            : r
        )
      );
      setLastRemovedReminder(reminder);
      setShowUndo(true);
      setTimeout(() => setShowUndo(false), 5000);
    }
  };

  const handleUndo = () => {
    if (lastRemovedReminder) {
      setReminders(prev => 
        prev.map(r => 
          r.id === lastRemovedReminder.id
            ? { ...r, checked: false, remainingAmount: lastRemovedReminder.amount }
            : r
        )
      );
      setShowUndo(false);

      if (lastRemovedReminder.category === 'supplement') {
        const existingSupplementIndex = dailySupplements.findIndex(s => 
          s.id === lastRemovedReminder.supplementId && s.name === lastRemovedReminder.supplementName
        );

        if (existingSupplementIndex >= 0) {
          const updatedSupplements = [...dailySupplements];
          updatedSupplements[existingSupplementIndex] = {
            ...updatedSupplements[existingSupplementIndex],
            amount: Math.max(0, updatedSupplements[existingSupplementIndex].amount - lastRemovedReminder.amount)
          };
          onUpdateDailySupplements(updatedSupplements);
        }
      }
    }
  };

  const toggleCategory = (categoryId) => {
    setActiveCategories(prev => {
      if (prev.includes(categoryId)) {
        if (prev.length === 1) return prev;
        return prev.filter(id => id !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  const filteredReminders = reminders.filter(reminder => 
    activeCategories.includes(reminder.category) && !reminder.checked
  );

  const sortedReminders = [...filteredReminders].sort((a, b) => {
    const timeA = a.time.split(':').map(Number);
    const timeB = b.time.split(':').map(Number);
    return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
  });

  return (
    <RemindersContainer>
      <Title>Reminders</Title>
      <CategoryFilters>
        {categories.map(({ id, icon: Icon, color, label }) => (
          <CategoryButton
            key={id}
            active={activeCategories.includes(id)}
            color={color}
            onClick={() => toggleCategory(id)}
          >
            <Icon /> {label}
          </CategoryButton>
        ))}
      </CategoryFilters>
      <RemindersScrollArea>
        {sortedReminders.map((reminder) => (
          <ReminderItem key={reminder.id} isCompleted={reminder.checked}>
            <ReminderInfo>
              <Time>{reminder.time}</Time>
              <SupplementInfo>
                <SupplementName>
                  Take {formatNumber(reminder.remainingAmount)}{reminder.unit} of {reminder.supplementName}
                </SupplementName>
              </SupplementInfo>
            </ReminderInfo>
            <ActionButtons>
              <AmountInput
                type="number"
                min="0"
                max={reminder.remainingAmount}
                value={partialAmounts[reminder.id] || ''}
                onChange={(e) => handlePartialAmountChange(reminder.id, e.target.value)}
                placeholder={formatNumber(reminder.remainingAmount)}
              />
              <ActionButton 
                className="positive"
                onClick={() => handleReminderAction(reminder, true)}
              >
                <FaCheck />
              </ActionButton>
              <ActionButton 
                className="negative"
                onClick={() => handleReminderAction(reminder, false)}
              >
                <FaTimes />
              </ActionButton>
            </ActionButtons>
          </ReminderItem>
        ))}
      </RemindersScrollArea>
      {showUndo && (
        <UndoNotification>
          <span>Reminder removed</span>
          <UndoButton onClick={handleUndo}>
            <FaUndo /> Undo
          </UndoButton>
        </UndoNotification>
      )}
    </RemindersContainer>
  );
}

export default Reminders;