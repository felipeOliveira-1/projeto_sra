from datetime import datetime, timedelta

def calculate_review_dates(start_date=None):
    """
    Calcula as datas de revisão baseadas no sistema SRA (1, 3, 7, 15 e 30 dias).
    """
    if start_date is None:
        start_date = datetime.now()

    intervals = [1, 3, 7, 15, 30]
    review_dates = []

    for interval in intervals:
        review_date = start_date + timedelta(days=interval)
        review_dates.append({
            'interval_days': interval,
            'review_date': review_date.strftime('%Y-%m-%d'),
            'status': 'pending'
        })

    return review_dates

def create_sra_schedule(goal_data):
    """
    Cria um cronograma SRA completo para uma meta.
    """
    try:
        schedule = {
            'goal_id': goal_data.get('id'),
            'title': goal_data.get('title'),
            'start_date': datetime.now().strftime('%Y-%m-%d'),
            'review_dates': calculate_review_dates(),
            'status': 'active'
        }
        
        return {
            'schedule': schedule,
            'success': True
        }
    except Exception as e:
        return {
            'schedule': None,
            'success': False,
            'error': str(e)
        }
