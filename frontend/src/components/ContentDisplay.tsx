import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';

interface ContentDisplayProps {
    content: string;
}

export const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
    return (
        <Paper 
            elevation={3} 
            sx={{ 
                p: 3, 
                mb: 3,
                backgroundColor: 'background.paper',
                '& .markdown-body': {
                    backgroundColor: 'transparent',
                    color: 'text.primary',
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    '& h1, & h2, & h3': {
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        paddingBottom: '0.3em',
                        marginTop: '1.5em',
                        marginBottom: '1em',
                        color: 'text.primary',
                    },
                    '& h1': {
                        fontSize: '2rem',
                    },
                    '& h2': {
                        fontSize: '1.5rem',
                    },
                    '& h3': {
                        fontSize: '1.25rem',
                    },
                    '& code': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                        padding: '0.2em 0.4em',
                        fontSize: '85%',
                        color: '#90caf9',
                    },
                    '& ul, & ol': {
                        paddingLeft: '2em',
                        marginBottom: '1em',
                    },
                    '& li': {
                        marginBottom: '0.5em',
                    },
                    '& p': {
                        marginBottom: '1em',
                    },
                    '& strong': {
                        color: '#90caf9',
                    },
                    '& blockquote': {
                        borderLeft: '4px solid #90caf9',
                        paddingLeft: '1em',
                        marginLeft: 0,
                        color: 'text.secondary',
                    },
                    '& a': {
                        color: '#90caf9',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    },
                    '& hr': {
                        border: 'none',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        margin: '1.5em 0',
                    },
                },
            }}
        >
            <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                    color: 'primary.main',
                    fontWeight: 500,
                    mb: 3 
                }}
            >
                Conteúdo Otimizado
            </Typography>
            <Box className="markdown-body">
                <ReactMarkdown>{content}</ReactMarkdown>
            </Box>
        </Paper>
    );
};
