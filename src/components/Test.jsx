import React, { Component } from 'react';
import '../styles/components/date.scss';
import MyReactDatePicker from './myreactdatepicker';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            fromDate: this.props.startDate,
            toDate: this.props.endDate,
            datePickerIsOpenForStartDate: false,
            datePickerIsOpenForEndDate: false
        })
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    toggleDatePickerForStartDate = () => {
        this.setState({
            datePickerIsOpenForStartDate: !this.state.datePickerIsOpenForStartDate,
            datePickerIsOpenForEndDate: false
        })
    }
    handleFromDateChange = (newDate) => {
        this.setState({
            fromDate: newDate.format("MM/DD/Y")
        })
        this.toggleDatePickerForStartDate()
    }
    toggleDatePickerForEndDate = () => {
        this.setState({
            datePickerIsOpenForStartDate: false,
            datePickerIsOpenForEndDate: !this.state.datePickerIsOpenForEndDate
        })
    }
    handleToDateChange = (newDate) => {
        this.setState({
            toDate: newDate.format("MM/DD/Y")
        })
        this.toggleDatePickerForEndDate()
    }
    // Handle Click made outside DatePicker
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    setWrapperRef(node) {
        this.wrapperRef = node;
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                datePickerIsOpenForStartDate: false,
                datePickerIsOpenForEndDate: false
            })
        }
    }
    // End of Handle Click made outside DatePicker

    render() {
        return (
            <div style={{ margin: '0 auto', width: '100%' }}>
                <p className="header">React Date Picker Integration</p>
                <div className="date-controls" ref={this.setWrapperRef}>
                    <fieldset style={{width: '65%'}}>
                        <legend className={'required legend'}>Inclusive Date Range</legend>
                        <div style={{ float: 'left', width: '48%' }}>
                            <p>Start Date</p>
                            <input defaultValue={this.state.fromDate} name='startDate' className='date-text-box date-width' />
                            <span className="cal-box" onClick={this.toggleDatePickerForStartDate}>
                                <span className="cal-icon" />
                            </span>
                            {this.state.datePickerIsOpenForStartDate &&
                                <MyReactDatePicker
                                    startDate={this.state.fromDate}
                                    endDate={this.state.toDate}
                                    onChange={this.handleFromDateChange}
                                    disablePreviousDates={false}
                                    onClickOutside={this.toggleDatePickerForStartDate}
                                    open={this.state.datePickerIsOpenForStartDate}
                                />
                            }
                        </div>
                        <div style={{ float: 'right', width: '48%' }}>
                            <p>End Date</p>
                            <input defaultValue={this.state.toDate} name='toDate' className='date-text-box date-width' />
                            <span className="cal-box" onClick={this.toggleDatePickerForEndDate}>
                                <span className="cal-icon" />
                            </span>
                            {this.state.datePickerIsOpenForEndDate &&
                                <MyReactDatePicker
                                    startDate={this.state.fromDate}
                                    endDate={this.state.toDate}
                                    onChange={this.handleToDateChange}
                                    disablePreviousDates={true}
                                    onClickOutside={this.toggleDatePickerForEndDate}
                                    open={this.state.datePickerIsOpenForEndDate}
                                />
                            }
                        </div>
                    </fieldset>
                </div>
            </div>
        )
    }
}