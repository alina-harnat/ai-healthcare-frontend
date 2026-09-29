import { gql, TypedDocumentNode } from '@apollo/client';
import { DrugCreatedSubscriptionResponse } from '../../types';

export const DRUG_CREATED: TypedDocumentNode<DrugCreatedSubscriptionResponse> = gql`
  subscription DrugCreated {
    drugCreated {
      name
      brand
      description
      activeIngredients
      dosage
      indications
      contraindications
      sideEffects
    }
  }
`;
