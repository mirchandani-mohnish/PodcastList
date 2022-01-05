import React, { Component } from 'react'
import { ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
export default class Pagination extends Component {
    constructor(props){
        super(props);
        

        this.pagination = this.pagination.bind(this);
    }


    pagination = () => {
        const pageNumbers = [];

        for(let i = 1; i<= Math.ceil(this.props.TotalPodcasts/this.props.PodcastsPerPage);i++){
            pageNumbers.push(i);
        }

        return (
            <ButtonToolbar aria-label="Toolbar with button groups">
                <ButtonGroup className="me-2" aria-label="First group">
                    {pageNumbers.map(number => (
                        <Button key={number} onClick={() => this.props.pageChange(number)}>{number}</Button>
                    ))}
                     
                </ButtonGroup>
            </ButtonToolbar>
        )
    }
    render() {
        return (
            <div>
                {this.pagination()}
            </div>
        )
    }
}
