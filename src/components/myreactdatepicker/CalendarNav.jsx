import React, { Component } from 'react';
import moment from 'moment';

export default class CalendarNav extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.dateObject)
        var currentDateObject, startDateObject;
        if (this.props.disablePreviousDates) {
            startDateObject = moment(this.props.stateDate).clone();
            if (this.props.endDate !== undefined) {
                currentDateObject = moment(this.props.endDate).clone();
            } else {
                currentDateObject = this.props.dateObject;
            }
        } else { 
            currentDateObject = this.props.dateObject;
        }
        console.log("Month: "+currentDateObject.format("MMM"));
        this.state = ({
            startDateObject: startDateObject,
            dateObject: currentDateObject,
            year: currentDateObject.format("Y")
        })
    }
    month = () => {
        return this.state.dateObject.format("MMM");
    }
    year = () => {
        return this.state.dateObject.format("Y");
    }
    onPrev = (obj) => {
        var newDateObject;
        if (!this.props.disablePreviousDates) {
            newDateObject = this.state.dateObject.clone().subtract(1, obj);
            this.props.updDateObject(newDateObject);
            this.setState({
                dateObject: newDateObject,
                year: newDateObject.format("Y")
            })
        } else {
            newDateObject = this.state.dateObject.clone().subtract(1, obj);
            if (obj === "year") {
                if (newDateObject.format("Y") >= this.state.startDateObject.format("Y")) {
                    this.props.updDateObject(newDateObject);
                    this.setState({
                        dateObject: newDateObject,
                        year: newDateObject.format("Y")
                    })
                }
            } else {
                let month = newDateObject.format("MMMM");
                if (this.isSameYear()) {
                    if (this.props.data.indexOf(month) >= this.state.startDateObject.format("M")) {
                        this.props.updDateObject(newDateObject);
                        this.setState({
                            dateObject: newDateObject,
                            year: newDateObject.format("Y")
                        })
                    } 
                } else {
                    this.props.updDateObject(newDateObject);
                    this.setState({
                        dateObject: newDateObject,
                        year: newDateObject.format("Y")
                    })
                }
            }
        }
    };
    isSameYear = () => {
        return this.state.startDateObject.format("Y") === this.state.dateObject.format("Y")
    }
    onNext = (obj) => {
        var newDateObject = this.state.dateObject.add(1, obj);
        this.props.updDateObject(newDateObject);
        this.setState({
            dateObject: newDateObject,
            year: newDateObject.format("Y")
        })
    };
    prevMonthIcon = () => {
        let styleName = "calendar-button mydpicon";
        if (this.props.disablePreviousDates) {
            let newDateObject = this.state.dateObject;
            if (this.isSameYear()) {
                let month = newDateObject.format("MMMM");
                if (this.props.data.indexOf(month) >= this.state.startDateObject.format("M")) {
                    return styleName + " icon-mydpleft";
                } 
                return styleName + " icon-mydpleft-disabled";
            }
            return styleName + " icon-mydpleft";
        }
        return styleName + " icon-mydpleft";
    }
    prevYearIcon = () => {
        let styleName = "calendar-button mydpicon";
        if (this.props.disablePreviousDates) {
            if (this.year() > this.state.startDateObject.format("Y")) {
                return styleName + " icon-mydpleft";
            } else if (this.year() === this.state.startDateObject.format("Y")) {
                return styleName + " icon-mydpleft-disabled";
            }
            return styleName + " icon-mydpleft-disabled";
            
        }
        return styleName + " icon-mydpleft";
    }

    render() {
        return (
            <div className="calendar-nav">
                <div style={{ float: 'left' }}>
                    <span
                        onClick={e => {
                            this.onPrev("month");
                        }}
                        className={this.prevMonthIcon()}
                    />
                    <span
                        onClick={e => {
                            this.props.showMonthsList();
                        }}
                        className="calendar-label"
                    >
                        {this.month()}
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
                        className={this.prevYearIcon()}
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