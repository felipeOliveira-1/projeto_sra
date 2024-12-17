import React from 'react';
import { Paper, Typography, Box, Chip } from '@mui/material';
import { ReviewSchedule as IReviewSchedule } from '../types';

interface ReviewScheduleProps {
    schedule: IReviewSchedule;
}

export const ReviewSchedule: React.FC<ReviewScheduleProps> = ({ schedule }) => {
    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                Cronograma de Revisão
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {schedule.title}
            </Typography>
            <Box sx={{ mt: 2 }}>
                {schedule.review_dates.map((review, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography sx={{ flex: 1 }}>
                            Dia {review.interval_days}: {review.review_date}
                        </Typography>
                        <Chip
                            label={review.status === 'pending' ? 'Pendente' : 'Concluído'}
                            color={review.status === 'pending' ? 'warning' : 'success'}
                            size="small"
                        />
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};
