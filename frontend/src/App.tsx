import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import { GoalForm } from './components/GoalForm';
import { ContentDisplay } from './components/ContentDisplay';
import { ReviewSchedule } from './components/ReviewSchedule';
import RealtimeChat from './components/RealtimeChat';
import { generateContent, scheduleReview } from './services/api';
import { Goal, ReviewSchedule as IReviewSchedule } from './types';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
    },
    secondary: {
      main: '#ce93d8',
      light: '#f3e5f5',
      dark: '#ab47bc',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '8px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: 24,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  const [content, setContent] = useState<string>('');
  const [schedule, setSchedule] = useState<IReviewSchedule | null>(null);
  const [realtimeMessages, setRealtimeMessages] = useState<any[]>([]);

  const handleGoalSubmit = async (goal: Goal) => {
    try {
      // Gerar conteúdo otimizado
      const contentResult = await generateContent(goal);
      setContent(contentResult.content);

      // Criar cronograma de revisão
      const scheduleResult = await scheduleReview(goal);
      setSchedule(scheduleResult);
    } catch (error) {
      console.error('Error processing goal:', error);
      // TODO: Adicionar tratamento de erro adequado
    }
  };

  const handleRealtimeMessage = (message: any) => {
    setRealtimeMessages(prev => [...prev, message]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container 
        maxWidth="md" 
        sx={{ 
          py: 4,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <Box sx={{ my: 4 }}>
          <GoalForm onSubmit={handleGoalSubmit} />
          {content && (
            <Box sx={{ 
              opacity: 1, 
              transition: 'opacity 0.3s ease-in',
              animation: 'fadeIn 0.5s ease-in'
            }}>
              <ContentDisplay content={content} />
            </Box>
          )}
          {schedule && (
            <Box sx={{ 
              opacity: 1, 
              transition: 'opacity 0.3s ease-in',
              animation: 'fadeIn 0.5s ease-in'
            }}>
              <ReviewSchedule schedule={schedule} />
            </Box>
          )}
          <RealtimeChat onMessage={handleRealtimeMessage} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
