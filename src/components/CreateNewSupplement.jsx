import React, { useState, useEffect } from 'react';
import { FaTimes, FaCapsules, FaVial, FaBox } from 'react-icons/fa';
import FillerSelector, { fillerOptions } from './supplement-form/FillerSelector';
import IngredientFields from './supplement-form/IngredientFields';
import SymptomSelector, { symptomOptions } from './supplement-form/SymptomSelector';
import {
  ModalOverlay,
  ModalContent,
  Row,
  Field,
  Label,
  Input,
  Select,
  Button,
  Title,
  CloseButton,
  FormIcon
} from './supplement-form/styles';

function getFormIcon(form) {
  switch (form) {
    case 'capsule':
      return <FaCapsules />;
    case 'liquid':
      return <FaVial />;
    case 'powder':
      return <FaBox />;
    default:
      return null;
  }
}

const CreateNewSupplement = ({ onClose, onCreateSupplement, onUpdateSupplement, editingSupplement }) => {
  const [name, setName] = useState('');
  const [form, setForm] = useState('capsule');
  const [servingSize, setServingSize] = useState(1);
  const [servingSizeUnit, setServingSizeUnit] = useState('mg');
  const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: 'mg' }]);
  const [isDrug, setIsDrug] = useState(false);
  const [company, setCompany] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [safetyScore, setSafetyScore] = useState(5);
  const [comments, setComments] = useState('');
  
  // Fillers state
  const [availableFillers, setAvailableFillers] = useState(fillerOptions);
  const [selectedFillers, setSelectedFillers] = useState([]);
  const [showFillers, setShowFillers] = useState(false);

  // Symptoms to treat state
  const [availableSymptomsToTreat, setAvailableSymptomsToTreat] = useState(symptomOptions);
  const [selectedSymptomsToTreat, setSelectedSymptomsToTreat] = useState([]);
  const [showSymptomsToTreat, setShowSymptomsToTreat] = useState(false);

  // Caused symptoms state
  const [availableCausedSymptoms, setAvailableCausedSymptoms] = useState(symptomOptions);
  const [selectedCausedSymptoms, setSelectedCausedSymptoms] = useState([]);
  const [showCausedSymptoms, setShowCausedSymptoms] = useState(false);

  useEffect(() => {
    if (editingSupplement) {
      setName(editingSupplement.name || '');
      setForm(editingSupplement.form || 'capsule');
      setServingSize(editingSupplement.servingSize || 1);
      setServingSizeUnit(editingSupplement.servingSizeUnit || 'mg');
      setIngredients(editingSupplement.ingredients || [{ name: '', amount: '', unit: 'mg' }]);
      setIsDrug(editingSupplement.isDrug || false);
      setCompany(editingSupplement.company || '');
      setPricePerUnit(editingSupplement.pricePerUnit || '');
      setSafetyScore(editingSupplement.safetyScore || 5);
      setComments(editingSupplement.comments || '');
      
      if (editingSupplement.fillers) {
        setSelectedFillers(editingSupplement.fillers);
        setAvailableFillers(fillerOptions.filter(f => !editingSupplement.fillers.includes(f)));
        setShowFillers(editingSupplement.fillers.length > 0);
      }

      if (editingSupplement.symptomsToTreat) {
        setSelectedSymptomsToTreat(editingSupplement.symptomsToTreat);
        setAvailableSymptomsToTreat(symptomOptions.filter(s => !editingSupplement.symptomsToTreat.includes(s)));
        setShowSymptomsToTreat(editingSupplement.symptomsToTreat.length > 0);
      }

      if (editingSupplement.causedSymptoms) {
        setSelectedCausedSymptoms(editingSupplement.causedSymptoms);
        setAvailableCausedSymptoms(symptomOptions.filter(s => !editingSupplement.causedSymptoms.includes(s)));
        setShowCausedSymptoms(editingSupplement.causedSymptoms.length > 0);
      }
    }
  }, [editingSupplement]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: 'mg' }]);
  };

  const handleRemoveIngredient = (index) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(newIngredients);
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [field]: value };
      }
      return ingredient;
    });
    setIngredients(newIngredients);
  };

  const handleUpdateFillers = (newAvailable, newSelected) => {
    setAvailableFillers(newAvailable);
    setSelectedFillers(newSelected);
  };

  const handleUpdateSymptomsToTreat = (newAvailable, newSelected) => {
    setAvailableSymptomsToTreat(newAvailable);
    setSelectedSymptomsToTreat(newSelected);
  };

  const handleUpdateCausedSymptoms = (newAvailable, newSelected) => {
    setAvailableCausedSymptoms(newAvailable);
    setSelectedCausedSymptoms(newSelected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const supplementData = {
      name,
      form,
      servingSize,
      servingSizeUnit,
      ingredients,
      isDrug,
      company,
      pricePerUnit,
      safetyScore,
      symptomsToTreat: selectedSymptomsToTreat,
      causedSymptoms: selectedCausedSymptoms,
      comments,
      fillers: selectedFillers
    };

    if (editingSupplement) {
      onUpdateSupplement({ ...supplementData, id: editingSupplement.id });
    } else {
      onCreateSupplement(supplementData);
    }
    onClose();
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleBackgroundClick}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}><FaTimes /></CloseButton>
        <Title>{editingSupplement ? 'Edit Supplement' : 'Create New Supplement'}</Title>
        <form onSubmit={handleSubmit}>
          <Row>
            <Field width={2}>
              <Label>Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>
            <Field width={1}>
              <Label>Form</Label>
              <Select value={form} onChange={(e) => setForm(e.target.value)}>
                <option value="capsule">Capsule</option>
                <option value="powder">Powder</option>
                <option value="liquid">Liquid</option>
              </Select>
              <FormIcon>{getFormIcon(form)}</FormIcon>
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>{form === 'liquid' ? 'Serving Size' : `${form.charAt(0).toUpperCase() + form.slice(1)}s per serving`}</Label>
              <Input
                type="number"
                value={servingSize}
                onChange={(e) => setServingSize(Number(e.target.value))}
                min="0.1"
                step="0.1"
                required
              />
            </Field>
            {form === 'liquid' && (
              <Field>
                <Label>Unit</Label>
                <Select value={servingSizeUnit} onChange={(e) => setServingSizeUnit(e.target.value)}>
                  <option value="ml">ml</option>
                  <option value="drops">drops</option>
                </Select>
              </Field>
            )}
            {form === 'powder' && (
              <Field>
                <Label>Unit</Label>
                <Select value={servingSizeUnit} onChange={(e) => setServingSizeUnit(e.target.value)}>
                  <option value="g">g</option>
                  <option value="mg">mg</option>
                </Select>
              </Field>
            )}
          </Row>

          <IngredientFields
            ingredients={ingredients}
            onIngredientChange={handleIngredientChange}
            onRemoveIngredient={handleRemoveIngredient}
          />
          
          <Row>
            <Button type="button" onClick={handleAddIngredient}>Add Ingredient</Button>
            <Button 
              type="button" 
              onClick={() => setShowFillers(!showFillers)}
              style={{ 
                backgroundColor: showFillers ? '#e74c3c' : '#4a90e2',
                opacity: selectedFillers.length > 0 ? 1 : 0.8
              }}
            >
              {showFillers ? 'Hide Fillers' : `Add Fillers${selectedFillers.length > 0 ? ` (${selectedFillers.length})` : ''}`}
            </Button>
          </Row>

          <FillerSelector
            availableFillers={availableFillers}
            selectedFillers={selectedFillers}
            onUpdateFillers={handleUpdateFillers}
            visible={showFillers}
          />

          <Row>
            <Button 
              type="button" 
              onClick={() => setShowSymptomsToTreat(!showSymptomsToTreat)}
              style={{ 
                backgroundColor: showSymptomsToTreat ? '#e74c3c' : '#4a90e2',
                opacity: selectedSymptomsToTreat.length > 0 ? 1 : 0.8
              }}
            >
              {showSymptomsToTreat ? 'Hide Symptoms to Treat' : `Add Symptoms to Treat${selectedSymptomsToTreat.length > 0 ? ` (${selectedSymptomsToTreat.length})` : ''}`}
            </Button>
          </Row>

          <SymptomSelector
            availableSymptoms={availableSymptomsToTreat}
            selectedSymptoms={selectedSymptomsToTreat}
            onUpdateSymptoms={handleUpdateSymptomsToTreat}
            visible={showSymptomsToTreat}
            title="Symptoms to Treat"
          />

          <Row>
            <Button 
              type="button" 
              onClick={() => setShowCausedSymptoms(!showCausedSymptoms)}
              style={{ 
                backgroundColor: showCausedSymptoms ? '#e74c3c' : '#4a90e2',
                opacity: selectedCausedSymptoms.length > 0 ? 1 : 0.8
              }}
            >
              {showCausedSymptoms ? 'Hide Caused Symptoms' : `Add Caused Symptoms${selectedCausedSymptoms.length > 0 ? ` (${selectedCausedSymptoms.length})` : ''}`}
            </Button>
          </Row>

          <SymptomSelector
            availableSymptoms={availableCausedSymptoms}
            selectedSymptoms={selectedCausedSymptoms}
            onUpdateSymptoms={handleUpdateCausedSymptoms}
            visible={showCausedSymptoms}
            title="Caused Symptoms"
          />

          <Row>
            <Field>
              <Label>Comments</Label>
              <Input
                type="text"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </Field>
          </Row>

          <Row>
            <Field width={2}>
              <Label>Company</Label>
              <Input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Field>
            <Field width={1} style={{ display: 'flex', alignItems: 'center', marginTop: '32px' }}>
              <Input
                type="checkbox"
                checked={isDrug}
                onChange={(e) => setIsDrug(e.target.checked)}
              />
              <Label style={{ marginBottom: 0, marginLeft: '8px' }}>Is Drug</Label>
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>Price per Unit (€)</Label>
              <Input
                type="number"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                step="0.01"
                min="0"
              />
            </Field>
            <Field>
              <Label>Safety Score (1-10)</Label>
              <Input
                type="number"
                value={safetyScore}
                onChange={(e) => setSafetyScore(e.target.value)}
                min="1"
                max="10"
              />
            </Field>
          </Row>

          <Row style={{ justifyContent: 'flex-start', marginTop: '20px' }}>
            <Button type="submit">
              {editingSupplement ? 'Update Supplement' : 'Create Supplement'}
            </Button>
          </Row>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateNewSupplement;