import React from "react";
import moment from "moment";
import "./myreactdatepicker.scss";
import CalendarDates from "./CalenderDates";
import CalendarYears from "./CalenderYears";
import CalendarNav from "./CalendarNav";
import CalendarMonths from "./CalenderMonths";

export default class MyReactDatePicker extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date();
        this.state = {
            month: moment(),
            year: date.year,
            firstYear: date.year,
            showCalendarTable: true,
            showMonthTable: false,
            showYearNav: false,
            dateObject: moment(),
            allmonths: moment.months(),
            startDate: this.props.fromDate,
            endDate: this.props.toDate,
            selected: moment().date
        }
        if ((this.props.startDate !== null) && (this.props.startDate !== undefined)) {
            var newDateObject = moment(this.props.startDate);
            this.updDateObject(newDateObject);
        }
    }

    weekdayshort = moment.weekdaysShort();

    selectDate = (date) => {
        this.setState({
            selected: date
        });
        this.props.onChange(date)
        this.updDateObject(date);
    }
    daysInMonth = () => {
        return this.state.dateObject.daysInMonth();
    };
    year = () => {
        return this.state.dateObject.format("Y");
    };
    currentDay = () => {
        return this.state.dateObject.format("D");
    };
    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject;
        let firstDay = moment(dateObject)
            .startOf("month")
            .format("d");
        return firstDay;
    };
    month = () => {
        return this.state.dateObject.format("MMMM");
    };
    showMonthsList = (e, month) => {
        this.setState({
            showMonthTable: true,
            showYearNav: false,
            showCalendarTable: false
        });
    };
    setMonth = month => {
        let monthNo = this.state.allmonths.indexOf(month);
        let newDateObject = this.state.dateObject.set("month", monthNo);
        this.setState({
            dateObject: newDateObject,
            showMonthTable: false,
            showCalendarTable: true
        });
    };
    toggleCanlendarTable() {
        this.setState({
            showMonthTable: false,
            showYearNav: false,
            showCalendarTable: true
        });
    }
    showYearsList = () => {
        this.setState({
            showYearNav: true,
            showMonthTable: false,
            showCalendarTable: false
        });
    };
    updDateObject = (newDateObject) => {
        console.log("In updDateObject: "+newDateObject);
        this.state.dateObject = newDateObject;
        this.state.month = newDateObject;
        this.state.year = newDateObject.format("Y");
        console.log("newDateObject: " + this.state.dateObject)
        this.toggleCanlendarTable()
    };
    setYear = year => {
        let newDateObject = this.state.dateObject.set("year", year);
        this.setState({
            dateObject: newDateObject,
            showMonthTable: false,
            showYearNav: false,
            showCalendarTable: true,
            firstYear: year,
            year: year
        });
    };
    
    renderWeeks() {
        var weeks = [],
            done = false,
            date = this.state.dateObject.clone().startOf("month").add("w" - 1).day("Sunday"),
            monthIndex = date.month(),
            count = 0;

        while (!done) {
            weeks.push(
                <CalendarDates
                    key={date.toString()}
                    date={date.clone()}
                    disablePreviousDates={this.props.disablePreviousDates}
                    month={this.state.dateObject}
                    selectDate={this.selectDate}
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
                />
            );
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
        return weeks;
    }
    
    render() {
        let weekdayshortname = this.weekdayshort.map(day => {
            return <th key={day}>{day}</th>;
        });
        
        return (
            <div>
                <div className="react-calendar">
                    <div className="selector selectarrow selectarrowleft after" />
                    <div className="component">
                        <div className="calendar">
                        <CalendarNav
                            dateObject={this.state.dateObject}
                            updDateObject={this.updDateObject}
                            showMonthsList={this.showMonthsList}
                            showYearsList={this.showYearsList}
                            month={this.month()}
                            year={this.year()}
                        />
                        <div className="calendar-date">
                            {this.state.showYearNav && <CalendarYears dateObject={moment()} year={this.year()} setYear={this.setYear} />}
                            {this.state.showMonthTable && (
                                <CalendarMonths data={moment.months()} month={this.month()} setMonth={this.setMonth} />
                            )}
                        </div>

                        {this.state.showCalendarTable && (
                            <div className="calendar-date">
                                <table className="calendar-day">
                                    <thead>
                                        <tr>{weekdayshortname}</tr>
                                    </thead>
                                    <tbody>{this.renderWeeks()}</tbody>
                                </table>
                            </div>
                        )} 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}