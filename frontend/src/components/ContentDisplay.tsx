import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface ContentDisplayProps {
    content: string;
}

export const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                Conteúdo Otimizado
            </Typography>
            <Box sx={{ whiteSpace: 'pre-wrap' }}>
                <Typography variant="body1">
                    {content}
                </Typography>
            </Box>
        </Paper>
    );
};
