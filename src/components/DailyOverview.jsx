import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChartBar, FaTablets, FaUtensils, FaDumbbell, FaHeartbeat, FaBook, FaCalendarAlt } from 'react-icons/fa';
import SupplementsTakenToday from './SupplementsTakenToday';
import Reminders from './Reminders';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const OverviewContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

const DateDisplay = styled.div`
  font-size: 16px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  color: #4052B5;
  margin: 0 0 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CalendarIcon = styled(FaCalendarAlt)`
  cursor: pointer;
  color: #4052B5;
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const Card = styled.div`
  background-color: ${props => props.color || '#ffffff'};
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  min-height: 80px;
`;

const IconWrapper = styled.div`
  font-size: 20px;
  margin-bottom: 4px;
  color: ${props => props.color || '#333'};
`;

const CountCircle = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-top: 4px;
`;

const FeelingCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #e6a8d7;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin: 10px auto;
  cursor: pointer;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
  z-index: 1002;
`;

const CalendarModal = styled(Modal)`
  .react-calendar {
    width: 350px;
    max-width: 100%;
    background: white;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    line-height: 1.125em;
    padding: 20px;
  }

  .react-calendar__tile--active {
    background: #4052B5;
    color: white;
  }

  .react-calendar__tile--now {
    background: #e6e6e6;
  }
`;

const ScoreModal = styled(Modal)``;

const ScoreContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
`;

const ScoreInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  font-size: 24px;
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

function DailyOverview({ dailySupplements, onUpdateDailySupplements, allSupplements, routines, onCreateSupplement, selectedDate, onDateChange }) {
  const [feeling, setFeeling] = useState(70);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showSupplementsTaken, setShowSupplementsTaken] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSupplementsClick = () => {
    setShowSupplementsTaken(true);
  };

  const handleDateChange = (date) => {
    onDateChange(date);
    setShowCalendar(false);
  };

  const handleScoreChange = (newScore) => {
    setFeeling(newScore);
    setShowScoreModal(false);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowScoreModal(false);
      setShowCalendar(false);
    }
  };

  const formatDisplayDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <OverviewContainer>
      <PageTitle>
        <DateDisplay>
          {formatDisplayDate(selectedDate)}
        </DateDisplay>
        <CalendarIcon onClick={() => setShowCalendar(true)} />
      </PageTitle>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div>Feeling</div>
        <FeelingCircle onClick={() => setShowScoreModal(true)}>{feeling}</FeelingCircle>
      </div>

      <Grid>
        <Card color="#e6f7ff" onClick={handleSupplementsClick}>
          <IconWrapper><FaTablets /></IconWrapper>
          Supplements
          <CountCircle>{dailySupplements.length}</CountCircle>
        </Card>
        <Card color="#fff1f0">
          <IconWrapper><FaHeartbeat /></IconWrapper>
          Symptoms
          <CountCircle>0</CountCircle>
        </Card>
        <Card color="#fffbe6">
          <IconWrapper><FaUtensils /></IconWrapper>
          Food
          <CountCircle>4</CountCircle>
        </Card>
        <Card color="#f6ffed">
          <IconWrapper><FaDumbbell /></IconWrapper>
          Workouts
          <CountCircle>1</CountCircle>
        </Card>
        <Card color="#f9f0ff">
          <IconWrapper><FaChartBar /></IconWrapper>
          Vitals
          <CountCircle>4</CountCircle>
        </Card>
        <Card color="#fff2e8">
          <IconWrapper><FaBook /></IconWrapper>
          Diary
          <CountCircle>2</CountCircle>
        </Card>
      </Grid>

      <Reminders 
        onUpdateDailySupplements={onUpdateDailySupplements}
        dailySupplements={dailySupplements}
        allSupplements={allSupplements}
        selectedDate={selectedDate}
      />

      {showSupplementsTaken && (
        <SupplementsTakenToday
          onClose={() => setShowSupplementsTaken(false)}
          dailySupplements={dailySupplements}
          onUpdateDailySupplements={onUpdateDailySupplements}
          allSupplements={allSupplements}
          routines={routines}
          onCreateSupplement={onCreateSupplement}
          selectedDate={selectedDate}
        />
      )}

      {showScoreModal && (
        <ScoreModal onClick={handleModalClick}>
          <ScoreContent onClick={e => e.stopPropagation()}>
            <h2>Enter Daily Score</h2>
            <ScoreInput
              type="number"
              value={feeling}
              onChange={(e) => setFeeling(parseInt(e.target.value, 10))}
              min="0"
              max="100"
            />
            <SaveButton onClick={() => handleScoreChange(feeling)}>Save Score</SaveButton>
          </ScoreContent>
        </ScoreModal>
      )}

      {showCalendar && (
        <CalendarModal onClick={handleModalClick}>
          <div onClick={e => e.stopPropagation()}>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
            />
          </div>
        </CalendarModal>
      )}
    </OverviewContainer>
  );
}

export default DailyOverview;