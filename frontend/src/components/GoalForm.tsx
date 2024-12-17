import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { Goal } from '../types';

interface GoalFormProps {
    onSubmit: (goal: Goal) => void;
}

export const GoalForm: React.FC<GoalFormProps> = ({ onSubmit }) => {
    const [goal, setGoal] = useState<Goal>({
        title: '',
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(goal);
        setGoal({ title: '', description: '' });
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                Nova Meta
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Título"
                    value={goal.title}
                    onChange={(e) => setGoal({ ...goal, title: e.target.value })}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Descrição"
                    value={goal.description}
                    onChange={(e) => setGoal({ ...goal, description: e.target.value })}
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    fullWidth
                >
                    Gerar Conteúdo e Cronograma
                </Button>
            </Box>
        </Paper>
    );
};
