import * as React from 'react';
import './App.css';
import { Button, FormGroup, Grid, Row } from 'react-bootstrap';
import FilterRow, { FilterRowState } from './FilterRow';

class SearchForm extends React.Component<{ onSubmit: (rows: FilterRowState[]) => void, fields: { id: string, name: string }[] }, {rows: FilterRowState[] }> {
    constructor(props: { onSubmit: (rows: FilterRowState[]) => void, fields: { id: string; name: string }[] }, context: FilterRowState[]) {
        super(props, context);
        this.state = {
            rows: [
                this.createNewRow()
            ]
        };
    }

    render() {
        return (
            <Grid fluid={true}>
                <Row>
                    <FormGroup>
                        {
                            this.state.rows.map((row, index) => <FilterRow key={row.condition} data={row} fields={this.props.fields} onChange={(change) => this.onRowChange(change, index)} onDeleteClick={_row => this.onDeleteClick(_row, index)}/>)
                        }
                    </FormGroup>
                </Row>

                <Row>
                    <Button onClick={this.onNewClick}>Új felvétele</Button>
                    <Button onClick={this.reset}>Alaphelyzet</Button>
                    <Button onClick={() => this.props.onSubmit(this.state.rows)}>Mehet</Button>
                </Row>
            </Grid>
        );
    }

    reset = () => {
        this.setState({...this.state, rows: [this.createNewRow()]});
    }

    onRowChange = (rowToBeChanged: FilterRowState, indexToBeChanged: number) => {
        const rows = this.state.rows.map((row, index) => index !== indexToBeChanged ? row : rowToBeChanged);
        this.setState({...this.state, rows: rows});
    }

    createNewRow = () => {
        return {selectedField: '', condition: '', text: ''};
    }

    onNewClick = () => {
        this.setState({...this.state, rows: [...this.state.rows, this.createNewRow()]});
    }

    onDeleteClick = (rowToBeDeleted: FilterRowState, indexToBeDeleted: number) => {
        this.setState({...this.state, rows: this.state.rows.filter((row, index) => index !== indexToBeDeleted)});
    }
}

export default SearchForm;