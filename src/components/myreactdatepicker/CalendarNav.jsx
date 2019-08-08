import React, { Component } from 'react';

export default class CalendarNav extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            dateObject: this.props.dateObject,
            year: this.props.year
        })
    }
    year = () => {
        return this.state.dateObject.format("Y");
    }
    onPrev = (obj) => {
        var newDateObject = this.state.dateObject.subtract(1, obj);
        this.props.updDateObject(newDateObject);
        this.setState({
            dateObject: newDateObject,
            year: newDateObject.format("Y")
        })
    };
    onNext = (obj) => {
        var newDateObject = this.state.dateObject.add(1, obj);
        this.props.updDateObject(newDateObject);
        this.setState({
            dateObject: newDateObject,
            year: newDateObject.format("Y")
        })
    };
    render() {
        return (
            <div className="calendar-navi">
                <div style={{ float: 'left' }}>
                    <span
                        onClick={e => {
                            this.onPrev("month");
                        }}
                        className="calendar-button mydpicon icon-mydpleft"
                    />
                    <span
                        onClick={e => {
                            this.props.showMonthsList();
                        }}
                        className="calendar-label"
                    >
                        {this.state.dateObject.format("MMM")}
                    </span>
                    <span
                        onClick={e => {
                            this.onNext("month")
                        }}
                        className="calendar-button mydpicon icon-mydpright"
                    />
                </div>
                <div style={{ float: 'right' }}>
                    <span
                        onClick={e => {
                            this.onPrev("year");
                        }}
                        className="calendar-button mydpicon icon-mydpleft"
                    />
                    <span
                        className="calendar-label"
                        onClick={e => {
                            this.props.showYearsList();
                        }}
                    >
                        {this.year()}
                    </span>
                    <span
                        onClick={e => {
                            this.onNext("year")
                        }}
                        className="calendar-button mydpicon icon-mydpright"
                    />
                </div>
            </div>
        )
    }
}