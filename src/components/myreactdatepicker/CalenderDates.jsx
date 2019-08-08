import React from 'react';
import moment from 'moment';

export default class CalendarDates extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        console.log("StartDate in CalendarDates: "+this.props.startDate);
        console.log("EndDate in CalendarDates: " + this.props.endDate);
    }
    
    handleOnDayClick = (e, day) => {
        let sDate = moment(day.fullDate);
        if (this.props.disablePreviousDates === "false") {
            this.props.selectDate(sDate);
        } else {
            if (day.date.isBefore(this.props.startDate)) {
            } else {
                console.log("1. " + day.number + ", 2. " + moment(this.props.startDate).date())
                if (day.number >= moment(this.props.startDate).date()) {
                    this.props.selectDate(sDate);
                }
            }
        }
    };
    applyCss = (day) => {
        let calendarDate = "calendar-day "; 
        let styleName = "";
        if (this.props.disablePreviousDates !== "true") {
            if (day.isToday) {
                styleName = calendarDate + "today";
            } else if (!day.isCurrentMonth) {
                styleName = calendarDate + "different-month";
            } else if (day.date.isSame(this.props.selected) ||
                this.checkStartEndDateCalendar(day)) {
                styleName = calendarDate + "selected";
            }
            return styleName + this.validateSelection(day);
        }
        return styleName + this.applyCssForDisabledDates(day);
    } 
    applyCssForDisabledDates = (day) => {
        if (this.props.disablePreviousDates === "true") {
            if (this.props.startDate !== undefined &&
                day.date.isBefore(this.props.startDate)) {
                return " disabled"
            } else if (!day.isCurrentMonth) {
                return "different-month";
            }
        }
    }
    checkStartEndDateCalendar = (day) => {
        if ((this.props.disablePreviousDates !== "true" &&
                this.props.startDate !== undefined &&
                day.date.isSame(this.props.startDate)) || 
            (this.props.disablePreviousDates === "true" &&
                this.props.endDate !== undefined &&
                (day.date.isSame(this.props.endDate)))) {
            return true;
        }
        return false;
    }
    validateSelection = (day) => {
        if (day.isToday) {
            if ((this.props.startDate !== undefined &&
                    day.date.isSame(this.props.startDate)) ||
                (this.props.startDate !== undefined &&
                    day.date.isSame(this.props.endDate))) {
                    return " selected";
            }
        } 
        return "";
    }
    renderDay = (day) => {
        var key = day.date.format("MM/DD.YYYY");
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