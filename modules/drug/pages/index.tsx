'use client';

import { DrugsTable } from '../components';

const MOCK_DRUGS = [
  {
    id: '1',
    name: 'Paracetamol',
    brand: 'Panadol',
    description: 'Pain reliever and fever reducer',
    indications: ['Headache', 'Fever'],
    contraindications: ['Liver disease'],
    dosage: '500mg every 4-6 hours',
    sideEffects: ['Nausea', 'Skin rash'],
    activeIngredients: ['Paracetamol'],
  },
  {
    id: '2',
    name: 'Ibuprofen',
    brand: 'Nurofen',
    description: 'Nonsteroidal anti-inflammatory drug',
    indications: ['Pain', 'Inflammation'],
    contraindications: ['Ulcer', 'Kidney disease'],
    dosage: '200-400mg every 4-6 hours',
    sideEffects: ['Stomach pain', 'Dizziness'],
    activeIngredients: ['Ibuprofen'],
  },
];

export const DrugsTableTest = () => {
  return (
    <DrugsTable
      drugs={MOCK_DRUGS}
      onEdit={(drug) => {
        console.log('Edit:', drug);
      }}
    />
  );
};
