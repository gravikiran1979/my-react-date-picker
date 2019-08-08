import React from 'react';
import moment from 'moment';

export default class CalendarDates extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = ({
            startDate: "",
            endDate: ""
        })
        // console.log("StartDate in CalendarDates: "+this.props.startDate);
        // console.log("EndDate in CalendarDates: " + this.props.endDate);
    }
    
    handleOnDayClick = (e, day) => {
        let sDate = moment(day.fullDate);
        console.log("sDate: " + sDate);
        this.props.selectDate(sDate);
    };
    renderDay = (day) => {
        var key = day.date.format("MM/DD.YYYY");
        return (<td className={"calendar - day" 
            + (day.isToday ? " today" : "")
            + (day.isCurrentMonth ? "" : " different-month")
            + (day.date.isSame(this.props.selected)
            + (day.date.isSame(this.props.startDate))
            + (day.date.isSame(this.props.endDate))
            ? " selected"
            : "")} 
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
        )
    }
}