"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToWeekDay = numberToWeekDay;
function numberToWeekDay(dayNumber) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[dayNumber];
}
