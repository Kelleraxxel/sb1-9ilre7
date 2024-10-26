import styled from 'styled-components';

export const ModalOverlay = styled.div`
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

export const ModalContent = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 244, 255, 0.95));
  padding: 20px;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 20px rgba(64, 82, 181, 0.15);
  border: 1px solid rgba(64, 82, 181, 0.2);
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const Field = styled.div`
  flex: ${props => props.width || 1};
  margin: 0 4px;
  
  &:first-child {
    margin-left: 0;
  }
  
  &:last-child {
    margin-right: 0;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  color: #4052B5;
  font-size: 14px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 2px solid rgba(64, 82, 181, 0.2);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.95);
  color: #2A3362;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(64, 82, 181, 0.05);
  margin-bottom: 8px;

  &:focus {
    outline: none;
    border-color: rgba(64, 82, 181, 0.4);
    box-shadow: 0 0 0 3px rgba(64, 82, 181, 0.1);
  }

  &[type="checkbox"] {
    width: auto;
    margin-right: 8px;
    margin-bottom: 0;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 2px solid rgba(64, 82, 181, 0.2);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.95);
  color: #2A3362;
  transition: all 0.2s ease;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(64, 82, 181, 0.05);
  margin-bottom: 8px;

  &:focus {
    outline: none;
    border-color: rgba(64, 82, 181, 0.4);
    box-shadow: 0 0 0 3px rgba(64, 82, 181, 0.1);
  }
`;

export const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  color: white;
  background: linear-gradient(135deg, #4568DC, #7A97EA);
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(64, 82, 181, 0.2);
  margin-right: 12px;
  height: 36px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(64, 82, 181, 0.3);
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
  color: #4052B5;
  text-align: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #4052B5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(64, 82, 181, 0.1);
  }
`;

export const FormIcon = styled.span`
  margin-left: 8px;
  color: #4052B5;
  opacity: 0.7;
`;