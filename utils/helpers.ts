	export const currentDate = new Date();	


// Format the date as "Friday August 12, 2024"
	export const formattedDate = currentDate.toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});

	// Format the time as "10:22 AM"
	export const formattedTime = currentDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});

  // Replace with the actual date if needed
	export const formattedActualDate = currentDate.toLocaleDateString("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short"
}); // E.g., "Wed 24 Aug"



 