import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { GoalForm } from './components/GoalForm';
import { ContentDisplay } from './components/ContentDisplay';
import { ReviewSchedule } from './components/ReviewSchedule';
import { generateContent, scheduleReview } from './services/api';
import { Goal, ReviewSchedule as IReviewSchedule } from './types';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const [content, setContent] = useState<string>('');
  const [schedule, setSchedule] = useState<IReviewSchedule | null>(null);

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <GoalForm onSubmit={handleGoalSubmit} />
        {content && <ContentDisplay content={content} />}
        {schedule && <ReviewSchedule schedule={schedule} />}
      </Container>
    </ThemeProvider>
  );
}

export default App;
