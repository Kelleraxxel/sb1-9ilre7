import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SupplementRoutinesPage from './components/SupplementRoutinesPage';
import FavoriteSupplementsPage from './components/FavoriteSupplementsPage';
import AllSupplementsPage from './components/AllSupplementsPage';
import Header from './components/Header';
import Navigation from './components/Navigation';
import DailyOverview from './components/DailyOverview';
import CreateNewSupplement from './components/CreateNewSupplement';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  background: linear-gradient(180deg, #E8EAF6 0%, #F5F6FA 100%);
  min-height: 100vh;
  color: #333;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  padding-top: 80px;
  padding-bottom: 80px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`;

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allSupplements, setAllSupplements] = useState([
    { id: 1, name: 'Vitamin C', ingredients: [{ name: 'Ascorbic Acid', amount: 500, unit: 'mg' }], isFavorite: true },
    { id: 2, name: 'Fish Oil', ingredients: [{ name: 'Omega-3 Fatty Acids', amount: 1000, unit: 'mg' }], isFavorite: true },
    { id: 3, name: 'Magnesium', ingredients: [{ name: 'Magnesium Citrate', amount: 200, unit: 'mg' }], isFavorite: false },
  ]);
  
  const [dailySupplementsByDate, setDailySupplementsByDate] = useState({});
  const [routines, setRoutines] = useState([
    { id: 1, name: 'Morning Routine', supplements: [1, 2] },
    { id: 2, name: 'Evening Routine', supplements: [3] },
  ]);
  const [showCreateNewSupplement, setShowCreateNewSupplement] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState(null);

  useEffect(() => {
    const today = formatDate(new Date());
    if (!dailySupplementsByDate[today]) {
      setDailySupplementsByDate(prev => ({
        ...prev,
        [today]: []
      }));
    }
  }, []);

  const handleCreateSupplement = (newSupplement) => {
    const supplementWithId = { 
      ...newSupplement, 
      id: Date.now(),
      isFavorite: false 
    };
    
    setAllSupplements([...allSupplements, supplementWithId]);
    
    if (newSupplement.addToDaily) {
      const currentDate = formatDate(selectedDate);
      const dailyCopy = {
        ...supplementWithId,
        uniqueId: Date.now() + Math.random(),
        masterDataId: supplementWithId.id,
        servingSize: 1,
        ingredients: supplementWithId.ingredients.map(ingredient => ({
          ...ingredient,
          calculatedAmount: ingredient.amount
        }))
      };

      setDailySupplementsByDate(prev => ({
        ...prev,
        [currentDate]: [...(prev[currentDate] || []), dailyCopy]
      }));
    }
    
    return supplementWithId;
  };

  const handleToggleFavorite = (id) => {
    setAllSupplements(allSupplements.map(supplement => 
      supplement.id === id ? { ...supplement, isFavorite: !supplement.isFavorite } : supplement
    ));
  };

  const handleEditSupplement = (supplement) => {
    setEditingSupplement(supplement);
    setShowCreateNewSupplement(true);
  };

  const handleUpdateSupplement = (updatedSupplement) => {
    setAllSupplements(allSupplements.map(supplement => 
      supplement.id === updatedSupplement.id ? updatedSupplement : supplement
    ));
  };

  const handleDeleteSupplement = (id) => {
    setAllSupplements(allSupplements.filter(supplement => supplement.id !== id));
  };

  const handleUpdateDailySupplements = (updatedDailySupplements) => {
    const currentDate = formatDate(selectedDate);
    setDailySupplementsByDate(prev => ({
      ...prev,
      [currentDate]: updatedDailySupplements
    }));
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    const formattedDate = formatDate(newDate);
    if (!dailySupplementsByDate[formattedDate]) {
      setDailySupplementsByDate(prev => ({
        ...prev,
        [formattedDate]: []
      }));
    }
  };

  const getCurrentDailySupplements = () => {
    const currentDate = formatDate(selectedDate);
    return dailySupplementsByDate[currentDate] || [];
  };

  const handleReorderSupplements = (reorderedSupplements) => {
    setAllSupplements(reorderedSupplements);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <DailyOverview 
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            dailySupplements={getCurrentDailySupplements()}
            onUpdateDailySupplements={handleUpdateDailySupplements}
            allSupplements={allSupplements}
            routines={routines}
            onCreateSupplement={handleCreateSupplement}
          />
        );
      case 'favoriteSupplements':
        return (
          <FavoriteSupplementsPage
            onCreateNew={() => setShowCreateNewSupplement(true)}
            supplements={allSupplements.filter(s => s.isFavorite)}
            onToggleFavorite={handleToggleFavorite}
            onEdit={handleEditSupplement}
            onDelete={handleDeleteSupplement}
            onReorder={handleReorderSupplements}
          />
        );
      case 'allSupplements':
        return (
          <AllSupplementsPage
            onCreateNew={() => setShowCreateNewSupplement(true)}
            supplements={allSupplements}
            onToggleFavorite={handleToggleFavorite}
            onEdit={handleEditSupplement}
            onDelete={handleDeleteSupplement}
            onReorder={handleReorderSupplements}
          />
        );
      case 'supplementRoutines':
        return (
          <SupplementRoutinesPage
            allSupplements={allSupplements}
            routines={routines}
            setRoutines={setRoutines}
          />
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <AppContainer>
      <Header />
      <ContentContainer>
        {renderPage()}
      </ContentContainer>
      <Navigation
        onShowFavorites={() => setCurrentPage('favoriteSupplements')}
        onShowAllSupplements={() => setCurrentPage('allSupplements')}
        onShowSupplementRoutines={() => setCurrentPage('supplementRoutines')}
        onShowHome={() => setCurrentPage('home')}
      />
      {showCreateNewSupplement && (
        <CreateNewSupplement
          onClose={() => {
            setShowCreateNewSupplement(false);
            setEditingSupplement(null);
          }}
          onCreateSupplement={handleCreateSupplement}
          onUpdateSupplement={handleUpdateSupplement}
          editingSupplement={editingSupplement}
        />
      )}
    </AppContainer>
  );
}

export default App;