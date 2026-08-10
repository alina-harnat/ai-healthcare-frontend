import { Components } from '@mui/material/styles';

export const components = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },

    styleOverrides: {
      root: {
        borderRadius: 12,
        textTransform: 'none',
        fontWeight: 600,
        padding: '10px 20px',
      },
    },

    variants: [
      {
        props: {
          variant: 'contained',
          color: 'primary',
        },

        style: {
          backgroundColor: '#1c80a9',
          color: '#FFFFFF',

          '&:hover': {
            backgroundColor: '#5eabc8',
          },

          '&.Mui-disabled': {
            backgroundColor: '#d3eaf3',
            color: '#FFFFFF',
          },
        },
      },

      {
        props: {
          variant: 'outlined',
          color: 'primary',
        },

        style: {
          border: '1.5px solid #1c80a9',
          color: '#1c80a9',

          '&:hover': {
            border: '1.5px solid #5eabc8',
            backgroundColor: '#edf5fa',
          },

          '&.Mui-disabled': {
            borderColor: '#d3eaf3',
            color: '#a3d1e2',
          },
        },
      },

      {
        props: {
          variant: 'contained',
          color: 'secondary',
        },

        style: {
          backgroundColor: '#58bbd7',
          color: '#FFFFFF',

          '&:hover': {
            backgroundColor: '#71c8e1',
          },

          '&.Mui-disabled': {
            backgroundColor: '#d4f1f8',
            color: '#FFFFFF',
          },
        },
      },

      {
        props: {
          variant: 'outlined',
          color: 'secondary',
        },

        style: {
          border: '1.5px solid #58bbd7',
          color: '#58bbd7',

          '&:hover': {
            border: '1.5px solid #71c8e1',
            backgroundColor: '#ebf9fc',
          },

          '&.Mui-disabled': {
            borderColor: '#d4f1f8',
            color: '#a7e0ef',
          },
        },
      },
    ],
  },

  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      fullWidth: true,
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        backgroundColor: '#FFFFFF',

        '& fieldset': {
          borderColor: '#d3eaf3',
        },

        '&:hover fieldset': {
          borderColor: '#a3d1e2',
        },

        '&.Mui-focused fieldset': {
          borderColor: '#1c80a9',
          borderWidth: 2,
        },

        '&.Mui-error fieldset': {
          borderColor: '#ec4741',
        },
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: '#64748B',

        '&.Mui-focused': {
          color: '#1c80a9',
        },

        '&.Mui-error': {
          color: '#ec4741',
        },
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 20,
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)',
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 20,
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        fontWeight: 500,
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: '#E2E8F0',
      },
    },
  },
} satisfies Components;
