
import { BlueClock } from '@/assets/svg/BlueClock';
import moment from 'moment';

const transformLoginDataToSelectedDateDetails = (entry: any) => {
	const clockIn = entry?.clockIn ? moment(entry.clockIn) : null;
	const clockOut = entry?.clockOut ? moment(entry.clockOut) : null;

	const hasClockIn = clockIn?.isValid();
	const hasClockOut = clockOut?.isValid();
	const isClocked = hasClockIn; // Only clockIn is required to be considered "Present"

	return {
		day: hasClockIn && clockIn ? clockIn.format('dddd') : hasClockOut && clockOut ? clockOut.format('dddd') : 'Unknown',
		status: isClocked ? 'Present' : 'No records',
		date: hasClockIn && clockIn ? clockIn.format('YYYY-MM-DD') : hasClockOut && clockOut ? clockOut.format('YYYY-MM-DD') : 'Invalid date',
		clockIn: hasClockIn && clockIn ? clockIn.format('HH:mm') : null,
		clockOut: hasClockOut && clockOut ? clockOut.format('HH:mm') : null,
	};
};


const calculateWorkedHours = (clockIn: string, clockOut: string): number => {
	const start = moment(clockIn);
	const end = moment(clockOut);
	const duration = moment.duration(end.diff(start));
	return parseFloat((duration.asHours()).toFixed(2)); // returns e.g. 1.15
};

const isLateArrival = (clockIn: string): boolean => {
	const clockInTime = moment(clockIn);
	const scheduledStart = moment(clockInTime).set({ hour: 8, minute: 0, second: 0 });
	return clockInTime.isAfter(scheduledStart);
};

const processAttendanceData = (entries: any[]) => {
	let totalWorkedHours = 0;
	let lateArrivals = 0;

	for (const entry of entries) {
		if (entry.clockIn && entry.clockOut) {
			totalWorkedHours += calculateWorkedHours(entry.clockIn, entry.clockOut);
			if (isLateArrival(entry.clockIn)) {
				lateArrivals += 1;
			}
		}
	}

	return {
		totalWorkedHours: totalWorkedHours.toFixed(2),
		lateArrivals,
	};
};


const generateNotifications = (attendanceData: any[]) => {
	const notifications: any = [];

	attendanceData.forEach((entry, index) => {
		const clockIn = entry.clockIn ? new Date(entry.clockIn) : null;
		const clockOut = entry.clockOut ? new Date(entry.clockOut) : null;
		const date = new Date(entry.createdAt).toLocaleDateString("en-GB");

		// Missed clock-in
		if (!clockIn) {
			notifications.push({
				id: `missed-clock-in-${index}`,
				icon: <BlueClock />,
				title: "Missed Clock-In",
				message: "You did not clock in today. Please ensure to do so next time.",
				date,
			});
		}

		// Late arrival after 8:15 AM
		if (clockIn && clockIn.getHours() >= 8 && clockIn.getMinutes() > 15) {
			notifications.push({
				id: `late-arrival-${index}`,
				icon: <BlueClock />,
				title: "Late Arrival",
				message: "You arrived later than 8:15 AM. Please try to come earlier.",
				date,
			});
		}

		// Early departure: user clocked in but did not clock out or clocked out too early
		if (clockIn && !clockOut) {
			notifications.push({
				id: `early-departure-${index}`,
				icon: <BlueClock />,
				title: "Missing Clock-Out",
				message: "You forgot to clock out after work. Please remember next time.",
				date,
			});
		} else if (clockIn && clockOut) {
			const duration = (clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60); // in hours
			if (duration < 6) {
				notifications.push({
					id: `short-day-${index}`,
					icon: <BlueClock />,
					title: "Early Departure",
					message: "You worked less than 6 hours today. Please ensure a full shift.",
					date,
				});
			}
		}
	});

	return notifications;
};




export {
	generateNotifications,
	transformLoginDataToSelectedDateDetails,
	processAttendanceData
};