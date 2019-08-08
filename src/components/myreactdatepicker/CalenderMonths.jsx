import React from 'react';

export default class CalendarMonths extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            month: this.props.month
        })
    }
    handleMonthClick = (selectedMonth) => {
        this.props.setMonth(selectedMonth);
        this.setState({
            month: selectedMonth
        })
    }
    MonthList = () => {
        let months = [];
        this.props.data.map(month => {
            months.push(
                <td key={month}
                    className={"calendar-month"}
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