import React from 'react';
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';

interface LoadingOverlayProps {
    open: boolean;
    message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ open, message = 'Processando...' }) => {
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
            open={open}
        >
            <CircularProgress 
                color="primary" 
                size={60}
                thickness={4}
                sx={{
                    '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                    },
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: 'primary.light',
                        fontWeight: 500
                    }}
                >
                    {message}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        textAlign: 'center'
                    }}
                >
                    Isso pode levar alguns segundos...
                </Typography>
            </Box>
        </Backdrop>
    );
};
