import React from 'react';
import moment from 'moment';

export default class CalendarYears extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            dateObject: this.props.dateObject,
            year: this.props.year,
            firstYear: this.props.dateObject.format("Y"),
            lastYear: this.props.dateObject.add(24, "years").format("Y")
        })
    }
    
    getDates(startDate, stopDate2) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate2);
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format("YYYY"));
            currentDate = moment(currentDate).add(1, "year");
        }
        if (dateArray.length > 25) {
            dateArray.splice("index", 1);
        }
        return dateArray;
    }
    showPrevNextYears = (move) => {
        var newFirstYear;
        move === "prev"
            ? newFirstYear = moment(this.state.firstYear).subtract(24, "year")
            : newFirstYear = moment(this.state.firstYear).add(26, "year")
        this.setState({
            firstYear: newFirstYear.format("Y"),
            lastYear: newFirstYear.add(26, "year").format("Y")
        });
    }
    handleYearClick = (selectedYear) => {
        this.props.setYear(selectedYear);
        this.setState({
            year: selectedYear
        })
    }
    YearTable = () => {
        let years = [];
        let yearsList = moment()
            .set("year", this.state.firstYear)
            .add(25, "year")
            .format("Y");
        let yearTable = this.getDates(this.state.firstYear, yearsList);
        // eslint-disable-next-line array-callback-return
        yearTable.map(year => {
            years.push(
                <td key={year}
                    className="calendar-year"
                    onClick={e => {
                        this.handleYearClick(year);
                    }}
                >
                    <span
                        className={year === this.state.year ? "selected" : ""} >
                            { year }
                    </span>
                </td>
            );
        });
        let rows = [];
        let cells = [];
        years.forEach((row, i) => {
            if (i % 5 !== 0 || i === 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
        });
        rows.push(cells);
        let yearlist = rows.map((d, i) => {
            return <tr key={i}>{d}</tr>;
        });
        return (
            <div className="calendar-year">
                <table className="calendar-year">
                    <thead>
                        <tr>
                            <td colSpan='5' className="yearchangebtncell">
                                <button className="yearchangebtn mydpicon icon-mydpup yearchangebtnenabled" type="button"
                                    onClick={e => {
                                        this.showPrevNextYears("prev");
                                    }}
                                ></button>
                            </td>
                        </tr>
                    </thead>
                    <tbody>{yearlist}</tbody>
                    <thead>
                        <tr>
                            <td colSpan='5' className="yearchangebtncell">
                                <button className="yearchangebtn mydpicon icon-mydpdown yearchangebtnenabled" type="button"
                                    onClick={e => {
                                        this.showPrevNextYears("next");
                                    }}
                                ></button>
                            </td>
                        </tr>
                    </thead>
                </table>
                <div className="yearselector selectarrowdown" />
            </div>
        );
    };

    render() {
        return (
            <div className="react-calendar">
                <div className="component">
                    <this.YearTable />
                </div>
            </div>
        )
            }
}