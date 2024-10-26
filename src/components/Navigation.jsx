import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChartBar, FaTablets, FaUtensils, FaDumbbell, FaHeartbeat, FaStar, FaList } from 'react-icons/fa';

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const MainNav = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`;

const SubNav = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background-color: #e0e0e0;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${props => props.active ? '#4a90e2' : 'inherit'};
`;

function Navigation({ onShowFavorites, onShowAllSupplements, onShowSupplementRoutines, onShowHome }) {
  const [activeMenu, setActiveMenu] = useState('home');

  const handleMainMenuClick = (menu) => {
    if (menu === activeMenu && menu !== 'supplements') {
      setActiveMenu('home');
      onShowHome();
    } else {
      setActiveMenu(menu);
      switch (menu) {
        case 'home':
          onShowHome();
          break;
        case 'supplements':
          onShowFavorites();
          break;
        // Remove the case for 'food' as we don't have a corresponding function
      }
    }
  };

  return (
    <NavContainer>
      {activeMenu === 'supplements' && (
        <SubNav>
          <NavItem onClick={onShowFavorites}>
            <FaStar />
            Favorites
          </NavItem>
          <NavItem onClick={onShowAllSupplements}>
            <FaList />
            All
          </NavItem>
          <NavItem onClick={onShowSupplementRoutines}>
            <FaTablets />
            Routines
          </NavItem>
        </SubNav>
      )}
      <MainNav>
        <NavItem active={activeMenu === 'home'} onClick={() => handleMainMenuClick('home')}>
          <FaChartBar />
        </NavItem>
        <NavItem active={activeMenu === 'supplements'} onClick={() => handleMainMenuClick('supplements')}>
          <FaTablets />
        </NavItem>
        <NavItem active={activeMenu === 'food'} onClick={() => handleMainMenuClick('food')}>
          <FaUtensils />
        </NavItem>
        <NavItem active={activeMenu === 'workouts'} onClick={() => handleMainMenuClick('workouts')}>
          <FaDumbbell />
        </NavItem>
        <NavItem active={activeMenu === 'vitals'} onClick={() => handleMainMenuClick('vitals')}>
          <FaHeartbeat />
        </NavItem>
      </MainNav>
    </NavContainer>
  );
}

export default Navigation;