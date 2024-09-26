export const getDate = (time)=>{
    const date = new Date(time);

    // Define options to format the date as "Month Day, Year"
    const options = {
        year: 'numeric',   // Full year (e.g., "2024")
        month: 'long',     // Full month name (e.g., "September")
        day: 'numeric'     // Numeric day (e.g., "20")
    };

    // Format the date using the options
    return date.toLocaleDateString('en-US', options);
}