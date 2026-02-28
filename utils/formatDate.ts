export const formatDate = (timestamp: number, timezoneOffset: number = 0): string => {
    const date = new Date((timestamp + timezoneOffset) * 1000);

    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
    }).format(date);
};

export const formatTime = (timestamp: number, timezoneOffset: number = 0): string => {
    const date = new Date((timestamp + timezoneOffset) * 1000);

    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    }).format(date);
};
