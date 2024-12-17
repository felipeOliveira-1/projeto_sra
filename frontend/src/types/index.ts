export interface Goal {
    id?: string;
    title: string;
    description: string;
}

export interface ReviewSchedule {
    goal_id: string;
    title: string;
    start_date: string;
    review_dates: ReviewDate[];
    status: 'active' | 'completed';
}

export interface ReviewDate {
    interval_days: number;
    review_date: string;
    status: 'pending' | 'completed';
}
