import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { LoadingOverlay } from './LoadingOverlay';
import { Goal } from '../types';

interface GoalFormProps {
    onSubmit: (goal: Goal) => Promise<void>;
}

export const GoalForm: React.FC<GoalFormProps> = ({ onSubmit }) => {
    const [goal, setGoal] = useState<Goal>({
        title: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onSubmit(goal);
            setGoal({ title: '', description: '' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <LoadingOverlay 
                open={isLoading} 
                message="Gerando seu plano personalizado..."
            />
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 3, 
                    mb: 3,
                    transition: 'opacity 0.3s',
                    opacity: isLoading ? 0.6 : 1
                }}
            >
                <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{
                        color: 'primary.main',
                        fontWeight: 500,
                        mb: 2
                    }}
                >
                    Nova Meta
                </Typography>
                <Box 
                    component="form" 
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <TextField
                        fullWidth
                        label="Título"
                        value={goal.title}
                        onChange={(e) => setGoal({ ...goal, title: e.target.value })}
                        required
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Descrição"
                        value={goal.description}
                        onChange={(e) => setGoal({ ...goal, description: e.target.value })}
                        multiline
                        rows={4}
                        required
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        sx={{ 
                            mt: 1,
                            py: 1.5,
                            fontWeight: 500,
                            fontSize: '1rem',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                    >
                        Gerar Conteúdo e Cronograma
                    </Button>
                </Box>
            </Paper>
        </>
    );
};
