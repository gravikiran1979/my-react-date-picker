import React from 'react';
import moment from 'moment';

export default class CalendarMonths extends React.Component {
    constructor(props) {
        super(props);
        var currentMonth;
        var currentDateObject;
        if (this.props.disablePreviousDates) {
            if (this.props.endDate !== undefined) {
                currentDateObject = moment(this.props.endDate).clone();
                currentMonth = currentDateObject.format("MMMM");
            } else {
                currentDateObject = this.props.dateObject;
                currentMonth = this.props.month;
            }
        } else {
            if (this.props.startDate !== undefined) {
                currentDateObject = moment(this.props.startDate).clone()
                currentMonth = currentDateObject.format("MMMM");
            } else {
                currentDateObject = this.props.dateObject;
                currentMonth = this.props.month;
            }
        }

        this.state = ({
            dateObject: currentDateObject,
            month: currentMonth
        })
    }
    handleMonthClick = (selectedMonth) => {
        if (!this.validateMonthsToDisable(selectedMonth)) {
            this.props.setMonth(selectedMonth);
            this.setState({
                month: selectedMonth
            })
        }
    }
    applyCss = (month) => {
        let styleName = "calendar-month";
        if (this.props.disablePreviousDates) {
            if (this.props.startDate !== undefined) {
                if (this.validateMonthsToDisable(month)) {
                    styleName = styleName + " disabled";
                }
            }
        }
        return styleName;
    }
    validateMonthsToDisable = (month) => {        
        let startDateObject = moment(this.props.startDate).clone()
        if (this.isSameYear(startDateObject)) {
            if (this.props.data.indexOf(month) < startDateObject.format("M")) {
                return true;
            } else if (this.props.data.indexOf(month) === startDateObject.format("M")) {
                return false;
            }
        }
        return false;
    }
    isSameYear = (startDateObject) => {
        return startDateObject.format("Y") === this.state.dateObject.format("Y")
    }
    MonthList = () => {
        let months = [];
        this.props.data.map(month => {
            months.push(
                <td key={month}
                    className={this.applyCss(month)}
                    onClick={e => {
                        this.handleMonthClick(month);
                    }}
                >
                    <span className={(month === this.state.month ? "selected" : "")}>
                        {month}
                    </span>
                </td>
            );
            return (
                <div>
                    {months}
                </div>
            )
        });
        let rows = [];
        let cells = [];

        months.forEach((row, i) => {
            if (i % 3 !== 0 || i === 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
        });
        rows.push(cells);
        let monthlist = rows.map((d, i) => {
            return <tr key={i}>{d}</tr>;
        });

        return (
            <table className="calendar-month">
                <tbody>{monthlist}</tbody>
            </table>
        );
    };

    render() {
        return (
            <div className="react-calendar">
                <div className="component">
                    <div className="calendar-date">
                        <this.MonthList />
                    </div>
                </div>
            </div>
        )
            }
}