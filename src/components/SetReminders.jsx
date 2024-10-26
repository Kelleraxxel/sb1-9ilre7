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
  max-width: 400px;
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

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
  margin-right: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
  margin-right: 5px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  color: white;
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

function SetReminders({ onClose, onSave, existingReminders }) {
  const [reminders, setReminders] = useState(existingReminders || []);
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [dose, setDose] = useState('');
  const [frequency, setFrequency] = useState('Daily');

  const handleAddReminder = () => {
    const newReminder = { hour, minute, dose, frequency };
    setReminders([...reminders, newReminder]);
    setHour('00');
    setMinute('00');
    setDose('');
    setFrequency('Daily');
  };

  const handleSaveReminders = () => {
    onSave(reminders);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Set Reminders</Title>
        <Form onSubmit={(e) => e.preventDefault()}>
          <InputGroup>
            <Select value={hour} onChange={(e) => setHour(e.target.value)}>
              {[...Array(24)].map((_, i) => (
                <option key={i} value={i.toString().padStart(2, '0')}>
                  {i.toString().padStart(2, '0')}
                </option>
              ))}
            </Select>
            <Select value={minute} onChange={(e) => setMinute(e.target.value)}>
              {[...Array(60)].map((_, i) => (
                <option key={i} value={i.toString().padStart(2, '0')}>
                  {i.toString().padStart(2, '0')}
                </option>
              ))}
            </Select>
            <Input
              type="text"
              placeholder="Dose"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
            />
            <Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </Select>
          </InputGroup>
          <Button type="button" onClick={handleAddReminder} style={{ backgroundColor: '#4a90e2' }}>
            Add Reminder
          </Button>
          <Button type="button" onClick={handleSaveReminders} style={{ backgroundColor: '#2ecc71' }}>
            Save Reminders
          </Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default SetReminders;