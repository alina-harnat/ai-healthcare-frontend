import {
  SkeletonSection,
  SkeletonSectionHeader,
  SkeletonSectionIcon,
  SkeletonSectionTitle,
  SkeletonFieldGroup,
  SkeletonLabel,
  SkeletonInput,
  SkeletonTextarea,
  SkeletonChipRow,
  SkeletonChip,
} from './drug-form-skeleton-styles';

export const DrugFormSkeleton = () => {
  return (
    <>
      <SkeletonSection>
        <SkeletonSectionHeader>
          <SkeletonSectionIcon variant='circular' />
          <SkeletonSectionTitle variant='text' />
        </SkeletonSectionHeader>

        <SkeletonFieldGroup>
          <SkeletonLabel variant='text' />
          <SkeletonInput variant='rounded' />
        </SkeletonFieldGroup>

        <SkeletonFieldGroup>
          <SkeletonLabel variant='text' />
          <SkeletonInput variant='rounded' />
        </SkeletonFieldGroup>

        <SkeletonFieldGroup>
          <SkeletonLabel variant='text' />
          <SkeletonTextarea variant='rounded' />
        </SkeletonFieldGroup>
      </SkeletonSection>

      <SkeletonSection>
        <SkeletonSectionHeader>
          <SkeletonSectionIcon variant='circular' />
          <SkeletonSectionTitle variant='text' />
        </SkeletonSectionHeader>

        <SkeletonFieldGroup>
          <SkeletonLabel variant='text' />

          <SkeletonChipRow>
            <SkeletonChip variant='rounded' />
            <SkeletonChip variant='rounded' />
            <SkeletonChip variant='rounded' />
          </SkeletonChipRow>
        </SkeletonFieldGroup>

        <SkeletonFieldGroup>
          <SkeletonLabel variant='text' />
          <SkeletonInput variant='rounded' />
        </SkeletonFieldGroup>
      </SkeletonSection>

      <SkeletonSection>
        <SkeletonSectionHeader>
          <SkeletonSectionIcon variant='circular' />
          <SkeletonSectionTitle variant='text' />
        </SkeletonSectionHeader>

        <SkeletonFieldGroup>
          <SkeletonLabel variant='text' />

          <SkeletonChipRow>
            <SkeletonChip variant='rounded' />
            <SkeletonChip variant='rounded' />
            <SkeletonChip variant='rounded' />
          </SkeletonChipRow>
        </SkeletonFieldGroup>

        <SkeletonFieldGroup>
          <SkeletonLabel variant='text' />

          <SkeletonChipRow>
            <SkeletonChip variant='rounded' />
            <SkeletonChip variant='rounded' />
            <SkeletonChip variant='rounded' />
          </SkeletonChipRow>
        </SkeletonFieldGroup>
      </SkeletonSection>

      <SkeletonSection>
        <SkeletonSectionHeader>
          <SkeletonSectionIcon variant='circular' />
          <SkeletonSectionTitle variant='text' />
        </SkeletonSectionHeader>

        <SkeletonFieldGroup>
          <SkeletonLabel variant='text' />

          <SkeletonChipRow>
            <SkeletonChip variant='rounded' />
            <SkeletonChip variant='rounded' />
            <SkeletonChip variant='rounded' />
          </SkeletonChipRow>
        </SkeletonFieldGroup>
      </SkeletonSection>
    </>
  );
};
