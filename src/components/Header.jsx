import React from 'react';
import styled from 'styled-components';
import { FaCog } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #4568dc 0%, #7a97ea 100%);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px;
  box-sizing: border-box;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`;

const LogoIcon = styled.span`
  font-size: 28px;
  margin-right: 10px;
  color: #FFE87C;
`;

const LogoText = styled.h1`
  font-size: 24px;
  color: white;
  margin: 0;
  font-weight: 500;
`;

const SettingsIcon = styled(FaCog)`
  font-size: 20px;
  color: white;
  cursor: pointer;
  position: absolute;
  right: 0;
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <LogoIcon>🌙</LogoIcon>
        <LogoText>Lûmilnar</LogoText>
      </Logo>
      <SettingsIcon />
    </HeaderContainer>
  );
}

export default Header;