export type DrugCreatedSubscriptionResponse = {
  drugCreated: {
    name: string;
    brand: string;
    description: string;
    activeIngredients: string[];
    dosage: string;
    indications: string;
    contraindications: string;
    sideEffects: string;
  };
};
