import React from 'react';
import moment from 'moment';

export default class CalendarDates extends React.Component {
    handleOnDayClick = (e, day) => {
        let sDate = moment(day.fullDate);
        if (!this.props.disablePreviousDates) {
            this.props.selectDate(sDate);
        } else {
            if (day.date.isBefore(this.props.startDate)) {
            } else {
                if (day.number >= moment(this.props.startDate).date()) {
                    this.props.selectDate(sDate);
                }
            }
        }
    };
    applyCss = (day) => {
        let calendarDate = "calendar-day "; 
        let styleName = "";
        if (day.isToday) {
            styleName = calendarDate + "today" + this.applyCssForToday(day);
        } else if (!day.isCurrentMonth) {
            styleName = calendarDate + "different-month";
        } else if (day.date.isSame(this.props.selected) ||
            this.checkStartEndDateCalendar(day)) {
            styleName = calendarDate + "selected";
        } 
        if (this.props.disablePreviousDates) {
            if (this.props.startDate !== undefined &&
                day.date.isBefore(this.props.startDate)) {
                styleName = "disabled"
            }
        }
        return styleName
    } 
    applyCssForToday = (day) => {
        if (this.props.disablePreviousDates) {
            if (this.props.endDate !== undefined &&
                day.date.isSame(this.props.endDate)) {
                return " selected";
            }
        } else {
            if (this.props.startDate !== undefined &&
                day.date.isSame(this.props.startDate)) {
                return " selected";
            }
        }
        return "";
    }
    applyCssForDisabledDates = (day) => {
        if (this.props.disablePreviousDates) {
            if (this.props.startDate !== undefined &&
                day.date.isBefore(this.props.startDate)) {
                return " disabled"
            }
        } else {
            if (!day.isCurrentMonth) {
                return "different-month";
            }
        }
    }
    checkStartEndDateCalendar = (day) => {
        if ((!this.props.disablePreviousDates &&
            this.props.startDate !== undefined &&
            day.date.isSame(this.props.startDate)) ||
            (this.props.disablePreviousDates &&
                this.props.endDate !== undefined &&
                (day.date.isSame(this.props.endDate)))) {
            return true;
        }
        return false;
    }

    renderDay = (day) => {
        var key = day.date.format("MM/DD/Y");
        return (<td className={this.applyCss(day)} 
            key={key} onClick={(e) => { this.handleOnDayClick(e, day) }}>
            <span>
                {day.number}
            </span>
        </td>)
    }
    render() {
        var days = [],
            date = this.props.date,
            month = this.props.month;
        for (var i = 0; i < 7; i++) {
            var day = {
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date,
                fullDate: date.format("MM/DD/YYYY"),
                month: date.format("MM"),
                year: date.format("YYYY")
            };
            days.push(this.renderDay(day));
            date.add(1, "d");
        }
        return (
            <tr>
                {days}
            </tr>
        );
    }
}